---
author: Alfresco Documentation
---

# Modifying Out-of-the-box Surf Pages

Most of the pages in the Share web application are implemented with the Surf UI framework. In many cases it is necessary to modify these pages.

|Extension Point|Modifying Out-of-the-box Surf Pages|
|---------------|-----------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The preferred way of modifying Surf pages is by using [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md) to target the component that should be replaced or hidden. It is also possible to add components to a page this way. The Extension Modules section has all the details.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ \(Untouched by re-depolyments and upgrades\)

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|-   share-amp/src/main/amp/config/alfresco/web-extension/site-data/extensions/ - Store extension modules here

|
|More Information|-   [Surf Pages](dev-extensions-share-surf-pages.md)

|
|Tutorials|-   See [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)

|
|Alfresco Developer Blogs||

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

