---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing Alfresco Enterprise plug in for Hyperic

Hyperic provides auto-discovery, monitoring of system resources, alerts, charting, and event correlation for problem identification and resolution. The Alfresco Enterprise plug in for Hyperic allows you to auto-discover all Alfresco components and to monitor usage and performance using the Hyperic HQ interface.

Before you install the Alfresco Enterprise plug in for Hyperic, ensure the following:

-   Hyperic HQ 4.6 Server is installed and running on your system
-   Hyperic HQ Agent is installed on the same machine as Alfresco
-   The operating system user running the Hyperic agent and the operating system user running Alfresco both have permissions to read and write each other's file. For example, both users must be running as root, or alternatively, both users must be in the same group, with umask set to 2.

The Hyperic installation consists of a server and one or more agents. A Hyperic agent running on the same machine as your Alfresco server can use the Alfresco Enterprise plug in to detect running Alfresco servers on the machine, collecting metrics on availability, performance, and use. The agent sends the inventory and metric data to the Hyperic HQ server, which can be managed using the Hyperic portal.

1.  Open the Alfresco startup script and append the following to the JAVA\_OPTS setting:

    `-Dalfresco.home=%CATALINA_HOME% -Dcom.sun.management.jmxremote`

2.  Save the start up script, and then restart Alfresco.

3.  Browse to Alfresco [Alfresco Support Portal](http://support.alfresco.com).

4.  In the Downloads section, choose your version of Alfresco and download the Hyperic plug-in zip file.

    hyperic-plugin.zip

5.  Unzip the file and copy the alfresco-enterprise-plugin.xml file to the hq-plugins directory in your Hyperic installation.

    For example, the directory\_install\_hq\_server\\hq-plugins directory.

6.  Restart the Hyperic agent using the following command:

    \(Linux\) /etc/init.d/hyperic-hq-agent restart

7.  In the Hyperic portal, schedule an auto-discovery.

    Refer to the Hyperic documentation for details on how to set up auto-discovery.

    **Note:** If it is not appended, then check the agent.log file. If you see the message `"...WARNING - custom plugins on the agent are no longer supported. Will not load plugin - alfresco-enterprise-plugin.xml...."`, then add the alfresco-enterprise-plugin.xml plugin to the Hyperic HQ Server using the Plugin Manager, and then restart the HQ agent.

    The **Alfresco Enterprise Server** is discovered, in addition to all the system resources on the machine.

8.  To enable log tracking, click **Resources**, then navigate to the Alfresco Server and select **Inventory**.

9.  Under **Configuration Properties**, click **Edit**.

10. Set server.log\_track.enable to true.

11. Set the server.log\_track.level, if required.

    Log entries will then be indicated by a blue light at the bottom of the **Monitor** tab.


**Parent topic:**[Monitoring Alfresco](../concepts/monitoring-intro.md)

