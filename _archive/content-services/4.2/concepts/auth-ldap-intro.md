---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, LDAP, authentication]
---

# Configuring LDAP

An LDAP subsystem supports two main functions:

-   user authentication - checking a user's ID and password using an LDAP bind operation
-   user registry export - exposing information about users and groups to the synchronization subsystem

Either of these functions can be used in isolation or in combination. When LDAP authentication is used without user registry export, default Alfresco person objects are created automatically for all those users who successfully log in. However, they will not be populated with attributes without user registry export enabled. LDAP user registry export is most likely to be used without LDAP authentication when chained with other authentication subsystems. For example, Kerberos against Active Directory, pass-through against ActiveDirectory, and possibly Samba on top of OpenLDAP.

The user registry export function assumes that groups are stored in LDAP as an object that has a repeating attribute, which defines the distinguished names of other groups, or users. This is supported in the standard LDAP schema using the `groupOfNames` type. See the example LDIF file in [OpenLDAP tips](auth-ldap-openldaptips.md).

-   **[LDAP configuration properties](../concepts/auth-ldap-props.md)**  
Both the `ldap` and `ldap-ad` subsystem types support the following configurable properties.
-   **[Checking the supported SASL authentication mechanisms](../tasks/auth-ldap-sasl.md)**  
This section describes how to check for which Simple Authentication and Security Layer \(SASL\) authentication mechanisms are supported.
-   **[Example: authentication and synchronization with one ldap-ad subsystem](../tasks/auth-example-oneldap-ad.md)**  
This example addresses the more advanced goal of delegating authentication responsibility to a centralized directory server. Most organizations maintain their user database in a directory server supporting the LDAP protocol, such as Active Directory or OpenLDAP.
-   **[Example: authentication and synchronization with two ldap-ad subsystems](../tasks/auth-example-twoldap-ad.md)**  
This example uses one Active Directory server and shows authentication as well as user registry export \(synchronization\) from two ldap-ad subsystems.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

**Related information**  


[OpenLDAP tips](auth-ldap-openldaptips.md)

[Active Directory tips](auth-ldap-ADtips.md)

