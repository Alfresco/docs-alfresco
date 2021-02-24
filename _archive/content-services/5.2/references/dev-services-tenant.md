---
author: [Alfresco Documentation, Alfresco Documentation]
---

# TenantService

Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.

|Information|TenantService|
|-----------|-------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Multi-tenancy is supported by the Alfresco repository. Read more about it [here](../concepts/mt-intro.md). The `TenantService` is used by Alfresco repository code to rewrite `NodeRef`s, `StoreRef`s etc so they include a tenant domain when running in a multi tenant environment, which makes it possible to handle multiple tenants in parallel.When you use the `TenantService` in a single tenant environment the methods are either NOOP, return what you pass in, or return empty domain for domain related methods.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/tenant/TenantService.html)|
|Java example|The following code shows an example of how a `NodeRef` and a `StoreRef` can be rewritten to be multi-tenant aware:

 ```
NodeRef nodeRef = "some node reference that needs to be rewritten for a specific tenant domain";
NodeRef tenantNodeRef = serviceRegistry.getTenantService().getName(nodeRef);

String store = "some repository store that needs to be rewritten for a specific tenant domain";
StoreRef storeRef = serviceRegistry.getTenantService().getName(new StoreRef(store));
```

 In a single tenant environment these `getName` operations would have no effect.

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

