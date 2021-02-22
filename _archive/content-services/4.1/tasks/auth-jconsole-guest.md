---
author: Alfresco Documentation
source: DITA reference
audience: 
category: Customization
option: JConsole authentication subsystem alfrescoNtlm
---

# Example of disabling the Guest user login page

This section gives an example of how to set the authentication configuration in JConsole to disable the unauthenticated Guest user login using alfrescoNtlm. This example uses JConsole, however you can set the properties using the alfresco-global.properties file.

1.  Run JConsole.

2.  In the Attributes panel, select the **Value** column next to **alfresco.authentication.allowGuestLogin**.

3.  Change the value to **false**.

    This authentication change will be remembered by Alfresco, even if you restart the server. When running Alfresco in a clustered configuration, this edit will be mirrored immediately across all nodes in the cluster.

4.  Check that the new value for the property is persisted to the Alfresco database by checking the output from the shell running the Alfresco server, or the alfresco.log file in the directory from where Alfresco was started. You see the following lines:

    ```
    17:30:03,033 User:System INFO  [management.subsystems.ChildApplicationContextFactory] Stopping 
    'Authentication' subsystem, ID: [Authentication, managed, alfrescoNtlm1]
    17:30:03,064 User:System INFO  [management.subsystems.ChildApplicationContextFactory] Stopped 
    'Authentication' subsystem, ID: [Authentication, managed, alfrescoNtlm1]
    ```

    The subsystem is not started automatically after the edit because, in a more complex scenario, you might want to reconfigure a number of attributes before trying them out on the live server. Once the subsystem starts up again and reads its properties, the new settings take effect.

5.  Log out from Alfresco Explorer.

    After logging out, the log in screen appears immediately, and whenever you access Alfresco, you are always directed to the login page, not the guest access.


For more information on disabling guest login for other subsystems, see the relevant authentication section. For example:

-   Pass-through uses the `passthru.authentication.guestAccess` property \(false by default\)
-   LDAP/AD uses the `ldap.authentication.allowGuestLogin` property \(true by default\)

**Parent topic:**[Authentication chain example with JConsole](../concepts/auth-jconsole-example.md)

**Related information**  


[Other pass-through properties](../concepts/auth-passthru-otherprops.md)

[LDAP configuration properties](../concepts/auth-ldap-props.md)

