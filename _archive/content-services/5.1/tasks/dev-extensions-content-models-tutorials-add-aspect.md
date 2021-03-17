---
author: Alfresco Documentation
---

# Adding an aspect with Share configurations

In this tutorial you add an aspect to your model. An aspect provides an additional way to classify content.

Complete the previous tutorials in this series before attempting this one.

1.  In your IDE, open the file repo-amp/src/main/amp/config/alfresco/module/repo-amp/model/content-model.xml and load it into the editor.

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

3.  In the next section of this tutorial you add some configuration to Share to ensure that the aspect appears in the Share interface.
4.  Open the file share-amp/src/main/resources/META-INF/share-config-custom.xml in your editor.

5.  Find the following line in the file:

    ```
    <config evaluator="string-compare" condition="DocumentLibrary">
    
    ```

6.  Add a list of aspects add any you wish to be able to apply to a document using the Share **Manage Aspects** action. In this case, add the following text:

    ```
    
                  <!--
                       Used by "Manage Rules" -> "Add aspect" action.
                   
                       If an aspect has been specified without a title element in the content model,
                       or you need to support multiple languages,
                       then an i18n file is needed on the Repo AMP/JAR extension side for the aspect to
                       be visible when creating rules:
                   
                          custom_customModel.aspect.custom_myaspect.title=My Aspect
                   
                       Used by the "Manage Aspects" action.
                   
                       For the aspect to have a localised label add relevant i18n string(s) in a Share AMP/JAR extension:
                   
                          aspect.custom_myaspect=My Aspect
                    -->          
             <aspects>
                <!-- Aspects that a user can see -->
                <visible>
                    <!-- custom aspects -->
                    <aspect name="sc:webable" />
                    <aspect name="sc:productRelated" />
                </visible>
    
                <!-- Aspects that a user can add. Same as "visible" if left empty -->
                <addable>
                </addable>
    
                <!-- Aspects that a user can remove. Same as "visible" if left empty -->
                <removeable>
                </removeable>
            </aspects>
    ```

7.  Edit the file share-amp/src/main/amp/config/alfresco/web-extension/messages/share-amp.properties to add suitable strings for the aspects. For example, in the aspects section you can add:

    ```
    
        aspect.my_publishToWeb=Web Publishable
        aspect.my_clientRelated=Client Related                    
    ```

8.  Log back into Share and create a new piece of content. Add the type `Whitepaper` to the content.

9.  Once the type has been changed click **Manage Aspects**. You can now apply the aspects **Web Publishable** and **Client Related** to the content.


The aspect has been created and deployed, along with suitable Share configurations.

**Parent topic:**[Content model tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

