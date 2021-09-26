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
  mouse: {x: number; y: number};
  count: number;
  colors: string[];
  radius?: number;
};

function Fatline({curve, width, color, speed}: FatLineProps) {
  const line = useRef<Line2>(null!);
  useFrame(() => (line.current.material.uniforms.dashOffset.value -= speed * 5));
  return (
    <Line
      points={curve}
      ref={line}
      depthTest={false}
      lineWidth={width * 10}
      color={color}
      // single dash
      //   dashSize={0.05}
      //   dashScale={0.0035}
      //   dashOffset={5}

      // multiple dash
      dashSize={1}
      dashScale={1}
      dashOffset={1}
      dashed={true}
      transparent
      opacity={1}
      alphaToCoverage={false}
    ></Line>
  );
}

function r() {
  return Math.max(0.5, Math.random());
}

export default function ThrusterEffect({mouse, count, colors, radius = 15}: LinesProps) {
  const lines = useMemo(
    () =>
      //@ts-ignore to use fill without props
      new Array(count).fill().map(() => {
        const pos = new Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0);
        //@ts-ignore to use fill without props
        const points = new Array(30).fill().map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          return pos.add(new Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone();
        });
        const curve = new CatmullRomCurve3(points).getPoints(1000);
        return {
          color: colors[Math.floor(colors.length * Math.random())],
          width: 0.1,
          speed: Math.max(0.0005, 0.001 * Math.random()),
          curve,
        };
      }),
    [count, colors, radius]
  );

  const ref = useRef<THREE.Object3D>();

  return (
    <group ref={ref}>
      <group position={[-radius * 2, -radius, 0]}>
        {lines.map((props, index) => (
          <Fatline key={index} {...props} />
        ))}
      </group>
    </group>
  );
}
