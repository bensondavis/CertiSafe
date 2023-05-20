import detectEthereumProvider from "@metamask/detect-provider";
import Swal from "sweetalert2";

const OWNER = process.env.REACT_APP_OWNER_ADDR;
const ADMINS = process.env.REACT_APP_ADMIN_ADDRS;
const PUBLISHER = process.env.REACT_APP_PUBLISHER_ADDR;

const ConnectWallet = async (setWalletAddress, setMessage) => {
  const provider = await detectEthereumProvider();
  if (provider) {
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      if (
        accounts[0] == OWNER ||
        accounts[0] == PUBLISHER ||
        accounts[0] == ADMINS.split(" ")[0] ||
        accounts[0] == ADMINS.split(" ")[1] ||
        accounts[0] == ADMINS.split(" ")[2]
      ) {
        setWalletAddress(accounts[0]);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid user",
          icon: "error",
        });
      }
    } catch (error) {
      setMessage(error);
    }
  } else {
    console.log("Please install MetaMask!");
    setMessage("Please install MetaMask!");
  }
};

export default ConnectWallet;
