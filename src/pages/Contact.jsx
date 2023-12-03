import React, { useState, useRef, Suspense } from 'react'
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";

import Fox from '@/models/Fox'
import Loader from '@/components/Loader'
import Alert from '@/components/Alert';
import  useAlert  from '@/hooks/useAlert';

const Contact = () => {

  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isLoading, setIsLoading ] = useState(false)

  const [ currentAnimation, setCurrentAnimation ] = useState('idle')

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    // [e.target.name]: e.target.value 能动态生成对象属性名
    setForm({ ...form, [e.target.name]: e.target.value})
  }
  const handleFocus = () => {
    setCurrentAnimation('walk');
  }
  const handleBlur = () => {
    setCurrentAnimation('idle');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,

      {
        from_name: form.name,
        to_name: 'qqq',
        from_email: form.email,
        to_email: '884026321@qq.com',
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
    ).then(()=> {
      setIsLoading(false);

      showAlert({
        show: true,
        text: '消息发送成功',
        type: 'success',
      })
    })
    .catch( e => {
      setIsLoading(false);
      setCurrentAnimation('idle')
      // console.log(e)

      showAlert({ 
        show: true, 
        text: '谷歌邮箱账号验证错误：412 Gmail_API: Precondition check failed.',
        type: 'danger',
      })
    })
    .finally(()=> {
      setTimeout(()=> {
        hideAlert()
        setCurrentAnimation('idle')
        setIsLoading(false);
        setForm({ name: '', email: '', message: ''})
      }, 5000)
    })
  }

  return (
    <section className='reactive flex lg:flex-row flex-col max-container'>

      { alert.show && <Alert {...alert} /> }

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h3 className='head-text'>
          谷歌邮箱失效，页面仅展示
        <br/></h3>

        <form className='w-full flex flex-col gap-7 mt-14'
        ref={formRef}
          onSubmit={handleSubmit}
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input type='text' name='name' className='input' 
              placeholder='请输入名字' required value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='text-black-500 font-semibold'>
            Email
            <input type='email' name='email' className='input' 
              placeholder='请输入email' required value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='text-black-500 font-semibold'>
            Message
            <textarea type='text' name='message' className='textarea' 
              placeholder='请输入' required value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button type='submit' className='btn' 
            onFocus={handleFocus}
            onBlur={handleBlur} disabled={isLoading}>
              { isLoading ? '发送中' : '发送'}
          </button>
        </form>
      </div>

      <div className='lg:2-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]}/>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 10, 0]} intensity={2} />

          <Suspense fallback={<Loader/>}>
            <Fox
              currentAnimation={ currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={ [12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
