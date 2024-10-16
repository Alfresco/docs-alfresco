---
title: Extension Content Accelerator (Custom AMP)
---

One of the common ways customers and implementation teams extend the out-of-the-box ACA functionality is by using what we refer to as a "Custom AMP". This is essentially a way to use the Alfresco SDK to generate an Alfresco AMP file that can be deployed to Alfresco Content Services for the following functionalities:

* Deploy custom content models
* Create custom REST endpoints
* Add custom Alfresco behaviors
* Override existing OpenContent code
* Create custom document overlays/watermarks

This Custom AMP framework can also be thought of as a generic content accelerator for adding custom configurations and code to an existing ACA accelerator.

A sample SDK project has been generated for reference, see `https://github.com/Alfresco/om-content-accelerator-enterprise-viewer`, as a starting point for developing your own Custom AMP. Note that this GitHub repository has restricted access. To access the repository you need to work with the Hyland Services engagement. The sample AMP has been developed so that it can be used for the extension of Claims, Policy and Procedure (PnP), or Human Resources Employee File Management accelerators.

## How to develop a Custom AMP for the existing extensions

There are a few requirements that your Custom AMP must meet to work with the existing accelerators. The sample AMP has been developed to meet these standard rules and they are listed here for reference:

1. The AMP configuration and code must reside under `alfresco/module/com.alfresco.aca.accelerator.extension` to be properly picked up.

   Refer to `src/main/config/alfresco/module` in the sample SDK project for reference.

2. Any overrides for ACA properties must reside in a file named `opencontent-extension-override-placeholders.properties`.

   Refer to `src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-placeholders.properties` in the sample SDK project for reference.

3. Any overrides or additions to the ACA bean configurations need to reside in a file named `opencontent-extension-override-config.xml`.

   > **Note:** This file can reference other XML config files but ACA will only specifically look for this file.

   Refer to `src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-config.xml` in the sample SDK project for reference.

4. Name the module context file for the extension `opencontent-extension-override-module-ctx.xml`.

   Refer to `src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-module-ctx.xml` in the sample SDK project for reference.

### How to add custom Alfresco models into the Custom AMP

To add custom alfresco models you will need to define a bean that has a parent of `dictionaryModelBootstrap` and depends-on `dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap` in the ACA extension accelerators module context file. This bean will need to extend any models that other accelerators would need. For instance, this is what it might look like to add onto the Claims or PnP accelerators:

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

Complete the following steps to accomplish this in your Custom AMP:

1. Create a bean to extend `dictionaryModelBootstrap` that points to the xml file for your custom model.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-module-ctx.xml` in the sample SDK project for reference.

2. Create a custom model xml and put it in the correct location in the AMP code.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/extension/model/sampleModel.xml` in the sample SDK project for reference.

### How to create a custom REST API endpoint in a Custom AMP

To create a custom REST API endpoint in your Custom AMP, create REST controller and extend `RESTService`.

Complete the following steps to create the REST controller and extend `RESTService` in your Custom AMP:

1. Define a bean to make this REST API accessible from ACA in file `opencontent-extension-override-config.xml`.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-config.xml` in the sample SDK project for reference.

2. Create a Java class with your new REST endpoint(s).

   See `alfresco-sdk-aca-sample/sample-platform/src/main/java/com/tsgrp/opencontent/rest/RESTSample.java` in the sample SDK project for reference.

### How to add a custom Alfresco behavior in a Custom AMP

To create a custom behavior in your Custom AMP, you will need to create a behavior class and extend `HPIBehaviorBase`. Define a bean to register this behavior in file `opencontent-extension-override-module-ctx.xml`.

To accomplish this, complete the following steps:

1. Define a bean for your behavior.

   See `sampleDocumentCreateBehavior` bean in `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-module-ctx.xml`in the sample SDK project for reference.

2. Create a custom Alfresco behavior class to write your behavior logic.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/java/com/tsgrp/sample/behaviour/SampleDocumentCreateBehavior.java` in the sample SDK project for reference.

### How to override existing OpenContent code in a Custom AMP

To override the existing OpenContent code, create a bean in `opencontent-extension-override-config.xml` with the same id as the bean that points to the OpenContent code that you want to override. In your new bean, refer to a new custom class you will implement in your AMP rather than the class the comes out of the box with OpenContent. Note that this will only work for overriding OpenContent classes that are referenced by a bean in OpenContent's spring configuration.

Complete the following steps to accomplish this in your Custom AMP. The example shows overriding the out-of-the-box Subscription action in ACA:

1. Create your own custom implementation of the java code you wish to override and give it its own name.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/java/com/tsgrp/opencontent/action/executer/SampleSubscriptionActionExecuter.java` in the sample SDK project for reference.

2. Create a bean in `opencontent-extension-override-config.xml` with the same id as the bean that points to the OpenContent code that you want to override. Set the class on the bean to the new custom class you created in step 1.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.tsgrp.opencontent/extension/opencontent-extension-override-config.xml` in the sample SDK project for reference.

### How to create custom overlays in a Custom AMP

To configure your own custom document overlays (watermarks), create a file named `oc-overlay-config.xml` and configure custom overlays as needed. Refer to [Configuring Overlays]({% link enterprise-viewer/latest/config/overlay.md %}) for more information.

This file will override the `oc-overlay-config.xml` configurations that come out-of-the-box with OpenContent. If you wish to keep the existing configurations and add your own on top of what is provided, start by copying the `oc-overlay-config.xml` from OpenContent source code and then simply append your configurations to that file rather than starting from scratch.

Complete the following steps to accomplish this in your Custom AMP:

1. Place your custom `oc-overlay-config.xml` file at `platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/`.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/oc-overlay-config.xml` in the sample SDK project for reference.

2. Create an `overlayConfigBean` bean that points to your overlay config file from step 1. Also create a bean for `openPdfEngine`.

   See `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.tsgrp.opencontent/opencontent-override-overlay-spring-config.xml` in the sample SDK project for reference.

## How to deploy Alfresco custom content model in Alfresco Content Accelerator

Once you create a Custom AMP, the next step is to deploy it to an Alfresco container and validate that the AMP is applied correctly. For more information see [Install Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

When the Custom AMP is deployed successfully:

* If a default AMP custom model was installed, a `sample_document` is deployed. The custom content type can be found in the **ACA Admin Console**:

  ![AMP custom model]({% link content-accelerator/images/ACA_amp-custom-model.png %})

  * Select the document type and configure the properties as required.
  * Click **Save Config** at the bottom of the page to save and apply the changes.

* If a default AMP custom aspect was installed, a `sample_aspect` is deployed. It can be added to the **Non-Mandatory Aspect** section in the **ACA Admin Console**:

  ![AMP custom aspect]({% link content-accelerator/images/ACA_amp-custom-aspect.png %})

  * Select the aspect and configure the properties as required.
  * Click **Save Config** at the bottom of the page to save and apply the changes.

The newly created Object Type and Non-Mandatory Aspect can be used to create new forms in ACA. For more information see [Admin Guide]({% link content-accelerator/latest/configure/admin-guide.md %}).
