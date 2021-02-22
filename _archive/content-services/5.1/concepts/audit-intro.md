---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Auditing Alfresco

Alfresco provides the ability to audit activity. The auditing system is disabled by default, as it has the potential to impact Alfresco ECM performance, but the auditing system is highly configurable, so that you only need generate data for those events of particular interest.

 

-   **[Overview](../concepts/audit-overview.md)**  
Auditing in Alfresco is a highly configurable system. There are a number of components that interact with eachother so that only the specific events that need to be audited are logged. This reduces the performance impact on Alfresco should auditing be required. The key components of the auditing system are described here.
-   **[Key tools and files](../concepts/audit-key-tools-files.md)**  
Some initial information on key tools and file to get you started.
-   **[How to enable auditing](../concepts/audit-enable.md)**  
Generation of audit data is disabled by default as it can potentially impact the performance of Alfresco. To enable auditing, configuration must be added to the Alfresco global properties file.
-   **[How to check audit status](../concepts/audit-check-status.md)**  
It is useful to check the current audit status of an Alfresco installation. You can do this via the AuditService Java API, but this can also be done via the REST API. The REST API can be accessed via web scripts, or simply using a command line client such as Curl.
-   **[How to use the auditing sample files](../concepts/audit-sample-files.md)**  
Auditing sample files are distributed in the ./tomcat/shared/classes/alfresco/extension/audit directory. You can enable them in order to explore auditing.
-   **[Using the auditing REST API](../concepts/audit-rest-api.md)**  
You can use the REST API to control auditing and also run queries against the audit data for specific applications. It is also possible to clear auditing data using the API.
-   **[Default auditing global properties](../concepts/audit-default-configuration.md)**  
When Alfresco is installed it has a set of default auditing properties you should be aware of.
-   **[Audit filters](../concepts/audit-filters.md)**  
Audit data can be controlled by using audit filters. Audit filters provide a fine grain of control over which events are audited.
-   **[Audit configuration](../concepts/audit-custom-audit-config.md)**  
The most common reason to customize the audit configuration is if there is a need to extract individual property or aspect values that have special meaning to a particular Alfresco installation.
-   **[Auditing Tutorials](../concepts/audit-tutorials.md)**  
The various concepts described in this documentation can be tried out in these hands-on tutorials.

**Parent topic:**[Administering](../concepts/ch-administering.md)

