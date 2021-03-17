---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Document Management, Versioning]
option: extended services auto-version
---

# Disabling the auto-versioning feature

This section describes how to disable versioning for all content in the repository.

1.  Open the alfresco-global.properties file.

2.  Add the following property:

    ```
    version.store.enableAutoVersioning=false
    ```

    When this property is set to false, the `VersionableAspect` will not respond to any events; even if the aspect is present, it will not create versions.

3.  Save the global properties file.

4.  Restart the Alfresco server.


**Parent topic:**[About versioning](../concepts/versioning.md)

