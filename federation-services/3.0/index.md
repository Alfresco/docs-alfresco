---
title: Alfresco Federation Services
---

Alfresco Federation Services is an add-on module that provides a powerful and easy way to search and manage content federated from leading business systems and content management applications. Manage in place functionality allows you to access, control, and govern content residing in more than sixty different business and content repository types. This provides a single view of information across different content systems, by synchronizing content into Alfresco Content Services.

By connecting information from different systems, you can provide a single view of information stored across multiple repositories.

Here is a summary of the key capabilities:

* Federated search - content can be searched for across multiple content repositories and made accessible inside Alfresco Content Services. This means it doesn't need to be migrated from different content systems.
* Manage content in place - all content can be controlled, no matter where it's stored.
* Intelligent content migration - enables content migration to be completed in the background, with minimal disruption to your end users.

Alfresco Federation Services ensures that customers are able to:

* Federate and manage content or records in other repositories
* Apply Alfresco Governance Services to content that's stored in other content systems (using the manage in place functionality)
* Support enterprise-wide eDiscovery cases in order to allow legal holds across the enterprise

The following diagram shows a simple representation of how Alfresco Content Services and Alfresco Federation Services interact with different content systems.

![Simple architecture diagram for Federation Services]({% link federation-services/images/simple-architecture-3.0.png %}){:height="300px" width="615px"}

Alfresco Federation Services can integrate any two endpoints in systems such as:

* CMS (Alfresco Content Services, Documentum, SharePoint, etc.)
* Network file systems

See the [Alfresco Federation Services summary and demo](https://www.alfresco.com/information-governance/content-federation-and-manage-place){:target="_blank"} to learn more.

## Terminology

Here's some useful terminology from the Federation Services documentation.

|Term|Description|
|----|-----------|
|Auth Connector|This allows you to authenticate against a repository.|
|Repository Connector|This is a connector to a repository for getting content, metadata, versions, and renditions.|
|Output Connector|This is a connector to the output system you want to migrate or index to. to.|
|Content Service Connector|This connector allows you to attach a system to the Objective 3Sixty Content Services API for Federation.|
|Discovery Connector|This connector is used to get schema information from a system.|
|Job|A job is a basic construct used to specify the repository and output used in a migration or index. This is how you connect two systems together with Federation Services.|
|Mapping|Provides metadata mapping between types/aspects from a source system to an output system. These can be used in a job and in a content services connector.|
|Tasks|Provides a processing pipeline that allows you to process documents, metadata, versions, and renditions as part of a job.|
|TCS|Transparent Content Services (for managing content in-place)|
|TSearch|This component provides federated search capabilities|
