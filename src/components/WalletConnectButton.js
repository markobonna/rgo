import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEthers } from "@usedapp/core";
import { INFURAID } from "../Interactions";

const infuraId = INFURAID;

const WalletConnectButton = () => {
  const { activate, account, deactivate } = useEthers();

  async function onConnect() {
    const provider = new WalletConnectProvider({
      infuraId: INFURAID,
    });
    await provider.enable();
    activate(provider);
  }

  return account ? (
    <div className="flex bg-gray-800 p-3 rounded-xl">
      <button
        onClick={deactivate}
        className="bg-indigo-800 hover:bg-indigo-900 p-3 rounded-xl mr-3"
      >
        Disconnect Wallet Connect
      </button>
      <h1 className="text-white bg-indigo-800 p-3 rounded-xl">
        Welcome WalletConnect {account}
      </h1>
    </div>
  ) : (
    <button
      className="p-3 bg-indigo-800 text-white text-sm rounded-xl hover:bg-indigo-900"
      onClick={onConnect}
    >
      Connect to Wallet Connect
    </button>
  );
};
export default WalletConnectButton;
