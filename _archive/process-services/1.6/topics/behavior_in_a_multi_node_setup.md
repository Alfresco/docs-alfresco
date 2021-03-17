# Behavior in a multi-node setup

Assuming a multi-node setup: when creating new tenants, the REST call is executed on one particular node. After the tenant is successfully created, users can log in and use the application without any problem on any node \(so the loadbalancer can simply randomly distribute for example\). However, some functionality that depends on backgrounds threads \(the job executor, for example\) will only start after a certain period of time since the creation of the tenant on another node.

This period of time is configured via the *msmt.tenant-validity.cronExpression* cron expression \(by default every 10 minutes\).

Similarly, when a tenant is deleted, the deletion will happen on one node. It will take a certain amount of time \(also configured through the *msmt.tenant-validity.cronExpression* property\) before the deletion has rippled through all the nodes in a multi-node setup.

Note that tenant datasource configuration are not automatically picked up and require a reboot of all nodes. However, changing the datasource of a tenant should happen very infrequently.

**Parent topic:**[Multi-schema multi-tenancy \(MS-MT\)](../topics/multi_schema_multi_tenancy_ms_mt.md)

