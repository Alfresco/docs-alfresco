---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Enabling Smart Folders

As an admin user, you must enable Smart Folders, and specify a Smart Folder Template for use.

A predefined template is available by selecting the System Smart Folder aspect. You can add other customized templates, and if they are uploaded to Repository/Data Dictionary/Smart Folder Templates, they are then available by selecting the System Smart Folder aspect. If you store templates anywhere else in your repository, you can use them by selecting the Custom Smart Folder aspect.

1.  Stop Alfresco Content Services, and edit your <tomcat\>/shared/classes/alfresco-global.properties file to enable Smart Folders:

    ```
    smart.folders.enabled=true
    ```

    Advanced Smart Folders settings are provided in the <tomcat\>/shared/classes/alfresco-global.properties.sample file.

2.  Restart Alfresco Content Services.

3.  If you are using the default Smart Folder template, you are ready to go. If you want to check the template, or upload your own template, follow step 4.

4.  In Alfresco Content Services, go to the Repository/Data Dictionary/Smart Folder Templates directory.

    The default Smart Folders Template is visible: `smartFoldersExample.json`. You can upload your own template here, and can see any other templates that you have already added.

    If you use your own template, make sure that you change the type to Smart Folder Template. See [Applying multiple templates](sf-tutorial-multi.md) for more information.

    If you store templates anywhere else in your repository, navigate to the template and select it. You can use them later by selecting the Custom Smart Folder aspect.

    There is no need to restart Alfresco Content Services. When you edit properties on nodes that have the Custom Smart Folder aspect applied, the new Smart Folder is included in the Smart Folder Template menu. See [Applying a Smart Folder Template](sf-using-aspects.md) for more information.

    If you need to customize the template, see [Applying a Smart Folder Template](sf-using-aspects.md) for information on the sample file structure, and [Smart Folder Template syntax](../concepts/sf-ref-template-guidance.md) for guidance on the Smart Folder Template JSON format.


**Parent topic:**[Configuring Smart Folders](../concepts/sf-intro.md)

