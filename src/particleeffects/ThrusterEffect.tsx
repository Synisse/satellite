import {useFrame} from '@react-three/fiber';
import {useMemo, useRef} from 'react';
import {CatmullRomCurve3, Vector3} from 'three';
import {Line} from '@react-three/drei';
import {Line2} from 'three-stdlib';

type FatLineProps = {
  curve: Vector3[];
  width: number;
  color: string;
  speed: number;
};

type LinesProps = {
  rootPosition: Vector3;
  count: number;
  colors: string[];
  radius?: number;
};

function Fatline({curve, width, color, speed}: FatLineProps) {
  const line = useRef<Line2>(null!);
  useFrame(() => (line.current.material.uniforms.dashOffset.value -= speed / 12));
  return (
    <Line
      points={curve}
      ref={line}
      depthTest={false}
      lineWidth={width * 30}
      color={color}
      // single dash
      dashSize={0.15}
      dashScale={1}
      dashOffset={50}

      // multiple dash
      //   dashSize={1}
      //   dashScale={1}
      //   dashOffset={1}

      dashed={true}
      transparent
      opacity={1}
      alphaToCoverage={false}
    ></Line>
  );
}

export default function ThrusterEffect({rootPosition, count, colors, radius = 4}: LinesProps) {
  const lines = useMemo(
    () =>
      //@ts-ignore to use fill without props
      new Array(count).fill().map(() => {
        const pos = new Vector3(0, 0, 0);

        // the root point of the line
        let rootPoint: {x: number; y: number} | undefined = undefined;

        // initialize the z offset modifier
        let zOffsetModifier = 0;

        const maxDistanceValue = 14;
        const minLength = 0.3;
        let zOffset = 0;

        //@ts-ignore to use fill without props
        const points = new Array(15).fill().map((_, index) => {
          // calculate random radius -> Math.sqrt to normalize representation on circle -> remove to get more focus on center
          const r = radius * Math.sqrt(Math.random());

          // calculate random theta
          const theta = Math.random() * 2 * Math.PI;

          // set initial value to be inside thruster radius
          if (index === 0) {
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);

            // set the root point to calculated x and y
            rootPoint = {x, y};

            // set z value of inner values to higher value
            let distance = Math.pow(rootPoint.x - 0, 2) + Math.pow(rootPoint.y - 0, 2);

            // if point is far out
            if (distance >= maxDistanceValue) {
              // set length to short value
              zOffsetModifier = minLength;
            } else {
              zOffsetModifier = 1 - distance / maxDistanceValue;
            }

            return pos.add(new Vector3(x, y, 0)).clone();
          } else {
            // calculate inner values based on 0.5 inner radius
            const innerRadius = 0.5 * Math.random();
            const xInner = innerRadius * Math.cos(theta);
            const yInner = innerRadius * Math.sin(theta);

            // scale up zoffset
            zOffset += zOffsetModifier * 2;

            // old method -> adding vectors
            // return pos.add(new Vector3(xInner, yInner, zOffsetModifier)).clone();

            // new method initializing new vectors
            return new Vector3(rootPoint!.x + xInner, rootPoint!.y + yInner, zOffset);
          }
        });

        // max distance calulation
        // const maxRangeValue = 30;
        // const minRangeValue = 0;
        // const speed = zOffsetModifier;

        // highest z value
        // const zValue = points[14].z;

        // normalized values
        // const normalizedRangeValue = (zValue - minRangeValue) / (maxRangeValue - minRangeValue);

        const curve = new CatmullRomCurve3(points).getPoints(100);

        return {
          color: colors[Math.floor(colors.length * Math.random())],
          width: 0.1,
          //   speed: Math.max(0.0005, 0.001 * Math.random()),
          //   speed: normalizedRangeValue,
          //   speed: speed,
          speed: 0.2 + zOffsetModifier,
          curve,
        };
      }),
    [count, colors, radius]
  );

  const ref = useRef<THREE.Object3D>();

  return (
    <group ref={ref} position={rootPosition}>
      {lines.map((props, index) => (
        <Fatline key={index} {...props} />
      ))}
    </group>
  );
}
