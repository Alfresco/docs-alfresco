---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Using HTTP OPTIONS to get entity metadata

The Alfresco REST API supports the use of the HTTP OPTIONS method to retrieve structured information on the methods available on an entity and its relations.

## Method

For example, to get information on the `nodes` entity, the methods you can use on it, its children \(or relations\), and the methods you can use on those, you can invoke the following API method using the HTTP OPTIONS method:-

```

nodes
```

## Example request URL

A request to an on-premise Alfresco repository:

```

http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes
```

A request to Alfresco in the Cloud:

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes
```

To make the request your application will need to have a valid access token. See [Authentication for Alfresco Cloud](pra-authentication-cloud.md) for more information.

A cURL command line:

```

curl -u admin:admin http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes
```

## Response

-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```
{
  "list" : {
    "pagination" : {
      "count" : 4,
      "hasMoreItems" : false,
      "totalItems" : 4,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "metaData" : {
          "uniqueId" : "/nodes",
          "type" : "ENTITY"
        }
      }
    }, {
      "entry" : {
        "metaData" : {
          "uniqueId" : "/nodes/{entityId}/tags",
          "type" : "RELATIONSHIP",
          "operations" : [ {
            "httpMethod" : "POST",
            "title" : "Add the tag to the node with id 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            }, {
              "name" : "TAG",
              "required" : true,
              "title" : "The entity",
              "description" : "What shall we say?",
              "dataType" : "org.alfresco.rest.api.model.Tag",
              "allowMultiple" : false,
              "paramType" : "OBJECT"
            } ]
          }, {
            "httpMethod" : "GET",
            "title" : "A paged list of tags on the node 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          }, {
            "httpMethod" : "DELETE",
            "title" : "Remove the tag from the node with id 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          } ],
          "parentResource" : "/nodes"
        }
      }
    }, {
      "entry" : {
        "metaData" : {
          "uniqueId" : "/nodes/{entityId}/ratings",
          "type" : "RELATIONSHIP",
          "operations" : [ {
            "httpMethod" : "POST",
            "title" : "Apply a rating for node 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            }, {
              "name" : "NODERATING",
              "required" : true,
              "title" : "The entity",
              "description" : "What shall we say?",
              "dataType" : "org.alfresco.rest.api.model.NodeRating",
              "allowMultiple" : false,
              "paramType" : "OBJECT"
            } ]
          }, {
            "httpMethod" : "GET",
            "title" : "A paged list of ratings for node 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          }, {
            "httpMethod" : "GET",
            "title" : "Get the rating with id 'ratingSchemeId' for node 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            }, {
              "name" : "relationshipId",
              "required" : true,
              "title" : "The unique id of the entity relationship being addressed",
              "description" : "The unique id must be a String. It is only valid in the scope of the relationship",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          }, {
            "httpMethod" : "DELETE",
            "title" : "Missing @WebApiDescription annotation",
            "description" : "This method should be annotated with @WebApiDescription",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          } ],
          "parentResource" : "/nodes"
        }
      }
    }, {
      "entry" : {
        "metaData" : {
          "uniqueId" : "/nodes/{entityId}/comments",
          "type" : "RELATIONSHIP",
          "operations" : [ {
            "httpMethod" : "POST",
            "title" : "Create a comment for the node 'nodeId'.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            }, {
              "name" : "COMMENT",
              "required" : true,
              "title" : "The entity",
              "description" : "What shall we say?",
              "dataType" : "org.alfresco.rest.api.model.Comment",
              "allowMultiple" : false,
              "paramType" : "OBJECT"
            } ]
          }, {
            "httpMethod" : "GET",
            "title" : "Returns a paged list of comments for the document/folder identified by nodeId, sorted chronologically with the newest first.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          }, {
            "httpMethod" : "PUT",
            "title" : "Updates the comment with the given id.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            }, {
              "name" : "relationshipId",
              "required" : true,
              "title" : "The unique id of the entity relationship being addressed",
              "description" : "The unique id must be a String. It is only valid in the scope of the relationship",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            }, {
              "name" : "COMMENT",
              "required" : true,
              "title" : "The entity",
              "description" : "What shall we say?",
              "dataType" : "org.alfresco.rest.api.model.Comment",
              "allowMultiple" : false,
              "paramType" : "OBJECT"
            } ]
          }, {
            "httpMethod" : "DELETE",
            "title" : "Delete the comment with the given commentNodeId.",
            "parameters" : [ {
              "name" : "entityId",
              "required" : true,
              "title" : "The unique id of the entity being addressed",
              "description" : "The unique id must be a String. It is returned as an 'id' from the entity",
              "dataType" : "java.lang.String",
              "allowMultiple" : false,
              "paramType" : "TEMPLATE"
            } ]
          } ],
          "parentResource" : "/nodes"
        }
      }
    } ]
  }
}
```

**Parent topic:**[Alfresco REST API](../../../pra/1/topics/pra-welcome-aara.md)

