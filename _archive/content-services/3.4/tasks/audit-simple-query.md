---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Simple audit query

This section describes the a simple audit query example.

1.  Generate some auditing data for the sample applications.

2.  Connect to the Alfresco Explorer client.

3.  Login as the `admin` user.

4.  Logout of Alfresco.

5.  Login as the `admin` user but use an illegal password.

    The following examples are two queries to return results: without and with full-audited values respectively. Some entries have been replaced with a \(**...**\) for brevity.

    ```
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1"
    {
       "count":4,
       "entries": 
       [
          {
             "id":69,
             "application":AuditExampleLogin1,
             "user":admin,
             "time":"2010-09-20T14:45:28.998+01:00",
             "values":
    null
          },
          ...
       ]
    }
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=true"
    {
       "count":5,
       "entries": 
       [
          ...
          {
             "id":72,
             "application":AuditExampleLogin1,
             "user":null,
             "time":"2010-09-20T14:45:43.884+01:00",
             "values":
             {
                         "\/auditexamplelogin1\/login\/error\/user":"admin"
             }
             
          },
          ...
          {
             "id":76,
             "application":AuditExampleLogin1,
             "user":admin,
             "time":"2010-09-20T14:46:23.319+01:00",
             "values":
             {
                         "\/auditexamplelogin1\/login\/no-error\/user":"admin"
             }
             
          }
       ]
    }
    ```

    There is no count function in the search API. This is by design; use the `limit` parameter instead.

6.  Assume that a client wants to see the details of the latest two results but knows of the existence of the next eight results. In this case, it would be pointless pulling back full \(`verbose=true`\) results for the latest 10 entries. Instead, pull back the last two results with values and then pull back the next eight results without values.

    Notice that the response contains a count of the number of entries returned; the individual entries are provided so that the entry IDs can be used for further result retrieval.

    ```
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=true&limit=2&forward=false"
    {
       "count":2,
       "entries": 
       [
          {
             "id":98,
             "application":AuditExampleLogin1,
             "user":admin,
             "time":"2010-09-20T15:10:04.043+01:00",
             "values":
             {
                         "\/auditexamplelogin1\/login\/no-error\/user":"admin"
             }
             
          },
          {
             "id":96,
             "application":AuditExampleLogin1,
             "user":admin,
             "time":"2010-09-20T15:09:50.117+01:00",
             "values":
             {
                         "\/auditexamplelogin1\/login\/no-error\/user":"admin"
             }
             
          }
       ]
    }
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=false&limit=8&forward=false&toId=96"
    {
       "count":8,
       "entries": 
       [
          {
             "id":94,
             "application":AuditExampleLogin1,
             "user":admin,
             "time":"2010-09-20T15:09:47.606+01:00",
             "values":
    null
          },
          ...
          {
             "id":80,
             "application":AuditExampleLogin1,
             "user":admin,
             "time":"2010-09-20T14:58:34.305+01:00",
             "values":
    null
          }
       ]
    }
    ```


**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

