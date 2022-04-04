
import React, { Component } from 'react';
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';

class ThreeBim extends Component {
    constructor(props) {
        super(props);
        this.m_Renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 2;
        this.state = {

        };
    }

    initThree() {

        var width, height;
        width = window.innerWidth;
        height = window.innerHeight;
        this.m_Renderer.setSize(width, height);
        document.getElementById('canvas-frame').appendChild(this.m_Renderer.domElement);
        this.m_Renderer.setClearColor(0x000000, 1.0);


        var light;
        light = new THREE.AmbientLight(0xFFFFFF);
        light.position.set(300, 300, 0);
        this.scene.add(light);

        var geometry = new THREE.TorusGeometry(.7, .2, 16, 100);
        var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);

        const clock = new THREE.Clock();
        const tick = () => {

            const elapsedTime = clock.getElapsedTime()
        
            // // Update objects
            // sphere.rotation.y = .5 * elapsedTime
        
            // // Update Orbital Controls
            // controls.update()
        
            // Render
            this.m_Renderer.render(this.scene, this.camera)
        
            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
        tick();
    }

    /**
     * 开始Three
     *
     * @memberof ThreeBim
     */
    componentDidMount() {
        this.initThree();
    }
    render() {
        return (
            <div id='canvas-frame'>
            </div>
        );
    }
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ThreeBim />);
// export default ThreeBim;