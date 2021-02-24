---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Adding members to a site

Adding members to an Alfresco Share site.

|API Call|POST people/\{id\}/site-membership-requests POST /sites/\{id\}/members

|
|--------|------------------------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/sites/createSiteMembershipRequestForPerson](http://localhost:8080/api-explorer/#!/sites/createSiteMembershipRequestForPerson) and [http://localhost:8080/api-explorer/\#!/sites/createSiteMembership](http://localhost:8080/api-explorer/#!/sites/createSiteMembership)|
|See also|[How to create a site](dev-api-by-language-alf-rest-manage-sites-create.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

When you have a site and some content, the next step is most likely to invite people to it so they can work with its content. There are two different ways to do this. You can start with the person you want to invite as a member to the site, or you can start with the site and then think about what people you want to invite to it. You can add a person directly to a site or create a membership request for them that they have to approve before they are officially a member:

To prepare for the examples let’s create a public and a moderated site as follows:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My public stuff", "visibility": "PUBLIC"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   228    0   175  100    53    308     93 --:--:-- --:--:-- --:--:--   402
{
  "entry": {
    "role": "SiteManager",
    "visibility": "PUBLIC",
    "guid": "f50cb6d9-fd87-4f1b-a4b6-64813d2158e6",
    "id": "my-public-stuff",
    "preset": "site-dashboard",
    "title": "My public stuff"
  }
}

$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My moderated stuff", "visibility": "MODERATED"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   243    0   184  100    59    346    111 --:--:-- --:--:-- --:--:--   456
{
  "entry": {
    "role": "SiteManager",
    "visibility": "MODERATED",
    "guid": "f25f4e0b-f483-4a40-8885-b8801407340a",
    "id": "my-moderated-stuff",
    "preset": "site-dashboard",
    "title": "My moderated stuff"
  }
}
```

Then create a test user by POSTing the following body \(normally you don't have to create users as they are usually imported from LDAP/AD, this is just a demo\):

```
{
  "id": "test",
  "firstName": "Test",
  "lastName": "User",
  "password": "test"
  "email": "test@alfresco.com"
}
```

to:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people**

The call looks like this:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "test", "firstName": "Test", "lastName": "User", "password": "test", "email": "test@alfresco.com"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   321    0   215  100   106    576    284 --:--:-- --:--:-- --:--:--   860
{
  "entry": {
    "firstName": "Test",
    "lastName": "User",
    "capabilities": {
      "isGuest": false,
      "isAdmin": false,
      "isMutable": true
    },
    "emailNotificationsEnabled": true,
    "company": {},
    "id": "test",
    "enabled": true,
    "email": "test@alfresco.com"
  }
}
```

We'll now use this new user to join the public site and the moderated site we just created. The same endpoint is used to do both these actions via a POST:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{userId\}/site-membership-requests**

Join the public site by POSTing the body below:

```
{
  "id": "my-public-stuff"
}
```

Here is how that call looks like:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "my-public-stuff"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/site-membership-requests' | jq
```

To join the moderated site POST:

```
{
  "id": "my-moderated-stuff",
  "message": "I would like to join this site as it looks interesting"
}
```

Here is how that call looks like:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "my-moderated-stuff", "message": "I would like to join this site as it looks interesting"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/site-membership-requests' | jq
```

**Parent topic:**[Managing Sites](../concepts/dev-api-by-language-alf-rest-manage-sites-intro.md)

