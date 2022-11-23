import { createSlice } from '@reduxjs/toolkit'

export interface attState {
 att: boolean,

}

export const attSlice = createSlice({
  name: 'att',
  initialState: {
   att: false,

  },
  reducers: {
    newAtt ( state, { payload }) {
    state.att = payload
    }
  }
})

// Action creators are generated for each case reducer function

export const { newAtt } = attSlice.actions
export default attSlice.reducer