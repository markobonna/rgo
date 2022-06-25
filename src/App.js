import "./App.css";
import "./index.css";
import AdminPage from "./pages/AdminPage";
import WalletConnectButton from "./components/WalletConnectButton";
import MetamaskConnectButton from "./components/MetamaskConnectButton";
import { useEthers } from "@usedapp/core";
import UserPage from "./pages/UserPage";
import { ADMINADDRESS } from "./Interactions";

const App = () => {
  const { account } = useEthers();

  const adminAddress = ADMINADDRESS;

  return (
    <div className="text-white">
      <div className="flex justify-end mt-5 mx-10">
        <MetamaskConnectButton />
      </div>
      {account === adminAddress && <AdminPage />}

      {account !== adminAddress && account && <UserPage />}
      {!account && (
        <div className="flex justify-center">
          <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl text-center m-20 w-max">
            <h1 className="text-center font-bold text-xl">
              Sign up here ____ or Connect your wallet to Buy Responsible Gun
              Owner Insurance with (cryptocurrency available)!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
