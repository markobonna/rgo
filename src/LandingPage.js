import "./App.css";
import "./index.css";
import PolygonMetamaskButton from "./components/PolygonMetamaskButton";
import App from "./App";

const LandingPage = () => {
  return (
    <div className="text-blue-900">
      <div className="flex justify-end mt-5 mx-10"></div>
      <div className="flex justify-center">
        <div className="bg-blue-100 p-8 rounded-3xl filter drop-shadow-xl text-center m-20 w-max">
          <h1 className="text-center font-bold text-xl">
            Buy Responsible Gun Owner Insurance with Polygon , this prototype
            uses Polugon Mumbai testnet!
            <br />
            If you do not have a Crypto Wallet, sign up for one through Tatum
            Here _____.
            <br />
            If you have a wallet log into the DApp page at the top.
            <br />
            Test metamask button here <App />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
