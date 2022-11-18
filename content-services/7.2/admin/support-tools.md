---
title: Support Tools
---

With the **Support Tools** in the [Repo Admin Console]({% link content-services/7.2/admin/admin-console.md %}) you can monitor your Content Services system and diagnose performance, communication, and memory issues.

You can also export information and reports for further analysis, or to send to the Alfresco Support Team.

> **Note:** Some older browsers don't support the Support Tools live graphs.

## Active Sessions

Use this tool to check database pool usage and current sessions for active users.

The monitoring and management extensions can be subdivided into three categories:

* **Database Connection**

    Displays the number of active and idle connections with the database.

* **Active Sessions / Users**

    Displays the number of active sessions and the number of active users.

* **Logged in users**

    View all users who are currently logged in. Click **Log Out User** to log users out of the repository.

    > **Note:** Clients such as Alfresco Share will automatically log a user back into the repository if the client has cached valid authentication details.

## Hot Threads

Use this tool to see the five threads that are consuming the most processing power.

When you open the Hot Threads screen it displays a stack trace of the current five highest consuming threads (hot threads).

You can:

* **Get Hot Threads**

    Open a new tab displaying the current five hot threads at the time you open the tab. The highest consuming threads will change over time so each tab will contain different data. You can open as many tabs as required.

* **Save Current Hot Threads Report**

    Download a text file with details of the currently displayed report tab.

* **Save All**

    Download a text file with details of all the report tabs.

## Thread Dump

Use this tool to generate and compare thread dumps to troubleshoot performance problems and deadlocks.

When you open the Thread Dump screen it displays a snapshot of all threads in currently running processes.

You can:

* **Get Another Thread Dump**

    Open a new tab displaying the latest thread dump, and then compare to identify the cause of any performance issues. You can open as many tabs as required.

* **Save Current Thread**

    Download a text file with details of the currently displayed thread dump tab.

* **Save All**

    Download a text file with details of all the thread dump tabs.

## Thread Profiler

Use this tool to view the status and details of all threads.

All threads in the system are included in the profiler, with statuses of running, waiting, timed waiting, and blocked. The memory committed to each thread and its CPU time is also displayed.

You can:

* Click **Start Thread Profiler** to get current information on threads
* Click on a thread to see its stack trace
* Click on a column header to order thread details as required

## Thread Sampler

Use this tool to see what each system thread is doing.

All threads are included in the sampler, with statuses of running, waiting, timed waiting, and blocked. You can:

* Click **Start Thread Sampler** to open a new thread sample. New thread samples are displayed according to the sample rate you select. Click **Stop Thread Sampler** as required.
* Click on a thread to see its stack trace
* Click **Save All** to download a .json file of the thread samples
* Click **Upload All** to upload and analyze a thread list that you've previously downloaded

> **Note:** If a thread hasn't changed since the previous stack trace it displays the < symbol.

## JMX Settings {#jmxsettings}

Use this tool to view and revert JMX settings, and export a JMX dump.

If you've changed settings using JMX, then these are persisted through sessions, but aren't updated in the global properties files. With this tool you can see JMX values that differ from global properties setting. If you want to apply the global property value to the JMX value to resolve any system issues the inconsistency is causing, then click **Revert**.

You can also click **Export** to download a JMX dump.

See [JMX monitoring and management extensions]({% link content-services/7.2/config/index.md %}#jmx-monitoring-and-management-extensions) for more information.

## Log Settings

Use this tool to make changes to the log file in runtime and view the tail log.

Rather than making changes to the log file directly and restarting your server so they take effect, you can use this tool to make changes in runtime. These changes will persist until the server is shut down or restarted, at which point any changes will be lost.

Packages that are currently configured are displayed for services such as Tomcat and Java libraries.

You can:

* Add a package to the log. Just enter the package name, select a log setting and click **Add**.
* Change the setting for any packages in the log.
* Click **Tail Log** to see the tail log. This can be useful if you don't have access to the console that you're running the repository on. You can select the refresh interval, switch off auto refresh, and download the log as a text file.

  > **Note:** The default tail log is limited to 25,000 characters.

## Applied Patches

Use this tool to view details of all software patches applied to the Content Services database schema.

See [Troubleshooting schema-related problems]({% link content-services/7.2/admin/troubleshoot.md %}#troubleshoot-database-scheme-problems) for more information on how to manage schema-related issues.

## System Performance

Use this tool to see live and historical detail on your system performance.

You can see details of memory usage, CPU usage, and the number of threads running. For each of these you can select the chart timescale.

* **Memory Usage**

  Displays the memory usage for the timescale you select.

  * Max (MB) - the maximum memory available
  * Committed (MB) - the memory reserved for Content Services
  * Used (MB) - what your system is currently using

* **CPU Usage**

  Displays the current CPU usage and the historical usage for the timescale you select.

* **Threads**

  Displays the number of threads currently running and the peak thread count (the historical maximum number of threads that has been reached since the last system start or restart) Select the timescale that you want to see.

> **Note:** The data in the graphs is refreshed every two seconds using a lightweight webscript that runs a JMX bean operation. This has negligible impact on performance.

## Scheduled Jobs

Use this tool to view all the currently scheduled jobs on your system.

You have the option to click **Run** to manually run individual scheduled jobs to ensure they're functioning correctly. See [Scheduled Jobs]({% link content-services/7.2/develop/repo-ext-points/scheduled-jobs.md %}) for more details.

> **Note:** Be careful when running a job manually. Triggering a Lucene backup for example may cause a system outage for a few minutes.

## Test Transform

Use this tool to view and test transformation settings.

You can also change transformation limits and add and configure additional transformations.

> **Note:** Some uncommon file types may not be included in the test.

* **Transformer Properties**

  Select from **All Properties** and **Customer Properties** and click **Get Properties** to view a log of all system transformer properties. You can copy and paste from the log to use in other parts of the Test Transform tool.

* **Set Transformer Properties**

  You can:

  * Add a new transformer property by entering the property and clicking **Set Properties**
  * Edit an existing transformer property by entering the property and new value and clicking **Set Properties**

* **Remove Transformer Properties**

  Enter a property name and click **Remove Properties** to remove an existing transformer property. Only remove custom properties.

* **Transformation Log**

  Click **Get Transformation Log** to view the latest transformation log entries.

* **Transformation Debug Log**

  Click **Get Debug Transformation Log** to view the latest transformation debug log entries - this gives more details of what the transformer is doing than the standard Transformation Log.

* **Transformer Names**

  Click **Get Transformer Names** to get a list of all the top level transformers in your system.

* **Transformation Statistics**

  Select a transformer and source and target extensions then click **Get Transformation Statistics** to view details on transformation speed, usage, average transformation time and so on. If you don't make any selections then all transformations statistics will be shown.

* **Test Transformation**

  Check the transformers are working by running a test transform. Select a transformer or use the (AUTO) default to automatically select one. Then select From and To targets and a Context.

  > **Note:** Leaving any of these unselected will mean that all options are included.

  Click **Test Transform** to run the test.

* **Transformations By Extension**

  Check which transformations between file types are permitted on your system. Select options to check, or make no selection to test check all transform options, then click **Get Transformations by Extension**.

* **Transformation By Transformer**

  Check which transformations available for each transformer. Select options to check, or make no selection to test check all transform options, then click **Get Transformations by Transformer**.
