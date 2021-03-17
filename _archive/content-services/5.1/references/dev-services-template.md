---
author: [Alfresco Documentation, Alfresco Documentation]
---

# TemplateService

Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository \(passed as NodeRef string\) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.

|Information|TemplateService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description| |
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/TemplateService.html)|
|Java example|```

                  
// build the email template model
final Map<String, Object> model = createEmailTemplateModel(nodeRef);

// process the template against the model
text = templateService.processTemplate("freemarker", templateRef.toString(), model);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Template Reference Guide](API-FreeMarker-intro.md)

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

