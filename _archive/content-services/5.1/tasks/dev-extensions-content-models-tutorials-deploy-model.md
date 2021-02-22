---
author: Alfresco Documentation
---

# Creating a content model

You can create new content model using the Alfresco SDK.

Use the Alfresco SDK to build and deploy a new content model. In this tutorial you will see how to implement a [bootstrap deployment](deploy-bootstrap.md).

1.  Create a new [All-in-One SDK project](alfresco-sdk-tutorials-all-in-one-archetype.md).

    The new project already contains a sample model that you can change to suit your needs.

2.  In your IDE, examine the file repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/bootstrap-context.xml.

    This is the Spring Bean configuration file for your new content model:

    ```
                    
    <?xml version='1.0' encoding='UTF-8'?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
              http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">
    
        <!-- The bootstrap-context.xml file is used for patch definitions, importers, 
             workflow, and loading custom content models.  -->
    
    
        <!-- Registration of new models -->
        <bean id="custommodel.dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
            <property name="models">
                <list>
                    <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
                    <value>alfresco/module/${project.artifactId}/model/workflow-model.xml</value>
                </list>
            </property>
        </bean>
    </beans>
    ```

    This Spring bean links to your model file. It causes the model to extend the existing model, rather than replace it. The bean definition indicates that this model is to use a bootstrap deployment, which will require a server restart in order to take effect.

3.  In your IDE, open the file repo-amp/src/main/amp/config/alfresco/module/repo-amp/model/content-model.xml.

    This is your new custom model. Replace the contents with the following text:

    ```
      
                            
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!-- Definition of new Model -->
    
    <!-- The important part here is the name - Note: the use of the my: namespace
         which is defined further on in the document -->
    <model name="my:contentModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">
    
       <!-- Optional meta-data about the model -->   
       <description>Example Custom Model</description>
       <author>Alfresco Documentation Team</author>
       <version>1.0</version>
    
       <!-- Imports are required to allow references to definitions in other models -->   
       <imports>
          <!-- Import Alfresco Dictionary Definitions -->
          <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
          <!-- Import Alfresco Content Domain Model Definitions -->
          <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
       </imports>
    
       <!-- Introduction of new namespaces defined by this model -->
       <!-- NOTE: The following namespace my.new.model should be changed to reflect your own namespace -->
       <namespaces>
          <namespace uri="http://www.mycompany.com/model/content/1.0" prefix="my"/>
       </namespaces>
       
       <types>
        <!--  Enterprise-wide generic document type -->
            <type name="my:doc">
                <title>MyCompany Generic Document</title>
                <parent>cm:content</parent>    
            </type>    
            <type name="my:marketingDoc">
                <title>MyCompany Marketing Document</title>
                <parent>my:doc</parent>    
            </type>    
            <type name="my:whitepaper">
                <title>MyCompany Whitepaper</title>
                <parent>my:marketingDoc</parent>    
            </type>         
       </types>
    </model>  
    ```

    This is the custom model that will extend the existing core model framework. The model adds three new types of document, a generic company document, a marketing document, and a whitepaper.

4.  Run the [run.sh](../concepts/alfresco-sdk-cmd-reference-aio.md) command to deploy your new model.

5.  Check for any errors in the log file.

6.  Log into Share as admin. Check that login works as expected.


You have seen how to create a Maven archetype for your content model and deploy it in bootstrap mode.

**Parent topic:**[Content model tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

