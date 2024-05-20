import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

function showAlert(message) {
  Swal.fire({
    title: message,
    text: "You clicked the button!",
    icon: "error",
  });
}

export const getLoginInfo = createAsyncThunk(
  "user/getLoginInfo",
  async (args, thunkApi) => {
    try {
      const url =
        "https://meditech20240517184700.azurewebsites.net/api/Account/Login";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(url, args, config);
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      const status = error.response.data.errorCode;
      if (status === 401) {
        const message = error.response.data.errorMessage;
        showAlert(message);
      } else {
        const message = error.response.data.title;
        showAlert(message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { loginInfo: null, isLogin: false, loading: null },
  reducers: {
    unmountLogin: (state, action) => {
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLoginInfo.fulfilled, (state, action) => {
      state.loginInfo = action.payload;
      if (action.payload) {
        state.isLogin = true;
      }
      state.loading = false;
    });
    builder.addCase(getLoginInfo.rejected, (state, action) => {
      state.isLogin = false;
      state.loading = false;
    });
  },
});
export const {unmountLogin} = userSlice.actions;
export default userSlice.reducer;
