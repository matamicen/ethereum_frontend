import {UserSliceState, User} from '../../../core/models/user.types'
const userState:UserSliceState = {
    // list: {list: []}
    list: [{"id": 0,
        "email":      "",
        "first_name": "",
        "last_name":  "",
        "avatar":     ""}]
}
  
export { userState as initialState }