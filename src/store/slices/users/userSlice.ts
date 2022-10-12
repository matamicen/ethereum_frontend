import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import reducers from './reducers'

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers
})

export default userSlice.reducer

