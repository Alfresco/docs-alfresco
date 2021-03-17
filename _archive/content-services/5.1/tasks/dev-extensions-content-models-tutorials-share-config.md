---
author: Alfresco Documentation
---

# Share configuration for custom types and properties

Share needs to be configured to display custom types. It is also possible to configure Share to display properties in a customized way \(the default is to display all properties\).

This tutorial assumes you have completed the preceding tutorials in the series.

Although you have deployed a custom model, created content of the custom type, search for it, and applied a custom property, it is necessary to carry out some configuration in order to allow Share to take advantage of these new types and properties. The custom configuration will be done in the usual file for custom Share configurations, share-config-custom.xml.

1.  Your SDK project has a sample share-config-custom.xml at share-amp/src/main/resources/META-INF/share-config-custom.xml.sample. Rename the file to share-config-custom.xml and open it in an editor of choice.

2.  After the <alfresco-config\> tag, add the following configuration:

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

3.  Now define the custom types. After the config element you just created, add the following configuration:

    ```
    
                            <config evaluator="string-compare" condition="DocumentLibrary">
                    <!--
               Used by "Manage Rules" -> "Specialise type" action.
            
               If a type has been specified without a title element in the content model,
               or you need to support multiple languages,
               then an i18n file is needed on the Repo AMP/JAR extension side for the type to
               be visible when creating rules:
            
                  custom_customModel.type.custom_mytype.title=My SubType
            
               Used by the "Change Type" action.
            
               For the type to have a localised label add relevant i18n string(s) in a Share AMP/JAR extension:
            
                  type.custom_mytype=My SubType
            
               Define valid subtypes using the following example:
            
                  <type name="cm:content">
                   <subtype name="custom:mytype" />
                  </type>
                -->
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
       </config>                       
                            
                        
    ```

    You will notice you have just added a new sub-type of `cm:content`, `my:whitepaper`. You could also have added the other custom types you created in here. When you create new content you will be able to use the Change Type action in Share to specify the custom type `my:whitepaper`.

4.  Now add the string to display in Share for the whitepaper type. Open the file share-amp/src/main/amp/config/alfresco/web-extension/messages/share-amp.properties in your editor.

5.  Add a line for your custom type \(or types\) at the end of the file:

    ```
    
                            
        type.my_whitepaper=Whitepaper
                            
                        
    ```

6.  Restart Alfresco using the [run.sh](../concepts/alfresco-sdk-cmd-reference-aio.md) command.

7.  Log into Share.

8.  Create a new piece of content using the Share interface.

9.  Select the piece of content.

    Notice that there will be numerous properties displayed for the content.

10. Under **Document Actions** select **Change Type**. From this list select **Whitepaper**.

    Note that only four properties will be displayed for this content type.

11. Now under **Document Actions** select **Edit Properties**.

12. For the **my:product** property select **Flux Capacitor**.

13. Click **Save**.


You have seen how to configure Share to support custom types and properties.

**Parent topic:**[Content model tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

