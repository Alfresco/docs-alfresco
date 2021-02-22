---
author: [Alfresco Documentation, Alfresco Documentation]
---

# VersionService

Provides an API for managing the versions of a piece of content.

|Information|VersionService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|If content has the aspect `versionable` applied to it, then multiple versions of the content can be managed. The VersionService provides an API to allow you to do this programmatically: -   **createVersion** - this creates a new version of the referenced node which is placed at the end of the appropriate version history. If the node has no version history then one is created and this version is considered to be the initial version.
-   **getVersionHistory** - this gets the version history that relates to the node referenced.
-   **deleteVersionHistory** - this deletes the version history for a versioned node.
-   **getCurrentVersion** - gets the current version for a referenced node.
-   **revert** - reverts the state of a referenced node to that of a previous node.
-   **restore** - restores a previously deleted node from a version in its version history.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/version/VersionService.html)|
|Java example|See Tutorials and Developer Blogs for example code.|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|[Mass Nerder's Version Pruning tutorial](http://www.massnerder.io/alfresco/2015/7/16/alfresco-version-pruning-behaviour) - includes code and a video.|
|Alfresco Developer Blogs|[Jared Ottley's Max Version Policy blog post](http://jared.ottleys.net/alfresco/alfresco-max-version-policy/) demonstrates using the VersionService from Java.|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

