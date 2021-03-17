---
author: Alfresco Documentation
---

# Embed Process Services in another application

The components of the Alfresco Process Services app can be included in an existing or other application by referencing the correct Maven dependencies and adding the necessary Spring configuration beans. To help you get started, an example application has been created, called activiti-app-embedded-example. If you don’t have this example project as part of the Alfresco Process Services download, ask for a copy from your Alfresco account or sales representative.

The Maven pom.xml file in this example project can be used to get an overview of all necessary Maven dependencies. The example project also contains the Spring configuration beans that are needed by the Alfresco Process Services components.

The src/main/webapp folder contains all the JavaScript sources of the Alfresco Process Services app in minified format. In addition, you can have access to the full JavaScript source that’s provided in a separate bundle. If the context root of the application is changed, make sure to change the URI configuration in the *app-cfg.js* file in the src/main/webapp/scripts folder.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

