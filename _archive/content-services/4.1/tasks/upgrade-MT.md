---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
keyword: [upgrade, Multi-tenancy]
---

# Upgrading multi-tenancy

This topic describes the task that you must perform when upgrading Alfresco, if you have configured multi-tenancy.

If upgrading to the latest Alfresco version, your existing MT sample extension files are no longer relevant and should be deleted. It is also recommended that you backup your existing MT files. Follow the steps below to upgrade multi-tenancy in Alfresco:

1.  Perform the steps described in the [Upgrading Alfresco](upgrade-process.md) section.

2.  Take a backup of the following three existing MT extension files and delete them from the existing MT extension directory:

    1.  alfresco/extension/mt/mt-context.xml to alfresco/extension/mt/mt-context.xml

    2.  alfresco/extension/mt/mt-admin-context.xml to alfresco/extension/mt/mt-admin-context.xml

    3.  alfresco/extension/mt/mt-contentstore-context.xml to alfresco/extension/mt/mt-contentstore-context.xml


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

**Related information**  


[Enabling multi-tenancy](../concepts/mt-enable.md)

[Upgrading Alfresco](upgrade-process.md)

