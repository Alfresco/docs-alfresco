---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Cleaning up orphaned content \(purge\)

This topic describes how to delete or purge orphaned content from the content store while the system is running.

The `contentStoreCleaner` bean identifies and deletes the orphaned content. In the default configuration, the `contentStoreCleanerTrigger` calls the `contentStoreCleaner` bean.

```
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

-   **protectDays**

    This property specifies the minimum time that content binaries should be kept in the `contentStore`.

    In the above example, if a file is created and immediately deleted, it will not be cleaned from the `contentStore` for at least 14 days. The value should be adjusted to account for backup strategies, average content size, and available disk space. Setting this value to zero will result in a system warning as it breaks the transaction model. Also, it is possible to lose content if the orphaned content cleaner runs while the content is being loaded into the system. If the system backup strategy is just to make regular copies, then this value should be greater than the number of days between successive backup runs.

-   **store**

    This property displays a list of `ContentStore` beans to scour for orphaned content.

-   **listeners**

    This property specifies the listeners, which are notified when an orphaned content is located.

    In the above example, the `deletedContentBackupListener` copies the orphaned content to a separate `deletedContentStore`. Note that this configuration will not actually remove the files from the file system but rather move them to the designated `deletedContentStore`, usually `contentstore.deleted`. Once an appropriate backup has been performed, the files can be removed from the `deletedContentStore` via script or cron job.


**Parent topic:**[Managing content stores](../concepts/cs-manage.md)

