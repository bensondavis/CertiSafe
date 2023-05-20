import { ethers } from "ethers";
import ABI from "../contract/ABI.json";

const ADDRESS = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;

const handleSearch = (value, setLoading, setError, setData) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78"
  );
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  if (value.length > 10) {
    contract
      .searchByHash(value)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
  } else {
    const id = parseInt(value);
    contract
      .searchById(id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(true);
      })
      .then(() => {
        setLoading(false);
      });
  }
};

export { handleSearch };
