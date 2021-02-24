---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring alfrescoNtlm

Use these instructions to configure alfrescoNtlm using the configuration properties in the Admin Console.

1.  Open the Admin Console.

2.  In the Directories section, click **Directory Management**.

    You see the Directory Management page.

3.  In the Authentication Chain section, under **Actions**, click **Edit** corresponding to the alfrescoNtlm1 directory.

    You see the Edit Internal Alfresco Directory page.

4.  Set the configuration properties.

    |Synchronization property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Allow Guest Login**|Yes|This enables guest access to Alfresco.|
    |**Map Unknown User to Guest**|alfresco-system|This enables unknown users to automatically log in as the Alfresco guest user during SSO.|
    |**Authenticate FTP**|Yes|This enables authentication for FTP access.|

5.  Click **Save** to apply the changes you have made to the Alfresco Internal authentication directory.

    If you do not want to save the changes, click **Close**.


**Parent topic:**[Managing authentication directories](../concepts/adminconsole-directorymgt-cp.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

