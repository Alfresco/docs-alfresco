---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
option: store selector configuration example
---

# Content store selector configuration example

The following example defines two file stores, in addition to the standard default file store. By setting the `cm:storeName` property to either of these new stores or the default store, the content is automatically moved from its existing store to the relevant new store.

A summary of the procedure is as follows:

1.  Create a file called sample-content-store-selector-context.xml in the extension directory.
2.  Define two new file stores.
3.  Declare a `storeSelectorContentStore` to be the system's primary content store.
4.  Declare the mapping between the store name and store instances.
5.  Add the extra stores to the list to be handled by the `eagerContentStoreCleaner`.

1.  Open the sample-content-store-selector-context.xml file.

2.  Define the new file stores by adding the following bean definitions:

    ```
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
    ```

    This configuration snippet defines two new stores. The physical location is relative to the `dir.root` property defined in the alfresco-global.properties file.

3.  Declare the `storeSelectorContentStore` to be the primary content store by adding the following bean definition:

    ```
    <bean id="contentService" parent="baseContentService">
       <property name="store">
           <ref bean="storeSelectorContentStore" />
       </property>
    </bean>
    ```

4.  Declare the mapping between store names and store instances.

    ```
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
    ```

    The list of stores is defined by the `<property name="storesByName">` property. Any stores you want to be available to the `storeSelectorContentStore` should be listed under this property.


**Parent topic:**[Managing the content store](../concepts/store-manage-content.md)

