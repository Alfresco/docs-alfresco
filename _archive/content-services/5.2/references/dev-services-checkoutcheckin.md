---
author: [Alfresco Documentation, Alfresco Documentation]
---

# CheckOutCheckInService

Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.

|Information|CheckOutCheckInService|
|-----------|----------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Check out locks the item and creates a working copy that can be edited. The locked item can be viewed by others, but not changed. When the item is checked in, the working copy replaces the original item and removes the lock. Methods are provided to: -   Check out a node
-   Check in a node
-   Check if a node is a working copy
-   Check if a node is locked \(checked out\)
-   Cancel a check out for a given working copy
-   Get a working copy
-   Get the original checked out node

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/coci/CheckOutCheckInService.html)|
|Java example|```

                  
CheckOutCheckInService checkOutCheckInService = serviceRegistry.getCheckOutCheckInService();

NodeRef checkedOutCopy = checkOutCheckInService.checkout(nodeRef);


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

