---
author: Alfresco Documentation
---

# Alfresco Share Document Library repository tier

In order to preserve existing customizations and third party add-ons, a parallel set of data web scripts has been developed for Alfresco 4.0 and later to coexist with the previous data web scripts. These new web scripts are located in the `remote-api` project and have URLs starting with `/slingshot/doclib2/`.

There are three extension points supported by the repository data web scripts.

## 1. Document Library custom response

A custom response appears within the `metadata.custom` section of the JSON response. An example of a cleanly installed service is the `vtiServer` configuration, defined within the slingshot-context.xml file.

The `customResponses` property defines a map of JSON key to custom response bean within the `SlingshotDocLibCustomerResponse` bean definition.

Default `slingshotDocLibCustomResponse` bean configuration:

```


<bean id="slingshotDocLibCustomResponse"
       parent="baseJavaScriptExtension"
       class="org.alfresco.repo.jscript.SlingshotDocLibCustomResponse">
  <property name="extensionName">
     <value>slingshotDocLib</value>
  </property>
  <property name="<b>customResponses</b>">
    <map>
       <entry key="vtiServer">
          <ref bean="doclibCustomVtiServer"/>
       </entry>
    </map>
  </property>
</bean>
  

```

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

The `VtiServerCustomResponse` class \(which implements `CustomResponse`\) returns a Serializable object \(for example a `LinkedHashMap`\) that is serialized into the JSON response by the DocLib web scripts.

This extension point is designed to return useful information that is not specific to any node, for example, the presence of an optional module; whether a subsystem is active or not, etc.

## 2. Property decorators

The other place the data web scripts may be extended is via the property decorator extension mechanism.

To add a new property decorator, the baseDecorator bean needs to be extended with the property decorator you wish to use. For example:

```

        
      <bean id="customPropertyDecorator" parent="baseDecorator" class="org.alfresco.repo.jscript.app.UsernamePropertyDecorator">
        <property name="nodeService" ref="nodeService"/>
        <property name="personService" ref="PersonService" />
        <property name="propertyNames">
          <set>
            <value>ds:uploader</value>
          </set>
        </property>
      </bean>
      
      
```

## 3. Permissions list

The third place the data web script response can be extended is by using the list of permissions that are returned for each node. These are defined by using the `userPermissions` property on the `applicationScriptUtils` bean. For example:

```
  
        
<property name="<b>userPermissions</b>">
  <list>
      <value>CancelCheckOut</value>
      <value>ChangePermissions</value>
      <value>CreateChildren</value>
      <value>Delete</value> 
      <value>Write</value>
  </list>
</property>


```

The default set of permissions should not be reduced without fully understanding the impact on actions, indicators, and metadata evaluators already in use throughout Share.

**Parent topic:**[Extending the Alfresco Share Document Library](../concepts/Share-Doclib-Extend-Intro.md)

