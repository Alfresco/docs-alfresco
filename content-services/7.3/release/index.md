---
title: What's new
---

Alfresco Content Services (ACS) 7.3 is a minor software update release with improvements to Content Services to accelerate use and development for customer solutions for PaaS, Cloud, or on-premises deployment. With this release, Alfresco continues to enable open-source communities, customers, and partners to deliver a highly scalable Content Store with numerous applications, connectivity, and solutions.

> **Note:** Alfresco customers can view more detailed Release Notes in [Hyland Community](https://community.hyland.com/){:target="_blank"}.

Here's a quick summary of what's new in the Alfresco Content Services 7.3 release.

## Highlights

* **Java 17 support**
* **Support for Alfresco Search Enterprise 3.2 with Elasticsearch and OpenSearch**
* **New license**
* **Activiti Console removal**
* **Changes in JavaScript execution configuration**
  
### Java 17 support

Alfresco Content Services 7.3 now supports running on Java 17. See the Supported Platforms page for all supported technologies.

### Support for Alfresco Search Enterprise 3.2 with Elasticsearch and OpenSearch

Enables organizations to easily deploy, use and scale Elasticsearch or OpenSearch with Alfresco. Content Services 7.3 builds on 7.2 and further extends support to Elasticsearch and OpenSearch.

### New license

Since September 1st 2017, the Alfresco EULA forbids adding workflows to the workflow engine embedded in Alfresco Content Services. With the release of version 7.3, this will be enforced through a check on a flag in the license file.

Customers who bought Alfresco Content Services before September 1st 2017 will retain the ability to add and modify workflows for the embedded workflow engine.

Customers who bought Alfresco Content Services on or after September 1st 2017 will not be able to add workflows. They will only be able to change workflows with the following IDs: `activitiReview`, `activitiInvitationNominated`, `activitiReviewPooled`, `activitiParallelReview`, `activitiAdhoc`, `activitiParallelGroupReview`, `activitiInvitationModerated`, `activitiInvitationNominatedAddDirect`, `resetPassword` or `companyRFC`.

### Activiti Console removal

As part of the gradual decommissioning of the embedded workflow engine, the embedded Activiti Workflow Console has been removed from Alfresco Content Services.

### Changes in JavaScript execution configuration

In the Alfresco Content Services 7.3.0.1 release, configuration options were introduced to control the execution of JavaScript by the repository. With the release of Service Pack 7.3.1, these configuration options have changed.

See the [JavaScript execution]({% link content-services/7.3/config/repository.md %}#javascript-execution) section for the new configuration options.

## Deprecated software

We are ending support for the Alfresco SAML SSO module, previously used to configure SAML authentication in Alfresco Office Service (AOS). Coherently with other components in Alfresco, the new solution is now based on an Identity Service (IDS) via OAuth2 that will greatly improve the customer SSO experience. Configuring SAML will still be possible but as part of identity provider configuration.

## Install

Alfresco Content Services 7.3 is available as a distribution zip file for manual installation, or it can be installed using an Ansible playbook (Linux only) for non-containerized environments. It's also available as a set of Docker images that can be deployed in containerized environments using Docker Compose or Helm charts (for Kubernetes).

See the [Install]({% link content-services/7.3/install/index.md %}) documentation for more details.

### Azure and Glacier Connector Customers

ACS 7.3.0 will be released with optional connectors:

* S3 Connector 5.1.0
* Azure Connector 3.1.0

**Note:** For customers who had previously used the “Archive” action in a folder rule to move content into Glacier this is no longer supported. Customers wishing to continue using this functionality should not upgrade to 7.3. The S3 REST api provides support for moving content to Glacier or content can be manually moved to Glacier via the AWS S3 tools.

## Upgrade

Care should be taken when upgrading from any previous version of Content Services. There are steps that should be reviewed and planned before you upgrade. Familiarize yourself with the guidance provided and plan your upgrade carefully.

See the detailed [Upgrade]({% link content-services/7.3/upgrade/index.md %}) documentation, including the Content Services [upgrade paths]({% link content-services/7.3/upgrade/index.md %}#upgrade-paths).

## Upgraded integrations

Alfresco Content Services 7.3 introduces changes that require new releases of some modules.

To upgrade to Content Services 7.3, you'll also need to update any of the module artifacts to which you're entitled.

See the [Supported Platforms]({% link content-services/7.3/support/index.md %}) for more details.

## SDK

The latest release of the [Alfresco in-process SDK]({% link content-services/7.3/develop/sdk.md %}) is SDK 4.5, which is compatible with this release.

The latest release of the [Alfresco out-of-process Event SDK]({% link content-services/7.3/develop/oop-sdk.md %}) is SDK 5.2, which is compatible with this release and the new [SDK Event Gateway]({% link content-services/7.3/develop/oop-ext-points/event-gateway.md %}).
