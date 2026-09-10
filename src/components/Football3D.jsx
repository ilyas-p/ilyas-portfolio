import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

function readThemeColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#b9ff65',
    accent2: styles.getPropertyValue('--accent-2').trim() || '#8a7cff',
    border: styles.getPropertyValue('--border').trim() || '#272a32',
  };
}

function Football3D() {
  const containerRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

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

    const colors = readThemeColors();

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

    const themeObserver = new MutationObserver(() => {
      const next = readThemeColors();
      goalMat.color.set(next.border);
      ballMat.color.set(next.accent);
      ballCoreMat.color.set(next.accent2);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
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
  }, [reducedMotion]);

  if (!supported) {
    return (
      <div className="visual-code" role="img" aria-label="Stylised goal and football illustration">
        <p className="code-line">// 3D preview unavailable — WebGL not supported</p>
      </div>
    );
  }

  return <div className="visual-3d" ref={containerRef} role="img" aria-label="Rotating 3D football in front of a goal frame" />;
}

export default Football3D;
