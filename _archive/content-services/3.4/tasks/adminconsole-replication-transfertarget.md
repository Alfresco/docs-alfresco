---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Administration, Web Services, Version 3.4]
option: Share transfer service Company Home target
---

# Creating a new transfer target for replication jobs

The transfer service stores files that control and monitor the operation of the transfer service in the **Transfer** space in the Data Dictionary.

The **Transfer Target Groups** space contains the transfer target definitions that specify where transfers go to. There is a group level below the folder which is used to classify different sets of transfer targets. There is only a single group called **Default Group**.

You can add transfer targets by creating a folder in Alfresco Explorer or Alfresco Share.

1.  Create a folder in **Company Home \> Data Dictionary \> Transfers \> Transfer Target Groups \> Default Group**.

2.  A rule defined on the **Default Group** folder specializes the type of any folder created within it. The type is set to `trx:transferTarget`, which you can then complete through the user interface.


**Parent topic:**[Setting up replication jobs](../concepts/adminconsole-replication-config.md)

