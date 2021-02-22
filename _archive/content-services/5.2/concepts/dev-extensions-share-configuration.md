---
author: Alfresco Documentation
---

# Share Configuration

A lot of the customizations that you might want to do to the Share user interface does not require coding. They can be handled by XML configuration and a simple restart of Alfresco Content Services.

|Extension Point|Share Configuration|
|---------------|-------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|There is a separate section in the documentation dedicated to [Configuring Alfresco Share](share-configuring-intro.md). This configurations typically goes into the share-config-custom.xml file. The following is an example of stuff that you can configure in this file:

 -   Visibility of Aspects and Types \(from custom content models\)
-   Metadata forms \(from custom content model\)
-   Workflow task forms
-   Document Library indicators, views, actions, and metadata templates
-   Visibility of workflow process definitions \(that is, what workflows can be started\)
-   Advanced Search
-   Repository location
-   Sorting fields and labels
-   Web Framework settings
-   Data Lists
-   Cross-site request forgery \(CSRF\) policy

 Note that a lot of the other extension points that require coding also involve configuration, so it is a good idea to read up on the configuration bit before starting any development with the other extension points.

|
|Deployment - App Server|tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml - Share configuration related to the whole Share application, such as Web Framework configuration and repository location \(Remote\) configuration. \(Untouched by re-depolyments and upgrades\)|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|-   aio/share-jar/src/main/resources/META-INF/share-config-custom.xml - Share configuration related to a specific Share module extension, such as Document Library Action configuration, form configuration, aspect and type configuration.

|
|More Information|-   [Share configuration introduction](share-configuring-intro.md)
-   [Document Library configuration](doclib-web-tier.md)

|
|Tutorials|-   [Making custom types visible](../tasks/dev-extensions-content-models-tutorials-share-config.md)
-   [Making custom aspects visible](../tasks/dev-extensions-content-models-tutorials-add-aspect.md)
-   [Controlling search results](../tasks/controlling_search_results.md)
-   [Controlling user name and password length](../tasks/share-change-password.md)
-   [Setting repository location](../tasks/share-change-port.md) \(If the Share webapp and the repository webapp runs in different application servers\)
-   [Remove persistent cookies](../tasks/share-customizing-cookies.md)
-   [Document Library actions, metadata templates, and indicators](doclib-override-extension-examples.md)
-   [Document Library views](share-customizing-document-library-views.md)

|

-   **[Configuring Alfresco Share](../concepts/share-configuring-intro.md)**  
Alfresco Share provides a rich web-based collaboration environment for managing documents, wiki content, blogs and more. Share leverages the repository to provide content services and uses the Surf platform to provide the underlying presentation framework.

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

