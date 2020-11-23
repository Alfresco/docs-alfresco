---
title: Content Model Extension Point 
---

Defining a custom content model for the repository is a fundamental task in almost every content management project. 
It will allow you to build a robust system with content that can be classified, searched, structured, and processed in 
many different ways.

Architecture Information: [Platform Architecture]({% link content-services/latest/develop/software-architecture.md %}#platformarch)

## Description

One of the main differences between a network drive and a Content Management System (CMS) is that the latter provides 
extra classification features. If you look at a CMS behind the scenes, you can see that everything in the repository is 
typically a node (a node is also sometimes referred to as an object). Properties are then set on the nodes so they 
become folders, files, categories, rules, forums, web pages, e-mails, people, groups, and so on.

Classifying nodes makes performing operations on them more precise, so it is easier to search for them, so they can be 
displayed in the user interface correctly, and node-specific operations can be carried out. The properties that can be 
used to classify nodes (content), cannot be selected at random, as then the system would not know what each one of these 
properties represents. Because of this a content management system usually comes preconfigured with properties that can 
be used to classify content in the repository. These properties are usually organized into two groups called 
*Types* and *Aspects*. The main difference between types and aspects is that a node can only have one type applied but 
it can have multiple aspects applied.

Nodes are not isolated within the repository. They are related to one another in different ways. How the nodes are related 
to each other is defined using *Associations*. A typical association that comes out-of-the-box with Alfresco Content Services 
is the one between a folder node and its child nodes, this type of association is a `child-association`. So when you start 
using Alfresco Content Services you can immediately organize folders and files into a hierarchy, like with a file system.

The Types, Aspects, Properties, and Associations are in turn organized into models that we call *Content Models*. 
Alfresco Content Services comes with a number of Content Models out of the box for different things like general folder 
and file content, workflow-related content, records content, web content, and so on.

It is also useful to be able to create content models related to specific domains such as Finance or Marketing. As the 
type of content that may be stored in the repository can vary, generic standard content models are provided that provide 
a basis on which to build custom content models for domain-specific purposes.

New types and aspects are defined forming new custom content models. But how do you know how to specify a type and a 
property with, for example, a data type integer? Alfresco Content Services also comes with a *Meta Model*. The Meta model 
defines what syntax you can use when defining your content models. It will, for example, define the syntax for how a type 
or an integer property should be defined. The following diagram gives a simplified overview of the relationship between 
meta model, content models, and custom content models:

![dev-extensions-repo-content-model-metamodel-vs-model]({% link content-services/images/dev-extensions-repo-content-model-metamodel-vs-model.png %})

In the image, you can see two nodes in the repository: one folder node and one `ACME Contract` document node. The Contract 
type extends the `ACME Generic Document` type, or base type if you like, which in turn extends the generic `Content` type. 
The Contract document node also has versioning turned on by having the `Versionable` aspect applied.

Both the custom content model and the Alfresco Content Services content model is defined by the Data Dictionary Schema, 
which is the same as the Meta Model.

Content models, types, aspects, and properties are similar to object-oriented concepts in programming. If you are 
familiar with object-oriented modelling, then the concepts of content modelling should feel familiar.

The meta model contains the constructs or syntax that can be used to define content models, which are defined in XML.

>**Important:** It is possible to create custom content models from the Alfresco Share UI without the need to use XML. These models can then be exported as XML and included in a build project. See the [Content modeling with Model Manager](TODO_LINK:https://docs.alfresco.com/5.2/concepts/admintools-cmm-intro.html) for further information.

For detailed instructions on how to implement content models, see the [define and deploy section](TODO:dev-extension-points-content-model-define-and-deploy.md). 
When you have defined and deployed a content model you would want to be able to work with it from the Share UI, see the 
[configure UI section](TODO:dev-extension-points-content-model-configure-ui.md) for more information around this.

## Deployment - App Server

* **Content Model Definition**: `tomcat/shared/classes/alfresco/extension/myContentModel.xml` (File name can be anything you like as long as you refer to it in the Spring context file)
* **Content Model Bootstrap**: `tomcat/shared/classes/alfresco/extension/my-content-model-context.xml` (File name has to end in `-context.xml` to be picked up as Spring Bean context file)
* **Share UI configuration**: `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml`

These file locations are untouched by re-deployments and upgrades.
 
## Deployment All-in-One SDK project

* **Content Model Definition**: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/model/content-model.xml`
* **Content Model Localization**: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages/content-model.properties`
* **Content Model & Localization Deployment (Bootstrap)**: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml`
* **Share UI Configuration**: `aio/share-jar/src/main/resources/META-INF/share-config-custom.xml`
* **Share UI Localization**: `aio/share-jar/src/main/resources/alfresco/web-extension/messages/share-jar.properties`
* **Share UI Localization Deployment (Bootstrap)**: `aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml`

To implement and deploy a content model with full UI support you need both a repository JAR and a Share JAR project.

## More Information

* [Define and Deploy a custom content model](TODO:dev-extension-points-content-model-define-and-deploy.md) - Detailed walk-through
* [Configure the Share UI for a custom content model](TODO:dev-extension-points-content-model-configure-ui.md) - Detailed walk-through
* [Out-of-the-box Content Models](TODO:../concepts/content-model-preconfigured.md)
* [Model Manager in Share Admin Tools](TODO:../concepts/admintools-cmm-intro.md)

## Sample Code

* [A complete ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-repo){:target="_blank"}
* [Share UI configuration for the ACME content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-content-model-share){:target="_blank"}
* [Example of how to test your custom content model implementation.](https://github.com/Alfresco/alfresco-sdk-samples/blob/alfresco-51/all-in-one/integration-test-runner/src/test/groovy/org/alfresco/tutorials/testSpecs/context/CustomContentModelTestSpec.groovy){:target="_blank"}
* [Data List content model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo){:target="_blank"}

## Tutorials

* [Jeff Potts Alfresco Developer Series: Working With Custom Content Types in Alfresco](http://ecmarchitect.com/alfresco-developer-series-tutorials/content/tutorial/tutorial.html){:target="_blank"} - a very thorough walk-through of how to develop custom Content Models, a must read.
* [Defining and Deploying a custom Content Model](TODO:../tasks/dev-extensions-content-models-tutorials-deploy-model.md) (Short introduction excluding localization)

## Developer Blogs

* [Content Modelling in from the Share UI](http://imben.me/easy-content-modeling-in-alfresco-51/){:target="_blank"} - Step by step guide with screenshots.
