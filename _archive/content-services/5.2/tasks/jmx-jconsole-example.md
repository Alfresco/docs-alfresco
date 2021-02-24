---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administrations
keyword: [runtime, JConsole]
---

# Configuring with JConsole

If you have installed the Oracle Java SE Development Kit \(JDK\), you can use the JMX client, JConsole, for runtime administration.

The initial configuration that displays in JConsole is set from the alfresco-global.properties file.

1.  Open a command console.

2.  Locate your JDK installation directory.

    For example, the JDK directory is often java/bin.

3.  Enter the following command:

    jconsole

    The JConsole New Connection window displays.

4.  Double-click on the Alfresco Content Services Java process.

    For Tomcat, this the Java process is usually labelled as **org.apache.catalina.startup.Bootstrap start**.

    JConsole connects to the managed bean \(or MBean\) server hosting the subsystems.

5.  Select the MBeans tab.

    The available managed beans display in JConsole.

6.  Navigate to **Alfresco \> Configuration**.

    The available subsystems display in an expandable tree structure. When you select a subsystem, the **Attributes** and **Operations** display below it in the tree.

7.  Select **Attributes** and set the required subsystem attribute values.

    Values that can be edited are shown with blue text.

    When you change a configuration setting, the subsystem automatically stops.

8.  Restart the subsystem:

    1.  Navigate to the subsystem.

    2.  Select **Operations**.

    3.  Click **Start**.

9.  To stop the subsystem without editing any properties:

    1.  Navigate to the subsystem.

    2.  Select **Operations**.

    3.  Click **Stop**.

10. To revert back to all the previous edits of the subsystem and restores the default settings:

    1.  Navigate to the subsystem.

    2.  Select **Operations**.

    3.  Click **Revert**.

11. Click **Connection \> Close**.


The settings that you change in a JMX client, like JConsole, are persisted in the database. When you make a dynamic edit to a subsystem:

1.  When a subsystem, that is currently running, is stopped, its resources are released and it stops actively listening for events. This action is like a sub-part of the server being brought down. This ‘stop’ event is broadcast across the cluster so that the subsystem is brought down simultaneously in all nodes.
2.  The new value for the property is persisted to the database.

There are two ways to trigger a subsystem to start:

-   The start operation
-   An event that requires the subsystem

**Parent topic:**[Using a JMX client to change settings dynamically](../concepts/jmx-intro-config.md)

