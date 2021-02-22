---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Disabling auditing

Auditing is enabled by default. To disable auditing permanently, use the setting in the global properties file.

1.  To disable auditing permanently, add the following setting to the alfresco-global.properties file:

    ```
      audit.enabled=false
    ```

2.  Save the file, and then restart the Alfresco server.


Use the JMX client to modify the Audit subsystem. Changes to the Audit subsystem will be preserved across server restarts.

Audit sample files are distributed in the <extension\>/audit directory. Activate the sample files by removing the .sample extension.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

