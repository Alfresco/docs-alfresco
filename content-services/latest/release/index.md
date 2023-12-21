---
title: What's new
---

Alfresco Content Services (ACS) 23.1 is a major release with improvements to Content Services to accelerate use and development for customer solutions for PaaS, Cloud, or on-premises deployment. With this release, Alfresco continues to enable open-source communities, customers, and partners to deliver a highly scalable Content Store with numerous applications, connectivity, and solutions.

With this release, Alfresco Content Services and Alfresco Governance Services switch to the standard Hyland version naming convention of year and version number (`YY.#`). The scheme is explained in the [New product version naming convention](https://community.hyland.com/blog/posts/82512-new-product-version-naming-convention){:target="_blank"} blog post on Hyland Community.

> **Note:** Alfresco customers can view more detailed Release Notes in [Hyland Community](https://community.hyland.com/customer-portal/downloads/alfresco){:target="_blank"}.

Here's a quick summary of what's new in the Alfresco Content Services 23.1 release.

## Highlights

* **Toggle for more reliable events**
* **Clean-up job for IP-addresses of dead cluster nodes**
* **Support for external Hazelcast cluster management**
* **ARM64 containers for developers**
* **Modularized Helm charts**
* **Jakarta EE 10 and Spring 6 support**
* **Tomcat 10 support**
  
### Toggle for more reliable events

A toggle has been introduced to increase the reliability of events on the event queue. If the toggle is set, events are sent right after the database transaction closes, rather than through a separate thread. This increases the chance the events are correctly delivered to the queue, at a small performance cost. Default, this toggle is off, giving the old behavior.

### Clean-up job for IP-addresses of dead cluster nodes

A new background task has been introduced that purges IP addresses of cluster nodes that have been decommissioned from the database. This means other cluster nodes will stop trying to connect to these ‘dead’ nodes, improving the efficiency of the cluster.

This makes it easier to manage auto-scaling clusters, where new nodes are spun up under high load, and brought down when the load decreases.

See [Scheduled Jobs Extension Point]({% link content-services/latest/develop/repo-ext-points/scheduled-jobs.md %}#out-of-the-box-scheduled-jobs-definitions) documentation for more details.

### Support for external Hazelcast cluster management

Alfresco uses Hazelcast for its clustering management, and it includes cluster management. It is now possible to set up Hazelcast management external to Alfresco and let it manage the Alfresco nodes.

See [Set up repository clustering via external Hazelcast]({% link content-services/latest/admin/cluster.md %}#set-up-repository-clustering-via-external-hazelcast) documentation for more details.

### ARM64 containers for developers

Our developer experience is strongly built on Docker containers. Containers for the ARM64 architecture are now available on Docker Hub, allowing developers using hardware with ARM64 chips (such as Apple's M1/M2 chips) to use a containerized Alfresco without any extra steps.

### Modularized Helm charts

The Helm charts have been broken up into multiple, separate charts. This allows for more customization in deployments, where only part of the configuration can be easily adapted without affecting other parts.

### Jakarta EE 10 and Spring 6 support

As part of the Jakarta migration, Alfresco Content Services is using now Spring 6 and Jakarta EE 10 instead of `javax`.

### Tomcat 10 support

Alfresco now requires Tomcat 10. Earlier versions of Alfresco supported Tomcat 9. Tomcat 10 is not backwards compatible with Tomcat 9, so changes in existing deployments are required to move to Tomcat 10 and upgrade to Alfresco 23.1.

## Install

Alfresco Content Services 23.1 is available as a distribution zip file for manual installation, or it can be installed using an Ansible playbook (Linux only) for non-containerized environments. It's also available as a set of Docker images that can be deployed in containerized environments using Docker Compose or Helm charts (for Kubernetes).

See the [Install]({% link content-services/latest/install/index.md %}) documentation for more details.

## Upgrade

Care should be taken when upgrading from any previous version of Content Services. There are steps that should be reviewed and planned before you upgrade. Familiarize yourself with the guidance provided and plan your upgrade carefully.

See the detailed [Upgrade]({% link content-services/latest/upgrade/index.md %}) documentation, including the Content Services [upgrade paths]({% link content-services/latest/upgrade/index.md %}#upgrade-paths).

## Upgraded integrations

Alfresco Content Services 23.1 introduces changes that require new releases of some modules.

To upgrade to Content Services 23.1, you'll also need to update any of the module artifacts to which you're entitled.

See the [Supported Platforms]({% link content-services/latest/support/index.md %}) for more details.
