---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade WCM
---

# WCM-specific upgrade

This section describes the specific instructions required for upgrading WCM.

To avoid problems with deployment from one version of Alfresco to another, you should plan your upgrade such that an Alfresco instance, and all of its dependent runtimes, are upgraded at the same time.

If you avoid deployment, these components do not all need to be taken offline, upgraded, and brought back online at exactly the same time. You can use a rolling upgrade process to avoid downtime on your site.

When upgrading, virtualization servers are considered to be an integral part of Alfresco and must be upgraded in lock-step with the main Alfresco instance\(s\).

-   **[Upgrading an Alfresco runtime](../concepts/upgrade-runtime.md)**  
Any Alfresco runtimes in your environment must be upgraded using the same general upgrade process.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

