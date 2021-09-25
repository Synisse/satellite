import {Stars, Stats} from '@react-three/drei';
import {Canvas, extend} from '@react-three/fiber';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Box from './Box';
import CameraControls from './CameraControls';
import Ground from './ground';
import Lights from './lights';
import Postprocessing from './Postprocessing';
import Sattelite from './Sattelite';
import {Thrusters} from './Thrusters';

extend({OrbitControls});

function Frame() {
  return (
    <Canvas data-testid="mainframe" shadows={true} onCreated={(state) => state.gl.setClearColor('black')}>
      <fog attach="fog" args={['white', 0, 400]} />
      <Postprocessing />
      <Stats />
      <CameraControls />
      <Stars />
      <Lights />
      {/* <Box position={[-3, 0, 0]} castShadow={true} receiveShadow={true} />
      <Box position={[3, 0, 0]} castShadow={true} receiveShadow={true} /> */}
      <Sattelite position={[0, 1, 0]} />
      <Ground position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow={true} receiveShadow={true} />
      {/* <Thrusters /> */}
    </Canvas>
  );
}

export default Frame;
