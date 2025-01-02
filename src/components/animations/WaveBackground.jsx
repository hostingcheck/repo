import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaveBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Setup
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

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

    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 4;
    scene.add(wave);
    camera.position.z = 30;

    // Animation
    let animationFrameId;
    const animate = (time) => {
      material.uniforms.uTime.value = time / 1000;
      wave.rotation.z += 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 bg-gradient-to-b from-background to-background/90"
    />
  );
};

export default WaveBackground;