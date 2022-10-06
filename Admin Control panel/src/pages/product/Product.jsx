import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useParams } from 'react-router-dom'
import { useEffect,useState} from "react";
import {useSelector} from "react-redux"
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { axiosInstance } from "../../utility";

export default function Product() {
    const {_id} =useParams()
    const [inputs,setInputs]=useState({})
    const [image,setImage]=useState()
     const [options,setOptions]=useState({})
    const[product,setProduct]=useState({})
    const products = useSelector(state => state.productReducer.products)
    const {token} = useSelector(state => state.userReducer.adminData)


useEffect(() => {
    const fetchData=()=>{
try{
         const filteredProduct=products.find(product=>product._id==_id)
         setProduct(filteredProduct)
  }catch(e){
      console.log(e)
  }
    }
    fetchData()
}, [])

const handleChange=(e)=>{
    setInputs(prev=>{
        return{...prev,[e.target.name]:e.target.value}
    })
    console.log(inputs)
}
const optionHandler=(e)=>{
    setOptions(prev=>{
        return{...prev,[e.target.name]:e.target.value}
    })
    console.log(inputs,options)
}

const handleUpdate=async (e)=>{

e.preventDefault()
const storage = getStorage(app);
const storageRef = ref(storage, image.name);

const uploadTask = uploadBytesResumable(storageRef, image);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     
   
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
       
        
      const product={...inputs,img:downloadURL,...options,qant:1}
      console.log(product)
       await axiosInstance.put(`/api/products/${_id}`,product,{headers:{
    "token":`Bearer ${token}`
      }})
       
       setInputs({})
       setImage(null)

    })
   
  });

}
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.name}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id: </span>
                      <span className="productInfoValue">{" "} {1}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">InStock:</span>
                      <span className="productInfoValue">{product.countInStock}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Catagory:</span>
                      <span className="productInfoValue">{product.idnt}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">discription:</span>
                      <span className="productInfoValue">{product.disc}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.countInStock<1?'no':'yes'}</span>
                  </div>
              </div>
          </div>
          <div className="productBottom">
            <form className="productForm" onSubmit={handleUpdate}>
               <div className="productFormLeft">
                  <label>Product Name</label>
                  <input name="name" type="text" placeholder={product.name} onChange={handleChange}/>
                  <label>Product Detail</label>
                  <input name="disc" type="text" placeholder={product.disc} onChange={handleChange}/>
                  <label>In Stock</label>
                  <input name="countInStock" type="text" placeholder={product.countInStock} onChange={handleChange}/>
                   <label>price</label>
                  <input name="price" type="text" placeholder="200" onChange={handleChange}/>
                   <label>quantity</label>
                  <input name="qant" type="text" placeholder="2" onChange={handleChange}/>
                  <label>Catagory</label>
                  <select name="idnt" id="active" onChange={optionHandler}>
                    <option value="select catagory" selected disabled>select catagory</option>
                      <option value="men">men</option>
                      <option value="women">women</option>
                      <option value="kids">kids</option>
                      <option value="family">family</option>
                     
                  </select>
                </div>
                <div className="productFormRight">
                   <div className="productUpload">
                       <img src={product.img} alt="" className="productUploadImg" />
                       <label for="file">
                          <Publish/>
                       </label>
                      <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setImage(e.target.files[0])}/>
                  </div>
                  <button className="productButton" type="submit">Update</button>
                </div>
          </form>
      </div>

      </div>
       
    </div>
     
  );
}
