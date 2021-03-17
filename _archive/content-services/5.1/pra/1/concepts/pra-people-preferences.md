---
author: Alfresco Documentation
---

# Preferences

A person's preferences in Alfresco.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/people](https://api-explorer.alfresco.com/api-explorer/#/people). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/people](http://localhost:8080/api-explorer/#/people).

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

**Parent topic:**[People](../../../pra/1/concepts/pra-people.md)

