# LDAP settings in Alfresco Content Services

You must set up LDAP in Alfresco Content Services.

Detailed instructions are available in [http://docs.alfresco.com/5.2/concepts/auth-ldap-intro.html](http://docs.alfresco.com/5.2/concepts/auth-ldap-intro.html)

For a working example of an LDAP subsystem, check the LDAP demo provided in the activiti-share-connector.zip. The demo amp file contains sample LDAP configuration files for getting Alfresco Content Services setup up with an LDAP \(it contains no Share Connector files\) configuration.

For example:

1.  Unzip the activiti.alfresco.repo-demo-ldap-X.X.X.amp file by renaming it from *.amp* to .zip. You'll see some files marked with ACTIVITI SHARE CONNECTOR DEMO in the ldap-authentication.properties file.
2.  Configure the ldap-authentication.properties file to match your LDAP settings, and then zip the files again and rename it back to .amp before dropping into the amps folder.

**Note:** When zipping the files, follow the same structure as the original .amp file and make sure that no new root folders are introduced to the new .zip file.

**Parent topic:**[Alfresco Content Services configuration](../topics/content_services_config.md)

