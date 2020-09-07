---
title: Installation overview
---

The Sync Service capability for Desktop Sync is delivered as a distribution zip file containing repository AMP file, server files for the Sync Service, and third-party license information.

You can download the Alfresco Sync Service software from the [Alfresco Support Portal](https://support.alfresco.com/){:target="_blank"}.

## Prerequisites

This section lists the environment/software prerequisites for installing and using the Sync Service.

See [Supported platforms]({% link sync-service/latest/support/index.md %}) for more.

### General requirements

* Messaging broker
  * See [Setting up ActiveMQ](https://docs.alfresco.com/6.2/tasks/activemq-install.html){:target="_blank"}(#LINK) for more information about installing ActiveMQ.

* Make sure that search indexing is [enabled](https://docs.alfresco.com/search-enterprise/concepts/search-home.html){:target="_blank"}(#LINK).

## Installation options

There are two options for installing the Sync Service:

* [Install manually using a ZIP distribution]({% link sync-service/latest/install/zip/index.md %})
* [Install using Helm charts or Docker Compose]({% link sync-service/latest/install/deploy.md %})

> **Note:** It is recommended that you familiarize yourself with the concepts of containerized deployment before working with Docker, Kubernetes, and Helm.

Instructions are also provided for [upgrading the Sync Service]({% link sync-service/latest/upgrade/index.md %}).
