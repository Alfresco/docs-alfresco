---
title: Overview of in-process platform extension points
---

In-process Platform Extensions are extensions to the Platform or Content Services, and can be implemented through a variety 
of mechanisms. This information identifies the supported extension points and how you can leverage them to build your 
extensions to the Platform.

Read through the [Getting started guide]({% link content-services/7.2/develop/index.md %}) to get up to 
speed on the difference between in-process and out-of-process extensions.

There are many ways you can extend the Platform. You can write new actions and behaviors, create custom content models, 
use existing services, or write new Platform services, create custom ReST APIs, create new rating systems and so on. 
Each of these extension points is described in this section, with links to additional resources such 
as APIs (in Java, JavaScript and FreeMarker, for example), tutorials, and reference materials.

To fully understand the extension points it is a good idea to first read through the  
[Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch) section.

Also, you should get familiar with the [Alfresco SDK]({% link content-services/7.2/develop/sdk.md %}) as it is 
the recommended way of developing platform extensions.

The following table lists platform extension points, also referred to as Repository extension points, and links to 
relevant documentation:

|Extension point|Description|Support Status|
|---------------|-----------|--------------|
|[Content Model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %})|Content modeling provides a foundation for structuring and working with content. It is used to create a domain specific model that can be used to classify content and refine the search capabilities.|Full Support|
|[Data Lists]({% link content-services/7.2/develop/repo-ext-points/data-lists.md %})|Data lists are a useful feature available in sites. They can be used to keep records data. This is metadata that does not necessarily have any file content associated with it. It can be for example a to-do list or an event list.|**Deprecated**|
|[Actions]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %})|Actions are Spring beans that act upon a content node. You develop actions using Java and register them with the repository through a Spring configuration file. Actions provide a place to locate reusable business logic.|Full Support|
|[Web scripts]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %})|Web scripts provide the ability to create custom REST APIs. A web script is implemented in XML, JavaScript, and FreeMarker. Java can also be used to implement a web script if the business logic requires it. If written in JavaScript and FreeMarker it is possible to write new extensions that do not require a server restart to take effect.|Full Support|
|[JavaScript root objects]({% link content-services/7.2/develop/repo-ext-points/javascript-root-objects.md %})|The JavaScript root object collection provides a ready made set of objects you can access from your web scripts. These objects provide access to the repository content. It is also possible to extend the platform with new custom JavaScript root objects that can be used in for example Web Scripts controllers.|Full Support|
|[Behaviors / policies]({% link content-services/7.2/develop/repo-ext-points/behavior-policies.md %})|Behaviors are logic that is tightly coupled to a repository event, such as adding content. Examples of out-of-the-box mechanisms that employ behaviors are versioning and auditing. Custom behaviors can be implemented to support features such as automatically adding a unique ID property to a content node when added to the repository, or automatically applying metadata attached to a folder to content stored in the folder.|Full Support|
|[Bootstrap content]({% link content-services/7.2/develop/repo-ext-points/bootstrap-content.md %})|Most content management solutions require some content to be available before the system is going live. This can be users, groups, files and folders, sites, and so on. This content can be imported into the repository using a bootstrapping procedure.|Full Support|
|[Permissions (Custom Roles)]({% link content-services/7.2/develop/repo-ext-points/permissions.md %})|Permissions and their groupings are defined in XML configuration files. The default files are found in the distribution configuration directory as permissionDefinitions.xml and sitePermissionDefinitions.xml. This configuration can be replaced or extended to create new roles.|Full Support|
|[MIME Types]({% link content-services/7.2/develop/repo-ext-points/mimetypes.md %})|Content Services is able to automatically identify most file types and establish MIME type accordingly. However, if you have custom file types it is possible to add support for these by adding custom MIME types. You will typically also need to provide custom content transformations, and metadata extraction to fully support the content type.|Full Support|
|[Content Stores]({% link content-services/7.2/develop/repo-ext-points/content-stores.md %})|The repository has multiple content stores used for different purposes. By default, Content Services is configured to save files or content items in the File Content Store. You can also have an encrypted content store, or a custom content store, depending on your requirements.|Full Support|
|[Audit Log]({% link content-services/7.2/develop/repo-ext-points/audit-log.md %})|The Audit service can be used to keep a record of all operations performed in the content repository. The audit information is stored in a database in a form that is designed to be simple for third-party reporting tools to consume. Custom audit applications can be configured.|Full Support|
|[Metadata Extractors]({% link content-services/7.2/develop/repo-ext-points/metadata-extractors.md %})|Content Services performs metadata extraction on content automatically, however, you may wish to create custom metadata extractors to handle custom file properties and custom content models.|Full Support|
|[Admin Console Component]({% link content-services/7.2/develop/repo-ext-points/admin-console-components.md %})|The [Admin Console]({% link content-services/7.2/admin/admin-console.md %}) provides a way of managing services integrated into Content Services, or built on as extensions. Installed modules can have a custom Admin Console component, so that they can be managed from the well-known interface of the Admin Console.|Full Support|
|[Content Transformers (and Renditions)]({% link content-services/7.2/develop/repo-ext-points/content-transformers-renditions.md %})|Content transformers transform one type of content into another. Transformations can also be chained together. You can create custom content transformers to transform one type of content into another, where that transformation is not already supported. Closely related to transformations are renditions, which can be used to generate another version of the content, such as a preview, thumbnail, HTML etc.|Full Support|
|[Scheduled jobs]({% link content-services/7.2/develop/repo-ext-points/scheduled-jobs.md %})|Content Services automatically runs a number of scheduled jobs, for example the content store cleaner job and temporary file cleaner job. It is possible to configure new scheduled jobs.|Full Support|
|[Authentication]({% link content-services/7.2/develop/repo-ext-points/authentication.md %})|Content Services includes multiple authentication systems, including Active Directory, LDAP, Kerberos and so on, which you can opt to use. You can also create and plug in your own custom authentication system.|Full Support|
|[Subsystems]({% link content-services/7.2/develop/repo-ext-points/subsystems.md %})|Implementing a customization as a subsystem allows a more fully decoupled customization. It is, for example, possible to disable the customization at run time.|Full Support|
|[Module Components]({% link content-services/7.2/develop/repo-ext-points/module-components.md %})|A Module Component executes code and is tied to a specific Module. It is packed with the rest of the module files in an AMP or JAR.|Full Support|
|[Ratings]({% link content-services/7.2/develop/repo-ext-points/ratings.md %})|A rating scheme is a defined system of ratings for content which is identified by a unique name and which provides a minimum and maximum allowed rating. There are out of the box ratings facilities, but as a developer you can also implement your own.|Full Support|
|[Patches]({% link content-services/7.2/develop/repo-ext-points/patches.md %})|A patch executes a piece of Java code when Content Services starts up, and logs the result in `ALF_APPLIED_PATCHES` database table.|Full Support|
