import { Animate3D } from "./threeFunc/anim";



export class App {

    toggleMenu(){
        const hamburger = document.querySelector(".hamburger__menu");
        const menuContainer = document.querySelector(".menu__container")
        const hamburgerIcon = document.querySelector(".hamburger-icon")

        hamburger.onclick = (e) => {
            if(hamburgerIcon.classList.contains("fa-bars")){
                hamburgerIcon.classList.remove("fa-bars")
                hamburgerIcon.classList.add("fa-xmark")
            }
            else{
                hamburgerIcon.classList.remove("fa-xmark")
                hamburgerIcon.classList.add("fa-bars")
            }
            menuContainer.classList.toggle("active")
        }
    }

    start(){
        this.toggleMenu();
        this.canvas = document.querySelector('.hero__canvas')
        this.canvasSize = document.querySelector('.canvas__container')
        this.path = 'www.example.com'
        const rotate = true
        const animation = new Animate3D(this.canvasSize, this.canvas, this.path, rotate)

        animation.start();
    }
}