import React, {Suspense, useEffect, useRef} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model() {
    const loader = new GLTFLoader();
    const modelRef = useRef();
    const [model, setModel] = React.useState();

    React.useEffect(() => {
        loader.load(
            'src/assets/rhetorician.glb',
            (gltf) => {
                setModel(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );
    }, [loader]);

    useEffect(() => {
        if (model) {
            model.position.set(0, -2, -3); // Changer la position x, y, z
        }
    }, [model]);

    return model ? <primitive object={model} ref={modelRef}/> : null;
}

function CameraControls() {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    const controls = useRef();

    useEffect(() => {
        if (controls.current) {
            controls.current.target.set(3, 1, -10);
            controls.current.update();
        }
    }, [controls]);

    return <OrbitControls ref={controls} args={[camera, domElement]} />;
}

function ModelViewer() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight />
                <pointLight position={[5, 5, 5]} />
                <Suspense fallback={<Html center>Loading...</Html>}>
                    <Model />
                </Suspense>
                <CameraControls />
            </Canvas>
        </div>
    );
}

export default ModelViewer;