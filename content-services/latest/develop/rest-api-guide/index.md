---
title: ReST API Guide
nav: false
---

The Alfresco ReST API version 1.0 is a complete application interface that gives you access to all the features of the 
Alfresco Repository. When building remote extensions the Alfresco ReST API is the preferred interface.

The endpoint to access the API has the following format:

![dev-api-by-language-alf-rest-intro-1]({% link content-services/images/dev-api-by-language-alf-rest-intro-1.png %})

If you are accessing a local Repository the endpoint URL will most likely look like follows for a standard Repository 
installation: `https://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/...`

The tenant part will always be `-default-`, unless you are running a multi-tenant Alfresco solution where you would 
specify what tenant you want to operate against.

The scope is important and it denotes the accessibility of the API, `public` means it is allowed to use and `private` 
means that the API is for internal Alfresco use only (can change at any time). You can add your own scope, such as 
`extension`, for your own APIs. The Alfresco ReST API actually contains a number of APIs and the Core API is denoted by 
the `/alfresco` path. You also have the Search, Workflow, Discovery, and Authentication APIs.

To work with an object in the Repository, such as a folder or file node, you will append to this URL as follows:

![dev-api-by-language-alf-rest-intro-2]({% link content-services/images/dev-api-by-language-alf-rest-intro-2.png %}){:height="150px" width="500px"}

An object in the Repository is referred to as an Entity. Which specific instance of an *entity* type you are working 
with is specified as part of the URL path (i.e. `{id}`). There can be Relationships between Entities and Operations 
applied to Entities, which are also specified as part of the URL (i.e. `children`, `copy`).

This section provides information about Alfresco ReST API version 1.0 and how to use it.

To get started with the API follow these steps:

