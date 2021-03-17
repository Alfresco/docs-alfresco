---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Alfresco repository]
keyword: [extend Alfresco, repository, workflow models]
---

# Workflow models

Workflow models let you wrap forms and property sheets around jBPM workflow processes, informing the repository how to map content contained within the in-flight processes to display elements for end users. This includes mapping end-user input into process variables as well as mapping process variables back into display elements.

The raw process definition is like a graph or a mathematical construct that links different task nodes via transitions. The in-flight process transitions from node to node either automatically or based on external interaction from an end user. With Alfresco, this external interaction is usually facilitated through forms or workflow wizards.

The workflow content model informs these forms how to render, drawing from the I18N resource bundles to provision text elements \(like labels\) that are meaningful for many languages and geographies.

An example scenario might be where you want to have multilingual support for your workflow tasks, such as forms automatically localized for Italian versus French. A workflow model makes this possible by informing Alfresco how to retrieve and persist information from the underlying in-flight process while providing an Italian-localized interface for Italian users and a French-localized interface for French users.

**Parent topic:**[Alfresco repository extension points](../concepts/customize-overview.md)

