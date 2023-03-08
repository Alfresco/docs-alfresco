---
title: Content Stores Extension Point
---

There are many Content Stores available out-of-the-box but custom stores can also be implemented.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

The repository consists of content, metadata, and index. The content, which is the physical file that you upload to 
Alfresco, is by default stored in the file system. This is handled by the so called File Content Store, which gets 
information about where to store files from configuration in the `alfresco-global.properties` file (e.g. `dir.root`). 
It is also possible to store content files in other places, and there are other content store implementations available 
out-of-the- box to support that:

* **Amazon S3 content store** - store the files in an S3 bucket using the [Alfresco Content Connector for AWS S3]({% link aws-s3/latest/index.md %}).
<!-- XAM object storage access protocol -->

Besides these content store implementations, there are also others that add features to a content store solution:

* **Caching Content Store** - caches files for another content store that might be slow at times, such as accessing an S3 content store.
* **Encrypted Content Store** - encrypt files

It is quite common to combine content stores, such as the S3 Content Store and the Caching Content Store.

If none of the out-of-the-box content stores suites the needs, then a custom content store can be implemented.

To do this is quite simple, the following classes need to be implemented:

* **Content Store** - the main class that is accessed by the Alfresco system to store and retrieve content.
* **Content Reader** - the content store implementation delegates to the content reader when content should be accessed for a file node.
* **Content Writer** - the content store implementation delegates to the content writer when content should be written for a file node, it in turn uses a content stream listener to do the actual content writing.
* **Content Stream Listener** - A listener that will be invoked when the content stream for a new file is closed, giving you the opportunity to save the file.
* Any **supporting classes** - it is good practice to abstract out all code that is specific to the storage that the content store should use, keep it separate from the main content store implementation.

When implementing the custom content store class, such as a `DbContentStore`, extend the 
`org.alfresco.repo.content.AbstractContentStore` class so the basic content store functionality is included by default. 
Then implement the following methods:

* `public ContentReader getReader(final String contentUrl)` - it should just return a new instance of the Content Reader class. Every time you want to read a file a new reader needs to be created.
* `protected ContentWriter getWriterInternal(final ContentReader existingContentReader, final String newContentUrl)` - should create a new unique URL, such as `db://78c98aa1-7ded-48e5-a7ee-838dfec49e04.bin`, for the file and then create a Content Writer class with it. Every time you want to write/store a file in the content store a new writer needs to be created.
* `public boolean delete(final String url)` - should delete the content file from the storage.
* `public boolean isWriteSupported()` - indicate if the store supports both read and write of content files.
* `public boolean isContentUrlSupported(String contentUrl)` - there can be several content stores active at the same time in the system, this method indicates if the passed in content URL is supported by the store. So the Content Store class also need to keep information about what prefix should be used for it, such as `db://`
* public static String createNewUrl() - should create a new content store specific URL, such as `db://78c98aa1-7ded-48e5-a7ee-838dfec49e04.bin`. This URL is usually also used as a key in the storage when writing and reading content.

When implementing the custom content reader class, such as a `DbContentReader`, extend the 
`org.alfresco.repo.content.AbstractContentReader` class so the basic content reader functionality is included by default. 
Then implement the following methods:

* `protected ContentReader createReader()` - should create a new content reader for its URL.
* `protected ReadableByteChannel getDirectReadableChannel()` - should create a readable byte channel that can be used to access the file in the custom store. Get the content file input stream from the store and create a readable byte channel with it.
* `public boolean exists()` - should check if the file with URL exist in the store.
* `public long getLastModified()` - should return the last modified date for a file if possible.
* `public long getSize()` - should return the physical size of the file in bytes. This is important specifically if the store does not support random access (that is, no `FileChannel`). Failing to implement this method correctly will prohibit access to content, and things like preview and download of files will not work.

When implementing the custom content writer class, such as a `DbContentWriter`, extend the 
`org.alfresco.repo.content.AbstractContentWriter` class so the basic content writer functionality is included by default. 
Then implement the following methods:

* `protected ContentReader createReader()` - should create a new reader for its URL.
* `protected WritableByteChannel getDirectWritableChannel()` - should create a temp file that the currently uploaded file can be stored in.

The content writer implementation does not actually write/save the file to the new storage. This is handled via a 
content stream listener that is registered via the content writer implementation. The custom content stream listener, 
such as the `DbContentStreamListener`, should implement the `org.alfresco.service.cmr.repository.ContentStreamListener` 
interface. Then implement the following methods:

* `public void contentStreamClosed()` - should store the file in the custom storage keyed on the URL.

When all the necessary classes have been implemented it is easy to enable the new content store. Just override the 
`fileContentStore` bean with the new custom content store bean. Here is an example of how that looks like:

```xml
<bean id="fileContentStore" class="org.alfresco.tutorial.contentstore.DbContentStore">
  <property name="databaseAdapter" ref="org.alfresco.tutorial.content.store.databaseAdapter" />
</bean>
```

If you need to read and write content files from many different types of stores, then more than one store implementation can be used to create the required solution. Maybe some files should come from S3,other files from the local file system etc. We can then use something called **Content Store Selectors**. They can be used to set up a content storage solution with multiple storage implementations active at the same time.

## File Storage Buckets

The default behavior of the `FileContentStore` is to store content files in a content URL with the following URL format:

```text
store://<Year>/<Month>/<Day>/<Hour>/<Minute>/<UUID>.bin
```

For example, for content stored in 17th June 2016 at 10:38pm, the content URL used would be:

```text
store://2016/6/17/22/38/<UUID>.bin
```

To create a custom `FileContentStore` content URL provider, implement the interface `FileContentUrlProvider` and the 
method with the following signature:

```java
public String createNewFileStoreUrl()
```

This method must return a URL beginning with the scheme `store`, for example, `store://<any unique path>`. 
The resulting `FileContentUrlProvider` may then be wired up to any `FileContentStore` instance.

To customize the behavior of `fileContentStore`, set the following properties in the `alfresco-global.properties` file:

* `system.content.maximumFileSizeLimit`: Specifies the value for the maximum permitted size (in bytes) of all content. By default, no limit is specified.
* `dir.contentstore.bucketsPerMinute`: Splits the data into a maximum number of buckets within the minute. The default value is zero, which means all the content created within the same minute will live in the same folder in the content store. If a value is specified, the content will be distributed into sub folders based on the second in which it was created. For example, `dir.contentstore.bucketsPerMinute=6`.

## Deployment - App Server

A custom content store implementation requires some Java coding so it is not suitable for direct deployment into the 
App server. Implement as a JAR Module instead.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/java/{domain specific package}` - all the Java classes making up the custom content store implementation.
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml` - custom store bean overriding `fileContentStore`

## More Information

* [Using and configuring Content Stores]({% link content-services/7.2/admin/content-stores.md %}) - Main documentation page for out-of-the-box content stores

## Sample Code

* [Database Content Store](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-store-repo){:target="_blank"} - Sample implementation of custom content store that uses MySQL to store content files in a BLOB column.
