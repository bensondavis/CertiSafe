import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";

//components
import Appbar from "./components/Appbar";

//pages
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import AdminsPage from "./pages/AdminsPage";
import PublisherPage from "./pages/PublisherPage";
import OwnerPage from "./pages/OwnerPage";
import Home from "./pages/Home";
import Result from "./pages/Result";
import ViewPage from "./pages/ViewPage";

const OWNER = process.env.REACT_APP_OWNER_ADDR;
const ADMINS = process.env.REACT_APP_ADMIN_ADDRS;
const PUBLISHER = process.env.REACT_APP_PUBLISHER_ADDR;

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="App">
      <Appbar walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
      <Routes>
        <Route path="search" element={<SearchPage />} />
        <Route exact path="view" element={<ViewPage />}>
          <Route path=":id" element={<Result/>} />
        </Route>
        <Route
          exact
          path="/publisher-dashboard"
          element={
            walletAddress === PUBLISHER ? (
              <PublisherPage />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        ></Route>
        <Route
          exact
          path="/admin-dashboard"
          element={
            walletAddress === ADMINS.split(" ")[0] ||
            walletAddress === ADMINS.split(" ")[1] ||
            walletAddress === ADMINS.split(" ")[2] ? (
              <AdminsPage />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        ></Route>
        <Route
          exact
          path="/owner-dashboard"
          element={
            walletAddress === OWNER ? (
              <OwnerPage />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        ></Route>
        <Route
          exact
          path="/login"
          element={
            walletAddress == OWNER ? (
              <Navigate to={"/owner-dashboard"} replace />
            ) : walletAddress == ADMINS.split(" ")[0] ||
              walletAddress == ADMINS.split(" ")[1] ||
              walletAddress == ADMINS.split(" ")[2] ? (
              <Navigate to={"/admin-dashboard"} replace />
            ) : walletAddress == PUBLISHER ? (
              <Navigate to={"/publisher-dashboard"} replace />
            ) : (
              <LoginPage
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
              />
            )
          }
        ></Route>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Navigate to={"/"} replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
