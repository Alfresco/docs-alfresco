# Pluggability

Following interfaces can be used to replace the default implementations of MS-MT related functionality:

-   *com.activiti.api.msmt.MsmtTenantResolver* : used when the user authenticates and the tenant id is determined. The default implementation uses a database table \(with caching\) to store the user id to tenant id relationship.

-   *com.activiti.api.msmt.MsmtUserKeyResolver* : works in conjuction with the Default MsmtTenantResolver, returns the user id for a user. By default returns the email or external id \(if external id is used\).

-   *com.activiti.api.datasource.DataSourceBuilderOverride* : called when a tenant datasource configuration is used to create a datasource. If there is a bean on the classpath implementing this interface, the logic will be delegated to this bean to create the javax.sql.DataSource. By default, a c3p0 DataSource / connection pool will be created for the configuration.


**Parent topic:**[Multi-schema multi-tenancy \(MS-MT\)](../topics/multi_schema_multi_tenancy_ms_mt.md)

