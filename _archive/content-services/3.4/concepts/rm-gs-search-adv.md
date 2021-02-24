---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Records Management
---

# Creating advanced searches

The Search feature allows you to enter a full range of queries, from the very simple, single word queries, to complex and advanced queries.

Complex searches must follow the query search syntax defined for Records Management. This syntax is a full text search language, and is based on elements from the Lucene and SQL languages. It is possible to create queries that include multiple matches, tokens, phrases, wild-cards, ranges, and grouping.

The syntax follows the format:

```
<field-name>:<search-value>
```

Where:

-   `<field-name>` is the field within the Records Management repository, for example, `publicationDate:` is the field name for the record publication date.
-   `:` \(colon\) is the separator
-   `<search-value>` is the value that you wish to match

**Note:** Do not add a space between the colon separator and the search value.

-   **[Search using wildcards](../tasks/rm-search-wildcards.md)**  
An example of a simple wildcard query is to match any word starting with 'war' in any record name, title, description, or content.
-   **[Searching for multiple fields](../tasks/rm-search-multiple.md)**  
Multiple fields can be combined to match additional results, and each field, by default, will be OR combined with the previous.
-   **[Searching for phrases](../tasks/rm-search-phrases.md)**  
To search for phrases, wrap the value string in " double quotes". An example of phrase matching is to match the field `originator` with the phrase “John Smith”.
-   **[Searching for dates](../tasks/rm-search-dates.md)**  
To search for date values, you can match date fields exactly. Dates must be encoded in the FTS Alfresco query syntax. The **Insert Date** control helps you to insert dates without needing to use the encoding syntax.
-   **[Searching for date ranges](../tasks/rm-search-daterange.md)**  
To search for date values, you can match date fields in a range. Dates must be encoded in the FTS Alfresco query syntax.

**Parent topic:**[Searching for records](../tasks/rm-gs-search.md)

