---
title: Content Model
---

Defining a custom content model for the repository is a fundamental task in almost every content management project. It will allow you to build a robust system with content that can be classified, searched, structured, and processed in many different ways.

|Information|Content Model Introduction|
|-----------|--------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|One of the main differences between a network drive and a Content Management System (CMS) is that the latter provides extra classification features. If you look at a CMS behind the scenes, you can see that everything in the repository is typically a node (a node is also sometimes referred to as an object). Properties are then set on the nodes so they become folders, files, categories, rules, forums, web pages, e-mails, people, groups, and so on.

 Classifying nodes makes performing operations on them more precise, so it is easier to search for them, so they can be displayed in the user interface correctly, and node-specific operations can be carried out. The properties that can be used to classify nodes (content), cannot be selected at random, as then the system would not know what each one of these properties represents. Because of this a content management system usually comes preconfigured with properties that can be used to classify content in the repository. These properties are usually organized into two groups called *Types* and *Aspects*. The main difference between types and aspects is that a node can only have one type applied but it can have multiple aspects applied.

 Nodes are not isolated within the repository. They are related to one another in different ways. How the nodes are related to each other is defined using *Associations*. A typical association that comes out-of-the-box with Alfresco Content Services is the one between a folder node and its child nodes, this type of association is a `child-association`. So when you start using Alfresco Content Services you can immediately organize folders and files into a hierarchy, like with a file system.

 The Types, Aspects, Properties, and Associations are in turn organized into models that we call *Content Models*. Alfresco Content Services comes with a number of Content Models out of the box for different things like general folder and file content, workflow-related content, records content, web content, and so on.

 It is also useful to be able to create content models related to specific domains such as Finance or Marketing. As the type of content that may be stored in the repository can vary, generic standard content models are provided that provide a basis on which to build custom content models for domain-specific purposes.

 New types and aspects are defined forming new custom content models. But how do you know how to specify a type and a property with, for example, a data type integer? Alfresco Content Services also comes with a *Meta Model*. The Meta model defines what syntax you can use when defining your content models. It will, for example, define the syntax for how a type or an integer property should be defined. The following diagram gives a simplified overview of the relationship between meta model, content models, and custom content models:

![]({% link content-services/images/dev-extensions-repo-content-model-metamodel-vs-model.png %})

 In the image, you can see two nodes in the repository: one folder node and one ACME Contract document node. The Contract type extends the ACME Generic Document type, or base type if you like, which in turn extends the generic Content type. The Contract document node also has versioning turned on by having the Versionable aspect applied.

 Both the custom content model and the Alfresco Content Services content model is defined by the Data Dictionary Schema, which is the same as the Meta Model.

 Content models, types, aspects, and properties are similar to object-oriented concepts in programming. If you are familiar with object-oriented modelling, then the concepts of content modelling should feel familiar.

 The meta model contains the constructs or syntax that can be used to define content models, which are defined in XML.

 > **Important:** It is possible to create custom content models from the Alfresco Share UI without the need to use XML. These models can then be exported as XML and included in a build project. See the [Content modeling with Model Manager]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager) for further information.

 For detailed instructions on how to implement content models, see the [define and deploy section](#content-model-defining-and-deploying). When you have defined and deployed a content model you would want to be able to work with it from the Share UI, see the [configure UI section](#content-model-configuring-the-user-interface) for more information around this.

|
|Deployment - App Server|-   Content Model Definition: tomcat/shared/classes/alfresco/extension/myContentModel.xml (File name can be anything you like as long as you refer to it in the Spring context file)
-   Content Model Bootstrap: tomcat/shared/classes/alfresco/extension/my-content-model-context.xml (File name has to end in -context.xml to be picked up as Spring Bean context file)
-   Share UI configuration: tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml

 These file locations are untouched by re-deployments and upgrades.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).

|-   Content Model Definition: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/model/content-model.xml
-   Content Model Localization: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages/content-model.properties
-   Content Model & Localization Deployment (Bootstrap): aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml
-   Share UI Configuration: aio/share-jar/src/main/resources/META-INF/share-config-custom.xml
-   Share UI Localization: aio/share-jar/src/main/resources/alfresco/web-extension/messages/share-jar.properties
-   Share UI Localization Deployment (Bootstrap) : aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml

 To implement and deploy a content model with full UI support you need both a repository JAR and a Share JAR project.|
