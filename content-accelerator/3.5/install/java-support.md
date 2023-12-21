---
title: Java 17 Support
---

Deploying ACA/AEV in a Java 17 runtime environment is supported with the 3.5.1 release of ACA/AEV via two different approaches. “Illegal reflective accesses” previously generated warnings in older JDK versions, but as of JDK 17, reflection is forbidden out of the box, unless the given modules are explicitly requested. See further information on why reflection has become forbidden in the JDK 17 release documentation: [JEP 403: Strongly Encapsulate JDK Internals](https://openjdk.org/jeps/403){:target="_blank"}.

## Impact on ACA/AEV

ACA/AEV utilize Ehcache as their caching mechanism. Cache sizes are limited by bytes out of the box in ACA/AEV to prevent caches from growing larger than what the system resources allow. Ehcache manages byte based cache limits by utilizing reflection (which is now forbidden with JDK 17).

## Utilizing ACA/AEV with JDK 17

### Option 1 - Allow reflection

In order to deploy ACA/AEV in a Java 17 runtime environment, you can add java command line flags in the Java Runtime Environment where ACS is installed to allow reflection to continue to occur in Java 17.

For example:

You can add the following flags to the `_JAVA_OPTIONS` environment variable:

```java
--add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.rmi/sun.rmi.transport=ALL-UNNAMED
```

The `_JAVA_OPTIONS` environment variable passes options to any JVM process started on your system. When a JVM starts, it parses the value of `_JAVA_OPTIONS` as if the parameters were at the command-line of Java.  So adding those options to this environment variable in the system where ACS is installed will allow for reflection to occur on those classes on any JVM process started on the system.

### Option 2 - Limit cache sizes based on entries

Limiting Ehcache cache sizes by the number of entries instead of bytes prevents Ehcache from needing to utilize reflection which keeps us in the bounds of what JDK 17 allows out of the box.  This can be done by overriding the ACA/AEV `ehcache.xml` configuration file in a custom AMP and reconfiguring the Ehcache configuration files to limit cache sizes by the number of entries.

In each cache configuration, replace the following properties:

```xml
maxBytesLocalHeap=
maxBytesLocalDisk=
```

with:

```xml
maxEntriesLocalHeap=
maxEntriesLocalDisk=
```

For example, the out of the box ACA/AEV cache configuration file for ACA/AEV 3.5.1 is:

```xml
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="../config/ehcache.xsd" updateCheck="false">
    <!-- *** Whatever you change here, you must change in all other ehcache.xml 
        files. They need to be maintained. *** -->

    <!-- where to store the files written to disk on overflow -->
    <diskStore path="java.io.tmpdir" />

    <!-- cache for the content of our objects -->
    <cache name="oc-content" 
        eternal="true" 
        maxBytesLocalHeap="150M"
        maxBytesLocalDisk="5G" 
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>
    <!-- cache for getting the content info of an object -->
    <cache name="oc-contentInfo" 
        eternal="true" 
        maxBytesLocalHeap="25M"
        maxBytesLocalDisk="5G" 
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the page transformations from PDFs to PNG for our objects -->
    <cache name="oc-pages" 
        eternal="true" 
        maxBytesLocalHeap="250M"
        maxBytesLocalDisk="5G" 
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the section-row boxes for text select tools for OpenAnnotate -->
    <cache name="oc-page-section-word-data" 
        eternal="true" 
        maxBytesLocalHeap="25M" 
        maxBytesLocalDisk="5G"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the wordMaps for text searching in for OpenAnnotate -->
    <cache name="oa-search-word-maps" 
        eternal="true"
        maxBytesLocalHeap="25M" 
        maxBytesLocalDisk="5G"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the overlays of our objects -->
    <cache name="oc-document-overlays" 
        eternal="true"
        maxBytesLocalHeap="50M" 
        maxBytesLocalDisk="5G"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>
    
    <!-- cache for the document info of our objects in OpenAnnotate-->
    <cache name="oa-document-info" 
        eternal="true" 
        maxBytesLocalHeap="25M"
        maxBytesLocalDisk="5G" 
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the object types that should be externally indexed -->
    <cache name="objectTypes-to-index" 
        eternal="true"
        maxBytesLocalHeap="50M" 
        maxBytesLocalDisk="5G"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the asset Files -->
    <cache name="assetFiles" 
        eternal="true"
        maxBytesLocalHeap="50M" 
        maxBytesLocalDisk="100M"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>
    
    <!-- cache for template objects -->
    <cache name="oc-template"
        timeToLiveSeconds="60"
        maxEntriesLocalHeap="5000" 
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="none" />
    </cache>
</ehcache>
```

and a sample override:

```xml
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="../config/ehcache.xsd" updateCheck="false">
    <!-- *** Whatever you change here, you must change in all other ehcache.xml 
        files. They need to be maintained. *** -->

    <!-- where to store the files written to disk on overflow -->
    <diskStore path="java.io.tmpdir" />

    <!-- cache for the content of our objects -->
    <cache name="oc-content" 
        eternal="true" 
        maxEntriesLocalHeap="30"
        maxEntriesLocalDisk="5000"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>
    <!-- cache for getting the content info of an object -->
    <cache name="oc-contentInfo" 
        eternal="true"  
        maxEntriesLocalHeap="100"
        maxEntriesLocalDisk="1000"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the page transformations from PDFs to PNG for our objects -->
    <cache name="oc-pages" 
        eternal="true" 
        maxEntriesLocalHeap="50"
        maxEntriesLocalDisk="500"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the section-row boxes for text select tools for OpenAnnotate -->
    <cache name="oc-page-section-word-data" 
        eternal="true" 
        maxEntriesLocalHeap="15"
        maxEntriesLocalDisk="500"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the wordMaps for text searching in for OpenAnnotate -->
    <cache name="oa-search-word-maps" 
        eternal="true"
        maxEntriesLocalHeap="15"
        maxEntriesLocalDisk="500"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the overlays of our objects -->
    <cache name="oc-document-overlays" 
        eternal="true"
        maxEntriesLocalHeap="10"
        maxEntriesLocalDisk="500"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>
    
    <!-- cache for the document info of our objects in OpenAnnotate-->
    <cache name="oa-document-info" 
        eternal="true" 
        maxEntriesLocalHeap="100"
        maxEntriesLocalDisk="1000"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the object types that should be externally indexed -->
    <!--  Specific to Elastic Search. Keeps track of which object types should be indexed -->
    <cache name="objectTypes-to-index" 
        eternal="true"
        maxEntriesLocalHeap="100"
        maxEntriesLocalDisk="500"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>

    <!-- cache for the asset Files -->
    <!-- these are the asset files from the aca configs -->
    <cache name="assetFiles" 
        eternal="true"
        maxEntriesLocalHeap="5"
        maxEntriesLocalDisk="10"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="localTempSwap" />
    </cache>
    
    <!-- cache for template objects -->
    <cache name="oc-template"
        timeToLiveSeconds="60"
        maxEntriesLocalHeap="5000" 
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="none" />
    </cache>
</ehcache>
```

> **Note:** The override file should be configured such that the entry limits are based on the expected sizes of cache entries so that the caches don’t grow outside system resources.

## Override in a custom AMP

1. Edit the `opencontent-extension-override-config.xml` file in your client AMP to include the following two beans:

    ```xml
        <bean id="cacheManager" class="org.springframework.cache.ehcache.EhCacheCacheManager" p:cache-manager-ref="ehcacheOverride"/>

        <bean id="ehcacheOverride" class="org.springframework.cache.ehcache.EhCacheManagerFactoryBean" p:config-location="classpath:alfresco/module/com.tsgrp.opencontent/extension/config/ehcache-override.xml" p:shared="true"/> 
    ```

2. Place your `ehcache-override.xml` file within your custom AMP at the path specified in the `ehcacheOverride` bean.
