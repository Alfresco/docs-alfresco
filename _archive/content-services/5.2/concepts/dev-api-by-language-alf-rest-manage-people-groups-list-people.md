---
author: [Alfresco Documentation, Alfresco Documentation]
---

# List people \(users\)

List people \(i.e. users\) in the repository.

|API Call|GET /people|
|--------|-----------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/people/listPeople](http://localhost:8080/api-explorer/#!/people/listPeople)|
|See also|[How to list group membership for people](dev-api-by-language-alf-rest-manage-people-groups-list-person-group-membership.md), [how to find people by term](dev-api-by-language-alf-rest-finding-people-by-term.md) and [how to search for people](dev-api-by-language-alf-rest-finding-content-by-search-query.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

A useful feature is to be able to list people in the repository. The following GET request is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people**

Here is how to make the call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1686  100  1686    0     0   4052      0 --:--:-- --:--:-- --:--:--  4052
{
  "list": {
    "pagination": {
      "count": 4,
      "hasMoreItems": false,
      "totalItems": 4,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "lastName": "Beecher",
          "userStatus": "Helping to design the look and feel of the new web site",
          "jobTitle": "Graphic Designer",
          "statusUpdatedAt": "2011-02-15T20:20:13.432+0000",
          "mobile": "0112211001100",
          "emailNotificationsEnabled": true,
          "description": "Alice is a demo user for the sample Alfresco Team site.",
          "telephone": "0112211001100",
          "enabled": false,
          "firstName": "Alice",
          "skypeId": "abeecher",
          "avatarId": "198500fc-1e99-4f5f-8926-248cea433366",
          "location": "Tilbury, UK",
          "company": {
            "organization": "Moresby, Garland and Wedge",
            "address1": "200 Butterwick Street",
            "address2": "Tilbury",
            "address3": "UK",
            "postcode": "ALF1 SAM1"
          },
          "id": "abeecher",
          "email": "abeecher@example.com"
        }
      },
      {
        "entry": {
          "firstName": "Administrator",
          "emailNotificationsEnabled": true,
          "company": {},
          "id": "admin",
          "enabled": true,
          "email": "admin@alfresco.com"
        }
      },
      {
        "entry": {
          "firstName": "Guest",
          "emailNotificationsEnabled": true,
          "company": {},
          "id": "guest",
          "enabled": false
        }
      },
      {
        "entry": {
          "lastName": "Jackson",
          "userStatus": "Working on a new web design for the corporate site",
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

You may know that in the **/nodes** API, the properties and aspect names are not present by default but can be included via the `include` query parameter, the same holds true here as well. If you want to see any custom properties or aspects applied you can add `include=properties,aspectNames` to the URL. The results can also be sorted by `id` \(username\), `firstName` and `lastName`.

Unfortunately, there is no way of filtering the output, which can be a problem when you have loads of users. However, the **/queries/people** endpoint or the **/search** endpoint can be used to look for people and achieve the same thing.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

