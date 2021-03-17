---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Content auditing

This section describes how to use Alfresco to audit actions performed on your content and folders, including a technical overview, and also examples of how to customize the standard configuration.

-   **[Content auditing technical overview](../concepts/audit-content-techdesc.md)**  
 The data producer `org.alfresco.repo.audit.access.AccessAuditor` gathers together lower events into user recognizable events. For example, the download or preview of content are recorded as a single read. Similarly the upload of a new version of a document is recorded as a single create version. By contrast the `AuditMethodInterceptor` data producer typically would record multiple events.
-   **[Content auditing customizations](../concepts/audit-cust.md)**  
There are two customizations available:

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

