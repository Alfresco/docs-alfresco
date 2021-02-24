---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Administration, Web Services, Version 3.4]
option: Share transfer service Company Home target
---

# Creating a new transfer target for replication jobs

To use the replication jobs feature for replicating content across Alfresco repositories, you need to create a transfer target definition \(in the source Alfresco server\) to specify where the transfer should go.

The files that control and monitor the transfer service are stored using a folder in Alfresco Share, in the **Transfers** space under **Data Dictionary**. The **Transfer Target Groups** space contains the transfer target definitions that specify the destination of the transfer. The group level below this space, called **Default Group**, is used to classify different sets of transfer targets.

1.  On the source Alfresco server, browse to **Company Home \> Data Dictionary \> Transfers \> Transfer Target Groups \> Default Group**.

2.  Create a folder for the new transfer target.

    For example, create a folder called **Transfer1**.

3.  Edit the properties for the new folder and modify the following fields:

    |Field|What is it?|
    |-----|-----------|
    |**Endpoint Host**|Type the host name of the target server.|
    |**Endpoint Port**|Type the port number of the target server. For example, type `8080`.|
    |**User Name**|Type a user name of an account on the target server.|
    |**Password**|Type a password for the user account.|
    |**Enabled**|Click this checkbox to enable the transfer target.|

    A rule defined on the **Default Group** folder specializes the type of any folder created within it. The type of the folder is set to `trx:transferTarget`, which you can then complete through the user interface.

4.  Click **Save**.

5.  On the source server, configure Share to open locked content.

    Refer to [Configuring Share to open locked content in the source repository](adminconsole-replication-lockedcontent.md).

6.  Verify that the target server is set up correctly.

    1.  Log in to the source server.

    2.  Create a folder on the source server.

        For example, in Company Home, create **Folder1**.

    3.  Create a job with the source as **Folder1** and a transfer target as **Transfer1**. Refer to [Creating a new replication job](adminconsole-replication-create.md).

    4.  Run the new job.

    5.  On the target server, open the folder that contains the source for the job \(**Folder1**\).

    6.  On the target server, click **View in Source Repository**.

        **Folder1** opens in the source repository.


**Parent topic:**[Setting up replication jobs](../concepts/adminconsole-replication-config.md)

