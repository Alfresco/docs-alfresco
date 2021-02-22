---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [permissions, security]
---

# Defining permissions

Permissions and their groupings are defined in an XML configuration file. The default file is found in the distribution configuration directory as <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\permissionDefinitions.xml. This configuration can be replaced or extended and has a structure as described in <installLocation\>\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco\\model\\permissionSchema.dtd.

The following example uses the permission definitions related to the Ownable aspect.

```
<!-- ============================================== -->
   <!-- Permissions associated with the Ownable aspect -->
   <!-- ============================================== -->
   
   <permissionSet type="cm:ownable" expose="selected">
      
      <!-- Permission control to allow ownership of the node to be taken from others -->
      <permissionGroup name="TakeOwnership" requiresType="false" expose="false">
        <includePermissionGroup permissionGroup="SetOwner" type="cm:ownable" />
      </permissionGroup>
       
      <permissionGroup name="SetOwner" requiresType="false" expose="false"/>
      
      <!-- The low level permission to control setting the owner of a node -->
      <permission name="_SetOwner" expose="false" requiresType="false">
        <grantedToGroup permissionGroup="SetOwner" />
        <requiredPermission on="node" type="sys:base" name="_WriteProperties" />
      </permission>
      
</permissionSet>
```

Permissions and permission groups are defined in a permission set, which is a sub-element of the permissions root element. A permission set is associated with a type or aspect and applies only to that type and sub-types, or aspect and sub-aspects.

A permission has a name. By convention, the names of permissions start with an underscore character. They may be exposed in the administration pages of Alfresco Explorer and Alfresco Share but, usually, are not. A permission, in its definition, may be granted to any number of permission groups. This means that those permission groups will include the permission. The permission may require that the type or aspect specified on the permission set be present on the node. If a permission is associated with an aspect and the requiresType property is set to true then if that aspect is not applied to a node, the permission does not apply to that node either. If an aspect-related permission definition has the requiresType property set to false, the permission applies to any node, even if the aspect has not been applied to the node.

An aspect can be applied at any time and there are no restrictions as to which aspects can be applied to a type. A permission may also require other permissions be tested on the same node, its children, or its parent. In the example, \_SetOwner requires \_WriteProperties. This means you cannot set ownership on a node if you are not allowed to write to its properties. You can also use this to check that all children can be deleted before deleting a folder, or to enforce that you can only read nodes for which you can read all the parents; neither are normally required in Alfresco. The configuration to do this is present in the standard configuration file but is commented out. The \_DeleteNode permission definition \(as shown in the following code snippet\) is an example. If permission A requires permission B and this requirement is implied \(by setting the implies attribute of the requiredPermission element to true\), assigning an authority permission A will also give them permission B \(as opposed to checking they have permission B\).

```
<permission name="_DeleteNode" expose="false" >
    <grantedToGroup permissionGroup="DeleteNode" />
    <!-- Commented out parent permission check ...
    <requiredPermission on="parent" name="_ReadChildren" implies="false"/>
    <requiredPermission on="parent" name="_DeleteChildren" implies="false"/>
    <requiredPermission on="node" name="_DeleteChildren" implies="false"/>
     -->
    <!-- Recursive delete check on children --> 
    <!--  <requiredPermission on="children" name="_DeleteNode" implies="false"/>  -->
</permission>
```

Permissions are normally hidden inside permission groups. Permission groups are made up of permissions and other permission groups. By convention, each permission has a related permission group. Permission groups can then be combined to make other permission groups. As for permissions, a permission group may be exposed by the administration pages of Alfresco Explorer and Alfresco Share and may require the presence of a type or aspect to apply to a particular node. In addition, a permission group may allow full control, which grants all permissions and permission groups. As a type or aspect may extend another, a permission group defined for a type or aspect can extend one defined for one of its parent types and be assigned more permissions, include more permission groups, or change what is exposed in the administration pages of the Alfresco Explorer and Alfresco Share web clients.

It is unusual to extend or change the default permission model unless you are adding your own types, aspects, and related public services or you wish to make minor modifications to the existing behavior. The following code snippets show how to extend and replace the default permission model.

```
<bean id='permissionsModelDAO'
class="org.alfresco.repo.security.permissions.impl.model.PermissionModel" init-method="init">
        <property name="model">
<-- <value>alfresco/model/permissionDefinitions.xml</value> -->
<value>alfresco/extension/permissionDefinitions.xml</value>
        </property>
        <property name="nodeService">
            <ref bean="nodeService" />
        </property>
        <property name="dictionaryService">
            <ref bean="dictionaryService" />
        </property>
</bean>
```

The preceding code example shows how to replace the default permission model with one located in the alfresco/extension directory. The following code snippet shows how to extend the existing model.

```
<bean id="extendPermissionModel" parent="permissionModelBootstrap">
   <property name="model" value="alfresco/extension/permissionModelExtension.xml" /> 
</bean>
```

**Parent topic:**[Setting up Alfresco authentication and security](../concepts/auth-intro.md)

