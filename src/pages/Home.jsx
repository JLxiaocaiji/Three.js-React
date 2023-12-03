import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import Loader from '@/components/Loader'
import Island from '@/models/Island.jsx';
import Sky from '@/models/Sky.jsx';
import Bird from '@/models/Bird.jsx';
import Plane from '@/models/Plane.jsx';
import HomeInfo from '@/components/HomeInfo';

import sakura from '@/assets/sakura.mp3'
import { soundoff, soundon } from "../assets/icons";

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);

    const [currentStage, setCurrentStage] = useState(1);

    const audioRef = useRef( new Audio(sakura))
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;

    const [isPlayingMusic, setIsPlayingMusic ] = useState(false)

    useEffect(()=> {
        if ( isPlayingMusic ) {
            audioRef.current.play()
        } 

        return () => {
            audioRef.current.pause()
        }
    }, [isPlayingMusic])

    const adjustIslandForScreenSize = () => {
        // 缩放比例
        let screenScale = null;
        // 位置
        let screenPosition = [0, -6.5, -43];
        // 旋转
        let rotation = [0.1, 4.7, 0]

        if ( window.innerWidth < 768 ) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }

        return [screenScale, screenPosition, rotation]
    }

    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;

        if ( window.innerWidth < 768 ) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition=[0, -1.5, 0]
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -3, -5];
        }

        return [screenScale, screenPosition]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

    const [planeScale, planePosition] = adjustPlaneForScreenSize();


    return (
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                
                { currentStage && <HomeInfo currentStage={ currentStage} />}
            </div>

            <Canvas className={`w-full h-screen bg
                ${ isRotating ? 'cursor-grabbing' : 'cursor-grab'}
                `}
                camera={{ near: 0.1, far: 1000 }}
            > 
                <Suspense fallback={ <Loader />}>
                    {/* 定向光： 位置，强度 */}
                    <directionalLight position={[1,1,1]} intensity={2}/>
                    {/* 环境光 */}
                    <ambientLight intensity={0.5} />
                    {/* 点光源 */}
                    {/* <pointLight/> */}
                    {/* 聚光灯 */}
                    {/* <spotLight /> */}
                    {/* 半球光 */}
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" 
                        intensity={1}
                    />

                    <Sky 
                        isRotating = {isRotating}
                    />
                    <Bird
                    />

                    <Plane
                        scale = {planeScale }
                        position = { planePosition }

                        isRotating = { isRotating}
                        rotation={[0, 20 , 0]}
                    />


                    <Island 
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={ isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={ setCurrentStage}
                    />
                </Suspense>
            </Canvas>

            <div className='absolute bottom-2 left-2'>
                <img src={ !isPlayingMusic ? soundoff : soundon } 
                    className='w-10 h-10 cursor-pointer object-contain'
                    onClick={()=> setIsPlayingMusic(!isPlayingMusic)}
                />
            </div>
        </section>
    )
}

export default Home
