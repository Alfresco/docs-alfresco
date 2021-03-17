---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: JMX bean categories reference read-only monitoring
---

# JMX read-only monitoring beans

This section contains the list of read-only monitoring beans.

## Alfresco:Name=Authority

Exposes key metrics relating to the authority service:

-   **NumberOfGroups**

    The number of groups known to the Authority Service.


-   **NumberOfUsers**

    The number of users known to the Authority Service.


## Alfresco:Name=ConnectionPool

Allows monitoring of the Apache Commons DBCP database connection pool and its configuration. It exposes the following properties:

-   **DefaultTransactionIsolation**

    The JDBC code number for the transaction isolation level, corresponding to those in the `java.sql.Connection` class. The special value of -1 indicates that the database's default transaction isolation level is in use and this is the most common setting. For the Microsoft SQL Server JDBC driver, the special value of 4096 indicates snapshot isolation.

-   **DriverClassName**

    The fully-qualified name of the JDBC driver class.

-   **InitialSize**

    The number of connections opened when the pool is initialized.

-   **MaxActive**

    The maximum number of connections in the pool.

-   **MaxIdle**

    The maximum number of connections that are not in use kept open.

-   **MaxWait**

    The maximum number of milliseconds to wait for a connection to be returned before throwing an exception \(when connections are unavailable\) or -1 to wait indefinitely.

-   **MinEvictableIdleTimeMillis**

    The minimum number of milliseconds that a connection may sit idle before it is eligible for eviction.

-   **MinIdle**

    The minimum number of connections in the pool.

-   **NumActive**

    The number connections in use; a useful monitoring metric.

-   **NumIdle**

    The number of connections that are not in use; another useful monitoring metric.

-   **Url**

    The JDBC URL to the database connection.

-   **Username**

    The name used to authenticate with the database.

-   **RemoveAbandoned**

    A Boolean that when true indicates that a connection is considered abandoned and eligible for removal if it has been idle longer than the `RemoveAbandonedTimeout`.

-   **RemoveAbandonedTimeout**

    The time in seconds before an abandoned connection can be removed.

-   **TestOnBorrow**

    A boolean that when true indicates that connections will be validated before being borrowed from the pool.

-   **TestOnReturn**

    A boolean that when true indicates that connections will be validated before being returned to the pool.

-   **TestWhileIdle**

    A boolean that when true indicates that connections will be validated whilst they are idle.

-   **TimeBetweenEvictionRunsMillis**

    The number of milliseconds to sleep between eviction runs, when greater than zero.

-   **ValidationQuery**

    The SQL query that will be used to validate connections before returning them.


## Alfresco:Name=ContentStore,Type=\*,Root=\*

Allows monitoring of each of Alfresco content stores. When `Type=FileContentStore`, the Root attribute of the name holds the file system path to the store. The following properties are exposed:

-   **TotalSize**

    The total size in bytes.

-   **WriteSupported**

    Stated whether the store currently allow write operations.


## Alfresco:Name=ContentTransformer,Type=\*

Exposes key information about the transformation utilities relied upon by Alfresco. Currently, there are two instances:

-   `Alfresco:Name=ContentTransformer,Type=ImageMagick`
-   `Alfresco:Name=ContentTransformer,Type=pdf2swf`

The following properties are exposed:

-   **Available**

    A boolean that when true indicates that the utility is actually installed correctly and was found when the Alfresco server started up.


-   **VersionString**

    The version information returned by the utility, if it was found to be available.


## Alfresco:Name=DatabaseInformation

Exposes metadata about the database itself.

-   **DatabaseMajorVersion**

    The database version number.

-   **DatabaseMinorVersion**

    The database version number.

-   **DatabaseProductName**

    The database product name.

-   **DatabaseProductVersion**

    The database product version.

-   **DriverMajorVersion**

    The driver major version number.

-   **DriverMinorVersion**

    The driver minor version number.

-   **DriverName**

    Product name of the JDBC driver.

-   **DriverVersion**

    The driver version number.

