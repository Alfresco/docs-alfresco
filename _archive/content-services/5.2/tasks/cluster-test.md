---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: cache cluster testing
---

# Testing the cluster

There are a number of steps required to test repository server clustering.

The quickest and easiest way to test the cluster is by using the Admin Console.

Ensure that the Alfresco Content Services server is running.

1.  Enter the following URL in a browser window:

    ```
    http://<your-host-name>:8080/alfresco/service/enterprise/admin
    ```

    Where `<your-host-name>` is the host name where you are running the server.

    An Authentication Required prompt displays, showing the IP address or name and the port number of the server.

2.  Enter your user name and password.

    Your user name and password must be for an account with administrator permissions.

    The Admin Console displays in a browser window. The first page you see is the [System Summary](../concepts/adminconsole-systemsummary.md).

3.  In the Repository Services section, click Repository Server Clustering.

    You see the Repository Server Clustering page.

    This page displays information regarding the current cluster members under the Cluster Members section.

4.  Click **Validate Cluster** to start a quick test to check that communication is available between each pair of cluster members.

    You see the Cluster Validation page. This page displays the result in a matrix form showing cluster communication as either Success or Failure.


**Parent topic:**[Setting up repository server cluster](../concepts/cluster-overview.md)

