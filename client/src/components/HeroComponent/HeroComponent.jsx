import React from 'react'
import style from './HeroComponent.module.css'
import {useNavigate} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const HeroComponent = () => {
    const navigate = useNavigate()
  return (
    <div className={style.heroComponent}>
      <Navbar />
        <div className={style.heroComponentWrapper}>
            <h2> Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque esse et modi totam in? Officiis molestias, repellendus quia, ipsa numquam accusantium tempora voluptas atque modi, odit in fuga fugiat dolor.</p>
            <div className={style.btns}>
                <button onClick={() => {navigate("/login")}} className={style.signIn} >Sign In</button ><button onClick={() => {navigate("/register")}}>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default HeroComponent