# SiteService

Provides an extensive API for managing Sites in the Alfresco Share web client.

|Information|SiteService|
|-----------|-----------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The SiteService provides an extension API for creating, deleting and managing Share Sites. Both JavaScript and Java APIs are available, and access to Sites is also possible via the Alfresco REST API.|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/site/SiteService.html)|
|Java example|```

                  
// Using siteService to obtain info about site                  
SiteInfo siteInfo = siteService.getSite(nodeRef);
String siteShortName = siteInfo.getShortName();
String siteGroup = siteService.getSiteGroup(siteShortName);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials| |
|Alfresco Developer Blogs|xxx|

