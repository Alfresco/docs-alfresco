---
author: Alfresco Documentation
---

# Configuring the Docker container environment variables

It is possible to override variables to configure the Docker container.

The following table shows the list of environment variables that can be used to configure the Docker container. For a full explanation of the variables, refer to the original guide.

|Variable name|Default|Corresponding value in activiti-app.properties|
|-------------|-------|----------------------------------------------|
|`ACTIVITI_LICENSE_MULTI_TENANT`|false|`license.multi-tenant`|
|`ACTIVITI_DATASOURCE_DRIVER`|org.h2.Driver|`datasource.driver`|
|`ACTIVITI_DATASOURCE_URL`|jdbc:h2:mem:db1;DB\_CLOSE\_DELAY=1000|`datasource.url`|
|`ACTIVITI_DATASOURCE_USERNAME`|alfresco|`datasource.username`|
|`ACTIVITI_DATASOURCE_PASSWORD`|alfresco|`datasource.password`|
|`ACTIVITI_HIBERNATE_DIALECT`|org.hibernate.dialect.H2Dialect|`hibernate.dialect`|
|`ACTIVITI_ADMIN_EMAIL`|admin@app.activiti.com|`admin.email`|
|`ACTIVITI_ADMIN_PASSWORD_HASH`|25a463679c56c474f20d8f592e899ef4cb3f79177c19e3782ed827b5c0135c466256f1e7b60e576e

|`admin.passwordHash`|
|`ACTIVITI_CORS_ALLOWED_ORIGINS`|\*|`cors.enabled`|
|`ACTIVITI_CORS_ALLOWED_METHODS`|GET,POST,HEAD,OPTIONS,PUT,DELETE|`cors.allowed.methods`|
|`ACTIVITI_CORS_ALLOWED_HEADERS`|Authorization,Content-Type,Cache-Control,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,X-CSRF-Token|`cors.allowed.headers`|
|`ACTIVITI_CORS_ENABLED`|true|`cors.enabled`|
|`ACTIVITI_CSRF_DISABLED`|true|`security.csrf.disabled`|
|`ACTIVITI_ES_SERVER_TYPE`|embedded|`elastic-search.server.type`|
|`ACTIVITI_ES_DISCOVERY_TYPE`|unicast|`elastic-search.discovery.type`|
|`ACTIVITI_ES_DISCOVERY_HOSTS`|localhost:9300|`elastic-search.discovery.hosts`|
|`ACTIVITI_ES_CLUSTER_NAME`|elasticsearch|`elastic-search.data.path`|

As an alternative to those options, you can import your own properties file by either:

-   Mounting your properties in /usr/share/tomcat/lib/activiti-app.properties using Docker volumes
-   Specifying the [EXTERNAL\_PROPERTIES\_FILE](https://github.com/Alfresco/aps-docker-library#importing-your-own-configuration) environment variable, pointing to an accessible properties file such as an S3 bucket

**Note:** If you choose the second option, it will be automatically downloaded in the contextual folder.

The following code snippet shows an example of the configuration \(classical Docker compose\).

```
    process:
    image: alfresco/process-services:1.6.0.0
    environment:
    ACTIVITI_DATASOURCE_USERNAME: alfresco
    ACTIVITI_DATASOURCE_PASSWORD: alfresco
    ACTIVITI_DATASOURCE_DRIVER: com.mysql.jdbc.Driver
    ACTIVITI_DATASOURCE_URL: ‘jdbc:mysql://mysql:3306/activiti?characterEncoding=UTF-8
    ACTIVITI_CSRF_DISABLED: true
    ACTIVITI_CORS_ENABLED: true
    links:
    - mysql:mysql
    - elasticsearch:elasticsearch
```

**Parent topic:**[Installing Process Services using Docker](../concepts/ps_installing_docker.md)

