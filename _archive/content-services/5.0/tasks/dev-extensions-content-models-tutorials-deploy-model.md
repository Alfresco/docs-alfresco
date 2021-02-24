---
author: Alfresco Documentation
---

# Deploy a model

You can conveniently create and deploy a new content model project from within Eclipse.

**Important:** We no longer recommend using Ant to build your projects, as the Alfresco SDK \(Maven\) is now available and fully supported. This tutorial has since [been rewritten](http://docs.alfresco.com/5.1/tasks/dev-extensions-content-models-tutorials-deploy-model.html) to use the Alfresco SDK.

You will create a project in Eclipse and use it to build and deploy your new content model. In this tutorial you will see how to implement a [bootstrap deployment](deploy-bootstrap.md).

1.  In Eclipse use **File** \> **New** \> **Project** to create a new Java Project.

2.  In the Eclipse Package Explorer, create a new folder called config.

3.  In the folder config create a new folder called alfresco.

4.  In the newly created alfresco folder, create a new folder called extension.

5.  In the extension folder create a new XML file, custom-model-context.xml.

    This is the Spring Bean configuration file for your new content model.

6.  Add the following contents to the file custom-model-context.xml:

    ```
    
                            
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
     
    <beans>
    
        <!-- Registration of new models -->	
        <bean id="custommodel.dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
            <property name="models">
                <list>
                    <value>alfresco/extension/customModel.xml</value>
                </list>
            </property>
        </bean>
              
    </beans>
                        
    ```

    This Spring bean links to your model file. It causes the model to extend the existing model, rather than replace it. The bean definition indicates that this model is to use a bootstrap deplyment, which will require a server restart in order to take effect.

7.  Now create the model file in the extension folder, customModel.xml, with the following contents:

    ```
    
                            
    <?xml version="1.0" encoding="UTF-8"?>
    
    <!-- Definition of new Model -->
    
    <!-- The important part here is the name - Note: the use of the my: namespace
         which is defined further on in the document -->
    <model name="my:custommodel" xmlns="http://www.alfresco.org/model/dictionary/1.0">
    
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

8.  In the CustomContentModel folder create a new file, build.xml, with the following contents:

    ```
    
                            
    <?xml version="1.0" encoding="UTF-8"?>
    <project default="deploy-jar">
    
    	<!-- Set these as required -->
    	<property name="jar.name" value="MyCompanyContentModel.jar"/>	
    	<property name="jar.deploy.dir" value="/Applications/alfresco-4.3.0/tomcat/shared/lib"/>	
    
    	<property name="project.dir" value="."/>
    	<property name="build.dir" value="${project.dir}/build"/>
    	<property name="jar.file" value="${build.dir}/lib/${jar.name}"/>
    
    	<target name="mkdirs">
    		<mkdir dir="${build.dir}/lib" />
    	</target>
    	
    	<target name="package-jar" depends="mkdirs">
    		<jar destfile="${jar.file}" >
    			<fileset dir="${project.dir}/config" includes="**/*" />
    		</jar>
    	</target>
    	
    	<target name="deploy-jar" depends="package-jar">
    		<copy file="${jar.file}" todir="${jar.deploy.dir}"/> 
    	</target>
    	
    	<target name="clean">
    		<delete file="${jar.file}"/>
    		<delete file="${jar.deploy.dir}/${jar.name}"/>
    	</target>
    
    </project>
                            
                            
                        
    ```

    This is the Ant build file required to build your project. Notice that the model files are placed in a JAR file that is copied to the tomcat/shared/lib folder. While in this particular example the project uses an Ant file for simplicity, the project could also be created using the [Maven SDK](../concepts/alfresco-sdk-intro.md).

9.  Right-click the newly created build.xml file in the Eclipse Package Explorer and select **Run As** \> **Ant Build** to build the JAR containing the model.

10. You will now need to restart Alfresco. As this is a bootstrap deployment a restart is required before the model will take effect.

    As Alfresco restarts check for any errors in the log file.

11. Log into Share as admin. Check that login works as expected.


You have seen how to create an Eclipse project for your content model and deploy it in bootstrap mode.

**Parent topic:**[Content Model Tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

