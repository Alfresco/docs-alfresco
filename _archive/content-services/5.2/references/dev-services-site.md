---
author: [Alfresco Documentation, Alfresco Documentation]
---

# SiteService

Provides an extensive API for managing sites in Alfresco Share.

|Information|SiteService|
|-----------|-----------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The SiteService provides an extension API for creating, deleting and managing Share Sites. Both JavaScript and Java APIs are available, and access to Sites is also possible via the REST API.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/site/SiteService.html)|
|Java example|```

                  
// Using siteService to obtain info about site                  
SiteInfo siteInfo = siteService.getSite(nodeRef);
String siteShortName = siteInfo.getShortName();
String siteGroup = siteService.getSiteGroup(siteShortName);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

