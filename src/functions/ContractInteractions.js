import { ethers } from "ethers";
import ABI from "../contract/ABI.json";
import Swal from 'sweetalert2'

const ADDRESS = process.env.REACT_APP_SMART_CONTRACT_ADDRESS;

const handleOpenDialog = (title,text, icon ) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "Ok"
  });
}

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
    
    contract
      .searchById(value)
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

const getNonValidatedIds = (setIds) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner
    .getNonValidatedCertificates()
    .then((res) => {
      setIds(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const uploadDocument = (id, hash, name, details, issuedOn, url, setTxnHash) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner
    .addCertificate(id, hash, name, details, issuedOn, url)
    .then((res) => {
      setTxnHash(res.hash);
      handleOpenDialog("Upload successfull", `Txn hash: ${res.hash}`, "success");
    })
    .catch((err) => {
      handleOpenDialog("Error", `${err.reason}`, "error");
    });
};

const acceptDoc = (id) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.accept(id).then((res) => {
    handleOpenDialog("Action Successful", `Txn hash: ${res.hash}`, "success");
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured`, "error");
  });
}

const rejectDoc = (id) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.reject(id).then((res) => {
    handleOpenDialog("Action Successful", `Txn hash: ${res.hash}`, "success");
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured`, "error");
  });
}

const login = (setUser) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.login().then((res) => {
    const userType = parseInt(res);
    if(userType > 0) {
      setUser(userType);
      handleOpenDialog("Login Successfull", "", "success")
    } else {
      handleOpenDialog("Login failed", "Invalid user", "info")
    }
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured`, "error");
  });
}

const addAdmin = (adminAddress, setAdminAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.addAdmin(adminAddress).then((res) => {
    handleOpenDialog("Txn Successful", `Txn hash: ${res.hash}`, "success");
    setAdminAddress("");
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured: ${err.reason}`, "error");
  })
};

const addPublisher = (publisherAddress, setPublisherAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.addPublisher(publisherAddress).then((res) => {
    handleOpenDialog("Txn Successful", `Txn hash: ${res.hash}`, "success");
    setPublisherAddress("");
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured: ${err.reason}`, "error");
  })
};

const removeAdmin = (adminAddress, setAdminAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.removeAdmin(adminAddress).then((res) => {
    handleOpenDialog("Txn Successful", `Txn hash: ${res.hash}`, "success");
    setAdminAddress("");
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured: ${err.reason}`, "error");
  })
};

const edit = (id, name, details) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const signer = provider.getSigner();
  const daiWithSigner = contract.connect(signer);
  daiWithSigner.edit(id, name, details).then((res) => {
    handleOpenDialog("Edit Successful", `Txn hash: ${res.hash}`, "success");
  }).catch((err) => {
    handleOpenDialog("Error", `An error occured: ${err.reason}`, "error");
  })
}

export { handleSearch, getNonValidatedIds, uploadDocument, acceptDoc, rejectDoc, login, addAdmin, addPublisher, removeAdmin, edit };
