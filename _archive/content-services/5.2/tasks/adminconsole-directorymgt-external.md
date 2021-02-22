---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring external authentication

Use these instructions to configure external authentication using the configuration properties in the Admin Console.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  In the Authentication Chain section, if no element of type **External** exists in the authentication chain list, follow the steps below to add a new External type element:

    1.  Specify a name in the Name text box.

    2.  Set type to External.

    3.  Click **Add**.

    4.  Click Save to add the new External type element in the authentication chain list.

4.  In the Authentication Chain section, under **Actions**, click **Edit** corresponding to the External directory.

    **Note:** You can only edit a directory after it has been added and saved. If you have not yet saved the entry, the only option available is Remove.

    You see the Edit External Directory page.

5.  Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Authentication Enabled**|Yes|This enables the external directory user authentication. When enabled, Alfresco Content Services accepts external authentication tokens; ensure that no untrusted direct access to Alfresco's HTTP or AJP ports is allowed.|
    |**Proxy Username**|alfresco-system|This specifies the remote user that is considered as the proxy user. **Note:** The default setting for `external.authentication.proxyUserName` is `alfresco-system`. This should only be specified if you are using SSL. See [External authentication and SSO](../concepts/auth-basics.md) for more information.

|
    |**Administrator User Names**|-|This specifies a comma separated list of user names to be considered administrators by default.|
    |**Proxy Header**|X-Alfresco-Remote-User|This specifies the HTTP header that carries the name of a proxied user. The default is X-Alfresco-Remote-User.|
    |**User ID Pattern**|-|This specifies an optional regular expression used to extract a user ID from the HTTP header. The portion of the header matched by the first bracketed group in the regular expression becomes the user name. If not set, the entire header contents are assumed to be the proxied user name.|

6.  Click **Save** to apply the changes you have made to the External authentication directory.

    If you do not want to save the changes, click **Close**.


**Parent topic:**[Managing authentication directories using Admin Console](../concepts/adminconsole-directorymgt-cp.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

