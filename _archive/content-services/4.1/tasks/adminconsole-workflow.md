---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: workflow
---

# Viewing the workflow engine properties

The Workflow page shows the properties for the workflow engines.

1.  Open the Admin Console, and then click **Workflow**.

2.  View the Activiti Engine properties:

    |General property|Default setting|What is it?|
    |----------------|---------------|-----------|
    |**Enabled**|Yes|This shows that the Activiti workflow engine is enabled by default. You can disable this engine using the `system.workflow.engine.activiti.enabled=false` property in the alfresco-global.properties file.|
    |**Number of Tasks**| |This specifies a count of the Activiti-defined tasks defined in the system.|
    |**Number of Definitions**| |This specifies a count of the Activiti definitions defined in the system.|
    |**Number of Workflows**| |This specifies a count of the Activiti workflows defined in the system.|

3.  View the jBPM Engine properties:

    |General property|Default setting|What is it?|
    |----------------|---------------|-----------|
    |**Enabled**|No|This shows that the jBPM workflow engine is disabled by default. You can enable this engine using the `system.workflow.engine.jbpm.enabled=true` property in the alfresco-global.properties file.|
    |**Definitions Visible**| |This property specified whether the jBPM workflow definitions are visible or not within the system. By default, you do not see jBPM workflows. You can change this setting using the `system.workflow.engine.jbpm.definitions.visible=true` property.|
    |**Number of Tasks**| |This specifies a count of the jBPM-defined tasks defined in the system.|
    |**Number of Definitions**| |This specifies a count of the jBPM definitions defined in the system.|
    |**Number of Workflows**| |This specifies a count of the jBPM workflows defined in the system.|


**Parent topic:**[Managing workflow](../concepts/adminconsole-workflow-intro.md)

