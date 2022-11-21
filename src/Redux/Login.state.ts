import { createSlice } from '@reduxjs/toolkit'

export interface userState {
  user: string,
  token: string,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    token: '',

  },
  reducers: {
    changeUser ( state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    }
  }
})

// Action creators are generated for each case reducer function

export const { changeUser } = userSlice.actions
export default userSlice.reducer