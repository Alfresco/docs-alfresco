# Getting started with MS-MT

To run Alfresco Process Services, you need to have installed a *multi-tenant* license. Switching to MS-MT mode is done setting the *tenancy.model* property to *isolated*.

```
tenancy.model=isolated
```

When using MS-MT, there always needs to be a *primary datasource*. This datasource is configured exactly the same as when configuring the single datasource. For example when using a Mysql database:

```
datasource.url=jdbc:mysql://127.0.0.1:3306/primary-activiti?characterEncoding=UTF-8
datasource.driver=com.mysql.jdbc.Driver
datasource.username=alfresco
datasource.password=alfresco

hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Booting up Alfresco Process Services now will create the regular tables in the *primary-activiti* schema, plus some additional tables specific to the *primary datasource* \(such tables are prefixed with **MSMT\_**\). A default user with tenant manager capabilities is created \(the login email and password can be controlled with the *admin.email* and *admin.passwordHash* properties\) too.

One thing to remember is that there are no REST endpoints specific to MS-MT. All the existing tenant endpoints simply behave slightly different when running in MSMT mode. Using this tenant manager user \(credentials in the basic auth header\), it is now possible to add new tenants by calling the REST API:

```
POST http://your-domain:your-port/activiti-app/api/enterprise/admin/tenants
```

with the following JSON body:

```
{
    "name" : "alfresco",
    "configuration" : "tenant.admin.email=admin@alfresco.com\n
    datasource.driver=com.mysql.jdbc.Driver\n
    datasource.url=jdbc:mysql://127.0.0.1:3306/tenant-alfresco?characterEncoding=UTF-8\n
    datasource.username=alfresco\n
    datasource.password=alfresco"
}
```

Note that in some databases such as postgres, you may need to set the **database.schema** or **database.catalog** for database who work with catalogs.

Note the \\n in the body of the configuration property.

Also note that this configuration will be stored encrypted \(using the *security.encryption.secret* secret\).

This will:

-   Create a tenant named *alfresco*.

-   Data of this tenant is stored in the database schema *tenant-alfresco*.

-   A default tenant administrator user with the email login *admin@alfresco.com* is created, with the default password *admin* \(this can be changed after log in\).


When executing this request, in the logs you will see the tenant being created in MSMT mode:

```
INFO com.activiti.msmt.MsmtIdmService  - Created tenant 'alfresco' in primary datasource (with id '1')
```

In the logs, you’ll see:

-   The datasource connection pool for this tenant being created.

-   The Liquibase logic creating the correct tables.


At the end, you’ll see the following message indicating all is ready:

```
INFO com.activiti.msmt.MsmtIdmService  - Created tenant 'alfresco' in tenant datasource (with id '1')
INFO com.activiti.msmt.MsmtIdmService  - Registered new user 'admin@alfresco.com' with tenant '1'
```

You can now log in into the web UI using *admin@alfresco.com/admin*, change the password and add some users. These users can of course also be added via the REST API using the tenant admin credentials.

A new tenant can easily be added in a similar way:

```
POST http://your-domain:your-port/activiti-app/api/enterprise/admin/tenants
```

with body

```
{
    "name" : "acme",
    "configuration" : "tenant.admin.email=admin@acme.com\n
    datasource.driver=com.mysql.jdbc.Driver\n
    datasource.url=jdbc:mysql://127.0.0.1:3306/tenant-acme?characterEncoding=UTF-8\n
    datasource.username=alfresco\n
    datasource.password=alfresco"
}
```

When the tenant admin for this tenant, *admin@acme.com* logs in, no data of the other one can be seen \(as is usual in multi-tenancy\). Also when checking the *tenant-alfresco* and *tenant\_acme* schema, you’ll see the data is contained to the tenant schema.

The tenant manager can get a list of all tenants:

```
GET http://your-domain:your-port/activiti-app/api/enterprise/admin/tenants
```

```
[
  {
    "id": 2,
    "name": "acme"
  },
  {
    "id": 1,
    "name": "alfresco"
  }
]
```

To get specific information on a tenant, including the configuration:

```
GET http://your-domain:your-port/activiti-app/api/enterprise/admin/tenants/1
```

which gives:

```
{
  "id": 1,
  "name": "alfresco",
  "created": "2016-04-27T09:22:33.511+0000",
  "lastUpdate": null,
  "domain": null,
  "active": true,
  "maxUsers": null,
  "logoId": null,
  "configuration": "tenant.admin.email=admin@alfresco.com\n
  datasource.driver=com.mysql.jdbc.Driver\n
  datasource.url=jdbc:mysql://127.0.0.1:3306/tenant-alfresco?characterEncoding=UTF-8\n
  datasource.username=alfresco\n
  datasource.password=alfresco"
}
```

**Parent topic:**[Multi-schema multi-tenancy \(MS-MT\)](../topics/multi_schema_multi_tenancy_ms_mt.md)

