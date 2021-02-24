---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Modifying the global properties file

Use this information when modifying the alfresco-global.properties file.

**Important:** For edits to the alfresco-global.properties file, when specifying paths for Windows systems, you must replace the Windows path separator characters with either the \\\\ separator or the forward slash / Unix path separator.

The alfresco-global.properties file is created when you install Alfresco Content Services with the setup wizards, and it logs many of the settings that you specify in the process. You can then use this file to add further property settings. If you are installing manually, then you can use the alfresco-global.properties.sample file. The .sample file contains some of the common properties required for setting up Alfresco Content Services.

1.  Locate and open the alfresco-global.properties.sample file.

    For example, for Tomcat, browse to the $TOMCAT\_HOME/shared/classes/ directory.

    This file contains sample configuration settings. To enable or modify a setting, remove the comment \(\#\) character. Comment out all the properties you do not want to modify by adding the “\#” character.

2.  Ensure that the `dir.root=` property points to a root location for the storage of content binaries and index files.

    For example, `dir.root=/var/data/alfresco/alf_data`.

    **Note:** It is strongly recommended that you always set this value to an absolute file system path as shown above. This ensures that no matter how the instance is started, it will always find the directories where content has previously been written.

3.  Set the database connection properties.

    |**Property**|**Description**|
    |------------|---------------|
    |`db.username=alfresco`|Specifies the name of the main database user. This name is used to authenticate with the database.|
    |`db.password=alfresco`|Specifies the password for the database user. This password is used to authenticate with the database.|

    Additional database properties can be set for further configuration. See [Configuring databases](../concepts/intro-db-setup.md) for more information.

4.  Specify the locations of the following external software:

    |**Property**|**Description**|
    |------------|---------------|
    |`ooo.exe=`|Specifies the location of the LibreOffice installation.|
    |`ooo.enabled=`|Specifies whether to use the Direct LibreOffice subsystem.|
    |`jodconverter.officeHome=`|Specifies the location of the LibreOffice installation for JODConverter transformations. To use the JODConverter, uncomment the `ooo.enabled=false` and `jodconverter.enabled=true` properties.|
    |`jodconverter.portNumbers=`|Specifies the port numbers used by each JODConverter processing thread. The number of process will match the number of ports.|
    |`jodconverter.enabled=`|Specifies whether to use the JODConverter. Set the property to `jodconverter.enabled=true`.|
    |`img.root=`|Specifies the location of the ImageMagick installation.|

5.  Configure your supported database for use. See [Configuring databases](../concepts/intro-db-setup.md).

6.  Select a JDBC driver used with each connection type.

7.  Add your global custom configurations.

    **Note:** Ensure that you use single-byte character sets \(ISO-8859-1 Latin 1\) in your alfresco-global.properties settings, particularly the `system.webdav.rootPath` setting. If you require other characters, you can use Unicode equivalents. For example, if your root path in Cyrillic was `фолдер`, which means folder in English, a valid value would be:

    ```
    system.webdav.rootPath=/app:company_home/cm:\u0444\u043E\u043B\u0434\u0435\u0440
    ```

8.  Save your file without the .sample extension.


You need to restart the server for the configuration changes to take effect.

**Parent topic:**[Using the alfresco-global.properties file](../concepts/global-props-intro.md)

