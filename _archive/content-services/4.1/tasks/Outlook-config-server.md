---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration]
---

# Configuring connection settings in Outlook

Configure Microsoft Outlook to find and connect to the correct Alfresco server.

1.  Select Configure from the Alfresco Client tab in Microsoft Outlook to open the configuration screen.

    The Configure Alfresco Outlook Client screen is displayed with tabs for Connection, Email Archiving, Extended, Configuration, and License.

2.  Select the Connection tab.

3.  In the Server URL field, type the address of the Alfresco server that you want to connect to.

    Type only the information before /share. For example, https://IP address or server name:port number

4.  In the Alfresco Repository path field, type the name of the Alfresco repository.

    **Tip:** This is often alfresco.

5.  In the Alfresco Share path field, type the name of the Alfresco Share instance.

    **Tip:** This is often share.

    Alternatively, specify an alternative Share URL in the Alternative Share URL field, if Alfresco and Share are not sharing a server.

6.  Select either Standard authentication or Windows authentication.

    If you select standard authentication, enter your Alfresco user name and password. If you select Windows authentication, NTLM authentication is used.

7.  Click **Check connection** to test the connection to the Alfresco server.


Microsoft Outlook now points to the Alfresco server repository.

**Parent topic:**[Configuring Alfresco Outlook Integration in Alfresco Share and in Microsoft Outlook](../concepts/Outlook-config-intro.md)

