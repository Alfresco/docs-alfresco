---
author: Alfresco Documentation
---

# Out-of-the-box content models

The content repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.

-   **Data Dictionary model**

    The base model upon which all other models depend \(located in the file [dictionaryModel.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/model/dictionaryModel.xml)\), the Data Dictionary model provides definitions for the fundamental data types, such as `d:text` and `d:boolean`. It exposes the namespace URI `http://www.alfresco.org/model/dictionary/1.0` with prefix `d`.

-   **System model**

    The content repository depends on a system model \(located in the file systemModel.xml\) that provides definitions for types used by the implementation of the content repository, such as `sys:base`, `sys:root`, and `sys:reference`. In most cases, it should not be required to refer to definitions in the system model from your own custom models. It exposes the namespace URI http://www.alfresco.org/model/system/1.0 with prefix `sys`.

-   **ECM domain model**

    The Enterprise Content Management \(ECM\) domain model \(located in the file [contentModel.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/model/contentModel.xml)\) provides definitions for types, such as `cm:folder`, `cm:content`, `cm:versionable`, and `cm:auditable`. All Alfresco content application server services, protocols, and clients are focused on these types. It exposes the namespace http://www.alfresco.org/model/content/1.0 with prefix `cm`.

-   **BPM domain model**

    The Business Process Management \(BPM\) domain model \(located in the file [bpmModel.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/model/bpmModel.xml)\) provides definitions for types, such as `bpm:package`, `bpm:task`, `bpm:workflowTask`, and `bpm:assignee`. All Alfresco workflow services, protocols, and clients are focused on these types. It exposes the namespace http://www.alfresco.org/model/bpm/1.0 with prefix `bpm`.


**Parent topic:**[Content Model](../references/dev-extension-points-content-model.md)

