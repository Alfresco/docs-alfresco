---
title: Extension Content Accelerator (Custom Amp)
---

The Extension Content Accelerator is a generic content accelerator for adding custom configurations and code to an existing accelerator.

## How to add the Extension Content Accelerator onto existing Accelerators

There are a few requirements that your custom amp must meet to work with the existing accelerators.

1. The amp configuration and code must reside under `alfresco/module/com.alfresco.aca.accelerator.extension` to be properly picked up
2. Any overrides for ACA properties must reside in a file named `opencontent-extension-override-placeholders.properties`
3. Any overrides or additions to the ACA bean configurations need to reside in a file named `opencontent-extension-override-config.xml`. **Note:** This file can reference other xml config files but ACA will only specifically look for this file.
4. Name the module context file for the extension `opencontent-extension-override-module-ctx.xml`

### How to add custom Alfresco models into the custom amp

To add custom alfresco models you will need to define a bean that has a parent of `dictionaryModelBootstrap` and depends-on `dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap` in the aca extension accelerators module context file. This bean will need to extend any models that other accelerators would need. For instance, this is what it might look like to add onto the claims or pnp accelerators:

```xml
<bean id="accelerator-extension-dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap">
   <property name="models">
      <list>
         <value>alfresco/extension/model/customModel.xml</value>
     </list>
   </property>
</bean>
```
