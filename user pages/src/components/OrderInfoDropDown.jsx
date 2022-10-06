import React from 'react'
export const OrderInfoDropDown = ({order,show}) => {

    const cartItem={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
      
        marginBottom:"10px"
        
       
    }
    const cartItemImg={
        flex:"3",
       
        height:"150px",
        width:"150px"

    }
    const cartItemInfo={
        flex:2,
        display:"flex",
        paddingLeft:"10px",
        flexDirection:"column",
      
        
    }
     let Ul={
        margin:"0px",
        listStyleType:"none",
     
        padding:"0px",
        transition:"height 1s ease",
    
        

    }
    const price={

        width:"200px",
        margin:"0 auto",
        marginTop:"50px",
        textAlign:"left",
       
      
    }
    const img={
        width:"100%",
        height:"100%",
        objectFit:"contain"
    }
    const color={
        color:"gray",
       
    }
    const wrapper={
          background:"rgb(236, 209, 159)",
          padding:"15px 10px",
          borderRadius:"7px"
    }
    // if(show){
    //     Ul={...Ul,maxHeight:"fit-content"}
    // }
    return (
        <div style={wrapper} >
                <ul className="cart-contents-detail" style={Ul} >

                    {order.products.map(product=>
                        
                        <li className="cart-item" style={cartItem} key={product._id}>
                        <div className="cart-item-img" style={cartItemImg}>
                            <img  style={img} src={product.img} alt={product.name} />
                        </div>
                        <div className="cart-item-info" style={cartItemInfo}>
                           <p>
                             <span style={color}>Price:</span> <b>{product.price} ETB</b>
                           </p>
                           <p>
                              <span style={color}> qantity:</span> <b>{product.qant}</b>
                           </p>
                          
                        </div>
                    </li>
                        )}
                    
                </ul>
                <div className="price-wrapper" style={price}>
                    <p>Total Orderd Cloth: <b> {order.totalCloth}</b></p>
                    <p>pay via <b>{order.paybank.bank}</b> </p>
                    <p>Total Price :<b> {order.totalPrice} ETB</b></p>
                </div>
        </div>
    )
}
