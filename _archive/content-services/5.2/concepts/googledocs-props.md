---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring Google Docs using properties

The following properties can be configured for Google Docs Integration in the alfresco-global.properties file.

-   **googledocs.enabled**

    Enables the Google Docs functionality. By default, this property is set to true. If you set this option to false, the **Edit in Google Docs** action will not be available. Documents that are currently being edited will still be available using the **Resume editing in Google Docs** action until they are saved or discarded.

-   **googledocs.idleThresholdSeconds**

    Sets the idle time threshold in seconds. Additional Google users that you invite to collaborate on the document will be considered to be 'idle' after this period. The period is measured from the time when the user last made a change to the document. When saving documents back to Alfresco Content Services, or discarding changes, you must confirm that you want to disconnect any non-idle users before the action completes.


**Note:** Enterprise-only releases: You can also set these properties in the Admin Console. See [Configuring Google Docs using Admin Console](../tasks/adminconsole-googledocs.md) for more.

**Parent topic:**[Configuring Google Docs Integration](../concepts/googledocs-configuration.md)

