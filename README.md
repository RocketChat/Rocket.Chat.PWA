

# Rocket.Chat PWA 

JOIN the Rocket.Chat web components builder community now!   [CLICK HERE](https://demo.rocket.chat/channel/pwa_web_components)

## For mobile:

![](https://raw.githubusercontent.com/Sing-Li/bbug/master/images/pwaclientmobile.png)

## And desktop:

![](https://raw.githubusercontent.com/Sing-Li/bbug/master/images/pwaclientbig.png)

### Objectives:

* bandwidth efficient 
* usable even on 3G
* off line operations
* instant loading
* simplified UI and features subset 
* deploy Web Components for modular rapid application development
* take advantage of web worker and service workers
* add to home screen and push notifications via service workers
* loyal to the PRPL pattern
* follow PWA concepts
* support HTTP2 with Server Push
* leverage the web platform 
* be the first ever non-Meteor, messenger styled client that works great with the Rocket.Chat platform
* create a set of Rocket.Chat web components to form the basis of a UI construction kit
* engage a community of active contributors


### Based on

# Polymer App Toolbox - Drawer Template

This template is a starting point for building apps using a drawer-based
layout.  The layout is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Setup

##### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

Install [bower](https://github.com/bower/bower):

    npm install -g bower
##### Initialize project from template

    git clone https://github.com/(Your-Username)/Rocket.Chat.PWA.git
    cd Rocket.Chat.PWA
    bower install
   
### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build

### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve



### Test the build

This command serves the minified version of the app in an unbundled state, as it would
be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app generated using fragment bundling:

    polymer serve build/bundled
    
### Demo

Go to this URL to checkout the latest version of this app: https://pwa-rocket-chat.firebaseapp.com



### Extend

You can extend the app by adding more elements that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections
of the application.  Each new demand-loaded fragment should be added to the
list of `fragments` in the included `polymer.json` file.  This will ensure
those components and their dependencies are added to the list of pre-cached
components (and will have bundles created in the fallback `bundled` build).


