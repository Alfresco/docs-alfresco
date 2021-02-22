---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: IMAP protocol enable
---

# Enabling the IMAP Protocol

The IMAP protocol server is disabled by default. You need to enable the IMAP protocol server to start interaction between the email client and the Alfresco repository.

1.  Open the alfresco-global.properties file.

2.  Add the following sample configuration entries:

    ```
    imap.server.enabled=true
    imap.server.port=143
    imap.server.host=x.x.x.x
    ```

    **Note:** Where x.x.x.x value is the IP address \(or corresponding DNS address\) of your external IP interface. Do not use localhost as the imap.server.host.

3.  Restart your Alfresco server.


Once the Alfresco server has restarted, the new configuration will take effect. Since the IMAP server has only one instance, make your configuration changes to the alfresco-global.properties file. You can also create a file called <extension\>\\subsystems\\imap\\default\\default\\imap-server.properties and add your changes for the IMAP subsystem configuration.

**Parent topic:**[Configuring IMAP Protocol support](../concepts/imap-intro.md)

