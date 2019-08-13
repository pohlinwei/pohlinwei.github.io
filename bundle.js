(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Project= require('./project.js');

/*================
    FUNCTIONS 
================*/
// For home page
const alternate = () => blink.style.color = blink.style.color == 'rgb(255, 255, 255)' 
                        ? 'rgb(0, 0, 0)'
                        : 'rgb(255, 255, 255)';
const toHomeDiv = () => homeDiv.scrollIntoView(false);

// For work page and descriptions
let currentDescription = -1;
const showDescription = i => {
    for (let j = 0; j < toggle.length; j++) {
        toggle[j].classList.add('hidden');
    }
    currentDescription = allDescriptions[i];
    currentDescription.classList.remove('hidden');
    body.style.backgroundColor = '#EDEDED';
}
const hideDescription = () => { 
    // hide 'pop up' window
    currentDescription.classList.add('hidden');
    for (let i = 0; i < toggle.length; i++) {
        toggle[i].classList.remove('hidden');
    }
    body.style.backgroundColor = '#000';
    workDiv.scrollIntoView(false);
    currentDescription = -1;
}

// Obtain required data for showcase
const files = ['tumblrTheme', 'zeitraum', 'acompianist'];
for (let i in files) {
   new Project(i, files[i]);
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
setInterval(alternate, 500);

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
},{"./project.js":2}],2:[function(require,module,exports){
const mainURL = 'https://pohlinwei.github.io/';
module.exports = class Project {
    constructor(index, name) {
        this.index = index;
        this.name = name;
        /* For HTML element creation */
        this.preImage = '<div class="project-img"><img src="images/' + this.name + '/';
        this.postImage = '.png"/></div>';
        // !!! shall I change this?
        this.github = '<div class="view-code"><a href="">View Code <img src="vectors/github.svg"/></a></div>';
        this.text = [];
        this.title = '';
        this.length = 0;
        fetch(mainURL + '/json/' + name + '.json')
            .then(response => response.json())
            .then(data => {
                this.length = data.length;
                this.text.push(...data.text);
                this.title = data.title;
                if (this.length == 0) {
                    throw "this.length is 0";
                } else if (this.text.length == 0) {
                    throw "No text received";
                } else if (this.title.length == 0) {
                    throw "No title received";
                }
                this.generateElements();
            })
            .catch(err => console.error('Parsing of .json was unsuccessful: ' + err));
        /* To create elements and load images */
    }

    generateElements() {
        let innerhtml = '<div><div class="title"><p>' + this.title + '</p></div>';
        innerhtml += '<div class="details">';
        for (let i = 0; i < this.length; i++) {
            innerhtml += (this.preImage + i + this.postImage);
            innerhtml += (this.preImage + 'mobile_' + i + this.postImage);
            innerhtml += ('<p>' + this.text[i] + '</p>');
        }
        innerhtml += (this.github + '</div></div>');
        console.log(innerhtml);
        const parentElement = document.getElementsByClassName('intro')[this.index];
        parentElement.innerHTML = innerhtml;
    }
}
},{}]},{},[1]);
