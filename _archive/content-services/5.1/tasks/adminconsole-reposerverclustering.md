---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
---

# Managing members of a cluster

Use the Admin Console for repository server clustering.

Servers connected to the same database instance are usually clustered automatically. In most cases no additional configuration is necessary.

**Note:** Ensure that clustering is enabled for your license.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Repository Server Clustering**.

    You see the Repository Server Clustering page.

3.  Set the clustering properties:

    **For Host Server:**

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |**Server Name**|ip-x-x-x-x|This specifies the name of the host server that you are currently connected to.|
    |**Cluster**|Enabled or Disabled|This shows if clustering is enabled or disabled. You need to have a correct license to enable clustering.|
    |**IP Address**|x.x.x.x|This specifies the IP address of the server.|
    |**Cluster ID**|xxxxxx|This specifies the unique id of the server.|

    **For Cluster Members: Server Details**

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |**Server**|ip-x-x-x-x|This specifies the server name of the cluster member.|
    |**IP**|x.x.x.x|This specifies the IP address of the server.|
    |**Port**|5701|This specifies the port number of the server.|
    |**Last Registered**|02-Oct-2013 12:48:37|This specifies the date and time when the cluster member was last started.|
    |**Number of Members**|1|This specifies the total number of members in the cluster.|

    **For Offline Cluster Members: Server Details**

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |**Server**|ip-x-x-x-x|This specifies the server name of a previously clustered server member that is no longer a member of the cluster.|
    |**IP**|x.x.x.x|This specifies the IP address of the offline server.|
    |**Port**|5701|This specifies the port number of the offline server.|
    |**Last Registered**|02-Oct-2013 12:48:37|This specifies the date and time when the offline cluster server was last started.|

4.  Click **Remove from list** to decommission a particular cluster member.

    The offline cluster member no longer appears in the **Offline Cluster Members** list.

5.  Set the clustering properties for **Connected Non-Clustered Server\(s\)**:

    In exceptional cases, an Alfresco server may be connected to the same database as other cluster members, and yet it may not be a member of the repository cluster. In other words, it will have clustering disabled. Such a server is called connected non-clustered server.

    |Clustering property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |**Server**|ip-x-x-x-x|This specifies the name of the server.|
    |**IP**|x.x.x.x|This specifies the IP address of the server.|

6.  To check if clustering is working properly, click **Validate Cluster**.

    You see the **Cluster Validation** page. This page shows the validation results for a cluster.

    Cluster validation performs a check to ensure that communication between the cluster members is working correctly. For a cluster to be considered validated, all cluster members should show success status. If one server fails in a two-server cluster, then both the servers will be marked as failed.

7.  Click **Close**.


**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

