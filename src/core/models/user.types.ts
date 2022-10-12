export interface User_ {
    list:                       any[]
    
  }

  export interface User {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}


export interface UserSliceState {
    list:                       User[]

}
  