---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Advanced audit query

This section describes the a advanced audit query example.

This type of query URL makes use of a data path within the audit application. This allows entries to be found that match specific audited values. By default, query values are treated as case-sensitive string types, but it is possible to specify the type to query against.

1.  Generate some audit data.

2.  Connect to the Alfresco Explorer client.

3.  Attempt a filed login as `joe`.

    ```
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1/auditexamplelogin1/login/error/user?verbose=true&value=joe"
    {
       "count":1,
       "entries": 
       [
          {
             "id":101,
             "application":AuditExampleLogin1,
             "user":null,
             "time":"2010-09-20T15:13:57.947+01:00",
             "values":
             {
                         "\/auditexamplelogin1\/login\/error\/user":"joe"
             }
             
          }
       ]
    }
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1/auditexamplelogin1/login/error/user?verbose=true&value=JOE"
    {
       "count":0,
       "entries": 
       [
       ]
    }
    ```


**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

