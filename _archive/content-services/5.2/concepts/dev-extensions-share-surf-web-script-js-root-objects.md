---
author: Alfresco Documentation
---

# Surf Web Script JavaScript Root Objects

A number of JavaScript root objects are available when you are implementing a controller for a Surf Web Script, such as `page` and `remote`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.

|Extension Point|Surf Web Script JavaScript Root Objects|
|---------------|---------------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|-   [Share Architecture](dev-extensions-share-architecture-extension-points.md)

|
|Description|This is implemented as a Repository extension, see [Repository JavaScript root objects](../references/dev-extension-points-javascript-root-objects.md)|
|Deployment - App Server|JavaScript root object implementations does not lend themselves very well to be manually installed in an application server.Build a Repository JAR instead.

|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|Use a Repository JAR.|
|More Information|-   [Spring Surf Root Object Reference](../references/APISurf-rootscoped.md) \(Have a look at what root objects are already there\)

|

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

