---
author: Alfresco Documentation
---

# Platform extension points

The Alfresco platform features a number of extension points that can be used to create customizations. The table of supported extension points includes links to more information.

The following table lists platform extension points and links to relevant documentation:

|Extension point|Description|Support Status|
|---------------|-----------|--------------|
|[Content Model](../references/dev-extension-points-content-model.md)|Content modeling provides a foundation for structuring and working with content. It is used to create a domain specific model that can be used to classify content and refine the search capabilities.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Data Lists](../references/dev-extension-points-data-lists.md)|Data lists are a useful feature available in sites. They can be used to keep records data. This is metadata that does not necessarily have any file content associated with it. It can be for example a to-do list or an event list.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Actions](../references/dev-extension-points-actions.md)|Actions are Spring beans that act upon a content node. You develop actions using Java and register them with the repository through a Spring configuration file. Actions provide a place to locate reusable business logic.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Workflow](../references/dev-extension-points-workflow.md)|Alfresco One embeds the Activiti Workflow Engine as standard. You can create custom business workflows to manage your content and processes.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Web scripts](../references/dev-extension-points-webscripts.md)|Web scripts provide the ability to create custom REST APIs. A web script is implemented in XML, JavaScript, and FreeMarker. Java can also be used to implement a web script if the business logic requires it. If written in JavaScript and FreeMarker it is possible to write new extensions that do not require a server restart to take effect.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[JavaScript root objects](../references/dev-extension-points-javascript-root-objects.md)|The JavaScript root object collection provides a ready made set of objects you can access from your web scripts. These objects provide access to the repository content. It is also possible to extend the platform with new custom JavaScript root objects that can be used in for example Web Scripts controllers.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Behaviors / policies](../references/dev-extension-points-behaviors.md)|Behaviors are logic that is tightly coupled to a repository event, such as adding content. Examples of out-of-the-box mechanisms that employ behaviors are versioning and auditing. Custom behaviors can be implemented to support features such as automatically adding a unique ID property to a content node when added to the repository, or automatically applying metadata attached to a folder to content stored in the folder.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Bootstrap content](../references/dev-extension-points-bootstrap.md)|Most content management solutions require some content to be available before the system is going live. This can be users, groups, files and folders, sites, and so on. This content can be imported into the repository using a bootstrapping procedure.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Permissions \(Custom Roles\)](../references/dev-extension-points-permissions.md)|Permissions and their groupings are defined in XML configuration files. The default files are found in the distribution configuration directory as permissionDefinitions.xml and sitePermissionDefinitions.xml. This configuration can be replaced or extended to create new roles.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[MIME Types](../references/dev-extension-points-mimetypes.md)|Alfresco is able to automatically identify most file types and establish MIME type accordingly. However, if you have custom file types it is possible to add support for these by adding custom MIME types. You will typically also need to provide custom content transformations, and metadata extraction to fully support the content type.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Content Stores](../references/dev-extension-points-custom-content-store.md)|The repository has multiple content stores used for different purposes. By default, Alfresco is configured to save files or content items in the File Content Store. You can also have an encrypted content store, or a custom content store, depending on your requirements.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Audit Log](../references/dev-extension-points-audit.md)|The Audit service can be used to keep a record of all operations performed in the content repository. The audit information is stored in a database in a form that is designed to be simple for third-party reporting tools to consume. Custom audit applications can be configured.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Metadata Extractors](../references/dev-extension-points-custom-metadata-extractor.md)|Alfresco performs metadata extraction on content automatically, however, you may wish to create custom metadata extractors to handle custom file properties and custom content models.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Admin Console Component](../references/dev-extension-points-custom-admin-console.md)|The [Admin Console](at-adminconsole.md) provides a way of managing services integrated into Alfresco, or built on as extensions. Installed modules can have a custom Admin Console component, so that they can be managed from the well-known interface of the Admin Console.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Content Transformers \(and Renditions\)](../references/dev-extension-points-content-transformer.md)|Content transformers transform one type of content into another. Transformations can also be chained together. You can create custom content transformers to transform one type of content into another, where that transformation is not already supported. Closely related to transformations are renditions, which can be used to generate another version of the content, such as a preview, thumbnail, HTML etc.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Scheduled jobs](../references/dev-extension-points-scheduled-jobs.md)|Alfresco automatically runs a number of [scheduled jobs](scheduled-jobs.md), for example the content store cleaner job and temporary file cleaner job. It is possible to configure new scheduled jobs.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Authentication](../references/dev-extension-points-authentication.md)|Alfresco includes multiple authentication systems, including Active Directory, LDAP, Kerberos and so on, which you can opt to use. You can also create and plug in your own custom authentication system.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Subsystems](../references/dev-extension-points-custom-subsystem.md)|Implementing a customization as a subsystem allows a more fully decoupled customization. It is, for example, possible to disable the customization at run time.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Module Components](../references/dev-extension-points-module-component.md)|A Module Component executes code and is tied to a specific Module. It is packed with the rest of the module files in an AMP or JAR.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Ratings](../references/dev-extension-points-ratings.md)|A rating scheme is a defined system of ratings for content which is identified by a unique name and which provides a minimum and maximum allowed rating. There are out of the box ratings facilities, but as a developer you can also implement your own.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Form Processors](../references/dev-extension-points-form-processors.md)|Form processors control the persistence of form data and the generation of the form template for a specific item such as a node, task, type, or action. Custom Form Processors can be implemented to support a new kind of item.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Form Processor Filters](dev-extensions-share-form-filters.md)|Form filters can be used to intercept a form processor's persist form data call and generate form template call. "Before" and "After" method hooks are available in the filter to control form data persistence and form template generation.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Patches](../references/dev-extension-points-patch.md)|A patch executes a piece of Java code when Alfresco starts up, and logs the result in `ALF_APPLIED_PATCHES` database table.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|

