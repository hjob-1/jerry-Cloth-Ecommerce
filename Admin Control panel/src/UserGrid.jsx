import React ,{useState}from 'react'
import { DeleteOutline, Visibility } from "@material-ui/icons";
import { useDispatch ,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { productSuccess } from './redux/actions/productFetch';
import { fetchuserSuccess, signInSuccess } from './redux/actions/userAction';
import axios from 'axios';


export const UserGrid = () => {
   const {token}=useSelector(state=>state.userReducer.adminData)
   const users = useSelector(state => state.userReducer.userData)

const dispatch=useDispatch()

    const handleDelete= async({_id})=>{


        try
        { console.log(token)
          const {data}=await axios.delete(`/api/users/delete/${_id}`,{headers:{"token":`Bearer ${token}`}})
          dispatch( fetchuserSuccess(data))
        }catch(e){
            console.log(e)
        }
        // console.log(_id)
        //   const filtered=users.filter((item,index)=>item._id!==_id)
        //   console.log(filtered)
        //   console.log(users)


        //   dispatch( fetchuserSuccess(filtered))
    }



    return (
        <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>EMAIL</th>
                <th>isAdmin</th>
                <th>Action</th>
            </tr>
         </thead>   
        <tbody>

           
            {users.map((user,index)=>(
            <tr key={index}>
                <td >{index+1}</td>
                <td className='img__name_wrapper'>
                    <img src={user.img} alt="no Image" /><span>{user.name}</span>
                </td>
                <td>{user.email}</td>
                 <td>{user.isAdmin?<span style={{color:"green",fontWeight:"bold"}}>yes</span>:<span>no</span>}</td>
                <td className='btns'>
                    <Link to={`/product/${user._id}`}>
                        <span className='btn edit' >edit</span>
                    </Link>
                    <DeleteOutline className='delete' onClick={()=>handleDelete(user)} />
                </td>
                
            </tr>

            ))}
         </tbody>
            
</table>
    )
}

