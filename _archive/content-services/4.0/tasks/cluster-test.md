---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: cache cluster testing
---

# Testing cache clustering

This section describes the steps used to test cache clustering.

We do not recommend using a clustered Alfresco installation until the following tests pass. If the tests don't pass, carefully review all the configuration settings and check that appropriate ports have been opened in any firewalls. Use the additional troubleshooting tips in the [Troubleshooting configuration](../concepts/troubleshooting-conf.md) topic.

If you need technical support, contact Alfresco Customer Support by email at *support@alfresco.com*.

1.  For each cluster node, connect with a JMX client, such as JConsole.

    The following are typical connection details:

    **URL:** service:jmx:rmi:///jndi/rmi://<host\>:50500/alfresco/jmxrmi

    **username:** controlRole

    **password:** change\_asap

    If you are unable to connect externally via JConsole, the RMI communications necessary to support clustering are also unlikely to work. For details, see the [Troubleshooting configuration settings](../concepts/troubleshooting-conf.md) topic.

2.  In each JConsole, navigate to **MBeans \> Alfresco \> RepoServerMgmt \> Attributes**. Check the value of TicketCountAll attribute for each cluster node.

3.  Using Alfresco Share, log in to one of the nodes.

4.  Using JConsole, refresh the TicketCountAll attribute by clicking **Refresh**.

5.  Check the value of TicketCountAll or TicketCountNonExpired attribute on all nodes again using JConsole. The values on each node should have increased in step with each other.


**Parent topic:**[Verifying the cluster](../concepts/cluster-test-intro.md)

