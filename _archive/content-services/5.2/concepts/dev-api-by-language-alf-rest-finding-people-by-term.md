---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Finding people by a term

Simple search for people with a term.

|API Call|GET queries/people?term=\{search term\}&orderBy=\{field\}|
|--------|---------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/queries/findPeople](http://localhost:8080/api-explorer/#!/queries/findPeople)|
|See also|[Complex search](dev-api-by-language-alf-rest-finding-content-by-search-query.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

The `/queries` endpoints are designed to be very simple to use and usable in "live search" scenarios. Meaning they can be executed upon each key press so clients can show results as the user types. The actual query used behind the scenes is hard-coded, if complex or custom queries are required the /search API should be used, which this section also covers.

To find people by specifying a term \(i.e. a word\) you use a GET call as follows:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/queries/people?term=\{search-term\}&orderBy=\{field\}**

This simple search query will look in the person id, first name, and last name properties for a match. Let’s say we look for people that have "jackson" in their username \(id\), first name or last name. We can then search as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/queries/people?term=jackson&orderBy=lastName' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   831    0   831    0     0   1613      0 --:--:-- --:--:-- --:--:--  1613
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "lastName": "Jackson",
          "userStatus": "Working on a new web design for the corporate site",
          "capabilities": {
            "isGuest": false,
            "isAdmin": false,
            "isMutable": true
          },
          "jobTitle": "Web Site Manager",
          "statusUpdatedAt": "2011-02-15T20:13:09.649+0000",
          "mobile": "012211331100",
          "emailNotificationsEnabled": true,
          "description": "Mike is a demo user for the sample Alfresco Team site.",
          "telephone": "012211331100",
          "enabled": false,
          "firstName": "Mike",
          "skypeId": "mjackson",
          "avatarId": "3fbde500-298b-4e80-ae50-e65a5cbc2c4d",
          "location": "Threepwood, UK",
          "company": {
            "organization": "Green Energy",
            "address1": "100 Cavendish Street",
            "address2": "Threepwood",
            "address3": "UK",
            "postcode": "ALF1 SAM1"
          },
          "id": "mjackson",
          "email": "mjackson@example.com"
        }
      }
    ]
  }
}
```

The response can be customized by using the `fields` parameter to return more or less metadata.

**Parent topic:**[Searching](../concepts/dev-api-by-language-alf-rest-searching-for-nodes.md)

