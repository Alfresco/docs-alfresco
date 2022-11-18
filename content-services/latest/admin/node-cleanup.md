---
title: Node service cleanup job
---

Cleans up deleted nodes and dangling transactions that are old enough.

## Schedule cleanup
You can schedule or manually trigger the `nodeServiceCleanupTrigger` script to clean up deleted nodes, dangling
transactions, and property values tables (i.e. `alf_transaction`, `alf_node` and `alf_node_properties` tables).

The `nodeServiceCleanupTrigger` is a `MonitoredCronTrigger` script, and a schedule to run this script can be set in the
`alfresco-global.properties` file or by using JMX.

To run this script on a schedule, add the following line to the `alfresco-global.properties` file:

```text
system.nodeServiceCleanup.cronExpression=0 0 21 * * ?
```

The default setting for this property is a Quartz Cron expression, `0 0 21 * * ?`, which runs every day at 9pm.
Alfresco recommends that you don't change the default value unless required.

Below are the default settings for the V1 cleanup job:

```text
# --Node cleanup batch -default settings
system.node_cleanup.delete_batchSize=1000
system.node_table_cleaner.algorithm=V1
index.tracking.minRecordPurgeAgeDays=30
index.tracking.purgeSize=7200000
```

### Using the V2 algorithm
The V2 algorithm is designed to operate at scale by deleting items in batches of configurable size. Currently, the V2
algorithm is supported only by PostgreSQL.

Change the node cleanup batch default properties in `alfresco-global.properties`:

1. Enable the new cleanup algorithm:

   ```text
   system.node_table_cleaner.algorithm=V2
   ```

2. Set the batch size. This property defines the number of items deleted in one prepared delete statement:

   ```text
   system.node_cleanup.delete_batchSize=1000
   ```

3. Set the tracking purge size. This property specifies the size of the chunk (in millisec). Default is a couple of hours.
   **This property is not relevant for the V2 algorithm**:

   ```text
   index.tracking.purgeSize=7200000
   ```

4. Set the minimum age (in days) before nodes and transactions get purged:

   ```text
   index.tracking.minRecordPurgeAgeDays=30
   ```
   

