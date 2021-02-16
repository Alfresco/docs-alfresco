---
title: Administer Transform Service
---

The following section describes the Transform Service components, and also explain the flow of information between the repository and these components during the transformation process.

## Transform Service components

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
* **Shared File Store**: This is used as temporary storage for the original source file (stored by the repository), intermediate files for multi-step transforms, and the final transformed target file. The target file is retrieved by the repository after it's been processed by one or more of the Transform Engines.

The following diagram shows a simple representation of the Transform Service components:

![Docker Compose Deployment Overview]({% link transform-service/images/simple-arch.png %})

This shows an example implementation of how you can deploy into AWS, using a number of managed services:

* Amazon EKS - Elastic Container Service for Kubernetes
* Amazon MQ - Managed message broker service for [Apache ActiveMQ](https://activemq.apache.org/){:target="_blank"}
* Amazon EFS - Amazon Elastic File System

You can replace the AWS services (EKS, MQ, and EFS) with a self-managed Kubernetes cluster, ActiveMQ (configured with failover), and a shared file store, such as NFS.

> **Note:** For more detailed representations of the Alfresco Content Services deployment (including the Transform Service), see the GitHub [Docker Compose](https://github.com/Alfresco/acs-deployment/tree/master/docs/docker-compose){:target="_blank"} and [Helm](https://github.com/Alfresco/acs-deployment/tree/master/docs/helm){:target="_blank"} documentation.

The advantage of using Docker containers is that they provide a consistent environment for development and production. They allow applications to run using microservice architecture. This means you can upgrade an individual service with limited impact on other services.

## Docker images overview

Some of the Docker images that are used by the Transform Service are uploaded to a private registry, **Quay.io**. Enterprise customers can contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"} to request Quay.io account credentials to pull the private (Enterprise-only) Docker images:

* `quay.io/alfresco-transform-router`
* `quay.io/alfresco-pdf-renderer`
* `quay.io/alfresco-imagemagick`
* `quay.io/alfresco-libreoffice`
* `quay.io/alfresco-tika`
* `alfresco/alfresco-shared-file-store` (from Docker Hub)

For information about deploying the Transform Service, see [Install Transform Service]({% link transform-service/1.0/install/index.md %}).

## Troubleshoot Transform Services

Use this information to help monitor and troubleshoot the Transform Service.

### How do I monitor the Transform Engines (e.g. LibreOffice) and the Transform Router

There are two options for monitoring each component:

* View the logs via the Kubernetes dashboard.
* Access the `/metrics` and the `/prometheus` endpoint, which expose information about the running processes.

### What do I do if LibreOffice hangs

If LibreOffice hangs, the health endpoint will fail to respond, and the container/pod will automatically reboot. This applies to all four Docker transformers. The Content Services Helm deployment uses two replicas for each component of the Transform Service by default (except for the shared file store) in order to provide scalability and fault tolerance.

### What debug logging is available for the Transform Service

All the key operations are logged, as well as the different entry and exit points for all kind of processes and actions.

### What do I do if Tika runs out of memory

Similar to LibreOffice, the Tika container/pod should automatically restart since OOM is an error. If the automatic restart fails, the pods can be restarted from the Kubernetes dashboard.

### How do I monitor ActiveMQ / Amazon MQ

* Access the ActiveMQ Admin Console (Web Console) at `<amazon-mq-host>`.
* The micrometer implementation also monitors the size of the queue.

### Are any metrics sent to/via HeartBeat

No. HeartBeat hasn't been integrated yet.

### Where are the temporary files located for individual and multi-step transforms

The individual transform, or Transform Engine, cleans up its own temporary files within the running container. For multi-step transforms, the intermediate files will eventually be cleaned up by the Shared File Store.

### Is any monitoring/metrics system available

Yes:

* All the Transform Service components use micrometer.
* The Prometheus service that's deployed ingests data from the Transform Router.

### If a transform fails when uploading a complex XLSX document, what happens

The Transform Service will attempt to retry the transform a few times (this is configurable). Otherwise, a failed transform is returned to the repository, so no preview or thumbnail will be available. The repository will no longer retry.

### Can you share the Transform Service with multiple repositories

This initial release will only support a single Content Services 6.1 repository instance. For example, if you have two or more separate Content 6.1 Services deployments (whether clustered or not), then each one will need to its own Transform Service 1.0 instance.
