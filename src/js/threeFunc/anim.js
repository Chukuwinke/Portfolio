import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


export class Animate3D {

    constructor(canvasSize, element, modelPath, rotate){
        this.modelPath = modelPath;
        this.element = element
        this.canvasSize = canvasSize;
         this.step = 0;
        // camera creation
        this.camera = new THREE.PerspectiveCamera(60, this.canvasSize.offsetWidth / this.canvasSize.offsetHeight, 0.1, 100);
        this.camera.position.set(0,0,4);
        this.rotate = rotate;
        // scene creation
        this.scene = new THREE.Scene();
        //this.scene.background = new THREE.Color(0xaaaaaa);

        //add ambient light
        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
        this.scene.add(ambient);

        //add directional light
        const light = new THREE.DirectionalLight();
        light.position.set(0.2, 1, 1);
        this.scene.add(light);

        //render creation
        this.renderer =new THREE.WebGLRenderer({antialias: true,
                                                canvas: this.element,
                                                alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvasSize.offsetWidth, this.canvasSize.offsetHeight);
        
        
        //this.scene.add(this.mesh)
        
        window.addEventListener('resize', this.resize.bind(this))

    }

    resize(){
        this.camera.aspect = this.canvasSize.offsetWidth /this.canvasSize.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvasSize.offsetWidth, this.canvasSize.offsetHeight);
    }
    render(){
       // this.rotation(self.spaceMan);
       //console.log("rendering")
       if(this.rotate){
        this.bounceObj(this.newObj);
       }
        this.renderer.render(this.scene, this.camera);
    }
    async loadGLTF(){
        const self =this;

        const loader = new GLTFLoader();
        //console.log(OrbitControls)

        
        const loadedData = await loader.loadAsync('./assets/spaceman_model/scene.gltf');
        
        self.spaceMan = loadedData.scene;
        self.spaceMan.position.set(0,-4,0)
        self.scene.add(loadedData.scene);
        this.newObj = self.spaceMan
       
        self.renderer.setAnimationLoop(self.render.bind(self))
        //console.log(loadedData)
    }
    bounceObj(spaceMan){
        //console.log(spaceMan);
        this.step += 0.01;
        spaceMan.position.y =1*Math.abs(Math.sin(this.step)) -3.5;
        spaceMan.rotation.y = Math.sin(this.step) * Math.abs(Math.cos(this.step /4) / 3);
           
    }

    async start(){
        await this.loadGLTF();
        this.renderer.setAnimationLoop(this.render.bind(this));
        console.log(`this is the path: ${this.modelPath} \n this is the element: ${this.element}`)
    }
}

// import('three/examples/jsm/controls/OrbitControls')
// .then(({OrbitControls}) => {
//     this.rotation(this.newObj);
//     this.renderer.setAnimationLoop(this.render.bind(this));
// }) 