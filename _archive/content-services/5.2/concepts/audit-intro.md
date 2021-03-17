---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Auditing

Alfresco Content Services provides the ability to audit activity. The auditing system is disabled by default, as it has the potential to impact performance, but the auditing system is highly configurable, so that you only need generate data for those events of particular interest.

 

-   **[Overview](../concepts/audit-overview.md)**  
Auditing in Alfresco Content Services is highly configurable. There are a number of components that interact with each other so that only the specific events that need to be audited are logged. This reduces the performance impact should auditing be required. The key components of the auditing system are described here.
-   **[Key tools and files](../concepts/audit-key-tools-files.md)**  
Some initial information on key tools and file to get you started.
-   **[How to enable auditing](../concepts/audit-enable.md)**  
Generation of audit data is disabled by default as it can potentially impact the performance of Alfresco Content Services. To enable auditing, configuration must be added to the Alfresco Content Services global properties file.
-   **[How to check audit status](../concepts/audit-check-status.md)**  
It is useful to check the current audit status of an Alfresco Content Services installation. You can do this via the AuditService Java API, but this can also be done via the ReST API, which can be accessed via a command line client such as **Curl**.
-   **[How to use the auditing sample files](../concepts/audit-sample-files.md)**  
Auditing sample files are distributed in the ./tomcat/shared/classes/alfresco/extension/audit directory. You can enable them in order to explore auditing.
-   **[Using the auditing ReST API](../concepts/audit-rest-api.md)**  
You can use the ReST API to control auditing and also run queries against the audit data for specific audit applications. It is also possible to clear auditing data using the API.
-   **[Default auditing global properties](../concepts/audit-default-configuration.md)**  
When Alfresco Content Services is installed it has a set of default auditing properties you should be aware of.
-   **[Audit filters](../concepts/audit-filters.md)**  
Audit data can be controlled by using audit filters. Audit filters provide a fine grain of control over which events are audited.
-   **[Audit configuration](../concepts/audit-custom-audit-config.md)**  
The most common reason to customize the audit configuration is if there is a need to extract individual property or aspect values that have special meaning to a particular Alfresco Content Services installation.
-   **[Auditing Tutorials](../concepts/audit-tutorials.md)**  
The Audit ReST API User Guide contains a lot of example tutorials.

**Parent topic:**[Administering](../concepts/ch-administering.md)

