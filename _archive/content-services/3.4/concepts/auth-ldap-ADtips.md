---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: Active Directory
---

# Active Directory tips

This section describes the tips for using Active Directory with the LDAP synchronization.

-   You may need to give special permissions in the Active Directory to the account that you are using to do the LDAP bind \(as configured in ldap.synchronization.java.naming.security.principal\). To do this, open Active Directory Users and Computers, right click on the domain, and select "Delegate Control..." Click "Next", then select the user that you are using for the LDAP bind and click "Next". The permission that they will need is on the next screen "Read all inetOrgPerson information."
-   The example URL in ldap.authentication.java.naming.provider.url does not use SSL. SSL is recommended for production systems. You'll need to switch the port from 389 \(below, non-SSL\) to 636 for SSL.
-   It is often helpful to screen out non-user accounts and disabled accounts. The default user queries in the ldap-ad subsystem type do this by checking bit fields on the userAccountControl attribute. For example:

    ```
    userAccountControl:1.2.840.113556.1.4.803:=512
    ```


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

