---
author: Alfresco Documentation
source: 
---

# **Installing into Tomcat**

To deploy Alfresco Digital Workspace into Tomcat, you first need to install Alfresco Content Services 6.1 using the distribution zip. See [Installing using distribution zip](https://docs.alfresco.com/6.1/concepts/ch-install.html) for more information.

1.  Log in to the Support Portal at [http://support.alfresco.com](http://support.alfresco.com/).

2.  Go to the **Downloads** area and download `digital-workspace.war`.

3.  On the server that will host the Digital Workspace move the `digital-workspace.war` file to the `<TOMCAT_HOME>/webapps` folder.

    **Note:** Tomcat extracts the files automatically.

4.  Browse the extracted digital-workspace directory and open the `app.config.json` file in a text editor.

5.  Edit the `app.config.json` file and change the `ecmHost` property to be the same as your Alfresco Content Services server and allocated port. For example:

    `http://<acsservername>:port`

6.  Save the file.

7.  Open your browser and access the Digital Workspace:

    -   `http://<acsservername>:8080/digital-workspace`

**Parent topic:**[Deploying the Digital Workspace](../tasks/deploying.md)

