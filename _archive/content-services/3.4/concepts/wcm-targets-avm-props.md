---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Web Content Management, Deployment]
option: Web Content Management deployment target avm
---

# AVM deployment target properties

The following properties can be configured on the AVM deployment target.

-   **store naming pattern**

    The pattern for creating the live store name. By default, this is `%storeName%-live`.

-   **root Path**

    The Alfresco explorer authoring environment creates assets with the path /www/avm\_webapps. So the ROOT folder is deployed to /www/avm\_webapps/ROOT.

    The `rootPath` property allows you to specify the root of your live store. So if you do not want /www/avm\_webapps, set it to /. If you want /banana/custard/ROOT set it to /banana/custard.


**Parent topic:**[avm deployment target](../concepts/wcm-targets-avm.md)

