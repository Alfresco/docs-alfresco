---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Search query syntax

The syntax for Alfresco Records Management queries is based on the `fts-alfresco` Full Text Search \(FTS\) language, which is based on elements from the Lucene and SQL languages.

The FTS queries can be very simple, using a text string, but the language also supports complex queries with multiple matches, tokens, phrases, wildcards, ranges, and grouping. The syntax follows the format:

```
<field-name>:<search-value>
```

Where

`<field-name>` is the field within the Alfresco Records Management repository. For example, `identifier` is the field name for the unique Record identifier.

`:` \(colon\) is the separator

`<search-value>` is the value that you wish to match. Ensure that there is no space between the colon separator and the value.

The Alfresco Records Management model provides a large number of fields against which to search. The search query requires that you enter the internal name of these fields in the text box. The **Insert Field** menu list assists you when entering the fields.

To search for phrases, wrap the value string in "quotes". You can also use the wild card matching characters, question mark \(?\) for a single character, and asterisk \(\*\) for zero or more characters, to apply to any text value.

-   **[Search for text](../tasks/rm-search-text.md)**  
To search for a simple text string in any record content, enter the text string.
-   **[Search using wildcards](../tasks/rm-search-wildcards.md)**  
An example of a simple wildcard query is to match any word starting with 'war' in any record name, title, description, or content.
-   **[Searching for multiple fields](../tasks/rm-search-multiple.md)**  
Multiple fields can be combined to match additional results, and each field, by default, will be OR combined with the previous.
-   **[Searching for phrases](../tasks/rm-search-phrases.md)**  
To search for phrases, wrap the value string in " double quotes". An example of phrase matching is to match the field `originator` with the phrase “John Smith”.
-   **[Searching for exact term](../tasks/rm-search-exactterm.md)**  
To search for exact terms, prefix the term with an equals symbol \(`=`\). An example of exact term matching is to match the word “part”.
-   **[Searching for dates](../tasks/rm-search-dates.md)**  
To search for date values, you can match date fields exactly. Dates must be encoded in the FTS Alfresco query syntax. The **Insert Date** control helps you to insert dates without needing to use the encoding syntax.
-   **[Searching for date ranges](../tasks/rm-search-daterange.md)**  
To search for date values, you can match date fields in a range. Dates must be encoded in the FTS Alfresco query syntax.
-   **[Searching for special types](../tasks/rm-search-specialtypes.md)**  
To search for special types, you can match the special type names using ASPECT.
-   **[Searching for empty strings](../tasks/rm-search-emptystring.md)**  
An example of searching for empty strings is to match all the empty Location fields.
-   **[Searching for components](../tasks/rm-search-components.md)**  
In the Results options, the Components area allows you to select the type of components to search. You can search for Records, Record Folders, Record Categories, Record Series, plus, Frozen, and Cutoff records. For record searches, you can also search for undeclared records and vital records.
-   **[Searching using special operators](../tasks/rm-search-operators.md)**  
Additional special operators can form rich search queries. The following special operations are available:

**Parent topic:**[Searching records](../concepts/rm-search.md)

