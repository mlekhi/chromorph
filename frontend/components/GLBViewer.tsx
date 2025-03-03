"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

interface GLBViewerProps {
  glbUrl: string;
}

const GLBViewer: React.FC<GLBViewerProps> = ({ glbUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glbUrl || !mountRef.current) {
      console.warn("GLBViewer: glbUrl or mountRef not available");
      return;
    }

    console.log("GLBViewer: Starting setup with URL:", glbUrl);

    // Get container dimensions.
    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;
    console.log("Container dimensions:", width, height);

    // Create scene.
    const scene = new THREE.Scene();
    // Set a fallback background color.
    scene.background = new THREE.Color(0xe0e0e0);

    // Set up camera.
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 2);

    // Set up renderer.
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    console.log("Renderer appended:", renderer.domElement);

    // Add lights.
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load the HDR environment texture.
// Load the HDR environment texture.
  const rgbeLoader = new RGBELoader();
  rgbeLoader.setDataType(THREE.FloatType); // Use FloatType instead of UnsignedByteType
  rgbeLoader.load('world-texture.hdr', (texture) => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    // Apply the environment map to both the scene background and environment.
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
    console.log("HDR environment applied to background and environment.");
    });

    // Create a pivot group to hold the model.
    const pivot = new THREE.Group();
    scene.add(pivot);

    // Load the GLB model.
    const loader = new GLTFLoader();
    loader.load(
      glbUrl,
      (gltf) => {
        console.log("GLB loaded successfully:", gltf);
        const model = gltf.scene;

        // Rotate the model so it stands up.
        model.rotation.x = Math.PI / 2;  // Adjust this as needed.
        // Add the model to the pivot group.
        pivot.add(model);

        // Compute the model's bounding box and center it in the pivot.
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        console.log("Model bounding box center:", center);
        // Shift the model so its center aligns with the pivot's origin.
        model.position.sub(center);

        // Adjust camera based on the model's size.
        const size = box.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        let distance = maxSize / (2 * Math.tan((Math.PI * camera.fov) / 360));
        if (distance < 1) distance = 1;
        // Adjust the multiplier for desired zoom (0.8 zooms in closer).
        camera.position.set(0, 0, distance);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        console.log("Camera positioned at:", camera.position);
      },
      (xhr) => {
        console.log(`Loading GLB: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error("Error loading GLB:", error);
      }
    );

    // Animation loop: rotate the pivot group.
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      pivot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize.
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      console.log("Resized to:", width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount.
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [glbUrl]);

  // Force a nonzero height with inline style.
  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '400px' }}
      className="bg-gray-200 border-2 border-dashed border-red-500"
    />
  );
};

export default GLBViewer;
