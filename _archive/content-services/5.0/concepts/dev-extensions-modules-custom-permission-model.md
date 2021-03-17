---
author: Alfresco Documentation
---

# Adding a custom permission model

A custom permission model can be bootstrapped by using a module.

Add the following bean definition to module-context.xml:

```
  
    <bean id="myModule_permissionBootstrap" parent="permissionModelBootstrap">
      <property name="model" value="alfresco/module/myModuleId/myPermissionDefinitions.xml"/>
    </bean>
  
```

More information about custom permission models can be found in the [Defining permissions](secur-permissions.md) section.

For more detailed information on permissions and roles, you may find it useful to reference this section in the [Alfresco One 5.1 documentation](http://docs.alfresco.com/5.1/references/dev-extension-points-permissions.html).

**Parent topic:**[Modules \(AMPs\)](../concepts/dev-extensions-modules-intro.md)

