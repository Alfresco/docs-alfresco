---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
---

# Optimizing Microsoft SQL Server to work with Alfresco

Make sure you manage Microsoft SQL Server to optimise performance.

To ensure that your performance does not degrade, it is useful to carry out the following weekly maintenance operations on your SQL server, especially in repositories with a high transaction count and frequency:

-   Recompute statistics by running the command: `EXEC sp_updatestats`
-   Clear the buffers by running the command: `DBCC DROPCLEANBUFFERS`
-   Clear the cache by running the command: `DBCC FREEPROCCACHE`
-   Run an index fragmentation check and:

    -   Rebuild anything that is \>30% fragmented
    -   Reorganize anything that is between 5 and 30% fragmented
    See [Reorganize and Rebuild Indexes](http://technet.microsoft.com/en-us/library/ms189858.aspx) for more information.


**Parent topic:**[Configuring a SQL Server database](../tasks/sqlserver-config.md)

