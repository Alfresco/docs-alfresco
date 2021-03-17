---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Full text search configuration properties for Solr and Lucene indexes

The repository.properties file defines the properties that influence how all indexes behave. This section describes the full text search properties, for the Solr and Lucene indexes, contained in the repository.properties file.

The main index and deltas all use the same configuration. The data dictionary settings for properties determine how individual properties are indexed.

**Note:** The following properties are set in the repository.properties file. However, if you wish to change them, we recommend that you add the relevant property to the alfresco-global.properties file and then make the changes. No changes should be done in the repository.properties file.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

## Solr index properties

-   **solr.host=localhost**

    The host name where the Solr instance is located.

-   **solr.port=8080**

    The port number on which the Solr instance is running.

-   **solr.port.ssl=8443**

    The port number on which the Solr SSL support is running.

-   **solr.solrUser=solr**

    The Solr user name.

-   **solr.solrPassword=solr**

    The Solr password.

-   **solr.secureComms=https**

    The HTTPS connection.

-   **solr.solrConnectTimeout=5000**

    The Solr connection timeouts in ms.

-   **solr.solrPingCronExpression=0 0/5 \* \* \* ? \***

    The cron expression defining how often the Solr Admin client \(used by JMX\) pings Solr if it goes away.


## Lucene index - general properties

-   **dir.indexes=$\{dir.root\}/lucene-indexes**

    The directory that contains all lucene indexes and deltas against those indexes.


-   **dir.indexes.backup=$\{dir.root\}/backup-lucene-indexes**

    The directory for index backups.


-   **dir.indexes.lock=$\{dir.indexes\}/locks**

    The directory that contains the locks for lucene indexes.


-   **lucene.maxAtomicTransformationTime=100**

    Transformations of content that are likely to take longer than this time \(in millis\) will be done in the background. To force atomic content indexing, increase this value.


-   **lucene.query.maxClauses=10000**

    Max Clauses \(Lucene standard parameter\)

    Lucene queries limit the number of clauses in a boolean query to this value. Some queries are expanded into a whole set of boolean query with many clauses under the covers. For example, searching for luc\* will expand to a boolean query containing an "OR" for every token the index knows about that matches luc\*.


-   **lucene.indexer.batchSize=1000000**

    Batch size \(Alfresco indexing parameter\)

    The indexer stores a list of what it has to do as changes are made using the node service API. Typically, there are many events that would cause a node to be re-indexed. Keeping an event list means the actions can be optimized - the algorithm limits re-indexes to one per batch size, and will not index if a delete is pending, etc. When the list of events reaches this size, the whole event list is processed and documents are added to the delta index.


-   **lucene.indexer.contentIndexingEnabled=true**

    This property controls whether or not the content of the documents is indexed. If false, content is not indexed.


## Lucene caching properties

Caching is carried across an index, for the composite index reader.

-   **lucene.indexer.cacheEnabled=true**

    Enable/disable index level caching

    ALL

-   **lucene.indexer.maxDocIdCacheSize=10000**

    Cache index doc id to NodeRef.

    This cache is designed to avoid a disk read and synchronization when finding the noderef association with a lucene document

    Lucene currently synchronizes on reading a document.

    ALL

-   **lucene.indexer.maxDocumentCacheSize=100**

    Cache for lucene documents by lucene index doc id

    ALL

-   **lucene.indexer.maxIsCategoryCacheSize=-1**

    Cache which lucene docs are Alfresco categories \(-1 caches all\)

    CATEGORY

-   **lucene.indexer.maxLinkAspectCacheSize=10000**

    Cache link aspects \(increase to improve the performance of category queries\)

    Used in linking children to aspects

    CATEGORY

-   **lucene.indexer.maxParentCacheSize=10000**

    Cache parent lookups \(increase to improve the performance of PATH queries\)

    Used in linking children to parents

    CATEGORY and PATH

-   **lucene.indexer.maxPathCacheSize=10000**

    Cache the first part of category PATH lookups

    CATEGORY ONLY

-   **lucene.indexer.maxTypeCacheSize=10000**

    Cache alfresco type for docs in the lucene index

    CATEGORY ONLY


## Lucene merger properties

Properties for merge.

