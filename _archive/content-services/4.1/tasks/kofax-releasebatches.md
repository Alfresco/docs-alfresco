---
author: [Alfresco Documentation, Alfresco Documentation]
source: Alfresco Kofax Release Script Installation and Configuration Guide \(Beta\)
audience: 
category: Installation
option: Kofax Release script
---

# Releasing batches

The Kofax Capture Release module will process batches based on the settings of the associated batch classes. This module is responsible for releasing documents, as well as index data using the attributes defined during release setup.

The Kofax Capture Release module usually runs as an unattended module on a Windows workstation, periodically polling the module for available batches. It may be configured to run during off-hours to avoid any impact to the throughput of Kofax Capture and/or the network system.

1.  Start the Kofax Capture Release module by selecting **Start \> Programs \> Kofax Capture \> Release**.

    All batches queued for release will be processed after initiation of the module.

    Once your batch is released, it will be removed from Kofax Capture. If any documents or pages are rejected, the batch will be routed to the Kofax Capture Quality Control module.

2.  To exit the Kofax Capture Release module, select **Batch \> Exit** from the module menu bar.


Refer to the Kofax Capture Help for more information about releasing batches.

**Parent topic:**[Installing and configuring Alfresco Kofax Release script](../concepts/kofax-intro.md)

