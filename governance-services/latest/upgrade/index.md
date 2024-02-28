---
title: Upgrade Governance Services
---

To upgrade Governance Services you need to make sure you're running the correct version of Alfresco Content Services.

Check the [Supported Platforms]({% link content-services/latest/support/index.md %}) and 
the [Alfresco Content Services upgrade paths]({% link content-services/latest/upgrade/index.md %}).

When your Alfresco Content Services installation is upgraded, you can apply the new AMP files for Governance Services.

1. Ensure your current production environment is running a version that is supported for upgrading.

2. Download Alfresco Content Services 23.x and the compatible Governance Services Distribution ZIP from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

3. Upgrade to Alfresco Content Services.

    For more information about upgrading Alfresco Content Services, see [Upgrading Alfresco]({% link content-services/latest/upgrade/index.md %}).

    You can start the server at this point to verify that the upgrade was successful.

4. Apply the Governance Services to the upgraded Alfresco Content Services installation.

    Follow the instructions in [Install using the distribution ZIP]({% link governance-services/latest/install/zip.md %}).

    > **Note:** If you have {% include tooltip.html word="easyaccessrecords" text="easy access records" %} (previously know as in-place records) that are pre-2.3.0.8 versions of Records Management, then you also need to [run a webscript](#easy_access_upgrade) so that easy access records created in pre-2.3.0.8 sites are shown in the search results of users without Records Management permissions.

5. Restart the Alfresco Content Services server, if it is already running.

6. Login to Alfresco Share to view the Records Management data.

Your existing Records Management data is migrated to Alfresco Content Services.

Any existing Records Management data is preserved when you upgrade from a previous version of Records Management  
(it is 'patched' in the same way as updated data in the server). The {% include tooltip.html word="fileplan" text="File Plan" %} structures will appear as they did 
in 1.0 and the previous Records Management site is migrated. Therefore, you do not need to create the Records Management site again.

From Records Management 2.0 onwards you cannot create a record series; instead you create a record category with 
no {% include tooltip.html word="retentionschedule" text="retention schedule" %}. The record series is retained as a deprecated model construct to be used when migrating 
existing record series from a 1.0 installation. This means that any previously created record series will appear and 
behave as record categories in 2.2, but will be of the deprecated type record series (directly extended from record category). 
If any custom data was defined for record series in 1.0, this will still appear in the Records Management site, 
but only for the migrated record series.

Note also that any pre-configured saved searches from your previous version are not available after an upgrade.

## Upgrading easy access records from pre-2.3.0.8 versions {#easy_access_upgrade}

If you upgrade from a pre-2.3.0.8 version of Records Management, then an additional web script needs to be run so that 
easy access records (previously known as in-place records) created in pre-2.3.0.8 sites are shown in the search results 
of users without Records Management permissions.

It can be run as a one-off operation to convert all existing records or, for better performance on larger repositories, 
it can also be run on a user-defined number of records.

> **Note:** Easy access records created on Records Management 2.3.0.8 and later are shown without running the web script.

There are four parameters available for the web script.

* `batchsize` (mandatory) - the batch size to process records in. So, for example, if you enter `batchsize=100`, then records will be processed in consecutive batches of 100.
* `maxProcessedRecords` (optional) - the maximum number of records to be processed. If unspecified, this value defaults to that of the `batchsize`. If set to 0, all records are processed.
* `export` (optional) - true or false (the default is false). If true is selected then a list of processed records is exported in csv format. The list shows the file name and file node reference.
* `parentNodeRef` (optional) - process records in a specified folder and its sub-folders. See step 3 for how to get the `parentNodeRef` node reference.

You need Alfresco Administrator permissions to run the web script.

1. Paste or type `http://<server name>:<server port>/alfresco/s/api/rm/rm-dynamicauthorities` into your browser.

2. Append your required parameters, for example:

    * To process 50 records in one batch of 50 type `http://<server name>:<server port>/alfresco/s/api/rm/rm-dynamicauthorities?batchsize=50`
    * To process 100 records in two batches of 50 type `http://<server name>:<server port>/alfresco/s/api/rm/rm-dynamicauthorities?batchsize=50&maxProcessedRecords=100`
    * To process all pre-2.3.0.8 records in batches of 100 type `http://<server name>:<server port>/alfresco/s/api/rm/rm-dynamicauthorities?batchsize=100&maxProcessedRecords=0`
    * To process 10 records in one batch of 10 with csv output type `http://<server name>:<server port>/alfresco/s/api/rm/rm-dynamicauthorities?batchsize=10&maxProcessedRecords=10&export=true`

3. Press Enter to run the web script. You may be prompted for your system username and password.

    > **Note:** If you enter a large batch number then your browser may time out. The process will continue running in the background and details will be recorded in the server logs. As such, it's recommended that you set a `maxProcessedRecords` or use `parentNodeRef` to process a folder at a time.

    > **Tip:** To get the `parentNodeRef` for a folder go to its parent folder, then hover over the folder and select **View Details**. The node ref will be shown in the browser address.

    ![Finding a node ref]({% link governance-services/images/finding-node-ref.png %})

4. Results and/or errors are reported as a JSON-formatted string, or a CSV file if you use the `export` parameter. Processed records are shown in the `alfresco.log` as below:

    ```text
    2016-09-16 13:46:44,409 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processing – BEGIN
    [ output cut ]
    2016-09-16 13:46:47,131 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processing record file149 (2016-1474021730514).txt - BEGIN
    2016-09-16 13:46:47,150 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processing record file149 (2016-1474021730514).txt - END
    2016-09-16 13:46:47,152 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processing record file150 (2016-1474021731516).txt - BEGIN
    2016-09-16 13:46:47,174 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processing record file150 (2016-1474021731516).txt - END
    2016-09-16 13:46:47,238 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processing - END
    2016-09-16 13:46:47,238 INFO  [org.alfresco.repo.web.scripts.roles.DynamicAuthoritiesGet] [http-apr-8080-exec-6] Processed first 100 records.
    ```

