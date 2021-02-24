---
author: [Alfresco Documentation, Alfresco Documentation]
---

# RetryingTransactionHelper

A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.

|Information|RetryingTransactionHelper|
|-----------|-------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|A description and application of the RetryingTransactionHelper can be found [Repository Java API](dev-extension-points-public-java-api.md).|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/transaction/RetryingTransactionHelper.html)|
|Java example|See [Repository Java API](dev-extension-points-public-java-api.md).|
|More Information|See [Repository Java API](dev-extension-points-public-java-api.md).|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

