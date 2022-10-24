---
title: Extension Content Accelerator (Custom Amp)
---

The Extension Content Accelerator is a generic content accelerator that a client can make to add custom configurations and code to an existing accelerator. 

## How to add the Extension Content Accelerator onto existing Accelerators
There are a few requirements that your custom amp must meet to work with the existing accelerators.
1. The amp configuration and code must reside under `alfresco/module/com.alfresco.aca.accelerator.extension` to be properly picked up
2. Any overrides for ACA properties must reside in a file named `opencontent-extension-override-placeholders.properties`
3. Any overrides or additions to the ACA bean configurations need to reside in a file named `opencontent-extension-override-config.xml`. Note that you can have this file reference other xml config files but ACA will only specifically look for this file
4. Name the module context file for the extension `opencontent-extension-override-module-ctx.xml`

### How to override ACA overlay configurations in the custom amp
To override the ACA default overlay configurations, the custom amp will need to inject a file called `opencontent-override-overlay-spring-config.xml` into the `alfresco/module/com.tsgrp.opencontent` location. This file should contain similar looking beans to this:
```xml
<?xml version="1.0" encoding="UTF-8" ?>

<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

	<bean id="overlayConfigBean" class="com.tsgrp.openoverlay.core.XmlConfigFactory" factory-method="createInstance">
		<!-- Spring note - even though these elements are 'constructor-arg' elements, they are really params for the createInstance factory method -->
		<constructor-arg value="path to custom oc overlay configurations.xml" />
		<constructor-arg value="default" />
	</bean>	
	
	<!-- 
		iText Overlay Engine
	-->
	<bean id="openPdfEngine" name="overlayEngine" class="com.tsgrp.openoverlay.openpdf.OpenPdfOverlayEngine" init-method="onInit">
		<property name="overlayConfig">
			<ref bean="overlayConfigBean" />
		</property>
	</bean>
</beans>
```

### How to add custom Alfresco models into the custom amp
To add custom alfresco models you will need to define a bean that has a parent of `dictionaryModelBootstrap` and depends-on `dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap` in the aca extension accelerators module context file. This bean will need to extend any models that other accelerators would need. For instance, this is what it might look like to add onto the claims or pnp accelerators:
```xml
<bean id="accelerator-extension-dictionaryBootstrap" parent="dictionaryModelBootstrap"	depends-on="dictionaryBootstrap,com.tsgrp.openContent.dictionaryBootstrap">
   <property name="models">
      <list>
         <value>alfresco/extension/model/customModel.xml</value>
     </list>
   </property>
</bean>
```
### Example Extension Amp
https://git.tsgrp.com/root/alfresco-accelerators/-/tree/master/com.alfresco.accelerator.demo/com.alfresco.accelerator.demo-platform/src