import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderdata from '../sliderdata';
import { Block } from '@material-ui/icons';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";




function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}


export const SlideImg = () => {



   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    
       
    };
    return (<Slider {...settings}>
             {
                       sliderdata.map((item,index)=><div className="slider" key={index}>
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
                       )} 
                       
        </Slider>  
    )
}


{/* {
                       sliderdata.map((item,index)=><div className="slider" key={index}>
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
                       )} 
                       
                       */}