---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
keyword: [customize, system, configRoot, configShareRoot]
---

# Modifying system configuration files

This section describes the recommended method for modifications to the system configuration files.

Before you start, back up all your configuration files for security. The system configuration files that are read by Alfresco are contained in the <configRoot\> and <configRootShare\> directories.

The preferred method of configuration is to extend the system files using the global properties file \(alfresco-global.properties\). If you choose to modify the system files directly, there is a risk that you will lose your changes when you next upgrade. To minimize the risk, use the following approach.

1.  Make a copy of the default file you want to modify, and rename it.

2.  Make your customization. Make only one logical change at one time \(one logical change may mean several physical changes\).

3.  Check any XML is well-formed. You can use any XML editor or you can open the file in a browser, such as Firefox.

4.  Before making further changes, test each logical change by stopping and restarting Alfresco.

5.  If you need to roll back the changes for troubleshooting, roll them back in the reverse sequence to which you applied them. Stop and restart Alfresco after each rollback.


-   **[Repository system configuration files](../concepts/configfiles-repository.md)**  
The Alfresco system configuration files are in the application WAR file. When the server starts, the files expand to `<configRoot>`.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

**Related information**  


[System paths](../reuse/conv-syspaths.md)

