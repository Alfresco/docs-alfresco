---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Performing a repository dump

In Share, configuration changes can be made using file changes \(alfresco-global.properties\), properties, and JMX. Regardless of how the changes were made, the JMX interface holds the current values of a running system. When talking to Alfresco Support, it may be convenient to have a dump of these settings.

The **Repository** tool provides a web JMX dumper so you can easily access this information.

1.  On the toolbar, expand the **More** menu and click **Repository** in the Tools list.

2.  Click the **Download JMX Zip Dump** link.

3.  Save the file to a convenient location on your computer.

    The saved .zip file has the name **jmxdump** appended with the current date \(in the format YYYY\_MM\_DD\).

4.  Extract the file and open the .txt file with your preferred program.


**Parent topic:**[Share Admin Console](../concepts/adminconsole-intro.md)

