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

> **Important:** The Transform Service is deployed as part of the Alfresco Content Services deployment for containerized deployments only. See [What's deployed in Alfresco Content Services]({% link content-services/latest/install/containers/index.md %}#whats-deployed-in-content-services) for the list of components.

> **Important:** If you're installing Alfresco Content Services using the distribution zip, you can install the Transform Service using an additional distribution zip.
