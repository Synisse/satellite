import * as THREE from 'three';
import {useRef} from 'react';

function Ground(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);

  return (
    <mesh
      {...props}
      ref={ref}
    >
      <planeGeometry args={[20000, 20000]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
}

export default Ground;
