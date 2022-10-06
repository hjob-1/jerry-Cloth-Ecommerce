import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Products from '../components/Products'
import Catagories from '../components/Catagories'
import FilterBtns from '../components/FilterBtns'
import React from 'react';
import { catagories } from '../data'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import axios from 'axios'
import { axiosInstance } from '../config'
import LoadingBox from '../components/LoadingBox'
import { MessageBox } from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect ,useState} from 'react'

import { productActionFailure, productActionRequest, productActionSuccess } from '../redux/actions/productAction'
import { SlideImg } from '../components/SlideImg'

const Home=()=>  {
   
  let products=[]
    products=useSelector(state=>state.products.products);
    const loading=useSelector(state=>state.products.loading)
    const {_id}=useSelector(state=>state.user.userData)
   
    const dispatch = useDispatch();
    const fetchData=async()=>{
        dispatch(productActionRequest())
        try{
        const {data}= await axiosInstance.get('/api/products/',{data:{format:'json'}});
        
       
        dispatch(productActionSuccess(data))
       
           }
           catch(error)
            {
         dispatch(productActionFailure(error.message))
             }

    }

    useEffect(() => {
       if(products.length>0){
         return
       }
       else{
  fetchData()
       }
  
    }, [])



    const[viewmore, setViewMore]=useState({intial:0,final:16})
   
    const [sliceProducts,setsliceProducts]=useState(products);
    const [filtered, setfiltered] = useState(sliceProducts)
    const [searchbegin,setSearchBegin]=useState(false)
  
 

  const handleFilter=(data)=>
            {
      setfiltered(data)
             }
  const handleMore=()=>{

       setViewMore(prev=>{

           return{ intial:0,final:prev.final+12 }
    })  
    
  }

  useEffect(() => {
     setsliceProducts(products.slice(0,viewmore.final))
    
     console.log(sliceProducts,"slice run due run products change and view more change")
    
     
  }, [viewmore,products])

   useEffect(() => {
    
     setfiltered(sliceProducts)
    
     console.log(filtered,"filtered set after slice changed")
     
  }, [sliceProducts])

   useEffect(() => {
    
     setfiltered(filtered)
    
     console.log(filtered,"filtered set due to filtered change ")
     
  }, [filtered])



  
    return (
        <>
            { loading?<LoadingBox/>:<>       
           <Announcement/>
           
           <Navbar setSearchBegin={setSearchBegin} handleFilter={handleFilter} products={products} sliceProducts={sliceProducts}/>
           {searchbegin?<Products filtered={filtered} handleMore={handleMore} searchbegin={searchbegin}/>:
           <>
          <SlideImg/>
           <Catagories handleFilter={handleFilter} sliceProducts={sliceProducts}/>
           <FilterBtns  handleFilter={handleFilter} sliceProducts={sliceProducts}/>
           <Products filtered={filtered} handleMore={handleMore} /> 
           </> }
           
           <NewsLetter/>
           <Footer/>
           </>
            }
            
        </>
    )

}
export default Home