---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Kerberos client configuration

This section describes how to configure the Kerberos client authentication.

To make Internet Explorer negotiate Kerberos authentication, rather than NTLM, ensure that:

-   Alfresco web server is in the Local Intranet security zone.

    Check **Tools \> Internet Options \> Security \> Local Intranet**, and then ensure that a pattern matching the protocol and domain name is included, for example, http://server.com or http://\*.company.com \(the IP address does not work\).

-   Automatic log on is enabled.

    Check **Tools \> Internet Options \> Security \> Custom Level**, and then ensure Automatic log on with the current user name and password is selected.


1.  When using Firefox on Windows as your client, you need to add your Alfresco server name to the `network.negotiate-auth.trusted-uris` variable.

    Access the variable from the special URL: `about:config`.

2.  When using Firefox on Linux, you need to add your Alfresco server name to `network.negotiate-auth.trusted-uris` but you will need, in addition, to get a Kerberos ticket using the `kinit` command.

    **Note:** The ticket can correspond to a different user than your Linux user name.

    For example:

    ```
    kinit user1
    ```

    Where `user1` is an Active Directory user. If the client and the server are on the same machine, you will need to go to the `external` interface. The `loopback` interface will not be able to authenticate. You can view your tickets using `klist`.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

