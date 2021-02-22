---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: [Content model, localizing]
---

# Localizing models

Every type, aspect, property, association, constraint, and data type defined within a model has a title and description. Both of these values are provided in the model XML file but only one language may be supported: the language of the values specified in the XML file.

To support localization of a model, you can augment the model XML values with locale-specific values by registering a standard Java resource bundle for each language variant of a model.

Localizing content-model values is often required to render user interfaces that are driven from the content model, such as a property sheet that displays a grid of property name and value.

The content models provided out of the box are all augmented with a default \(for US English\) Java resource bundle. The following is an extract from the resource bundle for the ECM domain model:

```
cm_contentmodel.description=Alfresco Content Domain Model
cm_contentmodel.type.cm_object.title=Object
cm_contentmodel.type.cm_object.description=Base Content Domain Object
cm_contentmodel.property.cm_name.title=Name
cm_contentmodel.property.cm_name.description=Name
cm_contentmodel.type.cm_folder.title=Folder
cm_contentmodel.type.cm_folder.description=Folder
cm_contentmodel.association.cm_contains.title=Contains
cm_contentmodel.association.cm_contains.description=Contains
```

Resource bundles are composed of many key/value pairs. For content models, the keys are structured as follows:

`<model_prefix>_<model_name>.[title|description]`

or

`<model_prefix>_<model_name>.<feature>.<feature_prefix>_<feature_name>. [title|description]`

Where:

-   `model_prefix` is the model `namespace` prefix.
-   `model_name` is the model name.
-   `feature` is one of type, aspect, property, association, constraint, or data type.
-   `feature_prefix` is the namespace prefix of the feature definition name.
-   `feature_name` is the feature definition name.

**Parent topic:**[Content modeling](../concepts/content-modeling-about.md)

## Registering content model resource bundles

Content model resource bundles must be registered with their associated content model. There are two approaches to register a content model: bootstrap and dynamic. The same applies for content model resource bundles.

### Bootstrap

The Dictionary Bootstrap component supports the additional `labels` property, which allows for a list of resource bundle files \(located in the classpath\) to be specified. You must restart the Alfresco content repository to register the resource bundle.

```
<bean id="kbmodel.extension.dictionaryBootstrap" parent="dictionaryModelBootstrap"
depends-on="dictionaryBootstrap">
...
<property name="labels">
<list>
<value>alfresco/extension/kbModel.properties</value>
</list>
</property>
...
</bean>
```

### Dynamic

In the dynamic approach, place the resource bundle file into the content repository folder:

`Company Home/Data Dictionary/Messages`

Alfresco Explorer is the best tool for uploading and editing resource bundles in this folder.

