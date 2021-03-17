---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Creating a new transfer target for file system content replication

The transfer service stores files that control and monitor the operation of the transfer service in the **Transfers** space in the Data Dictionary.

The **Transfer Target Groups** space contains the transfer target definitions that specify where transfers go to. There is a group level below the folder which is used to classify different sets of transfer targets. This folder contains a group called **Default Group**.

You can add transfer targets by creating new transfer folders.

1.  In the source repository, create a new folder in **Company Home \> Data Dictionary \> Transfers \> Transfer Target Groups \> Default Group**.

    1.  In the **New Folder** window specify a name, for example, Replica. You can add a title and description, if you wish.

        A rule defined on the **Default Group** folder specializes the type of any folder created in it.

        The type is set automatically by the folder rule to `trx:transferTarget`. This allows you add the required properties to define the replication target through the user interface.

    2.  Manually change the type of the folder. In the Folder Details page, select **Change Type**, and then choose **File Transfer Target** for this new type.

        This allows you to also set a **Root Folder** that's required by the File System Transfer Receiver system.

    3.  Click **Edit Properties** on your new folder \(Replica\).

    4.  Specify the required properties:

        1.  Specify the **Endpoint Host**, **Endpoint Port**, **Username** and **Password**.
        2.  Specify the rest of the properties to point to the FSTR server that you've setup using [Start File System Transfer Receiver](FSTR-running.md).

            **Note:** Here, you have the option to select the **Root folder**. Browse and select a sub-folder of the **Document Library** in the site from which you plan to transfer the files. For example, if you want to transfer some files from a folder called **folder1** in a site called **site1**, select that **folder1** as the **Root Folder** in the properties window.

        3.  Click **Enabled** and **Save**.
    5.  Enable the replication service in your alfresco-global.properties file:

        ```
        replication.enabled=true
        ```

        and restart the source repository.

2.  In the target repository, enable the replication server and content receiver in the alfresco-global.properties file:

    ```
    replication.enabled=true
    transferservice.receiver.enabled=true
    ```

    and restart the target repository.

3.  On the source repository, create a replication job to test the target setup.

    1.  From the toolbar, click Admin Tools and select Replication Jobs from the menu.

    2.  Click **Create Job**.

    3.  Specify properties for Name, Payload, Transfer Target.

        Name is a new folder name; for example, Replication Job. Payload is the source content directory, and Transfer Target is the folder name that you set up in [step 1](FSTR-transfertarget.md#replica) \(Replica\).

    4.  Click **Enabled**.

    5.  Click **Create Job**.

    6.  Refresh the screen after a few minutes to see a status change.

4.  Verify the replication job.

    Log in to Alfresco Share on the target repository, select a transferred file and click **Open in Source Repository** to check that content has replicated.


**Parent topic:**[Configuring the File System Transfer Receiver](../concepts/FSTR-intro.md)

