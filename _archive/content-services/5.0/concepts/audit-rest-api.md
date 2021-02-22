# Using the auditing REST API

You can use the REST API to control auditing and also run queries against the audit data for specific applications. It is also possible to clear auditing data using the API.

## Auditing Control

**URL:**

`/api/audit/control`

**Description:**

Get and change the global audit status. Status for individual applications is also shown.

**Call:**

```
curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/control"
```

**Response:**

```

{
   "enabled" : true,
   "applications": 
   [
      {
         "name": "Alfresco Sync Service",
         "path" : "/sync",
         "enabled" : true
      }
         ,
      {
         "name": "Alfresco Tagging Service",
         "path" : "/tagging",
         "enabled" : true
      }
         ,
      {
         "name": "AuditExampleExtractors",
         "path" : "/auditexampleextractors",
         "enabled" : true
      }
         ,
      {
         "name": "AuditExampleLogin1",
         "path" : "/auditexamplelogin1",
         "enabled" : true
      }
         ,
      {
         "name": "AuditExampleLogin2",
         "path" : "/auditexamplelogin2",
         "enabled" : true
      }
         ,
      {
         "name": "alfresco-access",
         "path" : "/alfresco-access",
         "enabled" : true
      }
         
   ]
}
        
```

**URL:**

`/api/audit/control/{application}/{path}`

**Description:**

Get and change the audit status for a given application and path.

**Call:**

```
curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/control/AuditExampleLogin1/auditexamplelogin1"
```

**Response:**

```
{
   "enabled" : true,
   "applications": 
   [
      {
         "name": "AuditExampleLogin1",
         "path" : "/auditexamplelogin1",
         "enabled" : true
      }
         
   ]
}
```

## Audit Query

**URL:**

`/api/audit/query/{application}`

**Description:**

Retrieve audit events.

**Call:**

```
curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1"
```

**Response:**

```

{
   "count":19,
   "entries": 
   [
      {
         "id":1,
         "application":"AuditExampleLogin1",
         "user":"admin",
         "time":"2015-12-09T11:40:54.540Z",
         "values":
null
      },
      {
         "id":7,
         "application":"AuditExampleLogin1",
         "user":"admin",
         "time":"2015-12-09T12:24:43.674Z",
         "values":
null
      },
...
          
        
```

**URL:**

`/api/audit/query/{application}/{path}`

**Description:**

Retrieve audit events for the specified application and path.

**Call:**

```
TBD
```

**Response:**

```
TBD
```

**URL:**

`/api/audit/query/{application}?fromId={fromId}&toId={toId}&fromTime={fromTime}&toTime={toTime}&user={user}&forward={forward}&limit={limit}&verbose={verbose}`

**Description:**

Retrieve audit events for the specified application \(with id, time range, and other parameters\).

**Call:**

```
curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleLogin1?verbose=true&forward=false&limit=2"
```

**Response:**

```

{
   "count":2,
   "entries": 
   [
      {
         "id":68,
         "application":"AuditExampleLogin1",
         "user":"admin",
         "time":"2015-12-09T14:23:52.364Z",
         "values":
         {
                     "\/auditexamplelogin1\/login\/no-error\/user":"admin"
         }
         
      },
      {
         "id":65,
         "application":"AuditExampleLogin1",
         "user":"admin",
         "time":"2015-12-09T14:23:03.432Z",
         "values":
         {
                     "\/auditexamplelogin1\/login\/no-error\/user":"admin"
         }
         
      }
   ]
}          
        
```

**URL:**

`/api/audit/query/{application}/{path}?value={value}&valueType={valueType}&fromId={fromId}&toId={toId}&fromTime={fromTime}&toTime={toTime}&user={user}&forward={forward}&limit={limit}&verbose={verbose}`

**Description:**

Retrieve audit events for the specified application and path \(with id, time range, and other parameters\).

**Call:**

```
TBD
```

**Response:**

```
TBD
```

## Clear audit records

**URL:**

`/api/audit/clear/{application}`

**Description:**

Delete audit entries for a given application \(and time range if specified\).

**Call:**

```
curl -X POST -u admin:admin "http://localhost:8080/alfresco/service/api/audit/clear/AuditExampleLogin2"
```

**Response:**

```
{
   "cleared" : 29
}
```

**URL:**

`/api/audit/entries/{id}`

**Description:**

Delete audit entry with the specified id.

**Call:**

```
curl -X DELETE -u admin:admin "http://localhost:8080/alfresco/service/api/audit/entries/103"
```

**Response:**

```
TBD
```

