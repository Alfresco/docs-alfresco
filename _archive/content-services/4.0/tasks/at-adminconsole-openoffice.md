---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: OpenOffice
---

# Managing OpenOffice

This section describes how to view the properties for the OpenOffice.

There are three OpenOffice pages in the Admin Console: OOoJodConverter, OpenOffice System, and OpenOffice.

1.  Open the Admin Console, and then click an OpenOffice page.

2.  View the OpenOffice JodConverter properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Enabled**|No|This enables or disables the OpenOffice JodConverter for transformations.|
    |**Max. Tasks per process**|200|This is the maximum number of tasks.|
    |**OpenOffice Home**|/Applications/alfresco-4.0.0/openoffice.app/Contents|This shows the directory path locations of OpenOffice.|
    |**Port Number**|8100|This is the port number that OpenOffice uses.|
    |**Task Execution Timeout**|120000|This is the duration in milliseconds after which a task will timeout.|
    |**Task Queue Timeout**|30000|This is the duration in milliseconds after which a the task queue will timeout.|

3.  View the OpenOffice System properties:

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**Enabled**|Yes|This enables or disables the OpenOffice transformations.|
    |**Exe**|*<alfresco-3.5.0-installLocation\>*/openoffice/program/soffice.bin|This shows the directory path locations of the OpenOffice that Alfresco uses for transformation.|
    |**Port**|8100|This is the port number that OpenOffice uses.|


**Parent topic:**[Managing Alfresco using the Admin Console](../concepts/at-adminconsole.md)

