import { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './state'
import {UserSliceState, User} from '../../../core/models/user.types'

const reducers = {
    setUserList: (state: UserSliceState, action: PayloadAction<User[]>) => {
        state.list = action.payload;
        console.log(JSON.stringify(action.payload))
        
      }
}

export default reducers



  