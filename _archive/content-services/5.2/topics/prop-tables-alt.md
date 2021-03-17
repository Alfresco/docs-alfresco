---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Alternative method for scheduling cleanup of database tables

You can use an alternative algorithm for the cleanup of database tables. This is recommended for large databases \(i.e. table sizes greater than 10 million rows\).

**Property table cleaner default settings**

Below are the default settings for the V1 cleanup job:

```
system.prop_table_cleaner.algorithm=V1
# Prop cleaner V2 properties
system.delete_not_exists.batchsize=100000
system.delete_not_exists.delete_batchsize=1000
system.delete_not_exists.read_only=false
system.delete_not_exists.timeout_seconds=-1
```

Follow the steps in the remainder of this page to use the V2 algorithm.

## Running the new job in read-only mode:

1.  Change the prop table cleaner default properties in `alfresco-global.properties`:
    1.  Enable the new prop cleaner algorithm:

        ```
        system.prop_table_cleaner.algorithm=V2
        ```

    2.  Set the prop cleaner to read only:

        ```
        system.delete_not_exists.read_only=true
        ```

    3.  Set the prop cleaner timeout:

        ```
        # This will stop the next batch from being processed if the elapsed time from 
        the job start is greater than 1 hour
        system.delete_not_exists.timeout_seconds=3600
        ```

2.  Restart the application server.
3.  Open a web browser.
    1.  Go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-log-settings`.
    2.  Enable debug logging to see the amount of data that would be deleted by the algorithm. Change the log setting to `DEBUG` for package name:

        ```
        org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor
        ```

4.  Go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-scheduledjobs` in a web browser, and execute the `propTablesCleanupJobDetail` job.
5.  Check the logs to see which values would be deleted from each table:

    ```
    alf_prop_root 
    alf_prop_value 
    alf_prop_string_value 
    alf_prop_serializable_value 
    alf_prop_double_value
    ```

    **Note:** You should see something like:

    ```
    [org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor] 
    [DefaultScheduler_Worker-10] Script would have deleted a total of X items from 
    table alf_prop_root.
    ```


## Running the new job by default:

1.  Change the prop table cleaner default properties in `alfresco-global.properties`:
    1.  Enable the new prop cleaner algorithm:

        ```
        system.prop_table_cleaner.algorithm=V2
        ```

    2.  Set the prop cleaner to delete:

        ```
        system.delete_not_exists.read_only=false
        ```

    3.  Set the prop cleaner timeout:

        ```
        # This will stop the next batch from being processed if the elapsed time from  
        the job start is greater than 1 hour
        system.delete_not_exists.timeout_seconds=3600
        ```

2.  Restart the application server.
3.  Open a web browser.
    1.  Go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-log-settings`.
    2.  Enable debug logging to see the amount of data that was deleted by the algorithm:

        Change the log setting to `DEBUG` for package name `org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor`.

        CAUTION:

        The algorithm could delete more than the initial value due to cascading deletes being enabled in some tables.

4.  Open a web browser, go to `<alfresco_ip>/alfresco/s/enterprise/admin/admin-scheduledjobs`, and execute the `propTablesCleanupJobDetail` job.
5.  Check the logs to see which values were deleted from each table.

    ```
    alf_prop_root 
    alf_prop_value 
    alf_prop_string_value 
    alf_prop_serializable_value 
    alf_prop_double_value
    ```

    **Note:** You should see something like:

    ```
    [org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor] 
    [DefaultScheduler_Worker-10] Script deleted a total of X items from table 
    alf_prop_root.
    ```


**Noteworthy:**

-   Since the server\(s\) and database could be configured in a specific way for each customer, we recommend that you test the setting for the timeout property. This should be changed according to the capabilities of the system or its load.

    ```
    # This will stop the next batch from being processed if the elapsed time from 
    the job start is greater than 1 hour
    system.delete_not_exists.timeout_seconds=3600
    ```

-   The algorithm can be further improved by changing the batch values according to the capabilities of the system:

    ```
    # Items processed in one prepared statement
    system.delete_not_exists.batchsize=100000
    # Items deleted in one prepared delete statement
    system.delete_not_exists.delete_batchsize=1000
    ```

-   CAUTION:

    The algorithm could delete more than the initial value stated when running in read-only mode due to cascading deletes being enabled in some tables.

-   For more detailed logging, change the log setting to TRACE for package name `org.alfresco.repo.domain.schema.script.DeleteNotExistsExecutor`.

    **Important:** **This could generate a lot of logging, so revert it to its default logging level when not needed.**


**Parent topic:**[JMX read-only monitoring beans](../concepts/jmx-readonly-beans.md)

