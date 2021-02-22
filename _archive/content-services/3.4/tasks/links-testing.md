---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting testing debugging links
---

# Testing and debugging links

The <configRoot\>/log4j.properties file lets you set the level of logging based on the amount of information you need.

-   To enable debugging for the background process that continually checks the links in a web project, remove the comment from the following line:

    \#`log4j.logger.org.alfresco.linkvalidation.LinkValidationServiceImpl=debug`

-   To enable debugging for the action to run when performing a link validation check, add the following line:

    `log4j.logger.org.alfresco.linkvalidation.LinkValidationAction=debug`

-   To enable debugging for the link validation report dialog, add the following line:

    l`og4j.logger.org.alfresco.web.bean.wcm.LinkValidationDialog=debug`


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

