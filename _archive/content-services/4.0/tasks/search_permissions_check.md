---
author: Alfresco Documentation
---

# Controlling permissions checking on search results in Share

This topic provides instructions on controlling permissions checking on search results in Share.

You can limit the amount of time Alfresco spends on ensuring that the user executing the search has the necessary permissions to see each result. Setting this limit increases search speed and reduces the use of resources.

You can limit both the time spent and the number of documents checked before Alfresco returns a search query. Alfresco uses the `system.acl.maxPermissionCheckTimeMillis` and the `system.acl.maxPermissionChecks` properties to set a limit to these values. The default values are 10000 and 1000 respectively.

To change these values:

1.  Browse to the <classpathRoot\> directory.

    For example, for Tomcat 6, browse to the $TOMCAT\_HOME/shared/classes/ directory.

2.  Open the alfresco-global.properties file.

3.  Add the `system.acl.maxPermissionCheckTimeMillis` property and the value you want it to contain.

    For example, `system.acl.maxPermissionCheckTimeMillis=20000`.

4.  Add the `system.acl.maxPermissionChecks` property and the value you want it to contain.

    For example, `system.acl.maxPermissionChecks=1000`.

    **Note:**

    -   If you increase these values and have a query that returns a very large number of results, \(a\) the search results will take longer to be returned to the user, and \(b\) the system will spend longer to check permissions, leading to the possibility of performance degradation.
    -   If you set these values to a low number, you run the risk of inconsistent search results every time you run the same search.

**Parent topic:**[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)

