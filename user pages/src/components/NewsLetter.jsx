import React from 'react'
import './newsletter.css'
import img from '../assets/images/newsletter/newsletter.jpg'
const NewsLetter = () => {
    return (
        <div className='newsletter-container'>
            <div className='newsinfo-wrapper'>
                <img src={img} alt="" />
                <div className='form'>
                    <div>
                    <h3>Subscribe our Newsletter</h3>
                    <p>and get information about daily new designes and trend clothes</p>
                    </div>
                    <div className="flex-col-news">
                        <input type="email" placeholder='type your email' className='form-input'/>
                        <button>SUBSCRIBE</button>

                    </div>
                </div>
            </div>
             
        </div>
    )
}

export default NewsLetter
