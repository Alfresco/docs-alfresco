---
author: Alfresco Documentation
---

# Auto-deploying modules

Surf Extension Modules can be deployed automatically.

While it is possible to deploy Surf Extension Modules manually [using the user interface](surf-fwork-intro.md), it is also possible to have them deployed automatically after they have been installed and the server is started. Automatic deployment can happen in two ways, either all modules are deployed automatically, or they are deployed automatically if the module requests it. This can be summarized as:

1.  All modules are automatically deployed
2.  All modules are manually deployed
3.  All modules are manually deployed, except for those modules that request to be deployed automatically. **This is the default configuration**.

In the file ﻿tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml of a standard Alfresco install, you will find the following XML:

```
   
﻿   <config evaluator="string-compare" condition="WebFramework">
      <web-framework>
         <module-deployment>
            <!-- Allow extension modules with <auto-deploy> set to true to be automatically deployed -->
            <mode>manual</mode>
            <enable-auto-deploy-modules>true</enable-auto-deploy-modules>
         </module-deployment>
         <use-checksum-dependencies>true</use-checksum-dependencies>
         <generate-css-data-images>true</generate-css-data-images>
      </web-framework>
   </config>   
   
  
```

This sets the configuration so that modules are manually deployed unless they request to be automatically deployed.

A Surf Extension Module can configure itself to deploy automatically by using the following configuration:

```

   
<auto-deploy>true</auto-deploy>   
   
  
```

This would be located in the module's configuration, for example:

```

   
﻿<extension>
	<modules>
		<module>
			<id>New Content Module</id>
                     <auto-deploy>true</auto-deploy>   
			<components>
				<component>
					<region-id>footer</region-id>
					<source-id>global</source-id>
					<scope>global</scope>
					<sub-components>
						<sub-component id="New_Content" index="25">
							<url>/tutorials/new-content</url>
						</sub-component>
					</sub-components>
				</component>
			</components>
		</module>
...   
   
  
```

**Parent topic:**[Module deployment and evaluators](../concepts/dev-extensions-share-module-deployment.md)

