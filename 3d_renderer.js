//2020-March-12
//@invictus

//Imported THREE.js build module,OrbitControls for 
import * as THREE from './build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

//Camera for vision, scene for platform, renderer for visualization(display);
var camera, scene, renderer;

//Created a scene & background set as mentioned color
scene = new THREE.Scene();
scene.background = new THREE.Color( "#f6e8c3" );

//Created a PrespectiveCamera with set position
camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.25, 3000 );
camera.position.set( 0, 10, 15);

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

//Created a OrbitControl and updated
var controls=new OrbitControls(camera,renderer.domElement);
controls.update();

//Created two lights
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

//Lights added to the scene
scene.add( light );
scene.add( anotherLight );

//Created a GLTFLoader
var loader = new GLTFLoader().setPath( './' );

//GLTF loaded and added to scene
loader.load( 'mountain.gltf', function ( gltf ) {
            gltf.scene.scale.set(1.5,1.5,1.5);
            scene.add(gltf.scene);
} ); 

//EventListener to window resize
window.addEventListener('resize',function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
});

//model is rendered
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

//Call function to render model
animate();