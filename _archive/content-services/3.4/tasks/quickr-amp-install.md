---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: 
option: 
---

# Installing the Lotus Quickr AMP

This section describes how to install and configure the AMP that integrates Lotus Quickr with Alfresco.

To integrate Lotus Quickr with Alfresco, you must have already installed Alfresco Enterprise and Lotus Quickr 8.1.1. To use Quickr Connectors with Alfresco, you must also have the following:

-   Lotus Notes 8.5
-   Microsoft Office 2003 or Microsoft Office 2007
-   Windows XP

1.  Download the alfresco-enterprise-quickr-3.4.14.zip file from the Alfresco Enterprise download area.

2.  Unzip the file.

3.  Stop the Alfresco server.

4.  Copy the alfresco-enterprise-quickr-3.4.14.zip file to the amps directory.

5.  Apply the alfresco-enterprise-quickr-3.4.14.zip file into the alfresco.war file using the Module Management Tool \(MMT\).

    **Note:** Alternatively, for Tomcat, run the `apply_amps` command, which is in the Alfresco /bin directory. This batch file applies all the AMP files that are located in the amps directory.

6.  Start your Alfresco server to deploy the newly installed AMP.

7.  Move and rename the following files:

    1.  <configRoot\>\\classes\\alfresco\\module\\ org.alfresco.module.quickr\\context\\custom-lotus-ws-context.xml.sample to <configRoot\>\\classes\\alfresco\\extension\\custom-lotus-ws-context.xml

    2.  <configRoot\>\\classes\\alfresco\\module\\org.alfresco.module.quickr\\context\\custom-lotus.properties.sample to <configRoot\>\\classes\\alfresco\\extension\\custom-lotus.properties

8.  Open the custom-lotus.properties file, and then edit the following settings:

    |**Setting**|**Description**|
    |-----------|---------------|
    |**`lotus.ws.version`**|Add the version of Quickr Protocol implemented by Alfresco. The default is 8.0.1. You do not need to change this version for the Technical Preview version of Alfresco AMP file.|
    |**`lotus.server.host`**|Add the server host name where Alfresco is installed. For example, `localhost`.|
    |**`lotus.server.port`**|Add the port number for Quickr to talk with Alfresco. For example, the default is 6060.|
    |**`lotus.share.document.url`**|`http://${lotus.server.host}:8080/share/page/site/{0}/document-details?nodeRef={1}`|
    |**`lotus.share.folder.url`**|`http://${lotus.server.host}:8080/share/page/site/{0}/documentlibrary\#path\={1}`|
    |**`lotus.share.site.url`**|`http://${lotus.server.host}:8080/share/page/site/{0}/dashboard`|

9.  Start the Alfresco server.

    Lotus Quickr can now communicate with Alfresco as an ECM server.


Alfresco does not create versions automatically for Quickr content. To ensure that versioning is set for Quickr content, any user can set versioning on individual content items or, as an administrator, create a rule to apply the *Versionable* aspect.

**Parent topic:**[Installing and configuring IBM Lotus Quickr integration](../concepts/quickr-intro.md)

