---
author: Alfresco Documentation
---

# Modifying Out-of-the-box Aikau Widgets

Every Aikau menu, page, and dashlet is built up of one or more widgets. Sometimes it is necessary to modify out of the box widgets.

|Extension Point|Modifying Out-of-the-box Aikau Widgets|
|---------------|--------------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The preferred way of modifying Aikau widgets is by using [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md) to target the widget that should be replaced or hidden. It is also possible to add widgets this way. The Extension Modules section has all the details.|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ \(Untouched by re-depolyments and upgrades\)

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|-   share-amp/src/main/amp/config/alfresco/web-extension/site-data/extensions/ - Extension modules go here

|
|More Information|-   [Aikau Widgets](dev-extensions-share-aikau-widgets.md)
-   [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/) - this is the place to look for widgets that you can use in your dashlets.
-   [Introduction to Aikau](aikau-intro.md)

|
|Tutorials|-   [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters)
-   [Adding new AMD packages for Aikau Widgets](../tasks/dev-extensions-share-tutorials-amd-packages-via-extension.md)

|
|Alfresco Developer Blogs|-   [Aikau background and concepts](https://community.alfresco.com/community/ecm/blog/2013/02/20/latest-updates-to-share-and-surf)
-   [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub)

|

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

