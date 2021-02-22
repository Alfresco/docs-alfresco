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

-   **[../tasks/rm-search-text.md](../tasks/rm-search-text.md)**  

-   **[../tasks/rm-search-wildcards.md](../tasks/rm-search-wildcards.md)**  

-   **[../tasks/rm-search-multiple.md](../tasks/rm-search-multiple.md)**  

-   **[../tasks/rm-search-phrases.md](../tasks/rm-search-phrases.md)**  

-   **[../tasks/rm-search-exactterm.md](../tasks/rm-search-exactterm.md)**  

-   **[../tasks/rm-search-dates.md](../tasks/rm-search-dates.md)**  

-   **[../tasks/rm-search-daterange.md](../tasks/rm-search-daterange.md)**  

-   **[../tasks/rm-search-specialtypes.md](../tasks/rm-search-specialtypes.md)**  

-   **[../tasks/rm-search-emptystring.md](../tasks/rm-search-emptystring.md)**  

-   **[../tasks/rm-search-components.md](../tasks/rm-search-components.md)**  

-   **[../tasks/rm-search-operators.md](../tasks/rm-search-operators.md)**  


**Parent topic:**[Searching records](../concepts/rm-search.md)

