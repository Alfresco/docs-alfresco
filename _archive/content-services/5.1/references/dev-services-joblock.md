---
author: [Alfresco Documentation, Alfresco Documentation]
---

# JobLockService

This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.

|Information|JobLockService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The JobLockService is used to provide a locking service at the job level, rather than the node level.|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/lock/JobLockService.html)|
|Java example|For an example of using the JobLockService see the [Content Store Cleaner code](https://github.com/Alfresco/community-edition/blob/master/projects/repository/source/java/org/alfresco/repo/content/cleanup/ContentStoreCleaner.java) on GitHub.|
|More Information|-   [Scheduled Jobs extension point documentation](dev-extension-points-scheduled-jobs.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

