---
title: Admin Console Component Extension Point
---

Extension modules that needs some form of administration interface can be supported by a custom Admin Console Component.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

The [Repo Admin Console]({% link content-services/7.2/admin/admin-console.md %}) provides a way of managing services integrated into Alfresco, 
or built on as extensions. Installed modules can have a custom Admin Console component, so that they can be managed 
from the well-known interface of the Admin Console. You will see how to create a custom Admin Console component that 
displays already available MBean data but in a different layout. Displaying custom MBean data will be done in the same way.

The finished result will look something like this:

![dev-extensions-repo-admin-console-component-custom]({% link content-services/images/dev-extensions-repo-admin-console-component-custom.png %})

Here you have added a new section called **Custom Stuff** and as a sub-section we have **Customized Admin Console - Tutorial**. 
The custom page displays information already available in other sections, but is laid out differently.

A custom component is added by implementing a [Repository web scripts]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}). 
The descriptor is as follows:

```xml
<webscript>
   <shortname>Customized Admin Console - Tutorial</shortname>
   <description>Admin Console WebScript that displays a simple page.></description>
   <url>/enterprise/admin/admin-tutorial</url>
   <family>AdminConsole</family>
   <format default="html">argument</format>
   <authentication>admin</authentication>
   <lifecycle>internal</lifecycle>
   <transaction allow="readonly">required</transaction>
</webscript>
```

There are several important things here that control if this component is going to work correctly and be visible on the 
Admin Console page:

* **url** - the Admin Console is available only in the Alfresco Enterprise edition, and as the name suggests, for administrators. So the `url` should begin with `/enterprise/admin`
* **family** - if the custom component is going to be visible at all, then it needs to belong to the `AdminConsole` web scripts `family`
* **authentication** - the Admin Console is for administrators only so `authentication` should be set to `admin`

You will be able to access this Admin Console component page directly via the 
`http://localhost:8080/alfresco/service/enterprise/admin/admin-tutorial` url, this can be useful when we just want to 
make sure the page (i.e. web scripts) works.

With this descriptor you have a component that will be added to the Admin Console page automatically, and by default 
located just under the **System Summary** section. To have the new component listed under a specific section you need 
to store the web scripts at a specific directory path. For example, to add your component to the **Consoles** section, 
you need to store the component web scripts in the `alfresco/extension/templates/webscripts/org/alfresco/enterprise/repository/admin/consoles` 
directory. If you wanted it located in the **Support Tools** section you should store it in the `.../admin/support-tools` 
directory and so on. To have the new component located in a new section like **Custom Stuff** you create a new directory 
that does not previously exist, such as `.../admin/custom-stuff` in our case.

You can then localize the section name by providing a resource file with the following property set:

```text
admin-console.tool.group.custom-stuff=Custom Stuff
```

When the descriptor is finished and located in the appropriate directory you can continue with the web scripts controller:

```xml
<import resource="classpath:alfresco/enterprise/webscripts/org/alfresco/enterprise/repository/admin/admin-common.lib.js">
Admin.initModel(
   "Alfresco:Name=License",
   ["Subject", "LicenseMode", "Issued", "RemainingDays"],
   "admin-tutorial"
);
```

What you do here is let the Admin Console system know what MBean properties you want to use in our custom component. 
In this case it is the "Subject", "LicenseModel", "Issued", and "RemainingDays" properties.

These properties are available in the MBean called "License", you can see it by running **JConsole** and connecting to 
Content Services:

![dev-extensions-repo-admin-console-mbeans]({% link content-services/images/dev-extensions-repo-admin-console-mbeans.png %})

After the controller you implement the web scripts template, which contains the page layout:

```xml
<#include "/org/alfresco/enterprise/repository/admin/admin-template.ftl" />

<@page title=msg("tutorial.title")>
   
   <div class="column-full">
      <@section label=msg("tutorial.column") />
      <#-- tutorial - Retrieve keys - which are attribute names - use to index into attribute hash -->
      <#list attributes?keys as a>
         <@control attribute=attributes[a] />
      </#list>
   </div>
   
   <div class="column-left">
      <@section label=msg("tutorial.leftcolumn") />
      <#-- tutorial - Retrieve values - which are attributes -->
      <#list attributes?values as a>
         <@control attribute=a />
      </#list>
   </div>
   <div class="column-right">
      <@section label=msg("tutorial.rightcolumn") />
      <#-- tutorial - Retrieve values - which are attributes -->
      <#list attributes?values as a>
         <@control attribute=a />
      </#list>
   </div>
   
</@page>
```

Here you loop through the MBean properties (attributes), you can also obtain them directly like this:

```xml
<@control attribute=attributes["Subject"] />
```

The template uses a number of resource properties that are fetched with the `msg` function.

The web scripts i18n resource file need to have them specified as follows:

```text
tutorial.title=Customized Admin Console Page
tutorial.column=Main Column
tutorial.leftcolumn=Left Column
tutorial.rightcolumn=Right Column
```

This is all there is to it. If you have your own services and module components exposing MBeans, then you can display 
and control them in a similar way, just change the controller to point to the MBean and the properties you want to display.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/extension/templates/webscripts/...` see SDK project below for directory path - Descriptor, JavaScript controller, template, properties files (Untouched by re-deployments and upgrades)

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/resources/alfresco/extension/templates/webscripts/org/alfresco/enterprise/repository/admin/[general|support-tools|consoles|email-services|repository-services|user-directories|virtual-file-systems|{custom section id}]` - Descriptor, JavaScript controller, template, properties files
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages/some-admin.console.properties` - properties used in the web scripts template
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml` - i18n resource loading Spring Bean

## More Information

* [Using the Repo Admin Console]({% link content-services/7.2/admin/admin-console.md %})

## Sample Code

* [Source code for the example in the above description.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-admin-console-component-repo){:target="_blank"}
* [Source code for the Alfresco Support Tools add-on.](https://github.com/Alfresco/alfresco-support-tools){:target="_blank"} - this extension project adds a lot of extra components to the admin console, so worth reading through to get ideas on how different admin console customizations can be done.
