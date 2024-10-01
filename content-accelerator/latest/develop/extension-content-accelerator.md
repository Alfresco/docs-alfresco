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

## How to deploy Alfresco custom content model in Alfresco Content Accelerator

Once you create a custom AMP, the next step is to deploy it to an Alfresco container and validate that the AMP is applied correctly. For more information see [Install Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

When the custom AMP is deployed successfully:

* If a default AMP custom model was installed, a `sample_document` is deployed. The custom content type can be found in the **ACA Admin Console**.
![AMP custom model]({% link content-accelerator/images/ACA_amp-custom-model.png %})
   * Select the document type and configure the properties as required.
   * Click `Save Config` at the bottom of the page to save and apply the changes.
* If a default AMP custom aspect was installed, a `sample_aspect` is deployed. It can be added to the **Non-Mandatory Aspect** section in the **ACA Admin Console**.
![AMP custom aspect]({% link content-accelerator/images/ACA_amp-custom-aspect.png %})
   * Select the aspect and configure the properties as required.
   * Click `Save Config` at the bottom of the page to save and apply the changes.

The newly created `Object Type` and `Non-Mandatory Aspect` can be used to create new forms in ACA. For more information see [Admin Guide]({% link content-accelerator/latest/configure/admin-guide.md %}).