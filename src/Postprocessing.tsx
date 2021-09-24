import {Suspense, useMemo, useEffect} from 'react';
import {useThree, useFrame} from '@react-three/fiber';

import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  RenderPass,
  SSAOEffect,
  NormalPass,
  BloomEffect,
  //@ts-ignore
} from 'postprocessing';
import {HalfFloatType} from 'three';

function Post() {
  const {gl, scene, camera, size} = useThree();
  const composer = useMemo(() => {
    camera.layers.enable( 0 ); // enabled by default
    camera.layers.enable( 1 );
    const composer = new EffectComposer(gl, {frameBufferType: HalfFloatType});
    composer.addPass(new RenderPass(scene, camera));
    const normalPass = new NormalPass(scene, camera);
    // const aOconfig = {
    //   blendFunction: BlendFunction.MULTIPLY,
    //   samples: 3, // May get away with less samples
    //   rings: 4, // Just make sure this isn't a multiple of samples
    //   distanceThreshold: 0.4,
    //   distanceFalloff: 0.5,
    //   rangeThreshold: 0.5, // Controls sensitivity based on camera view distance **
    //   rangeFalloff: 0.01,
    //   luminanceInfluence: 0.6,
    //   radius: 2, // Spread range
    //   intensity: 5,
    //   bias: 0.5,
    // };
    // const AO = new SSAOEffect(camera, normalPass.renderTarget.texture, aOconfig);
    // const CAO = new SSAOEffect(camera, normalPass.renderTarget.texture, {
    //   ...aOconfig,
    //   samples: 21,
    //   radius: 7,
    //   intensity: 30,
    //   luminanceInfluence: 0.6,
    //   // new in postprocessing@6.16.0
    //   color: 'blue',
    // });
    const BLOOM = new BloomEffect({
      opacity: 0,
      intensity: 0.3,
      blendFunction: BlendFunction.REFLECT,
      kernelSize: 2,
      luminanceThreshold: 0.9,
      luminanceSmoothing: 0.0,
    });
    // const effectPass = new EffectPass(camera, CAO, AO, BLOOM);
    const effectPass = new EffectPass(camera, BLOOM);
    effectPass.renderToScreen = true;
    composer.addPass(normalPass);
    composer.addPass(effectPass);
    return composer;
  }, [gl, camera, scene]);

  useEffect(() => void composer.setSize(size.width, size.height), [size, composer]);
  return useFrame((_, delta) => {
    gl.autoClear = false;

    gl.clear();

    camera.layers.set(0);
    composer.render(delta);

    gl.clearDepth();

    camera.layers.set(1);
    gl.render(scene, camera);
  }, 1);
}

export default function Postprocessing() {
  return (
    <Suspense fallback={null}>
      <Post />
    </Suspense>
  );
}
