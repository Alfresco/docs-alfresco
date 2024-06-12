---
title: Extension Content Accelerator (Custom Amp)
---

The Extension Content Accelerator is a generic content accelerator for adding custom configurations and code to an existing accelerator.

## How to add the Extension Content Accelerator onto existing Accelerators

There are a few requirements that your custom AMP must meet to work with the existing accelerators.

1. The AMP configuration and code must reside under `alfresco/module/com.alfresco.aca.accelerator.extension` to be properly picked up
2. Any overrides for ACA properties must reside in a file named `opencontent-extension-override-placeholders.properties`
3. Any overrides or additions to the ACA bean configurations need to reside in a file named `opencontent-extension-override-config.xml`. **Note:** This file can reference other xml config files but ACA will only specifically look for this file.
4. Name the module context file for the extension `opencontent-extension-override-module-ctx.xml`

### How to add custom Alfresco models into the custom AMP

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
When you add a new document type extension for use in Alfresco Content Accelerator, we recommend including the `tsg:renditioned` mandatory aspect.  This aspect provides streamlined handling of PDFs renditions for viewing and includes:

* Immediate renditioning to PDF upon document upload or version
* Separate renditions for each version of the node in Alfresco

> **Note:** In many ACA Policy and Procedure implementations, dedicated per-version renditions are a regulatory requirement.

If, however, the `tsg:renditioned` aspect is not desired, or the model already exists and cannot be updated, it is possible to turn on view time renditioning in the [Document Viewer]({% link content-accelerator/latest/configure/admin-guide.md %}#document-viewer) config in the Stage.