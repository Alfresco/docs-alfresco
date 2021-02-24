---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Google Docs™ Console

The System Settings page shows your server settings, the Alfresco web application repository settings, and the Alfresco Share application settings.

1.  Open the Admin Console.

2.  In the Consoles section, click **Google Docs™ Console**.

3.  Set the Settings properties:

    |Google Docs property|Example setting|What is it?|
    |--------------------|---------------|-----------|
    |**googledocs.enabled**|true|Enables the Google Docs functionality. If you set this option to false, the **Edit in Google Docs** action will not be available. Documents that are currently being edited will still be available using the **Resume editing in Google Docs** action until they are saved or discarded.|
    |**googledocs.idleThresholdSeconds**|600|Sets the idle time threshold in seconds. Additional Google users that you invite to collaborate on the document will be considered to be 'idle' after this period. The period is measured from the time when the user last made a change to the document. When saving documents back to Alfresco, or discarding changes, you must confirm that you want to disconnect any non-idle users before the action completes.|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: Consoles](../concepts/adminconsole-consoles.md)

