---
title: Content Model Tutorials
---

Learn how to create a custom content model using the [Alfresco SDK]({% link content-services/7.2/develop/sdk.md %}).
Defining and implementing a custom content model for a specific domain is one of the first thing you need to do in most
digital transformation projects.

See also [Content Model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}) extension point.

## Creating a content model {#createcontentmodel}

You can create new content model using the Alfresco SDK.

Use the Alfresco SDK to build and deploy a new content model. In this tutorial you will see how to implement a bootstrap deployment.

1.  Create a new [All-In-One SDK Project]({% link content-services/7.2/develop/sdk.md %}#gettingstarted).

    The new project already contains a sample model that you can change to suit your needs.

2.  In your IDE, examine the file `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/context/bootstrap-context.xml`.

    This is the Spring Bean configuration file for your new content model:

    ```xml
    <bean id="aio52-platform-jar.dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
      <property name="models">
        <list>
            <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
            <value>alfresco/module/${project.artifactId}/model/workflow-model.xml</value>
        </list>
      </property>
      <property name="labels">
        <list>
           <!-- Bootstrap Resource Bundles for the content model types, aspects, properties etc -->
           <value>alfresco/module/${project.artifactId}/messages/content-model</value>
        </list>
      </property>
    </bean>
    ```

    This Spring bean links to your model file. It causes the model to extend the existing model, rather than replace it. The bean definition indicates that this model is to use a bootstrap deployment, which will require a server restart in order to take effect.

3.  In your IDE, open the file `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml`.

    This is your new custom model. Replace the contents with the following text:

    ```xml
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

4.  To build and run the project see [working with an AIO project]({% link content-services/7.2/develop/sdk.md %}#workingaio).

5.  Check for any errors in the log file.

6.  Log into Share as admin. Check that login works as expected.

You have seen how to create a Maven archetype for your content model and deploy it in bootstrap mode.

## Creating content of custom type

In this tutorial you create some content of one of the custom types defined in your custom model. This is done using a 
simple web script so that the type can be conveniently specified.

It is assumed that you are familiar with web scripts. If not, you might want to look at the 
[Repo Web Script Extension Point]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}).

Using the model defined in the [previous section](#createcontentmodel), you run a simple web script to create content of 
type `my:whitepaper`.

1.  In your IDE, navigate to the `aio/aio-platform-jar/src/main/resources/alfresco/extension/templates/webscripts` folder.

2.  In the next part of this tutorial, you create three files for the test web script, `modeltest.get.desc.xml`, `modeltest.get.html.ftl`, and `modeltest.get.js` in the `webscripts` folder.

3.  In the `webscripts` folder, create the web script description file, `modeltest.get.desc.xml`, with the following content:

    ```xml
    <webscript>
       <shortname>Model test</shortname>
       <family>Tutorials</family>
       <description>Creates content of a custom type</description>
       <url>/modeltest/{documentName}</url>
       <format default="html">extension</format>
       <authentication>user</authentication>
    </webscript>                        
    ```

    You can specify the name of the document to create - it is passed as a parameter via the URL. To keep things simple the type of the content is hardcoded in the JavaScript code to be of type `my:whitepaper`.

4.  In the `webscripts` folder, create a new JavaScript file, `modeltest.get.js`, with the following content:

    ```javascript
    var contentType = "my:whitepaper";
    var documentName = url.templateArgs.documentName;
    
    var document = companyhome.createNode(documentName, contentType);
    
    if (document != null){
    	model.document = document;
    	model.msg = "Created OK!";
    }
    else {
    	model.msg = "Failed to create document!";
    }                        
    ```

    The web script simply creates a new document of type whitepaper. If the operation fails an error message is recorded and this will be displayed by the corresponding template file. If the operation is successful, the reference to the created document itself is stored in the model for use by the template.

5.  In the `webscripts` folder, create a new FreeMarker template file, `modeltest.get.html.ftl`, with the following contents:

    ```xml
    <p>Creating the following document:</p>
    <ul>
    	<li>${document.name}</li>
    	<li>${document.type}</li>
    </ul>
    <b>${msg}</b>                    
    ```

    The template file simply extracts the name and type from the document object and displays it, along with the message passed from the JavaScript code.

6.  Point your web browser at the web scripts index at `http://localhost:8080/alfresco/service/index`.

7.  You can click **Browse 'Tutorials' Web Scripts** to view your web script and confirm that it is indeed present.

8.  Run the web script by specifying a URL such as the following (you can change the name of the document if you wish):

    ```http
    http://localhost:8080/alfresco/service/modeltest/MyWhitepaper                        
    ```

    You will see a page displayed such as the following:

    ```text
    Creating the following document:
    
        MyWhitepaper
        {http://www.mycompany.com/model/content/1.0}whitepaper
    
    Created OK!                        
    ```

    Note that the fully qualified type name is as specified in your custom model file. If you try to create a content of a type that does not exist you will get an error.

9.  Run the web script a few times to create several documents.

10. Log into Share. You can use the Node Browser to search for nodes of the custom type.

11. On the main Share menu select **Admin Tools** and then from the left-hand **Tools Menu** select **Node Browser**.

    The Node Browser interface will be displayed.

12. In the search box type the following query:

    ```text
    TYPE:"{http://www.mycompany.com/model/content/1.0}whitepaper"                        
    ```

13. Click the **Search** button.

    A list of nodes with the specified type, `my:whitepaper`, will be returned.

You have created some content of custom type `my:whitepaper` in the repository. You then used the Node Browser to find 
content only of this custom type.

## Adding a custom property

In this tutorial you add a custom property to your model.

Complete the previous tutorials in this series before attempting this one.

Using the model defined in an [earlier section](#createcontentmodel) you will extend it to use a custom property. Any 
piece of content has a number of properties inherited from its parent, such as `cm:content`. These include properties 
such as name, title, and description. It is possible to add custom properties, effectively extending the parent types 
property list. In this tutorial you add a `product` property to a piece of content. This property will also have a 
constraint. This constraint will mean that the product type has to be selected from a list of pre-defined products. 
This allows the content to be more accurately catalogued and searched for. You will also run a query to find content 
using a type and property.

1.  In your IDE, open the file `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml` and load it into the editor.

2.  Replace the content of the file with the following:

    ```xml
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

3.  To build and restart the project see [working with an AIO project]({% link content-services/7.2/develop/sdk.md %}#workingaio).

4.  Check that Content Services has restarted without errors (either through checking the logs or logging into Share).

5.  If you check a piece of content you created previously in Share, you can see that the custom property is automatically displayed. In the next tutorial you customize this information.

6.  For a whitepaper created earlier apply the value `Flux Capacitor` to its `product` property.

7.  As before locate the Node Browser.

8.  Set the Node Browser's query language to `lucene`.

9.  In the Node Browser's search box type the following query:

    ```text
    @my\:product:"Flux Capacitor"                        
    ```

10. Click **Search**.

    Any documents with the `my:product` property set to `Flux Capacitor` will be returned in the search results.

You have created and deployed a custom model with a custom property and constraint. You have applied a custom property 
and seen how to search for content with a particular property value.

## Share configuration for custom types and properties {#shareconfigtypesprops}

Alfresco Share needs to be configured to display custom types. It is also possible to configure Share to display 
properties in a customized way (the default is to display all properties).

This tutorial assumes you have completed the preceding tutorials in the series.

Although you have deployed a custom model, created content of the custom type, search for it, and applied a custom 
property, it is necessary to carry out some configuration in order to allow Share to take advantage of these new types 
and properties. The custom configuration will be done in the usual file for custom Share configurations, 
`share-config-custom.xml`.

1.  Your SDK project has a sample at `aio/aio-share-jar/src/main/resources/META-INF/share-config-custom.xml`.

2.  Replace everything inside the `<alfresco-config>` tag with the following configuration:

    ```xml
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

    * `cm:name`
    * `my:product`
    * `cm:title`
    * `cm:description`

    Of course any property supported by the type could be chosen to be displayed here.

3.  Now define the custom types. After the config element you just created, add the following configuration:

    ```xml
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

    You will notice you have just added a new sub-type of `cm:content`, `my:whitepaper`. You could also have added the other custom types you created in here. When you create new content you will be able to use the **Change Type** action in Share to specify the custom type `my:whitepaper`.

4.  Now add the string to display in Share for the whitepaper type. Open the file `aio/aio-share-jar/src/main/resources/alfresco/web-extension/messages/aio-share-jar.properties` in your editor.

5.  Add a line for your custom type (or types) at the end of the file:

    ```text
    type.my_whitepaper=Whitepaper
    ```

6.  To build and restart the project see [working with an AIO project]({% link content-services/7.2/develop/sdk.md %}#workingaio).

7.  Log into Share.

8.  Create a new piece of content using the Share user interface.

9.  Select the piece of content.

    Notice that there will be numerous properties displayed for the content.

10. Under **Document Actions** select **Change Type**. From this list select **Whitepaper**.

    Note that only four properties will be displayed for this content type.

11. Now under **Document Actions** select **Edit Properties**.

12. For the **my:product** property select **Flux Capacitor**.

13. Click **Save**.

You have seen how to configure Share to support custom types and properties.

## Adding an association

In this tutorial you add an association to your model. An association is a logical link between content types, it is a 
way of connecting related content.

Complete the previous tutorials in this series before attempting this one.

1.  In your IDE, open the file `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml` and load it into the editor.

2.  Change the MyCompany generic document type to the following code:

    ```xml
    <!-- Enterprise-wide generic document type -->
    <type name="my:doc">
        <title>MyCompany Generic Document</title>
        <parent>cm:content</parent>
        <associations>
            <association name="my:relatedDocuments">
                <title>Related Documents</title>
                <source>
                    <mandatory>false</mandatory>
                    <many>true</many>
                </source>
                <target>
                    <class>my:doc</class>
                    <mandatory>false</mandatory>
                    <many>true</many>
                </target>
            </association>
        </associations>
    </type>
    ```

3.  To build and restart the project see [working with an AIO project]({% link content-services/7.2/develop/sdk.md %}#workingaio).

The association has been created and deployed.

## Adding an aspect with Share configurations {#addaspect}

In this tutorial you add an aspect to your model. An aspect provides an additional way to classify content.

Complete the previous tutorials in this series before attempting this one.

1.  In your IDE, open the file `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml` and load it into the editor.

2.  Add the following after the `types` section:

    ```xml
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

3.  In the next section of this tutorial you add some configuration to Share to ensure that the aspect appears in the Share user interface.

4.  Open the file `aio/aio-share-jar/src/main/resources/META-INF/share-config-custom.xml` in your editor.

5.  Find the following line in the file:

    ```xml
    <config evaluator="string-compare" condition="DocumentLibrary">
    ```

6.  Add a list of aspects add any you wish to be able to apply to a document using the Share **Manage Aspects** action. In this case, add the following text:

    ```xml

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
            <aspect name="my:publishToWeb" />
            <aspect name="my:clientRelated" />
        </visible>

        <!-- Aspects that a user can add. Same as "visible" if left empty -->
        <addable>
        </addable>

        <!-- Aspects that a user can remove. Same as "visible" if left empty -->
        <removeable>
        </removeable>
    </aspects>
    ```

7.  Edit the file `aio/aio-share-jar/src/main/resources/alfresco/web-extension/messages/aio-share-jar.properties` to add suitable strings for the aspects. For example, in the aspects section you can add:

    ```text
    aspect.my_publishToWeb=Web Publishable
    aspect.my_clientRelated=Client Related                    
    ```

8.  Log back into Share and create a new piece of content. Add the type `Whitepaper` to the content.

9.  Once the type has been changed click **Manage Aspects**. You can now apply the aspects **Web Publishable** and **Client Related** to the content.

The aspect has been created and deployed, along with suitable Share configurations.

## Adding mandatory aspect

In this tutorial you add a mandatory aspect to your model.

Complete the previous tutorials in this series before attempting this one.

You create a mandatory aspect and add it to your model. All content of the specified type (and child types) will have 
the mandatory aspect automatically applied when the content is created and added to the repository. The mandatory aspect 
you add is called `cm:generalClassifiable`.

1.  In your IDE, open the file `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml` and load it into the editor.

2.  Find the type `my:doc` (the parent custom type). After the type's associations add the following mandatory aspect:

    ```xml
    <mandatory-aspects> 
        <aspect>cm:generalclassifiable</aspect> 
    </mandatory-aspects>
    ```
    
3.  To build and restart the project so the modified model is picked up see [working with an AIO project]({% link content-services/7.2/develop/sdk.md %}#workingaio).

4.  Log back into Share and create a new piece of content. Add the type `Whitepaper` to the content.

5.  Once the type has been changed click **Manage Aspects**.

    You can see that the mandatory aspect, `Classifiable` has been applied by default.

You have seen how to add a mandatory aspect to your model.

