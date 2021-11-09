---
title: Install Process Services
nav: false
---

There are several options for installing Process Services and its associated applications.

The applications available to deploy are:

* Process Services
* Process Services Administrator
* Process Workspace

The following methods are available to deploy Process Services:

* [Install with setup Wizards]({% link process-services/2.0/install/manual.md %}#install-using-setup-wizards)
* [Install manually]({% link process-services/2.0/install/manual.md %}#install-manually)
* [Install using containers]({% link process-services/2.0/install/container.md %})

## Container concepts

Installing Process Services using containers introduces a number of concepts.

You can start Process Services from a number of Docker images. These images are available in the repositories [Docker Hub](https://hub.docker.com){:target="_blank"} and [Quay](https://quay.io/){:target="_blank"}. However, starting individual Docker containers based on these images, and configuring them to work together might not be the most productive way to get up and running.

There are **Helm charts** available to deploy Process Services in a Kubernetes cluster, for example, on Amazon Web Services (AWS). These charts are a deployment template which can be used as the basis for your specific deployment needs. The Helm charts are undergoing continual development and improvement and should not be used "as-is" for a production deployment, but should help you save time and effort deploying Process Services for your organization.

The following is a list of concepts and technologies that you'll need to understand as part of installing Process Services using containers. If you know all about Docker, then you can skip this part.

### Virtual Machine Monitor (Hypervisor)

A Hypervisor is used to run other OS instances on your local host machine. Typically it's used to run a different OS on your machine, such as Windows on a Mac. When you run another OS on your host it is called a guest OS, and it runs in a Virtual Machine (VM).

### Image

An image is a number of layers that can be used to instantiate a container. This could be, for example, Java and Apache Tomcat. You can find all kinds of Docker images on the public repository [Docker Hub](https://hub.docker.com/){:target="_blank"}. There are also private image repositories (for things like commercial enterprise images), such as the one Alfresco uses called [Quay](https://quay.io/){:target="_blank"}.

### Container

An instance of an image is called a container. If you start this image, you have a running container of this image. You can have many running containers of the same image.

### Docker

Docker is one of the most popular container platforms. [Docker](https://www.docker.com/){:target="_blank"} provides functionality for deploying and running applications in containers based on images.

### Dockerfile

A **Dockerfile** is a script containing a successive series of instructions, directions, and commands which are run to form a new Docker image. Each command translates to a new layer in the image, forming the end product. The Dockerfile replaces the process of doing everything manually and repeatedly. When a Dockerfile finishes building, the end result is a new image, which you can use to start a new Docker container.

### Difference between containers and virtual machines

It's important to understand the difference between using containers and using VMs. Here's a picture from [What is a Container - Docker](https://www.docker.com/what-container){:target="_blank"}:

![vm-vs-container]({% link process-services/images/vm-vs-container.png %})

The main difference is that when you run a container, you are not starting a complete new OS instance. This makes containers much more lightweight and quicker to start. A container also takes up much less space on your
hard-disk as it doesn't have to ship the whole OS.
