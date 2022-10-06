import React from 'react'
import './modal.css'

export const Modal = ({modal,handleModal}) => {
const {user,item}=modal
const checkModal=()=>{
    if(user){
        return<div className="modalWrapperItem">
                <div className="modalImgWrapper">
                <img src={item.img} alt="" />
                </div>
                 <div className="modalInfoWrapper">
             <p>Id: {item._id}</p>
             <p>UserName:{item.name}</p>
            <p>Email:{item.email}</p>
            </div>
        </div>
    }
    return<div className="modalWrapperItem">
    <div className="modalImgWrapper">
     <img src={item.img} alt="" />
    </div>
     <div className="modalInfoWrapper">
        <p>name: {item.name}</p>
        <p>price:{item.price}</p>
        <p>stock: {item.countInStock}</p>
        <p>catagory:{item.idnt}</p>
    </div>

    </div>
    


}



    return (
        <div className="modalConatiner" style={{backgroundColor:" rgb(248, 246, 246)",zIndex:200}}>
            <div className="modalWrapper">
                <div className="btnClose" onClick={()=>handleModal({status:false,product:{}})}>x</div>

                   {checkModal()} 
                
            </div>
        </div>
    )
}
