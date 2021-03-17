---
author: Alfresco Documentation
---

# Adding a Custom Permission Model

A custom permission model can be bootstrapped via a module.

A custom permission model can be bootstrapped by a module by adding the following bean definition to module-context.xml:

```

  
    <bean id="myModule_permissionBootstrap" parent="permissionModelBootstrap">
      <property name="model" value="alfresco/module/myModuleId/myPermissionDefinitions.xml"/>
    </bean>
  

```

**Parent topic:**[Modules](../concepts/dev-extensions-modules-intro.md)

