import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserSliceState } from '../core/models/user.types';
import { RootState, AppDispatch } from '../store/store'


  const About = () => {

  const  {list: users}  = useSelector<RootState, UserSliceState>((state) => state.users);

  return (
    <>
    <div>about3</div>
    {
        //   console.log(users.list)
          users.map((user:any, index:any) => (
          
                <div key={index} className="col-md-3 mb-4">{index} 
                   <div> <p >yyyyyyy{user.email}</p> </div>
                </div>
         
          )) 
        }
    </>
  )
}
export default About