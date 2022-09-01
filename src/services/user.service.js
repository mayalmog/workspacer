import { users } from "../assets/data/users";

export const userService = {
  query,
  validateAdmin,
  onLoginUser,
  getUserByEmail,
};

let gUsers = [];
_createUsers();

function query() {
  return gUsers;
}

function getUserByEmail(userEmail) {
  return gUsers.find((user) => user.email === userEmail);
}

function onLoginUser(userName) {
  return gUsers.find((user) => user.fullname === userName);
}

function validateAdmin(adminInput, passwordInput) {
  if (
    adminInput.email === "admin@feuerblocks.com" &&
    passwordInput.password === "123456789"
  )
    return true;

  return false;
}

function _createUsers() {
  gUsers = users;
}
