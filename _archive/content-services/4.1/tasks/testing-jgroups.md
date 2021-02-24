---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [cluster, JGroups]
---

# Testing JGroups

This topic describes the steps used to test if JGroups is working correctly and to confirm that all cluster nodes are communicating successfully.

1.  Enable `DEBUG` level logging for the following log4j logger classes:

    ```
    `org.alfresco.enterprise.repo.cache.jgroups.JGroupsKeepAliveHeartbeatReceiver=debug`
    `org.alfresco.enterprise.repo.cache.jgroups.JGroupsKeepAliveHeartbeatSender=debug`
    ```

2.  Start up the servers.

3.  Check for the presence of log messages beginning with `Sending cache peer URLs heartbeat:` in the logs.

4.  Check for the presence of log messages beginning with `Received cache peer URLs heartbeat:` in the logs.

    If the cluster nodes can communicate with each other, the `Received cache peer URLs heartbeat:` log messages will appear in the log file in response to the heartbeat messages in Step 3. The log message will also display the host names of the peer nodes as the `src` attribute in the message.

    However, if there is no communication between the cluster nodes, only the `Sending cache peer URLs heartbeat:` messages will appear in the log file.

5.  Once you are sure that all the cluster members are communicating successfully, it is advised that you enable `INFO` level \(or greater\) logging for the following log4j logger classes:

    ```
    `org.alfresco.enterprise.repo.cache.jgroups.JGroupsKeepAliveHeartbeatReceiver=info`
    `org.alfresco.enterprise.repo.cache.jgroups.JGroupsKeepAliveHeartbeatSender=info`
    ```


**Parent topic:**[Verifying the cluster](../concepts/cluster-test-intro.md)

