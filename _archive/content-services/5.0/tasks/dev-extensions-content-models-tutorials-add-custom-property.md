---
author: Alfresco Documentation
---

# Add a custom property

In this tutorial you will add a custom property to your model.

This tutorial assumes you have complete the previous tutorials in this series.

Using the model defined in an [earlier tutorial](dev-extensions-content-models-tutorials-deploy-model.md) you will extend it to use a custom property. Any piece of content has a number of properties inherited from its parent, such as `cm:content`. These include properties such as name, title, and description. It is possible to add custom properties, effectively extending the parent types property list. In this tutorial you will add a `product` property to a piece of content. This property will also have a constraint. This constraint will mean that the product type has to be selected from a list of pre-defined products. This allows the content to be more accurately catalogued and search for. You will also run a query to find content using a type and property.

1.  In the Eclipse Package Explorer locate the file customModel.xml and load it into the editor.

2.  Replace the content of the file with the following:

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
    		<import uri="http://www.alfresco.org/model/dictionary/1.0"
    			prefix="d" />
    		<!-- Import Alfresco Content Domain Model Definitions -->
    		<import uri="http://www.alfresco.org/model/content/1.0" prefix="cm" />
    	</imports>
    
    	<!-- Introduction of new namespaces defined by this model -->
    	<!-- NOTE: The following namespace my.new.model should be changed to reflect 
    		your own namespace -->
    	<namespaces>
    		<namespace uri="http://www.mycompany.com/model/content/1.0"
    			prefix="my" />
    	</namespaces>
    
    	<constraints>
    		<constraint name="my:productListConstraint" type="LIST">
    			<parameter name="allowedValues">
    				<list>
    					<value>Foobar Widget</value>
    					<value>Flux Capacitor</value>
    					<value>Big Bold App</value>
    				</list>
    			</parameter>
    		</constraint>
    	</constraints>
    
    	<types>
    		<!-- Enterprise-wide generic document type -->
    		<type name="my:doc">
    			<title>MyCompany Generic Document</title>
    			<parent>cm:content</parent>
    		</type>
    		<type name="my:marketingDoc">
    			<title>MyCompany Marketing Document</title>
    			<parent>my:doc</parent>
    			<properties>
    				<property name="my:product">
    					<type>d:text</type>
    					<multiple>true</multiple>
    					<constraints>
    						<constraint ref="my:productListConstraint" />
    					</constraints>
    				</property>
    			</properties>
    		</type>
    		<type name="my:whitepaper">
    			<title>MyCompany Whitepaper</title>
    			<parent>my:marketingDoc</parent>
    		</type>
    	</types>
    </model>                        
                            
                        
    ```

    This model is an extended version of the previously used model. It adds a new property to the MyCompany Marketing Document type. A constraint is also defined for this property to restrict its value to one of three possible product names. The new property itself is called `my:product`. Note that although the property is added to the type `my:marketingDoc`, the property will also apply to content of the type `my:whitepaper` as whitepaper has the marketing document as its parent type. In other words properties are inherited from the parent content type.

3.  Right-click the build.xml file in the Eclipse Package Explorer and select **Run As** \> **Ant Build** to build the JAR containing the model and deploy it.

4.  You will now need to restart Alfresco.

5.  Check that Alfresco has restarted without errors \(either through checking the logs or logging into Share\).

6.  If you check a piece of content you created previously in Share, you will see that the custom property is automatically displayed. In the next tutorial you will see how to customize this information.

7.  For a whitepaper created earlier apply the value `Flux Capacitor` to its `product` property.

8.  As before locate the Node Browser.

9.  Set the Node Browser's query language to `lucene`.

10. In the Node Browser's search box type the following query:

    ```
    
                            
    @my\:product:"Flux Capacitor"                        
                            
                        
    ```

11. Click **Search**.

    Any documents with the `my:product` property set to `Flux Capacitor` will be returned in the search results.


You have created and deployed a custom model with a custom property and constraint. You have applied a custom property and seen how to search for content with a particualr property value.

**Parent topic:**[Content Model Tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

