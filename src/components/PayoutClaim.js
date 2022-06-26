import { useRef, useState, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import ContractABI from "../artifacts/contracts/RGOInsurance.sol/RGOInsurance.json";
import { utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CONTRACTADDRESS } from "../Interactions";

const PayoutClaim = () => {
  const flightID = useRef();
  const departTime = useRef();
  const arriveTime = useRef();

  const eventFlightID = useRef();
  const delayDuration = useRef();
  const delayReason = useRef();

  const [functionName, setFunctionName] = useState("");

  const contractInterface = new utils.Interface(ContractABI.abi);
  const contractAddress = CONTRACTADDRESS;
  const contract = new Contract(contractAddress, contractInterface);

  const { state, send } = useContractFunction(contract, functionName);

  const registerFlight = () => {
    if (
      !flightID.current.value ||
      !departTime.current.value ||
      !arriveTime.current.value
    ) {
      toast.error("Please input the empty field!");
    } else {
      setFunctionName("registerFlight");
    }
  };

  const registerFlightEvent = () => {
    if (
      !eventFlightID.current.value ||
      !delayDuration.current.value ||
      !delayReason.current.value
    ) {
      toast.error("Please input the empty field!");
    } else {
      setFunctionName("registerFlightEvent");
    }
  };

  useEffect(() => {
    if (functionName === "registerFlight") {
      const departUnix = new Date(departTime.current.value).getTime() / 1000;
      const arriveUnix = new Date(arriveTime.current.value).getTime() / 1000;
      send(flightID.current.value, departUnix, arriveUnix);
      setFunctionName("");
    } else if (functionName === "registerFlightEvent") {
      send(
        eventFlightID.current.value,
        delayDuration.current.value,
        delayReason.current.value
      );
      setFunctionName("");
    }
  }, [functionName, send]);

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
  }, [state]);

  return (
    <div className=" gap-4 mt-5">
      <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl">
        <h1 className="text-center font-bold text-xl">
          Payout Claim to Administrator
        </h1>
        <div className="mt-5">
          <label
            htmlFor="type"
            className="text-xl mr-5 inline-block text-right w-1/3"
          >
            Firearm Type
          </label>
          <select
            name="type"
            className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
          >
            <option value="0.1">Revolver</option>
            <option value="1">AR-15</option>
          </select>
        </div>
        <div className="mt-5">
          <label className="text-xl mr-5 inline-block text-right w-1/3">
            Firearm Serial #
          </label>
          <input
            type="text"
            className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="flight_id"
            className="text-xl mr-5 inline-block text-right w-1/3"
          >
            Policy ID
          </label>
          <input
            ref={eventFlightID}
            name="flight_id"
            type="text"
            className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="flight_id"
            className="text-xl mr-5 inline-block text-right w-1/3"
          >
            Payout Administrator
          </label>
          <input
            type="text"
            className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="flight_id"
            className="text-xl mr-5 inline-block text-right w-1/3"
          >
            Payout Administrator Wallett Address
          </label>
          <input
            type="text"
            className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
          />
        </div>
        <div className="mt-5">
          <label className="text-xl mr-5 inline-block text-right w-1/3">
            Incident Documentation Type
          </label>
          <select className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3">
            <option value="">Police Incident Report</option>
            <option value="">Criminal Conviction</option>
            <option value="">Civil Lawsuit Judgement</option>
          </select>
        </div>

        <div className="mt-5">
          <label className="text-xl mr-5 inline-block text-right w-1/3">
            Incident Documentation
          </label>
          <input
            type="text"
            className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
          />
        </div>
        <div className="text-center mt-10">
          <button
            onClick={registerFlightEvent}
            className="py-2 px-3 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PayoutClaim;
