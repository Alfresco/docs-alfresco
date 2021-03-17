---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco
option: [email, outbound]
---

# Managing outbound emails

This section describes how to set the options for outbound emails. You need to set these properties to activate sending and receiving site invites, and also for receiving activity notification emails.

1.  Open the Admin Console, and then click **Email \(Outbound\)**.

2.  On the Email \(Outbound\) page, click **Edit**.

    You see the Edit: Email \(Outbound\) page.

3.  Set the general outbound email properties:

    |General property|Example setting|What is it?|
    |----------------|---------------|-----------|
    |**Host**|smtp.example.com|This is the host name for the outbound email server.|
    |**Port**|25|This is the port number of the outbound email server.|
    |**Protocol**|smtp|This is the protocol that the email server uses.|
    |**Encoding**|UTF-8|This default encoding for outbound emails.|
    |**Sender Address**| |This is the email address of the user account that sends the outbound emails.|

4.  Set the properties for email authentication:

    |Authentication email property|Example setting|What is it?|
    |-----------------------------|---------------|-----------|
    |**Authentication required**|No|This enables or disables authentication for emails.|
    |**Username**|anonymous|This is user name that will be used for authentication when accessing outbound emails.|
    |**Password**| |This is password that will be used for authentication when accessing outbound emails.|

5.  Set the properties for the test email:

    You can

    |Test email property|Example setting|What is it?|
    |-------------------|---------------|-----------|
    |**Send test message at startup**|enabled|This activates the email test message.|
    |**To**| |This is the email address where the test message is sent.|
    |**Subject**|Outbound SMTP|This is the subject title of the test email.|
    |**Message**|The Outbound SMPT email subsystem is working.|This is the body text of the test email.|

6.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

