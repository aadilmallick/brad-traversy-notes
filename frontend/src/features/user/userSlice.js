import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../utils/authService";

const initialState = {
  user: authService.getUserFromLocalStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * payload should be an object containing user info, like {name, email, password}
 */
export const register = createAsyncThunk(
  "user/register",
  async (payload, thunkAPI) => {
    try {
      const user = { ...payload };
      await authService.registerUser(user);
      return user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     *
     * @param {*} state
     * @param {{payload: boolean}} action set loading state to false or true.
     */
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("finished!");
      state.user = action.payload;
      state.isSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error!");
      console.log(action.payload);
      state.message = action.payload;
    },
  },
});

export const { setLoading, setUser, logout } = userSlice.actions;

export const selectUser = (state) => {
  return state.user.user;
};

export default userSlice.reducer;
