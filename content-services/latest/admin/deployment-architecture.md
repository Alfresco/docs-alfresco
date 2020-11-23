---
title: Deployment architecture
---

The way Content Services is deployed and run from version 6.0 onwards dramatically changed from previous versions. 
Docker and Kubernetes are now used and there are no installers.

## Introduction

The way you deploy and run the Content Services solution has changed significantly since version 6.0. 
Traditionally you would download an installer that would install Java, Tomcat, Database, WARs, tools, etc., and 
things would be configured to work together. Then you would use a script to kick things off. That’s no longer the case 
and there are no installers available. We will be working with Docker containers instead.

It’s now possible to kick off Content Services from a number of Docker images. These images are available in the 
[https://hub.docker.com](https://hub.docker.com) repository. However, kicking off individual Docker containers based on 
these images, and configuring them to work together, might not be the most productive way to get up and running with 
Content Services. To make things easier, and achieve a one-click to deploy and run solution, a Docker compose 
file is available to quickly deploy and run Content Services when you need to test something or work on a 
proof-of-concept (PoC).

There are also Helm Charts available to deploy the solution in production as a Kubernetes cluster in for example AWS.

## Docker Architecture

When Content Services is deployed with Docker it looks something like this:

![acs_docker_deployment_overview]({% link content-services/images/acs_docker_deployment_overview.png %})

A number of Docker images are deployed to make up the Content Services solution:

* **alfresco/alfresco-share**- the Alfresco Share web interface (i.e. share.war) running on Apache Tomcat
* **alfresco/alfresco-search-services**- the Solr 6 based search service running on Jetty
* **alfresco/alfresco-content-repository** - the Alfresco Repository app (i.e. alfresco.war) running on Apache Tomcat
* **alfresco/alfresco-activemq** - the Alfresco ActiveMQ image

There are also other supporting features available, such as Docker images for image and document transformation:

* **alfresco/alfresco-imagemagick**
* **alfresco/alfresco-libreoffice**
* **alfresco/alfresco-alfresco-pdf-renderer**
* **alfresco/alfresco-tika**

To build the `alfresco/alfresco-content-repository` image Alfresco uses the 
[https://github.com/Alfresco/acs-packaging](https://github.com/Alfresco/acs-packaging) project. This project also 
includes a Docker Compose script that can be used to launch a demo, test, or PoC system. You can customize this script 
if you like in order to run with different versions than those set by default, which are usually the latest versions.

## Kubernetes Architecture

Content Services cluster deployments are managed via Kubernetes container orchestrator. The deployment architecture 
is defined with the Helm tool.
