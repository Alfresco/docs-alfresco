---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Alfresco Explorer]
keyword: [Explorer, customize]
---

# Customizing Alfresco Explorer configuration items

There are several different ways that you can customize the Explorer configuration items. The Explorer configuration file is called web-client-config-custom.xml.

-   Modify the Explorer configuration file in the <extension\> directory.

    1.  Open the <extension\>\\web-client-config-custom.xml file.

    2.  Uncomment any <config\> items that you want to enable.

    3.  Save the file.

-   Modify the Explorer configuration file in the repository.

    1.  Browse to the following space: Company Home \> Data Dictionary \> Web Client Extensions.

    2.  Open the web-client-config-custom.xml file.

    3.  Uncomment any <config\> items that you want to enable.

    4.  Save the file.

        Use this method to edit a file directly in the repository and then to reload it using the Explorer. This means that you do not have to restart the server and applies versions to the configuration changes.

-   Modify the Explorer configurations within an AMP file.

    1.  Open the module-context.xml file.

    2.  Add the following bean definition:

        ```
         <bean id="myModule_configBootstrap" class="org.alfresco.web.config.WebClientConfigBootstrap" init-method="init">
              <property name="configs">
                <list>
                   <value>classpath:alfresco/module/myModuleId/my-web-client-custom.xml</value>
                </list>
              </property>
           </bean>
        ```

    3.  Save the file.


**Parent topic:**[Customizing Alfresco Explorer](../concepts/dev-explorer.md)

