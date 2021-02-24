# LockService

A node-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.

|Information|LockService|
|-----------|-----------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|If you need a node-level locking system, then the LockService can provide this. Functionality provided by the service includes: -   Checking for a lock on a node
-   Obtaining lock information
-   Locking and unlocking a node
-   Suspend and enable locks

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documention](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/lock/LockService.html)|
|Java example|```


/** 
 * Return whether a Node is currently locked
 * @param node             The Node wrapper to test against
 * @param lockService      The LockService to use
 * @return whether a Node is currently locked
 */
public static Boolean isNodeLocked(Node node,LockService lockService){
  Boolean locked=Boolean.FALSE;
  if (node.hasAspect(ContentModel.ASPECT_LOCKABLE)) {
    LockStatus lockStatus=lockService.getLockStatus(node.getNodeRef());
    if (lockStatus == LockStatus.LOCKED || lockStatus == LockStatus.LOCK_OWNER) {
      locked=Boolean.TRUE;
    }
  }
  return locked;
}

               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

