---
author: Alfresco Documentation
---

# The Alfresco OpenCMIS Extension for CMIS 1.0

For existing CMIS 1.0 applications, the Alfresco OpenCMIS Extension extended OpenCMIS to provide support for Alfresco aspects.

**Note:** If you are using the current CMIS 1.1 API, Alfresco aspects are [exposed as secondary types](cmis-1.1-using-aspects.md). You do not need to use this extension.

In Alfresco, aspects are a fundamental concept related to content modeling. Aspects allow the addition of behaviours to existing content types. The CMIS specification does not include aspects in its scope, but it does provide extension points that allow additional functionality.

CMIS extensions are XML fragments inserted in different parts of a CMIS object. The Alfresco aspect fragments are documented on the [Alfresco Wiki](http://wiki.alfresco.com/wiki/CMIS#Aspect_Support). So, they are available to all CMIS clients out there including OpenCMIS.

However, programming with CMIS extensions can be complex, and can require quite a lot of code. OpenCMIS does all the XML parsing for you but since it knows nothing about aspects, it can not provide simple, elegant interfaces.

That is where the "Alfresco OpenCMIS Extension" steps in. It seamlessly merges the Alfresco aspect properties with the CMIS object properties and provides interfaces to get, add, and remove aspects. It does this by replacing the OpenCMIS internal object factory with an object factory that is aspect-aware. It processes and adds Alfresco aspect fragments for you, behind the scenes, eliminating complexity in your code.

-   **[Using the Alfresco OpenCMIS Extension](../../../pra/1/concepts/opencmis-ext-using.md)**  
The Alfresco OpenCMIS Extension depends on the Apache Chemistry OpenCMIS libraries.
-   **[Using the CMIS Workbench with Alfresco](../../../pra/1/tasks/opencmis-ext-workbench.md)**  
The CMIS Workbench is a CMIS desktop client for developers. It is a repository browser and an interactive test bed for the OpenCMIS client API.
-   **[Creating a document or folder with aspects](../../../pra/1/concepts/opencmis-ext-creating-aspects.md)**  
Aspects can be specified when creating a document or folder.
-   **[Adding, removing and discovering aspects](../../../pra/1/concepts/opencmis-ext-adding.md)**  
To add and remove aspects to an existing object, you must cast OpenCMIS Document objects to `AlfrescoDocument` objects and Folder objects to `AlfrescoFolder` objects.

**Parent topic:**[CMIS REST API](../../../pra/1/topics/cmis-welcome.md)