|More Information|-   [Define and Deploy a custom content model](#content-model-defining-and-deploying) - Detailed walk-through
-   [Configure the Share UI for a custom content model](#content-model-configuring-the-user-interface) - Detailed walk-through
-   [Out-of-the-box Content Models](#out-of-the-box-content-models)
-   [Model Manager in Share Admin Tools]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager)

|
|Sample Code|-   [A complete ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-repo)
-   [Share UI configuration for the ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-share)
-   [Example of how to test your custom content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/blob/alfresco-51/all-in-one/integration-test-runner/src/test/groovy/org/alfresco/tutorials/testSpecs/context/CustomContentModelTestSpec.groovy)
-   [Data List content model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo)

|
|Tutorials|-   [Jeff Potts Alfresco Developer Series: Working With Custom Content Types in Alfresco](http://ecmarchitect.com/alfresco-developer-series-tutorials/content/tutorial/tutorial.html) - a very thorough walk-through of how to develop custom Content Models, a must read.
-   [Defining and Deploying a custom Content Model]({% link content-services/5.2/tutorial/platform/content-model.md %}#creating-a-content-model) (Short introduction excluding localization)

|
|Developer Blogs|-   [Content Modelling in from the Share UI](http://imben.me/easy-content-modeling-in-alfresco-51/) - Step by step guide with screenshots.

|

-   **[Content Model - Defining and Deploying](#content-model-defining-and-deploying)**  
Defining a custom content model involves creating an XML file. The model is then deployed with a Spring bean. Localized labels for the content model items can also be part of the deployment.
-   **[Content Model - Configuring the User Interface](#content-model-configuring-the-user-interface)**  
To make custom content models available in the Share User Interface some configuration is needed in XML. Localization of metadata and search forms can also be part of this configuration.
-   **[Out-of-the-box content models](#out-of-the-box-content-models)**  
The repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.

## Content Model - Defining and Deploying {#content-model-defining-and-deploying}

Defining a custom content model involves creating an XML file. The model is then deployed with a Spring bean. Localized labels for the content model items can also be part of the deployment.

|Information|Content Model - Defining and Deploying|
|-----------|--------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Now when you have read the [Content Model Introduction](#content-model) it is time to define and deploy a content model. If you have already done this and are looking for information about how to configure the Share UI for a content model, then have a look at this [section](#content-model-configuring-the-user-interface).

 To define a new content model means to add an XML file to the repository. This can be done via a [bootstrapping procedure](#deploying-a-content-model:-bootstrap-approach) or [dynamically](#deploying-a-content-model:-dynamic-approach) via the user interface. If you are running an Enterprise edition it is also possible to manage content models from the [Admin Console](#managing-models-using-the-admin-console). At the end of this article you will find information about where this XML file should be located in an SDK project and where it should be located in a standard installation.

 A new custom content model starts with, you guessed it, a **`model`** element definition, which is the container for all other definitions as follows :

```
<?xml version="1.0" encoding="UTF-8"?>
<model name="acme:contentModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">
   <description>Content model for the fictional company ACME</description>
   <author>Martin Bergljung</author>
   <version>1.0</version>
   <published>2015-09-01</published>
   <imports>...</imports>
   <namespaces>...</namespaces>
   <constraints>...</constraints>
   <types>...</types>
   <aspects>...</aspects>
</model>
```

 The order in which these elements are specified is important. It will not work to specify them in any other order than in this example. This is because in the meta model they are defined within a <xs:sequence> element. This is true throughout the model schema so be careful to always use the elements in the right order.

 The **`imports`** definition is the container for import definitions of other content models referred to by the model being defined:

```
<imports>
    <!-- Import Alfresco Dictionary Definitions -->
    <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
    <!-- Import Alfresco System Model Definitions -->
    <import uri="http://www.alfresco.org/model/system/1.0" prefix="sys"/>
    <!-- Import Alfresco Content Domain Model Definitions -->
    <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
</imports>
```

This example imports the Data Dictionary model with all the `data-type` definitions, such as `d:text`. It also imports the system model with types such as `base`, `descriptor`, `container`, `reference`, and aspects such as `referenceable` and `temporary`. Finally you import the generic content model (cm) with types such as `content` (files) and `folder` and aspects such as `versionable` and `dublincore`.

 As you can imagine, it is important to get familiar with the out-of-the-box content models so you don't start defining types and aspects that are already available. And it's also important to get familiar with existing models to avoid clashing with namespaces and prefixes used by those. See this [page](#out-of-the-box-content-models) for a complete list of existing content model namespaces and prefixes.

 The **`namespaces`** definition is the container for all new custom namespace definitions that will be used by this model:

```
<namespaces>
   <namespace uri="http://www.acme.org/model/content/1.0" prefix="acme"/>
</namespaces>
```

This example defines the `namespace` for the new content model to `http://www.acme.org/model/content/1.0`. All definitions done in the model will be prefixed with `acme`. Any new name (referred to as local name) defined in the model for things like types, aspects, properties, etc. need to be unique. You could also define more than one namespace to be used in the model, such as in the following example:

```
<namespaces>
   <namespace uri="http://www.acme.org/model/content/1.0" prefix="acmec"/>
   <namespace uri="http://www.acme.org/model/workflow/1.0" prefix="acmew"/>
</namespaces>
```

Here, you have defined one namespace `acmec` that will be used for document content classification and another namespace `acmew` that will be used exclusively for workflow-related content. You could have the same local name in both these namespaces, such as `acmec:project` and `acmew:project`.

 A good idea is to use the following format for the URI:

```
http://<company website address>/model/[content|workflow|...]/1.0
```

 The **`constraints`** definition is the container for all new constraints to be used by the properties defined in the custom model. There are different types of constraints:

-   `LIST` = property value must match an entry in the list
-   `REGEXP` = property value must match the regular expression
-   `MIN-MAX` = property value must be numeric and within this range
-   `LENGTH` = property value must be a string and within `min` and `max` length
-   `java class` = a custom constraint implementation in the form of a Java class

The following is an example definition of a `LIST` constraint:

```
<constraints>
   <constraint name="acme:securityClassificationOptions" type="LIST">
      <parameter name="allowedValues">
            <list>
                <value></value> <!-- Empty for default search -->
                <value>Public</value>
                <value>Client Confidential</value>
                <value>Company Confidential</value>
                <value>Strictly Confidential</value>
            </list>
      </parameter>
   </constraint>
```

 The following is a `LENGTH` constraint example:

```
<constraints>
   <constraint name="acme:summary" type="LENGTH">
      <parameter name="minLength">
         <value>5</value>
      </parameter>
      <parameter name="maxLength">
         <value>100</value>
      </parameter>
   </constraint>
```

 And here is an example of a `MINMAX` constraint:

```
<constraints>
   <constraint name="acme:percentage" type="MINMAX">
      <parameter name="minValue">
         <value>0</value>
      </parameter>
      <parameter name="maxValue">
         <value>100</value>
      </parameter>
   </constraint>
```

 A regular expression (`REGEXP`) constraint looks like this:

```
<constraints>
   <constraint name="acme:contractIdFormat" type="REGEX">
      <parameter name="expression">
         <value><![CDATA[[^C\d{3}$]]></value>
      </parameter>
      <parameter name="requiresMatch">
         <value>true</value>
      </parameter>
   </constraint>
```

 Finally, you can define custom constraint implementations by supplying a Java class with the implementation. Here is an example from the out-of-the-box generic content model (contentModel.xml):

```
<constraints>
   <constraint name="cm:userNameConstraint" type="org.alfresco.repo.dictionary.constraint.UserNameConstraint" />
```

Being able to implement your own constraints is useful as it is common to want to set a property from a dynamic list of values, such as a 'project name'. It might not be possible to use a static `LIST` constraint for project names as new projects might be created frequently. And you do not want users to type in the project name manually as then you might get more than one version of the project name present in the repository, making search unpredictable.

 These constraints will have an effect on what controls and validation that are generated for the user interface (that is for the Share user interface).

 The **`types`** definition is the container for all new custom `type` definitions. A type models an object in the specific domain that your are implementing a content management solution for. This could be for example a project, marketing document, engineering drawing, software manual, legal case, book, chapter and so on. Remember also that an item (node) in the repository, such as a file or a folder, can only be assigned one type.

 Here are a couple of examples of how to define new types:

```
<types>
        <!--
            ACME Enterprise-wide Document root type.
            All other custom document types should extend this one.
        -->
        <type name="acme:document">
            <title>Base document type</title>
            <parent>cm:content</parent>
            <properties>
                <property name="acme:documentId">
                    <title>Document Identification Number</title>
                    <type>d:text</type>
                </property>
            </properties>
            <mandatory-aspects>
                <aspect>acme:securityClassified</aspect>
            </mandatory-aspects>
        </type>

        <type name="acme:contract">
            <title>Contract document</title>
            <parent>acme:document</parent>
            <properties>
                <property name="acme:contractName">
                    <title>Contract Name</title>
                    <type>d:text</type>
                    <mandatory>true</mandatory>
                </property>
                <property name="acme:contractId">
                    <title>Contract Identification Number</title>
                    <type>d:text</type>
                    <constraints>
                        <constraint ref="acme:contractIdFormat" />
                    </constraints>
                </property>
            </properties>
        </type>
        
        <!-- A folder can have this type applied to represent a project container. -->
        <type name="acme:project">
            <title>Project folder</title>
            <parent>cm:folder</parent>
            <properties>
                <property name="acme:projectName">
                    <type>d:text</type>
                    <mandatory>true</mandatory>
                </property>
                <property name="acme:projectDescription">
                    <type>d:text</type>
                </property>
                <property name="acme:projectStartDate">
                    <type>d:date</type>
                </property>
            </properties>
            <associations>
                <!-- Setup a child-association from the type folder to zero or more members.
                     Note. peer associations are not indexed and searchable, so using child-association instead.
                 -->
                <child-association name="acme:projectMember">
                    <source>
                        <mandatory>false</mandatory>
                        <many>true</many>
                    </source>
                    <target>
                        <class>cm:person</class>
                        <mandatory>false</mandatory>
                        <many>true</many>
                    </target>
                    <duplicate>false</duplicate>
                    <propagateTimestamps>false</propagateTimestamps>
                </child-association>
            </associations>
            <mandatory-aspects>
                <aspect>acme:projectIdentifier</aspect>
            </mandatory-aspects>
        </type>
</types>
```

Here you have first defined a base document type called `acme:document` that all your custom document types should extend. This is good practice as it allows you to search for all documents classified in some way as ACME documents, it will for example match the next type in the model called `acme:contract`, which extends the `acme:document` type. A base document type is also useful for keeping metadata that is applicable to all documents in the enterprise, such as some form of document identifier (that is `acme:documentId`) and security classification (that is `acme:securityClassified`).

 Note how the base type extends the out-of-the-box type `cm:content`. All types that should be applied to files need to eventually extend this type, and it in turn extends the `cm:cmobject` type, which has properties such as `cm:name` (the name of the file or folder), `cm:created`, `cm:creator`, `cm:modified`, and `cm:modifier`. The last four properties belong to the `cm:auditable` aspect, which is mandatory on the `cm:cmobject` type. The auditable properties are managed by the system and when you for example upload a file the created date will be set to now, not to when the file was initially created.

 > **Important:** If you want the file to have the created date set to when the file was actually created, then you can use the Bulk Import tool, which turns off the automatic system management of these properties, and grabs the file metadata instead.

 The last type that is defined is called `acme:project` and it extends the out-of-the-box type `cm:folder`, which extends the `cm:cmobject` type described previously. So you can actually use folders to represent objects such as a project, a legal case, or other "container" objects. Being able to classify folders according to a specific domain is particularly useful as you can then also create "auto-classifying" rules for the folder. These rules would classify any files dropped into the folder according to the folders type and properties. Which means that you get files automatically classified without the end-user having to fill anything in.

 The following table explains the sub-elements of the `type` element (note that they are the same for an `aspect`):

|Name|Type|Multiplicity|Description|
|----|----|------------|-----------|
|`name`|attribute (string)

|required|The name of the type including namespace and local name, such as `acme:project`|
|`title`

|element (string)

|[0..1]|The title of the type, will be used in the user interface if there are no i18n resources available.|
|`description`

|element (string)

|[0..1]|The description of the type, useful for documentation purposes.|
|`parent`

|element (string)

|[0..1]|Reference to another type that this type extends. Single inheritance is supported. A type usually extends the out-of-the-box `cm:content` type if it should be applied to files uploaded to the repository, and `cm:folder` if it should be applied to new folders in the repository.|
|`archive`

|element (boolean)

|[0..1]|-   `true` = content with this type should be archived when deleted. This means that it will end up in the Archive Store and it can be restored from the recycle bin. (default)
-   `false` = content with this type is not archived when deleted and is therefore permanently gone and can never be restored.

|
|`properties`

|element container

|[0..1]|Container for all custom properties that make up the metadata for this type.|
|`associations`

|element container

|[0..1]|Container for all parent-child and peer associations for this type. Such as the `acme:projectMember` child association that has been defined for the `cm:project` type.|
|`overrides`

|element container

|[0..1]|Property overrides of super type class properties. You can only override the `default` value, `mandatory` parameter, and `constraints` definitions for a property.

 It is quite common to override type properties when working with workflow content models, such as in the following example:

 ```
<type name="scwf:activitiRevise">
   <parent>bpm:activitiOutcomeTask</parent>
   <properties>
      <property name="scwf:reviseOutcome">
         <type>d:text</type>
         <default>Abort</default>
         <constraints>
            <constraint type="LIST">
               <parameter name="allowedValues">
                  <list>
                     <value>Re-submit</value>
                     <value>Abort</value>
                  </list>
               </parameter>
            </constraint>
         </constraints>
      </property>
   </properties>               
   <overrides>
      <property name="bpm:packageItemActionGroup">
         <default>edit_package_item_actions</default>
      </property>
      <property name="bpm:outcomePropertyName">
         <default>{http://www.someco.com/model/workflow/1.0}reviseOutcome</default>
      </property>
   </overrides>
</type>
```

 It is also common to do this for aspects. For example, the `cm:titled` aspect that is available out-of-the-box provides 2 properties to set the title and description for a node. These are non-mandatory properties.

 If you wanted to always have these properties as mandatory on types, then you could define your own titled aspect as follows:

```
<aspect name="acme:titled">
    <title>Titled</title>
    <parent>cm:titled</parent>
    <overrides>
       <property name="cm:title">
          <mandatory>true</mandatory>
       </property>
       <property name="cm:description">
          <mandatory>true</mandatory>
       </property>
    </overrides>
</aspect>
```

As the custom `acme:titled` aspect extends the out of the box `cm:titled` aspect it will work in all searches done on `cm:titled`.

|
|`mandatory-aspects`

|element container

|[0..1]|Mandatory aspects for this type. When content is created with this type applied, then these aspects will also be applied automatically.|

 The type `properties`, and also the aspect `properties` as we will see, play a central part of the content model definition as they depict the so called *metadata* that should be stored together with the file or the folder. Metadata is very important in a content management solution as it will determine what you can search on, create rules around, base policies on etc.

 The following table describes all the parameters that can be used when defining a new `property`(metadata) for a type or aspect:

 |Name|Type|Multiplicity|Description|
|----|----|------------|-----------|
|`name`|attribute (string)

|required|The name of the property. The name has to be unique between all types, aspects, constraints and so on that are defined in the namespace. It is different from object-oriented programming where a member variable of one class can be named the same as in another class.|
|`title`

|element (string)

|[0..1]|The title of the property. Will be used in the user interface as field label if there are no i18n resources available.|
|`description`

|element (string)

|[0..1]|The description of the property, useful for documentation purposes.|
|`type`

|element (string)

|[1..1]|Mandatory data type reference. This references a `data-type` definition in the dictionaryModel.xml content model. Here are some of the most commonly used data types: ```
d:text, d:int, d:long, d:float, d:double, d:date, d:datetime, d:boolean, d:encrypted, d:noderef
```

|
|`protected`

|element (boolean)

|[0..1]|-   `true` = this property cannot be edited after the value has been set. And it cannot be edited at all from the user interface (that is Alfresco Share). This is usually used for system properties such as `cm:created`, `cm:creator`. They are set by the system and can then not be touched. It is sometimes also used in custom content models to make a property read-only after it has been initially set via an API call.
-   `false` = the property can be updated as many times as you like. This is the default if this element is not specified.

|
|`mandatory`

|element (boolean)

|[0..1]|-   `true` = when a property is set as mandatory it tells Alfresco Content Services that the property is required. By default, this is not enforced. Instead, Alfresco Content Services marks content items with empty mandatory properties with the aspect `sys:incomplete`. This is done so that you can create items that have mandatory properties even if the value of the property is not known at the time of content creation, while still indicating that the property is required (eventually). Mandatory properties will have a * next to them in the UI.
-   `false` = it is optional and this is the default if this element is not specified.

The `mandatory` element can also have a `boolean` attribute called `enforced`. If this is set to `true` then you cannot create a node without this property having a value.


|
|`multiple`

|element (boolean)

|[0..1]|-   `true` = this property can have a list of values.
-   `false` = only one value can be entered and this is the default if this element is not specified.

|
|`default`

|element (any)|[0..1]|Default value for this property if the user does not specify any value. The UI input field will be pre-populated with this value.|
|`index`

|element

|[0..1]|Solr/Lucene index configuration. The indexing behaviour for each property can be configured. If we don't configure any indexing behaviour, then the default configuration is: ```
<index enabled="true">
   <atomic>true</atomic>
   <stored>false</stored>
   <tokenised>true</tokenised>
</index>
```

Explanation of default index configuration: -   **`enabled="true"`:** index the value of the property. Setting this to `false` means that the property is not indexed at all and is not part of the index.
-   **`<atomic>true</atomic>`:** atomic is not used when Alfresco Content Services uses Solr for search. The default value is there to allow the continued use of the built in Lucene indexing engine when customers don't want to, or cannot, switch to Solr. With Solr the index is eventually up-to-date with the database (properties/metadata are stored in the database).
-   **`<stored>false</stored>`:** the property value is not stored in the index. This property is not used with Solr either, all fields are store in the new cached content store on the Solr side.
-   **`<tokenized>true</tokenized>`:** the property value is tokenized when it's indexed, so if the value is "Company Confidential" it will be tokenized into two strings that will be indexed separately, which might not always be what you want. You can also use `false`, which will just tokenize the value as one item. Further on, it also possible to set it to `both`, which means that "Company Confidential", "Company", and "Confidential" will be in the index. The tokenizer is determined by the property type in the data dictionary. This is locale sensitive as supported by the data dictionary, so you could switch to tokenize all your content in for example German. You cannot mix for example German and English tokenization.

There is also another sub-element that can be specified for the `index` element. It is called `facetable` and controls the faceting behaviour in Solr as follows: -   **`<facetable>true</facetable>`:** property is set up properly in Solr for faceting and is really fast, ordered, and sorted.
-   **`<facetable>false</facetable>`:** property is not facetable, that is, you cannot create a facet from this property. In some cases it makes no sense to make a property facetable, for example if it is a unique property. Note that setting facetable to false will not save resources.
-   **Unspecified as above (default):** faceting works but not as fast and efficient as when this element is explicitly specified and set to `true`.

|
|`constraints`

|element

|[0..1]|Container for property constraints.|

 The last thing that is defined in the model are the `**aspects**`. The definition of an aspect does not differ much from a type definition. In fact, in the schema they are both based on the same `class` definition. The main difference between an aspect and a type is that a content node can have multiple aspects applied to it but only one type applied to it. This is important to think about when you decide if you should use an aspect or a type in the model.

 One way of deciding if a domain object should be modelled as a type or an aspect is to think about if it is a *noun* or a *verb*. For example, a Legal document could be modelled as a type and a CAD drawing could be modelled as a type. And it is quite clear that it does not make much sense to apply both the legal document type and the CAD drawing type to the same file content item. Now, both these types of documents could be emailed into the system and if we wanted to model that it would probably be best done with an aspect called for example emailed. You might also want to version both of these types of documents. So it make sense to have a versioned aspect. You could then apply both the versioned and emailed aspects to for example a Legal document.

 Now, it is necessary to look at dealing with nouns such as client and supplier. If you model them as types you could have problems, as many different file nodes could be related to a client. For example, a Legal document and a CAD drawing could both be related to them same client, so if you modelled *client* as a type you could not classify a document as both Legal and being associated with a specific client. So in this case client and supplier would be better off modelled as aspects so they can both be applied to a node that already has a type applied.

 Another implementation difference between types and aspects is that an aspect usually doesn't extend another aspect, it is more common for them to be stand alone. Aspects are used to implement cross-cutting concerns independently of the type of node. Note that there are a number of aspects already available out of the box, for example the aspects mentioned above, `emailed` and `versionable` are already available out-of-the-box. The following is a list of some of the aspects that comes with Alfresco Content Services out-of-the-box:

 -   **cm:titled** - an extra title and description property - usually applied automatically by the system.
-   **cm:auditable** - creator, created, modifier, modified, last access - this aspect is applied automatically by the system.
-   **cm:transformable** - indicates that the content item is transformable to other formats.
-   **cm:templatable** - applying this aspect to a file node makes this node available as a template in the "create from template..." action.
-   **cm:projectsummary**
-   **cm:complianceable** - holds remove after datetime data, there is no behaviour attached to it. It was created before the Records Management module, and the idea was that people could use rules or timed actions to create the behaviour they needed.
-   **cm:author** - applied automatically by the system if author metadata can be extracted from document.
-   **cm:dublincore** - see [https://en.wikipedia.org/wiki/Dublin_Core](https://en.wikipedia.org/wiki/Dublin_Core)
-   **cm:partable** - can be used to denote that a content item is part of another content item.
-   **cm:referencing** - allows a reference association to be made between one document and another document.
-   **cm:replaceable** - defines that a document has been replaced by another newer document.
-   **cm:effectivity** - apply this to a content item if a to and from date is useful.
-   **cm:summarizable** - apply this to a content item if a summary text is needed.
-   **cm:countable** - apply this to a content item to count number of times it's been accessed.
-   **cm:copiedfrom** - applied when a content item is a copy of another content item.
-   **cm:workingcopy** - a checked out working copy.
-   **cm:checkedOut**- applied by the system when a content file is checked out and locked.
-   **cm:versionable** - apply this aspect to a content file if it should be versioned (note. folders cannot be versioned).
-   **cm:lockable** - used by the system when a content item is checked out and locked.
-   **cm:subscribable** - can be used if users should be able to subscribe to content items.
-   **cm:classifiable** - apply this to a content item if it should be categorized.
-   **cm:taggable** - can be applied to any content item in the repository to allow tags to be applied to it.
-   **cm:rateable** - apply to content item if it should be ratable (like/unlike and 5-star rating schemes exist).
-   **cm:attachable** - apply if content item can have attachments, such as an email.
-   **cm:emailed** - apply this for example to a content item that has been emailed into the repository.
-   **cm:geographic** - applied automatically to items with longitude and latitude information embedded.

 It is always preferable to use out-of-the-box aspects where possible.

 The following is an example of a custom aspect definition:

 ```
<aspect name="acme:securityClassified">
   <title>Security Classified</title>
   <description>Content has been security classified</description>
   <properties>
       <property name="acme:securityClassification">
           <type>d:text</type>
           <index enabled="true">
               <atomic>true</atomic>
               <stored>false</stored>
               <tokenised>false</tokenised>
               <facetable>true</facetable>
           </index>
           <constraints>
               <constraint ref="acme:securityClassificationOptions" />
           </constraints>
       </property>
   </properties>
</aspect>

<aspect name="acme:webPublished">
   <title>Web published</title>
   <description>Content has been published to website</description>
   <properties>
       <property name="acme:publishedDate">
           <type>d:datetime</type>
           <mandatory>true</mandatory>
       </property>
   </properties>
</aspect>
```

 Here an aspect has been defined to keep track of the security classification for content items. Any ACME document can have a security classification applied and you can then build rules, policies, processing and other entities based on these security classifications. Faceted search has been specifically enabled for best performance and the default `tokenized` value has also changed to `false` so you only index the whole value, such as "Company Confidential".

 There is also a simple `webPublished` aspect that could be used to indicate if a content item has been published on the web.

 After completing the aspect definitions you have almost finished the content model implementation. It would now be possible to deploy it (i.e. bootstrap it) and use it. The labels used in the Share UI for aspects and types, such as when creating rules, are by default picked from the `title` element in the content model.

 However, in multilingual installations we need to supply localization labels for the types, aspects, properties etc. so it is possible to translate the model into different languages. Also, if the `title` element is not specified for an aspect or type in the content model, then the i18n resource file with the labels is needed.

 We can do that by supplying a properties file with property definitions according to certain naming conventions, here is an example for our ACME content model:

 ```
acme_contentModel.type.acme_document.title=ACME Document
acme_contentModel.type.acme_contract.title=ACME Contract
acme_contentModel.type.acme_policy.title=ACME Policy
acme_contentModel.type.acme_whitePaper.title=ACME White paper
acme_contentModel.type.acme_project.title=ACME Project
acme_contentModel.aspect.acme_webPublished.title=ACME Web Published
acme_contentModel.aspect.acme_securityClassified.title=ACME Security Classified
acme_contentModel.aspect.acme_projectIdentifier.title=ACME Project Identifier
acme_contentModel.property.acme_documentId.title=Document Id
acme_contentModel.property.acme_contractName.title=Contract Name
acme_contentModel.property.acme_contractId.title=Contract Id
acme_contentModel.property.acme_projectName.title=Project Name
acme_contentModel.property.acme_projectDescription.title=Project Description
acme_contentModel.property.acme_projectStartDate.title=Project Start Date
acme_contentModel.property.acme_projectNumber.title=Project Number
acme_contentModel.property.acme_publishedDate.title=Published Date
acme_contentModel.property.acme_securityClassification.title=Security Classification
acme_contentModel.child-association.acme_projectMember.title=Project Member
```

 The naming convention patter for these resource properties are as follows:

 ```
{content model namespace}_{content model local name}.[type|aspect|property|association|child-association].{content model namespace}_{local name}.[title|description]
```

 The resource properties file can now be bootstrapped into the repository at the same time as the content model XML file. This is done via a Spring bean definition as follows:

 ```
<bean id="org.alfresco.tutorial.customcontentmodelrepo.dictionaryBootstrap"
   parent="dictionaryModelBootstrap"
   depends-on="dictionaryBootstrap">
   <property name="models">
      <list>
         <value>alfresco/module/<module-id>/model/content-model.xml</value>
      </list>
   </property>
   <property name="labels">
      <list>
         <!-- Bootstrap Resource Bundles for data list type and properties -->
         <value>alfresco/module/${project.artifactId}/messages/content-model</value>
      </list>
   </property>
</bean>
```

 The key is to define a Spring bean that extends (sets as parent) the out-of-the-box `dictionaryModelBootstrap` Spring bean. You also want your custom model to be bootstrapped after the out-of-the-box content models as you use them in your model. This is achieved via the `depends-on` definition. You specify the models that you want to bootstrap as a list contained in the `models` property.

 > **Important:** A model cannot be contained in multiple XML files. The whole model needs to be deployed in one go, otherwise the next deployment overwrites the previous one. If your content model is very large then consider splitting it into multiple namespaces, such as document content model (`acme:contentModel`) and workflow content model (`acmew:workflowModel`) and deploy with multiple XML files.

 So we now have a content model defined in XML and registered with the repository. It is now possible to use one of the Alfresco Content Services APIs to create a node with a type from this content model, and one or more aspects applied from the model. Doing this via the Java API would look something like this:

 ```
private void createContractFile() {
  String acmeModelURI = "http://www.acme.org/model/content/1.0";
  String filename = "ContractA.txt";
  NodeRef parentFolderNodeRef =
          serviceRegistry.getNodeLocatorService().getNode(CompanyHomeNodeLocator.NAME, null, null);

  // Create Node
  QName associationType = ContentModel.ASSOC_CONTAINS;
  QName associationQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI,
          QName.createValidLocalName(filename));
  QName nodeType = ContentModel.TYPE_CONTENT;
  Map<QName, Serializable> nodeProperties = new HashMap<QName, Serializable>();
  nodeProperties.put(ContentModel.PROP_NAME, filename);
  nodeProperties.put(QName.createQName(acmeModelURI, "documentId"), "DOC001");
  nodeProperties.put(QName.createQName(acmeModelURI, "securityClassification"), "Company Confidential");
  nodeProperties.put(QName.createQName(acmeModelURI, "contractName"), "The first contract");
  nodeProperties.put(QName.createQName(acmeModelURI, "contractId"), "C001");
  ChildAssociationRef parentChildAssocRef = serviceRegistry.getNodeService().createNode(
          parentFolderNodeRef, associationType, associationQName, nodeType, nodeProperties);

  NodeRef newFileNodeRef = parentChildAssocRef.getChildRef();

  // Set content for node
  boolean updateContentPropertyAutomatically = true;
  ContentWriter writer = serviceRegistry.getContentService().getWriter(newFileNodeRef, ContentModel.PROP_CONTENT,
          updateContentPropertyAutomatically);
  writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
  writer.setEncoding("UTF-8");
  String fileContent = "Contract A, this contract ...";
  writer.putContent(fileContent);

  // Add an aspect to the node
  Map<QName, Serializable> aspectProperties = new HashMap<QName, Serializable>();
  aspectProperties.put(QName.createQName(acmeModelURI, "publishedDate"), new Date());
  serviceRegistry.getNodeService().addAspect(newFileNodeRef, QName.createQName(acmeModelURI, "webPublished"), aspectProperties);
}
```

 In this case you are creating an ACME Contract document file. You set the properties for the security classification aspect when you create the Contract node as it is a mandatory aspect on the Contract type. If you want to add other aspects you can do that as shown for the `webPublished` aspect.

 > **Important:** It is possible to create custom content models from the Alfresco Share UI without the need to use XML. These models can then be exported as XML and included in a build project. See the [Model Manager in Share Admin Tools documentation]({% link content-services/5.2/config/models.md %}) for further information.

|
|Deployment - App Server|-   Content Model Definition: tomcat/shared/classes/alfresco/extension/myContentModel.xml (File name can be anything you like as long as you refer to it in the Spring context file)
-   Content Model Bootstrap: tomcat/shared/classes/alfresco/extension/my-content-model-context.xml (File name has to end in -context.xml to be picked up as Spring Bean context file)

 These file locations are untouched by re-deployments and upgrades.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).

|-   Content Model Definition: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/model/content-model.xml
-   Content Model Localization: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages/content-model.properties
-   Content Model & Localization Deployment (Bootstrap): aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml

**Note**. To define and deploy a content model with full UI support requires both a repository JAR and a Share JAR project.|
|More Information|-   [Defining and Deploying a custom Content Model for Data Lists]({% link content-services/5.2/develop/repo-ext-points/data-lists.md %})
-   [Out-of-the-box Content Models](#out-of-the-box-content-models)
-   [Content Model Manager in Share Admin Tools]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager)

|
|Sample Code|-   [A complete ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-repo)
-   [Share UI configuration for the ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-share)
-   [Example of how to test your custom content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/blob/alfresco-51/all-in-one/integration-test-runner/src/test/groovy/org/alfresco/tutorials/testSpecs/context/CustomContentModelTestSpec.groovy)
-   [Data List content model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo)

|
|Tutorials|-   [Jeff Potts Alfresco Developer Series: Working With Custom Content Types in Alfresco](http://ecmarchitect.com/alfresco-developer-series-tutorials/content/tutorial/tutorial.html) - a very thorough walk-through of how to develop custom Content Models, a must read.
-   [Defining and Deploying a custom Content Model]({% link content-services/5.2/tutorial/platform/content-model.md %}#creating-a-content-model)  (Short introduction excluding localization)
-   [Adding a property with LIST constraint to a Content Model]({% link content-services/5.2/tutorial/platform/content-model.md %}#adding-a-custom-property)
-   [Using JavaScript to create content with custom type]({% link content-services/5.2/tutorial/platform/content-model.md %}#creating-content-of-custom-type)

|
|Developer Blogs|-   [Content Modelling from the Share UI](http://imben.me/easy-content-modeling-in-alfresco-51/) - Step by step guide with screenshots.

|

-   **[Content Model metadata](#content-model-metadata)**  
Defining a content model is expressed in terms of the content metamodel.
-   **[Deploying a content model](#deploying-a-content-model)**  
A content model is defined in its entirety as a single XML document that must comply with the content metamodel XSD schema provided by the repository. Each model contains a set of related and coherent definitions and is deployed as a unit.
-   **[Content models and CMIS](#content-models-and-cmis)**  
CMIS defines a data model, which encapsulates the core concepts found in most repositories. Alfresco Content Services provides an implementation of the CMIS bindings and maps the content metamodel to the CMIS domain model. This allows content models defined in Alfresco Content Services to be exposed and manipulated by using CMIS.

## Content Model {#content-model}

Defining a custom content model for the repository is a fundamental task in almost every content management project. It will allow you to build a robust system with content that can be classified, searched, structured, and processed in many different ways.

|Information|Content Model Introduction|
|-----------|--------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|One of the main differences between a network drive and a Content Management System (CMS) is that the latter provides extra classification features. If you look at a CMS behind the scenes, you can see that everything in the repository is typically a node (a node is also sometimes referred to as an object). Properties are then set on the nodes so they become folders, files, categories, rules, forums, web pages, e-mails, people, groups, and so on.

 Classifying nodes makes performing operations on them more precise, so it is easier to search for them, so they can be displayed in the user interface correctly, and node-specific operations can be carried out. The properties that can be used to classify nodes (content), cannot be selected at random, as then the system would not know what each one of these properties represents. Because of this a content management system usually comes preconfigured with properties that can be used to classify content in the repository. These properties are usually organized into two groups called *Types* and *Aspects*. The main difference between types and aspects is that a node can only have one type applied but it can have multiple aspects applied.

 Nodes are not isolated within the repository. They are related to one another in different ways. How the nodes are related to each other is defined using *Associations*. A typical association that comes out-of-the-box with Alfresco Content Services is the one between a folder node and its child nodes, this type of association is a `child-association`. So when you start using Alfresco Content Services you can immediately organize folders and files into a hierarchy, like with a file system.

 The Types, Aspects, Properties, and Associations are in turn organized into models that we call *Content Models*. Alfresco Content Services comes with a number of Content Models out of the box for different things like general folder and file content, workflow-related content, records content, web content, and so on.

 It is also useful to be able to create content models related to specific domains such as Finance or Marketing. As the type of content that may be stored in the repository can vary, generic standard content models are provided that provide a basis on which to build custom content models for domain-specific purposes.

 New types and aspects are defined forming new custom content models. But how do you know how to specify a type and a property with, for example, a data type integer? Alfresco Content Services also comes with a *Meta Model*. The Meta model defines what syntax you can use when defining your content models. It will, for example, define the syntax for how a type or an integer property should be defined. The following diagram gives a simplified overview of the relationship between meta model, content models, and custom content models:

![]({% link content-services/images/dev-extensions-repo-content-model-metamodel-vs-model.png %})

 In the image, you can see two nodes in the repository: one folder node and one ACME Contract document node. The Contract type extends the ACME Generic Document type, or base type if you like, which in turn extends the generic Content type. The Contract document node also has versioning turned on by having the Versionable aspect applied.

 Both the custom content model and the Alfresco Content Services content model is defined by the Data Dictionary Schema, which is the same as the Meta Model.

 Content models, types, aspects, and properties are similar to object-oriented concepts in programming. If you are familiar with object-oriented modelling, then the concepts of content modelling should feel familiar.

 The meta model contains the constructs or syntax that can be used to define content models, which are defined in XML.

 > **Important:** It is possible to create custom content models from the Alfresco Share UI without the need to use XML. These models can then be exported as XML and included in a build project. See the [Content modeling with Model Manager]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager) for further information.

 For detailed instructions on how to implement content models, see the [define and deploy section](#content-model-defining-and-deploying). When you have defined and deployed a content model you would want to be able to work with it from the Share UI, see the [configure UI section](#content-model-configuring-the-user-interface) for more information around this.

|
|Deployment - App Server|-   Content Model Definition: tomcat/shared/classes/alfresco/extension/myContentModel.xml (File name can be anything you like as long as you refer to it in the Spring context file)
-   Content Model Bootstrap: tomcat/shared/classes/alfresco/extension/my-content-model-context.xml (File name has to end in -context.xml to be picked up as Spring Bean context file)
-   Share UI configuration: tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml

 These file locations are untouched by re-deployments and upgrades.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).

|-   Content Model Definition: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/model/content-model.xml
-   Content Model Localization: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages/content-model.properties
-   Content Model & Localization Deployment (Bootstrap): aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml
-   Share UI Configuration: aio/share-jar/src/main/resources/META-INF/share-config-custom.xml
-   Share UI Localization: aio/share-jar/src/main/resources/alfresco/web-extension/messages/share-jar.properties
-   Share UI Localization Deployment (Bootstrap) : aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml

 To implement and deploy a content model with full UI support you need both a repository JAR and a Share JAR project.|
|More Information|-   [Define and Deploy a custom content model](#content-model-defining-and-deploying) - Detailed walk-through
-   [Configure the Share UI for a custom content model](#content-model-configuring-the-user-interface) - Detailed walk-through
-   [Out-of-the-box Content Models](#out-of-the-box-content-models)
-   [Model Manager in Share Admin Tools]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager)

|
|Sample Code|-   [A complete ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-repo)
-   [Share UI configuration for the ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-share)
-   [Example of how to test your custom content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/blob/alfresco-51/all-in-one/integration-test-runner/src/test/groovy/org/alfresco/tutorials/testSpecs/context/CustomContentModelTestSpec.groovy)
-   [Data List content model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo)

|
|Tutorials|-   [Jeff Potts Alfresco Developer Series: Working With Custom Content Types in Alfresco](http://ecmarchitect.com/alfresco-developer-series-tutorials/content/tutorial/tutorial.html) - a very thorough walk-through of how to develop custom Content Models, a must read.
-   [Defining and Deploying a custom Content Model]({% link content-services/5.2/tutorial/platform/content-model.md %}#creating-a-content-model)  (Short introduction excluding localization)

|
|Developer Blogs|-   [Content Modelling in from the Share UI](http://imben.me/easy-content-modeling-in-alfresco-51/) - Step by step guide with screenshots.

|

-   **[Content Model - Defining and Deploying](#content-model-defining-and-deploying)**  
Defining a custom content model involves creating an XML file. The model is then deployed with a Spring bean. Localized labels for the content model items can also be part of the deployment.
-   **[Content Model - Configuring the User Interface](#content-model-configuring-the-user-interface)**  
To make custom content models available in the Share User Interface some configuration is needed in XML. Localization of metadata and search forms can also be part of this configuration.
-   **[Out-of-the-box content models](#out-of-the-box-content-models)**  
The repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.

## Metadata XML schema {#metadata-xml-schema}

A content metamodel is formally described by an XML-schema document. When in doubt about how to express a content model or understand the full capabilities of the content metamodel, interrogate the XML schema as it provides the definitive description of the content metamodel.

The target namespace of the content metamodel XML schema is

`http://www.alfresco.org/model/dictionary/1.0`

> **Note:** You can locate the latest content metamodel XSD schema at: `http://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/repository/config/alfresco/model/modelSchema.xsd`

## Model header {#model-header}

Each content model starts with a model header, which provides an introduction to the model containing description, author, publication date, and version number. All parts of the model introduction are optional.

```


<xs:element name="model">
  <xs:attributeGroup ref="name" />
...
  <xs:complexType>
    <xs:sequence>
    <xs:element name="description" type="string"maxOccurs="1" minOccurs="0" />
    <xs:element name="author" type="string"maxOccurs="1" minOccurs="0" />
    <xs:element name="published" type="date"maxOccurs="1" minOccurs="0" />
    <xs:element name="version" type="string"maxOccurs="1" minOccurs="0" />
...
  </xs:sequence>
...
</xs:complexType>
...
  <xs:attributeGroup name="name">
    <xs:attribute name="name" type="string" use="required" />
    </xs:attributeGroup>
</xs:element>
      
      
```

A content model must be uniquely named within a given repository. To help define unique names across all repositories, the content metamodel supports the notion of a namespace.

## Model namespaces {#model-namespaces}

Namespaces provide a way to specify globally unique names for definitions within content models.

A namespace is composed of a URI (a unique string often prefixed with an HTTP address associated with the author) and a Prefix (a shorthand code for the URI). Alfresco Content Services has defined several namespaces for the models provided out of the box with the repository. The prefix for those namespace URIs is `www.alfresco.org`.

To associate a name with a namespace, prefix the name with the relevant namespace prefix. For example, if the namespace URI `http://example.org/contentmodels` and associated prefix `ex` are defined, then the name e`x:customtype` means that `customtype` is a name defined within the namespace `http://example.org/contentmodels`.

Each content model must define at least one namespace for the names defined in that content model.

```

        
  <xs:element name="model">
  ...
    <xs:element name="namespaces">
      <xs:complexType>
       <xs:sequence>
         <xs:element name="namespace" maxOccurs="unbounded" minOccurs="1">
        <xs:complexType>
          <xs:attributeGroup ref="namespaceDefinition" />
          </xs:complexType>
      </xs:element>
     </xs:sequence>
    </xs:complexType>
   </xs:element>
  ...
   <xs:attributeGroup name="namespaceDefinition">
      <xs:attribute name="uri" type="string" use="required" />
      <xs:attribute name="prefix" type="string" use="required" />
   </xs:attributeGroup>
  ...
  </xs:element>


```

A content model might need to refer to definitions that reside in another content model. For example, a type can inherit from a type defined in another content model. To refer to names defined outside of the content model, import the namespace within which that name is defined. Once imported, the name can be used just as if the content model itself defined it.

```

        
  <xs:element name="model">
  ...
    <xs:element name="imports" maxOccurs="1" minOccurs="0">
     <xs:complexType>
      <xs:sequence>
     <xs:element name="import" maxOccurs="unbounded" minOccurs="1">
       <xs:complexType>
        <xs:attributeGroup ref="namespaceDefinition" />
      </xs:complexType>
     </xs:element>
     </xs:sequence>
    </xs:complexType>
   </xs:element>
  ...
  </xs:element>


```

On import of a namespace URI, it is possible to remap the namespace prefix defined in the originating content model in case there are prefix clashes between imported namespaces. The repository does not allow a content model to reference names that do not exist.


## Model types {#model-types}

A content model can define one or more types.

```

        
<xs:element name="model">
...
  <xs:element name="types" maxOccurs="1" minOccurs="0">
    <xs:complexType>
     <xs:sequence>
      <xs:element name="type" type="type" maxOccurs="unbounded" minOccurs="1" />
     </xs:sequence>
   </xs:complexType>
  </xs:element>
...
</xs:element>


```

Each type is uniquely named and optionally labeled with a title and description. A type can declare any number of properties to represent metadata associated with the type and any number of associations to other types.

```

        
<xs:complexType name="type">
  <xs:complexContent>
    <xs:extension base="class"/>
  </xs:complexContent>
</xs:complexType>

<xs:complexType name="class">
...
<xs:attributeGroup ref="name" />
...
<xs:sequence>
...
 <xs:group ref="<b>TextualDescription</b>"/>
  <xs:element name="properties" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="property" type="property"maxOccurs="unbounded"
         minOccurs="0" />
      </xs:sequence>
     </xs:complexType>
   </xs:element>

<xs:element name="associations" maxOccurs="1" minOccurs="0">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="association" type="association"
      maxOccurs="unbounded" />
   </xs:sequence>
  </xs:complexType>
 </xs:element>
...
</xs:sequence>
</xs:complexType>

<xs:group name="<b>TextualDescription</b>">
   <xs:sequence>
     <xs:element name="title" type="string" maxOccurs="1" minOccurs="0" />
     <xs:element name="description" type="string" maxOccurs="1" minOccurs="0" />
  </xs:sequence>
</xs:group>


```

The schema definition of a type is simply a derivation of the schema definition named class.

A type definition also allows control over whether nodes of that type are archived when deleted.

```

        
<xs:complexType name="class">
...
  <xs:element name="archive" type="boolean" maxOccurs="1" minOccurs="0" />
...
</xs:complexType>


```

Archived nodes can be restored just like the contents of the recycle bin in many operating systems.

## Properties {#properties}

A node can have multiple properties, with each property being of a specific datatype.

For example:

```

        
<xs:complexType name="property">
  <xs:attributeGroup ref="<b>name</b>" />
  <xs:sequence>
    <xs:group ref="<b>TextualDescription</b>" />
    <xs:element name="type" type="string" />
    <xs:element name="mandatory" maxOccurs="1" minOccurs="0" type="<b>mandatoryDef</b>" />
    <xs:element name="multiple" type="boolean" maxOccurs="1" minOccurs="0" />
    <xs:element name="default" type="anyType" maxOccurs="1" minOccurs="0" />
    <xs:element name="index" maxOccurs="1" minOccurs="0">
     <xs:complexType>
      <xs:sequence>
        <xs:element name="atomic" type="boolean" maxOccurs="1" minOccurs="0" />
        <xs:element name="stored" type="boolean" maxOccurs="1" minOccurs="0" />
        <xs:element name="tokenised" maxOccurs="1" minOccurs="0" >
          <xs:simpleType>
            <xs:restriction base="string">
             <xs:enumeration value="true"/>
             <xs:enumeration value="false"/>
             <xs:enumeration value="both"/>
            </xs:restriction>
          </xs:simpleType>
         </xs:element>
       </xs:sequence>
       <xs:attribute name="enabled" type="boolean" use="required" />
     </xs:complexType>
    </xs:element>
   </xs:sequence>
  </xs:complexType>

<xs:complexType name="<b>mandatoryDef</b>" mixed="true">
  <xs:attribute name="enforced" use="optional" type="boolean"/>
</xs:complexType>


```

### Data types

The only feature of a property that must be specified is its data type, of which the repository supports a wide variety. Each data type is named.

Commonly used data types out of the box are:

-   **`d:text`**

    A text value, a character string

-   **`d:mltext`**

    A multilingual text value where many localized representations of the text value can be held

-   **`d:content`**

    An arbitrarily long text or binary stream

-   **`d:int`**

    An integer value (java.lang.Integer equivalent)

-   **`d:long`**

    A long value (java.lang.Long equivalent)

-   **`d:float`**

    A float value (java.lang.Float equivalent)

-   **`d:double`**

    A double value (java.lang.Double equivalent)

-   **`d:date`**

    A date value (java.lang.Date equivalent)

-   **`d:datetime`**

    A date and time value (java.lang.Date equivalent)

-   **`d:boolean`**

    A boolean value (java.lang.Boolean equivalent)

-   **`d:any`**

    Any value, regardless of type


### Property definition

By default a property supports a single value, but it can support multiple values by using the `multiple` element. Multiple values are rendered as lists in the various Alfresco Content Services APIs.

A value can also be mandated on creation of a node by using the mandatory element. That is, a transaction will not commit unless all mandatory values have been provided for nodes modified within that transaction. There are actually two forms of mandatory: enforced and relaxed. Enforced is as described but relaxed gives finer control over when mandatory values must be provided. A transaction will still commit if a relaxed mandatory value has not been specified; however, the node with the missing value will be marked as incomplete (by using the `sys:incomplete` aspect). This is important, as not all content creation processes (for example, by using many of the protocols supported by Alfresco Content Services) provide the ability to set property values. Custom solutions can then be configured or built that trigger a business process for collecting the missing values (for example, by using workflow user-assigned tasks).

In conjunction with mandating a value, a property definition can also specify a default value that is set automatically by the repository if the value has not been set at transaction commit time.

To enable the repository to query on a property value, the property must first be indexed, which is controlled by using the `index` element. Choose which properties are indexed carefully, as each property will increase the size of the index. Properties can be indexed as part of the transaction commit (known as atomic indexing) or indexed in the background. Typically, properties of type `d:content` are background-indexed. Control over how values are tokenized is also possible, such that only the tokenized value is stored in the index, or only the original value is stored in the index, or both. Tokenization is the process used by the query engine for recognizing words and other elements, such as punctuation, and allows for comparisons in d:date field searches.

Although the content model provides the ability to specify property definitions, the repository supports a feature known as a residual property, where a value can be set on a node for which there is no associated property definition defined in a content model. This allows for a node to act as a property bag for an arbitrary set of named-value pairs.

## Associations {#associations}

Associations must be uniquely named and optionally labeled with a title and description.

For example:

```

        
<xs:complexType name="association">
  <xs:attributeGroup ref="<b>name</b>" />
  <xs:sequence>
    <xs:group ref="<b>TextualDescription</b>" />
    <xs:element name="source" maxOccurs="1" minOccurs="0">
 
  <xs:complexType>
    <xs:sequence>
      <xs:element name="mandatory" type="boolean"maxOccurs="1" minOccurs="0" />
      <xs:element name="many" type="boolean"maxOccurs="1" minOccurs="0" />
    </xs:sequence>
  </xs:complexType>
 </xs:element>
<xs:element name="target">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="class" type="string" maxOccurs="1" minOccurs="1" />
      <xs:element name="mandatory" type="<b>mandatoryDef</b>"maxOccurs="1"
      minOccurs="0" />
      <xs:element name="many" type="boolean"maxOccurs="1" minOccurs="0" />
    </xs:sequence>
   </xs:complexType>
  </xs:element>
 </xs:sequence>
</xs:complexType>


```

Associations are always between two types - a source type and a target type - where the source type is inherently the type that defines the association. The only feature of an association that must be specified is its target type by using the `class` element on the target end.

Fine-tune each end of the association by specifying features such as cardinality by using the `mandatory` and `many` elements:

-   0 or 1 => mandatory = false and many = false
-   1 => mandatory = true and many = false
-   0 or more => mandatory = false and many = true
-   1 or more => mandatory = true and many = true

As with mandatory properties, both enforced and relaxed modes are supported for the target end, allowing control over whether a transaction can commit or not based on missing associations. In relaxed mode, the incomplete aspect is added to source nodes where associations to target nodes are missing.

Child associations are defined in the same way as peer associations, with a few additional features.

```

        
<xs:complexType name="childAssociation">
  <xs:complexContent>
    <xs:extension base="association">
      <xs:sequence>
        <xs:element name="duplicate" type="boolean"maxOccurs="1" minOccurs="0" />
        <xs:element name="propagateTimestamps" type="boolean"maxOccurs="1"
        minOccurs="0" />
      </xs:sequence>
     </xs:extension>
  </xs:complexContent>
</xs:complexType>
      
      
```

The `duplicate` element lets you specify the uniqueness of child-node names within the parent. If `duplicate` is false, then the repository will not allow the commit of a transaction where duplicate node names are found within a set of children for a given single parent. So, if you try and create two files named for example "text.txt" in the same folder, then the second one will not be created as duplicate names are not allowed.

The `propagateTimestamps` element allows control over whether the modified timestamp of a parent should be modified if any of its children are modified.

## Constraints {#constraints}

Define constraints in one of two ways: “standalone” allows for the reuse of constraints across many properties; “inline” defines the constraint specifically for a single property.

```

        
<xs:complexType name="constraint">
  <xs:attribute name="name" use="optional" type="string" />
  <xs:attribute name="type" type="string" use="optional"/>
  <xs:sequence>
    <xs:element name="parameter" maxOccurs="unbounded" type="<b>namedValue</b>"
    minOccurs="0"/>
  </xs:sequence>
  <xs:attribute name="ref" use="optional" type="string" />
</xs:complexType>

<xs:complexType name="<b><b>namedValue</b></b>">
  <xs:attributeGroup ref="<b>name</b>" />
  <xs:choice>
    <xs:element name="value" type="string" maxOccurs="1"minOccurs="0" />
    <xs:element name="list" maxOccurs="1" minOccurs="0">
      <xs:complexType>
        <xs:sequence>
          <xs:element name="value" type="string"maxOccurs="unbounded"
          minOccurs="0"/>
        </xs:sequence>
     </xs:complexType>
   </xs:element>
  </xs:choice>
</xs:complexType>


```

A standalone constraint must specify a unique name and a type. There are several constraint types provided out of the box; the commonly used types are:

-   **REGEX**; Property value matches regular expression.
-   **LENGTH**: Text property value length must reside within minimum and maximum length limits.
-   **MINMAX**: Numeric property value must reside within minimum and maximum range limits.
-   **LIST**: Property value must be one of those specified in the list of values.

Custom constraint types can be developed and registered with the repository. Each constraint type is parameterized by using zero or more `parameter` elements, where the parameter names are specific to each type:

-   **REGEX**: Expression
-   **LENGTH**: `minLength` and `maxLength`
-   **MINMAX**: `minValue` and `maxValue`
-   **LIST**: `allowedValues` and `caseSensitive`

A content model can define one or more standalone constraints.

```


<xs:element name="model">
...
  <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="constraint" type="<b>constraint</b>" maxOccurs="unbounded"
        minOccurs="1" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:element>


```

Each property can support one or more constraints either by referencing an existing standalone constraint definition or defining one inline by using the constraint element.

```

        
<xs:complexType name="property">
...
  <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="constraint" type="<b>constraint</b>" maxOccurs="unbounded"
        minOccurs="1" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:complexType>


```

An existing constraint is referenced by using the `ref` element, whose value is the name of the constraint to reference. Otherwise, an inline constraint is defined in the same manner as a standalone constraint.

## Inheritance {#inheritance}

A type can inherit its definition from another type. All features of the parent type are inherited, including property, association, and constraint definitions, except for the parent type name, title, and description.

```

        
<xs:complexType name="class">
  <xs:sequence>
...
   <xs:element name="parent" type="string" maxOccurs="1" minOccurs="0" />
...
  </xs:sequence>
</xs:complexType>


```

A type inherits from another type when its parent element is populated with the name of the parent type to inherit. The inheriting type is often referred to as the subtype, while its parent is often referred to as the super-type. Inheritance can be nested, so it is possible to inherit from a type which itself inherits from another type.

Subtypes can specify further property, association, and constraint definitions in addition to those inherited from its parent. However, it is sometimes useful to refine a definition inherited from its parent. For example, a parent type can support an optional property, which the subtype wishes to lock down by mandating its value.

It is not possible to refine all inherited definitions, as it would be very easy to define an incoherent content model. For that reason, the content metamodel provides a fixed set of refinements known as property overrides.

```

        
<xs:complexType name="class">
...
  <xs:element name="overrides" maxOccurs="1" minOccurs="0">
    <xs:complexType>
     <xs:sequence>
       <xs:element name="property" type="<b>propertyOverride</b>" minOccurs="1" />
    </xs:sequence>
   </xs:complexType>
  </xs:element>
...
</xs:complexType>

<xs:complexType name="<b>propertyOverride</b>">
  <xs:attributeGroup ref="<b>name</b>" />
   <xs:sequence>
    <xs:element name="mandatory" type="boolean" maxOccurs="1" minOccurs="0" />
    <xs:element name="default" type="string" maxOccurs="1" minOccurs="0" />
    <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
    <xs:sequence>
    <xs:element name="<b>constraint</b>" type="constraint" minOccurs="1" />
   </xs:sequence>
  </xs:complexType>
 </xs:element>
 </xs:sequence>
</xs:complexType>


```

Each property override has the same name as the property it wishes to override from its parent type. You can override the following property features:

-   `**mandatory**`: A subtype can enforce a property to become mandatory but it cannot relax an existing parent mandatory constraint.
-   `**default**`: A subtype can introduce a default value or change an existing parent default value.
-   **`constraints`**: Additional constraints can be applied to a parent property, but existing constraints cannot be modified.

## Aspects {#aspects}

Aspects allow property and association definitions to be shared across many types of nodes. This means a cross-cutting feature of an ECM domain model can be encapsulated and applied throughout the rigid part of the model represented by types. It is the equivalent of multiple inheritance.

A node in the repository must be of a single type, but might be attached to one or more aspects. The aspects are either inherited from its type (as defined in the content model), or can be attached or detached at runtime, allowing a node to dynamically inherit features and capabilities.

Each content model can define one or more aspects.

```


<xs:element name="model">
...
  <xs:element name="aspects" maxOccurs="1"minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="aspect" type="<b>aspect</b>"maxOccurs="unbounded"
         minOccurs="1"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:element></codeblock></p>
    <p>Aspects support all the same features as types, and therefore are defined in the same way as
      types.</p>
    <p>
      <codeblock><xs:complexType name="<b>aspect</b>">
  <xs:complexContent>
    <xs:extension base="<b>class</b>" />
  </xs:complexContent>
</xs:complexType>


```

As with the type definition, an aspect definition is simply a derivation of the schema definition named class. This means that an aspect shares all the same features as a class, including property, association, and constraint definitions. Aspects can inherit from parent aspects and support property overrides.

An aspect can be attached to one or more types. This means that a node created of that type automatically inherits the attached aspects.

```

        
<xs:complexType name="class">
...
  <xs:element name="mandatory-aspects" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="aspect" type="string" maxOccurs="unbounded"
         minOccurs="1"/>
      </xs:sequence>
    </xs:complexType>
   </xs:element>
...
</xs:complexType>


```

To attach an aspect, specify the name of the aspect to attach in the aspect element of the source type. This feature is available at the class level, allowing aspects to be attached to other aspects as well as types.

## Deploying a content model {#deploying-a-content-model}

A content model is defined in its entirety as a single XML document that must comply with the content metamodel XSD schema provided by the repository. Each model contains a set of related and coherent definitions and is deployed as a unit.

You can deploy several content models to the repository. Definitions in one content model can depend on definitions in another content model, allowing for the sharing of definitions.

You can deploy a content model into the repository using the bootstrap method, which requires a reboot; or the dynamic method, which does not require a reboot. You can also manage models using the Admin Console.

-   **[Deploying a content model: bootstrap approach]({% link content-services/5.2/develop/repo-ext-points/content-model.md %}#deploying-a-content-model:-bootstrap-approach)**  
The bootstrap approach to deploying a content model involves modifying repository XML configuration files to register the content model.
-   **[Deploying a content model: dynamic approach](#deploying-a-content-model:-dynamic-approach)**  
When deploying a model, the bootstrap approach places content model XML files into the classpath. The dynamic approach places the files in the repository itself under Data Dictionary/Models.
-   **[Managing models using the Admin Console](#managing-models-using-the-admin-console)**  
Use the Model and Messages Console in the Admin Console to manage models.
-   **[Content models and multi-tenancy](#content-models-and-multi-tenancy)**  
Dynamic content models are available on a per-tenant basis in an on-premises multi-tenancy installation.

## Deploying a content model: bootstrap approach {#deploying-a-content-model:-bootstrap-approach}

The bootstrap approach to deploying a content model involves modifying repository XML configuration files to register the content model.

The content model is read, validated, and registered on start-up of the repository. A repository component called the Dictionary Bootstrap loads a specified list of content models and registers them with the repository. To register new content models, you must either modify the content model list of an existing Dictionary Bootstrap component or define a new Dictionary Bootstrap component.

1.  To define a Dictionary Bootstrap component, use the following Spring framework XML:

    ```
    <bean id="org.alfresco.tutorial.customcontentmodelrepo.dictionaryBootstrap"
          parent="dictionaryModelBootstrap"
          depends-on="dictionaryBootstrap">
        <property name="models">
            <list>
                <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
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

    > **Note:** The labels property can be left out if localization is not needed and only one language is supported.

2.  Add the XML snippet to an extension context XML file in the classpath, following the usual Alfresco Content Services customization conventions.

    > **Note:** For a default installation, extension context XML files are placed into <installLocation>/tomcat/shared/classes/alfresco/extension.

    The content models that Alfresco Content Services provides out of the box are all registered this way.

    Using the bootstrap approach, changes to model definitions through the content-model XML file are only registered after restarting the repository. As this can lead to long development and test cycles, use the bootstrap approach only once the model is baked. For this reason, there is an alternate dynamic approach to deploying a content model, allowing the registration and updates to content models without the need to restart the repository to pick up the changes.


## Deploying a content model: dynamic approach {#deploying-a-content-model:-dynamic-approach}

When deploying a model, the bootstrap approach places content model XML files into the classpath. The dynamic approach places the files in the repository itself under Data Dictionary/Models.

Alfresco Share provides full access to the repository Data Dictionary folder. Upon creating or uploading a content model XML file, the model, by default, will not be active.

1.  To activate the model:
2.  Load the model file into the folder Data Dictionary/Models.

3.  Click on **Edit Properties** for the model file.

4.  Select the **Model Active** checkbox.

5.  Click the **Save** button to save your changes.

    The model is now active.

6.  To deactivate a model:
7.  Click on **Edit Properties** for the model file.

8.  Clear the **Model Active** checkbox.

9.  Click the **Save** button to save your changes.

    The model is now inactive.

10. To delete a content model:
11. Delete the content model XML file.

    > **Important:** There are restrictions on what changes you can make to a content model XML file and when you can delete a content model XML file. Only incremental additions are allowed; that is, changes that do not require modifications to existing data in the repository, or do not modify existing definitions and their properties. You can delete the content model only if it is not used by any data in the repository.


## Managing models using the Admin Console {#managing-models-using-the-admin-console}

Use the Model and Messages Console in the Admin Console to manage models.

1.  Open the Admin Console (http://{host}:{port}/alfresco/service/enterprise/admin).

2.  In the **Consoles** section, click **Model and Messages Console**. You see the **Model and Messages Console** page.

    ![]({% link content-services/images/dev-extensions-repo-content-model-admin-console.png %})

3.  Perform the following as required for administering models:

    1.  To list all deployed models that are stored in the repository data dictionary, type show models.

    2.  To upload model to repository and load into runtime data dictionary, type deploy model.

        This command also sets the repository model as active. If a model is already deployed, then it will be updated and re-deployed.

        ```
        deploy model alfresco/extension/exampleModel.xml
        ```

    3.  To permanently delete model from repository (all versions) and unload from runtime data dictionary, type undeploy model.

        ```
        undeploy model exampleModel.xml
        ```

    4.  To set repository model to active and load into runtime data dictionary, type activate model.

        ```
        activate model exampleModel.xml
        ```

    5.  To set repository model to inactive and unload from runtime data dictionary, type deactivate model.

        ```
        deactivate model exampleModel.xml
        ```

4.  Perform the following as required for administering message resource bundles:

    1.  To list all deployed message resource bundles that are stored in the repository data dictionary, type show messages.

    2.  To upload message resource bundle to repository and runtime message service, type deploy messages.

        ```
        deploy messages alfresco/extension/lifecycle-messages
        ```

    3.  To remove message resource bundle from repository and from runtime message service, type undeploy messages.

        ```
        undeploy messages lifecycle-messages
        ```

    4.  To reload message resource bundle from repository into runtime message service, type reload messages.

        ```
        reload messages lifecycle-messages
        ```


## Content models and multi-tenancy {#content-models-and-multi-tenancy}

Dynamic content models are available on a per-tenant basis in an on-premises multi-tenancy installation.

An on-premisess installation of Alfresco Content Services can be configured to be multi-tenanted. The Alfresco Content Services public cloud is a multi-tenancy installation. The following table summarizes content model availability in these installation types:

|Installation|System-wide (all tenants) static/bootstrap (built-in and custom models)|Per-tenant static/bootstrap|Per-tenant dynamic/custom|
|------------|---------------------------------------------------------------------------|---------------------------|-------------------------|
|On prem|Yes|No|Yes|
|Public cloud|Yes|No|No|

## Content models and CMIS {#content-models-and-cmis}

CMIS defines a data model, which encapsulates the core concepts found in most repositories. Alfresco Content Services provides an implementation of the CMIS bindings and maps the content metamodel to the CMIS domain model. This allows content models defined in Alfresco Content Services to be exposed and manipulated by using CMIS.

The following summarizes the CMIS data model:

![]({% link content-services/images/5-5.png %})

The core of the domain model allows for the definition of object types with associated properties. A type ID identifies types, which inherits their definition from a parent type. Features of a type include whether they can be queried by the CMIS query language, filed into multiple folders, and controlled by using permissions. Features of a property include its data type, whether a value is required, and a default value if one is not explicitly provided.

Because these features are familiar, you can map between the CMIS data model and the content metamodel with little loss of information.

The Alfresco Content Services content metamodel is mapped to the CMIS data model as follows:

-   **Type**—Maps to CMIS Object Type
-   **Property**—Maps to CMIS Property Definition
-   **Peer Association**—Maps to CMIS Relationship

### Mapping child associations

CMIS has built-in support for hierarchies through CMIS Folder and CMIS Document.

Alfresco Content Services maps its out-of-the-box types `cm:folder` and `cm:content` (as defined in the domain model) to CMIS Folder and CMIS Document, respectively. A folder can contain a mixture of documents and folders, allowing for a hierarchy of documents to be built. Through this, CMIS supports an implicit notion of parent to child, to which is used by Alfresco Content Services to map its child association. Subtypes of `cm:folder` and `cm:content` are exposed as subtypes of CMIS Folder and Document, respectively.

## Content Model - Configuring the User Interface {#content-model-configuring-the-user-interface}

To make custom content models available in the Share User Interface some configuration is needed in XML. Localization of metadata and search forms can also be part of this configuration.

|Information|Content Model - Configuring the User Interface|
|-----------|----------------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Now when we have read the [Content Model Introduction](#content-model) and have defined and deployed a content model, it is time to configure the Share UI for it. For more information about how to define and deploy a content model, have a look at this [section](#content-model-defining-and-deploying).

 Here we assume that we are working with the ACME content model that was defined and deployed in this [section](#content-model-defining-and-deploying). What was left out then was configuration of the Share UI so it can display information related to the custom ACME content model. The Contract document that was created with a piece of Java code would for example not be displayed in the Share UI as anything else then a standard generic document. We would not be able to see that it is actually an ACME Contract document. Also, there would not be any way of searching specifically for ACME Contract documents from the UI, such as from the Advanced Search page.

 To make the new custom content model known to the Share UI we have to do some additional configuration in share-config-custom.xml. If we want to see Contract document information as follows:

 ![]({% link content-services/images/dev-extensions-repo-content-model-contract-displayform.png %})

 Then we would have to configure a view form as follows:

 ```
<config evaluator="node-type" condition="acme:contract">
  <forms>
      <!-- Default form configuration -->
      <form>
          <field-visibility>
              <show id="cm:name" />
              <show id="cm:title" force="true" />
              <show id="cm:description" force="true" />
              <show id="mimetype" />
              <show id="cm:author" force="true" />
              <show id="size" for-mode="view" />
              <show id="cm:creator" for-mode="view" />
              <show id="cm:created" for-mode="view" />
              <show id="cm:modifier" for-mode="view" />
              <show id="cm:modified" for-mode="view" />

              <!-- tags and categories -->
              <show id="cm:taggable" for-mode="edit" force="true" />
              <show id="cm:categories" />

              <!-- cm:dublincore aspect -->
              <show id="cm:publisher"/>
              <show id="cm:contributor"/>
              <show id="cm:type"/>
              <show id="cm:identifier"/>
              <show id="cm:dcsource"/>
              <show id="cm:coverage"/>
              <show id="cm:rights"/>
              <show id="cm:subject"/>

              <!-- cm:complianceable aspect -->
              <show id="cm:removeAfter" />

              <!-- cm:effectivity aspect -->
              <show id="cm:from"/>
              <show id="cm:to"/>

              <!--  cm:summarizable aspect -->
              <show id="cm:summary" />

              <!-- cm:translatable aspect -->
              <show id="cm:translations" />

              <!-- cm:localizable aspect -->
              <show id="cm:locale" />

              <!-- cm:ownable aspect -->
              <show id="cm:owner" />

              <!-- cm:attachable aspect -->
              <show id="cm:attachments" />

              <!-- cm:emailed aspect -->
              <show id="cm:originator" />
              <show id="cm:addressee" />
              <show id="cm:addressees" />
              <show id="cm:sentdate" />
              <show id="cm:subjectline" />

              <!-- exif:exif aspect -->
              <show id="exif:dateTimeOriginal" />
              <show id="exif:pixelXDimension" />
              <show id="exif:pixelYDimension" />
              <show id="exif:exposureTime" />
              <show id="exif:fNumber" />
              <show id="exif:flash" />
              <show id="exif:focalLength" />
              <show id="exif:isoSpeedRatings" />
              <show id="exif:manufacturer" />
              <show id="exif:model" />
              <show id="exif:software" />
              <show id="exif:orientation" />
              <show id="exif:xResolution" />
              <show id="exif:yResolution" />
              <show id="exif:resolutionUnit" />

              <!-- audio:audio aspect -->
              <show id="audio:album" />
              <show id="audio:artist" />
              <show id="audio:composer" />
              <show id="audio:engineer" />
              <show id="audio:genre" />
              <show id="audio:trackNumber" />
              <show id="audio:releaseDate" />
              <show id="audio:sampleRate" />
              <show id="audio:sampleType" />
              <show id="audio:channelType" />
              <show id="audio:compressor" />

              <!-- cm:indexControl aspect -->
              <show id="cm:isIndexed" />
              <show id="cm:isContentIndexed" />

              <!-- cm:geographic aspect -->
              <show id="cm:latitude" />
              <show id="cm:longitude" />

              <!-- surf:widget aspect -->
              <show id="surf:widgetType"/>
              <show id="surf:mid"/>
              <show id="surf:label"/>

**             <show id="acme:documentId" force="true"/>
              <show id="acme:securityClassification" />
              <show id="acme:contractName" />
              <show id="acme:contractId" />**
          </field-visibility>
          <appearance>
              <field id="cm:name">
                  <control>
                      <control-param name="maxLength">255</control-param>
                  </control>
              </field>
              <field id="cm:title">
                  <control template="/org/alfresco/components/form/controls/textfield.ftl" />
              </field>
              <field id="cm:description">
                  <control>
                      <control-param name="activateLinks">true</control-param>
                  </control>
              </field>
              <field id="mimetype">
                  <control template="/org/alfresco/components/form/controls/mimetype.ftl" />
              </field>
              <field id="size">
                  <control template="/org/alfresco/components/form/controls/size.ftl" />
              </field>
              <field id="cm:taggable">
                  <control>
                      <control-param name="compactMode">true</control-param>
                      <control-param name="params">aspect=cm:taggable</control-param>
                      <control-param name="createNewItemUri">/api/tag/workspace/SpacesStore</control-param>
                      <control-param name="createNewItemIcon">tag</control-param>
                  </control>
              </field>
              <field id="cm:categories">
                  <control>
                      <control-param name="compactMode">true</control-param>
                  </control>
              </field>
              <field id="cm:originator" read-only="true" />
              <field id="cm:addressee" read-only="true" />
              <field id="cm:addressees" read-only="true" />
              <field id="cm:sentdate" read-only="true" />
              <field id="cm:subjectline" read-only="true" />

             **<set id="acmeDocSet" appearance="bordered-panel" label-id="form.set.label.acme.document"/>
              <field id="acme:documentId"  label-id="form.field.label.acme.documentId" set="acmeDocSet">
                  <control template="/org/alfresco/components/form/controls/textfield.ftl"/>
              </field>
              <field id="acme:securityClassification" label-id="form.field.label.acme.securityClassification" set="acmeDocSet"/>

              <set id="contractDocSet" appearance="bordered-panel" label-id="form.set.label.acme.contract"/>
              <field id="acme:contractName"  label-id="form.field.label.acme.contractName" set="contractDocSet"/>
              <field id="acme:contractId" label-id="form.field.label.acme.contractId" set="contractDocSet"/>**
          </appearance>
      </form>
  </forms>
</config>
```

 This is a copy of the view and edit form for the standard generic `cm:content` file type, with the additional ACME content model properties organized into two groups at the end. Note though that configuring this form does not actually help out in being able to change the type for a file in the Repository to one of the custom ACME types.

 To change the type of a file from the Share UI you need to do some more configuration to make the custom ACME types and aspects known:

 ```
<config evaluator="string-compare" condition="DocumentLibrary">
  <aspects>
      <visible>
          <aspect name="acme:webPublished"/>
          <aspect name="acme:securityClassified"/>
          <aspect name="acme:projectIdentifier"/>
      </visible>
      <addable> <!-- defaults to visible config -->
      </addable>
      <removeable> <!-- defaults to visible config -->
      </removeable>
  </aspects>
  <types>
      <type name="cm:folder">
          <subtype name="acme:project"/>
      </type>
      <!-- First define the ACME base doc type as decedent from cm:content -->
      <type name="cm:content">
          <subtype name="acme:document"/>
      </type>
      <!-- Then the ACME sub-types -->
      <type name="acme:document">
          <subtype name="acme:contract"/>
          <subtype name="acme:policy"/>
          <subtype name="acme:whitePaper"/>
      </type>
  </types>
</config>
```

 This configuration makes the custom ACME types and aspects visible in the "Change Type" and "Manage Aspects" user interface actions. Note that when you change type for a content file you will have to do it in steps, you can not change a file with type `cm:content` directly to `acme:contract`, you have to first change type to `acme:document`, and then to `acme:contract`.

 Now, if you wanted to be able to search for files with the ACME Contract type applied and do this directly from the Advanced Search form, such as in the following picture:

 ![]({% link content-services/images/dev-extensions-repo-content-model-contract-searchform.png %})

 Then you would have to add additional configuration as follows:

 ```
<config evaluator="string-compare" condition="AdvancedSearch" replace="true">
     <advanced-search>
         <forms>
            ** <form labelId="form.label.advancedsearch.acmeContract"
                   descriptionId="form.description.advancedsearch.acmeContract">acme:contract
             </form>**
         </forms>
     </advanced-search>
 </config>

 <config evaluator="model-type" condition="acme:contract">
        <forms>
            <form id="search">
                <field-visibility>
                    <show id="cm:name" />
                    <show id="cm:title" force="true" />
                    <show id="cm:description" force="true" />
                    <show id="mimetype" />
                    <show id="cm:modified" />
                    <show id="cm:modifier" />

                   ** <show id="acme:documentId" force="true"/>
                    <show id="acme:securityClassification" />
                    <show id="acme:contractName" />
                    <show id="acme:contractId" />**
                </field-visibility>
                <appearance>
                    <field id="mimetype">
                        <control template="/org/alfresco/components/form/controls/mimetype.ftl" />
                    </field>
                    <field id="cm:modifier">
                        <control>
                            <control-param name="forceEditable">true</control-param>
                        </control>
                    </field>
                    <field id="cm:modified">
                        <control template="/org/alfresco/components/form/controls/daterange.ftl" />
                    </field>

                **    <set id="acmeDocSet" appearance="bordered-panel" label-id="form.set.label.acme.document"/>
                    <field id="acme:documentId"  label-id="form.field.label.acme.documentId" set="acmeDocSet">
                        <control template="/org/alfresco/components/form/controls/textfield.ftl"/>
                    </field>
                    <field id="acme:securityClassification" label-id="form.field.label.acme.securityClassification" set="acmeDocSet"/>

                    <set id="contractDocSet" appearance="bordered-panel" label-id="form.set.label.acme.contract"/>
                    <field id="acme:contractName"  label-id="form.field.label.acme.contractName" set="contractDocSet"/>
                    <field id="acme:contractId" label-id="form.field.label.acme.contractId" set="contractDocSet"/>
                </appearance>**
            </form>
        </forms>
    </config>
```

 Here you are configuring the `acme:contract` type to be available in the Advanced Search page and you also configure the search form that should be used.

 All the UI labels in the forms and search view have labels defined in localization property files. The above sample form labels are defined as follows:

 ```
## Labels for custom types and aspects {#labels-for-custom-types-and-aspects}
## Used in "Manage Aspects" and "Change Type" dialogs {#used-in-manage-aspects-and-change-type-dialogs}
#
type.acme_document=ACME Document
type.acme_contract=ACME Contract
type.acme_policy=ACME Policy
type.acme_whitePaper=ACME White Paper
type.acme_project=ACME Project
aspect.acme_webPublished=Web Published
aspect.acme_securityClassified=Security Classified
aspect.acme_projectIdentifier=Project Identification

## View,Edit,Search,Create Form labels for types and aspects {#view,edit,search,create-form-lables-for-types-and-aspects}
#
form.set.label.acme.document= ACME Document Information
form.field.label.acme.documentId=ACME Document Id
form.field.label.acme.securityClassification=Security Classification
form.set.label.acme.contract=Contract Information
form.field.label.acme.contractName=Contract Name
form.field.label.acme.contractId=Contract Id
form.set.label.acme.project=ACME Project
form.field.label.acme.projectName=Project Name
form.field.label.acme.projectNumber=Project Number
form.field.label.acme.projectDescription=Project Description
form.field.label.acme.projectStartDate=Project Start Date
form.field.label.acme.projectMembers=Project Members
form.set.label.acme.webPublished=Web Publishing Info
form.field.label.acme.publishedDate=Published Date
form.set.label.acme.projectIdentifier=Project Identifier

## Advanced Search Form labels (only for types) {#advanced-search-form-labels-only-for-types}
#
form.label.advancedsearch.acmeContract=ACME Contracts
form.description.advancedsearch.acmeContract=Search for any ACME Documents

```

|
|Deployment - App Server|-   Content Model Definition: tomcat/shared/classes/alfresco/extension/myContentModel.xml (File name can be anything you like as long as you refer to it in the Spring context file)
-   Content Model Bootstrap: tomcat/shared/classes/alfresco/extension/my-content-model-context.xml (File name has to end in -context.xml to be picked up as Spring Bean context file)
-   Share UI configuration: tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml

 These file locations are untouched by re-deployments and upgrades.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).

|-   Share UI Configuration: aio/share-jar/src/main/resources/META-INF/share-config-custom.xml
-   Share UI Localization: aio/share-jar/src/main/resources/alfresco/web-extension/messages/share-jar.properties
-   Share UI Localization Deployment (Bootstrap) : aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml

 **Note**. To define and deploy a content model with full UI support requires both a Repo JAR and a Share JAR project.|
|More Information|-   [Displaying types]({% link content-services/5.2/develop/share-ext-points/share-config.md %}#displaying-type-metadata) - more information about how to display type properties
-   [Displaying aspects]({% link content-services/5.2/develop/share-ext-points/share-config.md %}#displaying-aspect-metadata) - more information about how to display aspect properties
-   [Grouping fields in forms]({% link content-services/5.2/develop/share-ext-points/share-config.md %}#grouping-fields)

|
|Sample Code|-   [A complete ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-repo)
-   [Share UI configuration for the ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-share)
-   [Example of how to test your custom content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/blob/alfresco-51/all-in-one/integration-test-runner/src/test/groovy/org/alfresco/tutorials/testSpecs/context/CustomContentModelTestSpec.groovy)
-   [Data List content model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo)

|
|Tutorials|-   [Jeff Potts Alfresco Developer Series: Working With Custom Content Types in Alfresco](http://ecmarchitect.com/alfresco-developer-series-tutorials/content/tutorial/tutorial.html) - a very thorough walk-through of how to develop custom Content Models, a must read.

|

## Out-of-the-box content models {#out-of-the-box-content-models}

The repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.

It's good to know about the existing content models before we start defining our own custom models. There are two main reasons for this. The first reason is that **we don't want to define types and aspects that are already available** in the out-of-the-box models, such as generic file and folder types. And the second reason is that **we don't want to clash with the out of the box models** when we define our custom models, meaning we don't want to use the same namespace or prefix that's used by an out-of-the-box model as this will prevent our custom model from deploying.

The following content models are good to know a bit more about then just the namespace and prefix:

-   **Data Dictionary model**

    The base model upon which all other models depend (located in the file [dictionaryModel.xml](https://github.com/Alfresco/alfresco-data-model/blob/master/src/main/resources/alfresco/model/dictionaryModel.xml)), the Data Dictionary model provides definitions for the fundamental data types, such as `d:text` and `d:boolean`. It exposes the namespace URI `http://www.alfresco.org/model/dictionary/1.0` with prefix `d`.

-   **System model**

    The repository depends on a system model (located in the file [systemModel.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/systemModel.xml)) that provides definitions for types used by the implementation of the repository, such as `sys:base`, `sys:root`, and `sys:reference`. In most cases, it should not be required to refer to definitions in the system model from your own custom models. It exposes the namespace URI http://www.alfresco.org/model/system/1.0 with prefix `sys`.

-   **ECM domain model**

    The Enterprise Content Management (ECM) domain model (located in the file [contentModel.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/contentModel.xml)) provides definitions for types and aspects, such as `cm:folder`, `cm:content` (for files), `cm:versionable` (aspect for controlling versioning of files), and `cm:auditable` (aspect with created, creator, modified, modifier info). All server services, protocols, and clients are focused on these types. It exposes the namespace http://www.alfresco.org/model/content/1.0 with prefix `cm`. When you define custom types you extend out-of-the-box types, such as `cm:folder` and `cm:content`.

-   **BPM domain model**

    The Business Process Management (BPM) domain model (located in the file [bpmModel.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/bpmModel.xml)) provides definitions for types, such as `bpm:package`, `bpm:task`, `bpm:workflowTask`, and `bpm:assignee`. All workflow services, protocols, and clients are focused on these types. It exposes the namespace http://www.alfresco.org/model/bpm/1.0 with prefix `bpm`. These types and aspects are used by the out-of-the-box workflows.


The following list contains the out-of-the-box content model namespaces and prefixes that we **must not** use when we define our custom content models:

```
<namespace uri="http://www.alfresco.com/model/activiti-bpm-suite/1.0"                  prefix="abs"/>
<namespace uri="http://www.alfresco.org/model/action/1.0"                              prefix="act"/>
<namespace uri="http://www.alfresco.org/model/content/metadata/ADOBEXMP/1.0"           prefix="adobexmp"/>
<namespace uri="http://www.alfresco.org/model/ai/1.0"                                  prefix="ai" />
<namespace uri="http://www.alfresco.org"                                               prefix="alf"/>
<namespace uri="http://www.alfresco.org/model/cmis/1.0/alfcmis"                        prefix="alfcmis"/>
<namespace uri="http://www.alfresco.org/model/application/1.0"                         prefix="app"/>
<namespace uri="aps"                                                                   prefix="aps"/>      
<namespace uri="http://www.alfresco.org/model/audio/1.0"                               prefix="audio"/>
<namespace uri="http://www.alfresco.org/model/blogintegration/1.0"                     prefix="blg"/>
<namespace uri="http://www.alfresco.org/model/bpm/1.0"                                 prefix="bpm" />
<namespace uri="http://www.alfresco.org/model/content/1.0"                             prefix="cm"/>
<namespace uri="http://www.alfresco.org/model/cmis/1.0/cs01"                           prefix="cmis"/>
<namespace uri="http://www.alfresco.org/model/cmis/custom"                             prefix="cmiscustom"/>
<namespace uri="http://www.alfresco.org/model/cmis/1.0/cs01ext"                        prefix="cmisext"/>
<namespace uri="http://www.alfresco.org/model/custommodelmanagement/1.0"               prefix="cmm" />
<namespace uri="custom.model"                                                          prefix="custom"/>
<namespace uri="http://www.alfresco.org/model/dictionary/1.0"                          prefix="d"/>
<namespace uri="http://www.alfresco.org/model/quickr/draft/approve/1.0"                prefix="da"/>
<namespace uri="http://www.alfresco.org/model/dropbox/1.0"                             prefix="db"/>
<namespace uri="http://purl.org/dc/elements/1.1/"                                      prefix="dc"/>
<namespace uri="http://www.alfresco.org/model/datalist/1.0"                            prefix="dl"/>
<namespace uri="http://www.alfresco.org/model/dod5015/1.0"                             prefix="dod"/>
<namespace uri="http://www.alfresco.org/model/download/1.0"                            prefix="download"/>
<namespace uri="http://www.alfresco.org/model/distributionpolicies/1.0/model"          prefix="dp" />
<namespace uri="http://www.alfresco.org/model/emailserver/1.0"                         prefix="emailserver" />
<namespace uri="http://www.alfresco.org/model/exif/1.0"                                prefix="exif"/>
<namespace uri="http://www.alfresco.org/model/forum/1.0"                               prefix="fm"/>
<namespace uri="http://www.alfresco.org/model/googledocs/2.0"                          prefix="gd2" />
<namespace uri="http://www.alfresco.org/model/hybridworkflow/1.0"                      prefix="hwf" />
<namespace uri="http://www.alfresco.org/model/calendar"                                prefix="ia"/>
<namespace uri="http://www.alfresco.org/model/imap/1.0"                                prefix="imap" />
<namespace uri="http://www.alfresco.org/model/workflow/invite/moderated/1.0"           prefix="imwf" />
<namespace uri="http://www.alfresco.org/model/workflow/invite/nominated/1.0"           prefix="inwf" />
<namespace uri="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"                           prefix="Iptc4xmpCore"/>
<namespace uri="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"                           prefix="Iptc4xmpExt"/>
<namespace uri="http://www.alfresco.org/model/content/metadata/IPTCXMP/1.0"            prefix="iptcxmp"/>
<namespace uri="http://www.alfresco.org/model/linksmodel/1.0"                          prefix="lnk"/>
<namespace uri="http://www.alfresco.com/model/machine/learning/sentiment/analysis/1.0" prefix="mlsa"/>
<namespace uri="http://www.alfresco.org/system/modules/1.0"                            prefix="module" />
<namespace uri="http://www.alfresco.org/model/content/metadata/PBCORE/1.0"             prefix="pbcoreModel" />
<namespace uri="http://www.pbcore.org/PBCore/PBCoreNamespace.html"                     prefix="pbcore"/>
<namespace uri="http://ns.adobe.com/photoshop/1.0/"                                    prefix="photoshop"/>
<namespace uri="http://ns.useplus.org/ldf/xmp/1.0/"                                    prefix="plus"/>
<namespace uri="http://www.alfresco.org/model/content/metadata/PLUSLDF/1.0"            prefix="plusldf"/>
<namespace uri="http://www.alfresco.org/model/quickr/psheet/1.0"                       prefix="ps"/>
<namespace uri="http://www.alfresco.org/model/publishing/1.0"                          prefix="pub" />
<namespace uri="http://www.alfresco.org/model/qshare/1.0"                              prefix="qshare" />
<namespace uri="http://www.alfresco.org/model/quickr/1.0"                              prefix="qr"/>
<namespace uri="http://www.alfresco.org/model/remotecredentials/1.0"                   prefix="rc"/>
<namespace uri="http://www.alfresco.org/system/registry/1.0"                           prefix="reg" />
<namespace uri="http://www.alfresco.org/model/workflow/resetpassword/1.0"              prefix="resetpasswordwf" />
<namespace uri="http://www.alfresco.org/model/recordsmanagement/1.0"                   prefix="rma"/>
<namespace uri="http://www.alfresco.org/model/rmcustom/1.0"                            prefix="rmc"/>
<namespace uri="http://www.alfresco.org/model/recordsmanagementreport/1.0"             prefix="rmr"/>
<namespace uri="http://www.alfresco.org/model/recordableversion/1.0"                   prefix="rmv"/>
<namespace uri="http://www.alfresco.org/model/rmworkflow/1.0"                          prefix="rmwf"/>
<namespace uri="http://www.alfresco.org/model/rendition/1.0"                           prefix="rn"/>
<namespace uri="http://www.alfresco.org/model/rule/1.0"                                prefix="rule"/>
<namespace uri="http://schema.org"                                                     prefix="schema" />
<namespace uri="http://www.alfresco.org/model/content/smartfolder/1.0"                 prefix="smf" />
<namespace uri="http://www.alfresco.org/model/solrfacet/1.0"                           prefix="srft" />
<namespace uri="http://www.alfresco.org/model/solrfacetcustomproperty/1.0"             prefix="srftcustom"/>
<namespace uri="http://www.alfresco.org/model/site/1.0"                                prefix="st"/>
<namespace uri="http://www.alfresco.org/model/sitecustomproperty/1.0"                  prefix="stcp"/>
<namespace uri="http://www.alfresco.org/model/surf/1.0"                                prefix="surf"/>
<namespace uri="http://www.alfresco.org/model/sync/1.0"                                prefix="sync"/>
<namespace uri="http://www.alfresco.org/model/system/1.0"                              prefix="sys" />
<namespace uri="http://www.alfresco.org/model/transfer/1.0"                            prefix="trx" />
<namespace uri="http://www.alfresco.org/model/user/1.0"                                prefix="usr"/>
<namespace uri="http://www.alfresco.org/model/versionstore/1.0"                        prefix="ver"/>
<namespace uri="http://www.alfresco.org/model/versionstore/2.0"                        prefix="ver2"/>
<namespace uri="http://www.alfresco.org/view/repository/1.0"                           prefix="view"/>
<namespace uri="http://www.alfresco.org/model/webdav/1.0"                              prefix="webdav"/>
<namespace uri="http://www.alfresco.org/model/workflow/1.0"                            prefix="wf"/>
<namespace uri="http://www.alfresco.org/model/website/1.0"                             prefix="ws" />
<namespace uri="http://ns.adobe.com/xap/1.0/"                                          prefix="xmp"/>
<namespace uri="http://ns.adobe.com/xap/1.0/rights/"                                   prefix="xmpRights"/>
```