-   **lucene.indexer.mergerMaxMergeDocs=1000000**
-   **lucene.indexer.mergerMergeFactor=5**
-   **lucene.indexer.mergerMergeBlockingFactor=1**
-   **lucene.indexer.mergerMaxBufferedDocs=-1**
-   **lucene.indexer.mergerRamBufferSizeMb=16**

## Lucene writer properties

Properties specific to IndexWriters used for transactional indexes. These options only apply to the index process - the resulting index will be optimized.

-   **lucene.indexer.writerMaxMergeDocs=1000000**
-   **lucene.indexer.writerMergeFactor=5**
-   **lucene.indexer.writerMaxBufferedDocs=-1**
-   **lucene.indexer.writerRamBufferSizeMb=16**

## Lucene merging behavior properties

Properties to control merging behavior.

-   **lucene.indexer.mergerTargetIndexCount=5**

    Target for the number of indexes \(more than this and we start merging\)

-   **lucene.indexer.mergerTargetOverlayCount=5**

    Target for the number of indexes that relate directly to a transaction.

    More than this and we start merging deletions and transforming overlays to indexes.

-   **lucene.indexer.mergerTargetOverlaysBlockingFactor=1**

    Throttle factor so the stack of indexes and overlays does not become too large and affect performance.

-   **lucene.indexer.maxDocsForInMemoryMerge=10000**

    Control in-memory merges

-   **lucene.indexer.maxRamInMbForInMemoryMerge=16**

    Control in-memory merges

-   **lucene.indexer.maxDocsForInMemoryIndex=10000**

    Max size for indexes held in memory

-   **lucene.indexer.maxRamInMbForInMemoryIndex=16**

    Max size for indexes held in memory


## Other Lucene properties

-   **lucene.indexer.termIndexInterval=128**
-   **lucene.indexer.useNioMemoryMapping=true**
-   **lucene.indexer.postSortDateTime=true**
-   **lucene.indexer.defaultMLIndexAnalysisMode=EXACT\_LANGUAGE\_AND\_ALL**
-   **lucene.indexer.defaultMLSearchAnalysisMode=EXACT\_LANGUAGE\_AND\_ALL**

-   **lucene.indexer.maxFieldLength=10000**
-   **lucene.write.lock.timeout=10000**
-   **lucene.commit.lock.timeout=100000**
-   **lucene.lock.poll.interval=100**

## Data dictionary options

The indexing behavior of each property can be set in the content model. By default, they are indexed atomically. The property value is not stored in the index, and the property is tokenized when it is indexed.

The following example shows how indexing can be controlled.

-   **Enabled="false"**

    If this is false, there will be no entry for this property in the index.


-   **Atomic="true"**

    If this is true, the property is indexed in the transaction, if not the property is indexed in the background.

    Indexing of content that requires transformation before being indexed \(for example, PDFs\) will only obey `Atomic=true` if the transformation takes less time than the value specified for `lucene.maxAtomicTransformationTime`. Refer to the general properties.


-   **Stored="true"**

    If true, the property value is stored in the index and may be obtained using the Lucene low-level query API.

    This can be useful while debugging systems to see exactly what is being indexed, but do not set this to true on production systems.


-   **Tokenised="true"**

    If "true", the string value of the property is tokenized before indexing.

    if "false", it is indexed "as is" as a single string.

    if "both" then both forms above are in the index.


The tokenizer is determined by the property type in the data dictionary. This is locale sensitive as supported by the data dictionary, so you could switch to tokenize all your content in German. At the moment you cannot mix German and English tokenization.

```
 <type name="cm:content">
        <title>Content</title>
        <parent>cm:cmobject</parent>
        <properties>
           <property name="cm:content">
              <type>d:content</type>
              <mandatory>false</mandatory>
              <index enabled="true">
                 <atomic>false</atomic>
                 <stored>false</stored>
                 <tokenised>true</tokenised>
              </index>
           </property>
        </properties>
     </type>
```

## Indexing defaults

The effective indexing defaults for all properties are as follows:

```
<index enabled="true">
                 <atomic>true</atomic>
                 <stored>false</stored>
                 <tokenised>true</tokenised>
              </index>
              ...
```

## Indexing options

If you want archive or zip files to be unzipped and the files included in the index, set the following property:

```
transformer.Archive.includeContents=true
```

The default setting is false.

