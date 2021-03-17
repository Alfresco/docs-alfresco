---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring Kerberos

The Java Authentication and Authorization Service \(JAAS\) is used within the Kerberos subsystem to support Kerberos authentication of user names and passwords. You can choose to use Kerberos against an Active Directory server in preference to LDAP or NTLM as it provides strong encryption without using SSL. It would still be possible to export user registry information using a chained LDAP subsystem.

Use this information to enable Kerberos with SSO.

If you want to enable Kerberos without SSO, you will be authenticated using LDAP AD and the password will be sent to the LDAP AD in clear text.

This information assumes that your LDAP AD server is active and available and will be used for two reasons in Alfresco.

1.  For importing users - Active Directory is used for importing the users in Alfresco.
2.  For communicating with the Key Distribution Center \(KDC\) - In most cases, KDC runs on the Active Directory server, so it needs to be accessible by Alfresco. When Alfresco receives a Kerberos authentication request, it uses Active Directory to import all the users that you are authenticating against into Alfresco.

Active Directory is not used for LDAP authentication; it is used for Kerberos authentication.

-   **[Enabling Kerberos authentication](../tasks/auth-kerberos-ADconfig.md)**  
Use this information to enable and configure Kerberos authentication in Alfresco Content Services 5.2.7.
-   **[Kerberos configuration properties](../concepts/auth-kerberos-props.md)**  
To enable full Kerberos support in Alfresco Content Services, the CIFS server and the SSO authentication filters each need a Kerberos service ticket.
-   **[Configuring cross-domain support for Kerberos](../tasks/auth-kerberos-cross-domain.md)**  
Use this information to configure Kerberos authentication in a multi-domain environment.
-   **[Debugging Kerberos](../concepts/auth-kerberos-debug.md)**  
If you have configured Share correctly, you should see your user dashboard in Share.

**Parent topic:**[Configuring authentication subsystems](../concepts/auth-config-examples.md)

