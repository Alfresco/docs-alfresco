---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Deploying as a content model

The task model is a content model, so it may be deployed like any other content model.

An example configuration snippet follows:

```
<bean id="adhocWorkflow.dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
   <property name="models">
      <list>
         <value>alfresco/model/adhocTaskModel.xml</value>
      </list>
   </property>
</bean>
```

**Parent topic:**[Deploying the task model](../topics/wf-deploy-taskmodel.md)

