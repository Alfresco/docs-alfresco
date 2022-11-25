---
title: Install into other webserver
---
You can deploy Alfresco Digital Workspace into a different web server than where Alfresco Content Services is running. You can use another instance of Tomcat, a lightweight web server such as NGINX, or you can use a web server of your choice. First you need to install Alfresco Content Services 7.2 or above using the distribution zip. See [Installing using distribution zip]({% link content-services/latest/install/zip/index.md %}) for more information.

1. Log in to [Hyland Community](https://community.hyland.com/products/alfresco){:target="_blank"}.

2. Go to **Product downloads** and select Alfresco Digital Workspace.

3. Download `alfresco-digital-workspace-adw-x.x.x.zip` for the required version.

   `alfresco-digital-workspace-adw-x.x.x.zip` is the file name followed by the version of the Digital Workspace, for example `alfresco-digital-workspace-adw-2.1.0.zip`.

4. On the server where you want to host the Digital Workspace extract the files to `<webserver-location>/html`.

   > **Note:** This is the public html folder.

5. Browse the extracted files and open `app.config.json` in a text editor.

6. Edit the `app.config.json` file and change the `ecmHost` property to be the same as your Alfresco Content Services server and allocated port. For example:

    `http://<acsservername>:port`

7. Also in the `app.config.json` file, change the `baseShareUrl` property to be the server name of the Digital Workspace. For example:

      `http://<appservername>:port/alfresco-digital-workspace-adw-x.x.x` (`alfresco-digital-workspace-adw-x.x.x` being the name of the zip file)

   > **Note:** If Quickshare is disabled in Alfresco Content Services ignore this step.

    To disable Quickshare, set `system.quickshare.enabled=false` in the \tomcat\shared\classes\alfresco-global.properties file. For more information, see [Using the alfresco-global.properties file]({% link content-services/latest/config/index.md %}#using-alfresco-globalproperties).

8. Save the file.

9. Open your browser and access the Digital Workspace:

    `http://<appservername>:8080/alfresco-digital-workspace-adw-x.x.x`

> **Note:** When deploying Alfresco Digital Workspace to a different web server, it is recommended you setup Cross-Origin Resource Sharing (CORS). For more information, see [Cross Origin Resource Sharing (CORS) filters]({% link content-services/latest/config/repository.md %}#cors-configuration) and [Cross-Origin Resource Sharing (CORS)](https://enable-cors.org/){:target="_blank"}.
