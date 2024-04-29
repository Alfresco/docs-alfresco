---
title: Embed AEV in ADF
---

You can integrate Enterprise Viewer (AEV) into the Alfresco Application Development Framework (ADF) application by replacing or overriding the default ADF Viewer component behavior.

## Sample ADF AEV application configuration

Include the following block in your application's `app.config.json` file and change as needed for your local environment:

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
