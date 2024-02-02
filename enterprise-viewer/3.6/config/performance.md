---
title: AEV performance tuning
---

Alfresco Enterprise Viewer (AEV) relies heavily on progressive transformations of PDF to PNG content to generate its premium user experience. These transformations incur the vast majority of system load, therefore, performance tuning generally focuses on the load use cases below:

* Loading native or renditioned content from the repository (full binary)
* Transformation of individual page(s) of PDF to PNG at specific resolution

To understand what requires performance tuning, here is a step by step description of what happens when a user loads a document in AEV (simplified for performance tuning purposes):

* The browser makes a request to OpenContent for binary content, properties, associated annotation information.
* If the binary content is cached (keyed on object id and modify date), return cached binary content.
* If the binary content is not cached, fetch using ECM API.
* Once a user has loaded Enterprise Viewer, individual pages are viewed in the browser as PNGs. These PNGs are transformed on demand as the user scrolls through the document pages. The application requests individual page transformations at the following times:
  * Viewing current page
  * Precaching nearby pages (within a preconfigured range)
  * Progressively scaled different resolution images for gracefully degraded view experience
  *Page resize events

As the transformation requests require page-specific transformation events, the current iteration of the Alfresco T-Engine framework does not support the needs of AEV. Thus, transformations are performed by default in the server hosting the OpenContent REST API (typically the ACS server node). See the "AEVT" section below for an alternative for extreme scaling requirements.

Here are the configurable options that may be set in an override properties file, or ACA Extension AMP, that can assist in troubleshooting and tuning performance issues related to the PDF->PNG transformations:

```text
# pdfium transformation default property values.

# The path to the installation of pdfium to use to transform PDFs to PNGs. NOTE: This path is only used for non window systems
# The pdfium windows build is included in OC
pdfium.path=/opt/pdfium

# A commas separated list of options to be passed into the pdfium command. See https://pdfium.googlesource.com/pdfium/ for more info.  For example: use `-A 0` for turning off anti-alias
pdfium.options=

# True if this is being run in debug mode and a temporary file should be created for pdfium's stderr stream & command, false otherwise.
pdfium.debugMode=false

# The most pdfium transformation threads that can be running at a single time.  Setting this property to 0 disables thread limiting.
pdfium.maxThreadCount=5

# The maximum number of pdfium transformations that will back up into the queue.  Unused if maxThreadCount is not defined.
pdfium.maxQueueSize=100

# The maximum idle time (in milliseconds) a thread will be kept alive. Unused if maxThreadCount is not defined.
pdfium.threadKeepAliveTime=5000

#Can be set to kill a Linux thread after a certain amount of time.. ex 10s, 5s, 1s.
pdfium.threadTimeout=5s

# Can be set to send a brute force kill in Linux after a certain amount of time.. ex 10s, 5s, 1s of sending original kill signal.
pdfium.threadKillAfter=5s

# This is a basic regex to allow any character to be passed in, this should be overriden by project
# ^\\/nas\\/vault\\d+\\/alf_data\\/contentstore\\/\\d+\\/\\d+\\/\\d+\\/\\d+\\/\\d+\\/((?!(.*[;<>|]+.*))(?!(.*&&.*))(?!(.*\\$\\(.*))(?!(.*\\|\\|.*))).+
# This is an example that requires the path to start with /nas/vault##/alf_data_contentstore/##/##/##/##/document-name without allowing && $( || | ; as they are command injection threats in linux

pdfium.pathRegexPattern=.+

#The max amount of processes to use when transforming content.
pdfium.maxProcessCount=4
```

## Ehcache

Handles binary caching of pre and post transformed content.

Some General places to look to improve your specific production environment are to properly size the OpenContent heap and caches are in `ehcache.xml`. If your usage patterns are that users don't end up coming back to view the same documents multiple times, you will likely want MORE `oc-content` and `oc-document-overlays` since that is the raw byte[] of the content that the transformation agent keeps going to each time to get the content rather than having to go to the repository each time. `oc-pages` isn't as important in this case since the browser will cache most of the pages anyways.

```xml
 <!-- cache for the content of our objects -->
 <cache name="oc-content" eternal="true" maxBytesLocalHeap="150M"
  maxBytesLocalDisk="5G" memoryStoreEvictionPolicy="LRU">
  <persistence strategy="localTempSwap" />
 </cache>

 <!-- cache for the page transformations from PDFs to PNG for our objects -->
 <cache name="oc-pages" eternal="true" maxBytesLocalHeap="250M"
  maxBytesLocalDisk="5G" memoryStoreEvictionPolicy="LRU">
  <persistence strategy="localTempSwap" />
 </cache>

 <!-- cache for the overlays of our objects -->
 <cache name="oc-document-overlays" eternal="true"
  maxBytesLocalHeap="50M" maxBytesLocalDisk="5G"
  memoryStoreEvictionPolicy="LRU">
  <persistence strategy="localTempSwap" />
 </cache>
```

Optionally, in the case of "single view" usage of document, local storage can be disabled entirely. See below XML for suggested configuration:

```xml
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:noNamespaceSchemaLocation="../config/ehcache.xsd"
    maxBytesLocalHeap="3g">

    <!-- where to store the files written to disk on overflow -->
    <diskStore path="java.io.tmpdir"/>
    
    <!-- cache for the content of our objects -->
    <cache name="oc-content"
        maxBytesLocalHeap="1g"
        eternal="true"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="none" />
    </cache>
    
    <!-- cache for the page transformations from PDFs to PNG for our objects -->
    <cache name="oc-pages"
        maxBytesLocalHeap="1g"
        eternal="true"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="none" />
    </cache>
        
    <!-- cache for the overlays of our objects -->
    <cache name="oc-document-overlays"
        maxBytesLocalHeap="1g"
        eternal="true"
        memoryStoreEvictionPolicy="LRU">
        <persistence strategy="none" />
    </cache>
            
</ehcache>
```

## PdFium / GhostScript / MuPDF

Every page of a document is transformed using either PdFium, GhostScript, or MuPDF. So anything that can be done to improve the performance of this process will help.

* By default, AEV uses PDFium. A third-party license may be required for using MuPDF or GhostScript.
* Use a solid state drive (SSD) for your temporary directories.
* Even better performance, use a [RAM Disk/tempfs](https://en.wikipedia.org/wiki/Tmpfs){:target="_blank"} like `/dev/shm` as that is faster than even an SSD.

## AEV performance

Enterprise Viewer has a configuration to toggle if a "low-res" and a "high-res" image are requested for a page. Toggle the `progressiveReloadSteps=0` property to reduce the load on the system and only load the high-resolution rather than both. There are times that the high-res call could complete before the other call if the system is really bogged down, so the less load that can be triggered in general has been found to have a positive impact at peak usage.

## AEV transformations

Should the embedded OpenContent transformations not scale to the level necessary for your implementation, the "Alfresco Enterprise Viewer Transformation" application can operate at scale. This application is also known as "Alfresco Enterprise Viewer Transformations", or AEVT for short. See [Installing Alfresco Enterprise Viewer Transformer]({% link enterprise-viewer/3.6/install/aevt.md %})

AEVT/OAT is used on Alfresco PaaS.
