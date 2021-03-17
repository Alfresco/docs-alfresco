---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
keyword: multi-tenancy enable
---

# Enabling multi-tenancy

You can configure a multi-tenant \(MT\) environment by renaming three sample MT extension files, and then restarting Alfresco.

1.  Locate the following directory:

    <extension\>\\mt\\

2.  Remove the .sample extension from the following MT files:

    1.  mt-admin-context.xml.sample

    2.  mt-contentstore-context.xml.sample

    3.  mt-context.xml.sample

    **Important:** All three files must be renamed to enable MT.

3.  Restart the Alfresco server.


**Parent topic:**[Setting up Alfresco multi-tenancy](../concepts/mt-intro.md)

