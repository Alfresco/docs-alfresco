---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# About aspects

Aspects allow you to add functionality to existing content types.

Aspects can have properties that, when added, can enhance the content types. You can also attach behaviors and workflows to aspects. The following table lists the aspects available in Alfresco.

|Aspects|Description|Changes in Behavior/Share Interface|
|-------|-----------|-----------------------------------|
|Classifiable|Enables categories to be assigned to a content item. For example, content items can be categorized under Languages, Region, Software Document Classification, and so on.|Adding Classifiable aspect displays an additional **Categories** property in the document properties.|
|Complianceable|This aspect is no longer valid. For compliance-related behavior, use the Record Management module.||
|Dublin Core|Enables metadata \(such as publisher, contributor, identifier\) to be added to a content item.|Adding Dublin Core aspect displays the following additional metadata properties in the document properties: -   Publisher
-   Contributor
-   Type
-   Identifier
-   Source
-   Coverage
-   Rights
-   Subject

|
|Effectivity|This aspect is no longer valid. For compliance-related behavior, use the Record Management module.||
|Summarizable|Enables addition of a brief description about the content item.|Adding Summarizable aspect displays additional **Summary** property in the document properties.|
|Versionable|Enables versioning of a content item each time it is edited \(checked out and checked back in or updated\). In AlfrescoShare, content items are versionable by default.|Adding Versionable aspect displays the version history of a content item in the **Version History**.|
|Emailed|Captures email-related information of the content item, if it is received as an email attachment.|Adding Emailed aspect displays additional properties \(such as Originator, Addressee, Addresses, Sent Date and Subject\) in the document properties.|
|Inline Editable|Enables content items to be edited directly in Alfresco.|Adding Inline Editable aspect displays the **Edit in Alfresco** link in the document properties.|
|Taggable|Enables tagging of content items using keywords.In AlfrescoShare, content items are taggable by default.

|Adding Taggable aspect displays the tagged keywords in the **Tags** section. You can also search for content items in the Document Library using the keywords displayed.|
|Geographic|Enables a content item to be geographically tagged using latitude and longitude information. The location of content item is displayed as a marker on Google Maps. Click on the marker to display the Document Details page for that content item.|Adding Geographic aspect displays additional **Latitude** and **Longitude** properties on the **Edit Properties** page. Also, the **View on Google Maps** link is displayed in the **Document Actions**.|
|EXIF|Enables capturing and viewing of additional image-related metadata of a content item. **Note:** This aspect is automatically applied to an image content item.

|Adding EXIF aspect displays additional information \(such as Camera Model, Camera Software, Resolution Unit\) about the image in the document properties.|
|Audio|Enables capturing and viewing of additional audio-related metadata of a content item. **Note:** This aspect is automatically applied to an audio content item.

|Adding Audio aspect displays additional information \(such as Album, Artist, Composer, Track Number\) about the audio file in the document properties.|
|Index Control|Enables control over how a content item is indexed.|Adding Index Control aspect displays additional Is Indexed and Is Content Indexed in the document properties.|

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

