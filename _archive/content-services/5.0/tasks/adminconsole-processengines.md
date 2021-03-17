---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Admin Console: Enabling workflow process engines

Alfresco workflows run on an embedded Activiti workflow engine.

In previous versions of Alfresco, a jBPM workflow engine was available. Although this process engine is still shipped with the installation, Alfresco recommends that you use the Activiti workflow engine for all new workflows.

In a new Alfresco installation, jBPM is disabled by default. If you have existing, migrated jBPM workflows that you wish to continue using, you must enable the jBPM workflow engine.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Process Engines**.

    You see the Process Engines page.

3.  View the Activiti Workflow Engine properties:

    |Activiti Workflow Engine property|Example setting|What is it?|
    |---------------------------------|---------------|-----------|
    |**Activiti Workflow Enabled**|enabled|Enables or disables the Activiti workflow engine. This workflow engine is enabled by default. When using only new workflows, you do not need to change any of the settings on this page.|
    |**Process Definitions Visible**|enabled|Specifies whether the Activiti process definitions are available to users.|

    The other items in this section show the Activiti engine status details:

    |Activiti Workflow Engine status|Example setting|What is it?|
    |-------------------------------|---------------|-----------|
    |**Currently Running Process Instances**|0|Specifies the number of Activiti process definitions running in the system.|
    |**Currently Running Task Instances**|0|Specifies the number of Activiti-defined tasks running in the system.|
    |**Process Definitions Deployed**|1|Specifies the number of Activiti process definitions deployed.|

4.  Enable the jBPM Workflow Engine for migrated workflows.

    |jBPM Workflow Engine property|Example setting|What is it?|
    |-----------------------------|---------------|-----------|
    |**jBPM Workflow Enabled**|enabled|Enables or disables the jBPM workflow engine. This workflow engine is disabled by default. Set to enabled to continue using migrated jBPM workflows.|
    |**Workflow Definitions Visible**|enabled|Specifies whether the jBPM workflow definitions are available to users.|

5.  For creating your own, more complex workflow definitions, click the **Activiti Workflow Console** link.

    For more information on creating workflow definitions, see [Creating and managing workflows](../topics/wf-howto.md).

6.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: Repository Services](../concepts/adminconsole-reposervices.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

