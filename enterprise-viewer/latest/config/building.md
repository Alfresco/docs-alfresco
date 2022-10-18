---
title: Building and Deploying Alfresco Enterprise Viewer
---
This guide overviews how to build OpenAnnotate from source into an `OpenAnnotate.war` archive that can be deployed on an application server.

In order to run OpenAnnotate, the following need to be installed on your system:

* nodist - Manages various releases of Node.js (Windows) - <https://github.com/marcelklehr/nodist>
* nvm - manages various releases of node.js (Linux/Mac)
* Node Package Manager (NPM) - Manages node packages - typically installed when installing a version of NodeJS
* Grunt.js - Task Runner for building, minifying, testing, etc - <http://gruntjs.com>
* Git (optional) - Allows you to pull github repos, which some node modules require. Also makes the installation of nodist easier. <http://git-scm.com/download/win>
* SVN - Used to create the unique hash for OA

#### Installing Nodist and NodeJS

Follow the DIY installation instructions here (<https://github.com/marcelklehr/nodist>) - note the git command will install it to the directory the command is run in). The build is validated to work with NodeJS versions 7.x - 9.x (9.3 is latest, 8.9 is stable LTS). As of the time of this post, it is recommended to install the latest stable version (8.9). Make it your "global" node version.

* Run the installer
* Test that you can run NPM by opening a command window, running the command `npm -v` and verifying that it outputs an installed version

#### Grunt

Run the following commands:

`npm install -g grunt-cli`
NOTE: if you have multiple versions of OpenAnnotate on your machine, you may want to run npm install grunt-cli to avoid anything clashing with your global npm loaded libraries.
Verify that you can run the command: grunt -version (it should just spit out the version number)

#### Project Builds

Navigate to your OpenAnnotate code folder (dir with Gruntfile.js) and run the following command:

```node
npm install
```

This will download build dependencies for OpenAnnotate and place them into the `node_modules` folder

##### Having issues?

* if you are having problems downloading some packages due to SSL errors, run the following command: `npm config set strict-ssl false` - or better yet, update the npm version you are using.
* NOTE: On Windows 10 some users have had issues with the `node-gyp` module not building or erroring out when running `npm install`. Try running `npm install --global --production windows-build-tools` from an admin-privileged command prompt, then retrying the `npm install`. See [here](https://github.com/nodejs/node-gyp#installation) for additional information.
* If you are trying to build from behind a corporate firewall, you may encounter issues, make sure to add a proxy and ssl proxy - something like this will work

```text
    npm config set proxy http://proxy.company.com:8080 
    npm config set https-proxy http://proxy.company.com:8080
```

## Source

**Pull down OpenAnnotate from SVN:**

* Repo: <http://svn.tsgrp.com/repos/annotationtool/trunk/code>  - can be placed in `C:\Projects\OA\trunk\SourceCode` for instance. This will make your `SourceCode` directory contain the OpenAnnotate source.

**Required resources:** Java JDK (min version 1.6), Apache Tomcat 6.x

## Configure Your Build Environment

To configure your build environment, follow these steps:

1. Create a build properties for your machine in the format: `build-<COMPUTERNAME>.properties` (more details below).
1. Create an overlay folder for your machine (or project) in the `overlay` directory. For more information on creating your overlay, see [Creating an OA Overlay](https://github.com/tsgrp/OpenAnnotate/wiki/Creating-an-OA-Overlay).
(Optional) If you need to change Java versions, you'll also need to create a `setenv-{COMPUTERNAME}.bat` file, to change your Java Home.  Typically the two properties you may need to change will be `ocRestEndpointAddress` and `clientRequestUrl`.  These point to your specific server, and also change if you are on an Alfresco backend.

### Build Properties

Write your own `build-{COMPUTERNAME}.properties` and `setenv-{COMPUTERNAME}.bat` files using your computer’s given name (e.g., CLIFTON, NEWPORT, OHARE, WOLFRAM). The only required property is the `overlay` property.  Set this value to the overlay you would like to use during the build. If you do not define an overlay, you must do so at build time with an `--overlay` switch in the grunt build command.

You can also define a `deployDir` here which is an absolute path to your application server where OpenAnnotate should be deployed (for example, `deployDir=C:/servers/apache-tomcat-6.0.37-myServer/webapps`). This will tell the build to deploy the built `OpenAnnotate.war` file to the specified location.

### Environment Variables

You must have the JAVA_HOME and svn environment variables set properly for the OA build to work. (can ignore if these are on your PATH already)

**Be sure that your Java version is 1.6x since many of our clients still use Java 6.**

## Client Libraries

OpenAnnotate relies on the following OpenContent client libraries:

* oc-core-client-2.3.jar

**Be sure to update these client JARs if changes have been made to the corresponding OpenContent files before building OpenAnnotate. Again, when these client JARs are built, they must be built using Java 6.** For information on where these JARs should be placed, see the [OpenAnnotate Source Folder Structure](https://github.com/tsgrp/OpenAnnotate/wiki/OpenAnnotate-Source-Folder-Structure) article.

## Building OpenAnnotate

To build OpenAnnotate, open a command prompt in the OA source code folder (where the `build.gradle` file and your specific computer properties files reside), and type the following command:

```node
grunt deployWar
```

This will build OpenAnnotate and deploy the built war file to the location specified in the `deployDir` property. If you do not wish to deploy the OA war, you can type the following command:

```node
grunt war
```

This will build OpenAnnotate and you can find the war file in the `OA_HOME/build/libs` directory.

## Options When Building OpenAnnotate

```text
overlay : Specifies what overlay you would like to use when building
project : Specifies what project you would like to use when building
deployDir : Specifies what directory you would like to deploy the OA war to when it has finished building
tsgUtilsBranch : Specifies what branch of tsgUtils to pull down from git
ignoreGit : Specifies that OA should be built with the current tsgUtils code saved in SVN. NOTE: tsgUtils only gets committed to SVN when a release occurs. Having this flag set may not give you the most up to date tsgUtils
unminified : Specifies that OA should be unminified when built
sourceMaps : Specifies that OA should not generate source maps when building"
noisy : Specifies that any logging available should be logged in the command line"
```

## Building for JBoss Servers

When building OpenAnnotate for JBoss, set the `targetApacheServerType` build property to `jboss` in your `build-<COMPUTERNAME>.properties` file. This will omit the Jackson mapper jar and add a `jboss-deployment-structure.xml` file to the OpenAnnotate.war.

## Embedding OpenAnnotateVideo into OpenAnnotate

To embed OpenAnnotateVideo in OpenAnnotate, first set `oaVideoEmbedded` variable, located at `defaults.properties`, to `true`.
Build OpenAnnotate and OpenAnnotateVideo. Unzip both OpenAnnotate and OpenAnnotateVideo war files. Put the OpenAnnotateVideo folder inside the OpenAnnotate folder. Make a war file of the new combined OpenAnnotate folder. This will embed OpenAnnotateVideo into OpenAnnotate.
