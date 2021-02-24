---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Managing content stores

Use this information to effectively manage the File content store and Deleted content store.

The **File content store** saves the files or content items on a file system under the root directory. The `${dir.contentstore}` property points to the root location on the file system. Files are organized by time to assist with incremental backup.

The **Deleted content store** saves orphaned files that are removed \(nightly, by default\) by the content store cleaner. The `${dir.contentstore.deleted}` property points to the location where deleted files are stored. The default deleted content store is a file content store.

When you create a file, a .bin file is stored in the default file content store and there is a reference on that .bin file in the database. When you delete the document, Alfresco Content Services updates the database. When you purge the deleted items, Alfresco Content Services destroys all references to that .bin file in database. When the scheduled job runs, it scans the database and the contentstore directory and moves everything that is not referenced in the database to the <ALFRESCO\_HOME\>\\alf\_data\\ contentstore.deleted directory. The content of the contentstore.deleted directory is not referenced anywhere. So, you can always delete the contents of this directory \(normally just after a backup\). You can have your own Operating System cron job that purges contents of this folder periodically.

The repository.properties file defines the `fileContentStore` and `deletedContentStore` properties.

```
# The location of the content store
dir.contentstore=${dir.root}/contentstore
dir.contentstore.deleted=${dir.root}/contentstore.deleted
```

You can configure these properties by overriding them in the alfresco-global.properties file.

**Note:** You can use a remote file system but you cannot use the UNC mapped network path with it, for example:

```
dir.contentstore=//server1/c/contentstore/contentstore
dir.contentstore.deleted=//server1/c/contentstore/contentstore.deleted
```

You need to use a Windows or DOS path.

To customize the behaviour of `fileContentStore`, set the following properties in the alfresco-global.properties file:

-   **system.content.maximumFileSizeLimit**: Specifies the value for the maximum permitted size \(in bytes\) of all content. By default, no limit is specified.
-   **dir.contentstore.bucketsPerMinute**: Splits the data into a maximum number of buckets within the minute. The default value is zero, which means all the content created within the same minute will live in the same folder in the content store. If a value is specified, the content will be distributed into sub folders based on the second in which it was created. For example, `dir.contentstore.bucketsPerMinute=6`.

The `fileContentStore` can also be configured to randomly distribute content on different volumes. This option can be used together with the `bucketsPerMinute` configuration. To enable this configuration, create another `contentUrlProvider` bean and inject it in the `fileContentStore`, as shown below:

```
<bean id="volumeAwareContentUrlProvider" class="org.alfresco.repo.content.filestore.VolumeAwareContentUrlProvider">
      <constructor-arg  type="java.lang.String" value="volume1,volume2"/>
</bean>
```

To select a content store, you have to choose the required subsystem:

```
filecontentstore.subsystem.name=unencryptedContentStore
```

The default, unencrypted store is a simple file storage store with its root in `dir.contentstore=${dir.root}/contentstore`. A date-time file structure is used, which makes the store easy to backup and browse. Most commonly, the `dir.contentstore` points to a shared file system when Alfresco Content Services is deployed in a cluster. This is fully supported. Any regular file system backup procedure will work without the danger of corruption or loss of data. As a good practice, you should take the database backup before you take the file system backup.

-   **[Cleaning up orphaned content \(purge\)](../concepts/clean-content.md)**  
You can delete or purge orphaned content from the content store while the system is running.

**Parent topic:**[Setting up content stores](../concepts/manage-cs-home.md)

