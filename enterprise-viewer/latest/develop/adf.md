---
title: Alfresco Development Framework (ADF)
---

## AEV Embedded in ADF

Alfresco Enterprise Viewer (AEV) can be integrated into Alfresco Developer Framework (ADF) applications by replacing or overriding the default ADF Viewer component behavior.

An ADF application with AEV integrated is provided as part of the AEV deployment artifacts (content-app-with-aev.war). This application is based off of Alfresco Content App version 3.8.

### Sample ADF AEV application configuration

Include the following block in your application's `app.config.json` file and change as needed for your local environment.

```json
"alfresco-enterprise-viewer": {
    "$version": "1.0.0",
    "enabled" : true,
    "properties": {
      "endpoints": {
        "aev": "/OpenAnnotate",
        "aevVideo": "/OpenAnnotateVideo"
      },
      "supportedMimetypes": {
        "videos": [
          "video/mp4"
        ]
      },
      "aevVideoSeperate" : false,
      "alfrescoDocumentStorePrefix": "workspace://SpacesStore/",
      "extraAEVUrlParams" : {}
    }
  }

```
