import {useMemo, useRef} from 'react';
import {extend, useFrame} from '@react-three/fiber';
import {DotMaterial} from './Dotmaterial';

const ROW = 50;
const COL = 50;

extend({DotMaterial});

export function Thrusters() {
  const [coords, sizes] = useMemo(() => {
    const initialCoords = [];
    const initialSizes = [];
    let i = 0;
    for (let y = 0; y < ROW; y += 1) {
      for (let x = 0; x < COL; x += 1) {
        initialCoords.push(x);
        initialCoords.push(y);
        initialCoords.push(i);
        initialSizes.push(Math.random() < 0.03 ? 15 : 6);
        i++;
      }
    }

    const coords = new Float32Array(initialCoords);
    const sizes = new Float32Array(initialSizes);
    return [coords, sizes];
  }, []);

  const geom = useRef();
  useFrame((state) => {
    //@ts-ignore
    geom.current.material.uniforms.time.value = state.clock.getElapsedTime();
    //@ts-ignore
    geom.current.geometry.verticesNeedUpdate = true;
  });

  return (
    <points ref={geom} position={[0, 10, 0]} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={coords.length / 3}
          array={coords}
          itemSize={3}
        />
        <bufferAttribute attachObject={['attributes', 'size']} count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      {/*@ts-ignore*/}
      <dotMaterial />
    </points>
  );
}
