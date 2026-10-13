import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotionPref } from '../hooks/useMedia.js';

function Football3D({ accent = '#46e3a8', accent2 = '#f4f1ec', line = '#6d6c75' }) {
  const containerRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const reducedMotion = useReducedMotionPref();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setSupported(false);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.1, 5.2);

    const colors = { accent, accent2, border: line };

    // Goal frame — simple low-poly wireframe box edges
    const goalGeo = new THREE.BoxGeometry(3.4, 1.9, 1.1);
    const goalEdges = new THREE.EdgesGeometry(goalGeo);
    const goalMat = new THREE.LineBasicMaterial({ color: colors.border, transparent: true, opacity: 0.8 });
    const goal = new THREE.LineSegments(goalEdges, goalMat);
    goal.position.set(0, 0.75, -1.4);
    scene.add(goal);

    // Ball — wireframe icosahedron
    const ballGeo = new THREE.IcosahedronGeometry(0.62, 1);
    const ballMat = new THREE.MeshBasicMaterial({ color: colors.accent, wireframe: true });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.set(0, -0.1, 1.1);
    scene.add(ball);

    const ballCoreMat = new THREE.MeshBasicMaterial({ color: colors.accent2, wireframe: true });
    const ballCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), ballCoreMat);
    ballCore.position.copy(ball.position);
    scene.add(ballCore);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let frameId;
    const animate = () => {
      if (!reducedMotion) {
        ball.rotation.y += 0.006;
        ball.rotation.x += 0.002;
        ballCore.rotation.y -= 0.004;
        goal.rotation.y = Math.sin(Date.now() * 0.0002) * 0.06;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      goalGeo.dispose();
      goalEdges.dispose();
      goalMat.dispose();
      ballGeo.dispose();
      ballMat.dispose();
      ballCoreMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion, accent, accent2, line]);

  if (!supported) {
    return (
      <p className="absolute inset-0 flex items-center justify-center text-sm text-mist">3D preview unavailable — WebGL not supported</p>
    );
  }

  return <div className="absolute inset-y-0 right-0 w-full sm:w-[62%]" ref={containerRef} role="img" aria-label="Rotating 3D football in front of a goal frame" />;
}

export default Football3D;
