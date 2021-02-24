---
author: Alfresco Documentation
---

# Get information about a person

Get information about a specific person.

## Method

Using the HTTP GET method:

```
people/<personId>
```

A personID is always the email address that they registered with

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/people/fred.bloggs@yourcompany.com
```

## Response

-   If the personId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```

{
   "entry":{
      "enabled":true,
      "lastName":"Bloggs",
      "location":"Someplace",
      "avatarId":"93df15f5-dee2-4bfe-8f1d-f0026d548f86",
      "instantMessageId":"fredb",
      "googleId":"fred.bloggs@gmail.com",
      "id":"fred.bloggs@yourcompany.com",
      "skypeId":"fredb",
      "description":"A generic person",
      "company":{
         "organization":"Alfresco",
         "address1":"address",
         "postcode":"post code",
         "telephone":"0123 456789",
         "fax":"0123 456789",
         "email":"enquiries@yourcompany.com"
      },
      "firstName":"Fred",
      "telephone":"0123 456777",
      "jobTitle":"VP of something",
      "mobile":"0777 456777"
   }
}
```

Note that the response object is an entry containing a [person](pra-people.md) entity with an embedded company entity.

**Parent topic:**[Methods](../../../pra/1/concepts/pra-people-methods.md)

