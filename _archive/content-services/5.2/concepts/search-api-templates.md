---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# templates

CMIS `CONTAINS()` now supports templates. The `templates` element specifies the templates used for query expansion. A template is a way to define and abstract complex queries from the user.

It is similar to the `dismax` query parser in Solr but more powerful because a template can be treated as a field. Any number of templates are allowed. Template definitions cannot be circular.

For example, a template called `WOOF` defined as `%(cm:name cm:title)` allows `WOOF:example` to generate `cm:name:example cm:name:example`.

## Parameters

The parameters for the `templates` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`name`|String|The name of the template.|The default search language is `afts` but `cmis` and `lucene` are also supported. See [Alfresco Full Text Search Reference](rm-searchsyntax-intro.md).|
|`template`|String|The template itself.| |

## Examples

**Example 1:** Here's an example of specifying the template using the `templates` JSON body parameter:

```
"templates": [{"name": "_PERSON","template": "|%firstName OR |%lastName OR |%userName"},
              {"name": "mytemplate","template": "%cm:content"}]
```

**Example 2:** Here's an example of templates in CMIS `CONTAINS()`:

```
{
  "query": {
      "language": "cmis",
      "query": "select * from cmis:document where CONTAINS('alfresco')"
  },
  "include": ["properties"],
   "templates": [
    {
      "name": "TEXT",
      "template": "%cmis:name OR %cmis:description^200"
    }
  ]
}
```

In the above example, we have specified:

```
select * from cmis:document where CONTAINS('alfresco')
```

Previously, you could redefine what `alfresco` meant and the query will look in the `TEXT`, which is the default field.

Now, you can redefine `TEXT` to actually mean a name and a description, and if it matches the description then it should be given a higher relevance score. Here's the response to the query:

```
{
    "list": {
        "pagination": {
            "count": 67,
            "hasMoreItems": false,
            "totalItems": 67,
            "skipCount": 0,
            "maxItems": 100
        },
        "context": {},
        "entries": [
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:10.077+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 9148,
                        "encoding": "UTF-8"
                    },
                    "parentId": "f4dfccca-baae-42cb-8d95-cefd0701d774",
                    "createdAt": "2017-06-21T09:38:10.077+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.76890534
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "activities-email_es.ftl",
                    "location": "nodes",
                    "id": "f8607f66-5b1e-43b4-8458-d340f2d4462d",
                    "properties": {
                        "cm:title": "activities-email_es.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the activities email for Alfresco Share - Spanish version"
                    }
                }
            },
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.473+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 6069,
                        "encoding": "UTF-8"
                    },
                    "parentId": "f7217cfd-6ced-489c-af9f-c92884bf0e00",
                    "createdAt": "2017-06-21T09:38:11.473+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.76890534
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "invite-email.html.ftl",
                    "location": "nodes",
                    "id": "eb2592af-0dad-4acb-ac78-a41674ed51ce",
                    "properties": {
                        "cm:title": "invite-email.html.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the invite email for Alfresco Share - Default version"
                    }
                }
            },
            ...
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:12.278+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1106,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:12.278+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.0017449327
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_alfresco_zh_CN.ftl",
                    "location": "nodes",
                    "id": "df5f4f97-1825-4764-bdc7-e44f65f6d13b",
                    "properties": {
                        "cm:title": "emailbody_textplain_alfresco_zh_CN.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body
                         (\"text/plain\" part) - Simplified Chinese version"
                    }
                }
            }
        ]
    }
}
```

## Field Boosts

Field boosts changes the importance of different fields in a query. It provides a higher relevance score to a field.

**Example:** The following example shows that you can boost `content` relative to other fields by adding `^200` to `cm:content`.

```
{
    "query": {
        "language": "afts",
        "query": "WOOF:alfresco"
    },
    "include": ["properties"],
    "templates": [
        {
            "name": "WOOF",
            "template": "(%cm:name OR %cm:content^200 OR %cm:title OR %cm:description) AND TYPE:content"
        }
    ]
}
```

**Response**: In the response, the matching content will carry more weight than the matching name, title, or description.

```
{
    "list": {
        "pagination": {
            "count": 100,
            "hasMoreItems": true,
            "totalItems": 103,
            "skipCount": 0,
            "maxItems": 100
        },
        "context": {},
        "entries": [
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.773+0000",
                    "nodeType": "**cm:content**",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1067,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:11.773+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.36432934
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_share.ftl",
                    "location": "nodes",
                    "id": "a88e162c-4dfa-4561-a67d-fae54f16b033",
                    "properties": {
                        "cm:title": "emailbody_textplain_share.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body 
                         (\"text/plain\" part) for Alfresco Share - Default version"
                    }
                }
            },
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.824+0000",
                    "nodeType": "**cm:content**",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1091,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:11.824+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.36432934
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_share_de.ftl",
                    "location": "nodes",
                    "id": "3d02664c-87c7-4534-911c-61ec0c38daae",
                    "properties": {
                        "cm:title": "emailbody_textplain_share_de.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body 
                         (\"text/plain\" part) for Alfresco Share - German version"
                    }
                }
            },
            ...
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:12.230+0000",
                    "nodeType": "**cm:content**",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1330,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:12.230+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.0046951687
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_alfresco_ru.ftl",
                    "location": "nodes",
                    "id": "f208d4c1-0b5a-4cf1-b9a0-62aaa107a4ff",
                    "properties": {
                        "cm:title": "emailbody_textplain_alfresco_ru.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body 
                         (\"text/plain\" part) - Russian version"
                    }
                }
            }
        ]
    }
}
```

**Parent topic:**[Search API](../concepts/search-api.md)

**Related information**  


[Query templates in Share and Public API](query-template.md)

