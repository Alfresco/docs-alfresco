---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring Kerberos

Use these instructions to configure Kerberos using the configuration properties in the Admin Console.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  In the Authentication Chain section, under **Actions**, click **Edit** corresponding to the Kerberos directory.

    **Note:** You can only edit a directory after it has been added and saved. If you have not yet saved the entry, the only option available is Remove.

    You see the Edit Kerberos Directory page.

4.  Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**User Config Entry Name**|Alfresco|This specifies the entry in the JAAS configuration file that should be used for password-based authentication. The recommended default value is Alfresco.|
    |**Administrator User Names**|-|This specifies a comma separated list of user names to be considered administrators by default.|
    |**CIFS Config Entry Name**|AlfrescoCIFS|This specifies an entry in the JAAS configuration file that should be used for CIFS authentication. The recommended default value is AlfrescoCIFS.|
    |**Kerberos Authentication Realm**|ALFRESCO.ORG|This specifies the Kerberos realm used for authentication. The realm should be the domain in upper case. For example, if the domain is 'alfresco.org', then the realm should be ALFRESCO.ORG.|
    |**CIFS Password**|secret|This specifies the password for the CIFS Kerberos principal. Click **Show Password** to reveal the password. Click **Hide Password** to hide the password.|
    |**HTTP Config Entry Name**|AlfrescoHTTP|This specifies the entry in the JAAS configuration file used for web-based SSO. The recommended default value is AlfrescoHTTP.|
    |**Strip Username Suffix**|Yes|This specifies that the @domain suffix is stripped from Kerberos authenticated user names in CIFS, SPP, WebDAV, and the Web Client. If not selected, multi-domain users can use the @domain suffix.|
    |**HTTP Password**|secret|This specifies the password for the HTTP Kerberos principal. Click **Show Password** to reveal the password. Click **Hide Password** to hide the password.|
    |**Authenticate FTP**|Yes|This enables authentication for FTP access.|

5.  Click **Save** to apply the changes you have made to the Kerberos directory.

    If you do not want to save the changes, click **Close**.


**Parent topic:**[Managing authentication directories using Admin Console](../concepts/adminconsole-directorymgt-cp.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

[Configuring Kerberos using Admin Console](../concepts/auth-kerberos-props.md)

