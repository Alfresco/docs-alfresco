---
title: What's new
---

Alfresco Content Services (ACS) 7.4 is a minor software update release with improvements to Content Services to accelerate use and development for customer solutions for PaaS, Cloud, or on-premises deployment. With this release, Alfresco continues to enable open-source communities, customers, and partners to deliver a highly scalable Content Store with numerous applications, connectivity, and solutions.

> **Note:** Alfresco customers can view more detailed Release Notes in [Hyland Community](https://community.hyland.com/){:target="_blank"}.

Here's a quick summary of what's new in the Alfresco Content Services 7.4 release.

## Highlights

* **Change in Logging library**
* **Keycloack client adapter replaced with Spring security**
* **Zero trust principle for communications with the Transform Service**
* **Images generated from ACS Packaging are now Multi-Architecture**
  
### Change in Logging library

Starting from ACS 7.4, log4jv2 will be the library used for logging capabilities. Please refer to the [Log4j2 Migration Guide]({% link content-services/7.4/upgrade/log4j2-migrate.md %}) to migrate your current logging configuration from version 1. If you built custom extensions relying on the Slf4j abstraction, no changes will be needed. If you have a direct dependency on log4jv1 instead, please take into consideration updating them.

### Keycloack client adapter replaced with Spring security

Following the deprecation from the Keycloak team, Alfresco Content Services is no longer using the Keycloak client adapter and will rely on Spring Security instead.

### Zero trust principle for communications with the Transform Service

Communications between Alfresco Content Services and Alfresco Transform Service can now be secured through mutual TLS. Instructions on how to configure this can be found in the documentation.

See the [Mutual TLS]({% link content-services/7.4/config/mtls.md %}) documentation for more details.

### Images generated from ACS Packaging are now Multi-Architecture

Images from ACS Packaging are now available as multi-architecture (AMD64 + ARM64), with more to come.

## Deprecated software

Alfresco Content Services is no longer using the Keycloak client adapter and will rely on Spring Security instead.

## Install

Alfresco Content Services 7.4 is available as a distribution zip file for manual installation, or it can be installed using an Ansible playbook (Linux only) for non-containerized environments. It's also available as a set of Docker images that can be deployed in containerized environments using Docker Compose or Helm charts (for Kubernetes).

See the [Install]({% link content-services/7.4/install/index.md %}) documentation for more details.

## Upgrade

Care should be taken when upgrading from any previous version of Content Services. There are steps that should be reviewed and planned before you upgrade. Familiarize yourself with the guidance provided and plan your upgrade carefully.

See the detailed [Upgrade]({% link content-services/7.4/upgrade/index.md %}) documentation, including the Content Services [upgrade paths]({% link content-services/7.4/upgrade/index.md %}#upgrade-paths).

## Upgraded integrations

Alfresco Content Services 7.4 introduces changes that require new releases of some modules.

To upgrade to Content Services 7.4, you'll also need to update any of the module artifacts to which you're entitled.

See the [Supported Platforms]({% link content-services/7.4/support/index.md %}) for more details.
