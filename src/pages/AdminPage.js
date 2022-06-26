import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageLiquidity from "../components/ManageLiquidity";
import PayoutClaim from "../components/PayoutClaim";

const AdminPage = () => {
  return (
    <div>
      <div className="gap-4 mt-5 mx-10">
        <ManageLiquidity />

        <PayoutClaim />
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
  );
};

export default AdminPage;
