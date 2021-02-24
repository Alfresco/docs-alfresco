---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Configuring the Standalone Document Transformation Server

Use this information to configure the Standalone Document Transformation Server. You need only to change the password of the transformation service.

1.  Open your browser and navigate to the following URL:

    http://<transformation-host\>:<port\>/transformation-server/settings

    or https:// if you are using SSL

2.  Enter your login name and a password.

    By default, the login name is set to `alfresco`, and the password is set to `alfresco`. The login name `alfresco` cannot be changed.

3.  Enter a new password, and then click **Change** to save the password.

4.  To set up SSL with Transformation Server, update or replace the keystore in the default location: C:\\Program Files \(x86\)\\TransformationServer\\tomcat\\conf\\.keystore, using the method described here: [Configuring SSL for a test environment](configure-ssl-test.md).

    See [Managing Alfresco keystores](../concepts/alf-keystores.md) for information about keystores.


If you close and reopen your browser, re-enter your login and new password.

**Parent topic:**[Configuring the Document Transformation Server](../concepts/transerv-config.md)

