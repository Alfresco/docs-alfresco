---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: troubleshooting installation JVM Eclipse
---

# Debugging an installation

When developing add-ins, fixing bugs, or changing Alfresco Content Services from the source code, it is helpful to debug an instance running on a standard application server. You can configure Alfresco Content Services and Eclipse to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.

To debug a running server, you must connect to the JVM in which Alfresco Content Services is running. The following steps configure the JVM to expose an interface for this connection, and then configure Eclipse to connect to and control that JVM.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

## Configuring the JVM

You can configure the JVM to expose an interface for connection to the server.

Before you start, you must:

-   Have a fully installed, configured, and running instance of Alfresco Content Services. These steps assume you are using Tomcat on Windows, but the steps are similar for other application servers on other systems.
-   Have an IDE installed. These steps describe how to configure Eclipse, which must be installed first \([Eclipse](http://www.eclipse.org/downloads)\)
-   Download and install the source code from [Alfresco Content Services source code](http://wiki.alfresco.com/wiki/Alfresco_SVN_Development_Environment).
-   Ensure the source code is the same version as the installed server.

1.  Verify that the server is not running.

2.  Edit the JVM options used to start the Tomcat instance.

    For example, set the following:

    ```
    JAVA_OPTS=%JAVA_OPTS% -server -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8082
    ```

    where `address` is a port for your system.

3.  Save the file and close the editor.


## Configuring Eclipse

This task describes how to configure Eclipse to connect to and control the JVM.

1.  From the Run menu, choose the **Open Debug** dialog.

2.  Right-click **Remote Java Application** and select **New**.

3.  In the Name box, type Debug Local Tomcat Alfresco.

4.  Next to Project, click **Browse**, and select **Web Client**. If this is not available as an option, ensure your source code matches that of your server.

5.  In Connection Properties, enter the port number.

6.  Check **Allow Termination of remote VM** if you want to be able to stop the server from the Eclipse console.

7.  Click **Apply** to save the configuration.


