---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, pass-through, passthru, authentication]
---

# Domain level properties

The following properties control the set of domain controllers used for authentication. The three properties are mutually exclusive. For example, to set the `passthru.authentication.servers` property, set `passthru.authentication.domain` to be empty and `passthru.authentication.useLocalServer` to be false.

-   **passthru.authentication.useLocalServer**

    A Boolean that when true indicates that the local server should be used for pass through authentication by using loopback connections into the server.

-   **passthru.authentication.domain**

    Sets the domain to use for pass through authentication. This will attempt to find the domain controllers using a network broadcast. Make sure that you use the Windows NetBIOS domain name, not the forest name. The network broadcast does not work in all network configurations. In this case use the `passthru.authentication.servers` property to specify the domain controller list by name or address.

-   **passthru.authentication.servers**

    A comma delimited list of server names or addresses that are used for authentication. The pass through authenticator will load balance amongst the available servers, and can monitor server online/offline status.

    -   Each server name/address may be prefixed with a domain name using the format `<domain>\<server>`. If specifying this in alfresco-global.properties, remember that the backslash character must be escaped. For example

        ```
        passthru.authentication.servers=DOMAIN1\\host1.com,DOMAIN2\\host2.com,host1.com
        ```

    -   If the client specifies a domain name in its login request, then the appropriate server will be used for the authentication. Domain mappings may also be specified to route authentication requests to the appropriate server.
    -   If a server handles authentication for multiple domains then multiple entries can be added in the server list prefixed with each domain name.
    -   There must be at least one entry in the server list that does not have a domain prefix. This is the catch all entry that will be used if the client domain cannot be determined from the NTLM request or using domain mapping.

**Parent topic:**[Configuring pass-through](../concepts/auth-passthru-intro.md)

