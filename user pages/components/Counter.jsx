import React, { useState } from "react";
import Total from "./Total";

class Counter extends React.Component {
   constructor(props) {
       super(props)
   
       this.state = {
            value:1
       }
   }
   handleMinus= ()=>{
       if(this.state.value>1)
       this.setState({value:this.state.value-1})
       else
       this.setState({value:1})

   }
   handlePlus= ()=>{
       if(this.state.value<10)
       this.setState({value:this.state.value+1})
       else
       this.setState({value:this.state.value})
       
   }
   handleChange= (e)=>{
       this.setState({value:e.target.value})
      
   }
  
   render(){  
     
    return (<>
           <div className="prodItemCounter">
                              <button className="minus" onClick={this.handleMinus}>-</button>
                              <input type="text" value={this.state.value} className='counter' onChange={(e)=>this.handleChange(e)}/>
                              <button className="plus" onClick={this.handlePlus}>+</button>
            </div>
             </>
            )
}
}
export default Counter
