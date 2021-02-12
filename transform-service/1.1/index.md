---
title: Alfresco Transform Service
---

The Transform Service provides a secure, scalable, reliable, and extensible mechanism for converting files from their current format into other formats. The functional capabilities are similar to those provided inside the repository, with a few key differences.

The key capabilities of the Transform Service include the ability to:

* Scale the transformation capabilities independently of the content repository.
* Make use of the exposed transformation capabilities for all subsystems of the repository.
* Provide a greater level of reliability and fault tolerance by using persistent queues.
* Develop custom (i.e. out of process) transformers to enable the migration of any existing transform customizations.

**Important:** The Transform Service is deployed as part of the Alfresco Content Services deployment. See [What's deployed in Content Services]({% link content-services/latest/config/subsystems.md %}#whats-deployed-in-content-services) for the list of components.

**Important:** The Transform Service is only available with containerized deployments, and not when Alfresco Content Services is installed using a distribution zip.

The following sections describe the Transform Service components, and also explain the flow of information between the repository and these components during the transformation process.
