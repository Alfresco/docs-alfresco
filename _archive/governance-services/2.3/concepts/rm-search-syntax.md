---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Advanced search options

As well as basic searches where you search for a specific word, you can also create more complex full text searches with multiple matches, tokens, phrases, wildcards, ranges, and grouping.

Full text searches can be very simple, using a text string, or you can do more complex searches with multiple matches, tokens, phrases, wildcards, ranges, and grouping. The search syntax follows the format:

```
<field-name>:<search-value>
```

-   `<field-name>` is the field within Records Management. For example, `identifier` is the field name for the unique record identifier.
-   `:` \(colon\) separates the field name from the search value. Make sure there's no space between the colon separator and the value.
-   `<search-value>` is the value that you want to search for.

Alfresco Records Management has a large number of fields to search against, see [Search field options](rm-search-fields.md) and [Search record type field options](rm-search-specialfields.md). The search query requires that you enter the internal name of these fields in the text box. The **Insert Field** menu list assists you when entering the fields.

To search for phrases, wrap the value string in "quotes". You can also use the wildcard matching characters, question mark \(?\) for a single character, and asterisk \(\*\) for zero or more characters to apply to any text value.

-   **[Searching for text](../tasks/rm-search-text.md)**  
To search for a simple text string in any record content, enter the text string.
-   **[Search using wildcards](../tasks/rm-search-wildcards.md)**  
An example of a simple wildcard query is to match any word starting with 'health' in any record name, title, description, or content.
-   **[Searching for multiple fields](../tasks/rm-search-multiple.md)**  
Multiple fields can be combined to match additional results. Each field, by default, will be OR combined with the previous.
-   **[Searching for phrases](../tasks/rm-search-phrases.md)**  
To search for phrases, wrap the value string in "double quotes". An example of phrase matching is to match the field `originator` with the phrase “John Smith”.
-   **[Searching for exact term](../tasks/rm-search-exactterm.md)**  
To search for exact terms, prefix the term with an equals symbol \(`=`\). An example of exact term matching is to match the word “part”.
-   **[Searching for dates](../tasks/rm-search-dates.md)**  
To search for date values, you can match date fields exactly.
-   **[Searching for date ranges](../tasks/rm-search-daterange.md)**  
To search for date values, you can match date fields in a range.
-   **[Searching for special types](../tasks/rm-search-specialtypes.md)**  
To search for special types, you can match the special type names using ASPECT.
-   **[Searching for empty strings](../tasks/rm-search-emptystring.md)**  
An example of searching for empty strings is to match all the empty Location fields.
-   **[Searching for components](../tasks/rm-search-components.md)**  
In the **Results options** section, the Components area allows you to select the type of components to search. You can search for Records, Record Folders, and Record Categories, as well as On Hold and Cut off records. For record searches, you can also search for incomplete records and vital records.
-   **[Searching using special operators](../tasks/rm-search-operators.md)**  
Additional special operators can form rich search queries. The following special operations are available:

**Parent topic:**[Searching records](../concepts/rm-search.md)

