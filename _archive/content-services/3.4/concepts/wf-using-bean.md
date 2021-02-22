---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Using the workflowDeployer bean

A workflow task model may be deployed using the workflowDeployer bean.

```
<bean id="myworkflows.workflowBootstrap" parent="workflowDeployer">
   <property name="workflowDefinitions">
      ...
   </property>
   <property name="models">
      <list>
         <-- Task Model associated with above process definition -->
         <value>alfresco/workflow/adhocModel.xml</value>
      </list>
   </property>
</bean>
```

**Parent topic:**[Deploying the task model](../topics/wf-deploy-taskmodel.md)

