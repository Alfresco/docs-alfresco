---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Preferences

A person's preferences in Alfresco.

## Preferences object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|id|string|The unique preference id.|
|value|Any JSON primitive value|Any JSON primitive value|The value of the preference.|

## Example of a preferences object

```

{
       "value":true,
       "id":"org.alfresco.share.sites.favourites.fred-bloggs-yourcompany-com"
}
```

## List order

Lists of these entities are returned ordered by ascending `id`.

-   **[Get a person's preferences](../../../pra/1/concepts/pra-people-get-preferences.md)**  
Use this to get a list of preferences for a specific person.
-   **[Get a preference](../../../pra/1/concepts/pra-people-get-preference.md)**  
Use this to get the value of a specific preference for a specific person.

**Parent topic:**[People](../../../pra/1/concepts/pra-people.md)

