---
author: Alfresco Documentation
---

# Add aspect with Share configurations

In this tutorial you will add an aspect to your model.

This tutorial assumes you have completed the previous tutorials in this series.

You will see how to create an aspect and add it to your model. An aspect provides an additional way to classify content.

1.  In Eclipse, load customModel.xml into the editor.

2.  Add the following after the `types` section:

    ```
    <aspects>
        <aspect name="my:publishToWeb">
        	<title>MyCompany Website</title>
        	<properties>
        		<property name="my:publishedDate">
        			<type>d:date</type>
        		</property>
        		<property name="my:isActive">
        			<type>d:boolean</type>
        			<default>false</default>
        		</property>
        	</properties>
        </aspect>
        <aspect name="my:clientRelated">
        	<title>MyCompany Client Metadata</title>
        	<properties>
        		<property name="my:clientName">
        			<type>d:text</type>
        			<mandatory>true</mandatory>
        		</property>
        		<property name="my:projectName">
        			<type>d:text</type>
        			<mandatory>false</mandatory>
        		</property>
        	</properties>
        </aspect>
    </aspects>                    
    
    ```

3.  In the next section of this tutorial you will add some configuration to Share to ensure that the aspect appears in the Share interface.
4.  Open the file ./tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml in your favorite editor.

5.  Find the following section in the file:

    ```
    <!--
             Used by the "Manage Aspects" action
    
             For custom aspects, remember to also add the relevant i18n string(s)
                 in the Alfresco repository: cm_model.aspect.cm_myaspect=My Aspect
          -->
          <aspects>
             <!-- Aspects that a user can see -->
             <visible>
                <aspect name="cm:generalclassifiable" />
                ...                        
    
    ```

6.  At the end of the list of aspects add any you wish to be able to apply to a document using the Share **Manage Aspects** action. In this case you will add the following:

    ```
    
        <!-- custom aspects -->
        <aspect name="my:publishToWeb" />
        <aspect name="my:clientRelated" />
        ...                     
                            
    ```

7.  Edit the file ./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot.properties to add suitable strings for the aspects. For example, in the aspects section you can add:

    ```
    
        aspect.my_publishToWeb=Web Publishable
        aspect.my_clientRelated=Client Related
    ```

8.  Right-click the build.xml file in the Eclipse Package Explorer and select **Run As** \> **Ant Build** to build the JAR containing the model and deploy it.

9.  You will now need to restart Alfresco in order to pick up the modified model and Share configurations.

10. Log back into Share and create a new piece of content. Add the type `Whitepaper` to the content.

11. Once the type has been changed click **Manage Aspects**. You can now apply the aspects **Web Publishable** and **Client Related** to the content.


The aspect has been created and deployed, along with suitable Share configurations.

**Parent topic:**[Content Model Tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

