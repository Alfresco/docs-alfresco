---
author: Alfresco Documentation
---

# Importing Users/Groups

A module can create users or groups as part of its initialization. This can be achieved by via creation of an import file containing the users/groups you want to import and then including these via the module context file.

This example shows an import file that creates a group:

```
  
  
    <?xml version="1.0" encoding="UTF-8"?>
    <view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
      xmlns:cm="http://www.alfresco.org/model/content/1.0"
      xmlns:sys="http://www.alfresco.org/model/system/1.0"
      xmlns:usr="http://www.alfresco.org/model/user/1.0"
      xmlns:app="http://www.alfresco.org/model/application/1.0">
      
      <usr:authorityContainer view:childName="usr:GROUP_MyGroup">
        <view:aspects>
          <sys:referenceable></sys:referenceable>
        </view:aspects>
        <view:properties>
          <sys:store-protocol>user</sys:store-protocol>
          <cm:name>GROUP_MyGroup</cm:name>
          <sys:node-uuid>GROUP_MyGroup</sys:node-uuid>
          <usr:authorityName>GROUP_MyGroup</usr:authorityName>
          <sys:store-identifier>alfrescoUserStore</sys:store-identifier>
        </view:properties>
        <view:associations></view:associations>
      </usr:authorityContainer>
    </view:view>


```

This group can then be imported by adding the following bean definition to the module-context.xml:

```

  
    <bean id="myModule_bootstrapGroups" class="org.alfresco.repo.module.ImporterModuleComponent" parent="module.baseComponent">
      <property name="moduleId" value="myModuleId" />
      <property name="name" value="nameGivenToImport" />
      <property name="description" value="descriptionOfThisImport" />
      <property name="sinceVersion" value="1.0" />        
      <property name="appliesFromVersion" value="1.0" />  
      <property name="importer" ref="userBootstrap"/>
      <property name="bootstrapViews">
        <list>
          <props>
            <prop key="path">/${alfresco_user_store.system_container.childname}/sys:authorities</prop>
            <prop key="location">alfresco/module/myModuleId/myGroupImport.xml</prop>
          </props>
        </list>
      </property>
    </bean>
  

```

Since 3.1, authorities are now in the spaces store, and groups should be associated to zones.

This example shows an import file that creates a group:

```

  
    <?xml version="1.0" encoding="UTF-8"?>
    <view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
      xmlns:cm="http://www.alfresco.org/model/content/1.0"
      xmlns:sys="http://www.alfresco.org/model/system/1.0"
      xmlns:usr="http://www.alfresco.org/model/user/1.0"
      xmlns:app="http://www.alfresco.org/model/application/1.0">
      
      <view:reference view:pathref="${system.authorities_container.childname}">
        <view:associations>
          <sys:children>
            <cm:authorityContainer view:childName="cm:GROUP_MyGroup">
              <view:aspects>
                <sys:referenceable />
              </view:aspects>
              <view:properties>
                <sys:node-uuid>GROUP_MyGroup</sys:node-uuid>
                <cm:name>GROUP_MyGroup</cm:name>
                <cm:authorityName>GROUP_MyGroup</cm:authorityName>
              </view:properties>
            </cm:authorityContainer>
          </sys:children>
        </view:associations>
      </view:reference>
      
      <view:reference view:pathref="${system.zones_container.childname}/cm:AUTH.ALF">
        <view:associations>
          <cm:inZone>
            <view:reference
              view:pathref="${system.authorities_container.childname}/cm:GROUP_MyGroup"
              view:childName="cm:GROUP_MyGroup" />
          </cm:inZone>
        </view:associations>
      </view:reference>
      
      <view:reference view:pathref="${system.zones_container.childname}/cm:APP.DEFAULT">
        <view:associations>
          <cm:inZone>
            <view:reference
              view:pathref="${system.authorities_container.childname}/cm:GROUP_MyGroup"
              view:childName="cm:GROUP_MyGroup" />
          </cm:inZone>
        </view:associations>
      </view:reference>
    </view:view>


```

This group can then be imported by adding the following bean definition to the module-context.xml:

```

  
    <bean id="myModule_bootstrapGroups" class="org.alfresco.repo.module.ImporterModuleComponent" parent="module.baseComponent">
      <property name="moduleId" value="myModuleId" />
      <property name="name" value="nameGivenToImport" />
      <property name="description" value="descriptionOfThisImport" />
      <property name="sinceVersion" value="1.0" />        
      <property name="appliesFromVersion" value="1.0" />   
      <property name="importer" ref="spacesBootstrap"/>
      <property name="bootstrapViews">
        <list>
          <props>
            <prop key="path">/${alfresco_user_store.system_container.childname}</prop>
            <prop key="location">alfresco/module/myModuleId/myGroupImport.xml</prop>
          </props>
        </list>
      </property>
    </bean>
    

```

**Parent topic:**[Modules](../concepts/dev-extensions-modules-intro.md)

