# Using JDBC Connection Parameters

Set the following properties to change the database.

|Property

|Description

|
|datasource.driver

|The JDBC driver used to connect to the database. Note that the driver must be on the classpath of the web application.

|
|datasource.url

|The JDBC URL used to connect to the database.

|
|datasource.username

|The user of the database system that is used to connect to the database.

|
|datasource.password

|The password of the above user.

|

Example:

```
datasource.driver=com.mysql.jdbc.Driver
datasource.url=jdbc:mysql://127.0.0.1:3306/activiti?characterEncoding=UTF-8

datasource.username=alfresco
datasource.password=alfresco
```

