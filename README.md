# nuxt-template is an SSR project for adding, deleting, and revising articles.

> Nuxt.js This project is a complete ssr structure project, suitable for newcomers to use, if you are helpful, please give a star in the upper right corner, encourage it, and hope to correct. You can also add the nuxt technology exchange group, and everyone will learn from each other and grow with each other.

> Online [demo] (http://47.104.245.86), online demonstration


## used technology

> Vue.js v2.0.0

> Nuxt.js v1.0.0

> Node.js v9.8.0 (must >=8.0)

> Express.js v4.x

> MongoDB v3.4.7

> element-ui v2.3.2


## Directory Structure

```
├── assets resource directory assets for organizing uncompiled static resources such as LESS, SASS or JavaScript
├──Build the packaged file
├── components storage component, the Vue.js component for organizing applications
│ ├── Footer page footer component
│ ├── ....
├──layouts layout template file, default default, by setting layout changes for the page
│ ├── edit Edit/Create Article Template
│ ├── ....
├── middleware storage application middleware
│ ├── auth.js routing is blocked by login
│ ├── ...
├── node_modules Node dependency file
├── nuxt.config.js Nuxt main configuration file
├── pages directory for storing pages
│ ├── index.vue Home
│ ├── ....
├── plugins store plugins for organizing Javascript plugins that need to be run before the root vue.js application is instantiated
│ └── nuxt-quill-plugin.js rich text editor plugin
├── README.md README
├── server express background directory
│ ├── api.js server interface
│ ├── db.js connects to MongoDB database files
│ ├── listrouter.js server startup configuration
│ ├── ....
├── static static file directory, such files will not be compiled and compiled by Nuxt.js calling Webpack. When the server is started, the files in this directory will be mapped to the root path of the application /
├── util save some tool files (add it yourself)
│ ├── net.js package network request
│ ├── ui.js package ui bullet box configuration
│ ├── ...
```


## Front End Development Guide

> First need to install >=node8.0 because nuxt1.0.0 must be installed in >=node8.0 environment

> Install element-ui, installation method page [this page] (http://element.eleme.io/#/zh-CN/component/quickstart) There are more detailed demos below, please refer to

> Installation and use of the rich text editor nuxt-quill-plugin [nuxt-quill-plugin] (https://github.com/surmon-china/vue-quill-editor).

> (Imported, because the local front and back end detection of the same interface can not be achieved, so different from the following back-end ports) front-end monitoring is port 3389, execute the command "npm run dev";



## Backend Development Guide

> Download and install MongoDB, the details are not described here, give the link [MongoDB] (https://www.mongodb.com/download-center?jmp=nav#atlas).

> Install Express, the details are not described here, give the link [Express] (http://expressjs.com/zh-cn/4x/api.html).

> Install supervisor real-time monitoring, which can be global or only installed in this project. Global installation method: sudo npm install -g supervisor.

> (The key point, because the local front and back end detection of the same interface can not be achieved, so different from the front port above) backend monitoring is 3000 ports, need to cd to the server folder directory, execute the command "supervisor listrouter.js" ;


## Alibaba Cloud Deployment

> The specific deployment steps are not detailed here. For details, see [Detailed Tutorial] (https://www.itcnz.top/20180418/%E9%98%BF%E9%87%8C%E4%BA%91%E9%83 %A8%E7%BD%B2nuxt%E9%A1%B9%E7%9B%AE.html)


## Build and run

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).