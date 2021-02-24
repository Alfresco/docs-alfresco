---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Installation
option: deployment web project
---

# Single web project deployed to two Tomcat webapps

This example describes how to install a test server that can be used to receive the contents of your authoring sandbox.

Install a separate instance of Tomcat to receive your deployment. The files to be deployed need to be placed in `<tomcat home>/webapps/red` and `<tomcat home>webapps/blue`.

1.  Install a standalone deployment receiver on the machine with your instance of Tomcat.

2.  Configure the file system deployment target that comes with the standalone deployment receiver.

3.  Open the deployment.properties file and set the `deployment.filesystem.datadir` property to where you want your content to go.

    For example, in this case c:/tomcat/webapps.

4.  In Alfresco Explorer, create a Web Project called "colors".

5.  On the Web Project Details window:

    1.  Set a name of `colors`.

    2.  Set the DNS Name to `colors`,

    3.  Create a webapp called `red`.

    4.  Create a webapp called `blue`.

    5.  Change the default webapp to `red`.

6.  On the Configure Deployment Receivers window:

    1.  Add Deployment Receiver.

    2.  In the **Display Name** field, type `colors`.

    3.  In the **Display Group** field, type `demo`.

    4.  In the **Type** field, type `Test Server`.

    5.  In the **Host** field, type the host name or IP address of your standalone deployment receiver.

    6.  In the **Port** field, type `44100`.

    7.  In the **Username** field, type `admin`, and the **Password**, type `admin`.

    8.  Leave the **Source Path** field blank.

    9.  In the **Target Name** field, type `default`.

7.  Add a file called index.htm containing "hello world red" to the red webapp.

8.  Add a file called index.htm containing "hello world blue" to the blue webapp.

9.  Deploy your web project to your test server.


You should be able to open `<your tomcat webserver>/red` and see `hello world red` and then open `<your tomcat webserver>/blue` and see `hello world blue`.

**Parent topic:**[Filesystem deployment target](../concepts/wcm-targets-filesystem.md)

