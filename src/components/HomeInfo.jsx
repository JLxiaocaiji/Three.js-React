import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '@/assets/icons'

const InfoBox = ({ text, link, btnText }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain'/>
        </Link>
    </div>
)

const renderContent = {
    1: <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        github 项目仿写
        <br />
        <span className='font-semibold mx-2 text-white'>左右滑动试试</span>
        </h1>,
    2: <InfoBox 
            text="跳转About页面\跳转About页面\跳转About页面"
            link="/about"
            btnText='跳转About页面'
        ></InfoBox>,
    3: <InfoBox 
            text="跳转Projects页面\跳转Projects页面"
            link="/projects"
            btnText='跳转Projects页面'
        ></InfoBox>,
    4: <InfoBox 
            text="跳转Contact页面\跳转Contact页面"
            link="/contact"
            btnText='跳转Contact页面'
        ></InfoBox>,
}



// currentStage 值由 Island 设定
const HomeInfo = ({ currentStage }) => {
  return (

      renderContent[currentStage] || null 

  )
}

export default HomeInfo
