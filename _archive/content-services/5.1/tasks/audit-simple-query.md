---
author: Alfresco Documentation
---

# Running a simple audit query

You can use or edit this simple audit query example.

In the first part of this tutorial you perform some logins and logouts to generate audit data.

1.  Connect to Alfresco.

2.  Log in as the `admin` user.

3.  Log out.

4.  Log in as the `admin` user but use an illegal password.

    The following examples are two queries to return results: without and with full-audited values respectively. Some entries have been replaced with a \(**...**\) for brevity.

    ```
    $ curl -u admin:password "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1"
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
    
    $ curl -u admin:password "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=true"
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

5.  Assume that a client wants to see the details of the latest two results but knows of the existence of the next eight results. In this case, it would be pointless pulling back full \(`verbose=true`\) results for the latest 10 entries. Instead, pull back the last two results with values and then pull back the next eight results without values.

    Notice that the response contains a count of the number of entries returned; the individual entries are provided so that the entry IDs can be used for further result retrieval.

    ```
    $ curl -u admin:password "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=true&limit=2&forward=false"
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
    
    $ curl -u admin:password "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=false&limit=8&forward=false&toId=96"
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


**Parent topic:**[Auditing Tutorials](../concepts/audit-tutorials.md)

