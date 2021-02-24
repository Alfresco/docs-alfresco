---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# sysAdmin subsystem properties

The following properties can be configured for the sysAdmin subsystem.

-   **server.maxusers**

    The maximum number of users who are allowed to log in or -1 if there is no limit.

-   **server.allowedusers**

    A comma-separated list of users who are allowed to log in. Leave empty if all users are allowed to log in.

-   **server.allowWrite**

    A Boolean property that when true indicates that the repository will allow write operations \(provided that the license is valid\). Set this property to false to put the repository in to read-only mode.


The following properties specify the parameters that control how Alfresco Content Services generates URLs to the repository and Alfresco Share. These parameters might need to be edited from their default values to allow the URLs to be resolved by an external computer.

-   **alfresco.context**

    Specifies the context path of the repository web application. The default is `alfresco`.

-   **alfresco.host**

    Specifies the externally resolvable host name of the web application. The default value is `${localname}`. If this is used for the value of this property, the token `${localname}` will be automatically replaced by the domain name of the repository server.

-   **alfresco.port**

    Specifies the externally resolvable port number of the web application URL. The default is `8080`.

-   **alfresco.protocol**

    Specifies the protocol component of the web application. The default is `http`.

-   **share.context**

    Specifies context path component of the Alfresco Share web application URL The default is `share`.

-   **share.host**

    Specifies the externally resolvable host name of the Alfresco Share web application URL. The default value is `${localname}`.

-   **share.port**

    Specifies the externally resolvable port number of the Alfresco Share web application URL. The default is `8080`.

-   **share.protocol**

    Specifies the protocol to use. The default is `http`.


**Parent topic:**[Configuring server administration properties](../concepts/sysadmin-subsystem-intro.md)

