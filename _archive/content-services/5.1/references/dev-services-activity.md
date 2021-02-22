---
author: [Alfresco Documentation, Alfresco Documentation]
---

# ActivityService

The ActivityServices is responsible for generating activity feeds for each member of a Share site. The activities generated include such events as a document was added, a document was previewed, the wiki was updated.

|Information|ActivityService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|What is an activity?

 -   Activity represents an action that has taken place within an Alfresco client interface \(app/tool\)
-   Activity is typically initiated by the Alfresco app/tool/component/service on behalf of a user \(it is not necessarily initiated by the underlying repository\)
-   Activity is of a given/named type specified by the Alfresco app/tool \(for example document added\)
-   Activity is performed at a particular point in time \(post date\)
-   Activity may have associated data dependent on type of activity
-   Activity may be performed within a given site/network context
-   Activity may be performed within a given app/tool context
-   Activity may be sensitive, that is, associated with data that is permission controlled, therefore, the activity itself may be permission controlled \(can or can't be read\)
-   Activity may be rendered into one or more UI views \(activity summary\)

 Activities may be raised by one or more Alfresco applications. The posted activity must have a uniquely named activity type.

 Examples of activity types include:

 -   Added, updated, and deleted documents
-   Triggered on versioning
-   Includes changes to metadata \(explicitly denoted in feed\)
-   Does not include updates to tags
-   Uploaded and expanded ZIP
-   Added and deleted folders
-   Added and removed members \(person joined/left site\)
-   User role changes \(change of user role for a site\)
-   New comments \(on any artifact in a site, including documents, blog entries, etc.\)
-   Workflow-generated activities \(requires explicit posting via customizing workflow definition\)
-   Added, updated, and deleted events \(calendar entries\)
-   Published, updated, and deleted wiki pages
-   Published, updated, and deleted blog entries
-   Blog entry published to external blog engine

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/index.html?org/alfresco/service/cmr/activities/ActivityService.html)|
|Java example|None|
|More Information|None|
|Tutorials|See [this blog post](http://alfresco.blog.redpill-linpro.com/2015/11/26/posting-custom-events-to-the-activity-feed/).|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

