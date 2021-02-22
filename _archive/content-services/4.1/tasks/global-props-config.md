---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Customization
keyword: [global, properties]
---

# Modifying the global properties file

This section describes the steps for modifying the alfresco-global.properties file.

**Important:** For edits to the alfresco-global.properties file, when specifying paths for Windows systems, you must replace the Windows path separator characters with either the \\\\ separator or the forward slash / Unix path separator. Also, when using folder names like User Homes, you must manually escape the space. For example, change the value to `User_x0020_Homes`.

1.  Browse to the <classpathRoot\> directory.

    For example, for Tomcat 6, browse to the $TOMCAT\_HOME/shared/classes/ directory.

2.  Open the alfresco-global.properties.sample file.

    This file contains sample configuration settings for Alfresco. To enable or modify a setting, ensure that you remove the comment \(\#\) character.

3.  Ensure that the `dir.root=` property points to a root location for the storage of content binaries and index files.

    For example, `dir.root=/var/data/alfresco/alf_data`.

    **Note:** It is strongly recommended that you always set this value to an absolute file system path as shown above. This ensures that no matter how the Alfresco instance is started, it will always find the directories where content has previously been written.

4.  Set the database connection properties.

    |**Property**|**Description**|
    |------------|---------------|
    |`db.username=alfresco`|Specifies the name of the main Alfresco database user. This name is used to authenticate with the database.|
    |`db.password=alfresco`|Specifies the password for the Alfresco database user. This password is used to authenticate with the database.|

    Additional database properties may be set for further configuration. Refer to the [Configuring databases](../concepts/intro-db-setup.md) for more information.

5.  Specify the locations of the following external software:

    |**Property**|**Description**|
    |------------|---------------|
    |`ooo.exe=`|Specifies the location of the OpenOffice installation.|
    |`ooo.enabled=`|Specifies whether to use the Direct OpenOffice subsystem.|
    |`jodconverter.officeHome=`|Specifies the location of the OpenOffice installation for JODConverter transformations. To use the JODConverter, uncomment the `ooo.enabled=false` and `jodconverter.enabled=true` properties.|
    |`jodconverter.portNumbers=`|Specifies the port numbers used by each JODConverter processing thread. The number of process will match the number of ports.|
    |`jodconverter.enabled=`|Specifies whether to use the JODConverter. Set the property to `jodconverter.enabled=true`.|
    |`img.root=`|Specifies the location of the ImageMagick installation.|
    |`swf.exe=`|Specifies the location of the SWF tools installation.|

6.  Uncomment the `db.driver=` and `db.url=` properties for the database that you require.

    These properties are grouped into sections for MySQL, Oracle, SQL Server, and PostgreSQL connection, each containing sample settings.

7.  Select a JDBC driver used with each connection type.

8.  Add your global custom configurations.

9.  Save your file without the .sample extension.


You need to restart the Alfresco server for the configuration changes to take effect.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

