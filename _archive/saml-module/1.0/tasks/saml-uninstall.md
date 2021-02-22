---
author: Alfresco Documentation
source: 
---

# Uninstalling SAML SSO

To uninstall the SAML AMP files, use the Module Management Tool \(MMT\).

1.  Stop the Alfresco server.

2.  Use the information in [Uninstalling an AMP file](http://docs.alfresco.com/5.1/tasks/uninstall-amp.html) to uninstall each AMP file.

    For example, from the Alfresco root directory, you need two commands:

    ```
    java -jar bin/alfresco-mmt.jar uninstall alfresco-saml-repo tomcat/webapps/alfresco.war
    java -jar alfresco-mmt.jar uninstall alfresco-saml-share tomcat/webapps/share.war
    
    ```

    Use these commands to check whether the AMP files were removed:

    ```
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war
    ```

3.  Delete the tomcat/webapps/alfresco and tomcat/webapps/share folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4.  Remove any share-config-custom.xml customizations that you added when you installed SAML.

    For example:

    1.  If you are using Alfresco Share as your service provider, and you have custom CSRFPolicy configurations in your installation, remove the *SAML SPECIFIC CONFIG* section, and save.

    2.  Remove the contents of share-config-custom.xml.sample from your share-config-custom.xml file, and save. If there is no other content in your share-config-custom.xml file, you can simply remove the file.

5.  Restart the Alfresco server.


**Parent topic:**[Installing SAML SSO in Alfresco](../concepts/saml-config-overview.md)

