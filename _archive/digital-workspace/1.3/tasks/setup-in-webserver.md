---
author: Alfresco Documentation
source: 
---

# Installing into a different web server

You can deploy Alfresco Digital Workspace into a different web server than where Alfresco Content Services is running. You can use another instance of Tomcat, a lightweight web server such as NGINX, or you can use a web server of your choice. First you need to install Alfresco Content Services 6.1 or above using the distribution zip.See [Installing using distribution zip](https://docs.alfresco.com/6.2/concepts/ch-install.html) for more information.

1.  Log in to the Support Portal at [https://support.alfresco.com](https://support.alfresco.com/).

2.  Go to the **Downloads** area and select Alfresco Digital Workspace.

3.  Download `digital-workspace.zip` for the required version.

4.  On the server where you want to host Alfresco Digital Workspace extract the files to `<webserver-location>/html`.

    **Note:** This is the public html folder.

5.  Browse the extracted files and open `app.config.json` in a text editor.

6.  Edit the `app.config.json` file and change the `ecmHost` property to be the same as your Alfresco Content Services server and allocated port. For example:

    `http://<acsservername>:port`

7.  Also in the `app.config.json` file, change the `baseShareUrl` property to be the server name of Alfresco Digital Workspace. For example:

    `http://<appservername>:port/digital-workspace` \(digital-workspace being the name of the war file\)

    **Note:** If Quickshare is disabled in Alfresco Content Services ignore this step.

    To disable Quickshare, set `system.quickshare.enabled=false` in the \\tomcat\\shared\\classes\\alfresco-global.properties file. For more information, see [Using the alfresco-global.properties file](https://docs.alfresco.com/6.2/concepts/global-props-intro.html).

8.  Save the file.

9.  Open your browser and access Alfresco Digital Workspace:

    `http://<appservername>:8080/digital-workspace`


**Note:** When deploying Alfresco Digital Workspace to a different web server, it is recommended you setup Cross-Origin Resource Sharing \(CORS\). For more information, see [Cross Origin Resource Sharing \(CORS\) filters](https://docs.alfresco.com/6.2/tasks/enable-cors.html) and [Cross-Origin Resource Sharing \(CORS\)](https://enable-cors.org/).

**Parent topic:**[Deploying Digital Workspace](../tasks/deploying.md)

