---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade cluster high availability
---

# Upgrading a cluster

If you have configured an Alfresco cluster, you must perform this task when upgrading Alfresco.

1.  Shut down all nodes in the cluster.

2.  Perform the steps described in the upgrading general process on each node in turn, ensuring that each node starts fully before restarting the next one.

    You only have to copy the database once as it will be upgraded by the first node to be upgraded. The other nodes will detect it has been upgraded and skip the database upgrade step.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

**Related information**  


[Upgrading Alfresco](upgrade-process.md)

