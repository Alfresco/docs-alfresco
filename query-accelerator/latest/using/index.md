---
title: Updating and replacing query sets
---

## Removing a query set

You can remove a query set by performing its removal in the Alfresco Administration Console. There is no need to perform
 a refresh after the query set removal, however the JSON config file should be manually removed from the config directory.

During the refresh the JSON config files will be compared against the internal registry of query sets. If a query set in
the registry does not have a corresponding JSON config file with the same tableName then a warning will be logged.
The denormalized database table will NOT be dropped. 

## Updating a query set

You can update/replace a query set by changing the properties, aspects and compositeIndexes in the query set JSON config.

You then need to update the version in the query set JSON config and then perform a query set refresh in the
Alfresco Administration Console.

This will start a process that will replace the previous version of the query set.
* A new version of the query set will be added to the internal query set registry.
* A new version of the denormalized table will be created.
* The denormalized table for the previous version will continue in-use until it has been replaced by the new version.
* The new version of the denormalized table will be populated. This could take a considerable time depending on the scale 
of the Alfresco installation.
* When the population is completed
    * the query set will be flagged as live
    * the previous version of the query set will be flagged as retired
    * the denormalized table for the previous version can now be dropped manually via the Remove Query Set button in the
    Admin Console 

 > **Important:** If you edit a query set config and change the name and request a query set refresh, the system will see this as the retirement of the original query set and the creation of a new one.

## Query Set Refresh in Alfresco Administration Console

The query sets can be refreshed in the Alfresco Administration Console.

1 Select 'Query Accelerator' in the left hand menu.

![Admin Console]({% link query-accelerator/images/admin-console-menu.png %})

2 Press the 'Refresh Query Set' button.

![Refresh Query Set]({% link query-accelerator/images/refresh-query-set.png %})

If there are updates to the query sets in the folder defined by `queryAccelerator.config.dir` (normally
`shared/classes/alfresco/extension/querysets`) you will see:

![Refresh Started]({% link query-accelerator/images/refresh-query-set-started.png %})

If there are no updates to the query sets you will see:

![Refresh Not Started Set]({% link query-accelerator/images/refresh-query-set-not-started.png %})

## Query Set Remove in Alfresco Administration Console

The query sets can be removed in the Alfresco Administration Console.

1 On the Query Accelerator page, complete the query set name and version text fields.

![Remove Query Set]({% link query-accelerator/images/remove-query-set.png %})

2 Press the 'Remove Query Set' button.

If the query set is successfully removed you will see:

![Refresh Query Set]({% link query-accelerator/images/refresh-query-set.png %})

If no matching query set was found you will see:

![RefQuery Set Note Removed]({% link query-accelerator/images/query-set-not-removed.png %})
