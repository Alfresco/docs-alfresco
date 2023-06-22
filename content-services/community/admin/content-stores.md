---
title: Set up content stores
---

A content store provides low-level access to stored binaries ensuring that, for every write, a new binary storage location is made available. This information gives an overview on the content stores, their types, and configuration details with examples.

## Content stores overview

Background information on the content store and content binary life cycle.

A content store (`ContentStore`) or combinations of content stores can be used to control how and where the binary files are physically stored. Binary streams can be stored across a range of locations and can be encrypted/decrypted, as necessary. Also, fast versus slow storage options can be wired up together for efficient storage and access.

Community Edition supports a number of different content stores. These are the File content store (default content store), Caching content store, and Aggregating content store. For more information on each content store, see [Content store types](#cstypes).

Common behavior of different content stores:

* Content stores always write to a new location, so binary files are never overwritten. The content is never modified.
* Each content store can support its own URL standard.

Content binaries life cycle:

* **Stage 1 - Content writes:**

    When you create a file in Community Edition, it becomes a content (in form of a `.bin` file) and is stored in the default file content store, for example `<ALFRESCO_HOME>\alf_data\contentstore` directory. The metadata for the content is stored in the database. The database contains a reference to the `.bin` file.

* **Stage 2 - Content reads:**

    When a request is made to the `ContentStore` for a `ContentReader`, the client reads the content using methods on the `ContentReader`.

* **Stage 3 - Copying, moving and versioning files:**

    The content binaries are **never modified** by any high-level process. Moving, copying and versioning a file merely affects the content metadata. It is possible to end up with several references to the same raw binary content. Also, writes to the file system do not become visible until the metadata has been committed to the database.

* **Stage 4 - Cleaning up binary files:**

    When a content URL is no longer attached to any metadata in the system, it is referred to as orphaned. In order to allow adequate time for backup, the content binaries are not deleted immediately. Instead, they're deleted on a schedule. The job runs against the following `CRON` expression:

```text
system.content.orphanCleanup.cronExpression=0 0 4 * * ?
```

As an additional safety measure, the binaries are first copied to a local backup at:

```text
dir.contentstore.deleted=${dir.root}/contentstore.deleted
```

This location can be cleared out by administrators, as necessary. The time to protect orphaned binaries is controlled by:

```text
system.content.orphanProtectDays=14
```

In most cases, there is no need to change this and the value should be large enough to encompass a sufficient number of full content backups.

## Content store types {#cstypes}

By default, Community Edition is configured to save files or content items in the File content store and orphaned files in the Deleted content store. Other content stores are also provided, which may be used in place of or in addition to the default stores. This information provides an overview on the File content store and additional content stores that you can use with Community Edition.

### File content store

The File content store is the default content store.

The **File content store** saves the files or content items on a file system under the root directory. Within the root directory, the files are stored in numeric directories based upon the creation time of the document. The reason for storing the files in a directory structure is to assist incremental backup. The metadata of your file is stored in the database.

 Community Edition does not modify any file that is stored in the content store. The `fileContentStore` is pointed to by the `${dir.contentstore}` property.

### Caching content store (CCS)

This information provides an overview of the Caching content store (CCS) and describes how to configure it.

#### CachingContentStore class overview {#ccsclassoverview}

The `CachingContentStore` class adds transparent caching to any `ContentStore` implementation. Wrapping a slow `ContentStore` in a `CachingContentStore` improves access speed in many use cases. Example use cases include document storage using a XAM appliance or cloud-based storage, such as Amazon's S3.

The diagram shows the architecture of the Caching content store.

![ccs_arch]({% link content-services/images/ccs_arch.png %})

The major classes and interfaces that form the Caching Content Store are:

* `CachingContentStore`:

    This is the main class that implements the ContentStore interface, and can therefore, be used anywhere that a `ContentStore` could be used. The `CachingContentStore` handles all the high level logic of interaction between the cache and the backing store, while the caching itself is provided by a collaborating `ContentCache` object.

* `ContentCache`:

    This class is responsible for putting items into and getting items from the cache. The single supplied implementation (`ContentCacheImpl`) for this class uses a lookup table to keep track of the files that are being managed by the cache, and a directory on the local file system to store the cached content files. The lookup table itself is a `SimpleCache` implementation instance (for example, `DefaultSimpleCache` or `HazelcastSimpleCache` when running a clustered environment).

* `QuotaManagerStrategy`:

    The quota managers implement this interface and control how the disk usage is consumed for cached content storage. Community Edition provides two implementations for this: `UnlimitedQuotaStrategy` (does not restrict disk usage, thereby effectively disabling the quota function) and `StandardQuotaStrategy` (attempts to keep usage below the maximum specified in bytes or MB).

The `CachingContentStore` class is highly configurable and many of its components could be exchanged for other implementations. For example, the lookup table could easily be replaced with a different implementation of `SimpleCache` than that supplied.

The cached content cleaner (`CachedContentCleaner`) periodically traverses the directory structure containing the cached content files and deletes the content files that are not in use by the cache. Files are considered not in use by the cache if they have no entry in the lookup table managed by `ContentCacheImpl`. The content cache cleaner is not a part of the architecture but is a helper object for `ContentCacheImpl` and allows it to operate more efficiently.

#### CachingContentStore properties

There are a number of properties that you can configure for the `CachingContentStore` class.

The following properties are used in the sample context file, `caching-content-store-context.xml.sample` and can be set in the `alfresco-global.properties` file. Their default values are provided in the `repository.properties` file.

| Property | Description |
| -------- | ----------- |
| system.content.caching.cacheOnInbound | Enables write-through caching. If `true`, an attempt to write the content to the backing store results in the item being cached. Therefore, the first time an item is read (provided the item has not been removed from the cache in the mean time), the file is already cached locally for faster access times. It is recommended that this property is set to `true` for most usage scenarios. |
| system.content.caching.maxDeleteWatchCount | Defines the number of times the file must have been observed as being available for deletion by previous cleanup runs before it is actually deleted. The default value is always set to `1`, but can be increased if readers obtained from the cache could not be used due to the underlying file being deleted. |
| system.content.caching.contentCleanup.cronExpression | Specifies how often the cached content cleanup job will run, for example `0 0 3 * * ?`. The supplied value is a quartz expression and is similar to a Unix cron expression. In this case, the cleaner will run at 3 am every morning. |
| system.content.caching.timeToLiveSeconds | Specifies the maximum time in seconds that an item can exist in the cache. After this time elapses, the item will no longer be cached and a request for the content URL will result in the item being fetched from the backing store and cached afresh. A value of `0` means that items won't have a TTL parameter applied to them. |
| system.content.caching.timeToIdleSeconds | Specifies the maximum time an item in the cache can exist without being requested, for example `60`. Each time the item is accessed, the Time To Idle parameter is refreshed and the item will remain in the cache. |
| system.content.caching.maxElementsInMemory | Applies to the lookup table in the `ContentCache`. Each content URL requires two entries in the lookup table, so a value of `5000` can allow 2500 content items to be held in memory for the lookup table. |
| system.content.caching.maxElementsOnDisk | Applies to the lookup table in the `ContentCache`. Each content URL requires two entries in the lookup table, so a value of `10000` can allow 5000 items to be held on disk. |
| system.content.caching.minFileAgeInMillis | Specifies that files must be at least this age before they're marked for deletion, for example `2000`. This also stops unnecessary checks, such as loading and examining the associated properties file. |
| system.content.caching.maxUsageMB | Specifies the maximum disk usage in MB that cached content should consume, for example `4096`. In other words, this property defines the disk space quota allocated to the `${dir.cachedcontent}` directory. It is used by the `StandardQuotaStrategy` class as configured in the `caching-content-store-context.xml.sample` file. |
| system.content.caching.maxFileSizeMB | Specifies the maximum size in MB of any individual file of cached content. Content larger than this size can still be retrieved using the `CachingContentStore` class but the content won't be cached. If this property is set to `0`, then no size limit'll apply to the individual files. This property is used by the `StandardQuotaStrategy` class as configured in the `caching-content-store-context.xml.sample` file. |

#### Configure CachingContentStore

You can configure the `CachingContentStore` class.

To demonstrate step-by-step configuration of the `CachingContentStore` class, the spring context file, `caching-content-store-context.xml.sample` is used as a starting point for adding caching to a content store. Once configured, you can activate the sample file by removing the `.sample` file extension and placing it in your installation extension directory at `<ALFRESCO_HOME>/tomcat/shared/classes/alfresco/extension`.

1. Define an instance of the `CachingContentStore` class. This is the top level bean that ties together the CCS as a whole.

    ```xml
    <bean id="fileContentStore" class="org.alfresco.repo.content.caching.CachingContentStore" init-method="init">
      <property name="backingStore" ref="backingStore"/>
      <property name="cache" ref="contentCache"/>
      <property name="cacheOnInbound" value="${system.content.caching.cacheOnInbound}"/>
      <property name="quota" ref="standardQuotaManager"/>
    </bean>
    ```

    In this case, the `fileContentStore` bean is overridden. The `ContentService` bean uses `fileContentStore` bean, so CCS is used automatically. You can also specify a different name and an overridden `contentService` bean. The main collaborators of `backingStore`, `cache` and `quota` refer to the beans for Backing Store, Content Cache and Quota Manager as shown in the diagram in the [CachingContentStore overview](#ccsclassoverview) topic. Each `CachingContentStore` class should have its own dedicated instances of these collaborators and they should not be shared across other `CachingContentStore` beans, should you have any defined.

2. Define a backing store. This CCS uses this ContentStore to provide caching for `TenantRoutingS3ContentStore`.

    ```xml
    <bean id="tenantRoutingContentStore"
             class="org.alfresco.module.org_alfresco_module_cloud.repo.content.s3store.TenantRoutingS3ContentStore"
             parent="baseTenantRoutingContentStore">

      <property name="defaultRootDir" value="${dir.contentstore}" />
      <property name="s3AccessKey" value="${s3.accessKey}" />
      <property name="s3SecretKey" value="${s3.secretKey}" />
      <property name="s3BucketName" value="${s3.bucketName}" />
      <property name="s3BucketLocation" value="${s3.bucketLocation}" />
      <property name="s3FlatRoot" value="${s3.flatRoot}" />
      <property name="globalProperties">
        <ref bean="global-properties" />
      </property>

    </bean>
    ```

    > **Note:** Remember to change this bean's ID to `backingStore` for use with the preceding XML snippet, or change the `ref` attribute in the `fileContentStore` bean definition to refer to the correct ID (`tenantRoutingContentStore`).

3. Define a `ContentCache`. This object is responsible for placing content into (and retrieving content from) the cache.

    ```xml
    <bean id="contentCache" class="org.alfresco.repo.content.caching.ContentCacheImpl">
      <property name="memoryStore" ref="cachingContentStoreCache"/>
      <property name="cacheRoot" value="${dir.cachedcontent}"/>
    </bean>
    ```

    The `ContentCacheImpl` uses a fast lookup table for determining whether an item is currently cached by the CCS, for controlling the maximum number of items in the cache and their Time To Live (TTL). The lookup table is specified here by the `memoryStore` property. The `ContentCacheImpl` also uses a directory on the local filesystem for storing binary content data (the actual content being cached). This directory is specified by the `cacheRoot` property. The following code illustrates the bean referencing the specified `memoryStore` reference:

    ```xml
    <bean id="cachingContentStoreCache" factory-bean="cacheFactory" factory-method="createCache">
      <constructor-arg value="cache.cachingContentStoreCache"/>
    </bean>
    ```

4. Now that you've configured the key components of the `CachingContentStore` class, backing store (`ContentStore`) and `ContentCache`, you can optionally specify a quota manager. If you do not wish to specify the quota manager, then the `UnlimitedQuotaStrategy` will be used. The example CCS bean expects this bean to be defined:

    ```xml
    <bean id="standardQuotaManager"  
          class="org.alfresco.repo.content.caching.quota.StandardQuotaStrategy"
          init-method="init"
          destroy-method="shutdown">
        <property name="maxUsageMB" value="${system.content.caching.maxUsageMB}"/>
        <property name="maxFileSizeMB" value="${system.content.caching.maxFileSizeMB}"/>
        <property name="cache" ref="contentCache"/>
        <property name="cleaner" ref="cachedContentCleaner"/>
    </bean>
    ```

5. Finally, to ensure that the disk space is used in a controlled manner, a `CachedContentCleaner` should be configured to clean up cached content files that are no longer being used by the cache.

    ```xml
    <bean id="cachingContentStoreCleanerJobDetail" class="org.springframework.scheduling.quartz.JobDetailBean">
       <property name="jobClass">
           <value>org.alfresco.repo.content.caching.cleanup.CachedContentCleanupJob</value>
       </property>
       <property name="jobDataAsMap">
           <map>
               <entry key="cachedContentCleaner">
                   <ref bean="cachedContentCleaner" />
               </entry>
           </map>
       </property>
    </bean>
    <bean id="cachedContentCleaner"
       class="org.alfresco.repo.content.caching.cleanup.CachedContentCleaner"
       init-method="init">
       <property name="minFileAgeMillis" value="${system.content.caching.minFileAgeMillis}"/>
       <property name="maxDeleteWatchCount" value="${system.content.caching.maxDeleteWatchCount}"/>
       <property name="cache" ref="contentCache"/>
       <property name="usageTracker" ref="standardQuotaManager"/>
    </bean>
    <bean id="cachingContentStoreCleanerTrigger" class="org.alfresco.util.CronTriggerBean">
       <property name="jobDetail">
           <ref bean="cachingContentStoreCleanerJobDetail" />
       </property>
       <property name="scheduler">
           <ref bean="schedulerFactory" />
       </property>
       <property name="cronExpression">
           <value>${system.content.caching.contentCleanup.cronExpression}</value>
       </property>
    </bean>
    ```

    Note that both the cleaner and the quota manager limit the usage of disk space but they do not perform the same function. In addition to removing the orphaned content, the cleaner's job is to remove files that are out of use from the cache due to parameters, such as TTL, which sets the maximum time an item should be used by the CCS. The quota manager exists to set specific requirements in terms of allowed disk space.

    A number of property placeholders are used in the specified definitions. You can replace them directly in your configuration with the required values, or you can use the placeholders as they're and set the values in the `repository.properties` file. An advantage of using the property placeholders is that the sample file can be used with very few changes and the appropriate properties can be modified to get the CCS running with little effort.

### Aggregating content store

An Aggregating content store (`AggregatingContentStore`) is a content store implementation that aggregates a set of stores.

> **Important:** The aggregate content store is not supported as 'Encrypted content store'.

> **Note:** The Aggregating content store is based upon the Replicating content store that was included in prior releases of Community Edition, but supports specifically the content aggregation use case, not content replication.

The Aggregating content store contains a primary store and a set of secondary stores. The order in which the stores appear in the list of participating stores is important. The first store in the list is known as the primary store. Content can be read from any of the stores, as if it were a single store. When the replicator goes to fetch content, the stores are searched from first to last. The stores should therefore, be arranged in order of speed.

For example, if you have a fast (and expensive) local disk, you can use this as your primary store for best performance. The old infrequently used files may be stored on lower cost, slower storage.

When replication is disabled, content is written to the primary store only. The other stores are used to retrieve content and the primary store is not updated with the content.

### Example configuration for tiered storage

The following configuration defines an additional tiered storage solution. The default content store is not changed. An additional set of secondary stores is defined (`tier1`, `tier2` and `tier3`). As content ages (old infrequently used files), it can be moved to lower tiers. If the tiered storage is slow, a Caching content store can be placed in front.

1. In your `alfresco-global.properties file`, define three new folder locations:

    * `dir.contentstore1=${dir.root}/tier1`
    * `dir.contentstore2=${dir.root}/tier2`
    * `dir.contentstore3=${dir.root}/tier3`

2. Locate the `<TOMCAT_HOME>/shared/classes/alfresco/extension/aggregating-store-context.xml.sample` file.

3. Remove the `.sample` extension from this file.

    The `aggregating-store-context.xml` file enables Aggregating content store. The content of this file is shown below. Place the `aggregating-store-context.xml` file in your `<TOMCAT_HOME>/shared/classes/alfresco/extension` folder.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

<!-- This file enables an aggregating content store. It should be placed in shared/classes/alfresco/extension -->

<beans>

  <bean id="defaultContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore}</value>
      </constructor-arg>
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>


  <bean id="tier1ContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore1}</value>
      </constructor-arg>
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>

  <bean id="tier2ContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore2}</value>
      </constructor-arg>
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>

  <bean id="tier3ContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore3}</value>
      </constructor-arg>
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>


  <!-- this is the aggregating content store - the name fileContentStore overrides the alfresco default store -->
  <bean id="fileContentStore"
       class="org.alfresco.repo.content.replication.AggregatingContentStore" >

      <property name="primaryStore" ref="defaultContentStore" />
      <property name="secondaryStores">
          <list>
              <ref bean="tier1ContentStore" />
              <ref bean="tier2ContentStore" />
              <ref bean="tier3ContentStore" />
          </list>
      </property>
  </bean>
</beans>
```

## Manage content stores

Use this information to effectively manage the File content store and Deleted content store.

The **File content store** saves the files or content items on a file system under the root directory. The `${dir.contentstore}` property points to the root location on the file system. Files are organized by time to assist with incremental backup.

The **Deleted content store** saves orphaned files that are removed (nightly, by default) by the content store cleaner. The `${dir.contentstore.deleted}` property points to the location where deleted files are stored. The default deleted content store is a file content store.

When you create a file, a `.bin` file is stored in the default file content store and there is a reference on that `.bin` file in the database. When you delete the document, Community Edition updates the database. When you purge the deleted items, Community Edition destroys all references to that .bin file in database. When the scheduled job runs, it scans the database and the contentstore directory and moves everything that is not referenced in the database to the `<ALFRESCO_HOME>\alf_data\contentstore.deleted` directory. The content of the `contentstore.deleted` directory is not referenced anywhere. So, you can always delete the contents of this directory (normally just after a backup). You can have your own Operating System cron job that purges contents of this folder periodically.

The `repository.properties` file defines the `fileContentStore` and `deletedContentStore` properties.

```text
# The location of the content store
dir.contentstore=${dir.root}/contentstore
dir.contentstore.deleted=${dir.root}/contentstore.deleted
```

You can configure these properties by overriding them in the `alfresco-global.properties` file.

> **Note:** You can use a remote file system but you can't use the UNC mapped network path with it, for example:
>
>   ```text
>   dir.contentstore=//server1/c/contentstore/contentstore
>   dir.contentstore.deleted=//server1/c/contentstore/contentstore.deleted
>   ```

You need to use a Windows or DOS path.

To customize the behavior of `fileContentStore`, set the following properties in the `alfresco-global.properties` file:

| Property | Description |
| -------- | ----------- |
| system.content.maximumFileSizeLimit | Specifies the value for the maximum permitted size (in bytes) of all content. By default, no limit is specified. |
| dir.contentstore.bucketsPerMinute | Splits the data into a maximum number of buckets within the minute. The default value is zero, which means all the content created within the same minute will live in the same folder in the content store. If a value is specified, the content will be distributed into sub folders based on the second in which it was created. For example, `dir.contentstore.bucketsPerMinute=6`. |

The `fileContentStore` can also be configured to randomly distribute content on different volumes. This option can be used together with the `bucketsPerMinute` configuration. To enable this configuration, create another `contentUrlProvider` bean and inject it in the `fileContentStore`, as shown below:

```xml
<bean id="volumeAwareContentUrlProvider" class="org.alfresco.repo.content.filestore.VolumeAwareContentUrlProvider">
      <constructor-arg  type="java.lang.String" value="volume1,volume2"/>
</bean>
```

To select a content store, you have to choose the required subsystem:

```text
filecontentstore.subsystem.name=unencryptedContentStore
```

The default, unencrypted store is a simple file storage store with its root in `dir.contentstore=${dir.root}/contentstore`. A date-time file structure is used, which makes the store easy to backup and browse. Most commonly, the `dir.contentstore` points to a shared file system when Community Edition is deployed in a cluster. This is fully supported. Any regular file system backup procedure will work without the danger of corruption or loss of data. As a good practice, you should take the database backup before you take the file system backup.

### Clean up orphaned content (purge)

You can delete or purge orphaned content from the content store while the system is running.

The `contentStoreCleaner` bean identifies and deletes the orphaned content. In the default configuration, the `contentStoreCleanerTrigger` calls the `contentStoreCleaner` bean.

```xml
<bean id="contentStoreCleaner" class="org.alfresco.repo.content.cleanup.ContentStoreCleaner" >
     ...
     <property name="protectDays" >
        <value>14</value>
     </property>
     <property name="stores" >
        <list>
           <ref bean="fileContentStore" />
        </list>
     </property>
     <property name="listeners" >
        <list>
           <ref bean="deletedContentBackupListener" />
        </list>
     </property>
  </bean>
```

**Properties:**

| Property | Description |
| -------- | ----------- |
| protectDays | Specifies the minimum time that content binaries should be kept in the `contentStore`.<br><br>In the above example, if a file is created and immediately deleted, it won't be cleaned from the `contentStore` for at least 14 days. The value should be adjusted to account for backup strategies, average content size, and available disk space. Setting this value to zero will result in a system warning as it breaks the transaction model. Also, it is possible to lose content if the orphaned content cleaner runs while the content is being loaded into the system. If the system backup strategy is just to make regular copies, then this value should be greater than the number of days between successive backup runs. |
| store | Displays a list of `ContentStore` beans to scour for orphaned content. |
| listeners | Specifies the listeners, which are notified when an orphaned content is located.<br><br>In the above example, the `deletedContentBackupListener` copies the orphaned content to a separate `deletedContentStore`. Note that this configuration won't actually remove the files from the file system but rather move them to the designated `deletedContentStore`, usually `contentstore.deleted`. Once an appropriate backup has been performed, the files can be removed from the `deletedContentStore` via a script or cron job. |

## Configure Trashcan Cleaner

The Trashcan Cleaner is a scheduled job that periodically purges old content from your Community Edition trashcan.

When content is deleted, the content store can be configured to move the deleted content into a trashcan. The deleted content can easily recovered from the trashcan, if it is deleted by mistake. The content remains in the trashcan until it is purged or cleaned by the Trashcan Cleaner. The Trashcan Cleaner is a scheduled job that will empty your Community Edition trashcan.

The Trashcan Cleaner is disabled by default. To configure the Trashcan Cleaner, set the following properties in the `alfresco-global.properties` file:

| Property | Description |
| -------- | ----------- |
| trashcan-cleaner.cron | Specifies the cron schedule for the Trashcan Cleaner job. See [Scheduled Jobs]({% link content-services/latest/develop/repo-ext-points/scheduled-jobs.md %}). For example, `0 30 * * * ?`. |
| trashcan-cleaner.keepPeriod | Specifies the period for which trashcan items are kept (in the `java.time.Duration` format). For example, `P1D`. |
| trashcan-cleaner.deleteBatchCount | Specifies the number of trashcan items to delete per job run. For example, `1000`. |

For example, to configure the scheduled process to clean all the deleted items older than one day to a maximum of 1000 (each execution) each hour at the middle of the hour (30 minutes), add the following properties in the `alfresco-global.properties` file:

```text
trashcan-cleaner.cron=0 30 * * * ?
trashcan-cleaner.keepPeriod=P1D
trashcan-cleaner.deleteBatchCount=1000
```

To enable debug logging, set the `logger.alfresco-trashcan.name` and `logger.alfresco-trashcan.level` properties in the `log4j2.properties` file:

```text
logger.alfresco-trashcan.name=org.alfresco.trashcan
logger.alfresco-trashcan.level=debug
```

The trashcan cleaner is a [Simple Module]({% link content-services/latest/develop/extension-packaging.md %}#simplemodule) which appears in the Admin Console under the Module Packages section.

```http
http://localhost:8080/alfresco/s/enterprise/admin/admin-systemsummary
```

To disable the Trashcan Cleaner, add the following to the `alfresco-global.properties` file:

```text
trashcan-cleaner.cron=* * * * * ? 2099
```
