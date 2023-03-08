---
title: Permissions and roles Extension Point
---

Permissions and their groupings are defined in XML configuration files. The default files are found in the distribution 
configuration directory as `permissionDefinitions.xml` and `sitePermissionDefinitions.xml`. This configuration can be 
replaced or extended to create new permissions and roles.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

Content Services provides a handful of out-of-the-box roles with different levels of permissions in the repository: 

* **Consumer** - can read content
* **Contributor** - can create and upload content
* **Editor** - can read and update content
* **Collaborator** - can do everything except moving and deleting other users content
* **Coordinator** - full access

There is also a special role called **owner**, which is assigned the creator of a piece of content. The owner has 
full access to content he or she has created. We can set up content permissions for users and groups by using these roles. 
If we are setting up permissions within a site, then we have four site roles to work with:

* **Site Consumer** - can read content
* **Site Contributor** - can create and upload content
* **Site Collaborator** - can do everything except moving and deleting other users content
* **Site Manager** - full access

Now, sometimes these roles are not enough to set up the permissions we need. We can then configure custom permissions 
(could also be referred to as custom roles). Before creating new permissions and roles it is a good idea to get familiar 
with the [**permissionDefinitions.xml**](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/permissionDefinitions.xml){:target="_blank"} 
file format. The element defining a basic low level right is called **permission**. Here are a couple of examples of 
out-of-the-box permissions:

```xml
...
<permissionSet type="sys:base" expose="all" >
   ...                     
   <permission name="_ReadProperties" expose="false" >
      <grantedToGroup permissionGroup="ReadProperties" />
   </permission>
   <permission name="_ReadChildren" expose="false" >
      <grantedToGroup permissionGroup="ReadChildren" />
   </permission>
   <permission name="_WriteProperties" expose="false" >
      <grantedToGroup permissionGroup="WriteProperties" />
   </permission>
   ...
</permissionSet>   
...
```

So we can see that each permission has a `name` and an `expose` attribute. By convention a low level permission `name` 
will always start with an underscore (`_`). The full name includes the type `uri` from the outer `permissionSet`, such as 
for example `sys:base._ReadProperties`.

The `expose` attribute tells Content Services if this permission should be visible in the user interface. 
Note that a permission does not map one-to-one with a menu item or UI action. For example, there is no permission for 
downloading content. Instead the permissions are focused on what operation you are allowed to execute on a content item 
(node) in the Repository. To download content you will need the `_ReadContent` permission.

When defining permissions we also specify what permission group they should be part of.

Every permission that we define needs to be associated with a type or an aspect from the content model that it applies to. 
This is managed by grouping the permission definitions in a so called `permissionSet`, which specifies the type or aspect 
via the `type` attribute, in this case the `type` is set to `sys:base`, which is the base type in Content Services 
out-of-the-box content model, so these low level permissions are applicable to all content nodes.

Examples of low level **permissionGroup**s from the out-of-the-box ones:

```xml
...
<permissionSet type="sys:base" expose="all" >
   ... 
   <permissionGroup name="ReadProperties" expose="true" allowFullControl="false" />  
   <permissionGroup name="ReadChildren" expose="true" allowFullControl="false" />  
   <permissionGroup name="WriteProperties" expose="true" allowFullControl="false" />  
   <permissionGroup name="ReadContent" expose="false" allowFullControl="false" />  
   <permissionGroup name="WriteContent" expose="false" allowFullControl="false" /> 
   ...
</permissionSet>   
...
```

By convention there is one permission group per low level permission. The full name includes the type `uri` from the 
outer `permissionSet`, such as for example `sys:base.ReadProperties`.

We can find out how the public API methods map to the permission configuration by looking in the 
`public-services-security-context.xml` file. For example, the Content Service has the following access control set up:

