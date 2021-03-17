---
author: Alfresco Documentation
---

# Modifying Out-of-the-box Surf Widgets

The Share web application pages and dashlets are built up of widgets. Sometimes it is necessary to modify these.

|Extension Point|Modifying Out-of-the-box Surf Widgets|
|---------------|-------------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The preferred way of modifying Surf widgets is by using [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md) to target the component that has the widget that should be replaced or hidden. It is also possible to add widgets to a page this way. The Extension Modules section has all the details.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ \(Untouched by re-depolyments and upgrades\)

|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Store extension modules here

|
|More Information|-   [Surf Widgets](dev-extensions-share-surf-widgets.md)

|
|Tutorials|-   See [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)

|
|Developer Blogs||

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

