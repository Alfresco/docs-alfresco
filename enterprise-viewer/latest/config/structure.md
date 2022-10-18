---
title: Alfresco Enterprise Viewer Source Folder Structure
---

Before beginning to understand the OpenAnnotate folder structure, be sure to pull down the source code, which is detailed in [Building and Deploying OpenAnnotate](https://github.com/tsgrp/OpenAnnotate/wiki/Building-and-Deploying-OpenAnnotate).

After pulling down the source code, navigate to your local OpenAnnotate source.  The most important folder paths are discussed below:

## /src

The folder containing source code (server and client resources) for OpenAnnotate.

### /src/main/java

The Java files for OpenAnnotate. These files include controllers, util classes, authentication handlers and configuration files.

### /src/main/webapp

The client side files for OpenAnnotate including JavaScript files, CSS, FTL templates, fonts, images, etc.

## /libs

Contains required client JARs from OpenContent.

**Be sure to update these client JARs when making changes to the source client files in OpenContent. NOTE: The JARs in this folder must be compiled using Java 6 since some of our clients still use Java 6.**

## /overlay

Contains overlay folders for different environments, machines and clients. For more information on creating an overlay, see [Creating an OA Overlay](https://github.com/tsgrp/OpenAnnotate/wiki/Creating-an-OA-Overlay).

## /jsdoc

Contains the documentation for the OpenAnnotate source. For more information on compiling the source documentation, see [API and JavaDoc](https://github.com/tsgrp/OpenAnnotate/wiki/API-and-Javadoc).
