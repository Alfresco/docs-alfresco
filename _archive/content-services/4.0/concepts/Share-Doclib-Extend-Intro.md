---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library]
---

# Extending the Alfresco Share Document Library

With Alfresco, Version 4.0, there are new extension points for the document library. 

This includes:

-   Repository tier
-   Web tier
-   Status indicators
-   Metadata templates
-   Actions
-   Client-side extension points

This also includes a `jsNode` client-side help object reference and a list of out-of-the-box evaluators.

-   **[Alfresco Share Document Library repository tier](../concepts/doclib-repository-tier.md)**  
In order to preserve existing customizations and third party add-ons, a parallel set of data web scripts has been developed for Version 4.0 to coexist with the previous data web scripts. These new web scripts are located in the remote-api project and have URLs starting with **/slingshot/doclib2/**.
-   **[Alfresco Share Document Library web tier](../concepts/doclib-web-tier.md)**  
In versions of Alfresco Share previous to 4.0, the client-side JavaScript requested JSON data from the repository directly via the proxy servlet. From v4.0, there is a new data web script \(at/components/documentlibrary/data/\) thst requests data from the repository and processes the response based on a configurable set of evaluators before finally returning JSON data to the browser.
-   **[Override and extension examples](../concepts/doclib-override-extension-examples.md)**  
You configure new evaluators via a **web-extension/custom-slingshot-\*-context.xml** file, taking the form of bean definitions.  
-   **[Client-side template and action extensions](../concepts/doclib-client-side-template-and-action-extensions.md)**  
Two new global events have been introduced to make it easier to add new metadata template renderers and client-side action handlers.  
-   **[Reference](../concepts/doclib-reference.md)**  
Reference material.

**Parent topic:**[Customizing and extending Alfresco Share](../concepts/dev-Share-intro.md)

