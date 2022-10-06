import React, { Component } from 'react'

export default class Total extends Component {
    passTotal=(oneItemTotalPrice,id)=>{
       this.props.handleTotal(oneItemTotalPrice,id,this.props.total)
       
    }
    render() {
        let totalPrice=this.props.price*this.props.total
         this.passTotal(totalPrice,this.props.id)
        return (
            <span className='cart-left-total'> {totalPrice}</span>
        )
    }
}
