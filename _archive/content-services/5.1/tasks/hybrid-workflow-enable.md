---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: workflow
---

# Enabling Hybrid workflow

Hybrid workflow is not enabled by default in an Alfresco installation.

1.  Apply a suitable Enterprise license that includes Hybrid workflow to your Alfresco installation.

2.  Ensure that you enable Enterprise to Cloud Sync.

3.  Open the alfresco-global.properties file.

4.  Add the following property:

    ```
    hybridworkflow.enabled=true
    ```

5.  Save the file.

6.  Restart the Alfresco server.


**Parent topic:**[Setting up Hybrid workflow](../concepts/hybrid-workflow-intro.md)

**Related information**  


[Setting up Enterprise to Cloud Sync](../concepts/cloud-sync-intro.md)

