---
author: Alfresco Documentation
---

# Adding a custom model

Custom content models can be bootstrapped into the repository using a Spring configuration added to the module context file.

Add the following Spring configuration to module-context.xml:

```

  
    <bean id="myModule_dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
      <property name="models">
        <list>
          <value>alfresco/module/myModuleId/myCustomModel.xml</value>
        </list>
      </property>
    </bean>
    

```

**Parent topic:**[Modules \(AMPs\)](../concepts/dev-extensions-modules-intro.md)

