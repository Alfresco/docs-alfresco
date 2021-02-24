---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Additional PostgreSQL configuration requirements

For the Sync Service installation, there are some additional PostgreSQL database configuration requirements.

The PostgreSQL settings to configure depends on the:

-   Level of repository activity: A higher activity increases the database insert/update and auto\_vacuum analyze load.
-   Number of syncs: A higher number of syncs results in a higher query load. The sizing of memory buffers need to reflect this.
-   Event size: The average event size is 1300 bytes.

**Sync activity level**

Setting affected by the sync activity level include:

-   `work_mem`: The sync query result set sizes may be large for subscriptions that have not been synced for a while. Also, the subscriptions need to be sorted. By default, the client will sync every 5 minutes so the number of sync changes is not likely to be very large, but clients that are offline will build up large outstanding sync result sets. Set `work_mem` higher if clients are expected to be offline for long periods of time.

**Repository activity level**

Settings affected by repository activity level include:

-   `autovacuum_naptime`: The database is split into half between writes \(event persistence\) and reads \(sync changes\). For a more write heavy installation in which the repository updates outweigh the sync activity, this property needs to be set lower so that the new events are incorporated into the table statistics \(and hence indexes are used optimally\).
-   `autovacuum_analyze_threshold`: The default value is 50 tuples. For a more repository update heavy installation, set this property to a low value to help with queries.

**Disk space**

Disk space is required for the events and subscriptions. The events use most of the disk space. A typical operation, such as add folder/document, update document, delete folder/document, move folder/document will result in 1-10 events. More complex operations, such as create site will generate more.

A cleanup job runs periodically to clean up events that are older than a configurable number. The default value is 28 days, so the disk space is required to cover this time period. The disk space is set using the `sync.cleanup` property in the config.yml file.

A rough estimate of disk space requirements for PostgreSQL database can be calculated as follows:

```
(#update operations per hour * 24*28 * 5 * 1300) / (1024*1024) MB
```

So based on the above assumptions and 100 operations per hour, we have ~416MB.

The following query will give the disk space usage for each of the Sync Service tables and indexes:

```
SELECT nspname || '.' || relname AS "relation",
    pg_size_pretty(pg_relation_size(C.oid)) AS "size"
FROM pg_class C
LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
WHERE nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
AND relname like '%sync%'
ORDER BY pg_relation_size(C.oid) DESC
LIMIT 200;
```

**Parent topic:**[Installing and configuring PostgreSQL database](../tasks/postgres-config.md)

