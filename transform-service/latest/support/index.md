---
title: Supported Platforms
---

The following are the supported platforms and software requirements for Alfresco Transform Service 1.3:

## Alfresco Content Services

| Version | Supported | Notes |
| ------- | --------- | ----- |
| Alfresco Content Services 6.2.2 | Yes | |

## Software requirements (zip)

* Messaging broker: see [Configuring ActiveMQ](LINK)
* ImageMagick: see [Installing ImageMagick](LINK)
* LibreOffice: see [Installing LibreOffice](LINK)
* alfresco-pdf-renderer: see [Installing alfresco-pdf renderer](LINK)

See [Install Transform Service]({% link transform-service/latest/install/index.md %}#install-with-zip) for more information.

## Software requirements (Docker)

> **Note:** (Recommended for evaluations only)

* [Docker](https://docs.docker.com/install/){:target="_blank"} (latest stable version)
  * This allows you to run Docker images and `docker-compose` on a single computer.
* [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"}
  * Docker Compose is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

> **Note:** Check the prerequisites for your operating system, both for Docker and Docker Compose.

See [Install with Docker Compose]({% link transform-service/latest/install/index.md %}#install-with-docker-compose) for more information.

## Software requirements (Helm)

> **Note:** (Recommended for evaluations only)

To use the Alfresco Content Services deployment (including the Transform Service), you need to install the following software:

* [AWS CLI](https://github.com/aws/aws-cli#installation){:target="_blank"} - the command line interface for Amazon Web Services.
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/){:target="_blank"} - the command line tool for Kubernetes.
* [Helm](https://github.com/helm/helm#install){:target="_blank"} - the tool for installing and managing Kubernetes applications.
  * There are Helm charts that allow you to deploy Alfresco Content Services with Transform Service in a Kubernetes cluster, for example, on AWS.
* [Kops](https://github.com/kubernetes/kops#installing){:target="_blank"} - this helps you to manage a Kubernetes cluster.

See [Install Transform Service]({% link transform-service/latest/install/index.md %}#Installing-with-Helm-Charts-on-AWS) for more information.
