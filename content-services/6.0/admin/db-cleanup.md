---
title: Database table cleanup
nav: false
---

When Auditing entries or AttributeService entries are being deleted, Alfresco does not actually delete all of the associated data. The structures of the `alf_prop_*` tables are designed to heavily reuse individual textual or numerical data elements, much to the point that cascade deletion upon removal of audit entries or attributes is no longer possible as the same values could be referenced in other elements.

Since Alfresco 4.1.9, 4.2.2 (Enterprise) and 5.0 (Community), Alfresco has included a default job to clean up dangling data in `alf_prop_*` tables. This CRON job is disabled by default and must be re-configured to be able to run.

## Schedule cleanup of database tables {#schedulerdbcleanup}

You can schedule or manually trigger the `propTablesCleanupTrigger` script to clean up audit and property values tables (`alf_audit_` and `alf_prop_` tables).

`propTablesCleanupTrigger` is a `MonitoredCronTrigger` script, and a schedule to run this script can be set in the `alfresco-global.properties` file or by using JMX.

To run this script on a schedule, add the following line to the `alfresco-global.properties` file:

```text
attributes.propcleaner.cronExpression=* * * * * ? 2099
```

The default setting of this property is a Quartz Cron expression, `0 0 3 ? * SAT` which runs every Saturday at 3 am. Alfresco recommends that you do not change the default value unless required.

Here is an example of the output you should expect to see in the debug information:

```text
2019-04-14 13:22:17,493 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 10000 rows of 2 rows from table alf_audit_app.
2019-04-14 13:22:17,493 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 1 rows of 0 rows from table alf_audit_entry.
2019-04-14 13:22:17,509 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 10000 rows of 1 rows from table alf_prop_unique_ctx.
2019-04-14 13:22:17,524 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 10000 rows of 3 rows from table alf_prop_root.
```

The default batch size is 10000 rows.

> **CAUTION:** The `propTablesCleanupTrigger` script is designed for occasional, scheduled cleanups of the database tables. Ensure that you run this script during periods when there is minimal or no load on the server. If there is load on the server while `propTablesCleanupTrigger` script is running, you might experience database conflicts and related errors.
