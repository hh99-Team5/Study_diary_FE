import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { email: "", position: "visitor" };

const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    loginUser: (state, action) => {
      const { email, position } = action.payload;
      state.value = { email, position };
    },
    logoutUser: (state) => {
      state.value = initialStateValue;
    }
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
