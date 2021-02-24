---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Performing a full hot reindex on a cluster

Use this information to perform a full hot reindex on an Alfresco cluster.

This process applies to Lucene indexes only.

1.  Change your load balancer configuration to prevent any user traffic from being directed to node 1.

2.  Shut down Alfresco on node 1.

3.  Remove the Lucene indexes on node 1 \(alf\_home\_dir/alf\_data/lucene-indexes\).

4.  Start Alfresco on node 1. It takes some time for indexing to complete. The following message is displayed in the log files:

    ```
    18:14:44,806 INFO [node.index.FullIndexRecoveryComponent] 100 %  complete. 
    18:14:44,992 INFO [node.index.FullIndexRecoveryComponent] Index recovery completed.
    ```

    This message does not indicate that full reindex is finished, it shows that the full reindex of the metadata is finished. Node 1 will then index the content of the documents in the background. You need to wait till this process is finished. To confirm that the content is indexed, you could monitor the CPU activity - it will be consistently high until the indexing is finished, at which point it should drop sharply.

5.  Shut down Alfresco on node 1.

6.  Make a backup copy of the indexes on node 1.

7.  Revert the configuration changes made in Step 4. To do so, remove the `system.cache.disableMutableSharedCaches=true` setting.

8.  Start up Alfresco on node 1.

9.  Change your load balancer configuration to allow user traffic back to node 1 and stop traffic from going to node 2.

10. Shut down Alfresco on node 2.

11. Delete the Lucene indexes on node 2.

12. Copy the backup made in Step 7 into the lucene-indexes directory on node 2.

13. Start Alfresco on node 2.

14. There may be a small amount of additional top-up indexing required on node 2. Once this indexing has finished \(as per Step 5\), change your load balancer configuration to allow traffic to node 2.


**Parent topic:**[Backing up and restoring](../concepts/ch-backup-restore.md)

