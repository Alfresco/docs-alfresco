---
author: Alfresco Documentation
---

# Extending the Alfresco Share Document Library

Alfresco Content Services offers a number of extension points for the document library. 

This includes:

-   Repository tier
-   Web tier
-   Status indicators
-   Metadata templates
-   Actions
-   Client-side extension points

This documentation also includes a `jsNode` client-side help object reference and a list of out-of-the-box evaluators.

-   **[Alfresco Share Document Library repository tier](../concepts/doclib-repository-tier.md)**  
In order to preserve existing customizations and third party add-ons, a parallel set of data web scripts has been developed to coexist with the previous data web scripts. These web scripts are located in the `remote-api` project and have URLs starting with `/slingshot/doclib2/`.
-   **[Alfresco Share Document Library web tier](../concepts/doclib-web-tier.md)**  
In versions of Alfresco Share previous to 4.0, the client-side JavaScript requested JSON data from the repository directly by using the proxy servlet. From 4.0 onwards, there is a new data web script \(at /components/documentlibrary/data/\) that requests data from the repository and processes the response based on a configurable set of evaluators before finally returning JSON data to the browser.
-   **[Override and extension examples](../concepts/doclib-override-extension-examples.md)**  
You configure new evaluators by using a web-extension/custom-slingshot-\*-context.xml file, taking the form of bean definitions.  
-   **[Client-side template and action extensions](../concepts/doclib-client-side-template-and-action-extensions.md)**  
Two global events are available to make it easier to add new metadata template renderers and client-side action handlers.
-   **[Customizing document library views](../concepts/share-customizing-document-library-views.md)**  
Within the document library it is possible to select from a number of views. It is also possible to add custom views to the document library through configuration in the share-documentlibrary-config.xml file.
-   **[Reference](../concepts/doclib-reference.md)**  
This information provides reference material about the Alfresco Share Document Library; for example, `jsNode` methods and properties, evaluators, and EXIF renderer source code.

**Parent topic:**[Share Document Library](../concepts/share-repodoclib.md)

