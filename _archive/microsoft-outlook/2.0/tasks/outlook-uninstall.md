---
author: Alfresco Documentation
source: 
audience: 
---

# Uninstalling Alfresco Outlook Integration

To uninstall the Alfresco Outlook files, use the Module Management Tool \(MMT\).

**Note:** To completely remove Outlook Integration, you must uninstall the Outlook package from Alfresco as well as from Microsoft Outlook on all Windows clients. This information provides uninstall directions for the Alfresco One modules.

**Note:** To uninstall the Outlook Client from your Windows clients, use the standard Programs \> Uninstall Program feature in Windows. Look for Alfresco Outlook Client and uninstall it.

1.  Stop the Alfresco server.

2.  Use the information in [Uninstalling an AMP file](http://docs.alfresco.com/5.1/tasks/uninstall-amp.html) to uninstall each AMP file.

    For example, from the Alfresco root directory, you need three commands:

    ```
    java -jar bin/alfresco-mmt.jar uninstall com.westernacher.wps.WpsAlfrescoUtilsRepository tomcat/webapps/alfresco.war
    java -jar alfresco-mmt.jar uninstall com.westernacher.wps.WpsAlfrescoMailIntegrationRepository tomcat/webapps/alfresco.war
    java -jar alfresco-mmt.jar uninstall com.westernacher.wps.AlfrescoMailIntegrationShare tomcat/webapps/share.war
    
    ```

    Use these commands to check whether the AMP files were removed:

    ```
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war
    ```

3.  Delete the tomcat/webapps/alfresco and tomcat/webapps/share folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4.  Restart the Alfresco server.


**Parent topic:**[Installing Alfresco Outlook Integration](../tasks/Outlook-amp_v2.md)

