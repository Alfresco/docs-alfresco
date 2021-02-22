---
author: Alfresco Documentation
source: 
audience: 
category: [Installation, Administration]
---

# Configuring connection settings in Outlook

Configure Microsoft Outlook to find and connect to the correct Alfresco server.

1.  Select Configure \> Connection from the Alfresco Client tab in Microsoft Outlook.

2.  In the Server URL field, type the address of the Alfresco server that you want to connect to.

    Type only the information before /share. For example, `https://IP address` or `server name`:`port number`

3.  In the Alfresco Repository path field, type the name of the Alfresco repository.

    **Tip:** This is often alfresco.

4.  In the Alfresco Share path field, type the name of the Alfresco Share instance.

    **Tip:** This is often share.

    Alternatively, specify an alternative Share URL in the Alternative Share URL field, if Alfresco and Share are not sharing a server.

5.  Select either Windows authentication or Standard authentication.

    If you select standard authentication, enter your Alfresco user name and password. If you select Windows authentication, the `passthru` authentication is used. For more information about authentication subsystem types, see [Authentication subsystem types](http://docs.alfresco.com/5.1/concepts/auth-subsystem-types.html).

6.  Click **Check connection** to test the connection to the Alfresco server.


Microsoft Outlook now points to the Alfresco server repository.

**Parent topic:**[Configuring Alfresco Outlook Integration in Alfresco Share and in Microsoft Outlook](../concepts/Outlook-config-intro.md)

