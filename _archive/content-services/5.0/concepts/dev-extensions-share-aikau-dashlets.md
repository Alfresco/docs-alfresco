---
author: Alfresco Documentation
---

# Aikau Dashlets

The Share web application has a special page called Dashboard, which contains windows of content called Dashlets. Currently most of these Dashlets are Spring Surf Dashlets, but they will eventually be converted to Aikau Dashlets.

|Extension Point|Aikau Dashlets|
|---------------|--------------|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The preferred new way of adding custom Share Dashlets is via the new Aikau UI development framework. A Dashlet is defined via a Surf Web Script and the layout of the Dashlet is defined with JSON in the controller. Aikau Dashlet Web Scripts are stored in the alfresco/web-extension/site-webscripts/... directory.

```
TODO   
```

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-webscripts/ \(Untouched by re-depolyments and upgrades\)
-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions \(Untouched by re-depolyments and upgrades\)
-   tomcat/webapps/share/js/ \(when web resources are included, such as Aikau Widgets, you need to put them directly into the exploded webapp, this is **NOT** recommended.\)

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|-   share-amp/src/main/amp/config/alfresco/web-extension/site-webscripts/ - Aikau Dashlet Web Scripts
-   share-amp/src/main/amp/config/alfresco/web-extension/site-data/extensions/ - Extension modules with Dojo package definitions
-   share-amp/src/main/amp/web/js/<dojo package\> - web resources, such as Aikau Widgets

|
|More Information|-   [Introduction to Aikau](aikau-intro.md)
-   [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/) - this is the place to look for widgets that you can use in your dashlets.

|
|Tutorials|-   [Aikau Tutorials](aikau-tutorials.md)
-   [Adding new AMD packages for Aikau Widgets](../tasks/dev-extensions-share-tutorials-amd-packages-via-extension.md)
-   [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters)

|
|Alfresco Developer Blogs|-   [Aikau background and concepts](https://community.alfresco.com/community/ecm/blog/2013/02/20/latest-updates-to-share-and-surf)
-   [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub)

|

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

