---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Audit configuration and environment

This section describes the configuration and environment settings for auditing.

|Configuration and environment|Details|
|-----------------------------|-------|
|Tomcat environment|-   Set the configuration properties in the alfresco-global.properties file.
-   Log4J settings can be added in a file <tomcat\>/shared/classes/alfresco/extension/audit-log4j.properties.

|
|View the available web scripts and details|Use the following scripts:-   Script index: [http://localhost:8080/alfresco/service/](http://localhost:8080/alfresco/service/)
-   Audit scripts: [http://localhost:8080/alfresco/service/index/package/org/alfresco/repository/audit](http://localhost:8080/alfresco/service/index/package/org/alfresco/repository/audit)

|
|HTTP client|-   `curl` will be used as the HTTP client

|
|Sample files|-   Audit sample files are distributed in the <extension\>/audit directory. Activate the sample files by removing the .sample extension.

|

Check the state of auditing on the server:

```
% curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/control"
{
   "enabled" : false,
   "applications": 
   [
   ]
}
```

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

