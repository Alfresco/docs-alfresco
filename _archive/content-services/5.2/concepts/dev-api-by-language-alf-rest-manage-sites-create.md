---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Create a site

Creating an Alfresco Share site.

|API Call|POST sites|
|--------|----------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/sites/createSite](http://localhost:8080/api-explorer/#!/sites/createSite)|
|See also|[How to update site metadata](dev-api-by-language-alf-rest-manage-sites-update.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Creating a site is done with the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites**

The body for a site create call looks like this:

```
{
  "title": "{the name of the site}",
  "description": "{the description of the site}",
  "visibility": "[PUBLIC|PRIVATE|MODERATED]"
}
```

The `visibility` property is important to know more about as it determines how users can join and view the site:

-   `PUBLIC` - the site and its content is viewable by all users, even if they are not members of the site. Users can search for the site and join themselves.
-   `PRIVATE` - the site and its content is NOT viewable by any user that is not a member of the site. You have to be invited to the site by by a site manager.
-   `MODERATED` - the site can be found by all users and they can join themselves. However, the joining process is moderated by site managers. Site content is only viewable by users that are members of the site.

To create a site called ‘My Stuff’ that is readable by anybody use the following call:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "title": "My stuff", "visibility": "PUBLIC"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   215  100   163  100    52    337    107 --:--:-- --:--:-- --:--:--   444
{
  "entry": {
    "role": "SiteManager",
    "visibility": "PUBLIC",
    "guid": "7ef8798f-bbcd-4d92-8db5-4d51edf739f6",
    "id": "my-stuff",
    "preset": "site-dashboard",
    "title": "My stuff"
  }
}
```

The response contains some useful information about the new site, such as site `id` \(i.e. my-stuff\), which is used in other calls. By default a new site is set as favorite, if you don’t want that you can control this with the `skipAddToFavorites` parameter.

**Parent topic:**[Managing Sites](../concepts/dev-api-by-language-alf-rest-manage-sites-intro.md)

