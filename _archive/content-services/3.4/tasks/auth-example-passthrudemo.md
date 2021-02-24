---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, pass-through, passthru, authentication]
---

# Applying the Pass-through example

Restart the Alfresco server.

The main differences to notice are:

-   All Active Directory users can point their browser to the Alfresco server and be signed on automatically. \(In Internet Explorer, this requires adding the Alfresco server to the Local Intranet security zone.\)
-   All Active Directory users can access Alfresco as a CIFS file system using their Active Directory credentials.

**Note:** When attempting to view a Microsoft Office document on a Windows machine, you may find that you are prompted for authentication details, even though you are already logged into Alfresco Share. To enable automatic authentication, you should follow the instructions in [http://support.microsoft.com/kb/943280](http://support.microsoft.com/kb/943280) to add the name of the Alfresco Share server to the AuthForwardServerList registry entry.

**Parent topic:**[Example: customizing the pass-through subsystem](../tasks/auth-example-passthu.md)

