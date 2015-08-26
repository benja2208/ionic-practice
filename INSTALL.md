##Getting Started with Ionic Framework

[Ionic](http://ionicframework.com/) is a powerful, beautiful and easy to use open source front-end framework built on top of  [AngularJs](https://angularjs.org/) (a client-side javascript framework), [Sass](http://sass-lang.com/) Syntactically Awesome Style Sheets [Apache Cordova](http://cordova.apache.org/) for and developing hybrid (cross platform) mobile apps.   

> Ionic's ultimate goal is to make it easier to develop native mobile apps with HTML5, also known as Hybrid apps. 

## Getting Starter  ##
1) Install nodejs: http://nodejs.org/ 

2) Install Ionic, Bower, Cordova and Gulp
> $ npm install -g ionic bower cordova gulp

3) Intall Node Modules
> $ npm install

or 

> $ sudo npm install

4) Install Bower Libs
> $ bower install

5) Gulp inject before test
> $ gulp inject

6) Run in Browser
> $ ionic serve

## Parse Configuration ##
1. Create account in Parse [http://parse.com](http://parse.com)
2. Follow online documentation in Github
[http://movibe.github.io/photogram-docs/#parse](http://movibe.github.io/photogram-docs/#parse)
3. Config Your Parse Keys in file
www/js/config.parse.js

![enter image description here](http://movibe.github.io/photogram-docs/assets/images/facebook-config.jpg)
  
## Facebook Configuration ##

 1. Create Account in Facebook Developers
 2. Follow  [documentation](http://movibe.github.io/photogram-docs/#facebook)
 2. Edit File with your Keys www/js/config.facebook.js

##Build and run app on iOS (only Mac OS) ##
> $ sudo npm install -g ios-sim 

> $ ionic run ios
 