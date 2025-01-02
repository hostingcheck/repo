import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useWaveBackground = (containerId) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    if (!containerId) return;
    containerRef.current = document.getElementById(containerId);
    if (!containerRef.current) return;

    // Setup scene
    const setupScene = () => {
      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      rendererRef.current = new THREE.WebGLRenderer({ alpha: true });

      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(rendererRef.current.domElement);

      // Create wave geometry
      const geometry = new THREE.PlaneGeometry(60, 60, 50, 50);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color('#6A11CB') },
          uColorB: { value: new THREE.Color('#2575FC') },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin(pos.x * 2.0 + uTime) * 0.5 + 
                        cos(pos.y * 2.0 + uTime) * 0.5;
            pos.z = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          
          void main() {
            vec3 color = mix(uColorA, uColorB, vUv.x);
            gl_FragColor = vec4(color, 0.5);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      waveRef.current = new THREE.Mesh(geometry, material);
      waveRef.current.rotation.x = -Math.PI / 4;
      sceneRef.current.add(waveRef.current);
      cameraRef.current.position.z = 30;
    };

    // Animation
    const animate = (time) => {
      if (!waveRef.current || !rendererRef.current) return;
      
      waveRef.current.material.uniforms.uTime.value = time / 1000;
      waveRef.current.rotation.z += 0.001;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    setupScene();
    animate(0);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [containerId]);

  return { containerRef };
};

export default useWaveBackground;