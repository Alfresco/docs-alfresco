---
title: Install Transform Service
---
This release provides two main options for deployment: using the distribution zip, or using containerized deployment (as in previous Transform Service releases).

The Transform Service zip can be applied when installing Alfresco Content Services using the distribution zip.

The Transform Service is also deployed as part of the Alfresco Content Services containerized deployment, using Docker images that are packaged in Helm charts. These charts are a deployment template which can be used as the basis for your specific deployment needs.

> **Important:** The deployment of the Transform Service with Alfresco Content Services on AWS, such as Amazon EKS (Elastic Kubernetes Service), is only recommended for customers with a good knowledge of Alfresco Content Services, and strong competencies in AWS and containerized deployment.

The following diagram shows how Alfresco Content Services and the components of the Transform Service interact when deployed using Docker Compose.

![Docker Compose Deployment Overview]({% link transform-service/images/docker-compose-components.png %})

The following diagram shows how Alfresco Content Services and the components of the Transform Service interact when deployed using Helm charts.

![ACS Helm Deployment Overview]({% link transform-service/images/helm-components.png %})

## Prerequisites for using Transform Service

There are a number of software requirements for deploying Transform Service.

The Transform Service is only deployed as part of Alfresco Content Services for containerized deployments.

However, this is not the case if you're installing Alfresco Content Services using the distribution zip. Review the requirements below for your chosen deployment method.

## Containerized deployments

The images downloaded directly from [Docker Hub](https://hub.docker.com/u/alfresco/){:target="_blank"}, or [Quay.io](https://quay.io/){:target="_blank"} are for a limited trial of the Enterprise version of Alfresco Content Services that goes into read-only mode after 2 days. For a longer (30-day) trial, get the Alfresco Content Services [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

> **Note:** A [Quay.io](https://quay.io/) account is needed to pull the Docker images that are needed for the Transform Service.

* `alfresco/alfresco-transform-router`

The other images are available in DockerHub:

* `alfresco/alfresco-pdf-renderer`
* `alfresco/alfresco-imagemagick`
* `alfresco/alfresco-libreoffice`
* `alfresco/alfresco-tika`
* `alfresco/alfresco-transform-misc`
* `alfresco/alfresco-shared-file-store`
* `alfresco/alfresco-transform-core-aio`

### Requirements for using Helm Charts**

To use the Alfresco Content Services deployment (including the Transform Service), you need to install the following software:

* [AWS CLI](https://github.com/aws/aws-cli#installation){:target="_blank"} - the command line interface for Amazon Web Services.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/){:target="_blank"} - the command line tool for Kubernetes.
* [Helm](https://github.com/helm/helm#install){:target="_blank"} - the tool for installing and managing Kubernetes applications.
  * There are Helm charts that allow you to deploy Alfresco Content Services with Transform Service in a Kubernetes cluster, for example, on AWS.
* [Kops](https://github.com/kubernetes/kops#installing){:target="_blank"} - this helps you to manage a Kubernetes cluster.

See [Install Containerized]({% link transform-service/latest/install/containerized.md %})for more. 

### Requirements for using Docker Compose (recommended for evaluations only)

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose, using the links provided.

See [Install Docker Compose]({% link transform-service/latest/install/containerized.md %})for more. 

## Non-containerized deployment

### Requirements for using the distribution zip

Before you can use the Transform Service zip, you need to install the following software requirements.

Follow the linked pages in the Alfresco Content Services documentation, starting from [Installing using distribution zip](https://docs.alfresco.com/6.2/concepts/ch-install.html){:target="_blank"}. See [Supported Platforms](https://docs.alfresco.com/6.2/concepts/supported-platforms-ACS.html){:target="_blank"} for the supported versions of each component:

* Alfresco Content Services 6.2.2 or later
* Messaging broker: see [Configuring ActiveMQ](LINK)
* ImageMagick: see [Installing ImageMagick](LINK)
* LibreOffice: see [Installing LibreOffice](LINK)
* alfresco-pdf-renderer: see [Installing alfresco-pdf renderer](LINK)

See See [Install with Zip]({% link transform-service/latest/install/zip.md %})for more.
