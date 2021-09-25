import {useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Box, Circle} from '@react-three/drei';

export default function Thruster(props: JSX.IntrinsicElements['mesh']) {
  const CLOUD_SIZE = 100;
  const CLOUD_RADIUS = 5;
  let PARTICLES: any[] = [];
  const particleRefs = useRef([]);

  useFrame((state, delta) => {
    if (PARTICLES.length > 0) {
      particleRefs.current.forEach((aParticle) => {
        // @ts-ignore
        if (aParticle && aParticle.maxLife) {
          // @ts-ignore
          if (aParticle.maxLife < 0) {
            // @ts-ignore
            aParticle.maxLife = Math.random() * (1.5 - 0.5) + 0.5;
            // @ts-ignore
            aParticle.velocity = Math.random() * (1 - 0.2) + 0.2;
            //@ts-ignore
            aParticle.position.z = 0;
          }
          // @ts-ignore
          aParticle.maxLife -= delta;
        } else {
          // @ts-ignore
          aParticle.maxLife = Math.random() * (1.5 - 0.5) + 0.5;
          // @ts-ignore
          aParticle.velocity = Math.random() * (1 - 0.2) + 0.2;
        }

        //@ts-ignore
        aParticle.position.z += 0.5 * aParticle.velocity;
      });
    } else {
      console.log('no particles to render');
    }
  });

  useEffect(() => {
    particleRefs.current = particleRefs.current.slice(0, CLOUD_SIZE);
  }, [CLOUD_SIZE]);

  function renderParticles(): React.ReactElement {
    let sphereProps = [];

    if (PARTICLES.length < 1) {
      console.log('instantiating');
      for (let index = 0; index < CLOUD_SIZE; index++) {
        // better deviation with sqrt -> but thruster should have more particles in the center
        //   const r = CLOUD_RADIUS * Math.sqrt(Math.random());
        const r = CLOUD_RADIUS * Math.random();
        const theta = (Math.random() + 200) * 2 * Math.PI;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);

        sphereProps.push({x, y, size: Math.random() * (0.4 - 0.2) + 0.2, maxLife: 3, velocity: Math.random()});
      }

      PARTICLES = sphereProps.map((aSphereProp, index) => ({
        sphere: (
          <Box
            //@ts-ignore
            ref={(el) => (particleRefs.current[index] = el)}
            args={[aSphereProp.size, aSphereProp.size, aSphereProp.size]}
            position={[aSphereProp.x, aSphereProp.y, 0]}
          >
            <meshStandardMaterial attach="material" color={'blue'} />
          </Box>
        ),
        sphereProps: aSphereProp,
      }));

      return <>{PARTICLES.map((aSphere) => aSphere.sphere)}</>;
    } else {
      console.log('NOT instantiating');
      return <>{PARTICLES.map((aSphere) => aSphere.sphere)}</>;
    }
  }

  return (
    <>
      <Circle args={[CLOUD_RADIUS, 20]}>
        <meshStandardMaterial attach="material" color={'blue'} wireframe />
      </Circle>

      {renderParticles()}
    </>
  );
}
