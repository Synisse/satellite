import {Box, Cylinder} from '@react-three/drei';
import React from 'react';
import {DoubleSide} from 'three';
import {Colors} from './helpers/colors';
import {Materials} from './helpers/materials';

function Sattelite(props: JSX.IntrinsicElements['mesh']) {
  const {position} = props;

  function renderPipes(): React.ReactElement {
    return (
      <>
        <mesh name="pipe-bottom-1" position={[0.1, -1, 0]} rotation={[0, 0, -Math.PI / 10]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshPhongMaterial {...Materials.innerPipeMaterial} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-bottom-2" position={[-0.1, -1, 0]} rotation={[0, 0, Math.PI / 10]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshPhongMaterial {...Materials.innerPipeMaterial} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-bottom-3" position={[0, -1, 0.1]} rotation={[Math.PI / 10, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshPhongMaterial {...Materials.innerPipeMaterial} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-bottom-4" position={[0, -1, -0.1]} rotation={[-Math.PI / 10, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshPhongMaterial {...Materials.innerPipeMaterial} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-disc" position={[0, -1.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.1, 0.1, 8, 1, false]} />
          <meshPhongMaterial {...Materials.innerPipeMaterial} side={DoubleSide} />
        </mesh>
      </>
    );
  }

  function renderFrontRotationThrusters(): React.ReactElement {
    return (
      <group>
        <Cylinder
          name="front-right-top"
          position={[0.25, -0.2, 0.4]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.7]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
        <Cylinder
          name="front-right-mid"
          position={[0.25, -0.55, 0.325]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.15]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
        <Cylinder
          name="front-right-mid"
          position={[0.265, -0.75, 0.275]}
          rotation={[-Math.PI / 32, 0, Math.PI / 32]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.4]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
        <Cylinder
          name="front-right-mid"
          position={[0.33, -0.95, 0.245]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.15]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
      </group>
    );
  }

  function renderBackRotationThrusters(): React.ReactElement {
    return (
      <group rotation={[0, Math.PI, 0]}>
        <Cylinder
          name="front-right-top"
          position={[0.25, -0.2, 0.4]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.7]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
        <Cylinder
          name="front-right-mid"
          position={[0.25, -0.55, 0.325]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.15]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
        <Cylinder
          name="front-right-mid"
          position={[0.265, -0.75, 0.275]}
          rotation={[-Math.PI / 32, 0, Math.PI / 32]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.4]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
        <Cylinder
          name="front-right-mid"
          position={[0.33, -0.95, 0.245]}
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          castShadow
          receiveShadow
          args={[0.02, 0.02, 0.15]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Cylinder>
      </group>
    );
  }

  function renderParticleTest(): React.ReactElement {
    return <>{/* <Particles></Particles> */}</>;
  }

  function renderFlaps(): React.ReactElement {
    return (
      <>
        <Cylinder
          name="pipe-flap-left"
          layers={1}
          position={[0.6, 0.1, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
          args={[0.04, 0.04, 0.4, 8, 1, true]}
        >
          <meshStandardMaterial color={Colors.metal} side={DoubleSide} />
        </Cylinder>
        <Cylinder
          name="pipe-flap-right"
          position={[-0.6, 0.1, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
          args={[0.04, 0.04, 0.4, 8, 1, true]}
        >
          <meshStandardMaterial color={Colors.metal} side={DoubleSide} />
        </Cylinder>
        <Box
          name="flap-left"
          castShadow
          receiveShadow
          position={[-1.5, 0.1, 0]}
          rotation={[-Math.PI / 8, 0, 0]}
          args={[1.5, 0.75, 0.1]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Box>
        <Box
          name="flap-right"
          castShadow
          receiveShadow
          position={[1.5, 0.1, 0]}
          rotation={[-Math.PI / 8, 0, 0]}
          args={[1.5, 0.75, 0.1]}
        >
          <meshPhongMaterial {...Materials.flapMaterial} />
        </Box>
        <Box
          name="flap-left-mini"
          castShadow
          receiveShadow
          position={[-0.65, 0.1, 0]}
          rotation={[-Math.PI / 8, 0, 0]}
          args={[0.1, 0.4, 0.1]}
        >
          <meshStandardMaterial color={Colors.metal} />
        </Box>
        <Box
          name="flap-right-mini"
          castShadow
          receiveShadow
          position={[0.65, 0.1, 0]}
          rotation={[-Math.PI / 8, 0, 0]}
          args={[0.1, 0.4, 0.1]}
        >
          <meshStandardMaterial color={Colors.metal} />
        </Box>
      </>
    );
  }

  function renderBottomTube(): React.ReactElement {
    return (
      <>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.7, 8, 1, true, 0, Math.PI / 3]} />
          <meshPhongMaterial color={Colors.gold} side={DoubleSide} shininess={45} />
        </mesh>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.7, 8, 1, true, Math.PI / 3, Math.PI / 1.5]} />
          <meshPhongMaterial color={Colors.metal} side={DoubleSide} shininess={45} />
        </mesh>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.7, 8, 1, true, Math.PI / 3 + Math.PI / 1.5, Math.PI / 3]} />
          <meshPhongMaterial color={Colors.gold} side={DoubleSide} shininess={45} />
        </mesh>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.7, 8, 1, true, (Math.PI / 3) * 2 + Math.PI / 1.5, Math.PI / 1.5]} />
          <meshPhongMaterial color={Colors.metal} side={DoubleSide} shininess={45} />
        </mesh>
      </>
    );
  }

  return (
    <group position={position}>
      <mesh name="corpus" position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
        <meshStandardMaterial color={'silver'} />
      </mesh>

      {renderPipes()}
      {renderBottomTube()}
      {renderFlaps()}
      {renderFrontRotationThrusters()}
      {renderBackRotationThrusters()}
    </group>
  );
}

export default Sattelite;
