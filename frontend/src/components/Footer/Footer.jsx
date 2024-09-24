import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <h1>FoodSite.</h1>
                <p></p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
            <h2>FoodSite</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+1-222-333-4440</li>
                    <li>contact @ foodsite@gmail.com</li>
                </ul>
            </div>
        </div>
          <hr />
          <p className="footer-copyright">copyright 2024 @ foodsite.com - All right reserved</p>
    </div>
  )
}

export default Footer