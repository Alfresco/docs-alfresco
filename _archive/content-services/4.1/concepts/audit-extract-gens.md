---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# DataExtractors and DataGenerators

This section provides a description of DataExtractors and DataGenerators.

It is possible for any server-side component to pass data to the `auditComponent` bean.

-   **DataExtractor**

    Uses an inbound mapped value as the source of the data. *AuditExampleLogin1* records values quite literally using the *simpleValue* data extractor.

-   **DataGenerator**

    Activates when an inbound mapped path is present, but is not dependent on the value on that path. *AuditExampleLogin2* triggers the *personFullName* generator when the *authenticate/no-error* path is present; this records the full name of the currently-authenticated user even though the inbound data for *authenticate/no-error* is *null*.


Look at the data recorded for the two sample applications:

```
% curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=true&forward=false&limit=1"
{
   "count":1,
   "entries": 
   [
      {
         "id":137,
         "application":AuditExampleLogin1,
         "user":admin,
         "time":"2010-09-20T17:37:14.699+01:00",
         "values":
         {
                     "\/auditexamplelogin1\/login\/no-error\/user":"admin"
         }
         
      }
   ]
}
% curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin2?verbose=true&forward=false&limit=1"
{
   "count":1,
   "entries": 
   [
      {
         "id":138,
         "application":AuditExampleLogin2,
         "user":admin,
         "time":"2010-09-20T17:37:23.101+01:00",
         "values":
         {
                     "\/auditexamplelogin2\/login\/user":"Administrator"
         }
         
      }
   ]
}
```

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

