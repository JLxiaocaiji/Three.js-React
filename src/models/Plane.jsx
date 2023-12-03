import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from "@react-three/drei";
import planeScene from '@/assets/3d/plane.glb';
const Plane = ({ isRotating, ...props }) => {

    const ref = useRef();

    const { scene, animations } = useGLTF(planeScene)

    const { actions } = useAnimations(animations, ref)

    useEffect( ()=> {
        if ( isRotating) {
            // Take 001 默认为 动作名称
            actions['Take 001'].play();
        } else {
            // Take 001 默认为 动作名称
            actions['Take 001'].stop();
        }
    }, [ actions, isRotating])

    return (
        <mesh {...props} ref={ref}>
            <primitive object={scene} />
        </mesh>
    )
}

export default Plane
