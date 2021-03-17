---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Including relations

Use the `relations` parameter to include one or more related entities in a single response.

The entity types in Alfresco are organized in a tree structure. So for example, the `sites` entity has two children, `containers` and `members`. You can reduce network traffic by using the `relations` parameter to include one or more child entities in a single response. The parameter is a comma separated list of entity types

```
relations=entity1,entity2,...
```

If you you invoked the following API method using the HTTP GET method:

```

         sites?relations=containers,members
```

Alfresco returns a list of site objects, and retrieves the child container and member objects for each site in the returned collection, and returns them in a peer object of the entry object containing the site. Here is an example of the returned JSON:

```
{
  "list" : {
    "pagination" : {
      "count" : 2,
      "hasMoreItems" : false,
      "totalItems" : 2,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "id" : "test",
        "title" : "test",
        "visibility" : "PUBLIC"
      },
      "relations" : {
        "containers" : {
          "list" : {
            "pagination" : {
              "count" : 1,
              "hasMoreItems" : false,
              "totalItems" : 1,
              "skipCount" : 0,
              "maxItems" : 100
            },
            "entries" : [ {
              "entry" : {
                "id" : "5b0d84c8-0749-4fee-bd4f-9134d6990e5b",
                "folderId" : "documentLibrary"
              }
            } ]
          }
        },
        "members" : {
          "list" : {
            "pagination" : {
              "count" : 2,
              "hasMoreItems" : false,
              "skipCount" : 0,
              "maxItems" : 100
            },
            "entries" : [ {
              "entry" : {
                "id" : "fred-bloggs@yourcompany.com",
                "person" : {
                  "enabled" : true,
                  "lastName" : Bloggs",
                  "id" : "fred.bloggs@yourcompany.com",
                  "email" : "fred.bloggs@yourcompany.com",
                  "company" : {
                  },
                  "firstName" : "Fred"
                },
                "role" : "SiteManager"
              }
            }, {
              "entry" : {
                "id" : "joe-bloggs@yourcompany.com",
                "person" : {
                  "enabled" : true,
                  "lastName" : "Bloggs",
                  "id" : "joe.bloggs@yourcompany.com",
                  "email" : "joe.bloggs@yourcompany.com",
                  "company" : {
                  },
                  "firstName" : "Joe"
                },
                "role" : "SiteConsumer"
              }
            } ]
          }
        }
      }
    }, {
      "entry" : {
        "id" : "fred-bloggs-yourcompany-com",
        "title" : "Fred Bloggs's Home",
        "visibility" : "PRIVATE",
        "description" : "Fred Bloggs's private home site."
      },
      "relations" : {
        "containers" : {
          "list" : {
            "pagination" : {
              "count" : 1,
              "hasMoreItems" : false,
              "totalItems" : 1,
              "skipCount" : 0,
              "maxItems" : 100
            },
            "entries" : [ {
              "entry" : {
                "id" : "289f9030-eef6-421f-bdb6-1e6d2da165b6",
                "folderId" : "documentLibrary"
              }
            } ]
          }
        },
        "members" : {
          "list" : {
            "pagination" : {
              "count" : 1,
              "hasMoreItems" : false,
              "skipCount" : 0,
              "maxItems" : 100
            },
            "entries" : [ {
              "entry" : {
                "id" : "fred.bloggs@alfresco.com",
                "person" : {
                  "enabled" : true,
                  "lastName" : "Bloggs",
                  "location" : "Somewhere",
                  "avatarId" : "85d45e64-eb02-44e1-b989-dbf571ab0704",
                  "instantMessageId" : "fredb",
                  "googleId" : "fredb@gmail.com",
                  "id" : "fred.bloggs@alfresco.com",
                  "skypeId" : "fredb",
                  "email" : "fred.bloggs@alfresco.com",
                  "description" : "Been with company for n years",
                  "company" : {
                    "organization" : "Your Company",
                    "address1" : "Some place",
                    "address2" : "Somewhere",
                    "postcode" : "Z99 9Z9",
                    "telephone" : "01234 123456",
                    "fax" : "01234 123457",
                    "email" : "info@yourcompany.com"
                  },
                  "firstName" : "Fred",
                  "telephone" : "01234 567890",
                  "jobTitle" : "VP of something",
                  "mobile" : "07777 567890"
                },
                "role" : "SiteManager"
              }
            } ]
          }
        }
      }
    } ]
  }
}
```

**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