```xml
...
<bean id="ContentService_security" class="org.alfresco.repo.security.permissions.impl.acegi.MethodSecurityInterceptor">
  <property name="authenticationManager"><ref bean="authenticationManager"/></property>
  <property name="accessDecisionManager"><ref local="accessDecisionManager"/></property>
  <property name="afterInvocationManager"><ref local="afterInvocationManager"/></property>
  <property name="objectDefinitionSource">
      <value>
         org.alfresco.service.cmr.repository.ContentService.getStoreTotalSpace=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.getStoreFreeSpace=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.getRawReader=ACL_METHOD.ROLE_ADMINISTRATOR
         org.alfresco.service.cmr.repository.ContentService.getReader=ACL_NODE.0.sys:base.ReadContent
         org.alfresco.service.cmr.repository.ContentService.getWriter=ACL_NODE.0.sys:base.WriteContent
         org.alfresco.service.cmr.repository.ContentService.isTransformable=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.getTransformer=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.getMaxSourceSizeBytes=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.getImageTransformer=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.transform=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.getTempWriter=ACL_ALLOW
         org.alfresco.service.cmr.repository.ContentService.*=ACL_DENY
      </value>
  </property>
</bean>   
...
```

Here we can see that getting the content for a node with `ContentService.getReader`, to for example download it, 
requires the `sys:base.ReadContent` permission.

There are also convenience groupings based on high level content operation type, such as `read`, `write`, `delete`:

```xml
...
<permissionSet type="sys:base" expose="all" >
   ... 
   <permissionGroup name="Read"  expose="true" allowFullControl="false">
        <includePermissionGroup type="sys:base" permissionGroup="ReadProperties"/>
        <includePermissionGroup type="sys:base" permissionGroup="ReadChildren"/>
        <includePermissionGroup type="sys:base" permissionGroup="ReadContent"/>
   </permissionGroup>
   <permissionGroup name="Write" expose="true" allowFullControl="false">
        <includePermissionGroup type="sys:base" permissionGroup="WriteProperties"/>
        <includePermissionGroup type="sys:base" permissionGroup="WriteContent"/>
   </permissionGroup>  
   ...
</permissionSet>   
...
```

Here we can also see a `type` attribute being used when including the low level permission groups. In this case the `type` 
attribute specifies from what `permissionSet` to include the `permissionGroup`. So far everything has been specified 
inside one `permissionSet` with type set to `sys:base`, so the permission groups will be included from it.

On top of the convenience groupings we have the groupings that could be said to represent roles, such as a `Collaborator`:

```xml
...
<permissionSet type="cm:cmobject" expose="selected">
   ... 
   <permissionGroup name="Consumer" allowFullControl="false" expose="true" >
       <includePermissionGroup permissionGroup="Read" type="sys:base" />
   </permissionGroup>
   <permissionGroup name="Contributor" allowFullControl="false" expose="true" >
       <includePermissionGroup permissionGroup="Consumer" type="cm:cmobject"/>
       <includePermissionGroup permissionGroup="AddChildren" type="sys:base"/>
       <includePermissionGroup permissionGroup="ReadPermissions" type="sys:base" />
   </permissionGroup>
   <permissionGroup name="Editor"  expose="true" allowFullControl="false" >
       <includePermissionGroup type="cm:cmobject" permissionGroup="Consumer"/>
       <includePermissionGroup type="sys:base" permissionGroup="Write"/>
       <includePermissionGroup type="cm:lockable" permissionGroup="CheckOut"/>
       <includePermissionGroup type="sys:base" permissionGroup="ReadPermissions"/>
   </permissionGroup>
   <permissionGroup name="Collaborator" allowFullControl="false" expose="true">
       <includePermissionGroup permissionGroup="Editor" type="cm:cmobject" />
       <includePermissionGroup permissionGroup="Contributor" type="cm:cmobject" />
   </permissionGroup>
   <permissionGroup name="Coordinator" allowFullControl="true" expose="true" />
   ...
</permissionSet>   
...
```

These "role" permission groups are what we work with from the user interface when setting up permissions. And they are 
applicable to all content of type `cm:cmobject`, which means files, folder, categories, links etc.

There are even more specific permission definitions for just file types and folder types:

```xml
...
<permissionSet type="cm:content" expose="selected">
   <permissionGroup name="Coordinator" extends="true" expose="true"/>
   <permissionGroup name="Collaborator" extends="true" expose="true"/>
   <permissionGroup name="Contributor" extends="true" expose="true"/>
   <permissionGroup name="Editor" extends="true" expose="true"/>
   <permissionGroup name="Consumer" extends="true" expose="true"/>
   <permissionGroup name="RecordAdministrator" extends="true" expose="false"/>
</permissionSet>
<permissionSet type="cm:folder" expose="selected">
   <permissionGroup name="Coordinator" extends="true" expose="true"/>
   <permissionGroup name="Collaborator" extends="true" expose="true"/>
   <permissionGroup name="Contributor" extends="true" expose="true"/>
   <permissionGroup name="Editor" extends="true" expose="true"/>
   <permissionGroup name="Consumer" extends="true" expose="true"/>
   <permissionGroup name="RecordAdministrator" extends="true" expose="false"/>
</permissionSet>
...
```

