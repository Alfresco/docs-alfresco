---
author: Alfresco Documentation
---

# Controlling permissions checking on search results

You can limit time that Alfresco Content Services spends on ensuring that the user executing the search has the necessary permissions to see each result. Setting this limit increases search speed and reduces the use of resources.

You can limit both the time spent and the number of documents checked before Alfresco Content Services returns a search query using the `system.acl.maxPermissionCheckTimeMillis` and the `system.acl.maxPermissionChecks` properties. The default values are 10000 and 1000 respectively.

1.  Open the <classpathRoot\>/alfresco-global.properties file.

2.  Set the `system.acl.maxPermissionCheckTimeMillis` property.

    For example, `system.acl.maxPermissionCheckTimeMillis=20000`.

3.  Set the `system.acl.maxPermissionChecks` property.

    For example, `system.acl.maxPermissionChecks=2000`.

    **Note:**

    -   If you increase these values and have a query that returns a very large number of results, \(a\) the search results will take longer to be returned to the user, and \(b\) the system will spend longer to check permissions, leading to the possibility of performance degradation.
    -   If you set these values to a low number, you run the risk of inconsistent search results every time you run the same search.
    -   These settings are also applied when paging. So paging the results will only go up to the maximum returned results based on these settings.

**Parent topic:**[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)

