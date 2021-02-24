---
author: [Alfresco Documentation, Alfresco Documentation]
---

# NamespaceService

Provides access to and definition of namespace URIs and Prefixes.

|Information|NamespaceService|
|-----------|----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Alfresco namespaces start with http://www.alfresco.org. The top-level namespace sub-divisions are:

 -   model - identify an Alfresco data model
-   view - identify a view of content held in the Alfresco Repository
-   ws - identify an Alfresco Web Service definition
-   test - identify a test definition

 Each namespace typically ends with its version number.

 **Registry**

 Note: This list will expand / change between now and the next release.

 |Namespace|Common Prefix|Description|
|---------|-------------|-----------|
|http://www.alfresco.org|alf|General Alfresco Namespace|
|http://www.alfresco.org/model/dictionary/1.0|d|Data Dictionary model|
|http://www.alfresco.org/model/system/1.0|sys|Repository system model|
|http://www.alfresco.org/model/content/1.0|cm|Content Domain model|
|http://www.alfresco.org/model/application/1.0|app|Application model|
|http://www.alfresco.org/model/bpm/1.0|bpm|Business Process Model|
|http://www.alfresco.org/model/site/1.0|st|Site Model|
|http://www.alfresco.org/model/forum/1.0|fm|Forum Model|
|http://www.alfresco.org/model/user/1.0|usr|User model \(in repository.jar\)|
|http://www.alfresco.org/view/repository/1.0|view|Alfresco Import / Export View|
|http://www.alfresco.org/model/action/1.0|act|Action service model|
|http://www.alfresco.org/model/rule/1.0|rule|Rule service model|
|http://www.alfresco.org/ws/service/authentication/1.0|auth|Authentication Web Service|
|http://www.alfresco.org/ws/service/repository/1.0|rep|Repository Web Service|
|http://www.alfresco.org/ws/service/content/1.0|content|Content Web Service|
|http://www.alfresco.org/ws/service/authoring/1.0|author|Authoring Web Service|
|http://www.alfresco.org/ws/service/classification/1.0|cls|Classification Web Service|
|http://www.alfresco.org/ws/cml/1.0|cml|Content Manipulation Language|
|http://www.alfresco.org/ws/model/content/1.0|cm|Web Service Content Domain Model|
|http://www.alfresco.org/model/workflow/1.0|wf|Workflow Model\(link is to Alfresco simple workflow model, not generally extended\)|

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/namespace/NamespaceService.html)|
|Java example|See Jeff Potts example code on [GitHub](https://github.com/jpotts/alfresco-developer-series/blob/master/actions/actions-tutorial-repo/src/main/java/com/someco/action/executer/MoveReplacedActionExecuter.java).|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

