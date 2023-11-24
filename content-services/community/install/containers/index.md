---
title: Containers overview
---

The following sections help you to understand what containerized deployment is, and the deployment options available for Community Edition when using containers.

## Deployment concepts

In addition to the standard deployment methods for non-containerized deployment, Alfresco provides Content Services packaged in the form of Docker containers, for companies who choose to use containerized and orchestrated deployment tools. While this is a much more advanced approach to deployment, it is expected that customers who choose this approach have the necessary skills to manage its complexity.

You can start Community Edition from a number of Docker images. These images are available in the [Docker Hub](https://hub.docker.com){:target="_blank"} repository. However, starting individual Docker containers based on these images, and configuring them to work together can be complicated. To make things easier, a **Docker Compose** file is available to quickly start Community Edition when you need to test something or work on a proof-of-concept (PoC).

There are also **Helm charts** available to deploy Community Edition in a Kubernetes cluster, for example, on Amazon Web Services (AWS). These charts are a deployment template which can be used as the basis for your specific deployment needs. The Helm charts are undergoing continual development and improvement and should not be used "as-is" for a production deployment, but should help you save time and effort deploying Community Edition for your organization.

The following is a list of concepts and technologies that you'll need to understand as part of deploying and using Community Edition. If you know all about Docker, then you can skip this part.

### Virtual Machine Monitor (Hypervisor)

A Hypervisor is used to run other OS instances on your local host machine. Typically it's used to run a different OS on your machine, such as Windows on a Mac. When you run another OS on your host it is called a guest OS, and it runs in a Virtual Machine (VM).

### Image

An image is a number of layers that can be used to instantiate a container. This could be, for example, Java and Apache Tomcat. You can find all kinds of Docker images on the public repository [Docker Hub](https://hub.docker.com/){:target="_blank"}. There are also private image repositories (for things like commercial enterprise images), such as the one Alfresco uses called [Quay](https://quay.io/){:target="_blank"}.

### Container

An instance of an image is called a container. If you start this image, you have a running container of this image. You can have many running containers of the same image.

### Docker

Docker is one of the most popular container platforms. [Docker](https://www.docker.com/){:target="_blank"} provides functionality for deploying and running applications in containers based on images.

### Docker Compose

When you have many containers making up your solution, such as with Community Edition, and you need to configure each individual container so that they all work well together, then you need a tool for this. Docker Compose is such a tool for defining and running multi-container Docker applications locally. With Compose, you use a [YAML](https://en.wikipedia.org/wiki/YAML){:target="_blank"} file to configure your application's services. Then, with a single command, you create and start all the services from your configuration.

### Dockerfile

A **Dockerfile** is a script containing a successive series of instructions, directions, and commands which are run to form a new Docker image. Each command translates to a new layer in the image, forming the end product. The Dockerfile replaces the process of doing everything manually and repeatedly. When a Dockerfile finishes building, the end result is a new image, which you can use to start a new Docker container.

### Difference between containers and virtual machines

It's important to understand the difference between using containers and using VMs. Here's a comparison from the Docker site - [What is a Container](https://www.docker.com/resources/what-container){:target="_blank"}:

![Comparison between virtual machines vs. containers]({% link content-services/images/vm-container.png %}){:width="460px" height="170px"}

The main difference is that when you run a container, you are not starting a complete new OS instance. This makes containers much more lightweight and quicker to start. A container also takes up much less space on your hard-disk as it doesn't have to ship the whole OS.

## Alfresco Docker images

The public Alfresco Docker images are available in the Docker Hub registry.

Go to [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"} to see a list of images belonging to the `alfresco` user or, alternatively, [search for alfresco](https://hub.docker.com/search?q=alfresco%2F&type=image){:target="_blank"} from the Docker Hub home page:

The following Docker images relate to Community Edition:

* `alfresco/alfresco-content-repository-community` - the repository app (i.e. `alfresco.war`) running on Apache Tomcat
* `alfresco/alfresco-share` - the Share web interface (i.e. `share.war`) running on Apache Tomcat
* `alfresco/alfresco-search-services` - the Solr 6 based search service running on Jetty
* `alfresco/alfresco-activemq` - the Alfresco ActiveMQ image
* `alfresco/alfresco-acs-nginx` - web proxy

There are also supporting features available, such as Docker images for image and document transformation:

* `alfresco/alfresco-transform-core-aio`

Community Edition provides a number of content transforms, but also allows custom transforms to be added. It's possible to create custom transforms that run in separate processes from the repository, known as Transform Engines (i.e. T-Engines). The same engines may be used in the Community and Enterprise Editions of Community Edition. They may be directly connected to the repository as Local Transforms. Note that in the Enterprise Edition, the default option is to use them as part of Alfresco Transform Service, which provides more balanced throughput and scalability improvements.

See [Custom Transforms and Renditions](https://github.com/Alfresco/acs-packaging/blob/master/docs/custom-transforms-and-renditions.md){:target="_blank"} for more.

> **Note:** The core Transform Engine images can be used in Community Edition. The open-sourced code for the Transform Engines is available in the [Alfresco/alfresco-transform-core](https://github.com/Alfresco/alfresco-transform-core){:target="_blank"} GitHub project.

To build the `alfresco/alfresco-content-repository-community` image, Alfresco uses the [Alfresco/acs-community-packaging](https://github.com/Alfresco/acs-community-packaging){:target="_blank"} GitHub project. This project doesn't include any deployment templates.

The [Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"} GitHub project contains deployment templates and instructions. It includes a Docker Compose script that's used to launch a demo, test, or PoC of Community Edition. You can customize this script, if you like, in order to run with different versions than those set by default (which are usually the latest versions).

## What's deployed in Community Edition

When you deploy Community Edition, a number of containers are started.

* Alfresco repository with:
  * Alfresco Share Services AMP
  * Alfresco Office Services (AOS) AMP
  * Alfresco vti-bin war - that helps with AOS integration
  * Alfresco Google Docs Integration repository AMP
* Alfresco Control Center
* Alfresco Share with:
  * Alfresco Google Docs Integration Share AMP
* Alfresco Search Services (Solr 6)
* A PostgreSQL database
* Alfresco Content App

### GitHub projects

Below are links to various GitHub projects that are used to deploy Community Edition, build the repository artifacts, or provide supporting services.

#### Deployment project

The deployment project contains the Docker Compose file to start up a Community Edition environment locally. You'll find the relevant files in the `docker-compose` folder. To look at the project in more detail, just browse to:

* [https://github.com/Alfresco/acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"}

If you're interested in the Helm charts to deploy Community Edition with Kubernetes, you'll find the relevant files in the `helm/alfresco-content-services` folder.

#### Packaging project

The packaging project is used to build the repository artifacts, such as the Docker image for the repository. To look at the project in more detail, just browse to:

* [https://github.com/Alfresco/acs-community-packaging](https://github.com/Alfresco/acs-community-packaging){:target="_blank"} for Community packaging

#### Other projects

Note that the Docker files for Alfresco Share, Alfresco Search Services, and other services are in their own projects:

* Alfresco Share: [https://github.com/Alfresco/share](https://github.com/Alfresco/share){:target="_blank"}
* Alfresco Search Services: [https://github.com/Alfresco/SearchServices](https://github.com/Alfresco/SearchServices){:target="_blank"}
* Alfresco Community Edition Nginx Proxy: [https://github.com/Alfresco/acs-ingress/tree/acs-community-ingress](https://github.com/Alfresco/acs-ingress/tree/acs-community-ingress){:target="_blank"}

## Prerequisites

There are a number of software requirements for installing (or deploying) Community Edition when using containerized deployment.

You can review the requirements for your chosen deployment method below.

### Helm charts

To deploy Community Edition using Helm charts, you need to install the following software:

* [AWS CLI](https://github.com/aws/aws-cli#installation){:target="_blank"} - the command line interface for Amazon Web Services.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/){:target="_blank"} - the command line tool for Kubernetes.
* [Helm](https://github.com/helm/helm#install){:target="_blank"} - the tool for installing and managing Kubernetes applications.
  * There are Helm charts that allow you to deploy Community Edition in a Kubernetes cluster, for example, on AWS.

See [Install using Helm]({% link content-services/community/install/containers/helm.md %}) for more.

### Docker Compose (recommended for evaluations only)

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, for Docker and Docker Compose, using the links provided.

See [Install using Docker Compose]({% link content-services/community/install/containers/docker-compose.md %}) for more.
