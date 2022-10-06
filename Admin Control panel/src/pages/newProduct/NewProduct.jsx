import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Progress } from "../../components/Progress";
import { Success } from "../../components/Success";
import app from "../../firebase";
import { axiosInstance } from "../../utility";
import "./newProduct.css";

export default function NewProduct() {
const[inputs,setInputs]=useState({})
const[files,setFiles]=useState(null)

const[choice,setChoice]=useState("")
const[progress,setProgress]=useState({state:false,
                                      progress:0})
const[created,setCreated]=useState(false)
const {token} = useSelector(state => state.userReducer.adminData)


const handleSubmit= async ()=>{
//  const {data}= await axios.post('/api/products/create',{headers:{
//    "token":token
//  }})
//  console.log(data)
 
const storage = getStorage(app);
const storageRef = ref(storage, files.name);

const uploadTask = uploadBytesResumable(storageRef, files);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress({state:true,progress:progress})
    console.log('Upload is ' + progress + '% done');
     
   
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
      const products={...inputs,img:downloadURL,idnt:choice,qant:1}
      console.log(products)
     const {data} =await axiosInstance.post('/api/products/create',products,{headers:{
    "token":`Bearer ${token}`
      }})
       console.log(data)
       setInputs({})
       setFiles(null)

    })
   
  }
);




}
const handleChange=(e)=>{
  setInputs(prev=>
    {
       return {...prev,[e.target.name]:e.target.value}
    }
  )
console.log(inputs)
}

  return (<>{progress.state?<Progress progress={progress.progress}/>:created?<Success/>:
    <>
     <div className="productlist-header order-margin addproduct">
           <img src="/addproduct.jpg" alt="" />
           <div className="product-list-text">
             <h1>add product</h1>
           </div>
       </div>
  <div className="newProduct">
      <form className="addProductForm" onSubmit={(e)=>{e.preventDefault()
        handleSubmit({img:"",stock:2})}}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e)=>{console.log(e.target.files[0]) 
            setFiles(e.target.files[0])}}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input name='name' type="text" placeholder="name of your product"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Product detail</label>
          <input name='disc'type="text" placeholder="put some detail about your product" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input name='countInStock' type="text" placeholder="number of Quantity you have E.g :3" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Catagory</label>
          <select  onChange={(e)=>setChoice(e.target.value)}>
            <option value="" disabled selected>Select catagories</option>
            <option value="men">men</option>
            <option value="women">woman</option>
            <option value="kid">kid</option>
            <option value="family">family</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>price</label>
          <input name="price" type="text" placeholder="10" onChange={handleChange} />
        </div>
        
        <button className="addProductButton" type='submit'>Create</button>
      </form>
    </div>
  </>
  }
    
  </>);
}
