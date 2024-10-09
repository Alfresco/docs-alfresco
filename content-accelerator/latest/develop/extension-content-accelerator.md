---
title: Extension Content Accelerator (Custom Amp)
---

One of the common ways customers and implementation teams extend the out-of-the-box ACA functionality is by using what we refer to as a "Custom Amp". This is essentially a way to use the Alfresco SDK to generate an Alfresco Amp file that can be deployed to Alfresco Content Services for the following functionalities: 

* Deploy custom content models 
* Create custom rest endpoints
* Add custom Alfresco behaviors 
* Override existing OpenContent code 
* Create custom document overlays/watermarks 

This Custom Amp framework can also be thought of as a generic content accelerator for adding custom configurations and code to an existing ACA accelerator.

The Offering Management team has generated a sample SDK project (see https://github.com/Alfresco/om-content-accelerator-enterprise-viewer) for reference as a starting point for developing your own Custom Amp. The sample Amp has been developed in a way that it can be used for extension of Claims, Policy and Procedure or Human Resources Employee File Management accelerators.

## How to develop a Custom Amp for the existing extensions

There are a few requirements that your Custom Amp must meet to work with the existing accelerators. The sample Amp has been developed to meet these standard rules and they are listed here for reference:

1. The Amp configuration and code must reside under `alfresco/module/com.alfresco.aca.accelerator.extension` to be properly picked up
   * Refer to `src/main/config/alfresco/module` in sample SDK project for reference
2. Any overrides for ACA properties must reside in a file named `opencontent-extension-override-placeholders.properties`
   * Refer to `src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-placeholders.properties` in sample SDK project for reference
3. Any overrides or additions to the ACA bean configurations need to reside in a file named `opencontent-extension-override-config.xml`. **Note:** This file can reference other xml config files but ACA will only specifically look for this file.
   * Refer to `src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-config.xml` in sample SDK project for reference
4. Name the module context file for the extension `opencontent-extension-override-module-ctx.xml`
   * Refer to `src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-module-ctx.xml` in sample SDK project for reference

### How to add custom Alfresco models into the Custom Amp

To add custom alfresco models you will need to define a bean that has a parent of `dictionaryModelBootstrap` and depends-on `dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap` in the ACA extension accelerators module context file. This bean will need to extend any models that other accelerators would need. For instance, this is what it might look like to add onto the claims or pnp accelerators:

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

Steps to accomplish this in your Custom Amp:

1. Create a bean to extend `dictionaryModelBootstrap` that points to the xml file for your custom model. (See `alfresco-sdk-aca-sample\sample-platform\src\main\config\alfresco\module\com.alfresco.accelerator.extension\opencontent-extension-override-module-ctx.xml` in sample SDK project for reference)
2. Create a custom model xml and put it in the correct location in the amp code. (See `alfresco-sdk-aca-sample\sample-platform\src\main\config\alfresco\extension\model\sampleModel.xml` in sample SDK project for reference)

### How to create a custom REST API endpoint in a custom amp

To create a custom REST API endpoint in your custom amp, create REST controller and extend `RESTService`. 

Complete the following steps to create the REST controller and extend `RESTService` in your Custom Amp:

1. Define a bean to make this Rest API accessible from ACA in file `opencontent-extension-override-config.xml`. (see `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-config.xml` in sample SDK project for reference)
2. Create a Java class with your new REST endpoint(s). (see `alfresco-sdk-aca-sample/sample-platform/src/main/java/com/tsgrp/opencontent/rest/RESTSample.java` in sample SDK project for reference)

### How to add a custom Alfresco behavior in a Custom Amp

To create a custom behavior in your Custom Amp, you will need to create a behaviour class and extend `HPIBehaviorBase`. Define a bean to register this behaviour in file `opencontent-extension-override-module-ctx.xml`.

To accomplish this, complete the following steps:

1. Define a bean for your behavior. (see `sampleDocumentCreateBehavior` bean in `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/opencontent-extension-override-module-ctx.xml`in sample SDK project for reference)
2. Create a custom Alfresco behavior class to write your behavior logic. (see `alfresco-sdk-aca-sample/sample-platform/src/main/java/com/tsgrp/sample/behaviour/SampleDocumentCreateBehavior.java` in sample SDK project for reference)

### How to override existing OpenContent code in a Custom Amp

To override the existing OpenContent code, create a bean in `opencontent-extension-override-config.xml` with the same id as the bean that points to the OpenContent code that you want to override. In your new bean, refer to a new custom class you will implement in your Amp rather than the class the comes out of the box with OpenContent. Note that this will only work for overriding OpenContent classes that are referenced by a bean in OpenContent's spring configuration. 

Steps to accomplish this in your Custom Amp (example shows overriding the out-of-the-box Supscription action in ACA):

1. Create your own custom implementation of the java code you wish to override and give it its own name (see `alfresco-sdk-aca-sample/sample-platform/src/main/java/com/tsgrp/opencontent/action/executer/SampleSubscriptionActionExecuter.java` in sample SDK project for reference)
2. Create a bean in `opencontent-extension-override-config.xml` with the same id as the bean that points to the OpenContent code that you want to override. Set the class on the bean to the new custom class you created in step 1. (see `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.tsgrp.opencontent/extension/opencontent-extension-override-config.xml` in sample SDK project for reference)

### How create custom overlays in a Custom Amp

To configure your own custom document overlays (watermarks), create a file named `oc-overlay-config.xml` and configure custom overlays as needed. Refer to [Configuring Overlays]({% link enterprise-viewer/latest/config/overlay.md %}) for more information. 

This file will override the `oc-overlay-config.xml` configurations that come out-of-the-box with OpenContent. If you wish to keep the exisitng configurations and add your own on top of what is provided, start by copying the `oc-overlay-config.xml` from OpenContent source code and then simply append your configurations to that file rather than starting from scratch. 

Steps to accomplish this in your Custom Amp:

1. Place your custom `oc-overlay-config.xml` file at `platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/`. (see `alfresco-sdk-aca-sample/sample-platform/src/main/config/alfresco/module/com.alfresco.accelerator.extension/oc-overlay-config.xml` in sample SDK project for reference)
2. Create an `overlayConfigBean` bean that points to your overlay config file from step 1. Also create a bean for `openPdfEngine`. (see `alfresco-sdk-aca-sample\sample-platform\src\main\config\alfresco\module\com.tsgrp.opencontent\opencontent-override-overlay-spring-config.xml` in sample SDK project for reference)

## How to deploy Alfresco custom content model in Alfresco Content Accelerator

Once you create a Custom Amp, the next step is to deploy it to an Alfresco container and validate that the Amp is applied correctly. For more information see [Install Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

When the Custom Amp is deployed successfully:

* If a default Amp custom model was installed, a `sample_document` is deployed. The custom content type can be found in the **ACA Admin Console**.
![AMP custom model]({% link content-accelerator/images/ACA_amp-custom-model.png %})
   * Select the document type and configure the properties as required.
   * Click **Save Config** at the bottom of the page to save and apply the changes.
* If a default Amp custom aspect was installed, a `sample_aspect` is deployed. It can be added to the **Non-Mandatory Aspect** section in the **ACA Admin Console**.
![AMP custom aspect]({% link content-accelerator/images/ACA_amp-custom-aspect.png %})
   * Select the aspect and configure the properties as required.
   * Click **Save Config** at the bottom of the page to save and apply the changes.

The newly created Object Type and Non-Mandatory Aspect can be used to create new forms in ACA. For more information see [Admin Guide]({% link content-accelerator/latest/configure/admin-guide.md %}).