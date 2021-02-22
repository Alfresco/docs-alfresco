---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Enabling workflow process engines

Alfresco Content Services workflows run on an embedded Activiti workflow engine. Use Process Engines in the Admin Console to enable Activiti workflows and to edit properties.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Process Engines**.

    You see the Process Engines page.

3.  View the Activiti Workflow Engine properties:

    |Activiti Workflow Engine property|Example setting|What is it?|
    |---------------------------------|---------------|-----------|
    |Activiti**Workflow Enabled**|enabled|Displays the state of the Activiti workflow engine. This workflow engine is enabled by default. When using only new workflows, you do not need to change any of the settings on this page.|
    |**Process Definitions Visible**|enabled|Specifies whether the Activiti process definitions are available to users.|

    The other items show the Activiti engine status details:

    |Activiti Workflow Engine status|Example setting|What is it?|
    |-------------------------------|---------------|-----------|
    |**Currently Running Process Instances**|0|Specifies the number of Activiti process definitions running in the system.|
    |**Currently Running Task Instances**|0|Specifies the number of Activiti-defined tasks running in the system.|
    |**Process Definitions Deployed**|1|Specifies the number of Activiti process definitions deployed.|

4.  For creating your own, more complex workflow definitions, click the Activiti**Workflow Console** link.

5.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Workflow tools](../concepts/wf-tools.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

