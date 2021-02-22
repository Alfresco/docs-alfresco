---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [CMIS, services, API/Script]
keyword: [CMIS, query]
---

# CMIS query

A CMIS query is based upon SQL-92. The query is read-only and presents no data manipulation capabilities.

The syntax consists of the following clauses:

-   `SELECT` with a target list
-   `FROM` with the object types being queried
-   `JOIN` to perform a join between object types
-   `WHERE` with the predicate
-   `IN` and `ANY` to query multi-value properties
-   `CONTAINS` to specify a full-text qualification
-   `IN_FOLDER` and `IN_TREE` to search within a folder hierarchy
-   `ORDERBY` to sort the results

The CMIS query maps the object type into a relational structure where object type approximates a table, the object approximates a row, and the property approximates a column that can be multi-valued. You can query the actual binary content using a full text query and folder path information using the `in_folder` and `in_tree` functions.

A query can also be paged for user interface presentation.

**Parent topic:**[Building applications with Content Management Interoperability Services \(CMIS\)](../concepts/cmis-about.md)

