# MS-MT known limitations

Currently, following known limitations apply to the multi-schema multi-tenancy \(MS-MT\) feature:

-   As with regular multi-tenancy, it is not possible to configure the out of the box LDAP synchronization to synchronize users to different tenants.

-   The tenant can **only be configured through the REST API**, not via the "identity management" app.

-   Users need to be created by a user that is a "Tenant Administrator", **not** a "Tenant Manager".

-   Updating a tenant configuration \(more specifically: switching the data source\) cannot be done dynamically, a restart of all nodes is required for it to be picked up.

-   A user id needs to be unique across all tenants \(cft. an email\). This is because a mapping \{user id, tenant id\} will be stored in the primary database to determine the correct tenant data source.


**Parent topic:**[Multi-schema multi-tenancy \(MS-MT\)](../topics/multi_schema_multi_tenancy_ms_mt.md)

