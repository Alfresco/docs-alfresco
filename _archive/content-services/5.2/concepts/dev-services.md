---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Public Java API services

The Public Java API provides access to Alfresco Content Services through a number of services that are exposed. These services are accessed via a single point of access - the Service Registry. This information provides an overview of the services exposed by the Public Java API.

The following table summarizes the main services available to the developer. These services are available via the [service registry](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/ServiceRegistry.html).

**Important:** There is a wealth of additional information to be found in the [Public Java API access and transaction management documentation](../references/dev-extension-points-public-java-api.md). This documentation also shows you how to obtain the service registry.

|Service|Description|Support Status|
|-------|-----------|--------------|
|[ActionService](../references/dev-services-action.md)|An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[ActivityService](../references/dev-services-activity.md)|A service to manage activity feeds.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[AttributeService](../references/dev-services-attribute.md)|This provides services for reading, writing, and querying global attributes.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[AuditService](../references/dev-services-audit.md)|This provides services for querying audit data and enabling and disabling auditing.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[AuthenticationService](../references/dev-services-authentication.md)|This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[AuthorityService](../references/dev-services-authority.md)|This service provides an API to encapsulate authorities granted to users.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[CategoryService](../references/dev-services-category.md)|Provides a system for creating and managing categories of nodes.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[CheckOutCheckInService](../references/dev-services-checkoutcheckin.md)|Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[ContentService](../references/dev-services-content.md)|A service for accessing and transforming content.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[CopyService](../references/dev-services-copy.md)|This service provides methods to copy nodes within and across workspaces and to update the state of a node, with that of another node, within and across workspaces.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[DictionaryService](../references/dev-services-dictionary.md)|This service represents the repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content meta-data is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same repository without name clashes \(as long their namespace is different\).|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[FileFolderService](../references/dev-services-filefolder.md)|Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[JobLockService](../references/dev-services-joblock.md)|This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[LockService](../references/dev-services-lock.md)|A low-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[MessageService](../references/dev-services-message.md)|Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the Repository.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[MimetypeService](../references/dev-services-mimetype.md)|Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[ModuleService](../references/dev-services-module.md)|A service to control and provide information about the currently-installed modules.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[NamespaceService](../references/dev-services-namespace.md)|Provides access to and definition of namespace URIs and prefixes.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[NodeService](../references/dev-services-node.md)|Provides an API for managing nodes.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[NodeLocatorService](../references/dev-services-nodelocator.md)|The NodeLocatorService looks up node locators registered via Spring configuration by name.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[PermissionService](../references/dev-services-permission.md)|Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[PersonService](../references/dev-services-person.md)|This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[RenditionService](../references/dev-services-rendition.md)|Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content \(or other properties\) are changed. Examples of renditions include reformatted content \(essentially a transformation from one MIME-type to another\), rescaled images \(including thumbnails\), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[RetryingTransactionHelper](../references/dev-services-retrying-transaction-helper.md)|A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[SearchService](../references/dev-services-search.md)|This encapsulates the execution of search against different indexing mechanisms.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[SiteService](../references/dev-services-site.md)|Provides an extensive API for managing sites in Alfresco Share.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[TaggingService](../references/dev-services-tagging.md)|It is possible to tag \(a text label\) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[TemplateService](../references/dev-services-template.md)|Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository \(passed as NodeRef string\) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[TenantService](../references/dev-services-tenant.md)|Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[VersionService](../references/dev-services-version.md)|Provides an API for managing the versions of a piece of content.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[WorkflowService](../references/dev-services-workflow.md)|Provides a client-facing API for interacting with workflows and tasks.|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|

-   **[ActionService](../references/dev-services-action.md)**  
An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.
-   **[ActivityService](../references/dev-services-activity.md)**  
The ActivityServices is responsible for generating activity feeds for each member of a Share site. The activities generated include such events as a document was added, a document was previewed, the wiki was updated.
-   **[AttributeService](../references/dev-services-attribute.md)**  
This provides services for reading, writing, and querying global attributes.
-   **[AuditService](../references/dev-services-audit.md)**  
The API by which applications can query the audit logs and enable or disable auditing.
-   **[AuthenticationService](../references/dev-services-authentication.md)**  
This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.
-   **[AuthorityService](../references/dev-services-authority.md)**  
The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. If there are entities linked to these authorities this key should be used to find them, as userName is used to link user and person.
-   **[CategoryService](../references/dev-services-category.md)**  
Provides an API for creating and managing categories of nodes.
-   **[CheckOutCheckInService](../references/dev-services-checkoutcheckin.md)**  
Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.
-   **[ContentService](../references/dev-services-content.md)**  
A service for accessing and transforming content.
-   **[CopyService](../references/dev-services-copy.md)**  
This service provides methods to copy nodes within and across workspaces. It also provides support to update the state of a node, with that of another node, within and across workspaces.
-   **[DictionaryService](../references/dev-services-dictionary.md)**  
This service represents the Repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content metadata is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same Repository without name clashes \(as long their namespace is different\).
-   **[FileFolderService](../references/dev-services-filefolder.md)**  
Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.
-   **[JobLockService](../references/dev-services-joblock.md)**  
This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.
-   **[LockService](../references/dev-services-lock.md)**  
A node-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.
-   **[MessageService](../references/dev-services-message.md)**  
Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the repository.
-   **[MimetypeService](../references/dev-services-mimetype.md)**  
Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.
-   **[ModuleService](../references/dev-services-module.md)**  
A service to control and provide information about the currently-installed modules.
-   **[NamespaceService](../references/dev-services-namespace.md)**  
Provides access to and definition of namespace URIs and Prefixes.
-   **[NodeService](../references/dev-services-node.md)**  
Provides an API for managing nodes.
-   **[NodeLocatorService](../references/dev-services-nodelocator.md)**  
The NodeLocatorService looks up node locators registered via Spring configuration by name.
-   **[PermissionService](../references/dev-services-permission.md)**  
Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.
-   **[PersonService](../references/dev-services-person.md)**  
This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.
-   **[RenditionService](../references/dev-services-rendition.md)**  
Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content \(or other properties\) are changed. Examples of renditions include reformatted content \(essentially a transformation from one MIME-type to another\), rescaled images \(including thumbnails\), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.
-   **[RetryingTransactionHelper](../references/dev-services-retrying-transaction-helper.md)**  
A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.
-   **[SearchService](../references/dev-services-search.md)**  
This encapsulates the execution of search against different indexing mechanisms.
-   **[SiteService](../references/dev-services-site.md)**  
Provides an extensive API for managing sites in Alfresco Share.
-   **[TaggingService](../references/dev-services-tagging.md)**  
It is possible to tag \(a text label\) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.
-   **[TemplateService](../references/dev-services-template.md)**  
Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository \(passed as NodeRef string\) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.
-   **[TenantService](../references/dev-services-tenant.md)**  
Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.
-   **[VersionService](../references/dev-services-version.md)**  
Provides an API for managing the versions of a piece of content.
-   **[WorkflowService](../references/dev-services-workflow.md)**  
Provides a client-facing API for interacting with workflows and tasks.

**Parent topic:**[Java API](../concepts/dev-api-by-language-java.md)

**Parent topic:**[Java API](../concepts/java-public-api-list.md)

