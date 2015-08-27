## Getting Started with Photogram Source Code

> Thank's for purchasing!!!!

Let's go and clone this project!

### Full Document and Preview:

[http://movibe.github.io/photogram-docs/](http://movibe.github.io/photogram-docs/)


## Getting Starter
1. Install nodejs: 
> [http://nodejs.org/ ](http://nodejs.org/)

2. Install Ionic, Bower, Cordova and Gulp
> $ npm install -g ionic bower cordova gulp

3. Intall Node Modules
> $ npm install

 or 
> $ sudo npm install

4. Install Bower Libs
> $ bower install

5. Gulp dev tas
> $ gulp  

6. Install Ionic Analytics and Configure your Parse Keys

## Ionic Analytics (required)
1. Create Account 
>  [Apps Ionic.io](https://apps.ionic.io/)

2. Configure your app name
> ionic.project
> bower.json
> package.json

3. Enter command in your terminal
> $ ionic io init

Finished, Ionic Analytics configured!

Access Ionic Apps Dashboard and view your app analytics report
[https://apps.ionic.io/apps](https://apps.ionic.io/apps)

## Configure Parse 
1. Create account in Parse 
> [http://parse.com](http://parse.com)

2. Follow online documentation in Github
> [http://movibe.github.io/photogram-docs/#parse](http://movibe.github.io/photogram-docs/#parse)

3. Edit file and set your Parse Keys
>www/js/config.parse.js

![enter image description here](http://movibe.github.io/photogram-docs/assets/images/facebook-config.jpg)


## Test in Web Browser
After following the above instructions, type in your terminal for run ionic server

> $ ionic serve
  
## Facebook Configuration ##

 1. Create Account in Facebook Developers
 2. Follow  [documentation](http://movibe.github.io/photogram-docs/#facebook)
 2. Edit File with your Keys www/js/config.facebook.js

##Build and run app on iOS (only Mac OS) ##
> $ sudo npm install -g ios-sim 

> $ ionic run ios