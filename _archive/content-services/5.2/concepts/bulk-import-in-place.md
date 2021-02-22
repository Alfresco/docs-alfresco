---
author: Alfresco Documentation
---

# In-place bulk import

The in-place bulk import feature imports files that already exist within the repository content store. As no copying is required, this gives significant performance improvements.

Three assumptions are made when importing content "in-place":

-   The content is already at its initial repository location prior to import, as it will be not be moved during the import.
-   The in-place content must be within the tree structure of a registered content store, as defined by either:
    -   the default fileContentStore
    -   a filesystem-based store defined by the content store selector
-   Steps have already been taken prior to import to ensure the content structure is well distributed.
    -   The default fileContentStore distributes content, based on the import date \(year/month/day/hour/minute\). This avoids having thousands of files under the same root, which is inefficient both for the file system and for computing parent associations in Alfresco Content Services \(among other things\).
    -   It is recommended you keep immediate children to a few thousands at a maximum.
    -   In order to choose an efficient distribution scheme, you should know that when m files are randomly distributed into n leaf folders, when m \>\> n log n the statistical maximum load of a leaf is m/n + O\( sqrt\(\(m log n\)/n\)\).

In addition, the in-place bulk import provides support for [Managing the content store](store-manage-content.md#). This allows you to select which store the content to import is to be found.

**Parent topic:**[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)

