// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
controls.update();

// Object storage
const objects = [];

// Add basic shapes
function addCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
  scene.add(cube);
  objects.push(cube);
}

function addSphere() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
  scene.add(sphere);
  objects.push(sphere);
}

// Export the model
function exportModel() {
  const exporter = new THREE.GLTFExporter();
  exporter.parse(
    scene,
    function (result) {
      const blob = new Blob([JSON.stringify(result)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "model.gltf";
      link.click();
    },
    { binary: false }
  );
}

// Event listeners
document.getElementById("addCube").addEventListener("click", addCube);
document.getElementById("addSphere").addEventListener("click", addSphere);
document.getElementById("exportModel").addEventListener("click", exportModel);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

