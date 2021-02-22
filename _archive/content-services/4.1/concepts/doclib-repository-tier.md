---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, Repository tier]
---

# Alfresco Share Document Library repository tier

In order to preserve existing customizations and third party add-ons, a parallel set of data web scripts has been developed for Version 4.0 to coexist with the previous data web scripts. These new web scripts are located in the remote-api project and have URLs starting with **/slingshot/doclib2/**.

There are three extension points supported by the repository data web scripts.

## 1. Document Library custom response

A custom response appears within the **metadata.custom** section of the JSON response. An example of a cleanly installed service is the **vitServer** configuration, defined within the slingshot-context.xml file.

The `customResponses` property defines a map of JSON key to custom response bean within the `SlingshotDocLibCustomerResponse` bean definition.

```
<bean id="slingshotDocLibCustomResponse"
       parent="baseJavaScriptExtension"
       class="org.alfresco.repo.jscript.SlingshotDocLibCustomResponse">
    <property name="extensionName">
       <value>slingshotDocLib</value>
    </property>
    <property name="**customResponses**">
      <map>
         <entry key="vtiServer">
            <ref bean="doclibCustomVtiServer"/>
         </entry>
      </map>
    </property>
    </bean>

```

*Default `slingshotDocLibCustomResponse` bean configuration*

The bean for returning the **vtiServer** configuration is defined as:

```
<bean id="doclibCustomVtiServer" class="org.alfresco.repo.jscript.app.VtiServerCustomResponse">
    <property name="scriptUtils">
        <ref bean="utilsScript" />
    </property>
    <property name="sysAdminParams">
        <ref bean="sysAdminParams" />
    </property>
    <property name="port">
        <value>${vti.server.external.port}</value>
    </property>
    <property name="host">
        <value>${vti.server.external.host}</value>
    </property>
</bean>
```

*`DocLibVtiServer` bean configuration*

The `VtiServerCustomResponse` class \(which implements `CustomResponse`\) returns a Serializable object \(e.g. `LinkedHashMap`\) that is serialized into the JSON response by the DocLib web scripts.

This extension point is designed to return useful information that is not specific to any node, for example, the presence of an optional module; whether a subsystem is active or not, etc.

## 2. Property decorators

The other place the data web scripts may be extended is via the property decorator extension mechanism. These are used by the `org.alfresco.repo.jscript.ApplicationScriptUtils` class and allow properties such as `nodeRefs`, `usernames`, and `dates` to be returned in a much more usable state to the web tier. For example, the Share interface displays `usernames` using First- and Last-name, rather than just the username. By decorating the properties returned in the initial web script request, further requests are not necessary to obtain the missing data.

```
<bean id="applicationScriptUtils" parent="baseJavaScriptExtension"
class="org.alfresco.repo.jscript.ApplicationScriptUtils">   
  <property
        name="decoratedProperties">
        <map>
          <entry key="cm:creator">
            <ref bean="usernamePropertyDecorator"/>         
          </entry>
          <entry key="cm:modifier">
            <ref bean="usernamePropertyDecorator"/>
          </entry>
```

*Partial view of the `applicationScriptUtils` bean configuration*

The `decoratedProperties` property defines a map of short-format `QName` to decorator implementation bean. Each of these decorator beans implements the `PropertyDecorator` interface and returns a serializable map via the `decorate()` method. This map is then serialized into the JSON response for each node being returned by the web script request.

## 3. Permissions list

The third place the data web script response may be extended is via the list of permissions that are returned for each node. These are defined via the `userPermissions` property on the `applicationScriptUtils` bean. For example:

```
  <property name="**userPermissions**">
    <list>      
        <value>CancelCheckOut</value>      
        <value>ChangePermissions</value>      
        <value>CreateChildren</value>      
        <value>Delete</value>       
        <value>Write</value>  
    </list>
  </property>
```

*`userPermissions` property within the `applicationScriptUtils` bean configuration*

The default set of permissions should not be reduced without fully understanding the impact on actions, indicators, and metadata evaluators already in use throughout Share.

**Parent topic:**[Extending the Alfresco Share Document Library](../concepts/Share-Doclib-Extend-Intro.md)

