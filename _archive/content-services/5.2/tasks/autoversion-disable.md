---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Disabling the auto-versioning feature

Use this information to disable auto-versioning for all versionable content in the repository.

The auto-versioning feature is controlled with the `version.store.enableAutoVersioning` property, which is set to `true` by default.

1.  Open the alfresco-global.properties file.

2.  Add the following property:

    ```
    version.store.enableAutoVersioning=false
    ```

    When this property is set to false, the `VersionableAspect` will not respond to any events; even if the aspect is present, it will not create versions.

    **Note:** The behavior of versioning may also be affected by the version.store.enableAutoVersionOnUpdateProps property, which is set to false by default. This means that the version history is not incremented when changing properties in Edit Properties in Share. If you have set version.store.enableAutoVersionOnUpdateProps=true it will enable versioning when properties are changed.

3.  Save the global properties file.

4.  Restart the Alfresco Content Services server.


**Parent topic:**[About versioning](../concepts/versioning.md)

