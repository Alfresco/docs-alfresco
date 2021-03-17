# Administrator database configuration

The database for the Administrator app is configured using the following properties. See the [Database configuration](databaseConfiguration.md) section for more information about how to configure Alfresco Process Services.

For example \(using MySQL\):

```
datasource.driver=com.mysql.jdbc.Driver
datasource.url=jdbc:mysql://127.0.0.1:3306/activitiadmin?characterEncoding=UTF-8

datasource.username=alfresco
datasource.password=alfresco
hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

**Parent topic:**[Installing Alfresco Process Services Administrator](../topics/installing_administrator.md)

