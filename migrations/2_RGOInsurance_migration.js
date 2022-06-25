// Help Truffle find `RGOInsurance.sol` in the `/contracts` directory
const RGOInsurance = artifacts.require("RGOInsurance");

module.exports = function (deployer) {
  // Command Truffle to deploy the Smart Contract
  deployer.deploy(RGOInsurance);
};
