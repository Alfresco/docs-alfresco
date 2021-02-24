---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Publishing a batch class

After you select all your batch class settings, you must publish your batch class before you can use it.

The publishing process checks the integrity of the settings in your batch class and makes the batch class available for use. If problems are found with any of the settings, error and warning messages will display, along with the recommended actions for fixing the problems.

If you edit your batch class, you must publish your batch class again before your changes can be used. Your changes will not be applied to batches created before the new publication date.

1.  Start the Kofax Capture Administration module to display the main screen.

2.  Select the **Batch class** tab from the Definitions panel, and right-click the applicable batch class.

3.  From the **Context** menu, select **Publish**.

4.  From the Publish window, select your batch class and click **Publish**.

    Kofax Capture will check all of your batch class settings and display the results in the Results box.

    If no problems are detected, the message “Publishing successful” displays. If problems are detected, warning/error messages will display along with recommended actions to resolve the problems. Perform the recommended actions, and then try to publish the batch class again.

5.  Run some sample batches through the system to test the operation of the release script.


After successfully publishing, you can create batches based on your batch class. As your batches flow through your Kofax Capture system, they will be routed from module to module. The modules that are used to process a batch, and the order that processing occurs, are specified as part of the batch class definition for the batch.

Refer to the Kofax Capture Help for more information about batch classes.

**Parent topic:**[Installing and configuring Alfresco Kofax Release script](../concepts/kofax-intro.md)

