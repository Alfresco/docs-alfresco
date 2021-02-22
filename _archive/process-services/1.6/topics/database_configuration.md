# Administrator database configuration

The database for Administrator is configured exactly the same way as Alfresco Process Services. See the [Database configuration](databaseConfiguration.md) section.

For example \(using MySQL\):

```
datasource.driver=com.mysql.jdbc.Driver
datasource.url=jdbc:mysql://127.0.0.1:3306/activitiadmin?characterEncoding=UTF-8

datasource.username=alfresco
datasource.password=alfresco
hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

**Parent topic:**[Installing Alfresco Process Services Administrator](../topics/installing_administrator.md)

