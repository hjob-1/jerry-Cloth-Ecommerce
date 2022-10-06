import React, { Component } from 'react'
import './slider.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import  sliderdata  from '../sliderdata';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
export default class Slider extends Component {
    constructor(){
        super();
        this.state={
            current:0,
            status:true,
           
        }
    }

    handleLeft(){
        let{current} =this.state;
       this.setState({current:current>0?current-1:2})
       this.setState({status:false})
    }
    handleRight(){
        let{current} =this.state;

       this.setState({current:current<2?current+1:0})
        this.setState({status:false})
   
    }
    componentDidMount(){
        let interval 
          interval= setInterval(()=>{this.handleRight()},4000)
   
    }
   
    render() {
       
        return (
            <div className="slider-container">
               
              
               <div className="wrapper">

                      <TransitionGroup>
                       {sliderdata.map((item,index)=>{
                           return ( <div key={item.id}> 
                               {index===this.state.current &&<CSSTransition in={true} timeout={4000} classNames='transition' key={item.index}>
                                <div className="slider">
                                   <div className="img-wrapper" >
                                     <img src={item.img} alt="job" />

                                      <div className="info-wrapper" >
                                          <div className="info-wrapper-actions">
                                              <h1>{item.heading}</h1>
                                              <p>{item.desc}<span style={{fontWeight:"bold"}}>{item.author}</span></p>
                                              
                                             <a href="#product"><button >SHOP NOW</button></a>
                                          </div>
                        
                                      </div>
                                   </div>
                                   
                               </div>
                           </CSSTransition>
                                }
                                </div>  
                           )
                       })}
                       </TransitionGroup>
                       
                  
               </div>
              
            </div>
        )
    }
}
