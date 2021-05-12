---
title: Surf Web Script JavaScript Root Objects
---

A number of JavaScript root objects are available when you are implementing a controller for a Surf Web Script, such as `page` and `remote`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.

|Extension Point|Surf Web Script JavaScript Root Objects|
|---------------|---------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|-   [Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture)

|
|Description|This is implemented as a Repository extension, see [Repository JavaScript root objects]({% link content-services/5.2/develop/repo-ext-points/javascript-root-objects.md %})|
|Deployment - App Server|JavaScript root object implementations does not lend themselves very well to be manually installed in an application server.Build a Repository JAR instead.

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|Use a Repository JAR.|
|More Information|-   [Spring Surf Root Object Reference]({% link content-services/5.2/develop/api-reference.md %}#surf-root-objects) (Have a look at what root objects are already there)

|
