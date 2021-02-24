---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# System settings

The System Settings page shows your server settings, the Alfresco web application repository settings, and the Alfresco Share application settings.

1.  Open the Admin Console.

2.  In the General section, click **System Settings**.

    You see the System Settings page showing the details of your Alfresco installation.

3.  Set the Server Settings properties:

    |Server Settings property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Allowed Users**| |This property allows you to specify which users can log in. By default, all users can log in. Enter a comma-separated list of users to allow only those users to log in. If you do not include the administrator user setting up this list \(that is, the current user\), then this will added automatically.|
    |**Maximum Users**|-1|The maximum number of simultaneous users allowed to log in. The default value -1 allows an unlimited number of users.|

4.  Set the Share Application Settings properties:

    |Share Application Settings property|Example setting|What is it?|
    |-----------------------------------|---------------|-----------|
    |**Share Context**|share|This property sets the context path of the Share web application URL. The default is share. You may set this context to a name that is appropriate for your instance of Alfresco.|
    |**Protocol**|http|This property sets the protocol for the Share web application. The default is http. HTTPS support requires additional configuration within the host application server.|
    |**Share Hostname**|127.0.0.1|This property sets the externally resolvable host name of the Share web application URL. The default value is $\{localname\}.|
    |**Port**|8080|This property sets the externally resolvable port number of the Alfresco web application URL. The default is 8080.|
    |**Site Public Group**|GROUP\_EVERYONE|This property is the name of the group that controls user to access Public sites. The default is GROUP\_EVERYONE, which contains all users.|

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: General settings](../concepts/adminconsole-general.md)

