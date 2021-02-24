---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring OpenLDAP and Oracle Directory Server

Use these instructions to configure OpenLDAP or Oracle Directory Server using the configuration properties in the Admin Console.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  In the Authentication Chain section, under **Actions**, click **Edit** corresponding to the OpenLDAP or Oracle Directory Server directory.

    **Note:** You can only edit a directory after it has been added and saved. If you have not yet saved the entry, the only option available is Remove.

    You see the Edit LDAP Directory page.

4.  Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Authentication Enabled**|Yes|This specifies that the directory will be used to authenticate users.|
    |**User Name Format**|-|This specifies how to map the user identifier entered by the user to that passed through to LDAP.|
    |**LDAP Server URL**|ldap://ldap.domain.com:389|This specifies the URL of your LDAP server, containing its name and port. The standard ports for LDAP are 389 \(and 636 for SSL\)|
    |**Security**|simple|This specifies the mechanism used authenticate with the LDAP server. It should be one of the standard values provided here or one of the values supported by the LDAP provider. See [LDAP configuration properties](../concepts/auth-ldap-props.md) for more information.|
    |**Default Administrator User Names**|-|This specifies a comma separated list of user names to be considered administrators by default. If you are using LDAP for all your users, this maps an LDAP user to be an administrator user.|
    |**Synchronization Enabled**|Yes|This enables user and group synchronization. It may be that this connection should only be used for authentication, in which case this flag should be set to false.|
    |**Security Principal Name**|cn=Manager,dc=company,dc=com|This specifies the LDAP user to connect for the export operation, if one is required by the `ldap.synchronization.java.naming.security.authentication` authentication mechanism. This should be in the same format as `ldap.authentication.userNameFormat` but with a real user ID instead of `%s`.|
    |**Security**|simple|This specifies the mechanism to use to authenticate with the LDAP Synchronization server. It should be one of the standard values provided here or one of the values supported by the LDAP provider. See [LDAP configuration properties](../concepts/auth-ldap-props.md) for more information.|
    |**Group query**|\(objectclass=groupOfNames\)|This specifies the query to select all objects that represent the groups to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours. The default is `(objectclass=groupOfNames)`.|
    |**Security Principal Credentials**|secret|This specifies the password for the default principal \(only used for LDAP sync\). Click **Show Password** to reveal the password. Click **Hide Password** to hide the password.|
    |**User Search Base**|ou=People,dc=company,dc=com|This specifies the DN below which to run the user queries.|
    |**Group Search Base**|ou=Groups,dc=company,dc=com|This specifies the DN below which to run the group queries.|
    |**Person Differential Query**|\(&\(objectclass=inetOrgPerson\)\(!\(modifyTimestamp<=\{0\}\)\)\)|This specifies the query to select the objects that represent the users to export that have changed since a certain time. It should use the placeholder \{0\} in place of a timestamp in the format specified by `ldap.synchronization.timestampFormat`. This query is used in differential synchronization mode, which by default is triggered whenever a user, that does not yet exist in Alfresco, is successfully authenticated.|
    |**Person Query**|\(objectclass=inetOrgPerson\)|This specifies the query to select all objects that represent the users to export. This query is used in full synchronization mode, which by default is scheduled every 24 hours.|

    **Note:** The Edit LDAP Directory page also displays certain advanced LDAP synchronization properties. It is recommended that you do not change these settings.

5.  Click **Save** to apply the changes you have made to the OpenLDAP or Oracle Directory Server directory.

    If you do not want to save the changes, click **Close**.


**Parent topic:**[Managing authentication directories](../concepts/adminconsole-directorymgt-cp.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

