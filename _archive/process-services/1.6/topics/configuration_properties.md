# MS-MT configuration properties

There are some configuration properties specific to MS-MT:

-   **tenancy.model** : possible values are *shared* \(default if omitted\) or *isolated*. Isolated switched a multi-tenant setup to MS-MT.

-   **msmt.tenant-validity.cronExpression** : the cron expression that determines how often the validity of tenants must be checked \(see previous section\) \(by default every 10 minutes\).

-   **msmt.async-executor.mode** : There are two implementations of the Async job executor for the Activiti core engine. The default is *isolated*, where for each tenant a full async executor is booted up. For each tenant there will be acquire threads, a threadpool and queue for executing threads. The alternative value for this property is *shared-queue*, where there are acquire threads for each tenant, but the actual job execution is done by a shared threadpool and queue. This saves some server resources, but could lead to slower job processing in case there are many jobs.

-   **msmt.bootstrapped.tenants** : a semicolon separated list of tenant names. Can be used to make sure one node in a multi-node setup only takes care of the tenants in the list. Does require that the loadbalancer also uses similar logic.


**Parent topic:**[Multi-schema multi-tenancy \(MS-MT\)](../topics/multi_schema_multi_tenancy_ms_mt.md)