-   **JDBCMajorVersion**

    The major version number of the JDBC specification supported by the driver.

-   **JDBCMinorVersion**

    The minor version number of the JDBC specification supported by the driver.

-   **StoresLowerCaseIdentifiers**
-   **StoresLowerCaseQuotedIdentifiers**
-   **StoresMixedCaseIdentifiers**
-   **StoresMixedCaseQuotedIdentifiers**
-   **StoresUpperCaseIdentifiers**
-   **StoresUpperCaseQuotedIdentifiers**
-   **URL**

    The JDBC URL of the database connection.

-   **UserName**

    The name used to authenticate with the database.


## Alfresco:Name=Hibernate

An instance of the `StatisticsService` class provided by Hibernate, allowing access to an extensive set of Hibernate-related metrics.

## Alfresco:Name=LicenseDescriptor

Exposes the parameters of the Alfresco Enterprise license.

-   **Days**

    The number of days of usage that the license allows from its issue date, if the license is time limited.


-   **HeartBeatDisabled**

    A boolean that when true indicates that the license permits the usage of the Alfresco server with its heartbeat functionality disabled \(involving the automatic submission of basic repository statistics to Alfresco\).

-   **Holder**

    The person or entity to which the license was issued.

-   **Issued**

    The date and time on which the license was issued.

-   **Issuer**

    Who issued the license \(always Alfresco\).

-   **RemainingDays**

    The number of days of usage that the license allows from today, if the license is time limited.

-   **Subject**

    The product edition to which the license applies.

-   **ValidUntil**

    The date on which the license will expire, if the license is time limited.


## Alfresco:Name=LuceneIndexes,Index=\*

Allows monitoring of each searchable index. The Index attribute of the name holds the relative path to the index under alf\_data/lucene-indexes and the following properties are exposed:

-   **ActualSize**

    The size of the index in bytes.

-   **EntryStatus**

    A composite table containing the current status of each entry in the index \(double-click the value in JConsole to expand it and view its rows\). Each row in the table has a key of the format `<ENTRY TYPE>-<ENTRY STATE>`, for example, `DELTA-COMMITTED` and a value containing the number of entries with that type and state.

-   **EventCounts**

    A composite table containing the names and counts of significant events that have occurred on the index since the server was started \(double-click the value in JConsole to expand it and view its rows\). Examples of event names are `CommittedTransactions`, `MergedDeletions` and `MergedIndexes`.

-   **NumberOfDocuments**

    The number of documents in the index.

-   **NumberOfFields**

    The number of fields known to the index.

-   **NumberOfIndexedFields**

    The number of these fields that are indexed.

-   **UsedSize**

    The size of the index directory in bytes. A large discrepancy from the value of `ActualSize` may indicate that there are unused data files.


## Alfresco:Name=ModuleService

Allows monitoring of installed modules.

-   **AllModules**

    A composite table containing the details of all modules currently installed. Double-click the value in JConsole to expand it and use the **Composite Navigation** arrows to navigate through each module.


## Alfresco:Name=OpenOffice

Exposes information about the OpenOffice server used for document conversions. In addition to the property below, this bean has a property corresponding to each registry key in the `org.openoffice.Setup` sub-tree of the OpenOffice configuration registry, providing useful metadata about the particular flavor of OpenOffice that is installed. For example, `ooName` provides the product name, for example, `"OpenOffice.org"` and `ooSetupVersionAboutBox` provides its version, for example, "3.0.0".

-   **available**

    A Boolean that when true indicates that a connection was successfully established to the OpenOffice server.


## Alfresco:Name=PatchService

Allows monitoring of installed patches.

-   **AppliedPatches**

    A composite table containing the details of all patches currently installed. Double-click the value in JConsole to expand it and use the "Composite Navigation" arrows to navigate through each patch.


## Alfresco:Name=RepositoryDescriptor,Type=\*

Exposes metadata about the Alfresco repository. Currently, there are two instances of this bean:

