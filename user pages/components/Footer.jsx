import React from 'react'
import './footer.css'
import { Telegram,Instagram, Facebook,} from '@material-ui/icons'

function Footer() {
    return (
        <div className='footer-container' >
            <div className="footer-flex">

              <div className="footer-left">
                  <h3>about</h3>
                  <p>Jfashion Website Provides  a Fashioned Traditional Clothes With Fair price .!</p>
              </div>
               <div className="footer-center">
                   <h3>Contact Us</h3>
                   <p style={{ marginBottom:"10px",fontWeight:"bold"}}>CALL US : <a href="tel:+251935764909" style={
                       {
                       color:"rgb(236, 209, 159)",
                       padding:'5px',
                       borderRadius:"5px",
                       marginBottom:"5px"
                       }
                       }>09 35 76 49 09 </a></p>
                   <p  style={
                       { marginBottom:"10px",
                       fontWeight:"bold",
                       paddingLeft:"55px"
                       }
                    }> : <a href="tel:+251961138692" style={
                       {
                        color:"rgb(236, 209, 159)",
                       
                       padding:'5px',
                       borderRadius:"5px",
                       marginBottom:"5px"
                       }
                       }  
                   >09 61 13 86 92 </a></p>
                   <p>Email : user@gmail.com</p>
                   <p>Address :200M away From Abo Condominium buildings </p>
               </div>
               <div className="footer-right">
                   <h3>connect with us</h3>
                   <p>our social media links</p>
                  <a href="https://t.me/Jesut" target="_blank"> <span className="telegram"><Telegram/></span></a>
                   <span  className="instagram"><Instagram/></span>
                  <a href="https://www.facebook.com/eyerusalem.tadele.3" target="_blank"><span className="facebook"><Facebook/></span></a> 
               </div>

            </div>
             <footer> 	&copy; ALL RIGHT RESERVED</footer>
        </div>
    )
}

export default Footer
