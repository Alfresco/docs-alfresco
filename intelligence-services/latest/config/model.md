<!--Section included in /config - comprehend.md & textract.md -->
Use this information to deploy and configure a custom model for Intelligence Services.

Note that the implementation follows the same process for custom recognition or classification model types, but differs slightly for custom metadata extraction.

Before you can use a custom model with Intelligence Services, you'll need to define a new rendition in configuration files for the repository, Alfresco Share, and Alfresco Digital Workspace.

The process requires the configuration of a number of files that must be mounted in the Docker containers:

|    | Configuration file | Used by custom model / AWS service |
| -- | ------------------ | ---------------------------------- |
| Repository | custom-ai-content-model-context.xml | Comprehend, Textract |
| | customAIContentModel.xml | Comprehend, Textract |
| | custom-ai-renditions-definitions.json | Comprehend
| | customAIPropertyMapping.json | Comprehend, Textract
| | | |
| Share | share-config-custom.xml | Comprehend, Textract
| | bootstrap-custom-labels.properties | Comprehend
| | share-custom-slingshot-application-context.xml | Comprehend, Textract |
| | | |
| Digital Workspace | app.extensions.json | Comprehend, Textract|

These files are described in more detail in the remainder of this page.