Here we can see another new attribute called `extends` being used. It can be used when we just want to extend an already 
existing permission group definition.

It is also worth having a look at the Alfresco Share site permissions defined in the 
[sitePermissionDefinitions.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/sitePermissionDefinitions.xml){:target="_blank"} 
file, they look like this:

```xml
...
<permissionSet type="st:site" expose="selected">
   <permissionGroup name="SiteManager" allowFullControl="true" expose="true" />
   
   <permissionGroup name="SiteCollaborator" allowFullControl="false" expose="true">
      <includePermissionGroup permissionGroup="Collaborator" type="cm:cmobject" />
   </permissionGroup>
   
   <permissionGroup name="SiteContributor" allowFullControl="false" expose="true">
      <includePermissionGroup permissionGroup="Contributor" type="cm:cmobject" />
   </permissionGroup>
   
   <permissionGroup name="SiteConsumer" allowFullControl="false" expose="true">
      <includePermissionGroup permissionGroup="Consumer" type="cm:cmobject" />
      <includePermissionGroup permissionGroup="ReadPermissions" type="sys:base" />
   </permissionGroup>
</permissionSet>
...
```

Here we can see that the site permissions (roles) basically just re-uses the standard permission groups. However, the 
`permissionSet` is targeted only at type `st:site`, and will not be applicable outside of a site. Also, note that the 
`Editor` role will not be available when working with site content.

Now, let's **define a custom permission** for publishing web content classified with the ACME Content Model 
([more info]({% link content-services/7.2/develop/repo-ext-points/content-model.md %})). We will assume we have a document library 
action that can be used to publish web content as follows:

```xml
<action id="alfresco.tutorials.permissions.publishToWeb"
        icon="webpublish"
        type="javascript"
        label="alfresco.tutorials.permissions.publishToWeb.label">
    <param name="function">onPublishToWeb</param>
    <permissions>
        <permission allow="true">WebPublishPermission</permission>
    </permissions>
</action>
```

As we can see, the document library action will only be available to someone having the `WebPublishPermission`. 
This custom permission is defined as follows:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE permissions PUBLIC '-//ALFRESCO//DTD PERMISSIONS//EN' 'permissionSchema.dtd'>
<permissions>
    <namespaces>
        <namespace uri="http://www.alfresco.org/model/system/1.0" prefix="sys"/>
        <namespace uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
        <namespace uri="http://www.acme.org/model/content/1.0" prefix="acme"/>
    </namespaces>

    <permissionSet type="acme:document" expose="selected">
        <!-- Permission group for base WebPublish permission -->
        <permissionGroup name="WebPublishPermission" expose="false" allowFullControl="false"/>
        <!-- Permission group representing Web Publishing role -->
        <permissionGroup name="WebPublisher" allowFullControl="false" expose="true">
            <includePermissionGroup permissionGroup="WebPublishPermission" type="acme:document"/>
        </permissionGroup>

        <!-- Base WebPublish permission -->
        <permission name="_WebPublishPermission" expose="false">
            <grantedToGroup permissionGroup="WebPublishPermission"/>
        </permission>
    </permissionSet>
