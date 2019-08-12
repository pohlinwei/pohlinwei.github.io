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

// For work page
let currentlyShowingIndex = null;
const showDescription = i => {
    for (let j = 0; j < toggle.length; j++) {
        toggle[j].classList.add('hidden');
    }
    currentlyShowingIndex = i;
    allDescriptions[i].classList.remove('hidden');
    // show intro if it has been removed earlier
    const currentIntro = allDescriptions[i].children[1];
    if (currentIntro.classList.contains('hidden')) {
        currentIntro.classList.remove('hidden');
    }
    body.style.backgroundColor = '#F0FEFE';
}

// For description
const hideDescription = () => {
    allDescriptions[currentlyShowingIndex].classList.add('hidden');
    for (let i = 0; i < toggle.length; i++) {
        toggle[i].classList.remove('hidden');
    }
    body.style.backgroundColor = '#000';
    workDiv.scrollIntoView(false);
    currentlyShowingIndex = null;
}
const showcase = () => {
    const currentIntro = allDescriptions[currentlyShowingIndex].children[1];
    currentIntro.classList.add('hidden');
}

// Obtain required data for showcase
const files = ['tumblrTheme', 'zeitraum', 'acompianist'];
// number of images for each of the above
const numImages = [4, 4, 4];
const projects = [];
for (let i in files) {
    projects.push(new Project(files[i], numImages[i]));
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
},{"./project.js":2}],2:[function(require,module,exports){
module.exports = class Project {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.current = null;
        this.innerhtml = '';
    }

    /* remove the following, put this in html code */
    nextButton = '<div class="next"><p>>></p></div>';
    backButton = '<div class="back"><p><<</p></div>';
    pre = '<div><img src="images/';
    post = '"/></div>';
}
},{}]},{},[1]);