-   **Alfresco:Name=RepositoryDescriptor,Type=Installed**

    Exposes information about the initial repository installation, before any patches or upgrades were installed. Of most relevance to patch and upgrade scenarios.

-   **Alfresco:Name=RepositoryDescriptor,Type=Server**

    Exposes information about the current server version, as contained in the Alfresco war file. This instance should be used to determine the current properties of the server.


Both expose the following properties:

-   **Edition**

    The Alfresco edition, for example, "Enterprise".

-   **Id**

    The repository unique ID. This property is only available from the Installed descriptor.

-   **Name**

    The repository name.

-   **Schema**

    The schema version number.

-   **Version**

    The full version string, including build number, for example, "3.1.0 \(stable r1234\)".

-   **VersionBuild**

    The build number.

-   **VersionLabel**

    An optional label given to the build, such as "dev" or "stable".

-   **VersionMajor**

    The first component of the version number.

-   **VersionMinor**

    The second component of the version number.

-   **VersionNumber**

    The full version number, composed from major, minor and revision numbers.

-   **VersionRevision**

    The third component of the version number.


## Alfresco:Name=Runtime

Exposes basic properties about the memory available to the JVM. Note that a Sun JVM exposes much more detailed information through its platform MX Beans.

-   **FreeMemory**

    The amount of free memory in bytes.

-   **MaxMemory**

    The maximum amount of memory that the JVM will attempt to use in bytes.

-   **TotalMemory**

    The total amount of memory in use in bytes.


## Alfresco:Name=Schedule,Group=\*,Type=\*,Trigger=\*

Allows monitoring of the individual triggers, i.e. scheduled jobs, running in the Quartz scheduler. The attributes of the object name have the following meaning:

-   **Group**

    The name of the schedule group that owns the trigger. Typically DEFAULT.

-   **Type**

    The type of trigger, typically MonitoredCronTrigger or MonitoredSimpleTrigger. Triggers of different types have different properties, as you will see below.

-   **Trigger**

    The name of the trigger itself. Must be unique within the group.


All instances have the following properties:

-   **CalendarName**

    The name of the scheduling Calendar associated with the trigger, or null if there is not one.

-   **Description**

    An optional textual description of the trigger.

-   **EndTime**

    The time after which the trigger will stop repeating, if set.

-   **FinalFireTime**

    The time at which the last execution of the trigger is scheduled, if applicable.

-   **Group**

    The name of the schedule group that owns the trigger.

-   **JobGroup**

    The name of the schedule group that owns the job executed by the trigger.

-   **JobName**

    The name of the job executed by the trigger.

-   **MayFireAgain**

    A Boolean that when true indicates that it is possible for the trigger to fire again.

-   **Name**

    The name of the trigger.

-   **NextFireTime**

    The next time at which the trigger will fire.

-   **PreviousFireTime**

    The previous time at which the trigger fired.

-   **Priority**

    A numeric priority that decides which trigger is executed before another in the event of a 'tie' in their scheduled times.

-   **StartTime**

    The time at which the trigger should start.

-   **State**

    The current state of the trigger.

-   **Volatile**

    A Boolean that when true indicates that the trigger will not be remembered when the JVM is restarted.


When Type=MonitoredCronTrigger, the following additional properties are available:

-   **CronExpression**

    A unix-like expression, using the same syntax as the cron command, that expresses when the job should be scheduled.

-   **TimeZone**

    The name of the time zone to be used to interpret times.


When Type=MonitoredSimpleTrigger the following additional properties are available:

-   **RepeatCount**

    The number of times the job should repeat, after which it will be removed from the schedule. A value of -1 means repeat indefinitely.

-   **RepeatInterval**

    The time interval in milliseconds between job executions.

-   **TimesTriggered**

    The number of times the job has been run.


## Alfresco:Name=SystemProperties

A dynamic MBean exposing all the system properties of the JVM. The set of standard system properties is documented on the Apache website.

**Parent topic:**[JMX bean categories reference](../concepts/jmx-reference.md)

