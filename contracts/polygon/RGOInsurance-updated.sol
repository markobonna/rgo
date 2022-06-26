//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RGOInsuranceUpdate {
    address payable owner;
    uint public lockedBalance;

    receive() external payable {}

    fallback() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access this function");
        _;
    }

    modifier onlyRegisteredUser() {
        require(
            bytes(userName[msg.sender]).length != 0,
            "Only a registered user can access this function!"
        );
        _;
    }

    modifier serialExist(string memory _serialID) {
        require(
            serialID[_serialID].exist == true,
            "The serial does not exist!"
        );
        _;
    }

    modifier flightFinished(string memory _serialID) {
        if (block.timestamp > serialID[_serialID].arriveTime) {
            serialID[_serialID].finished = true;
        }
        require(
            serialID[_serialID].finished == true,
            "The flight is not finished yet!"
        );
        _;
    }

    mapping(address => string) userName;

    enum Event {
        None,
        PoliceReport,
        CrimminalVerdict,
        CivilJudgement,
        Canceled
    }

    struct flightData {
        string airline;
        uint departTime;
        uint arriveTime;
        uint eventDuration;
        Event incidentReason;
        bool finished;
        history[] orders;
        bool exist;
    }

    struct history {
        address customer;
        uint premiumPaid;
        uint orderedAt;
    }

    mapping(string => flightData) serialID;

    function depositEther() public payable onlyOwner {
        payable(address(this)).transfer(msg.value);
    }

    function withdrawEther(uint _weiAmount) public payable onlyOwner {
        uint availableBalance = address(this).balance - lockedBalance;
        require(
            availableBalance >= _weiAmount,
            "Not enough available ether to be withdrawn!"
        );
        owner.transfer(_weiAmount);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function registerAirline(address _airlineAddr, string memory _name)
        public
        onlyOwner
    {
        userName[_airlineAddr] = _name;
    }

    function registerFlight(
        string memory _serialID,
        uint _departTime,
        uint _arriveTime
    ) public onlyRegisteredUser {
        require(
            _arriveTime > _departTime,
            "Please input a valid departure and arrival time!"
        );
        serialID[_serialID].airline = userName[msg.sender];
        serialID[_serialID].departTime = _departTime;
        serialID[_serialID].arriveTime = _arriveTime;
        serialID[_serialID].exist = true;
    }

    function orderInsurance(string memory _serialID)
        public
        payable
        serialExist(_serialID)
    {
        require(
            msg.value >= 0.01 ether && msg.value <= 0.06 ether,
            "You can only pay between 0.01 to 0.06 ether for the premium!"
        );
        require(
            serialID[_serialID].departTime - block.timestamp >= 12 hours,
            "You can only buy this insurance at least 12 hours before your flight departure!"
        );
        require(
            address(this).balance - lockedBalance >= msg.value * 3,
            "Ether reserve in smart contract is too litte, please try again later!"
        );

        history memory _order;
        _order.customer = msg.sender;
        _order.premiumPaid = msg.value;
        _order.orderedAt = block.timestamp;
        serialID[_serialID].orders.push(_order);
        lockedBalance += msg.value * 3;
    }

    function registerFlightEvent(
        string memory _serialID,
        uint _eventDuration,
        uint _incidentReason
    ) public onlyRegisteredUser flightFinished(_serialID) {
        require(
            keccak256(abi.encodePacked(serialID[_serialID].airline)) ==
                keccak256(abi.encodePacked(userName[msg.sender])),
            "Please enter the flight from your airline!"
        );

        serialID[_serialID].eventDuration = _eventDuration;

        if (_incidentReason == 0) {
            serialID[_serialID].incidentReason = Event.None;
        } else if (_incidentReason == 1) {
            serialID[_serialID].incidentReason = Event.PoliceReport;
        } else if (_incidentReason == 2) {
            serialID[_serialID].incidentReason = Event.CrimminalVerdict;
        } else if (_incidentReason == 3) {
            serialID[_serialID].incidentReason = Event.CivilJudgement;
        } else if (_incidentReason == 4) {
            serialID[_serialID].incidentReason = Event.Canceled;
        }

        if (serialID[_serialID].incidentReason == Event.Canceled) {
            for (uint i = 0; i < serialID[_serialID].orders.length; i++) {
                lockedBalance -= serialID[_serialID].orders[i].premiumPaid * 3;
                payable(serialID[_serialID].orders[i].customer).transfer(
                    serialID[_serialID].orders[i].premiumPaid
                );
            }
        } else if (
            serialID[_serialID].incidentReason != Event.Canceled &&
            serialID[_serialID].incidentReason != Event.None
        ) {
            if (_eventDuration >= 45) {
                for (uint i = 0; i < serialID[_serialID].orders.length; i++) {
                    lockedBalance -=
                        serialID[_serialID].orders[i].premiumPaid *
                        3;
                    payable(serialID[_serialID].orders[i].customer).transfer(
                        serialID[_serialID].orders[i].premiumPaid * 3
                    );
                }
            }
        }
    }
}
