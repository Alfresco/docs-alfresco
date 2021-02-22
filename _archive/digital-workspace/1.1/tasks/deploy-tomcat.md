---
author: Alfresco Documentation
source: 
---

# **Installing into Tomcat**

To deploy Alfresco Digital Workspace into Tomcat, you first need to install Alfresco Content Services 6.1 using the distribution zip. See [Installing using distribution zip](https://docs.alfresco.com/6.1/concepts/ch-install.html) for more information.

1.  Log in to the Support Portal at [http://support.alfresco.com](http://support.alfresco.com/).

2.  Go to the **Downloads** area and select Alfresco Digital Workspace.

3.  Download `digital-workspace.war` for the required version.

4.  On the server that will host Alfresco Digital Workspace move the `digital-workspace.war` file to the `<TOMCAT_HOME>/webapps` folder.

    **Note:** Tomcat extracts the files automatically.

5.  Browse the extracted digital-workspace directory and open the `app.config.json` file in a text editor.

6.  Edit the `app.config.json` file and change the `ecmHost` property to be the same as your Alfresco Content Services server and allocated port. For example:

    `http://<acsservername>:port`

7.  Also in the `app.config.json` file, change the baseShareUrl property to be the same as your Alfresco Digital Workspace server and allocated port. For example:

    `http://<appservername>:port/digital-workspace` \(digital-workspace being the name of the war file\)

    **Note:** If Quickshare is disabled in Alfresco Content Services ignore this step. To disable Quickshare set `system.quickshare.enabled=false` in the \\tomcat\\shared\\classes\\alfresco-global.properties file, for more information see [Using the alfresco-global.properties file](https://docs.alfresco.com/6.1/concepts/global-props-intro.html).

8.  Save the file.

9.  Open your browser and access Alfresco Digital Workspace:

    `http://<appservername>:8080/digital-workspace`


**Parent topic:**[Deploying Alfresco Digital Workspace](../tasks/deploying.md)

