import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchAllUsers } from '../store/slices/users/actions'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'
import {UserSliceState, User} from '../core/models/user.types'


const ContactUs = () => {
    const [listshow, setListshow] = useState(false);

    const  {list: users}  = useSelector<RootState, UserSliceState>((state) => state.users);
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch])

    const turnOn = () => {
       console.log('turnOn pressed')
       setListshow(true)
    }

    // <Image src={user.avatar} alt="avatar" /> 
  return (
  <>
    <div>contactUs
    {listshow ? <p >es true</p> : <p >es false</p>}
    </div>
    {listshow &&
    <div><p >rrrrr</p>
       {
          
          users.map((user:any, index:any) => (
          
                <div key={index} className="col-md-3 mb-4">{index} 
                   <div> <p >yyyyyyy{user.email}</p> </div>
                </div>
         
          )) 
        }

     
    </div>
      } 
    
    <div><button onClick={() => turnOn()}>fff</button></div>
 </>
    )
}

ContactUs.propTypes = {}

export default ContactUs

       {/* { 
          users.list?.map((user, index) => (
            <div key={index} className="col-md-3 mb-4">
            <div className="card">
             
              <div className="card-body">
                <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          </div>
          ))
}  */}