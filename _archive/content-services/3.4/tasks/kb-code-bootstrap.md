---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: knowledge base
---

# Overriding the message bundle bootstrap component

To include a custom message bundle along with the Alfresco Share message bundles to support I18N with a new site preset, override the Spring bean responsible for doing so.

1.  Define custom Spring beans or Spring bean overrides for Alfresco Share as follows:

    Add the file custom-slingshot-application-context.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension

    custom-slingshot-application-context.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 
      'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
    
       <bean id="webscripts.resources"      
             class="org.alfresco.i18n.ResourceBundleBootstrapComponent">
          <property name="resourceBundles">
             <list>
                <value>alfresco.messages.webscripts</value>
                <value>alfresco.messages.slingshot</value>
                <value>alfresco.web-extension.messages.kbsite</value>
             </list>
          </property>
       </bean>
    
    </beans>
    ```

2.  Overwrite any file with the same name.


**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

