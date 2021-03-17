---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Programming
option: 
---

# The Alfresco OpenCMIS Extension

The Alfresco OpenCMIS Extension extends OpenCMIS to provide support for Alfresco aspects.

In Alfresco, aspects are a fundamental concept related to content modeling. Aspects allow the addition of behaviours to existing content types. The CMIS specification does not include aspects in its scope, but it does provide extension points that allow additional functionality.

CMIS extensions are XML fragments inserted in different parts of a CMIS object. The Alfresco aspect fragments are documented on the [Alfresco Wiki](http://wiki.alfresco.com/wiki/CMIS#Aspect_Support). So, they are available to all CMIS clients out there including OpenCMIS.

However, programming with CMIS extensions can be complex, and can require quite a lot of code. OpenCMIS does all the XML parsing for you but since it knows nothing about aspects, it can not provide simple, elegant interfaces.

That is where the "Alfresco OpenCMIS Extension" steps in. It seamlessly merges the Alfresco aspect properties with the CMIS object properties and provides interfaces to get, add, and remove aspects. It does this by replacing the OpenCMIS internal object factory with an object factory that is aspect-aware. It processes and adds Alfresco aspect fragments for you, behind the scenes, eliminating complexity in your code.

-   **[Using the Alfresco OpenCMIS Extension](../concepts/opencmis-ext-using.md)**  
 The Alfresco OpenCMIS Extension depends on the Apache Chemistry OpenCMIS libraries.
-   **[Using the CMIS workbench with Alfresco](../tasks/opencmis-ext-workbench.md)**  
The CMIS Workbench is CMIS desktop client for developers. It is a repository browser and an interactive testbed for the OpenCMIS client API.
-   **[Creating a document or folder with aspects](../concepts/opencmis-ext-creating-aspects.md)**  
Aspects can be specified when creating a document or folder.
-   **[Adding, removing and discovering aspects](../concepts/opencmis-ext-adding.md)**  
To add and remove aspects to an existing object, you must cast OpenCMIS Document objects to `AlfrescoDocument` objects and Folder objects to `AlfrescoFolder` objects.

**Parent topic:**[Programming with CMIS](../concepts/cmis-about.md)

