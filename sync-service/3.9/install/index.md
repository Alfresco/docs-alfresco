---
title: Installation overview
---

The Sync Service capability for Desktop Sync is delivered as a distribution zip file containing a repository AMP file, server files for the Sync Service, and third-party license information.

You can download the Alfresco Sync Service software from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

## Prerequisites

This section lists the environment/software prerequisites for installing and using the Sync Service.

See [Supported platforms]({% link sync-service/latest/support/index.md %}) for more.

### General requirements

* Messaging broker
  * See [Setting up ActiveMQ]({% link content-services/latest/config/activemq.md %}) for more information about installing ActiveMQ.

* Make sure that search indexing is [enabled]({% link search-services/latest/index.md %}).

## Installation options

There are several [options]({% link sync-service/latest/install/options.md %}) for installing the Sync Service:

* Install manually using a distribution ZIP
* Install using Helm charts or Docker Compose
