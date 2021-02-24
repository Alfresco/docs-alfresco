---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enabling the IMAP protocol using alfresco-global.properties

The IMAP protocol server is disabled by default. You need to enable the IMAP protocol server to start interaction between the email client and the repository.

1.  Open the alfresco-global.properties file.

2.  Enable the IMAP server by setting the following property to `true`:

    ```
    imap.server.enabled=true
    ```

3.  Set the IMAP server to listen on a specific interface using the following property:

    ```
    imap.server.host=x.x.x.x
    ```

    Where `x.x.x.x` is the IP address \(or corresponding DNS address\) of your external IP interface. Do not use `127.0.0.1` or `localhost`.

    By default, the IMAP server listens on all interfaces on the default IMAP port of 143. You can set this property to use an alternative port number, for example 144.

4.  Restart the Alfresco Content Services server.


Once the server has restarted, the new configuration will take effect. Since the IMAP server has only one instance, make your configuration changes to the <extension root\>alfresco-global.properties file. You can also make your changes to <extension root\>\\alfresco\\extension\\subsystems\\imap\\default\\default for the IMAP subsystem configuration to take precedence.

**Parent topic:**[Configuring the email client with IMAP](../concepts/imap-intro.md)