1. [Read things to know before you start](#things-to-know)
2. [Install the ReST API Explorer]({% link content-services/latest/develop/rest-api-guide/install.md %})
3. [Install a tool for making API calls]({% link content-services/latest/develop/rest-api-guide/install.md %}#http)
4. [Install a tool to format JSON responses]({% link content-services/latest/develop/rest-api-guide/install.md %}#json)
5. [Authenticate with the Repository to get a token]({% link content-services/latest/develop/rest-api-guide/install.md %}#auth)
6. [Get Repository Info to see what is supported]({% link content-services/latest/develop/rest-api-guide/get-repo-info.md %}) - which uses and tests the auth token

## Things to know before you start {#things-to-know}

The Alfresco ReST API endpoints share many features, such as the format for collection responses, how to sort and order 
responses, how to limit results, how to request optional information, etc.

So it makes sense to know about these features before you start using the API, as sometimes documentation might not cover 
all these common features, and you would then have to resort to the API Explorer reference.

### The API Explorer is your source of truth

The reference documentation for the Alfresco ReST API is available in what is referred to as the API Explorer application. 
This application is available for each version of ACS.

If you are confused about what API endpoints that are supported for a specific version of ACS, then install the 
associated API Explorer and check if the API endpoint is available. If you are wondering about specific API endpoint 
details, and you cannot find any information about it anywhere, consult the API Explorer.

You can find more information about the API Explorer on [this page]({% link content-services/latest/develop/rest-api-guide/install.md %}), 
which also has information on how to install it for your specific version of ACS.

If you want to know what the API Explorer looks like right now, then have a look at the online version at [https://api-explorer.alfresco.com/api-explorer](https://api-explorer.alfresco.com/api-explorer){:target="_blank} (note that this API Explorer always shows the API for the latest version of ACS).

### Finding out if an API endpoint is supported in a specific ACS version

The majority of the API endpoints have information in the Open API specification (i.e. Swagger docs) about what 
version of ACS that is required (i.e. in the API Explorer).

This version information is usually available in the beginning of the API endpoint description, as in the following screenshot:

![dev-api-by-language-alf-rest-acs-required-version-1]({% link content-services/images/dev-api-by-language-alf-rest-acs-required-version-1.png %})

Note that an API endpoint can be supported from a specific patch version of ACS, such as in the following screenshot:

![dev-api-by-language-alf-rest-acs-required-version-2]({% link content-services/images/dev-api-by-language-alf-rest-acs-required-version-2.png %})

If you are running an earlier version of ACS, which doesn't support the API endpoint, then you would need to upgrade 
your ACS installation before starting to use this endpoint.

### Tickets

It's common to use HTTP basic authentication when trying out the ReST API.

However, the basic auth mechanism provides no confidentiality protection for the transmitted credentials. They are 
merely encoded with Base64 in transit, but not encrypted or hashed in any way. Therefore, basic Authentication is 
typically used in conjunction with HTTPS to provide confidentiality.

Alfresco ReST API also provides another way of authenticating with the repository. The APIs also support the 
Alfresco ticket mechanism. You can POST the following body to `http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets` 
to create a new ticket:

```json
{
  "userId": "admin",
  "password": "admin"
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍
```

The response provides the ticket in the `id` property:

```json
{
  "entry": {
    "id": "TICKET_ed4981b4bbb15fc2713f7caaffd23982d0dd4e5c",
    "userId": "admin"
  }
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍
```

This ticket can then be used instead of a username and password. Although the ReST API supports the `alf_ticket` 
query parameter, we do not recommend using it, a more secure approach is to use a HTTP header. The basic auth mechanism 
is still used i.e. sending an `Authorisation` header. However, the base64 encoded username/password is replaced with 
the base64 encoded ticket.

How to get a ticket and how to use it is explained [here]({% link content-services/latest/develop/rest-api-guide/install.md %}#auth) 
in the ReST API user guide.

### JSON with Padding (JSONP)
The `allow.unsecure.callback.jsonp` property controls if the JSONP feature is supported or not, it is `false` by default.
If set to `true`, then the `callback` query parameter on a ReST call will be accepted. This parameter is used by JSONP
to encapsulate a JSON response with a javascript function.

>**Important!:** If JSONP is enabled by setting the `allow.unsecure.callback.jsonp` to `true`, then this can lead to a security issue.

The following table explains how the ReST API behaves depending on the setting of this property:

|property value|`callback` parameter|result|
|--------------|------------------|------|
|`false`|existing|HTTP 403 with an error message, operation cancelled|
|`false`|non existing|operation executed as usual|
|`true`|existing|operation executed as usual|
|`true`|non existing|operation executed as usual|

The `allow.unsecure.callback.jsonp` property is set in the `alfresco-global.properties` configuration file.

### Limiting result items

By default the API will return a maximum of 100 result items in any one request, this can be controlled via the 
`maxItems` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?maxItems=5` request 
shows how you can limit the number of result items to five.

This query parameter is supported across all collection endpoints.

### Skipping result items

By default the API will return result items starting from the beginning, it's possible to skip any number of result 
items using the `skipCount` query parameter. This is typically used for implementing paging or infinite scrolling in clients.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?skipCount=2` request 
shows how you can skip the first two result items.

This query parameter is supported across all collection endpoints.

### Ordering result items

All collection endpoints (those returning a list of result items) will have a default sort order. It's possible to 
change the sort order on some endpoints via the `orderBy` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?orderBy=sizeInBytes DESC` 
request shows how you can order the nodes in your home folder by the size of the content, starting with the largest item.

The direction of the sorting can be controlled by the `DESC` (descending) and `ASC` (ascending) keywords.

As previously mentioned, not all endpoints allow ordering to be controlled so you'll need to consult the API Explorer to 
see whether the `orderBy` parameter is supported and what properties within the response that can be used.

### Filtering result items

Sometimes only a subset of the response items are required, several endpoints support this via the `where` query parameter.

The `where` parameter allows you to provide one or more clauses defining what items you want to see in the response. 
The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?where=(isFile=true)` 
request shows how you can limit the nodes in your home folder to just the files.

The `where` parameter is specific to each endpoint so you'll need to consult the API Explorer to see firstly, whether 
the `where` parameter is supported and secondly, what expressions and clauses can be used.

### Requesting optional item information

We have taken what we're calling a "performance first" approach with the API. This means that each endpoint, by default, 
only returns the item information that is efficient to retrieve.

If additional processing is required on the server side to obtain the item information, then it's made available via 
the `include` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?include=properties,aspectNames` 
request shows how you can also include the properties and aspects for each node in your home folder when listing its children.

As with the `orderBy` and `where` parameters, the `include` parameter is specific to the endpoint so you'll need to 
consult the API Explorer to see what extra item information is available.

### Limiting the item information

Sometimes bandwidth is a major consideration, such as when building a mobile client.

To cater for this scenario the API allows you to control the amount of item data sent over the wire via the `fields` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?fields=id,name` request 
shows how you can limit the item response to only contain the `id` and `name` properties as shown in the response below:

```json
{
  "list": {
    "pagination": {
      "count": 3,
      "hasMoreItems": false,
      "totalItems": 3,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "name": "A Folder",
          "id": "a5634765-ab0f-438a-8efd-bfa4139da8aa"
        }
      },
      {
        "entry": {
          "name": "lorem-ipsum.txt",
          "id": "5516aca4-df8b-43e8-8ff3-707316c60c6e"
        }
      },
      {
        "entry": {
          "name": "image.jpg",
          "id": "fc132aa5-6281-40bf-adee-5731e6ecb653"
        }
      }
    ]
  }
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍
```

The `fields` parameter works in conjunction with the `include` parameter so you don't have to repeat yourself. For example, 
say you want to include the `id`, `name` and the optional `aspectName` properties in the response. It's then possible 
to use the `fields=id,name&include=aspectNames` query parameter string. No need to specify the `aspectName` value again 
in the `fields` parameter.

The `fields` parameter is supported universally across all endpoints.

### Person id alias

There are several endpoints across the API that expect a person id as part of the URL, this is OK if the client knows 
the person id, but there are some scenarios where it might not be known, for example when using tickets.

For this scenario the API supports the `-me-` alias which can be substituted in any URL that expects `personId`.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/-me-` request shows how this can be 
used to retrieve the profile information of the currently authenticated user.

### Well known node id aliases

There are several endpoints across the API that expect a node id as part of the URL, this is OK if the client knows the 
node id, but there are some scenarios where it might not be known, for example when starting to navigate the folder hierarchy.

For this scenario the API supports the following node id aliases:

* `-root-`: corresponds to the node id for the `/Company Home` folder.
* `-shared-`: corresponds to the node id for the `/Company Home/Shared` folder.
* `-my-`: corresponds to the node id for the current user's home folder (i.e. `/Company Home/User Homes/{userid}`).

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children` request shows how 
you can list the contents (children) of the `/Company Home` folder without knowing its node id.

### Creating multiple entities (items)

Supporting batch operations, such as updating the metadata for multiple items simultaneously, is something we plan to 
support in the future. However it's a little known fact that the API already has some basic batch capabilities when it 
comes to creating entities.

Most POST endpoints that create entities actually allow an array of objects to be passed in the body, which creates each 
one individually, *but within the same transaction*.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children` request shows how two 
folders can be created with the one request by passing the body shown below:

```json
[
  {
    "name": "Folder One",
    "nodeType": "cm:folder"
  },
  {
    "name": "Folder Two",
    "nodeType": "cm:folder"
  }
]‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍
```

The API returns a standard listing response providing the details on each entity that was created, in this case, the two folders:

```json
{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "aspectNames": [
            "cm:auditable"
          ],
          "createdAt": "2017-04-12T10:31:12.477+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "modifiedAt": "2017-04-12T10:31:12.477+0000",
          "modifiedByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "name": "Folder One",
          "id": "ecbec6fd-a273-4978-9b95-00a8e783948e",
          "nodeType": "cm:folder",
          "parentId": "062b8b2a-aa7e-4cdd-bfec-7fbcd16ecd85"
        }
      },
      {
        "entry": {
          "aspectNames": [
            "cm:auditable"
          ],
          "createdAt": "2017-04-12T10:31:12.501+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "modifiedAt": "2017-04-12T10:31:12.501+0000",
          "modifiedByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "name": "Folder Two",
          "id": "18c82e9b-5a2f-44bf-bc77-1aca7346a24a",
          "nodeType": "cm:folder",
          "parentId": "062b8b2a-aa7e-4cdd-bfec-7fbcd16ecd85"
        }
      }
    ]
  }
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍
```

If the endpoint does not support creating multiple entities an error is returned.

### Including the source entity for a collection

When returning a relationship collection for an entity, for example the children of a node or the members of a site, 
details of the entity are not included by default, to include them you can use the `includeSource` query parameter.

The `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?includeSource=true` 
request shows how you'd include details of the user's home folder when listing its children, shown below in the `source` property:

```json
{
  "list": {
    "pagination": {
      "count": 12,
      "hasMoreItems": false,
      "totalItems": 12,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [ ... ],
    "source": {
      "name": "test",
      "createdAt": "2017-02-20T11:01:39.647+0000",
      "modifiedAt": "2017-04-12T10:31:12.509+0000",
      "createdByUser": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "modifiedByUser": {
        "id": "test",
        "displayName": "Test User"
      },
      "isFolder": true,
      "isFile": false,
      "aspectNames": [
        "cm:ownable",
        "cm:auditable"
      ],
      "properties": {
        "cm:owner": {
          "id": "test",
          "displayName": "Test User"
        }
      },
      "nodeType": "cm:folder",
      "parentId": "a9ad3bc4-d30f-4910-bee0-63d497e74a22",
      "id": "062b8b2a-aa7e-4cdd-bfec-7fbcd16ecd85"
    }
  }
}
```

Another example is returning details of a site when listing it's members, to do that you'd use the 
`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/swsdp/members?includeSource=true` URL.

The `includeSource` parameter is supported for all endpoints that include an entity and a relationship collection.
