---
author: Alfresco Documentation
---

# Adding a Custom Model

Custom content models can be bootstrapped into the repository via Spring configuration added to the module context file.

Custom content models can be bootstraped into the repository using the following Spring configuration added to module-context.xml:

```

  
    <bean id="myModule_dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
      <property name="models">
        <list>
          <value>alfresco/module/myModuleId/myCustomModel.xml</value>
        </list>
      </property>
    </bean>
    

```

**Parent topic:**[Modules](../concepts/dev-extensions-modules-intro.md)

