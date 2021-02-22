---
author: Alfresco Documentation
---

# Adding the Knowledge Base content model

Introducing the Knowledge Base content model to the Alfresco repository informs Alfresco how to deal with your Knowledge Base content types and aspects.

1.  Define the Knowledege Base content model as follows:

    Add the file kbModel.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension

    kbModel.xml

    ```
    <?xml version="1.0" encoding="UTF-8"?> 
    
    <!-- --> 
    <!-- Knowledge Base Content Model --> 
    <!-- --> 
    
    <model name="kb:contentmodel" xmlns="http://www.alfresco.org/model/dictionary/1.0"> 
      
    <!-- Metadata about the model --> 
      <description>Knowledge Base Content Model</description> 
      <author>alfresco_professional</author> <version>1.0</version> 
     
     <!-- Imports are required to allow references to definitions in other models --> 
      <imports>
         <!-- Import Alfresco Dictionary Definitions --> 
        <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/> 
        <!-- Import Alfresco Content Domain Model Definitions --> 
        <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/> 
      </imports>
     
      <!-- Define the URI and Prefix for this content model --> 
      <namespaces> 
        <namespace uri="http://www.alfresco.org/model/knowledgebase/1.0" prefix="kb"/> 
      </namespaces> 
      
      <!-- Define constraints --> 
      <constraints> 
       
       <!-- Ensures that one of the allowed values is assigned --> 
        <constraint name="kb:status_constraint" type="LIST"> 
          <parameter name="allowedValues"> 
            <list> 
              <value>Draft</value> 
              <value>Pending Approval</value> 
              <value>Current</value> 
              <value>Archived</value> 
            </list> 
           </parameter> 
      </constraint> 
     
       <!-- Ensures that one of the allowed values is assigned --> 
        <constraint name="kb:articletype_constraint" type="LIST"> 
          <parameter name="allowedValues"> 
            <list> 
              <value>Any</value> 
              <value>Article</value> 
              <value>FAQ</value> 
              <value>White Paper</value> 
            </list> 
          </parameter> 
        </constraint> 
      </constraints> 
     
     <!-- Content Types --> 
      <types> 
        <type name="kb:space"> 
          <title>Knowledge Base Space</title> 
          <parent>cm:folder</parent> 
        </type> 
       </types> 
    
      <!-- Aspects --> 
      <aspects>
       <!-- Marks a content item as having status --> 
        <aspect name="kb:status"> 
          <title>Knowledge Base Status</title> 
          <properties> 
    
        <!-- Adds a new metadata property to the KB article --> 
        <!-- Constrains the value --> <property name="kb:status"> 
          <title>Status</title> 
          <type>d:text</type> 
          <default>Draft</default> 
        <constraints> 
        <constraint ref="kb:status_constraint" /> 
        </constraints> 
          </property> 
        </properties> 
      </aspect> 
    
       <!-- Marks a content item as a KB Article --> 
        <aspect name="kb:article"> 
          <title>Knowledge Base Article</title> 
          <properties> 
    
          <!-- Adds a new metadata property to the KB article --> 
          <!-- Constrains the value --> 
            <property name="kb:articletype"> 
              <title>Article Type</title> 
              <type>d:text</type> 
              <default>Article</default> 
              <constraints> 
                <constraint ref="kb:articletype_constraint" /> 
            </constraints> 
          </property> 
      </properties> 
    
        <!-- Content with this aspect also receive kb:status aspect --> 
        <mandatory-aspects> 
          <aspect>kb:status</aspect> 
        </mandatory-aspects> 
        </aspect>
       </aspects> 
      </model> 
    ```

2.  Bootstrap the Knowledge Base content model into the Alfresco repository as follows:

    Add the file kbModel-model-context.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension

    kbModel-model-context.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 
    'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    
    <!-- Registration of new models -->
     <bean id="kbmodel.extension.dictionaryBootstrap" 
       parent="dictionaryModelBootstrap"  
          depends-on="dictionaryBootstrap">
      <property name="models">
        <list>
         <value>alfresco/extension/kbModel.xml</value>
        </list>
       </property>
     </bean>
    
    </beans>
     
    ```


**Parent topic:**[Getting started](../concepts/kb-about.md)

