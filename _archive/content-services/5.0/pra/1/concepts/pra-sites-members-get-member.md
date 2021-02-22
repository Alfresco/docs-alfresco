---
author: Alfresco Documentation
---

# Get information for a member of a site

Use this to get information for a specific member of a specific site.

## Method

Using the HTTP GET method:

```
sites/<siteId>/members/<personId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com/members/fred.bloggs@yourcompany.com
```

## Response

-   If the siteId or personId do not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

   {
      "entry":{
         "role":"SiteManager",
         "id":"fred.bloggs@yourcompany.com",
         "person":{
               "enabled":true,
               "lastName":"Bloggs",
               "location":"Somewhere",
               "avatarId":"6be34757-5764-4a4b-a86c-f5f0878b9700",
               "instantMessageId":"fred",
               "googleId":"fred@google.com",
               "id":"fred.bloggs@yourcompany.com",
               "skypeId":"fredbloggs",
               "email":"fred.bloggs@yourcompany.com",
               "description":"a person",
               "company":{
                  "organization":"alfresco",
                  "address1":"somewhere",
                  "postcode":"fff fff",
                  "telephone":"01234 456789",
                  "fax":"01234 456789",
                  "email":"info@yourcompany.com"
               },
               "firstName":"Fred",
               "telephone":"01234 99229922",
               "jobTitle":"Chief Bottle Washer",
               "mobile":"07777 012345"
         }
   }
```

**Parent topic:**[Methods](../../../pra/1/concepts/pra-sites-members-methods.md)

