---
author: Alfresco Documentation
---

# In-Place bulk import

In-place import is available in Alfresco Enterprise only. It imports files that already exist within the repository content store. As no copying is required, this can result in a significant performance improvement.

Three assumptions are made when importing content in-place.

-   The content is already at its initial repository location prior to import, and it will be **not** be moved during the import.
-   The in-place content must be within the tree structure of a registered content store, as defined by either:
    -   the default fileContentStore
    -   a file system-based store defined by the content store selector
-   The content structure is well distributed, for example:
    -   The default fileContentStore distributes content based on the import date \(year/month/day/hour/minute\). This avoids having thousands of file under the same root, which is inefficient both for the file system and for computing parent associations in Alfresco.
    -   It is recommended you keep immediate children to a few thousands maximum.
    -   To choose an efficient distribution scheme, you should know that, when m files are randomly distributed into n leaf folders, when m \>\> n log n the statistical maximum load of a leaf is m/n + O\( sqrt\(\(m log n\)/n\)\).

In addition, in-place bulk import provides support for [Managing the content store](store-manage-content.md#). This allows you to select under which store the content to import is to be found.

**Parent topic:**[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)

