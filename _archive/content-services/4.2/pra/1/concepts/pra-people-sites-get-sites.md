---
author: Alfresco Documentation
---

# Get a list of a person's site memberships

Use this to get a list of sites that a specific person is a member of.

## Method

Using the HTTP GET method:-

```

people/<personId>/sites
```

A personID is always the email address that they registered with.

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/sites
```

## Response

-   If the personId or the siteId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
  "list" : {
    "pagination" : {
      "count" : 2,
      "hasMoreItems" : false,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "site" : {
          "id" : "general-test-site",
          "title" : "General Test Site",
          "visibility" : "PRIVATE",
          "description" : "Test Site"
        },
        "id" : "general-test-site",
        "role" : "SiteCollaborator"
      }
    }, {
      "entry" : {
        "site" : {
          "id" : "fred-bloggs-yourcompany-com",
          "visibility" : "PRIVATE",
          "description" : "Fred Bloggs's private home site."
        },
        "id" : "fred-bloggs-yourcompany-com",
        "role" : "SiteManager"
      }
    } ]
  }
}
```

Note that each entry in the response list is a [Members](pra-sites-members.md) entity with an embedded [Sites](pra-sites.md) entity.

**Parent topic:**[Sites](../../../pra/1/concepts/pra-people-sites.md)

