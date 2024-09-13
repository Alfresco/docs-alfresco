---
title: AEV configuration files
---

When installing and setting up Alfresco Enterprise Viewer it's important to understand how configuration settings work.

## Spring properties files

## AEV web application properties

Spring loads properties files into the system in a specific order to allow overriding. Properties are loaded in the following order (last wins):

1. `defaults.properties` (sensible defaults for every property)
2. `project-placeholders.properties` (project specific properties)
3. `openannotate-override-placeholders.properties` (Optional. Tomcat-specific properties)
4. `override-placeholders.properties` (environment-specific properties)

In general, use the `openannotate-override-placeholders.properties` to override any of the default properties. This file must be placed on the Tomcat classpath (for example, in the `<TOMCAT_HOME>/shared/classes` folder), and overrides all properties located in `OpenAnnotate.war`. Properties defined here can still be overridden by `override-placeholders.properties`, but if for example server URLs are all that need to be defined, these can be left in `openannotate-override-placeholders.properties`, allowing WARs to be promoted through various environments without needing to be re-built / configured.

### OpenContent properties

OpenContent properties related to AEV are located in the `universal-defaults.properties` file. Any of these properties can be overridden if desired in the `opencontent-override-placeholders.properties` file.

For more information on default properties for OpenContent, see [OpenContent - default properties](#opencontent---default-properties).

### keepAnnotationOnApproval

If set to `true`, when updating a document to a new version, all annotations are preserved across these versions. If set to `false` or overridden, when updating a document to a new version, all annotations are lost. 

> **Note:** This property should not be set to `true` in regulated environments where all annotations should be stripped prior to approval.

## AEV default properties

The following are the configurable properties for Enterprise Viewer:

### serviceAccountUsername

This is the service account user name to use when logging in using the "stored" endpoint. The stored endpoint allows you to log in using the configured service account and provide a display name (`displayName`) to identify the user you are logging in for.

> **Note:**  This property must be overridden if you're using the "stored" endpoint.

Default value: `""`

### serviceAccountPassword

This is the service account password to use when logging in using the "stored" endpoint. The stored endpoint allows you to log in using the configured service account and provide a display name to identify the user you are logging in for.

> **Note:** This property must be overridden if you're using the "stored" endpoint.

Default value: `""`

### serviceAccountDocbase

The docbase the service account should login to.

Default value: `""`

### ocRestEndpointAddress

This URL is the REST endpoint for the running instance of OpenContent. If Enterprise Viewer is being used in a load balancing setup and the instances of Enterprise Viewer and OpenContent are on the same server, this property should be the **non-load balanced url**, to ensure that the requests to OpenContent are always directed to the same OpenContent instance.

Default value: `http://localhost:8080/OpenContent/rest`

### clientRequestUrl

The URL that client requests from Enterprise Viewer to OpenContent should be made to. Generally, this only changes if OpenContent has a different REST root, `/alfresco/OpenContent` for example used when OpenContent is an Alfresco subsystem.

Default value: `/OpenContent/rest`

### collaborationEndpoint

This URL is the endpoint on which the web socket server is listening for a connection. This should be used when Enterprise Viewer is run in collaboration mode. If collaboration mode is enabled but this property is not specified, collaboration mode will not work properly.

For load balanced setups, there should only be a single collaboration server. So this should point to the **single, non-load balanced URL**.

Default value: `http://localhost:3000`

### collaborationModeEnabled

Whether or not Enterprise Viewer is being run in collaboration mode to take advantage of features like real-time annotations and chat functionality.

Default value: `false`

### singleAnnotationDialog

Set to `true` if only one annotation dialog should open at a time, or `false` if one or more annotation dialogs should open.

Default value: `true`

### allowExternalReviewers

When set to `true` annotations from third party applications for both users that do not have an account in Alfresco and users that have corresponding accounts in Alfresco should be accepted. When set to `false`, only annotations from users with a corresponding Alfresco account will be accepted. 

In order to have `allowExternalReviewers` set to `true`, a special license setting must be set in your AEV license by the Hyland License Team with the property `hasExternalOAUsers: true`.

Default value: `false`

### annotation.AllowMultipleOfflineReviewers

When set to `false` offline annotations will be owned by the user that checked the annotations in. No matter which user is set on the offline annotation, the annotation will always be displayed as being added by the user who checked in the document.

Default value: `false`

### excludeEmbeddedAnnotations

Set to `true` if annotations embedded in the PDF should not be fetched. This may be used for documents that are part of a collection, documents with a MIME type other than PDF, configurations that explicitly exclude embedded annotations, or very large files. If set to `false` annotations embedded in the PDF are imported, including those created in third-party systems like Adobe. Any users that do not have a corresponding Alfresco account will not have their  annotations displayed in AEV.

Default value: `true`

### serverAnnotationsEditable

Set to `true` if server annotations can be modified. Setting this to `false`, prevents users from editing their annotations after their session ends.

Default value: `true`

### sidebarDefaultOpen

Whether or not Enterprise Viewer should start up with its sidebar (which contains other modules like summary, search and collaboration) showing.

Set it to `true` if sidebars should be displayed by default (once Enterprise Viewer opens), otherwise set it to `false`.  

Default value: `true`

### helpUrl

This URL points to a help website for using Enterprise Viewer. To access the help website, click the `?` icon on the toolbar.

**This is not recommended to be overridden.**

Default value: `https://docs.alfresco.com/`

### targetMimetype

The target MIME type for pages that are only to be viewed. Defaults to PNG, but supports JPG (`image/jpeg`) as well.

Default value: `image/png`

### imageFullResolution

 The highest resolution at which images (not PDFs) should be loaded and displayed, ensuring that image quality is maintained, especially when `progressiveReloadSteps` is set to zero. It serves as a benchmark for determining whether to use the current resolution or reload the image at a higher resolution to achieve optimal clarity.

Default value: `64`

### imageMinimumResolution

The minimum resolution for images. If the current resolution is less than this value, images are reloaded at this minimum resolution or higher to ensure a baseline level of quality. 

Default value: `16`

### pdfFullResolution

The highest resolution for loading and displaying PDF documents. Similarly to `imageFullResolution`, it ensures that PDFs are displayed with the highest quality possible and it is used as a reference point for whether to reload a document at a higher resolution.

Default value: `244`

### pdfMinimumResolution

The minimum resolution for PDFs. It is used to ensure that PDFs are not displayed below a certain level of quality, reloading them at this minimum resolution or higher as needed.

Default value: `64`

### progressiveReloadSteps

This property controls the initial resolution and the number of steps in the progressive loading process. You can define how many intermediate loading steps the image should go through before reaching its full resolution. This helps in improving the initial load time and provides a smoother user experience, especially for large images or documents.

Default value: `0`

### pageZoom

The initial zoom fit to use for the  `Edit Pages` or `Add Signature` modes. The allowed values are either `fitHeight` or `fitWidth`. Fit height adjusts the document so the entire height is visible. Fit width adjusts the document so the entire width is visible.

Default value: `fitWidth`

### numPreloadPages

This property determines how many pages around the current page should be preloaded. Preloading works by making requests to fetch pages close to the current page the user is viewing in order to cache the image, which results in faster page transitions and better user experience. Limiting the number of preloaded pages helps in managing memory and network resources.

The allowed values are the following:

* `0`: to preload all the pages of the document
* `-1`: not to preload any pages
* Any other positive integer: This integer specifies the total number of pages to preload - half are pages before the current page and the other half are after the current page.

   > **Note:**
   >
   > * The configured value should be a multiple of 2 because the number of pages to preload is divided by 2.
   > * Specifying `1` and `2` accomplishes the same result.
   >
   > * Once the number of preloaded pages equals the configured value, no more pages are preloaded until the page is changed.

Default value: `10`

### enhancedColorMode

This flag controls the colors that are displayed and allowed to be chosen for annotations.

* If set to `true`, annotation colors are displayed for all users.
* If set to `false`, your annotations are displayed in red, your sticky notes and highlights are displayed in yellow, other user's annotations are displayed in blue (the same is true for the downloaded annotated PDF).

Default value: `true`

### dateFormat

The format to use when displaying dates in annotation dialog boxes. The formatting uses the open source library `Moment.js`, so any formats found in the [Moment.js formatting Documentation](http://momentjs.com/docs/#/displaying/format/){:target="_blank"} may be used.

Default value: `MM/DD/YYYY`

### enabledActions and Modes

Configuring what Buttons and Actions appear in Enterprise Viewer is a little more in-depth than the average configuration option.

See [Configure Enterprise Viewer actions and modes]({% link enterprise-viewer/latest/config/actions.md %}) for more details.

### quillEnabledButtons

A comma separated list of style buttons that are visible for styling annotation text. Currently, only `italic`, `bold`, and `underline` are supported.

Default value: `bold,italic,underline`

### leftSidebarModules

A comma separated list of views to be enabled in the left sidebar.

Default value: `bookmarks,attachedDocs,thumbnails,sections,documentList`

### rightSidebarModules

A comma separated list of views to be enabled in the right sidebar.

Default value: `summary,search,participants,suggestedRedactions`

### redactionType

This is the type of redaction that should be made when entering redaction mode. 

It can be set to one of the following values:

* `redactInPlace` - makes the redactions directly on the document being redacted.
* `redactedAsCopy` - makes a copy of the document being redacted and the redactions on the copy, so the original document is not be modified.
* `unredactedAsCopy` - makes a copy of the document being redacted and the redactions on the original document, so the copy doesn’t include the redactions.

Default value: `redactInPlace`

### autosaveInterval

The number of milliseconds Enterprise Viewer waits between each autosave.

* `0`: This tells AEV to NOT autosave.
* Any other positive integer: The number of milliseconds Enterprise Viewer waits for between each autosave. This should not be set to a number below 5000 - 10000 (5 - 10 seconds), as it could cause undefined behavior.

Default value: `60000`

### autosaveBeforeExit

Set to `true` if Enterprise Viewer should automatically save before exiting, or `false` otherwise.

Default value: `true`

### enabledPopupNotifications

The list of the Collaboration mode notifications that are enabled and appear on internal popups when the **Participants** tab is closed. To disable a type of notification, remove it from the list of notification in this property. The default is that all notification are enabled.

Default value:

```text
chat,reply,mention,userJoined,userLeft,participantFollowing,participantBeingFollowed,serverConnection,checkInAnnotations,checkInAnnotationsFailed,checkInAnnotationsFailedUsernames,burnInRedactionFailed,checkinAnnotationsFinished,pageSelectMode,welcomeBackPage,save,loadedAnnotations,saveFinished,copyPaste,copyPasteNotReady,tooLargeForThumbnails,closeSave,closeCopyPaste,pageRangeInvalid,logstashFailed,portfolioContainsNonPdf,docHasAnnotations,afterPageLoad,textLocationDataFailed,enterSectioningMode,sectionNameInvalid,foundWidgets,collectionOpened,fileAttachmentFailed,fileAttachmentProcessing,splitPdfSelectPageRange,pdfDownloadFailed,pdfExtractPagesFailed,pdfPrunePagesFail,documentCreationFailed,switchToEditMode,displayDocumentListFailed,annotationContentConvertedToPlaintext,annotationContentFailedToSave,errorDrawingTextAnnotation,errorParsingRows,licenseWarn,limitedFunctionailityLargeFile
```

### slideViewerTileDirectoryRoot

A root path for locating slide viewer resources, such as JSON files that define slide properties and tile definition files (`.dzi`) used for rendering tiled images. It ensures that resources are correctly located and fetched based on the base directory path.

Default value: `http://localhost:8080/OpenAnnotate/images/seadragon/`

### sessionCookieName

The name of the session cookie which is used to track sticky sessions in load balanced environments. For load balanced environments, sticky sessions are required to ensure Enterprise Viewer always hits the correct OpenContent with all its internal requests.

Default value: `JSESSIONID`

### checkServletRequestForSessionId

Set to `true` if a check should be made for the sessionId on the Servlet requests from Enterprise Viewer's front-end and append it to the requests to OpenContent, or `false` otherwise. This sessionId is used to maintain sticky sessions in load-balanced environments. If this property and `checkServletCookieForSessionId` are both set, the sessionId set on the Servlet request overrides any sessionId set on the cookie.

Default value: `true`

### checkServletCookieForSessionId

Set to `true` if a check should be made for the sessionId on a cookie and append it to the requests to OpenContent, or `false` otherwise. This sessionId is used to maintain sticky sessions in load-balanced environments. If this property and `checkServletRequestForSessionId` are both set, the sessionId set on the Servlet request overrides any sessionId set on the cookie.

Default value: `true`

### rerenderPageOnResize

Set to `true` to send new requests to OpenContent every time you zoom in or out on a page, or `false` otherwise.

Default value: `true`

### numberOfPagesForLargeDocuments

The number of pages that are considered as a "large" document.

* If the value is `0`, it ignores considering documents with many pages as a large document.
* If a document has more pages than the value here, text search data isn't loaded initially, and thumbnails are disabled.
* Text search data can still be manually loaded by the user later, after answering `yes` to a modal dialog box informing them of the delay.

Default value: `90`

### sizeOfLargeFiles

The size (in bytes) to consider a document as "large". If a document's size is bigger than the value here, a user is prompted with a modal dialog box to confirm calls that require a lot of resources to limit memory usage.

Default value: `104857600`(100 MB)

### maxDocumentSize

The maximum size of a document (in bytes) that is loaded.

* If the value is `0`, there are no bounds for large documents.
* Otherwise, if a document's size is bigger than the defined value, a modal dialog box appears to let the user know that their document is too large to open.

Default value: `2147483648`(2 GB)

### enableCommentBox

Set to `true` if the comment box is enabled in the annotation dialog box, or `false` otherwise.

Default value: `true`

### enableStatuses

Set to `true` if annotations can have a status and previous statuses appear.

Default value: `true`

### searchPagesPerRequest

The number of document pages to fetch search data for, per request. This is a performance-only property.

Default value: `200`

### textDataPagesPerRequest

The number of document pages to fetch text-select location data for, per request. This is a performance-only property.

Default value: `200`

### maxUserPageCookieSize

This property defines the maximum number of entries the `openannotate.userPage` cookie can hold. If the cookie object reaches this limit, the function removes the oldest entry to make room for a new one. This prevents the cookie from growing indefinitely and potentially exceeding the size limits imposed by browsers on cookies.

Default value: `50`

### annotationSummaryDefaultSort

The default sorting order for annotations in the summary view. It specifies which fields to sort by and whether the sort should be in ascending or descending order, indicated by the presence of `!` for a descending sort. Each value is separated by a comma.

Default value: `page,!p4`

### warnBeforeSaveModifications

Whether or not a dialog box should appear before saving page modifications within the `Edit` or `Sectioning` modes.

Default value: `false`

### thumbnailResolution

The minimum resolution to load the thumbnail images for the document.

Default value: `32`

### initialThumbnailLoad

The batch size for loading thumbnail images. When thumbnails are being fetched, this configuration determines how many thumbnails are loaded at once. This is particularly useful for managing performance and ensuring that the application does not attempt to load all thumbnails at once, which could cause performance issues, especially with large documents.

Default value: `25`

### newVersionOnModification

If set to `true`, a new version of the document will be created when the document is modified. If set to `false`, the document in the repository will remain the same version when modified. It works within the `Edit` or `Sectioning` mode. 

Default value: `true`

### majorVersionOnModification

If set to `true`, a major version of the document will be created when the document is modified (exluding modifications to annotations). If set to `false`, the document in the repository will default to a minor version when modified. It works within the `Edit` or `Sectioning` mode.

Default value: `false`

### keepToolSelectedDefault

Whether the keep tool selected feature should be on by default.

Default value: `false`

### annotationTypesToShowDialogForWithKeepToolSelected

Which annotation type(s) dialogs to show when the annotation is created. Each value must be separated with a comma.

Different annotation types:

```text
Line,Oval,Rectangle,Highlight,Cross-Out,Inserted Text,Replacement Text,Reply,Sticky Note,Signature,Approved Stamp,Accept Stamp,Reject Stamp,Reviewed Stamp,PageSizedCheckmark Stamp,Status,Freetext,File Attachment,Free Draw,Redaction
```

Default value: `Sticky Note`

### thumbnailBatchSize

The maximum number of thumbnails to be processed in a single call. This configuration is used to determine how many thumbnail images to fetch and process at one time, optimizing performance by batching the requests.

Default value: `200`

### thumbnailWidth

The standard width for the thumbnails of document pages. This width is used to compute the height of the thumbnails, maintaining the aspect ratio of the pages. Also, the height is calculated using this property multiplied by `1.83`, assuming a standard aspect ratio of 1:1.83 for the pages​.

Default value: `150`

### configuredLocales

Enterprise Viewer takes a list of locales from the browser and returns the first configured locale from this list as the language to display in AEV. If none of the locales from the list are configured in the users' browser, the `defaultLocale` is used regardless.

You'll find a list of all locales AEV supports in [Supported Platforms]({% link enterprise-viewer/latest/config/supported-languages.md %}).

Default value: `en,ja,fr,de,es,it,nl`

### defaultLocale

The default locale to use if the user has no configured locales. This value must be available in [Supported Platforms]({% link enterprise-viewer/latest/config/supported-languages.md %}).

Default value: `en`

### checkRenditioningDelay

The delay time before retrying to get the document information if the document is still being renditioned. This happens after a precondition failed status is encountered (HTTP status code 412), indicating that the document is not yet ready to be processed or displayed. The delay ensures that the system waits for the specified time before making another attempt to check if the renditioning process is complete​.
Default value: `10000`

### loadAnnotationsWithDocInfo

Load annotations simultaneous with document information. Prevents the user from viewing the document until the annotations are loaded.

If set to `true`, the annotations load times are included when retrieving performance metrics related to document loading.

Default value: `false`

### minPagesToDefaultSectionModeOn

The minimum number of pages a document must have for the system to automatically enter the default sectioning mode when the document is loaded. Set to `0` to prevent sectioning mode.

Default value: `10`

### determineSectionsFromProperty

Whether or not sections should be identified from a specific property in the document's metadata.

If set to document property name, the property's value is fetched and used to identify sections, formatting, and escaping the value appropriately. 

Default value: `false`

### saveSectionsAsBookmarks

Whether or not to enable the functionality of saving sections as bookmarks within a document. If set to `true`, the sections created by a user are also saved as bookmarks.

Default value: `true`

### enablePageObfuscation

Whether or not the loaded image should be obfuscated. 

If set to `true`, Enterprise Viewer converts the image response into a binary format and creates a blob URL to use as the image source, adding an extra layer of security to the image data. This helps prevent direct access or unauthorized copying of the image by obfuscating its content before displaying it in the viewer.

Default value: `false`

### enableSecureViewingOverlay

Whether or not to apply a separate overlay note to each PDF page when viewing them. This overlay displays the current `username` and the `current date` (when a user is viewing it) in the document.

This is configured in the `overlay-config-override.xml` file.

For more information on configuring overlays, see the `oaSecureViewing` property in [Configure Overlays]({% link enterprise-viewer/latest/config/overlay.md %}).

Default value: `false`

### enableAEVTOverlays

Whether or not to enable functionality for AEVT (Optimus Transformations) overlays. When `true` (and AEVT is enabled), overlays are applied where configured.

For more information on configuring overlays, see [Configure Overlays]({% link enterprise-viewer/latest/config/overlay.md %}). 

Default value: `false`

### zoomClientID

Client ID property for sending a Zoom authorization call that eventually sends a request that creates a meeting. Blank by default, as you'll need to create a Zoom app to get this value and use this feature.

Default value: ``

### clientKey

The optional OpenContent client key to be used in `OAUtil.oaRestTemplateGet/oaRestTemplatePost` calls. This key, if configured, sets as a request header and eventually used OpenContent side for some SSO implementations.

Default value: ``

### serviceExtAuthEndpoint

REST Endpoint that holds the external authentication service that OAaaS will leverage to provide security.

Default value: ``

### oaVideoEndpointAddress

The base endpoint address for `OpenAnnotateVideo`.

Default value: `/OpenAnnotate/OpenAnnotateVideo/index.html`

### oaVideoEmbedded

Whether or not the `OpenAnnotateVideo` is embedded in `OpenAnnotate`.

Default value: `true`

### ignoreTextInHeadersAndFooters

Whether or not the selected text in headers and footers is ignored. This property can be used to evaluate if any text has been selected on a page.

Default value: `false`

### enableEditInSummaryView

Whether or not users are allowed to edit annotation content in the summary view. If set to `false`, users are allowed to only edit text in the main annotation dialog.

Default value: `true`

### userFollowingEnabled

Whether or not the `following` feature is enabled in the participants view.

Default value: `true`

### displayLoadTime

Whether or not OA load time data is displayed. It is displayed in the `i` icon.

Default value: `true`

### displaySameLoadTimeAtAllResolutions

Whether or not the load time information is displayed above the toolbar on small screens. If set to `true`, the load information is displayed in the toolbar row regardless of screen size.

Default value: `false`

### enableReplies

Whether or not users are allowed to reply to annotations.

Default value: `true`

### largeDocTextDataPagesPerRequest

The number of pages of a document that is processed at a time to retrieve the location data for a selectable text within a large document. For defining large documents, see the `numberOfPagesForLargeDocuments` and `maxDocumentSize` properties.

This is a performance-only property.

Default value: `5`

### directDownload

Whether or not request a temporary, secured URL within limited access time. If set to `true`, `&presignedUrl=true` is appended to the URL. This property is often used for accessing resources in cloud storage services (like Amazon S3) without needing long-term credentials.

Default value: `false`

### allowDownloadNativeContent

Whether or not to download the native content if there is an error retrieving document information and the document cannot be displayed in OA.

Default value: `true`

### fileAttachmentMaxSize

The maximum size (in bytes) of file attachments.

Default value: `10260000`

### numOfPageDimensionsToFetch

The number of page dimensions, such as height and width, retrieved at once when as user views a document. This value is used to calculate how many pages' dimensions should be requested in each batch. This works to retrieve page dimensions around the current visible page, balancing the load by controlling the number of requests and ensuring efficient pre-caching of nearby pages' dimensions.

Default value: `100`

### pageHeightPlaceHolder

A default height used for a page when the actual dimensions are not available yet.

Default value: `792`

### pageWidthPlaceHolder

A default width used for a page when the actual dimensions are not available yet.

Default value: `612`

### displayOAVersionInfo

Whether or not the OA version information is displayed in OpenAnnotate. If set to `true`, the `displayOAlogo` property must be also set to `true`.

Default value: `true`

### displayOALogo

Whether or not the OA logo is displayed in OpenAnnotate.

Default value: `true`

### useSummaryEventsFilterOnDocAnnots

Whether or not annotations and summaries should be hidden if they do not match the search criteria. If set to `false`, a user can filter summary entries but keep all annotations visible.

Default value: `true`

### showSelectedToolInDropDown

Whether the icon displayed in the selection tool drop-down list is either the three-line menu icon or the icon of the tool that a user has currently selected, in non-standalone view.

Default value: `false`

### quillPlaceholderEnabled

If set to `false`, the initial instructional note in the annotation text area is removed. 

Default value: `true`

### fullyQualifiedClientUrl

A fully qualified REST URL for client side use.

Default value: `http://localhost:8080/OpenContent/rest`

### sso.client.key

An optional OpenContent client key that is used in `OAUtil.oaRestTemplateGet/oaRestTemplatePost`. If set to a value, it should be included in the request headers of your HTTP request.

Default value: ``

### suggestedRedactionProperties

List of property values that are suggested for redaction. To set it to the desired property OpenContent names, use comma to separate them. For example, for Alfresco environment, the following can be used: `insuranceDemo_claimantName,insuranceDemo_policyHolder`.

Default value: ``

### enablePruneAudit

Whether or not OpenContent should audit when executing a prune.

Default value: `false`

### mentionMinChars

The minimum number of characters a user must type after (not including) a denotation character to display the `mention` drop-down list.

Default value: `3`

### mentionIsolateCharacter

Whether or not the `@` must be isolated (at the beginning of a line or after a whitespace) to create a mention.

Default value: `true`

### mentionOnlyActiveUsers

Whether or not only active users can be mentioned. If set to `false`, all users with access to a document can be mentioned.

Default value: `false`

### mentionSearchUserNames

Whether or not to include `userNames` in search when populating the `mention` drop-down list.

Default value: `true`

### mentionSearchDisplayNames

Whether or not to include `displayNames` in search when populating the `mention` drop-down list.

Default value: `true`

### mentionEmailOfflineUsers

Whether or not an offline, mentioned user receives an email notification. 

To set the filename of email subject and body templates for offline mentioned emails, see the `annotation.mentionEmailSubjectTemplateName` and `annotation.mentionEmailBodyTemplateName` properties in the [OpenContent - default properties](#opencontent---default-properties) section.

Default value: `false`

### secureBrowserCookies

Set it to `true` if the SSL security protocol is used.

Default value: `false`

### split.prune.copy.attrs

List of properties to copy property values while splitting or pruning document. To set it to the desired property OpenContent names, use comma to separate them. For example, for Alfresco environment, the following can be used: `insuranceDemo_claimantName,insuranceDemo_policyHolder`. If set to blank, all property values are copied.

### AEV stamp properties

The following are the stamp properties to configure custom stamps for Enterprise Viewer.

#### customStamp1Label

A custom label for the Custom Stamp 1. If set to a value, then this stamp is displayed from the **Stamps** drop-down list.

> **Note:** Text cannot be localized based on browser's language once it has been configured.

Default value: ``

#### customStamp1HelpText

A custom helper text for Custom Stamp 1. 

> **Note:** Text cannot be localized based on browser's language once it has been configured.

#### customStamp1Color

A color for the Custom Stamp 1. The colors are set in the following order: `FONT_COLOR`, `GRADIENT_START`, `GRADIENT_STOP`.

For example:

* If set to the following value: `#FF0000,#00FF00,#0000FF`, then `#FF0000` is the font color, `#00FF00` is the gradient start color, and `#0000FF` is the gradient end color.
* To set only the font color as red and use the default colors for the gradient start and gradient end, set it to: `#FF0000` or `#FF0000,`
* To set only the gradient start color as red and use the default colors for the font and gradient end, set it to: `,#FF0000,`
* To set only the gradient end as red and use the default colors for the font and gradient start, set it to: `,,#FF0000`

>**Note:** The color values must be separated by a comma even if an empty string is used to indicate that the default value should be used.

Default value: ``

#### customStamp1Opacity

A stamp image opacity for Custom Stamp 1. The value must be equal or larger than `0.1` and equal or smaller than `1`.

Default value: ``

#### customStamp2Label

A custom label for the Custom Stamp 2. If set to a value, then this stamp is displayed from the **Stamps** drop-down list.

> **Note:** Text cannot be localized based on browser's language once it has been configured.

Default value: ``

#### customStamp2HelpText

A custom helper text for Custom Stamp 2. 

> **Note:** Text cannot be localized based on browser's language once it has been configured.

#### customStamp2Color

A color for the Custom Stamp 2. The colors are set in the following order: `FONT_COLOR`, `GRADIENT_START`, `GRADIENT_STOP`.

For example:

* If set to the following value: `#FF0000,#00FF00,#0000FF`, then `#FF0000` is the font color, `#00FF00` is the gradient start color, and `#0000FF` is the gradient end color.
* To set only the font color as red and use the default colors for the gradient start and gradient end, set it to: `#FF0000` or `#FF0000,`
* To set only the gradient start color as red and use the default colors for the font and gradient end, set it to: `,#FF0000,`
* To set only the gradient end as red and use the default colors for the font and gradient start, set it to: `,,#FF0000`

>**Note:** The color values must be separated by a comma even if an empty string is used to indicate that the default value should be used.

Default value: ``

#### customStamp2Opacity

A stamp image opacity for Custom Stamp 2. The value must be equal or larger than `0.1` and equal or smaller than `1`.

Default value: ``

#### customStamp3Label

A custom label for the Custom Stamp 3. If set to a value, then this stamp is displayed from the **Stamps** drop-down list.

> **Note:** Text cannot be localized based on browser's language once it has been configured.

Default value: ``

#### customStamp3HelpText

A custom helper text for Custom Stamp 3. 

> **Note:** Text cannot be localized based on browser's language once it has been configured.

#### customStamp3Color

A color for the Custom Stamp 3. The colors are set in the following order: `FONT_COLOR`, `GRADIENT_START`, `GRADIENT_STOP`.

For example:

* If set to the following value: `#FF0000,#00FF00,#0000FF`, then `#FF0000` is the font color, `#00FF00` is the gradient start color, and `#0000FF` is the gradient end color.
* To set only the font color as red and use the default colors for the gradient start and gradient end, set it to: `#FF0000` or `#FF0000,`
* To set only the gradient start color as red and use the default colors for the font and gradient end, set it to: `,#FF0000,`
* To set only the gradient end as red and use the default colors for the font and gradient start, set it to: `,,#FF0000`

>**Note:** The color values must be separated by a comma even if an empty string is used to indicate that the default value should be used.

Default value: ``

#### customStamp3Opacity

A stamp image opacity for Custom Stamp 3. The value must be equal or larger than `0.1` and equal or smaller than `1`.

Default value: ``

#### customStamp4Label

A custom label for the Custom Stamp 4. If set to a value, then this stamp is displayed from the **Stamps** drop-down list.

> **Note:** Text cannot be localized based on browser's language once it has been configured.

Default value: ``

#### customStamp4HelpText

A custom helper text for Custom Stamp 4. 

> **Note:** Text cannot be localized based on browser's language once it has been configured.

#### customStamp4Color

A color for the Custom Stamp 4. The colors are set in the following order: `FONT_COLOR`, `GRADIENT_START`, `GRADIENT_STOP`.

For example:

* If set to the following value: `#FF0000,#00FF00,#0000FF`, then `#FF0000` is the font color, `#00FF00` is the gradient start color, and `#0000FF` is the gradient end color.
* To set only the font color as red and use the default colors for the gradient start and gradient end, set it to: `#FF0000` or `#FF0000,`
* To set only the gradient start color as red and use the default colors for the font and gradient end, set it to: `,#FF0000,`
* To set only the gradient end as red and use the default colors for the font and gradient start, set it to: `,,#FF0000`

>**Note:** The color values must be separated by a comma even if an empty string is used to indicate that the default value should be used.

Default value: ``

#### customStamp4Opacity

A stamp image opacity for Custom Stamp 4. The value must be equal or larger than `0.1` and equal or smaller than `1`.

Default value: ``

#### customStamp5Label

A custom label for the Custom Stamp 5. If set to a value, then this stamp is displayed from the **Stamps** drop-down list.

> **Note:** Text cannot be localized based on browser's language once it has been configured.

Default value: ``

#### customStamp5HelpText

A custom helper text for Custom Stamp 5. 

> **Note:** Text cannot be localized based on browser's language once it has been configured.

#### customStamp5Color

A color for the Custom Stamp 5. The colors are set in the following order: `FONT_COLOR`, `GRADIENT_START`, `GRADIENT_STOP`.

For example:

* If set to the following value: `#FF0000,#00FF00,#0000FF`, then `#FF0000` is the font color, `#00FF00` is the gradient start color, and `#0000FF` is the gradient end color.
* To set only the font color as red and use the default colors for the gradient start and gradient end, set it to: `#FF0000` or `#FF0000,`
* To set only the gradient start color as red and use the default colors for the font and gradient end, set it to: `,#FF0000,`
* To set only the gradient end as red and use the default colors for the font and gradient start, set it to: `,,#FF0000`

>**Note:** The color values must be separated by a comma even if an empty string is used to indicate that the default value should be used.

Default value: ``

#### customStamp5Opacity

A stamp image opacity for Custom Stamp 5. The value must be equal or larger than `0.1` and equal or smaller than `1`.

Default value: ``

### stampApprovedLabel 

A custom label for **Approved** stamp. Configuring this value does not affect the stamp behavior.

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampApprovedHelpText 

A custom helper text for **Approved** stamp. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: ""  

### stampPaidLabel 

A custom label for **Paid** stamp. Configuring this value does not affect the stamp behavior. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampPaidHelpText 

A custom helper text for **Paid** stamp.

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampReviewedLabel 

Acustom label for **Reviewed** stamp. Configuring this value does not affect the stamp behavior. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampReviewedHelpText 

A custom helper text for **Reviewed** stamp. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampAcceptedLabel 

A custom label for **Accepted** stamp. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampAcceptedHelpText 

A custom helper text for **Accepted** stamp. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampRejectedLabel 

A custom label for **Rejected** stamp. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampRejectedHelpText 

A custom helper text for **Rejected** stamp. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampCheckmarkLabel 

A custom label for **Checkmark** stamp. Configuring this value does not affect the stamp behavior. 

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

### stampCheckmarkHelpText 

A custom helper text for **Checkmark** stamp.

>**Note:** Text cannot be localized based on the browser's language once it has been configured. 

Default value: "" 

## OpenContent - default properties

The following section outlines all configurable default properties for OpenContent.  

### license.doSendWarningEmail

Whether or not to send a warning email when the number of repository users approaches the maximum allowed by the license, or when the number of users in a group is approaching the maximum allowed by the license.

Default value: `true`

### license.expiringSoonCounter

The number of days before the license expires in which OpenContent sets a warning state for the active license.

Default value: `30`

### license.systemUserLimitCounter

Number of system users allocated for the license. This property is used in the calculation for the `expiringSoonCounter` property.

Default value: `25`

### license.groupUserLimitCounter

Used with a group-based license: this property configures how close a user group approaches the maximum allowed number of users before a warning email is sent.

Default value: `5`

### license.warning.email.recipients

When in a warning state and configured to do so, OpenContent sends a license warning email to all of the email addresses listed in this property.

Default value: ``

### fail.loud.on.errored.embedded.annotations

If set to `true`, an exception is immediately thrown when OpenContent fails to retrieve embedded annotations from a page. This defaults to `true` so that the user is notified of errors loading annotations.

This is an experimental feature. If set to `false`, users may be able to load, download, print previously erroring annotated PDFs but some annotations may be missing.

Default value: `true`

### annotation.allowCheckInAfterModification

Whether or not to allow checking in a document after its modified date. This defaults to `false` so that a user cannot check in the document if the document's modified date is earlier than the current date.

Default value: `false`

### annotation.allowCheckInAfterNewVersion

Whether or not to allow checking in a document after its new version has been created. This defaults to `false` so that a user cannot check in the document if the document's new version has been created.

Default value: `false`

### annotation.AllowMultipleOfflineReviewers

Whether or not to allow multiple users to make anntations to a document offline and check it in online. If set to `true`, multiple users are allowed to make annotations to a document while not having access to the internet and check in their document once they regain internet access.

Default value: `false`

### annotation.allowExternalReviewers

Whether or not to allow external users, who do not have user accounts, to make annotations to a document. This defaults to `false` so that external users are not allowed to make annotations to a document.

Default value: `false`

### annotation.keepAnnotationOnApproval

Whether or not to keep all annotations across different versions of a document. If set to `true`, all annotations across the versions of a document are preserved.

Default value:" `false`

### annotation.externalReviewerPrefix

The prefix for the external user's annotation's title. The external users are automatically tagged with a specific prefix in their titles. For example, if set to `[EXT]`, the title is `EXT`.

Default value: `[EXT]`

### annotation.preferNativeContent

Whether or not the native content type should override the ordering of `annotableTypes` when determining what content to load for annotation. If set to `true`, the native content type overrides the ordering of different types of objects that can be annotated, such as documents, media files, or images, when loading content for annotation.

Default value: `false`

### annotation.transformation.temp.file.directory

If set to blank, the Java temp directory is used to store temp annotation transformation files.

Default value: ``

### annotation.shouldUseOverlays

Whether or not overlays are applied to documents when loading them in OpenAnnotate. This defaults to `true` so that additional layers of content or annotations are added on top of a document whithout changing the original document.

Default value: `true`

### annotation.aevChatAuthor

The name of a chat author that is posting in the chat from OpenContent.

Default value: `AEV Chat Bot`

### annotation.defaultFontSize

The default font size for cases where default styling is not available against FreeText Annotation.

Default value: `12`

### annotation.defaulttextAlign

The default text alignment for cases where default styling is not available against FreeText Annotation.

Default value: `left`

### annotation.validDisplayableMimetypes

The list of displayable MIME types. If a MIME type cannot be identified, the system attempts to create a thumbnail or rendition.

The list of displayable MIME types:

* `application/pdf`
* `image/jpeg`
* `image/png`

### annotation.useContentFilepathForTransformations

Whether or not to bypass the repository and instead provide a file path for the transformation engine to transform content. This property can be used to expedite transformations in heavy load scenarios. Currently, it is only supported on Alfresco with non-collection scenarios.

> **Note:** External transformations (Optimus) are required to be deployed and accessible.

Default value: `false`

### annotation.defaultMimetype

The default MIME type for documents when a document does not have a MIME type specified.

Default value: `application/vnd.adobe.xfdf`

### annotation.collectionSortProp

The property determines the page order of document collections. Any date properties are treated as text strings that directly represent the date format. It also applies to the order of collection actions, such as `downloadcollectionasdocument` or `sendcombinedcollectionemail`.

This defaults to blank so that the collections are sorted in the order objects are obtained in.

Default value: ``

### annotation.auditDeletePages

Whether or not OpenContent should create an audit event when deleting document's pages through the `/deletePages` endpoint.

Default value: `false`

### annotation.auditRotatePages

Whether or not OpenContent should create an audit event when rotating document's pages through the `/modifyPDF` endpoint.

Default value: `false`

### annotation.auditReorderPages

Whether or not OpenContent should create an audit event when reordering document's pages through the `/modifyPDF` endpoint.

Default value: `false`

### annotation.mentionEmailSubjectTemplateName

The filename of email subject for offline mentioned emails. The `mentionEmailOfflineUsers` property must be set to `true`.

The default value: `mention-email-subject.ftl`

### annotation.mentionEmailBodyTemplateName

The filename of body templates for offline mentioned emails. The `mentionEmailOfflineUsers` property must be set to `true`.

The default value: `mention-email-body.ftl`

### redaction.redactedPageResolution

The resolution used after converting the redacted document pages into image format (to remove the text).

Default value: `400`

### redaction.redactedReasonTextColor

The color of the text that clarifies the purpose of a redaction, displayed on top of the redacted content. The default color is Blanched Almond.

Default value: `#FFEBCD`

### DocuSign properties

The following DocuSign properties must be overridden in `project-placeholders.properties`: 

> **Note:** For more information on these properties, see [AEV web application properties](###AEVwebapplicationproperties).

* `docusign.username=`
* `docusign.password=`
* `docusign.integratorKey=`
* `docusign.login.url=https://demo.docusign.net/restapi/v2/login_information`
* `docusign.hpi.dataPath=/hpi/docuSignData`
* `docusign.completed.version.policy=minor`

### AbstractWordDocumentTemplatingImpl.java properties

The following properties can be configured in the `AbstractWordDocumentTemplatingImpl.java` file:

* `data.merge.enabled=true`
* `data.merge.template.path=/hpi/dataMergeTemplates/`
* `hot.docs.subscriber.id=`
* `hot.docs.signing.key=`

### actpdf.lines.per.index.page

The number of lines per index page.

Default value: `47`

### actpdf.index.page.font

A monospaced font used for the index page. If set to blank, the default iText monospaced font is used. To use different font, set this property to the directory of the font's `.ttf` file and specify the number of characters per line in the `actpdf.index.page.chars.per.line` property.

Default value: ``

### actpdf.index.page.chars.per.line

The maximum number of characters, such as letters, numbers or spaces, that can be displayed on a single line. The number can differ depending on the selected font.

Default value: `72`

### actpdf.index.page.allow.multiline.entries

Whether or not long entries on the index page are shown in full, occupying multiple lines. This defaults to `false` so that each long entry is truncated and fits within a single line.
If set to `true`, long entries are shown in full, occupying multiple lines.

Default value: `false`

### ctrlprint.lines.per.index.page

The number of lines per index page.

Default value: `47`

### ctrlprint.index.page.font

A monospaced font used for the index page. If set to blank, the default iText monospaced font is used. To use different font, set this property to the directory of the font's `.ttf` file and specify the number of characters per line in the `ctrlprint.index.page.chars.per.line` property.

Default value: ``

### ctrlprint.index.page.chars.per.line

The maximum number of characters, such as letters, numbers or spaces, that can be displayed on a single line. The number can differ depending on the selected font.

Default value: ``

### ctrlprint.index.page.allow.multiline.entries

Whether or not long entries on the index page are shown in full, occupying multiple lines. This defaults to `false` so that each long entry is truncated and fits within a single line.
If set to `true`, long entries are shown in full, occupying multiple lines.

Default value: `false`

### annotation.incomingPDFCoordinatesStartAtTop

The position of bookmarks in a document. This defaults to `false` so that the position of bookmarks is aligned to the bottom of the page, which is the "0" position on the vertical axis. If set to `true`, the position of bookmarks is aligned to the top of the page, which is the "0" position on the vertical axis.

Default value: `false`

### managelegalhold.displayErrorDocProperty

The property of a document that failed to apply legal hold. For example, if set to `objectName`, all the names of documents that failed to apply legal hold are displayed. To list all the IDs of documents that failed to apply legal hold, set it to `objectID`.

Default value: `objectName`

### Path to `FFMpeg` and `FFProbe` executables

The following are paths to the FFMpeg and FFProbe executables:

* FFMPEG.path=/Program Files/FFmpeg/bin/ffmpeg
* FFPROBE.path =/Program Files/FFmpeg/bin/ffprobe

### zoom.jwtTokenExpiration

The number of seconds before the JSON Web Token expires.

Default value: `30`

### zoom.recordMeetings

Whether or not a Zoom meeting is automatically recoreded.

Default value: `false`

### zoom.createMeetingRecordingObject

Whether or not a related object for a recording, such as calendar event, meeting link, or participant list, is created every time a Zoom meeting is created.

Default value: `false`

### teams.createMeetingRecordingObject

Whether or not a related object for a recording, such as calendar event, meeting link, or participant list, is created every time a Teams meeting is created.

Default value: `false`

### getdocumentinfo.contentinfo.ehache.evict.on.error

Whether or not to evict items from the cache in case of errors in the `getDocumentInfo` call. This defaults to `true` so that cached data is removed when an error occurs in the `getDocumentInfo` call.

Default value: `true`

### annotation.typeName

The specific name of an object type bean for a document type to create when saving annotations to the repository.

Default value: `Annotation`

Example values:

* `Note`
* `AEV:Annotation`

### annotation.relationName

The name of a relation associating a document with its repository annotation object.

Default value: `{http://www.tsgrp.com/model/openannotate/1.0}annotates`

Example values:

* `annotates`
* `DM_ANNOTATE`

### annotation.annotationObjectNameParams

The name of a configured annotation object.

Default value: `%{UUID}%`

Example values:

* `%{docName}%%{title}%`
* `%{OBJECTID}%-note`
* `%{DOCNAME}%_%{DISPLAYNAME}%.xfdf`

### annotation.annotationPath

The repository path to save an annotation object to.

Default value: `/OpenAnnotate/Annotations/%{LOGINNAME}%`

Example values:

* `/Annotations`
* `/OpenAnnotate/Annotations`
* `/abc-administration/documentLibrary/OpenAnnotate/Annotations`
* `Annotations/%{DOCNAME}%_%{DISPLAYNAME}%.xfdf`
* `/def-administration/OpenAnnotate/Annotations`
* `/Resources/%{title}%`

### annotation.annotationOwnerProperty

The creator or owner property of each individual annotation for the Enterprise Viewer as a service.

Default value: `creator`

Example values:

* `annotation_owner_name`
* `creator_s`

### annotation.oaaaSBaseUrl

The base URL for the Enterprise Viewer as a service.

Default value: `http://openannotate.tsgrpaws.com:9080/OpenAnnotate/login/stored.htm`

### annotation.oaaasExtAuthBaseUrl

URL instance when using the Enterprise Viewer as a service with an external authentication to view files (not common).

Default value: `empty string`

Example value: `http://camden3:8080/OpenAnnotate/login/extAuthStored.htm`

### alfresco.annotation.hideXFDFFile

Whether or not to hide XML Forms Data Format (XFDF) files when creating a child association.

Default value: `true`

### alfresco.annotation.unindexXFDFFile

Whether or not to index XFDF files when creating a child association. This defaults to `false` so that XFDF files are indexed.

Default value: `false`

### alfresco.annotation.changeXFDFmodifier

Whether or not to change an XFDF file’s modifier when creating a child association. This defaults to `false` so that the modifier is managed by the system.

Default value: `false`

### annotation.enhancedColorMode

Whether or not to keep the front-end annotation color consistent with the color of downloaded annotations on a downloaded annotated PDF (regardless of an annotation owner). 
Set it to `false` to use red for the annotations of a user downloading an annotated PDF and blue for all other users' annotations.

Default: `true`

### annotation.collabEndpoint

The Enterprise Viewer collaboration or chat endpoint.

Example value: `https://dev.abc.pubdef.state.gm.us:3000`

### AEV video properties

#### annotation.videoScreenshotObjectNameParams

The name of a configured video screenshot object.

Default value: `%{UUID}%.jpeg`

Example values: `%{DOCNAME}%_screenshots/%{UUID}%.jpeg`

#### annotation.videoScreenshotPath

The repository path to save a video screenshot object to. If no default value is provided, then it is stored in the same folder as the video.

Default value: ``

Example value: `/Resources`

#### annotation.linkedVideoRelationRepoName

The name of a relation associating screenshots with their videos.

Default value: `oa:linkedVideo`

Example value: `oa_linked_video`

#### annotation.screenshotTimeMillisPropRepoName

The name of a property to store a video screenshot's time.

Default value: `oa:screenshotTimeMillis`

Example values: 

* `oa_screenshot_time_millis`
* `oa_screenshottimemillis`

#### annotation.screenshotWidthPropRepoName

The name of a property to store a video screenshot's width.

Default value: `oa:screenshotWidth`

Example values: 

* `oa_screenshot_width`

* `oa_screenshotwidth`

#### annotation.screenshotHeightPropRepoName

The name of a property to store a video screenshot's height.

Default value: ``

Example value: `oav_screenshot`

#### annotation.screenshotDocumentType

The name of a document or object type to store video screenshots as.

Default value: ``

Example value: `oav_screenshot`

#### annotation.screenshotPropsToSkipRepoName

The list of video property names or identifiers to skip. Each value separated with a comma.

Default value: ``

#### annotation.screenshotTag

The tag name for created screenshot properties for video annotations (optional).

Default value: ``

Example value: `Images`