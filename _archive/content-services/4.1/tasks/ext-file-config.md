---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
keyword: [Spring, bean, files]
---

# Modifying Spring bean definition files

For advanced configuration, you can also extend or override the Spring bean definitions that control the Alfresco Java classes.

The Spring bean definitions are within configuration files in the following directories:

-   The <extension\> directory contains the configuration files for extending Alfresco.
-   The <web-extension\> directory contains the configuration files for extending Alfresco Share.

1.  Browse to the <extension\> directory. For example, for Tomcat 6:

    -   \(Windows\) C:\\Alfresco\\tomcat\\shared\\classes\\alfresco\\extension
    -   \(Linux\) tomcat/shared/classes/alfresco/extension
    Each file has a copy with a .sample extension.

2.  Open the configuration file with the .sample extension.

3.  Add your configurations to the file.

4.  Save the file without the .sample extension.


**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

**Related information**  


[System paths](../reuse/conv-syspaths.md)

