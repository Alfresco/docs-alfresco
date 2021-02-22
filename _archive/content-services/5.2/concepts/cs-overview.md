---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Content stores overview

Background information on the content store and content binary life cycle.

A content store \(`ContentStore`\) or combinations of content stores can be used to control how and where the binary files are physically stored. Binary streams can be stored across a range of locations and can be encrypted/decrypted, as necessary. Also, fast versus slow storage options can be wired up together for efficient storage and access.

Alfresco Content Services supports seven different content stores. These are the File content store \(default content store\), Content store selector, S3 content store, Caching content store, Aggregating content store, Encrypted content store, and Centera content store. For more information on each content store, see [Content store types](cs-types.md).

**Common behaviour of different content stores**

-   Content stores always write to a new location, so binary files are never overwritten. The content is never modified.
-   Each content store can support its own URL standard.

**Content binaries life cycle**

**Stage 1 - Content writes:** When you create a file in Alfresco Content Services, it becomes a content \(in form of a .bin file\) and is stored in the default file content store, for example <ALFRESCO\_HOME\>\\alf\_data\\ contentstore directory. The metadata of the content is stored in the database. The database contains a reference to that .bin file.

**Stage 2 - Content reads:** When a request is made to the `ContentStore` for a `ContentReader`, the client reads the content using methods on the `ContentReader`.

**Stage 3 - Copying, moving and versioning files:** The content binaries are **never modified** by any high-level process. Moving, copying and versioning a file merely affects the content metadata. It is possible to end up with several references to the same raw binary content. Also, writes to the file system do not become visible until the metadata has been committed to the database.

**Stage 4 - Cleaning up binary files:** When a content URL is no longer attached to any metadata in the system, it is referred to as orphaned. In order to allow adequate time for backup, the content binaries are not deleted immediately. Instead, they are deleted on a schedule. The job runs against the following `CRON` expression:

```
system.content.orphanCleanup.cronExpression=0 0 4 * * ?
```

As an additional safety measure, the binaries are first copied to a local backup at:

```
dir.contentstore.deleted=${dir.root}/contentstore.deleted
```

This location can be cleared out by administrators, as necessary. The time to protect orphaned binaries is controlled by:

```
system.content.orphanProtectDays=14
```

In most cases, there is no need to change this and the value should be large enough to encompass a sufficient number of full content backups.

**Parent topic:**[Setting up content stores](../concepts/manage-cs-home.md)

