# Search for an exact term

To search for an exact term you must prefix it with "=". The supported syntax:

-   `=term`
-   `=term1 =term2`
-   `=“multi term phrase”`

    **Note:** `=“multi term phrase”` returns documents only with the exact phrase and terms in the exact order.

-   `=field:term`
-   `=field:term1 =field:term2`
-   `=field:“multi term phrase”`

If you don’t specify a field the search runs against name, description, title, and content. If the field specified is `TOKENIZED=false`, only the full field is matched. If the field you specified is `TOKENIZED=TRUE` or `TOKENIZED=BOTH` then the search is run on the cross locale tokenized version of the field.

**Note:** If cross locale is not configured for the field then an exception occurs.

The list of the default supported types as declared in the <alfresco\_home\>/solr4/conf/shared.properties file:

`alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text`

`alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content`

`alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext`

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/searchsyntax-intro.md)

