---
title: What's new
---

Alfresco Content Services (ACS) 7.1 is our latest software release with improvements to Content Services to accelerate use and development for customer solutions for PaaS, Cloud, or on-premises deployment. With this release, Alfresco continues to enable open-source communities, customers, and partners to deliver a highly scalable Content Store with numerous applications, connectivity, and solutions.

> **Note:** Alfresco customers can view more detailed Release Notes in the [Support Portal](https://support.alfresco.com/){:target="_blank"}.

Here's a quick summary of what's new in the Alfresco Content Services 7.1 release.

## Highlights

* Secure SDK events gateway for event management.
* Support for Alfresco Search Enterprise 3.0 with Elasticsearch.
* Support for Direct Access URLs.

### Alfresco Event Gateway

The Alfresco Event Gateway provides the following features:

* Secure and resilient way to consume events from Content Services.
* Users can create multiple subscriptions using different ActiveMQ instances and event filters.

See the [Event Gateway]({% link content-services/latest/develop/oop-ext-points/event-gateway.md %}) documentation for more details.

### Alfresco Search Enterprise 3.0 with Elasticsearch

Alfresco Search Enterprise 3.0 with Elasticsearch enables organizations to easily deploy, use, and scale Elasticsearch with Alfresco. Customers can continue to use Solr based search or upgrade to Elasticsearch. Customers cannot use both search versions simultaneously.

See the [Alfresco Search Enterprise]({% link search-enterprise/latest/index.md %}) documentation for more details.

### Direct Access URLs

Direct access URLs enable the acceleration of the local download of content to aid distributed content repositories in customer environments, and cloud deployments. The new endpoints are highlighted in the Release Notes that you'll find in the [Support Portal](https://support.alfresco.com/){:target="_blank"}.

See the Alfresco Content Connector for AWS S3 documentation on [Direct Access URLs]({% link aws-s3/latest/config/direct-access.md %}) for more details.

## Install

Alfresco Content Services 7.1 is available as a distribution zip file for manual installation, or it can be installed using an Ansible playbook (Linux only) for non-containerized environments. It's also available as a set of Docker images that can be deployed in containerized environments using Docker Compose or Helm charts (for Kubernetes).

See the [Install]({% link content-services/latest/install/index.md %}) documentation for more details.

## Upgrade

Care should be taken when upgrading from any previous version of Content Services. There are steps that should be reviewed and planned before you upgrade. Familiarize yourself with the guidance provided and plan your upgrade carefully.

See the detailed [Upgrade]({% link content-services/latest/upgrade/index.md %}) documentation, including the Content Services [upgrade paths]({% link content-services/latest/upgrade/index.md %}#upgrade-paths).

## Alfresco Extension Inspector

An optional utility has been created to help partners and customers better understand the customizations in their existing deployments. The Extension Inspector is a utility for AMP inspection for Community Edition and Content Services 5.2.7, 6.2.2, and 7.x releases. The inspector is recommended for use before installing new versions of our product to help expose any issues that might impede success.

See the [Extension Inspector]({% link content-services/latest/develop/extension-inspector.md %}) documentation for more details.

## Upgraded integrations

Alfresco Content Services 7.1 introduces changes that require new releases of some modules.

To upgrade to Content Services 7.1, you'll also need to update any of the module artifacts to which you're entitled.

See the [Supported Platforms]({% link content-services/latest/support/index.md %}) for more details.

## SDK

The latest release of the [Alfresco in-process SDK]({% link content-services/latest/develop/sdk.md %}) is SDK 4.3, which is compatible with this release.

The latest release of the [Alfresco out-of-process Event SDK]({% link content-services/latest/develop/oop-sdk.md %}) is SDK 5.1, which is compatible with this release and the new [SDK Event Gateway]({% link content-services/latest/develop/oop-ext-points/event-gateway.md %}).
