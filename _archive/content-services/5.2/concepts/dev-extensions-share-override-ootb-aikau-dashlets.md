---
author: Alfresco Documentation
---

# Modifying Out-of-the-box Aikau Dashlets

The Share web application has a special page called Dashboard, which contains windows of content called dashlets. Currently most of these dashlets are Spring Surf dashlets, but they will eventually be converted to Aikau dashlets.

|Extension Point|Modifying Out-of-the-box Aikau Dashlets|
|---------------|---------------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The preferred way of modifying Aikau dashlets is by using [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md) to target the Aikau widget that should be replaced or hidden. It is also possible to add widgets to a dashlet this way. The Extension Modules section has all the details.|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ \(Untouched by re-depolyments and upgrades\)

|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Extension modules go here

|
|More Information|-   [Aikau Dashlets](dev-extensions-share-aikau-dashlets.md)
-   [Introduction to Aikau](aikau-intro.md)
-   [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/) - this is the place to look for widgets that you can use in your dashlets.

|
|Tutorials|-   [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters)
-   [Adding new AMD packages for Aikau Widgets](../tasks/dev-extensions-share-tutorials-amd-packages-via-extension.md)

|
|Developer Blogs|-   [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014)
-   [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub)

|

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

