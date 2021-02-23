---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Tuning the JVM

The hardware requirements for the Alfresco repository and Share are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation.

## Hardware

**Important:** This section suggests metrics and estimates, but your system may vary.

**Note:** In the following sections, the terms concurrent users and casual users are used. Concurrent users are users who are constantly accessing the system through Alfresco with only a small pause between requests \(3-10 seconds maximum\) with continuous access 24/7. Casual users are users occasionally accessing the system through the Alfresco or WebDAV/CIFS interfaces with a large gap between requests \(for example, occasional document access during the working day\).

Alfresco degrades gracefully on low-powered hardware, and small installations can run well on any modern server. However, for optimum performance, we recommend the following:

-   Use 64 bit systems only. Benchmarks show a significant performance gain when using 64 bit hardware and a 64 bit JRE.
-   Use a system with a clock speed above 2.5 GHz.
-   Reserve enough RAM for your operating system beyond the memory required for your JVM.
-   Keep search indexes on your local disk instead of on network storage.

## Disk space usage

The size of your Alfresco repository defines how much disk space you will need; it is a very simple calculation. Content in Alfresco is, by default, stored directly on the disk. Therefore, to hold 1000 documents of 1 MB will require 1000 MB of disk space. You should also make sure there is sufficient space overhead for temporary files and versions. Each version of a file \(whether in DM or WCM\) is stored on disk as a separate copy of that file, so make allowances for that in your disk size calculations \(for DM, use versioning judiciously\).

**Note:** The disk space usage calculation above is only for content storing. It does not take into account any indexes \(Lucene or Solr\).

Use a server class machine with SCSI Raid disk array. The performance of reading/writing content is almost solely dependent on the speed of your network and the speed of your disk array. The overhead of the Alfresco server itself for reading content is very low as content is streamed directly from the disks to the output stream. The overhead of writing content is also low but depending on the indexing options \(for example, atomic or background indexing\), there may be some additional overhead as the content is indexed or metadata is extracted from the content in each file.

## Virtualization

Alfresco runs well when virtualized, but you should expect a reduction in performance. When using the rough sizing requirements below, it may be necessary to allocate twice as many resources for a given number of users when those resources are virtual. Para-virtualization, or virtualized accesses to native host volumes do not require as many resources. Benchmarking your environment is necessary to get a precise understanding of what resources are required.

## JVM memory and CPU hardware for multiple users

The repository L2 Cache, plus initial VM overhead, plus basic Alfresco system memory, is setup with a default installation to require a maximum of approximately 1024MB.

This means that you can run the Alfresco repository and web client with many users accessing the system with a basic single CPU server and only 1024MB of memory assigned to the Alfresco JVM. However, you must add additional memory as your user base grows, and add CPUs depending on the complexity of the tasks you expect your users to perform, and how many concurrent users are accessing the client.

**Note:** Note that for these metrics, **N** concurrent users is considered equivalent to **10xN** casual users that the server could support.

|Number of users

|Recommended memory / CPU settings per server

|
|-----------------|----------------------------------------------|
|For 50 concurrent or up to 500 casual users|2 GB JVM RAM 2x server CPU \(or 1xDual-core\)

|
|For 100 concurrent users or up to 1000 casual users|4 GB JVM RAM 4x server CPU \(or 2xDual-core\)

|
|For 200 concurrent users or up to 2000 casual users|8 GB JVM RAM 8x server CPU \(or 4xDual-core\)

|

**Note:** For full performance tuning, contact Alfresco Support or Alfresco Consulting.

-   **[JVM settings](../concepts/jvm-settings.md)**  
The following are typical settings:

**Parent topic:**[Day Zero configuration](../concepts/zeroday-config.md)

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

