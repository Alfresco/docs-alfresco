---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Admin Console: Transformation services

Transformation services let you convert content between different file formats. The JODConverter installation \(part of OpenOffice.org\) is used by Alfresco for document transformations, such as a text file to PDF. The ImageMagick installation is used for image transformations, and it is recommended that you do not change any settings.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Transformation Services**.

    You see the Transformation Services page.

3.  Set the Office Transform - JODConverter properties.

    |Property|Example setting|What is it?|
    |--------|---------------|-----------|
    |**JODConverter Enabled**|No|This enables or disables the JODConverter for transformations.|
    |**Max Tasks per Process**|200|This is the maximum number of tasks that can be performed concurrently.|
    |**Office Suite Location**|/Applications/alfresco-5.0.0/libreoffice.app/Contents|This shows the directory path locations of OpenOffice.org or LibreOffice.|
    |**Port Numbers**|8100|This is the port number that JODConverter uses. To enable multiple process instances, enter a comma-separated list of port numbers, all of which must be available.|
    |**Task Execution Timeout**|120000|This is the duration in milliseconds after which a task will timeout.|
    |**Task Queue Timeout**|30000|This is the duration in milliseconds after which the task queue will timeout.|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: Repository Services](../concepts/adminconsole-reposervices.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

