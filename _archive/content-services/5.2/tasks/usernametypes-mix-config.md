---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring Share for mixed user name types

When there is a mix of user name types, for example, some using the `@domain` in their user name, this may have an impact on the use of Share.

For example, there may be users with both the @domain and without:

-   `user2@domain.com`
-   `user1`

This configuration enables Share to function correctly when using mixed users types.

1.  Open the <web-extension\>/share-config-custom.xml file.

2.  Add the following bean:

    ```
    <bean id="webframework.slingshot.persister.remote" class="org.springframework.extensions.surf.persister.PathStoreObjectPersister" parent="webframework.sitedata.persister.abstract">
        <property name="store" ref="webframework.webapp.store.remote" />
        <property name="pathPrefix"><value>alfresco/site-data/${objectTypeIds}</value></property>
        <property name="tenantObjectCache"><value>false</value></property>
    </bean>           
    ```

3.  Save the file, and restart the Alfresco server.


**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

