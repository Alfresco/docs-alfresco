---
author: Alfresco Documentation
---

# How to use the auditing sample files

Auditing sample files are distributed in the ./tomcat/shared/classes/alfresco/extension/audit directory. You can enable them in order to explore auditing.

There are two sample files in ./tomcat/shared/classes/alfresco/extension/audit:

-   alfresco-audit-example-extractors.xml.sample
-   alfresco-audit-example-login.xml.sample

In order to use a sample file, remove the .sample extension. It is also assumed you have [enabled auditing](audit-enable.md). You will also need to restart the server so the examples are loaded.

Once the sample files are enabled you can check the status and response:

```

curl -u admin:password "http://localhost:8080/alfresco/service/api/audit/control"
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

You see that AuditExampleExtractors and AuditExample Login applications have been enabled. In this example the `alfresco-access` application is also enabled.

Samples can also be downloaded directly from the following location in svn:

http://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/extension/audit/

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

