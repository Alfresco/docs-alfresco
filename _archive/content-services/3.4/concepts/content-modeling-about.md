---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content Modeling
---

# Content modeling

Content modeling is a fundamental building block of the Alfresco content repository that provides a foundation for structuring and working with content.

Content modeling specifies how nodes stored in the content repository are constrained, imposing a formal structure on nodes that an ECM application can understand and enforce. Nodes can represent anything stored in the repository, such as folders, documents, XML fragments, renditions, collaboration sites, and people. Each node has a unique ID and is a container for any number of named properties, where property values can be of any data type, single or multi-valued.

Nodes are related to each other through relationships. A *parent/child* relationship represents a hierarchy of nodes where child nodes cannot outlive their parent. You can also create arbitrary relationships between nodes and define different types of nodes and relationships.

A content model defines how a node in the content repository is constrained. Each model defines one or more types, where a type enumerates the properties and relationships that a node of that type can support. Often, concepts that cross multiple types of node must be modeled, which the Alfresco content repository supports through aspects. Although a node can only be of a single type, you can apply any number of aspects to a node. An aspect can encapsulate both data and process, providing a flexible tool for modeling content.

Content modeling puts the following constraints on the data structure:

-   A node must be of a given kind.
-   A node must carry an enumerated set of properties.
-   A property must be of a given data type.
-   A value must be within a defined set of values.
-   A node must be related to other nodes in a particular way.

These constraints allow the definition \(or modeling\) of entities within the ECM domain. For example, many ECM applications are built around the notion of folders and documents. I is content modeling that adds meaning to the node data structure.

![](../images/5-1.png)

The Alfresco content repository provides services for reading, querying, and maintaining nodes. Events are fired on changes, allowing for processes to be triggered. In particular, the content repository provides the following capabilities based on events:

-   Policies: event handlers registered for specific kinds of node events for either all nodes or nodes of a specific type
-   Rules: declarative definition of processes based on addition, update, or removal of nodes \(for example, the equivalent of email rules\)

Models also define kinds of relationships, property data types, and value constraints. A special data type called `content` allows a property to hold arbitrary length binary data. Alfresco comes prepackaged with several content models. You can define new models for specific ECM use cases from scratch or by inheriting definitions from existing models.

-   **[Content metadata model](../concepts/metadata-model.md)**  
Content modeling is about metadata; data describing data. Content modeling in Alfresco refers to a four-layer metadata model.
-   **[Deploying a content model](../concepts/content-model-deploy.md)**  
A content model is defined in its entirety as a single XML document that must comply with the content metamodel XSD schema provided by the Alfresco content repository. Each model contains a set of related and coherent definitions and is deployed as a unit.
-   **[Content metamodel](../concepts/metadata-model-define.md)**  
Defining a content model is expressed in terms of the content metamodel.
-   **[Out-of-the-box models](../concepts/content-model-preconfigured.md)**  
The content repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.
-   **[Defining a custom model for Knowledge Base articles](../tasks/kb-define-custom-model.md)**  
This custom model example uses an uncomplicated model for representing knowledge base articles for a Knowledge Base application.
-   **[Creating content with JavaScript](../tasks/cm-content-create-js.md)**  
With the example content model defined, you can create articles in the content repository that adhere to the model. This example demonstrates this by developing some JavaScript code that uses the Alfresco JavaScript API to create knowledge articles.
-   **[Localizing models](../concepts/content-model-localization.md)**  
Every type, aspect, property, association, constraint, and data type defined within a model has a title and description. Both of these values are provided in the model XML file but only one language may be supported: the language of the values specified in the XML file.
-   **[Alfresco content models and CMIS](../concepts/content-model-cmis.md)**  
CMIS defines a data model, which encapsulates the core concepts found in most content repositories. Alfresco provides an implementation of the CMIS bindings and maps the Alfresco content metamodel to the CMIS domain model. This allows content models defined in Alfresco to be exposed and manipulated via CMIS.

**Parent topic:**[Architecture](../concepts/alfresco-arch-about.md)

**Parent topic:**[Customizing and extending](../concepts/ch-customize.md)

