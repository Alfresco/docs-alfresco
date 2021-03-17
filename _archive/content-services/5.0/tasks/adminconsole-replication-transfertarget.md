---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Creating a new transfer target for content replication

The transfer service stores files that control and monitor the operation of the transfer service in the **Transfers** space in the Data Dictionary.

The **Transfer Target Groups** space contains the transfer target definitions that specify where transfers go to. There is a group level below the folder which is used to classify different sets of transfer targets. There is only a single group called **Default Group**.

You can add transfer targets by creating a new transfers folder.

1.  Create a folder in **Company Home \> Data Dictionary \> Transfers \> Transfer Target Groups \> Default Group**.

2.  A rule defined on the **Default Group** folder specializes the type of any folder created within it.

    The type is set to `trx:transferTarget`, which you can then complete through the user interface. The new node contains the properties you can fill in through the user interface to set up your target.

3.  Create a new folder within the **Default Group** folder.

    You will be prompted to specify the name, title, and description of the new folder.

    1.  In the **New Folder** window, specify the name, title, and description of the new folder.

4.  Click **Edit Properties**.

5.  Specify the **Endpoint Host**, **Endpoint Port**, **Username** and **Password**, and click **Enabled** and **Save**.

    For example; Endpoint host: `localhost`, Endpoint port: `9080`, Username: `admin`, Password: `admin`

6.  Create a replication job to test the target setup.

    1.  In Alfresco Share, click More \> Replication Jobs from the menu.

    2.  Click **Create Job**.

    3.  Specify properties for Name, Payload Select, Transfer Target Select and click **Enabled**.

        Transfer Target Select must be the folder that you created in step 3.

    4.  Click **Run**.

    5.  Refresh the screen after a few minutes to see a status change.

7.  Verify the replication job.

    Log in to Alfresco Share on the target repository, select a transferred file and click **Open in Source Repository** to check that content has been replicated.


**Parent topic:**[Setting up content replication](../concepts/admintools-replication-config.md)

