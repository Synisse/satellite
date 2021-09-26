import {Sphere, useHelper} from '@react-three/drei';
import {useRef} from 'react';
import {DirectionalLightHelper, PointLightHelper} from 'three';
import './App.css';
import {Colors} from './helpers/colors';

function Lights() {
  const pointLight = useRef();
  const directionalLight = useRef();
  useHelper(pointLight, PointLightHelper);
  useHelper(directionalLight, DirectionalLightHelper);

  return (
    <>
      <ambientLight color={0xdddddd} />
      {/* <pointLight
        ref={pointLight}
        position={[0, 0, -2]}
        castShadow={true}
        receiveShadow={true}
        color={'blue'}
        intensity={100}
      /> */}
      <directionalLight
        ref={directionalLight}
        castShadow
        position={[10, 10, 2]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Sphere name="sun" position={[10, 10, 2]} args={[2, 8, 8]}>
          <meshStandardMaterial attach="material" color={Colors.sun} />
      </Sphere>
    </>
  );
}

export default Lights;