-   **[Content Model](../references/dev-extension-points-content-model.md)**  
Defining a custom content model for the Alfresco Repository is a fundamental task in almost every content management project. It will allow you to build a robust system with content that can be classified, searched, structured, and processed in many different ways.
-   **[Data Lists](../references/dev-extension-points-data-lists.md)**  
Data lists are records of data stored in the Alfresco repository as nodes. There are a number of data list types available but custom ones can also be implemented.
-   **[Actions](../references/dev-extension-points-actions.md)**  
Repository Actions are reusable units of work that can be invoked from the User Interface \(UI\). Examples include Workflow and Web Scripts. Much of the functionality in the Share UI is backed by an Action.
-   **[Workflow](../references/dev-extension-points-workflow.md)**  
Alfresco One includes the Activiti Workflow Engine as standard. You can create custom workflows to manage your business processes.
-   **[Web Scripts](../references/dev-extension-points-webscripts.md)**  
Repository Web Scripts are the fundamental building blocks used for extending the REST API in Alfresco.
-   **[JavaScript Root Objects](../references/dev-extension-points-javascript-root-objects.md)**  
A number of JavaScript root objects are available when you are implementing a controller for a Web Script, such as `companyhome` and `people`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.
-   **[Behaviours / Policies](../references/dev-extension-points-behaviors.md)**  
Behaviour Policies can be used to run custom code when an event, such a adding a content item or deleting a content item, happens.
-   **[Bootstrap content](../references/dev-extension-points-bootstrap.md)**  
For many content management solutions it is useful to have some data populated when the solution is first deployed. This is done by bootstrapping content.
-   **[Permissions / Roles](../references/dev-extension-points-permissions.md)**  
 Permissions and their groupings are defined in XML configuration files. The default files are found in the distribution configuration directory as permissionDefinitions.xml and sitePermissionDefinitions.xml. This configuration can be replaced or extended to create new permissions and roles.
-   **[MIME Types](../references/dev-extension-points-mimetypes.md)**  
Alfresco supports, and can detect, a wide range of MIME types out-of-the-box. It is also possible to add support for other custom MIME types.
-   **[Content Stores](../references/dev-extension-points-custom-content-store.md)**  
There are many Content Stores available out-of-the-box but custom stores can also be implemented.
-   **[Audit Log](../references/dev-extension-points-audit.md)**  
Alfresco provides the ability to audit activity in the Repository. What to audit log can be customized.
-   **[Metadata Extractors](../references/dev-extension-points-custom-metadata-extractor.md)**  
Alfresco performs metadata extraction on content automatically, however, you may wish to create custom metadata extractors to handle custom file properties and custom content models.
-   **[Admin Console Components](../references/dev-extension-points-custom-admin-console.md)**  
Extension modules that needs some form of administration interface can be supported by a custom Admin Console Component.
-   **[Content Transformers \(and Renditions\)](../references/dev-extension-points-content-transformer.md)**  
Alfresco provides many different types of content transformations out-of-the-box. Custom transformations can also be implemented and configured.
-   **[Scheduled Jobs](../references/dev-extension-points-scheduled-jobs.md)**  
Alfresco automatically runs a number of scheduled jobs, for example the content store cleaner job and temporary file cleaner job. It is possible to configure new scheduled jobs.
-   **[Authentication](../references/dev-extension-points-authentication.md)**  
Alfresco provides a number of authentication systems out-of-the-box, such as LDAP. It is also possible to implement and configure custom authentication systems.
-   **[Subsystems](../references/dev-extension-points-custom-subsystem.md)**  
Subsystems are configurable modules responsible for a piece of functionality in the Alfresco content management system. It is possible to implement an extension as a custom subsystem.
-   **[Module Components](../references/dev-extension-points-module-component.md)**  
A ModuleComponent executes code and is tied to a specific Module. It is packed with the rest of the module files in an AMP or JAR.
-   **[Ratings](../references/dev-extension-points-ratings.md)**  
Alfresco supports rating of content according to different schemes, such as likes or five-star. It is also possible to implement custom rating schemes.
-   **[Form Processors](../references/dev-extension-points-form-processors.md)**  
Custom Form Processor implementations can be implemented and integrated via a small amount of Spring configuration. Typically you will do this to support a new "kind" of form.
-   **[Form Processor Filters](../concepts/dev-extensions-share-form-filters.md)**  
Form Processor filters can be used to modify submitted form data before and after persistence. They can also be used to manage form fields before and after form generation.
-   **[Patches](../references/dev-extension-points-patch.md)**  
A patch is a piece of Java code that executes once when Alfresco is started. Custom patches can be implemented.

**Parent topic:**[Platform extensions](../concepts/dev-platform-extensions.md)

