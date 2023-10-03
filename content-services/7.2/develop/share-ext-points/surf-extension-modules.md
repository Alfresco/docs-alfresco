---
title: Surf Extension Modules Extension Point
---

Surf Extension Modules are the main tool to use when adding, updating, or hiding content in the Share User Interface (UI). 
They can be deployed and un-deployed during runtime. A module is defined in XML and stored in the `site-data/extensions` directory.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

Working with Surf extension modules assume a certain knowledge of the Surf UI development framework. Make sure that you 
have read through the [Surf framework]({% link content-services/7.2/develop/software-architecture.md %}#surf-framework) 
information in the software architecture section.

This section covers the following:

* Introduction to Surf Extension Modules
* Module deployment
* Module dependencies
* Module configuration

Surf extension modules are the preferred way of customizing many of the Alfresco Share user interface features.

If you look in the `tomcat/webapps/share/WEB-INF/classes/alfresco` directory of your Content Services installation, 
then you’ll notice a number of files ending with `-config.xml`, such as for example `share-config.xml`. These files contain 
configuration that is loaded into a Spring bean when Content Services starts and is accessed by Share code to 
dictate many different aspects of its behavior.

To customize this configuration you would **not** normally change these files directly, but instead make your changes 
in the `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml` file, which overrides the default configuration 
in the exploded Share webapp. Changes to `web-extension/share-config-custom.xml` can be done at runtime and take effect 
after a Share Web Script Refresh. However, there is no way from the UI to disable or enable configuration, you need file 
system access. There is also no easy and straight forward way to split up the configuration in different units, name 
them, and version them.

Further on, with the `web-extension/share-config-custom.xml` file it is not possible to work with Surf pages and components. 
You can for example not add a component to a page, update a component, or hide a component.

This is where *Spring Surf Extension Modules* comes into the picture, they enable dynamic control of the Share 
configuration at runtime from the user interface. Extension Modules also give you full control over a Surf Page in 
that you can add, update, and remove components that it is made up of. These modules can be deployed and un-deployed 
without restarting the server. Note however that installing a new module requires a server restart.

Extension modules makes it more straight forward to organize, name, version, and manage your configuration. Instead of 
having everything in one long `share-config-custom.xml` file, configuration can now be named and kept in different modules 
so it is easy for an Administrator to deploy and un-deploy different configuration settings at runtime.

Each module is processed for every request that comes into the Share web application to determine what configuration that 
should be applied. If a module should only be processed for certain requests, then 
[evaluators]({% link content-services/7.2/develop/share-ext-points/evaluators.md %}) can be used to determine when a 
module should be processed. This is an improvement to how the `share-config-custom.xml` configuration works, which is 
applied to all requests and you cannot add any evaluators.

Extension modules are defined in XML files that are stored under the `tomcat/shared/classes/alfresco/web-extension/site-data/extensions` directory.

Now, look at how to use an extension module to implement a Share customization. The following sample customization hides 
the External User Invite functionality in a site. The following picture illustrates the component to hide in the Invite Users page:

![dev-extensions-share-module-sample-hide-external-user-invite]({% link content-services/images/dev-extensions-share-module-sample-hide-external-user-invite.png %})

To hide this component, find out the `region-id`, `source-id`, and `scope` so it can be used when defining the 
extension module. You can find this information by using a tool called SurfBug 
([more info on how to enable this tool]({% link content-services/7.2/develop/tools.md %})#surfbug). When this 
tool is enabled, after refreshing the page, red lines will show up and mark the different components on the page:

![dev-extensions-share-module-sample-hide-external-user-invite-surfbug]({% link content-services/images/dev-extensions-share-module-sample-hide-external-user-invite-surfbug.png %})

Clicking the component area brings up an information window with all the Surf data that we need:

![dev-extensions-share-module-sample-hide-external-user-invite-surfbug-props]({% link content-services/images/dev-extensions-share-module-sample-hide-external-user-invite-surfbug-props.png %})

When we know the Surf component information it is easy to define an extension module that target the 
**...Add External Users** component:

```xml
<extension>
    <modules>
        <module>
            <id>Hide Add External Users</id>
            <auto-deploy>true</auto-deploy>
            <components>
                <component>
                    <region-id>addemail</region-id>
                    <source-id>invite</source-id>
                    <scope>template</scope>
                    <sub-components>
                        <sub-component id="default">
                            <evaluations>
                                <evaluation id="disable-add-external-users">
                                    <render>false</render>
                                </evaluation>
                            </evaluations>
                        </sub-component>
                    </sub-components>
                </component>
            </components>
        </module>
    </modules>
</extension>    
```

For more information about this module configuration see 
[controlling rendering of components]({% link content-services/7.2/tutorial/share/pages.md %}#removecontent).

Besides manipulating the components of a Web Page you can also do the following with Surf Extension Modules:

```xml
<extension>
    <modules>
        <module>
            <id>Override Document Library</id>
            <auto-deploy>true</auto-deploy>
            <configurations>
                <config evaluator="string-compare" condition="DocumentLibrary">
                    <create-content>
                         <content id="plain-text" mimetype="text/plain" label="Create an Acme Document" itemid="acme:doc"/>
                    </create-content>
                </config>
```

Here we are including a Document Library configuration in the same way we would do it in the 
`tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml` file (this specific configuration adds a new 
menu item called **Create an Acme Document** under the **Create...** button in the toolbar in the Document Library). 
The next example shows how you can override a Web Script implementation:

```xml
<extension>
    <modules>
        <module>
            <id>Override Document Library</id>
            <auto-deploy>true</auto-deploy>
            <customizations>
                <customization>
                    <targetPackageRoot>org.alfresco.components.documentlibrary</targetPackageRoot>
                    <sourcePackageRoot>org.alfresco.training.components.documentlibrary.customization</sourcePackageRoot>
```

So in this case we are saying that the Surf Web Script implementations located in the `org.alfresco.components.documentlibrary` 
package, which is a standard Web Script location, will be overridden by custom Web Script files located in the 
`org.alfresco.training.components.documentlibrary.customization` package. Finally it is also possible to bring in 
extra web resource via an extension module:

```xml
<extension>
    <modules>
        <module>
            <id>Override Document Library</id>
            <auto-deploy>true</auto-deploy>
            <customizations>
                <customization>
                    <targetPackageRoot>org.acme</targetPackageRoot>
                    <dependencies>
                        <css>/res/demo/dependencies/styles.css</css>
                        <js>/res/demo/dependencies/script.js</js>
                    </dependencies>
```

The following table compares `share-config-custom.xml` with Surf Extension modules:

|Task|share-config-custom.xml?|Surf Extension Module?|
|----|------------------------|----------------------|
|Override default configuration in `tomcat/webapps/share/WEB-INF/classes/*-config.xml` files|YES|YES|
|Add, Update, and Hide components on a Surf Page|NO|YES|
|Override Spring Surf Web Scripts|NO|YES|
|Load Web Resources (CSS, JS)|YES|YES|
|Deploy and Un-Deploy configuration from UI|NO|YES|
|Group configuration into named packages|NO|YES|
|Keep different versions of a configuration package|NO|YES|

## Module deployment and evaluators {#moduledeployandevaluators}

You can deploy Surf Extension Modules and change their behavior using evaluators.

Surf Extension Modules can be deployed using the facility provided at `http://localhost:8080/share/page/modules/deploy`. 
Available modules are listed and can be deployed by selecting the module, clicking **Add**, and then clicking **Apply Changes**.

Once a deployed module is selected, an evaluator can be selected, and its properties set, using the same interface, as 
shown in the following screen capture:

![dev-extension-share-module-deployment-screenshot-1]({% link content-services/images/dev-extension-share-module-deployment-screenshot-1.png %})

The mechanism shown allows the default module operation to be overridden.

The functionality of a deployed module might not be applicable to every request, so it is possible to associate an 
evaluator with a module. The evaluator runs to evaluate whether or not the request is applicable to the module. 
Surf will automatically apply the default evaluator on each request. When you deploy the module you have the option of 
using the default evaluator, or selecting another, which might be a custom written evaluator.

The default module evaluator is configured in the Spring application context with the `id` `default.extensibility.evaluator`. 
This maps to the class `org.springframework.extensions.surf.extensibility.impl.ApproveAllModulesEvaluator` which will 
always evaluate to true.

Another evaluator available as standard has the bean `id` of `config.approval.evaluator`. If you select this as the 
evaluator when deploying a module you will see that it asks for a single property with the key `apply` which determines 
whether or not the target module gets applied. If you set the value of `apply` to `true` then the module will always be 
applied, if you set it to anything else then the Module will never be applied.

>**Note:** If you make changes to the evaluator and its properties on the Module Deployment page in Share, it is important to click **Update** to update the module configuration and then **Apply Changes** to persist these changes.

It is important to note that many evaluators are never configured from this user interface. Instead they are included 
in the component definition, with no human interaction needed. The evaluator will instead use data from the repository, 
or somewhere else, to determine if the component should be rendered or not.

Here is an example of a search instructions component that is added to the search page. It has an evaluator defined, 
so when the module is deployed via the UI there is no need to configure an evaluator manually:

```xml
<extension>
    <modules>
        <module>
            <id>Custom Search Instructions</id>
            <components>
                <component>
                    <region-id>search</region-id>
                    <source-id>search</source-id>
                    <scope>page</scope>
                    <sub-components>
                        <sub-component id="custom-search-instructions" index="25">
                            <url>/alfresco/training/search/instructions</url>
                            <evaluations>
                                <evaluation id="HideIfDisplaySearchInstructionsIsFalse">
                                    <evaluators>
                                        <evaluator type="org.alfresco.training.hideSearchInstructions"></evaluator>
                                    </evaluators>
                                    <render>false</render>
                                </evaluation>
                            </evaluations>
                        </sub-component>
                    </sub-components>
                </component>
            </components>
        </module>
    </modules>
</extension>
```

### Auto-deploying modules

Surf Extension Modules can be deployed automatically.

While it is possible to deploy Surf Extension Modules manually using the user interface, it is 
also possible to have them deployed automatically after they have been installed and the server is started. Automatic 
deployment can happen in two ways, either all modules are deployed automatically, or they are deployed automatically if 
the module requests it. This can be summarized as:

1.  All modules are automatically deployed
2.  All modules are manually deployed
3.  All modules are manually deployed, except for those modules that request to be deployed automatically. **This is the default configuration**.

In the file ﻿`tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml` of a standard Alfresco install, you will 
find the following XML:

```xml
<config evaluator="string-compare" condition="WebFramework">
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

```xml
<auto-deploy>true</auto-deploy>   
```

This would be located in the module's configuration, for example:

```xml
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

## Module dependencies

Dependencies such as additional CSS and JavaScript code can be included in a Surf Extension Module.

Surf Extension Modules can include dependencies such as CSS and JavaScript files. This content is then linked to from 
the `<head>` element of the targeted web script.

An example is given here:

```xml
<module>
   <id>Add dependencies</id>
   <customizations>
      <customization>
         <targetPackageRoot>org.acme</targetPackageRoot>
         <dependencies>
            <css>/res/demo/dependencies/styles.css</css>
            <js>/res/demo/dependencies/script.js</js>
         </dependencies>
      </customization>
   </customizations>
</module>          
```

A target package is specified and when a web script declared at that package is invoked, then the dependencies will be 
included as imports into the `<head>>` element of that page.

## Module dynamic configuration

You can dynamically configure modules.

Alfresco Share uses the Surf configuration service extensively to control its behavior. This is usually achieved through 
the files ending with the suffix `-config.xml` in the `webapps/share/WEB-INF/classes/alfresco` directory. Changes to these 
configuration files will not be picked up until next server restart. However, it is possible to change configuration of 
a Surf Extension Module by changing the module configuration file, and redeploying the module.

The following example demonstrates a module that replaces the Document Library's Flash enablement configuration for any 
site with the URL `noflash`:

```xml
<extension>
   <modules>
      <module>
         <id>Site_Conditional_Flash</id>
         <description>Applies config based on site id</description>
         <evaluator type="site.module.evaluator">
            <params>
               <sites>noflash</sites>
               <sitePresets>.*</sitePresets>
            </params>
         </evaluator>
         <configurations>
            <config evaluator="string-compare" condition="DocumentLibrary" replace="true">
               <file-upload>
                  <adobe-flash-enabled>false</adobe-flash-enabled>
                  <in-memory-limit>262144000</in-memory-limit>
                  <maximum-file-size-limit>0</maximum-file-size-limit>
               </file-upload>
            </config>
         </configurations>
      </module>
   </modules>
</extension>         
      
```

The original configuration can be found in `webapps/share/WEB-INF/classes/alfresco/share-documentlibrary-config.xml`:

```xml
<!--
    File upload configuration
-->
<file-upload>
    <!--
    Adobe Flash???
    In certain environments, an HTTP request originating from Flash cannot be authenticated using an existing session.
    See: http://bugs.adobe.com/jira/browse/FP-4830
    For these cases, it is useful to disable the Flash-based uploader for Share Document Libraries.
    -->
    <adobe-flash-enabled>true</adobe-flash-enabled>
    
    <!--
    In order to support drag-and-drop file upload a browser must be able to support the HTML5 drag-and-drop events, however
    if the browser does not support the FormData type (that allows streamed multipart file uploads) then all files need to be
    loaded into the browser's memory before being uploaded to the server. In order to prevent potential memory related errors,
    a limit is set for the sum of all file sizes being uploaded in a single operation (specified in bytes).
    As of April 2011, the only known browser that requires this restriction is Firefox 3.6.
    -->
    <in-memory-limit>262144000</in-memory-limit>

    <!--
    The maximum number of bytes per file that Share will allow to be uploaded.
    A value of 0 means that any size is allowed.
    -->
    <maximum-file-size-limit>0</maximum-file-size-limit>
</file-upload>
```

>**Important:** Note that when **replacing** configuration (with the `replace` attribute), it is important to preserve any of the original configuration (from the `-config.xml` file) you want to retain. In this case the memory limit and upload file size have been retained.

If `replace` is not used, then the configurations are “added” sequentially. For example:

```xml
<adobe-flash-enabled>true</adobe-flash-enabled>
<in-memory-limit>262144000</in-memory-limit>
<maximum-file-size-limit>0</maximum-file-size-limit>
<adobe-flash-enabled>false</adobe-flash-enabled>
<in-memory-limit>262144000</in-memory-limit>
<maximum-file-size-limit>0</maximum-file-size-limit>
```

In this case the second `<adobe-flash-enabled>` element would be ignored as only the **first** occurrence would be used.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-data/extensions` (Untouched by re-deployments and upgrades)

## Deployment All-in-One SDK project

* aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions

## Tutorials

* [Surf page tutorials]({% link content-services/7.2/tutorial/share/pages.md %})
* [Extend an out-of-the-box Surf Widget (YUI)]({% link content-services/7.2/tutorial/share/doclib.md %}#customizesurfwidget)
* [Add a new menu item to "Create..." menu in DocLib]({% link content-services/7.2/tutorial/share/doclib.md %}#addmenuitem2createmenu)
* [Customizing the Share Header Style (Aikau)]({% link content-services/7.2/tutorial/share/style.md %}#customizeshareheaderstyle)
* [Adding JS packages (Aikau)]({% link content-services/7.2/tutorial/share/amd.md %})
