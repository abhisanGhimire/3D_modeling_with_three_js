//2020-March-14
//@invictus

//Imported THREE.js build module,OrbitControls and OBJLoader 
import * as THREE from './build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';


//Camera for vision, scene for platform, renderer for visualization(display);
var camera, scene, renderer;

//Created a scene & background set as mentioned color
scene = new THREE.Scene();
scene.background = new THREE.Color( "#f6e8c3" );

//Created a PrespectiveCamera with set position
camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.25, 3000 );
camera.position.set( 0, 15, 30);

//Created a WebGLRenderer & size set as window
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//Setting renderer for better results
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Adding rendered element to body of HTML
document.body.appendChild( renderer.domElement );

//Created a OrbitControl
var controls=new OrbitControls(camera,renderer.domElement);
controls.autoRotate=true;
//Created three lights
const ambientLight = new THREE.AmbientLight( 0x222222 );
var light = new THREE.DirectionalLight(0xdfebff, 1);
var anotherLight = new THREE.DirectionalLight( 0xffffff );

//Setting Lights for better result
light.position.set(50,200,10);
light.position.multiplyScalar( 1.3 );
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.castShadow = true;
anotherLight.position.set(1,1,1);
anotherLight.castShadow = false;

//All lights added to the scene
scene.add( light );
scene.add( anotherLight );
scene.add( ambientLight );


//Created a OBJLoader
const objLoader = new OBJLoader().setPath('./');

//OBJ loaded and added to scene
objLoader.load('models/windmill.obj', (root) => {
        scene.add(root);
    });


//EventListener to window resize
window.addEventListener('resize',function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
});

//model is rendered
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
}

//Call function to render model
animate();