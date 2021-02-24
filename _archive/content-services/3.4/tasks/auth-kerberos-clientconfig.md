---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Kerberos client configuration

This section describes how to configure the Kerberos client authentication.

When attempting to view a Microsoft Office document on a Windows machine, you may find that you are prompted for authentication details, even though you are already logged into Alfresco Share. To enable automatic authentication, you should follow the instructions in [http://support.microsoft.com/kb/943280](http://support.microsoft.com/kb/943280) to add the name of the Alfresco Share server to the AuthForwardServerList registry entry.

To make Internet Explorer negotiate Kerberos authentication, rather than NTLM, ensure that:

-   Alfresco web server is in the Local Intranet security zone.

    Check **Tools \> Internet Options \> Security \> Local Intranet**, and then ensure that a pattern matching the protocol and domain name is included, for example, http://server.com or http://\*.company.com \(the IP address does not work\).

-   Automatic log on is enabled.

    Check **Tools \> Internet Options \> Security \> Custom Level**, and then ensure Automatic log on with the current user name and password is selected.


To enable Kerberos authentication in Firefox:

-   Modify the following variables in the about:config special URL:

    ```
    network.negotiate-auth.delegation-uris
    network.negotiate-auth.trusted-uris
    network.negotiate-auth.using-native-gsslib
    ```

    For example:

    ![](../images/auth-kerberos-clientconfig.png)

-   Additionally, on Linux you will need to get a Kerberos ticket using the `kinit` command. The ticket can correspond to a different user than your Linux user name.

    For example:

    ```
    kinit user1 
    ```

    Where `user1` is an Active Directory user. If the client and the server are on the same machine, you will need to go to the `external` interface. The `loopback` interface will not be able to authenticate. You can view your tickets using `klist`.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

