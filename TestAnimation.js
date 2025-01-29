/**
 * Initializes a Three.js background animation.
 * @param {string} testAnimation - The ID of the container div where the renderer should attach.
 */
function initThreeJsAnimation(testAnimation) {
  // 1. Get the container element
  const container = document.getElementById(testAnimation);
  if (!container) {
    console.error(`Container with ID "${testAnimation}" not found.`);
    return;
  }

  // 2. Create a Three.js scene
  const scene = new THREE.Scene();

  // 3. Create a camera
  // Using window.innerWidth/innerHeight so it fills the browser window
  const camera = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 10; // Some distance away from the origin

  // 4. Create a WebGL renderer
  // 'alpha: true' keeps the background transparent if you want to see the page behind it
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // 5. Add the renderer's canvas to our container
  container.appendChild(renderer.domElement);

  // 6. Add some geometry & material to animate (example: rotating torus)
  const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  // 7. Handle window resizing so the background is always full-screen
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

  // 8. Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Example animation: rotate the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
  }

  // 9. Kick off animation
  animate();
}