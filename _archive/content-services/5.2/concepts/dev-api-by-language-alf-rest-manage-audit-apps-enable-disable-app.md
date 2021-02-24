---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Enable/Disable an audit application

Enabling and disabling an audit application in the repository.

|API Call|PUT /audit-applications/\{id\}|
|--------|------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/audit/updateAuditApp](http://localhost:8080/api-explorer/#!/audit/updateAuditApp)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

To update an audit application you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

It’s possible to update the audit app's `isEnabled` property. Use the following PUT call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/\{id\}**

The identifier for the audit app to be updated is specified with the `{id}` parameter.

The body for an audit app update call looks like this:

```
{
    "isEnabled": [true | false]
}
```

To disable an audit application with the id `alfresco-access` make the following call:

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "isEnabled": false }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/audit-applications/alfresco-access' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    99    0    77  100    22   1327    379 --:--:-- --:--:-- --:--:--  1706
{
  "entry": {
    "isEnabled": false,
    "name": "alfresco-access",
    "id": "alfresco-access"
  }
}
```

The response shows that the audit app has indeed been disabled.

New audit entries \(logs\) will not be created for a disabled audit application until it's re-enabled \(and system-wide auditing is also enabled\).

Note, it's still possible to query and/or delete any existing audit entries \(logs\) even if auditing is disabled for the audit application.

**Parent topic:**[Managing Audit Applications and Logs](../concepts/dev-api-by-language-alf-rest-manage-audit-apps-intro.md)

