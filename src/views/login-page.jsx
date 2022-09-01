import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedinUser } from "../store/user/userSlice";
import { userService } from "../services/user.service";
export const LoginPage = () => {
  const [userName, setUserName] = useState(null);
  const [admin, setAdmin] = useState({
    id: "admin-1",
    fullname: "Admin",
    email: "",
    imgUrl: "",
  });
  const [adminPassword, setAdminPassword] = useState({
    password: "",
  });
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value } = target;
    setUserName(value);
  };

  const onLoggedinUser = (ev) => {
    ev.preventDefault();
    navigate("/desk");
    const user = userService.onLoginUser(userName);
    dispatch(setLoggedinUser(user));
  };

  const handleChangeAdmin = ({ target }) => {
    const { value } = target;
    if (target.name === "adminEmail") {
      setAdmin({ ...admin, email: value });
    }
    if (target.name === "adminPassword") {
      setAdminPassword({ ...adminPassword, password: value });
    }
  };

  const onLoggedinAdmin = (ev) => {
    ev.preventDefault();
    if (userService.validateAdmin(admin, adminPassword)) {
      navigate("/desk");
      dispatch(setLoggedinUser(admin));
    }
  };

  return (
    <section className="login-page flex column justify-center align-center">
      <h5>Choose your name:</h5>

      <FormControl fullWidth className="select">
        <InputLabel id="users">User</InputLabel>
        <Select
          name="users"
          id="users"
          label="User"
          onChange={handleChange}
          defaultValue=""
        >
          {users.map((user) => {
            return (
              <MenuItem value={user.fullname} key={user.id}>
                {user.fullname}
              </MenuItem>
            );
          })}
        </Select>
        <button className="btn btn-primary" onClick={onLoggedinUser}>
          Login
        </button>
      </FormControl>

      <hr />
      <form className="flex column justify-center align-center">
        <label htmlFor="adminEmail">Or login as Admin:</label>
        <input
          type="email"
          name="adminEmail"
          placeholder="Email"
          onChange={handleChangeAdmin}
        />
        <input
          type="password"
          name="adminPassword"
          placeholder="Password"
          onChange={handleChangeAdmin}
        />
        <button className="btn btn-primary" onClick={onLoggedinAdmin}>
          Login as Admin
        </button>
      </form>
    </section>
  );
};
