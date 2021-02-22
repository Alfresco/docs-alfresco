---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library]
---

# Share Document Library

The Share repository document library is a feature that gives full access to the Alfresco repository.

The default content structure for Alfresco Share is based on sites, and this does not give full visibility of the content in the repository. By enabling the repository document library configuration setting, you have access to multiple navigation options, for example, folders and categories, tags, and filters. This feature also allows you to recreate and edit text files, for example, within the Data Dictionary.

It is possible to copy or move files to the Share document library without any repository permissions.

The document library is accessed in Share through the **Repository**, **My Files**, and **Shared Files** links in the header, and through the **Document Library** link in a site. These all kind different views of the complete content repository.

-   **[Configuring the Repository link](../tasks/share-repodoclib-config.md)**  
It is possible to control the visibility of the Repository link in Share through configuration. Note the Repository link is always visible to Administrators.
-   **[Configuring aspects](../tasks/share-repodoclib-aspects.md)**  
Aspects can be configured in the file ./tomcat/webapps/share/WEB-INF/classes/alfresco/share-documentlibrary-config.xml.
-   **[Extending the Alfresco Share Document Library](../concepts/Share-Doclib-Extend-Intro.md)**  
Alfresco offers a number of extension points for the document library. 

**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

