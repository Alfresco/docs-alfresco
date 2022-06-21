---
title: Install into Tomcat 
---
To install Alfresco Digital Workspace into Tomcat, you first need to install Alfresco Content Services 7.2 or above using the distribution zip. See [Installing using distribution zip]({% link content-services/latest/install/zip/index.md %}) for more information.

1. Log in to [Hyland Community](https://community.hyland.com/products/alfresco){:target="_blank"}.

2. Go to **Product downloads** and select Alfresco Digital Workspace.

3. Download `alfresco-digital-workspace-adw-x.x.x.war` for the required version.

    `alfresco-digital-workspace-adw-x.x.x.war` is the file name followed by the version of the Digital Workspace, for example `alfresco-digital-workspace-adw-2.1.0.war`.

4. On the server that will host the Digital Workspace move the `alfresco-digital-workspace-adw-x.x.x.war` file to the `<TOMCAT_HOME>/webapps` folder.

   > **Note:** Tomcat extracts the files automatically.

5. Browse the extracted `alfresco-digital-workspace-adw-x.x.x` directory and open the `app.config.json` file in a text editor.

6. Edit the `app.config.json` file and change the `ecmHost` property to be the same as your Alfresco Content Services server and allocated port. For example:

    `http://<acsservername>:port`

7. Also in the `app.config.json` file, change the `baseShareUrl` property to be the same as your Digital Workspace server and allocated port. For example:

    `http://<appservername>:port/alfresco-digital-workspace-adw-x.x.x` (`alfresco-digital-workspace-adw-x.x.x` being the name of the WAR file)

   > **Note:** If Quickshare is disabled in Alfresco Content Services ignore this step.

    To disable Quickshare, set `system.quickshare.enabled=false` in the `\tomcat\shared\classes\alfresco-global.properties` file.

    For more information, see [Using the alfresco-global.properties file]({% link content-services/latest/config/index.md %}#using-alfresco-globalproperties).

8. Save the file.

9. Open your browser and access the Digital Workspace:

    `http://<appservername>:8080/alfresco-digital-workspace-adw-x.x.x`