</permissions>
```

The Web Publishing permission is defined inside a `permissionSet` for the `acme:document` type, so the permission will 
only be available when we **Manage Permissions** for a content node that has this type applied. Inside the permission 
set we define the permission groups first and then the specific permission, the order is important. Note that only 
the `WebPublisher` permission group is exposed and will be available when setting permissions from the 
**Manage Permissions** dialog in Share. The permission that we use in the document library action definition has to 
be the low level permission group (i.e. `WebPublishPermission`) that encloses the basic permission.

At this point there is no other permissions (roles) available for `acme:document` content, so we might want to define 
ACME specific roles for `Contributor`, `Collaborator` etc. Otherwise the users will not be able to work with the ACME document 
content in the way they are used to with `cm:content`. So let's add more roles for the `acme:document` type as follows:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE permissions PUBLIC '-//ALFRESCO//DTD PERMISSIONS//EN' 'permissionSchema.dtd'>
<permissions>
    <namespaces>
        <namespace uri="http://www.alfresco.org/model/system/1.0" prefix="sys"/>
        <namespace uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
        <namespace uri="http://www.acme.org/model/content/1.0" prefix="acme"/>
    </namespaces>

    <permissionSet type="acme:document" expose="selected">
        <permissionGroup name="WebPublishPermission" expose="false" allowFullControl="false"/>
        <permissionGroup name="WebPublisher" allowFullControl="false" expose="true">
            <includePermissionGroup permissionGroup="WebPublishPermission" type="acme:document"/>
        </permissionGroup>

        <!-- Out-of-the-box content specific roles. -->
        <permissionGroup name="AcmeCoordinator" allowFullControl="true" expose="true" />
        <permissionGroup name="AcmeCollaborator" allowFullControl="false" expose="true">
            <includePermissionGroup permissionGroup="Collaborator" type="cm:cmobject" />
        </permissionGroup>
        <permissionGroup name="AcmeEditor" allowFullControl="false" expose="true">
            <includePermissionGroup permissionGroup="Editor" type="cm:cmobject" />
        </permissionGroup>
        <permissionGroup name="AcmeContributor" allowFullControl="false" expose="true">
            <includePermissionGroup permissionGroup="Contributor" type="cm:cmobject" />
        </permissionGroup>
        <permissionGroup name="AcmeConsumer" allowFullControl="false" expose="true">
            <includePermissionGroup permissionGroup="Consumer" type="cm:cmobject" />
        </permissionGroup>

        <permission name="_WebPublishPermission" expose="false">
            <grantedToGroup permissionGroup="WebPublishPermission"/>
        </permission>
    </permissionSet>
</permissions>
```

Here we have added ACME specific roles for the out-of-the-box standard roles. If we got this new permission model in a 
file called for example `customPermissionDefinitions.xml`, then it can be bootstrapped into the Repository with the 
following Spring bean definition:

```xml
<bean id="org.alfresco.tutorial.customPermissionDefinitions" parent="permissionModelBootstrap">
  <property name="model" value="alfresco/module/${project.artifactId}/model/customPermissionDefinitions.xml"/>
</bean>

<!-- Override to add the new custom Web Publish permission -->
<bean id="baseJsonConversionComponent" abstract="true">
  <property name="nodeService" ref="NodeService"/>
  <property name="publicServiceAccessService" ref="PublicServiceAccessService" />
  <property name="namespaceService" ref="NamespaceService" />
  <property name="fileFolderService" ref="FileFolderService" />
  <property name="lockService" ref="LockService" />
  <property name="permissionService" ref="PermissionService" />
  <property name="contentService" ref="ContentService" />
  <property name="userPermissions">
      <list>
          <value>Unlock</value>
          <value>CancelCheckOut</value>
          <value>ChangePermissions</value>
          <value>CreateChildren</value>
          <value>Delete</value>
          <value>Write</value>
          <value>WebPublishPermission</value>
      </list>
  </property>
</bean>

```

The `WebPublishPermission` will unfortunately not be known to the Document Library and the action until we add it to the 
list of `userPermissions` by overriding the `baseJsonConversionComponent` bean as in the above code snippet.

The UI labels for the ACME roles are controlled by the following properties:

```
roles.webpublisher=Web Publisher
roles.acmecoordinator=ACME Coordinator
roles.acmecollaborator=ACME Collaborator
roles.acmeeditor=ACME Editor
roles.acmecontributor=ACME Contributor
roles.acmeconsumer=ACME Consumer
```

That is all that is needed to add new custom permissions.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/extension` - Permission model XML file and Spring context file loading it

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml` - Spring bean loading permission model
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/model/customPermissionDefinitions.xml` - Custom permission model
* You will also need a Share JAR to set labels for permission roles

## More Information

* [Some more info around defining permissions]({% link content-services/7.2/admin/security.md %}#definingpermissions)

## Sample Code

* [Custom permission (role) implementation (Repo AMP)](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-permission-repo){:target="_blank"}
* [Custom DocLib Action using custom permission (role) (Share AMP)](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-permission-share){:target="_blank"}
