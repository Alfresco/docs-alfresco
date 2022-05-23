---
title: Database table cleanup
---

When Auditing entries or AttributeService entries are being deleted, Alfresco does not actually delete all of the associated data. The structures of the `alf_prop_*` tables are designed to heavily reuse individual textual or numerical data elements, much to the point that cascade deletion upon removal of audit entries or attributes is no longer possible as the same values could be referenced in other elements.

Since Alfresco 4.1.9, 4.2.2 (Enterprise) and 5.0 (Community), Alfresco has included a default job to clean up dangling data in `alf_prop_*` tables. This CRON job is disabled by default and must be re-configured to be able to run.

## Schedule cleanup of database tables {#schedulerdbcleanup}

You can schedule or manually trigger the `propTablesCleanupTrigger` script to clean up audit and property values tables (`alf_audit_` and `alf_prop_` tables).

If you plan to run a scheduled cleanup job for a large database (i.e. table sizes greater than 10 million rows), use the V2 cleanup job. Note that this is the default algorithm used in Content Services 6.2.1 onwards. See [Alternative method for scheduling cleanup of database tables](#alternativedbcleanup) for more.

`propTablesCleanupTrigger` is a `MonitoredCronTrigger` script, and a schedule to run this script can be set in the `alfresco-global.properties` file or by using JMX.

To run this script on a schedule, add the following line to the `alfresco-global.properties` file:

```text
attributes.propcleaner.cronExpression=* * * * * ? 2099
```

The default setting of this property is a Quartz Cron expression, `0 0 3 ? * SAT` which runs every Saturday at 3 am. Alfresco recommends that you do not change the default value unless required.

Here is an example of the output you should expect to see in the debug information:

```text
2020-04-14 13:22:17,493 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 100000 rows of 2 rows from table alf_audit_app.
2020-04-14 13:22:17,493 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 1 rows of 0 rows from table alf_audit_entry.
2020-04-14 13:22:17,509 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 100000 rows of 1 rows from table alf_prop_unique_ctx.
2020-04-14 13:22:17,524 INFO [schema.script.ScriptExecutorImpl] [DefaultScheduler_Worker-3] Processing from 0 to 100000 rows of 3 rows from table alf_prop_root.
```

The default batch size is 100000 rows.

> **CAUTION:** The `propTablesCleanupTrigger` script is designed for occasional, scheduled cleanups of the database tables. Ensure that you run this script during periods when there is minimal or no load on the server. If there is load on the server while `propTablesCleanupTrigger` script is running, you might experience database conflicts and related errors.

## Alternative method for scheduling cleanup of database tables {#alternativedbcleanup}

You can use an alternative algorithm for the cleanup of database tables. This is recommended for large databases (i.e. table sizes greater than 10 million rows). Note that this is the default algorithm used in Content Services 6.2.1 onwards.

### Property table cleaner default settings

Below are the default settings for the V1 cleanup job:

```text
system.prop_table_cleaner.algorithm=V1
# Prop cleaner V2 properties
system.delete_not_exists.batchsize=100000
system.delete_not_exists.delete_batchsize=1000
system.delete_not_exists.read_only=false
system.delete_not_exists.timeout_seconds=-1
```

If you're running an earlier version than Content Services 6.2.1, then follow the steps in the remainder of this page to use the V2 algorithm.

### Run new job in read-only mode

1. Change the prop table cleaner default properties in `alfresco-global.properties`:

    1. Enable the new prop cleaner algorithm:

        ```text
        system.prop_table_cleaner.algorithm=V2
        ```

    2. Set the prop cleaner to read only:

        ```text
        system.delete_not_exists.read_only=true
        ```

    3. Set the prop cleaner timeout:

        ```text
        # This will stop the next batch from being processed if the elapsed time from
        the job start is greater than 1 hour
        system.delete_not_exists.timeout_seconds=3600
        ```

2. Restart the application server.

3. Open a web browser.

    1. Go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-log-settings`.

    2. Enable debug logging to see the amount of data that would be deleted by the algorithm. Change the log setting to `DEBUG` for package name:

        ```text
        org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor
        ```

4. Go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-scheduledjobs` in a web browser, and execute the `propTablesCleanupJobDetail` job.

5. Check the logs to see which values would be deleted from each table:

    ```text
    alf_prop_root
    alf_prop_value
    alf_prop_string_value
    alf_prop_serializable_value
    alf_prop_double_value
    ```

    You should see something like:

    ```text
    [org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor]
    [DefaultScheduler_Worker-10] Script would have deleted a total of X items from
    table alf_prop_root.
    ```

### Run new job by default

1. Change the prop table cleaner default properties in `alfresco-global.properties`:

    1. Enable the new prop cleaner algorithm:

        ```text
        system.prop_table_cleaner.algorithm=V2
        ```

    2. Set the prop cleaner to delete:

        ```text
        system.delete_not_exists.read_only=false
        ```

    3. Set the prop cleaner timeout:

        ```text
        # This will stop the next batch from being processed if the elapsed time from
        the job start is greater than 1 hour
        system.delete_not_exists.timeout_seconds=3600
        ```

2. Restart the application server.

3. Open a web browser.

    1. Go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-log-settings`.

    2. Enable debug logging to see the amount of data that was deleted by the algorithm:

        Change the log setting to `DEBUG` for package name `org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor`.

        > **CAUTION:** The algorithm could delete more than the initial value due to cascading deletes being enabled in some tables.

4. Open a web browser, go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-scheduledjobs`, and execute the `propTablesCleanupJobDetail` job.

5. Check the logs to see which values were deleted from each table.

    ```text
    alf_prop_root
    alf_prop_value
    alf_prop_string_value
    alf_prop_serializable_value
    alf_prop_double_value
    ```

    You should see something like:

    ```bash
    [org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor]
    [DefaultScheduler_Worker-10] Script deleted a total of X items from table
    alf_prop_root.
    ```

**Noteworthy:**

* Since the server(s) and database could be configured in a specific way for each customer, we recommend that you test the setting for the timeout property. This should be changed according to the capabilities of the system or its load.

    ```text
    # This will stop the next batch from being processed if the elapsed time from
    the job start is greater than 1 hour
    system.delete_not_exists.timeout_seconds=3600
    ```

* The algorithm can be further improved by changing the batch values according to the capabilities of the system:

    ```text
    # Items processed in one prepared statement
    system.delete_not_exists.batchsize=100000
    # Items deleted in one prepared delete statement
    system.delete_not_exists.delete_batchsize=1000
    ```

* > **CAUTION:** The algorithm could delete more than the initial value stated when running in read-only mode due to cascading deletes being enabled in some tables.

* For more detailed logging, change the log setting to TRACE for package name `org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor`.

    > **Important:** **This could generate a lot of logging, so revert it to its default logging level when not needed.**
