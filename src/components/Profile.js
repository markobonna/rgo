import { useState, useEffect } from "react";
import { PrivyClient, SiweSession } from "@privy-io/privy-browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize the Privy client.
const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(
  process.env.NEXT_PUBLIC_PRIVY_API_KEY,
  provider
);
const client = new PrivyClient({
  session: session,
});

function Profile() {
  const [state, setState] = useState(null);
  const [firstInput, setFirstInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [safetyInput, setSafetyInput] = useState("");
  const [carryInput, setCarryInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [serialInput, setSerialInput] = useState("");
  const [stateInput, setStateInput] = useState("");

  const fetchDataFromPrivy = async () => {
    try {
      // If this is a refresh, we need to pull the address into state
      const address = await session.address();
      if (!address) return;

      // Fetch user's information
      const [firstName] = await client.get(address, [
        "first-name",
        "last-name",
        "safety-training",
        "concealed-carry-holder",
        "state-id",
        "firearm-type",
        "firearm-serial-number",
      ]);
      setState({
        ...state,
        userId: address,
        firstInput: firstInput?.text(),
      });
      setFirstInput(firstInput?.text());
      setLastInput(lastInput?.text());
      setSafetyInput(safetyInput?.text());
      setCarryInput(carryInput?.text());
      setTypeInput(typeInput?.text());
      setSerialInput(serialInput?.text());
      setStateInput(stateInput?.text());
    } catch (error) {
      console.error(error);
    }
  };

  // When the page first loads, check if there is a connected wallet and get
  // user data associated with this wallet from Privy
  useEffect(() => {
    fetchDataFromPrivy();
  }, []);

  /* Write the user's name and favorite color to Privy and personalizes the app */
  const submitDataToPrivy = async () => {
    const [
      firstInput,
      lastInput,
      safetyInput,
      carryInput,
      typeInput,
      serialInput,
      stateInput,
    ] = await client.put(state?.userId, [
      {
        field: "first-name",
        value: firstInput,
      },
      {
        field: "last-name",
        value: lastInput,
      },
      {
        field: "safety-training",
        value: safetyInput,
      },
      {
        field: "concealed-carry-holder",
        value: carryInput,
      },
      {
        field: "firearm-type",
        value: typeInput,
      },
      {
        field: "firearm-serial-number",
        value: serialInput,
      },
      {
        field: "state-id",
        value: stateInput,
      },
    ]);
    setState({
      ...state,
      firstInput: firstInput.text(),
      lastInput: lastInput.text(),
      safetyInput: safetyInput.text(),
      carryInput: carryInput.text(),
      typeInput: typeInput.text(),
      serialInput: serialInput.text(),
      stateInput: stateInput.text(),
    });
  };

  return (
    <div>
      <div className="inputForm">
        <div className=" gap-4 mt-5 mx-10">
          <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-3">
            <h1 className="text-center font-bold text-xl">
              Your Responible Gun Owner Profile
            </h1>
            <div className="mt-5">
              <label
                className="text-xl mr-5 inline-block text-right w-1/3"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                type="text"
                className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
                onChange={(event) => {
                  setFirstInput(event.target.value);
                }}
                value={firstInput}
              />
            </div>

            <div className="mt-5">
              <label
                className="text-xl mr-5 inline-block text-right w-1/3"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                type="text"
                className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
                onChange={(event) => {
                  setLastInput(event.target.value);
                }}
                value={lastInput}
              />
            </div>

            <div>
              <div className="mt-5">
                <label
                  htmlFor="carry"
                  className="text-xl mr-5 inline-block text-right w-1/3"
                >
                  Concealed carry holder?
                </label>
                <select
                  name="type"
                  className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
                  onChange={(event) => {
                    setCarryInput(event.target.value);
                  }}
                  value={carryInput}
                >
                  <option value="">No</option>
                  <option value="">Yes</option>
                </select>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="safety"
                  className="text-xl mr-5 inline-block text-right w-1/3"
                >
                  Completed a safety training within the last year?
                </label>
                <select
                  name="type"
                  className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
                  onChange={(event) => {
                    setSafetyInput(event.target.value);
                  }}
                  value={safetyInput}
                >
                  <option value="">No</option>
                  <option value="">Yes</option>
                </select>
              </div>
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
                  onChange={(event) => {
                    setTypeInput(event.target.value);
                  }}
                  value={typeInput}
                >
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
                  onChange={(event) => {
                    setSerialInput(event.target.value);
                  }}
                  value={serialInput}
                />
              </div>
              <div className="mt-5">
                <label className="text-xl mr-5 inline-block text-right w-1/3">
                  What State do you live in?
                </label>
                <input
                  type="text"
                  className="text-black border w-2/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"
                  onChange={(event) => {
                    setStateInput(event.target.value);
                  }}
                  value={stateInput}
                />
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                className="py-2 px-8 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900"
                style={{ fontSize: "1.6rem" }}
                onClick={submitDataToPrivy}
              >
                Save Profile to Privy
              </button>
            </div>
          </div>
        </div>

        <div className=" gap-4 mt-5 mx-10">
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
}

export default Profile;
