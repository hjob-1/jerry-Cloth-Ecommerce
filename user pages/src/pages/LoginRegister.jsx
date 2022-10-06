import React, { Component } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

import  '../components/loginregister.css'
import bg from '../assets/images/newsletter.jpg'
import { Redirect, useLocation } from 'react-router'

   


export class LoginRegister extends Component {

    constructor(){
        super();
        this.state={
            isLogin:true
        }
    }
    handleClick=(check)=>{
          if(check==='login')
             this.setState({isLogin:true})
             else
             this.setState({isLogin:false})
    }
    

    render() {
       
        const user=JSON.parse(localStorage.getItem("userData"));
       

        return (<>
             
                 {user?<Redirect to="/"/>: 
                 
                 <div className='loginregister-container'>
                    <img src={bg} alt=""/>
                    <div className="pop-container">
                    <div className="pop-detail-wrapper">
                        <div className="Rbtns-wrapper">
                            <button className={`login ${this.state.isLogin? 'active':null}`} onClick={()=>this.handleClick('login')}>Login</button>
                            <button className={`register ${this.state.isLogin? '':'active'}`} onClick={()=>this.handleClick('register')}>Register</button>
                        </div>
                        {this.state.isLogin ?<Login/>:<Register handleClick={this.handleClick}/>}
                       
                    </div>
                    
                </div>
               
            </div>}
                  
        
        
                </>
           
          )
    }
}

export default LoginRegister
