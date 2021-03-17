# Alfresco Content Services repositories

A tenant administrator can configure one or more Alfresco Content Services repositories to use when working with content. To retrieve the repositories configured for the tenant of the user used to do the request:

```
GET api/enterprise/profile/accounts/alfresco
```

which returns something like:

```
{
     "size": 2,
     "total": 2,
     "data": [
          {
               "name": "TS",
               "tenantId": 1,
               "id": 1,
               "accountUsername": "jbarrez",
               "created": "2015-03-26T14:24:35.506+0000",
               "shareUrl": "http://ts.alfresco.com/share",
               "lastUpdated": "2015-03-26T15:37:21.174+0000",
               "repositoryUrl": "http://ts.alfresco.com/alfresco",
               "alfrescoTenantId": ""
          },
          {
               "name": "TsTest",
               "tenantId": 1,
               "id": 1000,
               "accountUsername": "jbarrez",
               "created": "2015-03-26T15:37:36.448+0000",
               "shareUrl": "http://tstest.alfresco.com/share",
               "lastUpdated": "2015-03-26T15:37:36.448+0000",
               "repositoryUrl": "http://tstest.alfresco.com/alfresco",
               "alfrescoTenantId": ""
          }
     ],
     "start": 0
}
```

**Parent topic:**[Identity Management](../topics/identity_management.md)

