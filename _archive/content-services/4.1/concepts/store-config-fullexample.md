---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: Content store selector example
---

# Content Store Selector full configuration example

The following example shows the full definition of creating new stores using the Content Store Selector.

This configuration must be saved as an extension, for example, <extension\>\\sample-content-store-selector-context.xml.

**Note:** The list of stores available can be set by updating the list under the `<property name="storesByName">` property.

```
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

<beans>

   <bean id="firstSharedFileContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.root}/storeA</value>
      </constructor-arg>
   </bean>

   <bean id="secondSharedFileContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.root}/storeB</value>
      </constructor-arg>
   </bean>

   <bean id="storeSelectorContentStore" parent="storeSelectorContentStoreBase">
       <property name="defaultStoreName">
            <value>default</value>
       </property>
       <property name="storesByName">
           <map>
               <entry key="default">
                   <ref bean="fileContentStore" />
               </entry>
               <entry key="storeA">
                   <ref bean="firstSharedFileContentStore" />
               </entry>
               <entry key="storeB">
                   <ref bean="secondSharedFileContentStore" />
               </entry>
          </map>
       </property>
   </bean>

<!-- Point the ContentService to the 'selector' store -->
   <bean id="contentService" parent="baseContentService">
      <property name="store">
         <ref bean="storeSelectorContentStore" />
      </property>
   </bean>

   <!-- Add the other stores to the list of stores for cleaning -->
   <bean id="eagerContentStoreCleaner" class="org.alfresco.repo.content.cleanup.EagerContentStoreCleaner" init-method="init">
      <property name="eagerOrphanCleanup" >
         <value>${system.content.eagerOrphanCleanup}</value>
      </property>
      <property name="stores" >
         <list>
            <ref bean="fileContentStore" />
            <ref bean="firstSharedFileContentStore" />
            <ref bean="secondSharedFileContentStore" />
         </list>
      </property>
      <property name="listeners" >
         <ref bean="deletedContentBackupListeners" />
      </property>
   </bean>
   
</beans>
```

**Customization for Alfresco Explorer:**

The following example shows the configuration of the `cm:storeSelector` aspect using the web-client-config-custom.xml file:

```
<!-- Configuring in the cm:storeSelector aspect -->
<config evaluator="aspect-name" condition="cm:storeSelector">
  <property-sheet>
   <show-property name="cm:storeName" component-generator="StoreSelectorGenerator" />
  </property-sheet>
</config>
<config evaluator="string-compare" condition="Action Wizards">
  <aspects>
   <aspect name="cm:storeSelector"/>
  </aspects>
</config>
```

Enable the sample file by removing the .sample extension.

**Customization for Alfresco Share:**

The following example shows the configuration of the `cm:storeSelector` aspect using the share-config-custom.xml file:

```
<!-- Example config to expose the storeSelector in Share. This should be merged with your existing share-config-custom.xml -->

<!-- Configuring in the cm:storeSelector aspect -->
   <config evaluator="node-type" condition="cm:content">
      <forms>
         <form>

            <field-visibility>
            <!-- aspect: cm:storeSelector -->
            <show id="cm:storeName" />

            </field-visibility>
            <appearance>
               <!-- Store Selector -->
               <field id="cm:storeName" label="Store Name" description="Content Store Name" />
            </appearance>
         </form>
      </forms>
   </config>
   
   <config evaluator="string-compare" condition="DocumentLibrary" replace="true">
     <aspects>
         <!-- Aspects that a user can see -->
         <visible>
            <aspect name="cm:storeSelector" />
         </visible>
     </aspects>
   </config>
```

**Parent topic:**[The Content Store Selector](../concepts/store-manage-content.md)

