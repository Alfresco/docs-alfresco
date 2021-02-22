---
author: Alfresco Documentation
---

# Setting up the CenteraContentStore as the main store

To set up the CenteraContentStore to be the main store, it is recommended that you also configure the primary store as a CachingContentStore.

See [Configuring CachingContentStore](ccs-config.md) for more information.

This setup relates to new content and cannot be applied retrospectively, unless all content is moved from the file system to EMC Centera.

1.  Create xam-custom-context.xml file in the <extension\> directory.

    For example, <installLocation\>/tomcat/shared/classes/alfresco/extension.

2.  Copy the `org_alfresco_module_centera_centeraContentStore` bean from <installLocation\>/tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org\_alfresco\_module\_xamconnector/module-context.xml file.

    For example:

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
    
        <bean id="org_alfresco_module_centera_centeraContentStore" class="org.alfresco.enterprise.repo.content.centera.CenteraContentStore" init-method="init">
    
            <property name="readOnly" value="false" />
            <property name="centeraConnection" ref="org_alfresco_module_centera_centeraConnection"/>
            <property name="contentFieldName" value="${xam.archive.contentFieldName}"/>
    
        </bean>
    
    </beans>
    ```

3.  Paste the bean in to the newly created xam-custom-context.xml file.

4.  Change the bean id to `fileContentStore`.

    For example:

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
    
        <bean id="fileContentStore" class="org.alfresco.enterprise.repo.content.centera.CenteraContentStore" init-method="init">
    
            <property name="readOnly" value="false" />
            <property name="centeraConnection" ref="org_alfresco_module_centera_centeraConnection"/>
            <property name="contentFieldName" value="${xam.archive.contentFieldName}"/>
    
        </bean>
    
    </beans>
    ```

5.  Add the following property to alfresco-global.properties file.

    ```
    xam.archive.contentFieldName=com.alfresco.content
    ```

6.  Start Alfresco server.


**Parent topic:**[Installing and configuring the Alfresco EMC Centera Connector](../concepts/centera-intro.md)

