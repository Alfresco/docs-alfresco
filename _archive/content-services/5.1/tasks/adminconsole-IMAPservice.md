---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enabling the IMAP Service using the Admin Console

The IMAP server allows email applications that support IMAP to connect to and interact with Alfresco repositories directly from the mail client. You ca use IMAP Service in the Admin Console to configure IMAP, instead of editing your alfresco-global.properties file.

1.  Open the Admin Console.

2.  In the Virtual File Systems section, click **IMAP Service**.

    You see the IMAP Service page.

3.  Set the IMAP Service properties:

    |IMAP Service property|Example setting|What is it?|
    |---------------------|---------------|-----------|
    |**IMAP Server Enabled**|No|This enables or disables the IMAP server.|
    |**Hostname**|0.0.0.0|This specifies the host or IP address to which the IMAP service will bind.|
    |**Mail TO Default**|alfresco@demo.alfresco.org|This specifies the default TO field that will be used when the TO field is not available, for example, when displaying documents.|
    |**Mail FROM Default**|alfresco@demo.alfresco.org|This specifies the default FROM field that will be used when the FROM field is not available, for example, when displaying documents.|

4.  Set the IMAP Protocol properties:

    |IMAP Protocol property|Example setting|What is it?|
    |----------------------|---------------|-----------|
    |**Enable IMAP**|Yes|This enables or disables the IMAP service.|
    |**Port**|143|This specifies the port number on which this service will listen. This is usually 143 but can be changed to an alternative number.|

5.  Set the IMAPS Protocol properties:

    |IMAPS Protocol property|Example setting|What is it?|
    |-----------------------|---------------|-----------|
    |**Enable IMAP**|Yes|This enables or disables the IMAPS service.|
    |**Port**|993|This specifies the port number on which this service will listen. This is usually 993 but can be changed to an alternative number.|

6.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Configuring the email client with IMAP](../concepts/imap-intro.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

