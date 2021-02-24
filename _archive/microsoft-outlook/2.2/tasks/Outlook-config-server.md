---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring connection settings in Outlook

Configure Microsoft Outlook to find and connect to the correct Alfresco server.

1.  Select Configure \> Connection from the Alfresco Client tab in Microsoft Outlook.

2.  In Server URL, type the address of the Alfresco server that you want to connect to.

    Type only the information before /share. For example, `https://IP address` or `server name`:`port number`.

3.  In Alfresco Repository path, type the name of the Alfresco repository.

    **Tip:** This is often alfresco.

4.  In Alfresco Share path, type the name of the Alfresco Share instance.

    **Tip:** This is often share.

    Alternatively, specify an alternative Share URL in the Alternative Share URL field, if Alfresco and Share are running on different servers.

5.  Select either Windows authentication or Standard authentication.

    If you select standard authentication, enter your Alfresco user name and password. If you select Windows authentication, the `passthru` authentication is used. For more information about authentication subsystem types, see [Authentication subsystem types](http://docs.alfresco.com/5.1/concepts/auth-subsystem-types.html).

    **Note:** By default, SAML authentication is not enabled. Use the Client Settings XML file to enable SAML authentication, and a SAML authentication radio button is displayed in this panel. See [Setting SAML in AlfrescoClientSettings](Outlook-config-xml.md#saml) for more information.

6.  Click **Check connection** to test the connection to the Alfresco server.


**Parent topic:**[Configuring Outlook settings in Alfresco and Microsoft Outlook](../concepts/Outlook-config-intro_v2.md)

