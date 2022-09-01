import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user/userSlice";
import { MemberAvatar } from "../cmps/member-avatar";
import { Link } from "react-router-dom";

import WorkspacerLogo from "../assets/img/workspacer-logo.svg";
export const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedinUser = useSelector((state) => state.user.loggedinUser);

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="app-header flex">
      <Link to="/">
        <div className="header-logo flex align-center">
          <img src={WorkspacerLogo} alt="" />
          <h1>Workspacer</h1>
        </div>
      </Link>
      {loggedinUser && (
        <div className="user-actions flex align-center justify-end full">
          {loggedinUser.email !== "admin@feuerblocks.com" && (
            <MemberAvatar size={"32"} user={loggedinUser} />
          )}
          <p> {loggedinUser.fullname}</p>
          <button className="btn btn-primary" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
