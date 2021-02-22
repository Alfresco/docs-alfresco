---
author: [Alfresco Documentation, Alfresco Documentation]
source: wiki
audience: 
category: Customization
option: JVM
---

# Tuning the JVM

The hardware requirements for the Alfresco repository, and Explorer and Share, are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation. This section suggests metrics and estimates, but your system may vary.

**Note:** Concurrent users are users who are constantly accessing the system through Alfresco Explorer with only a small pause between requests \(3-10 seconds maximum\) with continuous access 24/7. Casual users are users occasionally accessing the system through Alfresco Explorer or WebDAV/CIFS interfaces with a large gap between requests \(for example, occasional document access during the working day\).

## Disk space usage

The size of your Alfresco repository defines how much disk space you will need; it is a very simple calculation. Content in Alfresco is, by default, stored directly on the disk. Therefore, to hold 1000 documents of 1 MB will require 1000 MB of disk space. You should also make sure there is sufficient space overhead for temporary files and versions. Each version of a file \(whether in DM or WCM\) is stored on disk as a separate copy of that file, so make sure you allow for that in your disk size calculations \(for DM, use versioning judiciously\).

Use a server class machine with SCSI Raid disk array. The performance of reading/writing content is almost solely dependent on the speed of your network and the speed of your disk array. The overhead of the Alfresco server itself for reading content is very low as content is streamed directly from the disks to the output stream. The overhead of writing content is also low but depending on the indexing options \(for example, atomic or background indexing\), there may be some additional overhead as the content is indexed or metadata is extracted from the content in each file.

## JVM memory and CPU hardware for multiple users

The repository L2 Cache with initial VM overhead and basic Alfresco system memory is set up with a default installation to require approximately 512 MB \(maximum\).

This means you can run the Alfresco repository and Explorer with many users accessing the system with a basic single CPU server and only 512 MB of memory assigned to the Alfresco JVM. However, you must add additional memory as your user base grows, and add CPUs depending on the complexity of the tasks you expect your users to perform, and how many concurrent users are accessing the client.

**Note:** For these metrics, **N** concurrent users is considered equivalent to **10xN** casual users that the server could support.

|Number of users

|Recommended memory / CPU settings per server

|
|-----------------|----------------------------------------------|
|For 50 concurrent or up to 500 casual users|1 GB JVM RAM2x server CPU \(or 1 x Dual-core\)

|
|For 100 concurrent users or up to 1000 casual users|1 GB JVM RAM4x server CPU \(or 2 x Dual-core\)

|
|For 200 concurrent users or up to 2000 casual users|2 GB JVM RAM8x server CPU \(or 4 x Dual-core\)

|

Concurrent users are considered to be users constantly accessing the system through the Alfresco web-client with only a small pause between requests \(3-10 seconds maximum\) - with continuous access 24/7. Casual users are considered to be users occasionally accessing the system through the Alfresco web-client or webdav/CIFS interfaces with a large gap between requests \(for example, occasional document access during the working day\).

## Permanent Generation \(PermGen\) Size

The default PermGen size in Sun JVMs is 64M, which is very close to the total size of permanent objects \(Spring beans, caches, and so on\) that Alfresco creates. For this reason it is easy to overflow the PermGen as the result of configuration changes or with the addition of custom extensions. It is recommended that you increase the PermGen to avoid OutOfMemory errors, for example, -XX:MaxPermSize=128M is a good starting point.

**Note:** The size of the PermGen is now increased in the Alfresco startup scripts, so provided you are using those scripts, no changes should be necessary.

## Maximum JVM Heap Size 32/64bit

An important calculation to keep in mind is:

```
(Managed Heap + native heap + (thread stack size * number of threads)) cannot exceed 2GB on 32bit x86 Windows or Linux systems
```

This is a limitation of the Sun Java VM. It means that even if you install 4GB of RAM into your server, a single instance of the JVM cannot grow beyond 2GB on a 32bit server machine.

**Note:** A 64 bit OS/JVM has much bigger values. It is recommended that a 64bit OS with large memory hardware \(\>2GB assigned to the JVM\) is used for deployments of \>250 concurrent or \>2500 casual users.

You can also set up your machine to cluster if you prefer to solve multi-user access performance issues with additional machines rather than a single powerful server.

-   **[JVM settings](../concepts/jvm-settings.md)**  
Alfresco generates a high proportion of temporary objects, both in client threads as well as in the background processes. To reduce the number of temporary objects that spill into the OldGen portion of the heap, you need to set the NewSize option as large as possible.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

