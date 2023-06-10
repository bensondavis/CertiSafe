import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";

//components
import Appbar from "./components/Appbar";
import ListDocuments from "./components/ListDocuments";
import Edit from "./components/Edit";
import EditInfo from "./components/EditInfo";
import PublishDoc from "./components/PublishDoc";
import Welcome from "./components/Welcome";

//pages
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import AdminsPage from "./pages/AdminsPage";
import PublisherPage from "./pages/PublisherPage";
import OwnerPage from "./pages/OwnerPage";
import Home from "./pages/Home";
import ViewDocument from "./pages/ViewDocument";


function App() {
  const [user, setUser] = useState(0);

  return (
    <div className="App">
      <Appbar user={user} setUser={setUser} />
      <Routes>
        <Route path="search" element={<SearchPage />} />
        <Route exact path="view/:id" element={<ViewDocument />} />
        <Route
          exact
          path="publisher"
          element={
            user === 2 ? <PublisherPage /> : <Navigate to={"/login"} replace />
          }
        >
          <Route index element={<Welcome/>} />
          <Route path="publish" element={<PublishDoc/>} />
          <Route path="edit" element={<Edit />}>
            <Route path=":id" element={<EditInfo />} />
          </Route>
        </Route>
        <Route
          exact
          path="admin-dashboard"
          element={
            user === 3 ? <AdminsPage /> : <Navigate to={"/login"} replace />
          }
        >
          <Route index element={<ListDocuments />} />
          <Route
            path="validate/:id"
            element={<ViewDocument validate={true} />}
          />
        </Route>
        <Route
          exact
          path="owner-dashboard"
          element={
            user === 1 ? <OwnerPage /> : <Navigate to={"/login"} replace />
          }
        ></Route>
        <Route
          exact
          path="login"
          element={
            user === 1 ? (
              <Navigate to={"/owner-dashboard"} replace />
            ) : user === 3 ? (
              <Navigate to={"/admin-dashboard"} replace />
            ) : user === 2 ? (
              <Navigate to={"/publisher"} replace />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        ></Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to={"/"} replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
