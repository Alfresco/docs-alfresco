---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Google Docs configuration properties

The following properties can be configured for Google Docs integration in the alfresco-global.properties file.

-   **googledocs.enabled**

    Enables the Google Docs functionality. By default, this property is set to true. If you set this option to false, the **Edit in Google Docs** action will not be available. Documents that are currently being edited will still be available using the **Resume editing in Google Docs** action until they are saved or discarded.

-   **googledocs.idleThresholdSeconds**

    Sets the idle time threshold in seconds. Additional Google users that you invite to collaborate on the document will be considered to be 'idle' after this period. The period is measured from the time when the user last made a change to the document. When saving documents back to Alfresco, or discarding changes, you must confirm that you want to disconnect any non-idle users before the action completes.


You can also set these properties in the Admin Console. See [Google Docs™ Console](../tasks/adminconsole-googledocs.md)

**Parent topic:**[Installing and configuring Google Docs integration](../concepts/googledocs-intro.md)

