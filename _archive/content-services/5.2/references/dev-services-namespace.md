---
author: [Alfresco Documentation, Alfresco Documentation]
---

# NamespaceService

Provides access to and definition of namespace URIs and Prefixes.

|Information|NamespaceService|
|-----------|----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The `NamespaceService` has constants defined for the major namespaces used by internal Alfresco content models, including the prefixes for those.

 Alfresco Content Services namespaces start with http://www.alfresco.org. The top-level namespace sub-divisions are:

-   model - identify a data model
-   view - identify a view of content held in the repository
-   ws - identify a Web Service definition
-   test - identify a test definition

Each namespace typically ends with its version number.

**Registry**

Note: This list will expand / change between now and the next release.

|Namespace|Common Prefix|Description|
|---------|-------------|-----------|
|http://www.alfresco.org|alf|General Namespace|
|http://www.alfresco.org/model/dictionary/1.0|d|Data Dictionary model|
|http://www.alfresco.org/model/system/1.0|sys|Repository system model|
|http://www.alfresco.org/model/content/1.0|cm|Content Domain model|
|http://www.alfresco.org/model/application/1.0|app|Application model|
|http://www.alfresco.org/model/bpm/1.0|bpm|Business Process Model|
|http://www.alfresco.org/model/site/1.0|st|Site Model|
|http://www.alfresco.org/model/forum/1.0|fm|Forum Model|
|http://www.alfresco.org/model/user/1.0|usr|User model \(in repository.jar\)|
|http://www.alfresco.org/view/repository/1.0|view|Import / Export View|
|http://www.alfresco.org/model/action/1.0|act|Action service model|
|http://www.alfresco.org/model/rule/1.0|rule|Rule service model|
|http://www.alfresco.org/ws/service/authentication/1.0|auth|Authentication Web Service|
|http://www.alfresco.org/ws/service/repository/1.0|rep|Repository Web Service|
|http://www.alfresco.org/ws/service/content/1.0|content|Content Web Service|
|http://www.alfresco.org/ws/service/authoring/1.0|author|Authoring Web Service|
|http://www.alfresco.org/ws/service/classification/1.0|cls|Classification Web Service|
|http://www.alfresco.org/ws/cml/1.0|cml|Content Manipulation Language|
|http://www.alfresco.org/ws/model/content/1.0|cm|Web Service Content Domain Model|
|http://www.alfresco.org/model/workflow/1.0|wf|Workflow Model \(link is to the simple workflow model, not generally extended\)|

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/namespace/NamespaceService.html)|
|Java example|It's common to use the `NamespaceService` to get to prefixes for content models, such as in this example:

 ```
String companyHomePath = serviceRegistry.getNodeService().getPath(companyHome)
               .toPrefixString(serviceRegistry.getNamespaceService());
```

 This code would result in `companyHomePath` being set to `/app:company_home`.

 Another example usage is the following code that uses the `NamespaceService` when a `QName` is created:

 ```
String name = "aName";
QName aQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, QName.createValidLocalName(name));
```

 This code would result in `aQName` being set to `{http://www.alfresco.org/model/content/1.0}aName`.

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

