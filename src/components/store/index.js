import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/login-slice";
import prescriptions from "./slice/prescriptions-slice";

export default configureStore({
  reducer: {
    user,
    prescriptions,
  },
});
