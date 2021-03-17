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
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/coci/CheckOutCheckInService.html)|
|Java example|```

                  
CheckOutCheckInService checkOutCheckInService = serviceRegistry.getCheckOutCheckInService();

NodeRef checkedOutCopy = checkOutCheckInService.checkout(nodeRef);


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

