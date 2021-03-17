---
author: Alfresco Documentation
---

# Use Cases

Typical use cases when developing content management solutions, with an example of the appropriate API.

The following table lists use cases and what Alfresco API to use:

|Use case|API|
|--------|---|
|Accessing content metadata from a Platform extension such as a web script or workflow.|[Repository JavaScript API](API-JS-intro.md)|
|Accessing text content \(for example txt, xml, html\) for files from a Platform extension such as a web script or workflow.|[Repository JavaScript API](API-JS-intro.md)|
|Implementing a workflow service task that should publish content metadata to an external system via a 3rd party Java library.|[Public Java API](java-public-api-list.md)|
|Accessing binary content \(e.g. docx, pdf\) for files from a Platform extension such as a web script or workflow.|[Public Java API](java-public-api-list.md)|
|Implementing a scheduled job that should access content and metadata.|[Public Java API](java-public-api-list.md)|
|Implementing a repository action that should access content and metadata.|[Public Java API](java-public-api-list.md)|
|Creating a stand-alone client talking remotely to Alfresco.|[REST API](../pra/1/topics/pra-welcome.md)|
|Changing the view for a Web Script, Dashlet, Page.|[Repository Freemarker Template API](../references/API-FreeMarker-intro.md)|
|Creating a new Share Page or Share Dashlet.|Refer to the Aikau page extension point in the [Share Architecture](dev-extensions-share-architecture-extension-points.md). See also [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/).|
|Modifying an existing Share Page or Dashlet.|Refer to the Surf page extension points in the [Share Architecture](dev-extensions-share-architecture-extension-points.md). Also, look at the [Alfresco Share JavaScript APIs \(client-side\)](dev-extensions-share-surf-web-scripts.md)|
|Developing a mobile content management application for iOS.|[Mobile SDK for iOS](http://docs.alfresco.com/mobile_sdk/ios/concepts/mobile-sdk-ios-intro.html)|
|Developing a mobile content management application for Android.|[Mobile SDK for Android](http://docs.alfresco.com/mobile_sdk/android/concepts/mobile-sdk-android-intro.html)|

**Parent topic:**[API guide](../concepts/dev-api-intro.md)

