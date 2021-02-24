---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Configuration, Alfresco Share]
keyword: [Aspects, content item, ]
---

# About aspects

Aspects are a fundamental concept related to content modeling in Alfresco. They allow addition of functionality to existing content types.

Aspects use properties to enhance content types. You can attach behaviors and workflows to aspects. The following table lists the aspects available in Alfresco along with their description.

|Aspects|Description|Changes in Behaviour /Share Interface|
|-------|-----------|-------------------------------------|
|Classifiable|Enables categories to be assigned to a content item. For example, content items can be categorized under Languages, Region, Software Document Classification, etc.|Adding Classifiable aspect displays an additional **Categories** property on the **Edit properties**page.|
|Complianceable|This aspect is no longer valid. For compliance-related behaviour, please use Alfresco's Record Management module.| |
|Dublin Core|Enables metadata \(such as publisher, contributor, identifier, etc\) to be added to a content item.|Adding Dublin Core aspect displays the following additional metadata properties on the **Edit Properties** page: -   Publisher
-   Contributor
-   Type
-   Identifier
-   Source
-   Coverage
-   Rights
-   Subject

|
|Effectivity|This aspect is no longer valid. For compliance-related behaviour, please use Alfresco's Record Management module.|
|Summarizable|Enables addition of a brief description about the content item.|Adding Summarizable aspect displays additional **Summary** property on the **Edit Properties** page.|
|Versionable|Enables versioning of a content item each time it is edited \(checked out and checked back in or updated\). In AlfrescoShare, content items are versionable by default.|Adding Versionable aspect displays the version history of a content item in the **Version History** section.|
|Templatable|Enable template view.

**Note:** This aspect is only available in Alfresco Explorer.

| |
|Emailed|Captures email-related information of the content item, if it is received as an email attachment.|Adding Emailed aspect displays additional properties \(such as Originator, Addressee, Addresses, Sent Date and Subject\) on the **Edit Properties** page.|
|Inline Editable|Enables content items to be edited directly within the document library.

|Adding Inline Editable aspect displays the **Inline Edit**link in the **Document Actions** section.|
|Taggable|Enables tagging of content items using keywords.In AlfrescoShare, content items are taggable by default.

|Adding Taggable aspect displays the tagged keywords in the **Tags** section. You can also search for content items in the Document Library using the keywords displayed.|
|Geographic|Enables a content item to be geographically tagged using latitude and longitude information. The location of content item is displayed as a marker on Google Maps. Click on the marker to display the Document Details page for that content item.|Adding Geographic aspect displays additional **Latitude** and **Longitude** properties on the **Edit Properties** page. Also, the **View on Google Maps** link is displayed in the **Document Actions** section.|
|EXIF|Enables capturing and viewing of additional image-related metadata of a content item. **Note:** This aspect is automatically applied to an image content item.

|Adding EXIF aspect displays additional information \(such as Camera Model, Camera Software, Resolution Unit, etc\) about the image in the **Edit Properties** page.|
|Audio|Enables capturing and viewing of additional audio-related metadata of a content item. **Note:** This aspect is automatically applied to an audio content item.

|Adding Audio aspect displays additional information \(such as Album, Artist, Composer, Track Number, etc\) about the audio file in the **Edit Properties** page.|
|Index Control|Enables control over how a content item is indexed.|Adding Index Control aspect displays additional Is Indexed and Is Content Indexed in the **Edit Properties** page.|

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

