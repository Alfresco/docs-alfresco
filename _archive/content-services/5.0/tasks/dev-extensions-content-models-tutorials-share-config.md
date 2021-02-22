---
author: Alfresco Documentation
---

# Share configuration for custom types and properties

Share needs to be configured to display custom types. It is also possible to configure Share to display properties in a customized way \(the default is to display all properties\).

This tutorial assumes you have completed the preceding tutorials in the series.

Although you have deployed a custom model, created content of the custom type, search for it, and applied a custom property, it is necessary to carry out some configuration in order to allow Share to take advantage of these new types and properties. The custom configuration will be done in the usual file for custom Share configurations, tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml.

1.  Load tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml into your editor of choice.

2.  After the <alfresco-config\> tag place the folloiwng configuration:

    ```
    
                            
    	<!-- Form customization for whitepaper -->
    
    	<config evaluator="model-type" condition="my:whitepaper">
    		<forms>
    			<form>
    				<field-visibility>
    					<show id="cm:name" />
    					<show id="my:product" />
    					<show id="cm:title" force="true" />
    					<show id="cm:description" force="true" />
    				</field-visibility>
    			</form>
    		</forms>
    	</config>
    
    
    	<config evaluator="node-type" condition="my:whitepaper">
    		<forms>
    			<form>
    				<field-visibility>
    					<show id="cm:name" />
    					<show id="my:product" />
    					<show id="cm:title" force="true" />
    					<show id="cm:description" force="true" />
    				</field-visibility>
    			</form>
    		</forms>
    	</config>
    
    	<!-- End of Form customization for whitepaper -->
                            
                            
                        
    ```

    This piece of configuration indicates that Share should display four properties for the type `my:whitepaper`:

    -   `cm:name`
    -   `my:product`
    -   `cm:title`
    -   `cm:description`
    Of course any property supported by the type could be chosen to be displayed here.

3.  Further down in the file find the following configuration:

    ```
    
                            
    		<!-- Used by the "Change Type" action Define valid subtypes using the following 
    			example: <type name="cm:content"> <subtype name="cm:mysubtype" /> </type> 
    			Remember to also add the relevant i18n string(s): cm_mysubtype=My SubType -->
    		<types>
    			<type name="cm:content">
    			</type>
    
    			<type name="cm:folder">
    			</type>
    
    			<type name="trx:transferTarget">
    				<subtype name="trx:fileTransferTarget" />
    			</type>
    
    		</types>                        
                            
                        
    ```

4.  Replace the previous configuration with the following:

    ```
    
                            
    		<!-- Used by the "Change Type" action Define valid subtypes using the following 
    			example: <type name="cm:content"> <subtype name="cm:mysubtype" /> </type> 
    			Remember to also add the relevant i18n string(s): cm_mysubtype=My SubType -->
    		<types>
    			<type name="cm:content">
    				<!-- Custom sub-type added for whitepapers -->
    				<subtype name="my:whitepaper" />
    			</type>
    
    			<type name="cm:folder">
    			</type>
    
    			<type name="trx:transferTarget">
    				<subtype name="trx:fileTransferTarget" />
    			</type>
    		</types>
                            
                            
                        
    ```

    You will notice you have just added a new sub-type of `cm:content`, `my:whitepaper`. You could also have added the other custom types you created in here. When you create new content you will be able to use the Change Type action in Share to specify the custom type `my:whitepaper`.

5.  Load the file tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot.properties into your editor.

6.  Locate the following section:

    ```
    
                    
        # Types
        type.cm_content=Content Base Type
        type.cm_folder=Folder Base Type
        type.trx_transferTarget=Transfer Target
        type.trx_fileTransferTarget=File Transfer Target           
                           
                    
    ```

7.  Add a line for your custom type \(or types\) below this:

    ```
    
                            
        type.my_whitepaper=Whitepaper
                            
                        
    ```

8.  Restart Alfresco.

9.  Log into Share.

10. Create a new piece of content using the Share interface.

11. Select the piece of content.

    Notice that there will be numerous properties displayed for the content.

12. Under **Document Actions** select **Change Type**. From this list select **Whitepaper**.

    Note that only four properties will be displayed for this content type.

13. Now under **Document Actions** select **Edit Properties**.

14. For the **my:product** property select **Flux Capacitor**.

15. Click **Save**.


You have seen how to configure Share to support custom types and properties.

**Parent topic:**[Content Model Tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

