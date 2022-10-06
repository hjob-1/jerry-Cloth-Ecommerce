import React, { useState } from 'react'
import './editprofile.css'
import app from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import { Success } from './Success'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Progress } from './Progress';
import { signInSuccess } from '../redux/actions/userAction';
import { axiosInstance } from '../config';

function EditProfile() {
    const dispatch = useDispatch();
     const[progress,setProgress]=useState({state:false,progress:0})
     const[created,setCreated]=useState(false)
     const {token,_id} = useSelector(state => state.user.userData)
     const [phone,setPhone]=useState('')
     const [password,setPassword]=useState('')
     const [name,setName]=useState('')
     const [gender,setGender]=useState('')
     const [address,setAddress]=useState('')
     const [files,setFiles]=useState('')
     const[error ,setError]=useState(false)

       const handleSubmit=()=>{

        const storage = getStorage(app);
        if(!files.name||address.length<1||password.length<1||phone.length<1||name.length<1){
          setError(true)
          return;
        }

        else
        {
        const storageRef = ref(storage, files.name);

       const uploadTask = uploadBytesResumable(storageRef, files);


uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   
    console.log('Upload is ' + progress + '% done');
      setProgress({state:true,progress:progress})
   
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
   () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      console.log('File available at', downloadURL);
       
        setCreated(true)
        setProgress({state:false,progress:progress})
      const user={phone,password,name,gender,img:downloadURL,address}
     
     const {data} =await axiosInstance.put(`/api/users/${_id}`,user,{headers:{
    "token":`Bearer ${token}`
      }})
      const userInfo={...data,token}
      console.log(userInfo)
       dispatch(signInSuccess({...data,token:token}))
       localStorage.setItem("userData",JSON.stringify(userInfo))
    
    })
   
  }
);

        }

           
       }
    return (
        <div>
        <form className='edit-detail'>

            {progress.state?<Progress progress={progress.progress}/>:created?<Success/>:<>
            
            
             <h3>EDIT YOUR PROFILE</h3>
                <div className="form-actions">
                    <div className="edit-inputwrapper"> 
                        <label htmlFor="">Name:</label>
                       <input type="text"  onChange={(e)=>setName(e.target.value)}/>
                    </div> 
                   
                    <div className="edit-inputwrapper"> 
                          <label htmlFor="">Phone:</label>
                          <input type="number" name='phone' onChange={(e)=>setPhone(e.target.value)}/>
                    </div>     
                    <div className="edit-inputwrapper">
                             <label htmlFor="">Password:</label>
                        <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="edit-inputwrapper">
                        <label htmlFor="">Gender:</label>
                        <select  name="select"  id="" onChange={(e)=>setGender(e.target.value)}>
                            <option value="select" disabled selected>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="edit-inputwrapper">
                        <label htmlFor="">Address:</label>
                        <input type="text" name='Address' onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                    <div className="edit-inputwrapper-file">    
                        <input type="file" name='file' onChange={(e)=>setFiles(e.target.files[0])} />
                    </div>
                   {error&&<p style={{color:"red",
                                  fontSize:"13px"}}>Please fill All Inputs</p>}
              
                    <div className="update"  onClick={handleSubmit}>
                        <span className="updatebtn"> update</span>
                    </div>
               </div>
            </>}
               
        </form>
        </div>
    )
}

export default EditProfile
