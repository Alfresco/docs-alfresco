---
author: Alfresco Documentation
source: 
---

# Installing into a different web server

You can deploy Alfresco Digital Workspace into a different web server than where Alfresco Content Services is running. You can use another instance of Tomcat, a lightweight web server such as NGINX, or you can use a web server of your choice. First you need to install Alfresco Content Services 6.1 using the distribution zip.See [Installing using distribution zip](https://docs.alfresco.com/6.1/concepts/ch-install.html) for more information.

1.  Log in to the Support Portal at [http://support.alfresco.com](http://support.alfresco.com/).

2.  Go to the **Downloads** area and download `digital-workspace.zip`.

3.  On the server where you want to host the Digital Workspace extract the files to `<webserver-location>/html`.

    **Note:** This is the public html folder.

4.  Browse the extracted files and open `app.config.json` in a text editor.

5.  Edit the `app.config.json` file and change the `ecmHost` property to be the same as your Alfresco Content Services server and allocated port. For example:

    `http://<acsservername>:port`

6.  Change the `baseShareUrl` property to be the server name of the Digital Workspace. For example:

    `http://<appservername>:port`

7.  Save the file.

8.  Open your browser and access the Digital Workspace:

    `http://<appservername>:8080/digital-workspace`


**Note:** When deploying the Digital Workspace to a different web server it is recommended you setup Cross-Origin Resource Sharing \(CORS\). For more information see [Cross Origin Resource Sharing \(CORS\) filters](https://docs.alfresco.com/6.1/tasks/enable-cors.html) and [Cross-Origin Resource Sharing \(CORS\)](https://enable-cors.org/).

**Parent topic:**[Deploying the Digital Workspace](../tasks/deploying.md)

