import {DoubleSide} from 'three';
import {Colors} from './helpers/colors';

function Sattelite(props: JSX.IntrinsicElements['mesh']) {
  const {position} = props;

  function renderPipes(): React.ReactElement {
    return (
      <>
        <mesh name="pipe-bottom-1" position={[0.1, -1, 0]} rotation={[0, 0, -Math.PI / 10]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshStandardMaterial color={Colors.metal} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-bottom-2" position={[-0.1, -1, 0]} rotation={[0, 0, Math.PI / 10]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshStandardMaterial color={Colors.metal} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-bottom-3" position={[0, -1, 0.1]} rotation={[Math.PI / 10, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshStandardMaterial color={Colors.metal} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-bottom-4" position={[0, -1, -0.1]} rotation={[-Math.PI / 10, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.7, 8, 1, true]} />
          <meshStandardMaterial color={Colors.metal} side={DoubleSide} />
        </mesh>
        <mesh name="pipe-disc" position={[0, -1.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.1, 0.1, 8, 1, false]} />
          <meshStandardMaterial color={Colors.metal} />
        </mesh>
      </>
    );
  }

  function renderFlaps(): React.ReactElement {
    return <></>;
  }

  function renderBottomTube(): React.ReactElement {
    return (
      <>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.7, 8, 1, true, 0, Math.PI / 3]} />
          <meshPhongMaterial color={Colors.gold} side={DoubleSide} shininess={45} />
        </mesh>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.7, 8, 1, true, Math.PI / 3, Math.PI / 1.5]} />
          <meshPhongMaterial color={Colors.metal} side={DoubleSide} shininess={45} />
        </mesh>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.7, 8, 1, true, Math.PI / 3 + Math.PI / 1.5, Math.PI / 3]} />
          <meshPhongMaterial color={Colors.gold} side={DoubleSide} shininess={45} />
        </mesh>
        <mesh name="bottom" position={[0, -0.85, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.7, 8, 1, true, (Math.PI / 3) * 2 + Math.PI / 1.5, Math.PI / 1.5]} />
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
    </group>
  );
}

export default Sattelite;
