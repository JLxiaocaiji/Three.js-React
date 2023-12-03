import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='cta'>
      <p className='cta-text'>
        Test
      </p>

      <Link to='/contact' className="btn">
        跳转到 contact 页面
      </Link>
    </section>
  )
}

export default CTA
