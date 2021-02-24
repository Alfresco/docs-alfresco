---
author: Alfresco Documentation
---

# Remove a member of a site

Use this to remove a person's membership of a specific site.

## Method

Using the HTTP DELETE method:-

```
sites/<siteId>/members/<personId>
```

A personID is always the email address that they registered with

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com/members/fred.bloggs@yourcompany.com/
```

## Response

-   If the siteId or personId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the person is not a member of the site, an Bad Request \(status 400\) is returned.
-   If the request is successful an HTTP No Content is returned \(status 204\), and the person's site membership is removed.

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-members-methods.md)

