---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enterprise to Cloud Sync overview

Enterprise to Cloud Sync allows you to select content that is automatically synchronized between on-premise Alfresco and a network on Alfresco in the Cloud.

The Enterprise to Cloud Sync capabilities include:

-   Synchronization of individual and multiple files, folders, and folder hierarchies between on-premise and Alfresco in the Cloud
-   Content and common metadata is included within synchronized payloads
-   Automatic synchronization
-   Secure exchange of information over HTTPS connection
-   All actions initiated on the on-premise Alfresco instance
-   Choice over what can be synchronized to ensure sensitive content remains on-premise

The following diagram shows the synchronization flow for Enterprise to Cloud Sync.

![](../images/cloud-sync-arch-overview.png)

Content is automatically synchronized between on-premise Alfresco repositories and the cloud instance. This ensures that the on-premise system is in sync with any changes. 

Other Alfresco in the Cloud users can access the content within the same network. Alfresco in the cloud users can also send invitations to other cloud users to join their network and share the synchronized content.

-   **[Supported Use Cases for Enterprise to Cloud Sync](../concepts/cloud-sync-supported-use-cases.md)**  
Enterprise to Cloud Sync enables simple synchronization of content between an on-premise repository and an associated network in Alfresco in the cloud \(hosted at https://my.alfresco.com\). In this way, selected content can be shared across corporate firewalls so that it can be accessed by users external to an organization, and teams can collaborate across corporate boundaries without giving external users access to internal systems. After the need for collaboration has passed, the synchronization can be deleted and the content will be removed from Alfresco in the cloud but will remain archived in the on-premise repository.

**Parent topic:**[Setting up Enterprise to Cloud Sync](../concepts/cloud-sync-intro.md)

