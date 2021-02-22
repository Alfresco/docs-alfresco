---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: troubleshooting installation JVM Eclipse
---

# Debugging an Alfresco installation

When developing add-ins, fixing bugs, or changing Alfresco from the source code, it is helpful to debug an instance of Alfresco running on a standard application server. This section outlines the steps needed to configure Alfresco and Eclipse to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.

To debug a running Alfresco server, you must connect to the JVM in which Alfresco is running. The following steps configure the JVM to expose an interface for this connection, and then configure Eclipse to connect to and control that JVM.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

## Configuring the JVM

This task describes how to configure the JVM to expose an interface for connection to the Alfresco server.

Before you start, you must:

-   Have a fully installed, configured, and running instance of Alfresco. These steps assume you are using Tomcat on Windows, but the steps are similar for other application servers on other systems.
-   Have an IDE installed. These steps describe how to configure Eclipse, which must be installed first \(http://www.eclipse.org/downloads\)
-   Download and install the Alfresco source code from http://wiki.alfresco.com/wiki/Alfresco\_SVN\_Development\_Environment.
-   Ensure the source code is the same version as the installed Alfresco server.

1.  Verify the Alfresco server is not running.

2.  Edit the JVM options used to start the Alfresco Tomcat instance. For example, `set JAVA_OPTS=%JAVA_OPTS% -server -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n, address=8082` where address is a port for your system.

3.  Save the file and close the editor.


## Configuring Eclipse

This task describes how to configure Eclipse to connect to and control the JVM.

1.  From the Run menu, choose the **Open Debug** dialog.

2.  Right-click **Remote Java Application** and select **New**.

3.  In the Name box, type Debug Local Tomcat Alfresco.

4.  Next to Project, click **Browse**, and select **Web Client**. If this is not available as an option, ensure your source code matches that of your server.

5.  In Connection Properties, enter the port number.

6.  Check **Allow Termination of remote VM** if you want to be able to stop the Alfresco server from the Eclipse console.

7.  Click **Apply** to save the configuration.


You have configured Alfresco and Eclipse. Next, you can start the Alfresco server and start the Debug configuration in Eclipse. Eclipse will connect to the Alfresco JVM. From the Java perspective in Eclipse, you can expand the “core” or “web client” packages, open the class files you are interested in, and set breakpoints for the Alfresco server to stop at. From the Debug perspective, you can then interrogate specific variables from the Alfresco server “live”, and step through the source code line by line.

