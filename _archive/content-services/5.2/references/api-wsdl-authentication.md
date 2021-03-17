---
author: Alfresco Documentation
---

# authentication

The `authentication` element specifies the level of authentication required to run the web script. The `authentication` element is optional.

The `authentication` element can have the following values:

-   **`none`**

    Specifies that no authentication is required to run the web script. This is the default value if the authentication level is not explicitly specified.

-   **`guest`**

    Specifies that at least guest level access is required to run the web script.

-   **`user`**

    Specifies that at least a user account is required to run the web script.

-   **`admin`**

    Specifies that at least an adminstrator account is required to run the web script.


The `authentication` element also has the following attributes:

-   **`runas` \(optional\)**

    The `runas` attribute allows a web script developer to state that the execution of a web script must run as a particular repository user, regardless of who initiated the web script.

    This is useful where the behavior of the web script requires specific permissions to succeed. Due to security concerns, the `runas` attribute is only available for web script implementations placed into the Java classpath.


`authentication` example.

The user to run as is specified through the `runas` attribute of the `<authentication>` element of the web script descriptor. For example:

```
<webscript>
  <shortname>Example Run As Usage</shortname>
  <url>/runas</url>
  **<authentication runas="admin"\>user</authentication\>**
</webscript>
```

Here, the web script still requires a user to authenticate before execution; however, the web script executes as the `admin` user. Repository features, such as auditing, still reflect the user who initiated the web script.

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

