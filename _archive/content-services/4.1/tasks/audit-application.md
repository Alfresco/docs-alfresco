---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Defining the audit application

This section describes the audit applications.

Data producers have no knowledge of how or whether data will be stored. Different use cases need to store or modify inbound data independently, therefore the use cases are separated into audit applications. Each application defines how data is mapped, extracted, and recorded without affecting data required by other applications.

For example, the Records Management module records before and after values when specific nodes are modified, whereas the CMIS standard requires a slightly different set of data to be recorded. Additionally, each of the audit logs can be enabled and disabled independently within the same server. Usually, each audit application is defined in its own configuration file, but for demonstration purposes, multiple application definitions can be defined in one configuration file.

1.  Enable the sample file by removing the .sample extension.

    alfresco/extensions/audit/alfresco-audit-example-login.xml.sample

2.  Restart the Alfresco server.

3.  Ensure that the applications have been registered properly and are enabled:

    ```
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/control"
    {
       "enabled" : true,
       "applications": 
       [
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
             "name": "CMISChangeLog",
             "path" : "/CMISChangeLog",
             "enabled" : true
          }
             
       ]
    }
    ```

4.  At an application level, auditing is enabled or disabled for specific paths; changes made to an application's audit state are persisted. To disable all auditing for an application, disable the root path; in this case, disable the root path for the `CMISChangeLog` application. If you restart the server you will see that the application remains disabled.

    ```
    % curl -u admin:admin -d "" "http://localhost:8080/alfresco/service/api/audit/control/CMISChangeLog/CMISChangeLog?enable=false"
    {
       "enabled" : false
    }
    ```


**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

