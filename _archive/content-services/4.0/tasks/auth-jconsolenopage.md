---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
option: JConsole authentication subsystem login page
---

# Removing the login page

This section describes how to set the authentication in JConsole not to display the login page.

1.  Login to Alfresco Explorer using the Administration user \(`admin`\).

2.  Click **Admin Console**.

3.  Create a users whose user name and password matches those of your operating system account.

4.  Run JConsole.

5.  Navigate to **Alfresco \> Configuration \> Authentication \> managed \> alfrescoNtlm1 \> Attributes**.

6.  In the Attributes panel, select the **Value** column next to **ntlm.authentication.sso.enabled** attribute.

7.  Change the value to **true**.

8.  Navigate to **Alfresco \> Configuration \> Authentication \> managed \> alfrescoNtlm1 \> Operations**.

9.  Click the **Start** operation.

10. Close and restart your browser and try accessing Alfresco.

    If your browser supports NTLM and its security settings allow, it will automatically log you in using your operating system account name.


**Parent topic:**[Authentication chain example with JConsole](../concepts/auth-jconsole-example.md)

