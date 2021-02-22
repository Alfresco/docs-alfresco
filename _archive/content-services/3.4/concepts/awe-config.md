---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: Web Editor tag library servlet filter form configuration markConent
---

# Configuring Alfresco Web Editor

The following Web Editor components must be configured:

-   tag library, that is, the `markContent` tag used to define editable content
-   servlet filter
-   form configuration

-   **[Configuring the tag library](../tasks/awe-tablib-config.md)**  
This section describes the tag library configuration.
-   **[Configuring the servlet filter](../tasks/awe-servlet-config.md)**  
The `startTemplate`, `markContent`, and `endTemplate` tags will only render their output if they detect the presence of the Web Editor servlet filter. The tags can remain in the JSP page in production and have no effect until the servlet filter configuration is added to the web.xml file.
-   **[Configuring Web Editor forms](../tasks/awe-forms-config.md)**  
 The Alfresco Web Editor \(AWE\) uses a form to edit the node referenced by a `markContent` tag. By default, the form displayed will contain the `cm:title`, `cm:description`, and `cm:content` fields. An alternative form can be used by providing the `markContent` tag with a `formId` attribute.

**Parent topic:**[Alfresco Web Editor](../concepts/awe-intro.md)

