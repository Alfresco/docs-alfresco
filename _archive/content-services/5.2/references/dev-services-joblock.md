---
author: [Alfresco Documentation, Alfresco Documentation]
---

# JobLockService

This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.

|Information|JobLockService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The `JobLockService` is used to provide a locking service at the job level, rather than the node level. It's for example used indirectly via the [AbstractScheduledLockedJob](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/schedule/AbstractScheduledLockedJob.java) `QuarzJobBean`.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/lock/JobLockService.html)|
|Java example|For an example of using the `JobLockService` see the [Content Store Cleaner code](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/repo/content/cleanup/ContentStoreCleaner.java) on GitHub.|
|More Information|-   [Scheduled Jobs extension point documentation](dev-extension-points-scheduled-jobs.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

