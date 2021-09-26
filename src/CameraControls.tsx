import {useRef} from 'react';
import {extend, useFrame, useThree} from '@react-three/fiber';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

extend({OrbitControls});

function CameraControls() {
  const {
    camera,
    gl: {domElement},
  } = useThree();

  const controls = useRef<OrbitControls>(null!);
  useFrame(() => controls.current.update());
  return (
    //@ts-ignore
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      // maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      // minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
}

export default CameraControls;
