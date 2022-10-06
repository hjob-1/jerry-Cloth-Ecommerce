import axios from "axios"

const fetchData=async(id)=>{
    const {data}= await axios.get(`/api/products/${id}`)

    return{...data}

}
export default fetchData;