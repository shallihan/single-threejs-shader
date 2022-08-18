import React, { useState } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import GlobalStyles from "../styles";
import { vertex, fragment } from "../shaders";

const Model = () => {
  const clock = new THREE.Clock();
  const cubeLoader = new THREE.CubeTextureLoader();

  const uniforms = {
    time: { value: clock.getElapsedTime() },
    cube: {
      value: cubeLoader.load([
        "/posx.jpg",
        "/negx.jpg",
        "/posy.jpg",
        "/negy.jpg",
        "/posz.jpg",
        "/negz.jpg",
      ]),
    },
  };

  const endEntryPosition = new THREE.Vector3(0, 0, 35);
  const dpi = 64;

  useFrame((state) => {
    uniforms.time = { value: clock.getElapsedTime() };

    state.camera.position.lerp(endEntryPosition, 0.9);

    state.camera.quaternion.slerp(state.scene.children[0].quaternion, 0.009);

    state.camera.quaternion.normalize();

    state.camera.updateProjectionMatrix();
  });

  return (
    <mesh position={[0, 0, 0]}>
      <torusKnotGeometry args={[8, 1, 10 * dpi, dpi, 5, 9]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            uniforms: uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
          },
        ]}
      />
    </mesh>
  );
};

const WithFiber = () => {
  return (
    <>
      <GlobalStyles />
      <Main>
        <Section>
          <Canvas
            camera={{
              fov: 75,
              near: 0.1,
              far: 1000,
              position: [0, -200, 35],
            }}
          >
            <Model />
          </Canvas>
        </Section>
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
`;

export default WithFiber;
