---
author: Alfresco Documentation
---

# Import strategy

There are several import strategies that can be used to import module data.

If you know the UUID\(s\) of the spaces/files you are importing, you can choose from a number of import strategies.

If you are using XML, you will have to manually add a `sys:node-uuid` tag to that node. \(Generated ACP files automatically contain the UUIDs.\)

Example:

```

  
    <view:properties>
      <sys:node-uuid>b7c6b88a-e5fd-4ccf-b134-69a2460c3b89</sys:node-uuid>
      ...
    </view:properties>
    </cm:content>
    </cm:contains>
    </cm:folder>
    </view:view>
    

```

You can add the following: CREATE\_NEW, CREATE\_NEW\_WITH\_UUID, REMOVE\_EXISTING, REPLACE\_EXISTING, UPDATE\_EXISTING, THROW\_ON\_COLLISION \(org.alfresco.service.cmr.view.ImporterBinding.UUID\_BINDING\). This can be added globally for entire bean, or per bootstrap view.

**Global for the entire bean:**

```

  
    <bean id="myModule.bootstrap" 
      class="org.alfresco.repo.module.ImporterModuleComponent" 
      parent="module.baseComponent">
      <property name="uuidBinding">
        <value>REPLACE_EXISTING</value>
      </property>
      ...


```

**Per BootstrapView:**

```

  
      <property name="bootstrapViews">
        <list>
          <props>
            <prop key="uuidBinding">UPDATE_EXISTING</prop>
            <prop key="path">/${spaces.company_home.childname}/${spaces.dictionary.childname}</prop>
            <prop key="location">alfresco/module/yourmodule/bootstrap/myimport.acp</prop>
          </props>
          ...
        </list>
      </property>
    </bean>
    

```

Space Names Reference

The following are the substitution tokens that can be used for bootstrapping purposes. These tokens can be redefined in the configuration files if needed.

|spaces.store|workspace://SpacesStore|
|spaces.company\_home.childname|Company Home|
|spaces.guest\_home.childname|Guest Home|
|spaces.dictionary.childname|Data Dictionary|
|spaces.templates.childname|Space Templates|
|spaces.templates.content.childname|Content Templates|
|spaces.templates.email.childname|Email Templates|
|spaces.templates.rss.childname|RSS Templates|
|spaces.savedsearches.childname|Saved Searches|
|spaces.scripts.childname|Scripts|
|spaces.wcm.childname|WCM|
|spaces.wcm\_content\_forms.childname|Web Forms|
|spaces.content\_forms.childname|Web Forms|
|spaces.user\_homes.childname|User Homes|

**Parent topic:**[Importing Module Data](../concepts/dev-extensions-modules-importing-module-data.md)

