(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Project = require('./project.js');
const mainURL = 'https://pohlinwei.github.io/';

/*================
    FUNCTIONS 
================*/
// For home page
const alternate = () => blink.style.color = blink.style.color == 'rgb(255, 255, 255)' 
                        ? 'rgb(0, 0, 0)'
                        : 'rgb(255, 255, 255)';
const toHomeDiv = () => homeDiv.scrollIntoView(false);

// For work page and descriptions
let currentlyShowingIndex = null;
let currentDescription = null;
let currentProject = null; 
const showDescription = i => {
    for (let j = 0; j < toggle.length; j++) {
        toggle[j].classList.add('hidden');
    }
    currentlyShowingIndex = i;
    currentDescription = allDescriptions[i];
    currentDescription.classList.remove('hidden');
    // show intro if it has been removed earlier
    const currentIntro = currentDescription.children[1];
    if (currentIntro.classList.contains('hidden')) {
        currentIntro.classList.remove('hidden');
    }
    body.style.backgroundColor = '#F0FEFE';
}
const hideDescription = () => {
    // hide images and reset
    currentProject.clear();
    // hide 'pop up' window
    currentDescription.classList.add('hidden');
    for (let i = 0; i < toggle.length; i++) {
        toggle[i].classList.remove('hidden');
    }
    body.style.backgroundColor = '#000';
    workDiv.scrollIntoView(false);
    currentlyShowingIndex = null;
    currentDescription = null;
    currentProject = null;
}
const showcase = () => {
    const currentIntro = currentDescription.children[1];
    currentIntro.classList.add('hidden');
    currentProject = projects[currentlyShowingIndex];
    currentProject.next();
}
const updateImage = () => {
    if (currentProject == null) {
        return;
    } else {
        console.log('main resiz');
        currentProject.update();
    }
}

// Obtain required data for showcase
const files = ['tumblrTheme', 'zeitraum', 'acompianist'];
// number of images for each of the above
const numImages = [4, 8, 4];
const projects = [];
for (let i in files) {
    projects.push(new Project(i, files[i], numImages[i]));
}

/*====================
    EVENT HANDLERS
====================*/
// General
const body = document.querySelector('body');

// For navigation
const allButtons = document.getElementsByClassName('button');
const allContentDiv = document.getElementsByClassName('content');
for (let i = 0; i < allButtons.length; i++) {
    const button = allButtons[i];
    button.onclick = () => allContentDiv[i].scrollIntoView(false);
}
const homeButton = document.getElementById('home-button');
const logo = document.getElementById('logo');
homeButton.onclick = toHomeDiv;
logo.onclick = toHomeDiv;

// For home page
const homeDiv = document.getElementById('home-div');
const blink = document.getElementById('blink');
blink.style.color = 'rgb(255, 255, 255)';
setInterval(alternate, 1000);

// For work page
const workDiv = document.getElementById('work-div');
const allProjects = document.getElementsByClassName('project');
const toggle = document.getElementsByClassName('toggle');
for (let i = 0; i < allProjects.length; i++) {
    allProjects[i].onclick = () => showDescription(i);
}

// For description
const allDescriptions = document.getElementsByClassName('description');
const closeButtons = document.getElementsByClassName('close');
for (let closeButton of closeButtons) {
    closeButton.onclick = hideDescription;
}
const introNextButtons = document.getElementsByClassName('intro-next');
for (let introNextButton of introNextButtons) {
    introNextButton.onclick = showcase;
}
window.onresize = updateImage;
},{"./project.js":2}],2:[function(require,module,exports){
module.exports = class Project {
    constructor(index, name, length) {
        this.index = index;
        this.name = name;
        this.length = length;
        this.current = null;
        this.landscape = this.isLandscape();
        /* For HTML element creation */
        this.nextButton = '<div class="next hidden"><p>>></p></div>';
        this.backButton = '<div class="back hidden"><p><<</p></div>';
        this.pre = '<div class="hidden"><img src="images/';
        this.post = '.png"/></div>';
        /* To create elements and load images */
        this.generateElements();
    }

    generateElements() {
        let innerhtml = '';
        innerhtml += this.backButton;
        for (let i = 0; i < this.length; i++) {
            innerhtml += (this.pre + this.name + '/' + i + this.post);
            innerhtml += (this.pre + this.name + '/' + 'mobile_' + i +
                            this.post);
        }
        innerhtml += this.nextButton;
        const targetParent = document.getElementsByClassName('showcase')[this.index];
        targetParent.innerHTML = innerhtml;
        // add event listeners on buttons
        const nextButton = document.getElementsByClassName('next')[this.index];
        const backButton = document.getElementsByClassName('back')[this.index];
        nextButton.onclick = () => this.next();
        backButton.onclick = () => this.prev();
    }

    next() {
        if (this.current == null) {
            this.current = 0;
            const nextButton = document.getElementsByClassName('next')[this.index];
            const backButton = document.getElementsByClassName('back')[this.index];
            nextButton.classList.remove('hidden');
            backButton.classList.remove('hidden');
        } else {
            const prevSelector = this.selector();
            const prevElement = document.querySelector(prevSelector).parentElement;
            prevElement.classList.add('hidden');
            this.current++;
        }
        this.landscape = this.isLandscape();
        const selector = this.selector();
        const element = document.querySelector(selector).parentElement;
        element.classList.remove('hidden');
    }

    prev() {

    }

    update() {
        console.log('sub resize');
        if (this.isLandscape() == this.landscape) {
            console.log('no change');
            return;
        } else {
            console.log('change');
            const prevSelector = this.selector();
            const prevElement = document.querySelector(prevSelector).parentElement;
            prevElement.classList.add('hidden');
            this.landscape = this.isLandscape();
            const selector = this.selector();
            const element = document.querySelector(selector).parentElement;
            element.classList.remove('hidden');
        }
    }

    clear() {
        if (this.current == null) {
            return;
        }
        const selector = this.selector();
        const element = document.querySelector(selector).parentElement;
        element.classList.add('hidden');
        const nextButton = document.getElementsByClassName('next')[this.index];
        const prevButton = document.getElementsByClassName('back')[this.index];
        nextButton.classList.add('hidden');
        prevButton.classList.add('hidden');
        this.current = null;
    }

    selector() {
        return ('img[src="images/' + this.name + '/') + 
            (this.landscape ? '' : 'mobile_') +
            this.current + '.png"]';
    }

    /*
    get next() {
        this.current = this.current == null ? 0 : (this.current + 1);
        let innerhtml = this.name + '/' + (this.isLandscape() ? '' : 'mobile_');
        innerhtml += (this.current + '.png');
        innerhtml = this.pre + innerhtml + this.post;
        if (this.current == length - 1) {
            innerhtml += this.nextButton;
        } else {
            innerhtml = this.backButton + innerhtml + this.nextButton;
        }
        console.log(innerhtml);
        this.innerhtml = innerhtml;
        return innerhtml;
    }

    get prev() {
        
    }

    get update() {
        if (this.current == null || this.current == length - 1) {
            return this.innerhtml;
        } else {
            let innerhtml = this.name + '/' + (this.isLandscape() ? '' : 'mobile_');
            innerhtml += (this.current + '.png');
            innerhtml = this.pre + innerhtml + this.post;
            innerhtml = this.backButton + innerhtml + this.nextButton;
            this.innerhtml = innerhtml;
            return innerhtml;
        }
    }*/

    isLandscape() {
        return window.innerHeight < window.innerWidth;
    }
}
},{}]},{},[1]);
