---
title: Alfresco Transform Service
---

The Alfresco Transform Service provides a secure, scalable, reliable, and extensible mechanism for converting files from their current format into other formats.

Transform Service provides a single all-in-one Transform Core Engine (T-Engine) that performs all the core transforms. This replaces the five separate T-Engines for all but the largest deployments, where it's still advisable to separate out the different types of transforms into their own images. Note that the all-in-one T-Engine is the default option for the Docker Compose deployment and installation using the distribution zip, however Helm deployments continue to use the five separate T-Engines in order to provide balanced throughput and scalability improvements. This release also provides two main options for deployment: using containerized deployment or using the distribution zip.

The key capabilities of the Transform Service include the ability to:

* Scale the transformation capabilities independently of the content repository.
* Make use of the exposed transformation capabilities for all subsystems of the repository.
* Provide a greater level of reliability and fault tolerance by using persistent queues.
* Develop custom (i.e. out of process) transformers to enable the migration of any existing transform customizations.

> **Important:** The Transform Service is deployed as part of the Alfresco Content Services deployment for containerized deployments only. See [What's deployed in Alfresco Content Services](link) for the list of components.

> **Important:** If you're installing Alfresco Content Services using the distribution zip, you can install the Transform Service using an additional distribution zip.

The following sections describe the Transform Service components, and also explain the flow of information between the repository and these components during the transformation process.

## Components of the Transform Service

The Transform Service handles the essential transforms, such as Microsoft Office documents, images, and PDFs. These include PNG for thumbnails, PDF and JPEG for downloads and previews.

The main components of the Transform Service are:

* **Content Repository (ACS)**: This is the repository where documents and other content resides. The repository produces and consumes events destined for the message broker (such as ActiveMQ or Amazon MQ). It also reads and writes documents to the shared file store.
* **ActiveMQ**: This is the message broker (either a self-managed ActiveMQ instance or Amazon MQ), where the repository and the Transform Router send image transform requests and responses. These JSON-based messages are then passed to the Transform Router.
* **Transform Router**: The Transform Router allows simple (single-step) and pipeline (multi-step) transforms that are passed to the Transform Engines. The Transform Router (and the Transform Engines) run as independently scalable Docker containers.
* **Transform Engines**: The Transform Engines transform files referenced by the repository and retrieved from the shared file store. Here are some example transformations for each Transform Engine (this is not an exhaustive list):
  * LibreOffice (e.g. docx to pdf)
    * ImageMagick (e.g. resize)
    * Alfresco PDF Renderer (e.g. pdf to png)
    * Tika (e.g. docx to plain text)
    * Misc. (not included in diagram)
* **Shared File Store**: This is used as temporary storage for the original source file (stored by the repository), intermediate files for multi-step transforms, and the final transformed target file. The target file is retrieved by the repository after it's been processed by one or more of the Transform Engines.

The following diagram shows a simple representation of the Transform Service components:

![Docker Compose Deployment Overview]({% link transform-service/images/simple-arch.png %})

This shows an example implementation of how you can deploy into AWS, using a number of managed services:

* Amazon EKS - Elastic Container Service for Kubernetes
* Amazon MQ - Managed message broker service for [Apache ActiveMQ](http://activemq.apache.org/){:target="_blank"}
* Amazon EFS - Amazon Elastic File System

You can replace the AWS services (EKS, MQ, and EFS) with a self-managed Kubernetes cluster, ActiveMQ (configured with failover), and a shared file store, such as NFS.

> **Note:** For more detailed representations of the Alfresco Content Services deployment (including the Transform Service), see the GitHub [Docker Compose](https://github.com/Alfresco/acs-deployment/blob/master/docs/docker-compose-deployment.md#structure) and [Helm](https://github.com/Alfresco/acs-deployment/tree/master/helm/alfresco-content-services#structure){:target="_blank"} documentation.

The advantage of using Docker containers is that they provide a consistent environment for development and production. They allow applications to run using microservice architecture. This means you can upgrade an individual service with limited impact on other services.

## Deployment overview

Some of the Docker images that are used by the Transform Service are uploaded to a private registry, **Quay.io**. Enterprise customers can contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"} to request Quay.io account credentials to pull the private (Enterprise-only) Docker images:

* `alfresco/alfresco-transform-router`

The other images are available in DockerHub:

* `alfresco/alfresco-pdf-renderer`
* `alfresco/alfresco-imagemagick`
* `alfresco/alfresco-libreoffice`
* `alfresco/alfresco-tika`
* `alfresco/alfresco-shared-file-store`
* `alfresco/alfresco-transform-misc`

For information about deploying and configuring the Transform Service, see [Install Transform Service]({% link transform-service/latest/install/index.md %}).
