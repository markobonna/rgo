import { useRef, useState, useEffect } from "react";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import ContractABI from "../artifacts/contracts/RGOInsurance.sol/RGOInsurance.json";
import { utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Interface } from "@ethersproject/abi";
import { CONTRACTADDRESS } from "../Interactions";

const BuyInsurance = () => {
  const premiumPaid = useRef();

  const contractInterface = new utils.Interface(ContractABI.abi);
  const contractAddress = CONTRACTADDRESS;
  const contract = new Contract(contractAddress, contractInterface);

  const { state, send } = useContractFunction(contract, "orderInsurance");

  const premiumcost = [{ label: "AR-15", value: "1", id: 2 }];

  return (
    <div>
      <div>
        <div className=" gap-4 mt-5 mx-10">
          <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-3">
            <h1 className="text-center font-bold text-xl">
              Purchase a Responible Gun Owner Insurance Policy
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
                <option value="1">AR-15</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="text-xl mr-5 inline-block text-right w-1/3">
                Firearm Serial #
              </label>
              <input className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3" />
            </div>
            <div className="mt-5">
              <label className="text-xl mr-5 inline-block text-right w-1/3">
                Premium Cost
              </label>
              <input
                placeholder="2,000 MATIC"
                type="number"
                className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
              />
            </div>
            <div className="mt-5">
              <label className="text-xl mr-5 inline-block text-right w-1/3">
                Amount Covered
              </label>
              <input
                placeholder="200,000 MATIC"
                type="number"
                className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
              />
            </div>

            <div className="text-center mt-10">
              <button
                //                onClick={orderInsurance}
                className="py-2 px-8 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900"
              >
                Buy
              </button>
            </div>
          </div>
        </div>

        <div className=" gap-4 mt-5 mx-10">
          <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl">
            <h1 className="text-center font-bold text-xl">
              Responsible Gun Owner Insurance Policy Purchasing Information
            </h1>
            <ul className="list-inside list-decimal mt-5 p-5 bg-gray-900 rounded-xl">
              <li>
                Beneficiaries of the RGO payouts are the confirmed victims of
                the use of the firearm ( neither the firearm owner nor firearm
                user will receive a payout as Responsible Gun Owner Insurance
                supports the victims of firearm use).
              </li>
              <li>
                Beneficiaries are payed out “per stirpes” meaning should one of
                the beneficiaries die before receiving their share, their
                portion would then be divided among their children or registered
                closest kin in their will.
              </li>
              <li>
                When you create a policy, we will assign a Payout Administrator.
                The Payour Administrator is tasked with collecting beneficiary
                information and allocating payouts should an indedent occur.
              </li>
              <li>
                The policies cover property damage, bodily injury, mental health
                services, and other losses resulting from the accidental use of
                a firearm.
              </li>
            </ul>
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
      </div>
    </div>
  );
};

export default BuyInsurance;
