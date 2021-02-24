---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, SharePoint Protocol, Extensions/Third Party Tools]
keyword: [SharePoint Protocol, Extensions/Third Party Tools]
---

# Configuring SharePoint Protocol Support

This section describes how to configure the SharePoint Protocol Support properties to complete the set up process.

Ensure that you have applied the SharePoint Protocol Support AMP.

The SharePoint Protocol Support functionality uses the properties in the default configuration file called vti.properties in <TOMCAT\_HOME\>/webapps/alfresco/WEB-INF/classes/alfresco/module/org.alfresco.module.vti/context. The properties have a format of `vti.share.*`.

These properties do not need to be changed as they point to specific pages in Share. However, if, for example, you wish to run the repository and Share on different machine, you may need to modify the first three properties \(`vti.server.*`\). Set your custom properties and overrides in the alfresco-global.properties file.

1.  Open the alfresco-global.properties file.

2.  The following table describes the properties that you can add.

    |Property|Description|
    |--------|-----------|
    |`vti.server.port`|This property configures the port on which the SharePoint server listens. This is the port for the vti embedded server. The default port number is 7070. Use this port in File Open/Save windows and for Document Workspace creation.|
    |`vti.server.external.host=${localname}` `vti.server.external.port=${vti.server.port}`|These values are used by Share to generate the **Edit Online** link, which opens the document using the SharePoint module. These parameters are used by `vti-server.get` web script. Share uses this script to determine vti host and port.|
    |`vti.share.siteInBrowser=/page/site/.../dashboard`|If you click the **Open site in browser** link in the **Shared Workspace** panel, the site dashboard will open in a browser. This property generates the browser URL. Dots in this template are replaced with the site `shortname`.|
    |`vti.share.siteSettings=/page/site/.../customise-site`|This property generates the Share URL for **Change Site Settings**.|
    |`vti.share.siteGroupMembership=/page/site/.../site-members`|This property generates the Share URL for the **Site Group Membership** page.|
    |`vti.share.userInformation=/page/user/.../profile`|This property generates the Share URL for the **Edit User Information** page.|
    |`vti.share.documentLibrary=/page/site/.../documentlibrary`|This property is not used.|
    |`vti.share.documentDetails=/page/site/.../document-details`|This property generates the Share URL for the **Modify settings for document version**s page. This link is in the Version History.|
    |`vti.share.calendar=/page/site/.../calendar`|This property is used only for Outlook. The SharePoint Protocol Support module generates the Share URL for Outlook Meeting Workspace and places this link to mail template.|

    **Note:** The value for the context path of the Alfresco repository being used is specified using the sysAdmin subsystem property `alfresco.context`. The default is `alfresco`.

3.  Save the alfresco-global.properties file.

4.  Restart your Alfresco server.


The Microsoft SharePoint Protocol Support functionality is installed and configured.

**Parent topic:**[Installing and configuring Microsoft Office SharePoint Protocol Support](../concepts/SharePoint-intro.md)

**Related information**  


[sysAdmin subsystem properties](../concepts/sysadmin-subsystem-props.md)

