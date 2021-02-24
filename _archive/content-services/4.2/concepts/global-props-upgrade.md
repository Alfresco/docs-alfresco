---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: global properties
---

# Upgrading configurations

Use this important information for upgrading from Alfresco Enterprise releases prior to version 3.2.

Alfresco includes the concept of subsystems. Overall defaults for subsystem properties are set in the alfresco-global.properties file.

When you upgrade from releases prior to Version 3.2, the recommendation is that you move all your repository and database configurations from the <extension\>custom-repository.properties file to the alfresco-global.properties file.

For example, you should move the configuration settings for the following properties:

-   **Sample custom content and index data location property:**
    -   `dir.root=`
-   **Sample database connection properties:**
    -   `db.name=`
    -   `db.username=`
    -   `db.password=`
    -   `db.host=`
    -   `db.port=`
-   **External locations for third-party products:**
    -   `ooo.exe=soffice`
    -   `img.root=./ImageMagick`
    -   `swf.exe=./bin/pdf2swf`
-   **Database connection properties:**
    -   `db.driver=`
    -   `db.url=`

When you have moved your configurations, delete the custom-repository.properties file and the associated Spring context file custom-repository-context.xml, then restart the server for the settings to take effect.

**Note:** If you continue to use the custom-repository.properties file to set your configurations, the settings may override those set in the alfresco-global.properties file requiring more complex ongoing administration and maintenance and possibly leading to unexpected results.

If you currently have configuration using any of these services, it is recommend that you move or reconfigure them using the new alfresco-global.properties configuration. This new method simplifies the setup and maintenance of these systems and it also simplifies future upgrades.

If you want your existing jBPM workflows to work after an upgrade, two properties must be set to `true` in the alfresco-global.properties file:

```
system.workflow.engine.jbpm.enabled=true
system.workflow.engine.jbpm.definitions.visible=true
```

However, the jBPM workflow definitions will be hidden by default, so new jBPM workflows cannot be started.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

