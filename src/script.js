import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import osg from 'osg-serializer-browser';
var filePath = './Samples/Tile_+000_+013.osgb';

var osgeom = new THREE.BufferGeometry();
var osgmaterial = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色
    side: THREE.DoubleSide //两面可见
  }); //材质对象
var osgmesh = new THREE.Mesh(osgeom, osgmaterial);
fetch(filePath).then(res => { return res.arrayBuffer() }).then(abuf => {
    var osgObj = osg.readBuffer(abuf, filePath)
    var osgGeometry = osgObj.Children[0].Children[0];
    var osgVertexArray = new Float32Array(osgGeometry.VertexArray.flat());
    var osgIndexArray = new Uint16Array(osgGeometry.PrimitiveSetList[0].data.flat());
    // console.log(`PagedLOD`,osgObj);
    // console.log(`osgGeometry`,osgGeometry);
    // console.log(`osgVertexArray`,osgVertexArray);
    // console.log(`osgIndexArray`,osgIndexArray);
    // console.log(`positions`,positions);
    // console.log(`osgIndexArray`,osgIndexArray);
    osgeom.attributes.position = new THREE.BufferAttribute(osgVertexArray, 3);
    osgeom.index = new THREE.BufferAttribute(osgIndexArray, 1);
    console.log("osgeom", osgeom);
    console.log("osgmesh", osgmesh);
})

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)
scene.add(osgmesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()