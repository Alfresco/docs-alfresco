---
title: Upgrade Alfresco Enterprise Viewer
---

No data model or breaking updates are required to upgrade versions of Alfresco Enterprise Viewer from version 3.3 to version 3.5. The only significant change in this version from an infrastructure point of view is that the Alfresco Enterprise Video Viewer (AEVV, formerly known as OpenAnnotate Video) is now embedded within the Enterprise Viewer web application. In version 3.3, AEVV was deployed as a separate web application in its own context.

Follow these steps to upgrade Enterprise Viewer 3.3 to 3.5

* Backup previous WARs, Alfresco and Share web directories.
* Follow standard install steps, replacing/backing up previous installation artifacts as needed.
* Remove OpenAnnotate Video standalone web application (OpenAnnotateVideo.war).
* Remove any proxy rules for /OpenAnnotateVideo.
* Start up and verify the application is working as expected.

> **Note:** Video link URLs have changed slightly with the newly embedded AEVV web application. Ensure your network settings or previous direct links are updated if necessary.

## Upgrading to 3.5.1 and above

For AEV 3.5.1 or later, verify the `secureBrowserCookies` configuration. If you have setup SSL then `secureBrowserCookies` should be set to `true`, else it should be `false` (the default).

In the `openannotate-override-placeholders.properties` set the following property accordingly: `secureBrowserCookies=`.

## Upgrading to 3.6

For AEV 3.6, the Control Document type is set to `aw:qualityDocument` by default. In case of a custom type set, you will need to override it by completing the following steps.

1. Override the bean in `opencontent-extension-override-module-ctx.xml` as follows:

   ```<bean id="paasExtendPermissionModel" parent="permissionModelBootstrap"> <property name="model" value="alfresco/module/com.tsgrp.opencontent/model/ocPermissionDefinitionsOverride.xml"/> </bean>```

2. Then create `ocPermissionDefinitionsOverride.xml` at the specified path in your custom AMP with the contents of the original `ocPermissionDefinitions.xml`. Replace the type `aw:qualityDocument` with your current or desired control document type. 