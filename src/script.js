import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

// const gui = new GUI();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene()
const plane = new THREE.PlaneGeometry(3,3,10,1)
const material = new THREE.MeshBasicMaterial({
    color: 0xf348ff,
    side: THREE.DoubleSide
})
const mesh = new THREE.Mesh(plane, material)
scene.add(mesh)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.set(0,2,4)
const canvas = document.querySelector('#webgl')

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xf8a5c2)
renderer.shadowMap.enabled = true

let controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.02

scene.add(camera)
const PointLight = new THREE.PointLight(0x7F6C6C, 4, 80);
PointLight.position.set(0, 7, 0);
scene.add(PointLight);
camera.lookAt(mesh)

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullScreenElement) {
        if (canvas.requestFullscreen)
            canvas.requestFullscreen()
        else if (canvas.webkitRequestFullscreen)
            canvas.webkitRequestFullscreen
    }
    else {
        document.exitFullscreen()
    }
});

function tick() {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
