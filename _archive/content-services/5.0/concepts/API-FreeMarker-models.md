---
author: Alfresco Documentation
---

# Template models

Template models provide data which can be used by the template to generate an output view.

Views are often generated from model data. A template always has access to default model data. The default model can have data added to it, for example from JavaScript controllers.

A model consists of a number of objects or hierarchy of objects from which a template file retrieves values that can be used to dynamically generate the output view. The model is like the API for the template page: it provides the objects from which properties and values can be accessed.

The Alfresco repository provides a "default" model that is always available when rendering templates by using the JSF Template component and the template servlet. The web script framework provides additional model objects relevant to processing output for Remote APIs. Programmatically, it is also possible to define a custom model that can be merged into the default model to provide additional model objects. Custom Java objects can be configured by using Spring to make them available to template models within the repository and/or the web script framework.

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/API-FreeMarker-intro.md)

