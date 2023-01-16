---
title: What's new
---

Alfresco Content Services (ACS) 7.2 is our latest software release with improvements to Content Services to accelerate 
use and development for customer solutions for PaaS, Cloud, or on-premises deployment. With this release, Alfresco 
continues to enable open-source communities, customers, and partners to deliver a highly scalable Content Store with 
numerous applications, connectivity, and solutions.

> **Note:** Alfresco customers can view more detailed Release Notes in [Hyland Community](https://community.hyland.com/){:target="_blank"}.

Here's a quick summary of what's new in the Alfresco Content Services 7.2 release.

## Highlights
* **Support for Direct Access URLs** 
* **New storage capabilities for Cloud integrations** 
* **Support for Alfresco Search Enterprise 3.1 with Elasticsearch**
  
### Direct Access URLs
Direct access URLs enable the acceleration of the local download of content to aid distributed content repositories in 
customer environments, and cloud deployments. This allows customers greater flexibility and content storage capabilities 
for highly distributed deployments. The new endpoints are highlighted in the Release Notes that you'll find 
in [Hyland Community](https://community.hyland.com/){:target="_blank"}.

See the Alfresco Content Connector for AWS S3 documentation on [Direct Access URLs]({% link aws-s3/latest/config/direct-access.md %}) 
for more details.

### New storage capabilities for Cloud integrations
Alfresco has built a new Cloud storage layer to make managing content easier for AWS and Azure customers:

* This allows content to easily be located in AWS by adding support for AWS Glacier natively in the S3 Connector to
  allow storage admins to configure their storage and retention policies as needed by their business.
* This allows content to easily be located in Azure by adding support for Azure Cool and Cold storage Blobs natively
  in the Azure Connector to allow storage admins to configure their storage and retention policies as needed by their
  business.
* Additionally, should customers use both AWS and Azure, they can store content on both.

### Search Enterprise 3.1 with Elasticsearch
Enables organizations to easily deploy, use and scale Elasticsearch with Alfresco. Alfresco has been undertaking 
performance testing on Alfresco Search Enterprise and made a number of improvements to increase scalability and 
performance benefiting those customers using Elasticsearch.

## Deprecated software
* AWS Glacier Connector (replaced with AWS S3 Connector 5.n)
* Alfresco Content Services Mobile Application

## Install
Alfresco Content Services 7.2 is available as a distribution zip file for manual installation, or it can be installed 
using an Ansible playbook (Linux only) for non-containerized environments. It's also available as a set of Docker 
images that can be deployed in containerized environments using Docker Compose or Helm charts (for Kubernetes).

See the [Install]({% link content-services/7.2/install/index.md %}) documentation for more details.

## Upgrade
Care should be taken when upgrading from any previous version of Content Services. There are steps that should be 
reviewed and planned before you upgrade. Familiarize yourself with the guidance provided and plan your upgrade carefully.

See the detailed [Upgrade]({% link content-services/7.2/upgrade/index.md %}) documentation, including the 
Content Services [upgrade paths]({% link content-services/7.2/upgrade/index.md %}#upgrade-paths).

## Alfresco Extension Inspector
An optional utility has been created to help partners and customers better understand the customizations in their 
existing deployments. The Extension Inspector is a utility for AMP inspection for Community Edition and 
Content Services 5.2.7, 6.2.2, and 7.x releases. The inspector is recommended for use before installing new versions of 
our product to help expose any issues that might impede success.

See the [Extension Inspector]({% link content-services/7.2/develop/extension-inspector.md %}) documentation for 
more details.

## Upgraded integrations
Alfresco Content Services 7.2 introduces changes that require new releases of some modules.

To upgrade to Content Services 7.2, you'll also need to update any of the module artifacts to which you're entitled.

See the [Supported Platforms]({% link content-services/7.2/support/index.md %}) for more details.

## SDK
The latest release of the [Alfresco in-process SDK]({% link content-services/7.2/develop/sdk.md %}) is SDK 4.4, which 
is compatible with this release.

The latest release of the [Alfresco out-of-process Event SDK]({% link content-services/7.2/develop/oop-sdk.md %}) is 
SDK 5.1, which is compatible with this release and the new [SDK Event Gateway]({% link content-services/7.2/develop/oop-ext-points/event-gateway.md %}).
