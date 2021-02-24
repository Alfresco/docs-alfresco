---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: JMX Dumper
---

# Troubleshooting the JMX Dumper

This section provides help for troubleshooting the JMX Dumper.

Invoking the JMX Dumper may result in a stack trace in the log file. When you open jmx-dumper, it is trying to find a data source defined in the web.xml file. \(`<res-ref-name>jdbc/dataSource</res-ref-name>`\), but this data source is not declared in the alfresco.xml file.

To prevent this logging message for appearing, you can configure the data source in the $CATALINA\_BASE/conf/\[enginename\]/\[hostname\]/alfresco.xml file.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

