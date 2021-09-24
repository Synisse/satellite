import * as THREE from 'three';
import {Colors} from './colors';

export const Materials = {
  flapMaterial: new THREE.MeshPhongMaterial({
    color: Colors.darkMetal,
    emissive: Colors.black,
    specular: Colors.sun,
    shininess: 60,
  }),
};
