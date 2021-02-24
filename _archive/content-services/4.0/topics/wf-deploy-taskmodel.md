---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Deploying the task model

You deploy your workflow task model using the Spring "Workflow Deployer" bean. The bean may be used in conjunction with Alfresco's configuration extension mechanism to deploy custom made workflows and models.

In the following example configuration we are deploying a process definition adHocModel.bpmn2.0.xml\) and a workflow content model adHocModel.bpmn2.0.xml. In both properties, the “location” is the classpath location of the XML file.

```

   <bean id="myworkflows.workflowBootstrap" parent="workflowDeployer">
   <property name="models">
      <list>
         <-- Task Model associated with above process definition -->
         <value>alfresco/workflow/adhocModel.xml</value>
      </list>
   </property>
   <property name="workflowDefinitions">
      <props>      
         <prop key="engineId">activiti</prop>     
         <prop key="location">alfresco/extension/adHocModel.bpmn2.0.xml</prop>     
         <prop key="mimetype">text/xml</prop>     
         <prop key="redeploy">false</prop>
      </props>
   </property>
</bean> 
```

**Parent topic:**[Creating and managing workflows](../topics/wf-howto.md)

