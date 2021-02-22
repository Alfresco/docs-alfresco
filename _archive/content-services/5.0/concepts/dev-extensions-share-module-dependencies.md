---
author: Alfresco Documentation
---

# Module dependencies

This topic describes how dependencies such as additional CSS and JavaScript code can be included in a Surf Extension Module.

Surf Extension Modules can include dependencies such as CSS and JavaScript files. This content is then linked to from the `<head>` element of the targeted web script.

An example is given here:

```

<module>
   <id>Add dependencies</id>
   <customizations>
      <customization>
         <targetPackageRoot>org.acme</targetPackageRoot>
         **<dependencies\>
            <css\>/res/demo/dependencies/styles.css</css\>
            <js\>/res/demo/dependencies/script.js</js\>
         </dependencies\>**
      </customization>
   </customizations>
</module>          
         
```

A target package is specified and when a Web Script declared at that package is invoked, then the dependencies will be included as imports into the `<head>>` element of that page.

**Parent topic:**[Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules.md)

