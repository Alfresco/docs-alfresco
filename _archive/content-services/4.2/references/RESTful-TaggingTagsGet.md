---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# List all tags

Get the currently available tags for the specified store.

`GET /alfresco/service/api/tags/{store_type}/{store_id}?tf={tag_filter?}&details={details?}&from={from?}&size={size?}`



-   **tag\_filter**

    The optional tag filter limits the returned tags to those containing the filter.

-   **details**

    The optional boolean parameter indicates whether the details of the tag should be provided in the resulting JSON, otherwise just the tag name is returned.


The web script description document specifies the following options:

|`json`|The default response format|
|`user`|The authentication access|
|`required`|The transaction level|
|`argument`|The format style|

**Parent topic:**[Tagging](../references/RESTful-Tagging.md)

