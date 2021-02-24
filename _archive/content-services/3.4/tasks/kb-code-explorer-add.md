---
author: Alfresco Documentation
---

# Adding Alfresco Explorer configuration

Plugging in your Alfresco Explorer configurations enables the additional property sheets, wizards, and icons for your Knowledge Base space content type and Knowledge Base aspects.

1.  Define customizations for Alfresco Explorer as follows:

    Add the file web-client-config-knowledgebase-custom.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension.

    web-client-config-knowledgebase-custom.xml

    ```
    <alfresco-config>
    
       <!--  Configuration for the kb:article aspect -->
       <config evaluator="aspect-name" condition="kb:article">
    
          <!-- Display the kb:article properties -->
          <property-sheet>
             <separator name="sep" display-label="Knowledge Base Article Properties" 
                        component-generator="HeaderSeparatorGenerator"
                        show-in-edit-mode="false"/>
             <show-property name="kb:articletype" display-label="Article Type" 
                            show-in-edit-mode="true" />
          </property-sheet>
          
       </config>
    
       <!-- Configuration for the kb:status aspect -->
       <config evaluator="aspect-name" condition="kb:status">
       
          <!-- Display the kb:status property -->
          <property-sheet>
             <show-property name="kb:status" display-label="KB Status" 
                            show-in-edit-mode="true" />
          </property-sheet>
       </config>
    
       <!--  Configures the space wizards -->
       <config evaluator="string-compare" condition="Space Wizards">
       
          <!-- Allow for the creation of kb:folder instances -->
          <folder-types>
             <type name="kb:space" icon="/images/icons/space-icon-pen.gif" />
          </folder-types>
    
       </config>
       
       <!-- Configures the action wizards -->
       <config evaluator="string-compare" condition="Action Wizards">
       
          <!-- Allow the kb:article aspect to be added and removed -->
          <aspects>
             <aspect name="kb:article"/>
          </aspects>
          
       </config>
       
       <!-- Specify icon for the kb:space instances -->
       <config evaluator="string-compare" condition="kb:space icons">
          <icons>
             <icon name="space-icon-pen" path="/images/icons/space-icon-pen.gif" />
          </icons>
       </config>
    
    </alfresco-config>
    ```

2.  Bootstrap the Alfresco Explorer configurations into Explorer as follows:

    Add the file web-client-config-knowledgebase-context.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension.

    web-client-config-knowledgebase-context.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 
    'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
    
    <!--  Bootstraps the Web client configuration -->
    <bean id="kb.extension.webClientBootstrap" 
          class="org.alfresco.web.config.WebClientConfigBootstrap" 
          init-method="init">
       <property name="configs">
          <list>
             <value>
                classpath:alfresco/extension/web-client-config-knowledgebase-custom.xml
             </value>
          </list>
       </property>
    </bean>
    
    </beans>
    
     
    ```


**Parent topic:**[Getting started](../concepts/kb-about.md)

