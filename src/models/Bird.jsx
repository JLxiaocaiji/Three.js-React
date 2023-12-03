import React, { useRef, useEffect } from 'react'
import { useGLTF , useAnimations} from "@react-three/drei";
import {  useThree, useFrame } from '@react-three/fiber'
import birdScene from '@/assets/3d/bird.glb';

const Bird = () => {
    const { scene, animations } = useGLTF(birdScene);

    const birdRef = useRef();
    const { actions } = useAnimations(animations, birdRef);

    useEffect(()=> {
        // Take 001 默认为 动作名称
        actions['Take 001'].play();
    })

    useFrame(({clock, camera} ) => {
        // birdRef.current.rotation.y += 0.15 * delta;

        // 更新 y 轴位置模拟飞行， 以 sin 函数的形式
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

        if (birdRef.current.position.x > camera.position.x + 10) {
            // 将方向改为向后，并在y轴上旋转小鸟180度
            birdRef.current.rotation.y = Math.PI;
        } else if (birdRef.current.position.x < camera.position.x - 10) {
            // 改变方向为前进并重置鸟的旋转
            birdRef.current.rotation.y = 0;
        }
      
        // 根据方向更新X和Z位置
        if (birdRef.current.rotation.y === 0) {
        // Moving forward
        birdRef.current.position.x += 0.01;
        birdRef.current.position.z -= 0.01;
        } else {
        // Moving backward
        birdRef.current.position.x -= 0.01;
        birdRef.current.position.z += 0.01;
        }

    })

    return (
        <mesh position={[-5, 2, 1]} 
        scale={[0.003, 0.003, 0.003]} 
        ref={birdRef}> 
            <primitive object={scene} />
        </mesh>
    )
}

export default Bird
