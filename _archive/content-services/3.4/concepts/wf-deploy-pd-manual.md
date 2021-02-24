---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Deploying a process definition manually

You can use the `workflowDeployer` bean to deploy process definitions \(refer to the following code snippet\).

The bean must be in a file in the <extension\> directory.

```
<bean id="myworkflows.workflowBootstrap" parent="workflowDeployer">
  <property name="workflowDefinitions">
    <list>
      <props>
        <prop key="engineId">jbpm</prop>
        <prop key="location">alfresco/workflow/adhoc_processdefinition.xml</prop>
        <prop key="mimetype">text/xml</prop>
      </props>
    </list>
  </property>
</bean>
```

**Parent topic:**[Process definition deployment](../topics/wf-intro-deploy-pd.md)

