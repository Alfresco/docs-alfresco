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

## OpenContent properties

OpenContent properties related to AEV are located in the `universal-defaults.properties` file. Any of these properties can be overridden if desired in the `opencontent-override-placeholders.properties` file.

### keepAnnotationOnApproval

If set to `true`, when updating a document to a new version, all annotations are preserved across these versions. If set to `false` or overridden, when updating a document to a new version, all annotations are lost. 

> **Note:** This property should not be set to `true` in regulated environments where all annotations should be stripped prior to approval.

## Default properties

The following are the configurable properties for Enterprise Viewer:

### serviceAccountUsername

This is the service account user name to use when logging in using the "stored" endpoint. The stored endpoint allows you to log in using the configured service account and provide a display name (`displayName`) to identify the user you are logging in for.

> **Note:**  This property must be overridden if you're using the "stored" endpoint.

Default value: `""`

### serviceAccountPassword

This is the service account password to use when logging in using the "stored" endpoint. The stored endpoint allows you to log in using the configured service account and provide a display name to identify the user you are logging in for.

> **Note:** This property must be overridden if you're using the "stored" endpoint.

Default value: `""`

### isServiceAccountPasswordEncrypted

Set to `true` if the password for the service account for the stored login endpoint is encrypted, or `false` if otherwise.

Default value: `false`

### serviceAccountDocbase

The docbase the service account should login to.

Default value: `""`

### emailInviteUrl

This URL is used in the invitation to collaborate email. If the `[docId]` placeholder is specified, it is replaced by the `objectId` of the document being viewed when the invitation is sent.

Default value: `http://localhost:8080/OpenAnnotate/viewer.htm?docId=[docId]&presenterMode=true&mode=readOnly`

### ocRestEndpointAddress

This URL is the REST endpoint for the running instance of OpenContent. If Enterprise Viewer is being used in a load balancing setup and the instances of Enterprise Viewer and OpenContent are on the same server, this property should be the **non-load balanced url**, to ensure that the requests to OpenContent are always directed to the same OpenContent instance.

Default value: `http://localhost:8080/OpenContent/rest`

### clientRequestUrl

The URL that client requests from Enterprise Viewer to OpenContent should be made to. Generally, this only changes if OpenContent has a different REST root, `/alfresco/OpenContent` for example used when OC is an Alfresco subsystem.

Default value: `/OpenContent/rest`

### collaborationEndpoint

This URL is the endpoint on which the web socket server is listening for a connection. This should be used when Enterprise Viewer is run in collaboration mode. If collaboration mode is enabled but this property is not specified, collaboration mode will not work properly.

For load balanced setups, there should only be a single collaboration server. So this should point to the **single, non-load balanced URL**.

Default value: `http://localhost:3000`

### collaborationModeEnabled

Whether or not Enterprise Viewer is being run in collaboration mode to take advantage of features like real-time annotations and chat functionality.

Default value: `false`

### forceNonModalNotifications

Whether or not Enterprise Viewer forces non-modal notifications.

Default value: `true`

### singleAnnotationDialog

Set to `true` if only one annotation dialog should open at a time, or `false` if one or more annotation dialogs should open.

Default value: `true`

### allowExternalReviewers

When set to `true` annotations from third party applications for both users that do not have an account in Alfresco and users that have corresponding accounts in Alfresco should be accepted. When set to `false`, only annotations from users with a corresponding Alfresco account will be accepted. 

In order to have `allowExternalReviewers` set to `true`, a special license setting must be set in your AEV license by the Hyland License Team with the property `hasExternalOAUsers: true`.

Default value: `false`

### AllowMultipleOfflineReviewers

When set to `false` offline annotations will be owned by the user that checked the annotations in. No matter which user is set on the offline annotation, the annotation will always be displayed as being added by the user who checked in the document.

Default value: `true`

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

### oaLogoPath

The path for the logo to display at the top left corner on the toolbar in the Enterprise Viewer interface. Useful to override for different logos. This path is relative to the `src/main/webapp` directory.

Default value: `images/logos`

### oaIconPath

The path for the icons to display in the Enterprise Viewer interface. This path is relative to the `src/main/webapp` directory.

Default value: `images/icons`

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

Default value: `1`

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

Default value: `bold,italic`

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

### initialDrawingTool

A comma separated list of drawing buttons that should be selected when Enterprise Viewer loads. The first valid button on the list is selected when Enterprise Viewer first loads.

Default value: `drawRedaction, signature, mouse`

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
chat,userJoined,userLeft,serverConnection,checkInAnnotations,checkInAnnotationsFailed,burnInRedactionFailed,checkinAnnotationsFinished,pageSelectMode,welcomeBackPage,save,loadedAnnotations,saveFinished,copyPaste,copyPasteNotReady,tooLargeForThumbnails,closeSave,closeCopyPaste,pageRangeInvalid,logstashFailed,portfolioContainsNonPdf,docHasAnnotations,afterPageLoad,textLocationDataFailed,enterSectioningMode,sectionNameInvalid,displayDocumentListFailed
```

### slideViewerTileDirectoryRoot

A root path for locating slide viewer resources, such as JSON files that define slide properties and tile definition files (`.dzi`) used for rendering tiled images. It ensures that resources are correctly located and fetched based on the base directory path.

Default value: `http://localhost:8080/OpenAnnotate/images/seadragon/`

### sessionCookieName

The name of the session cookie which is used to track sticky sessions in load balanced environments. For load balanced environments, sticky sessions are required to ensure Enterprise Viewer always hits the correct OpenContent with all its internal requests.

Default value: `JSESSIONID`

### checkServletRequestForSessionId

Whether or not a session ID should be checked in the servlet request. If set to `true` and a valid session ID is found in the servlet request, the session ID is appended to the endpoint URL.

Default value: `true`

### checkServletCookieForSessionId

Set to `true` if a check should be made for the sessionId on a cookie and append it to the requests to OC, or `false` otherwise. This sessionId is used to maintain sticky sessions in load-balanced environments. If this property and `checkServletRequestForSessionId` are both set, the sessionId set on the Servlet request overrides any sessionId set on the cookie.

Default value: `true`

### rerenderPageOnResize

Set to `true` to send new requests to OC every time you zoom in or out on a page, or `false` otherwise.

Default value: `true`

### quickSearch

Set to `true` to allow the user to immediately search selected text when  Ctrl+F is pressed, or `false` otherwise.

Default value: `false`

### numberOfPagesForLargeDocuments

The number of pages that are considered as a "large" document.

* If the value is `0`, it ignores considering documents with many pages as a large document.
* If a document has more pages than the value here, text search data isn't loaded initially, and thumbnails are disabled.
* Text search data can still be manually loaded by the user later, after answering `yes` to a modal dialog box informing them of the delay.

Default value: `99`

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

### showSmallActionName

Set to `true` if the actions dropdown shown at small resolutions should reflected the currently selected tool, or `false` otherwise.

Default value: `true`

### searchPagesPerRequest

The number of document pages to fetch search data for, per request. This is a performance-only property.

Default value: `200`

### textDataPagesPerRequest

The number of document pages to fetch text-select location data for, per request. This is a performance-only property.

Default value: `200`

### enableMacroMetadataFetching

> **Note: UNIMPLEMENTED - DO NOT USE -**

Gets all PDF MetaData (wordmaps, text select, bookmarks, etc.) in a single request if set to `true`. Otherwise each one is fetched via its own server request.

Default value: `false`

### macroMetadataFetchingBatchSize

> **Note: UNIMPLEMENTED - DO NOT USE -**

The number of pages to fetch ALL PDF metadata for per request.

Requires `enableMacroMetadataFetching` to be set to `true`, or otherwise does nothing.

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

### alertDocumentHasAnnotations

Set to `true` if the user is alerted that the current document in OpenViewer has annotations.

Default value: `true`

### keepToolSelectedDefault

Whether the keep tool selected feature should be on by default.

Default value: `false`

### annotationTypesToShowDialogForWithKeepToolSelected

Which annotation type(s) dialogs to show when the annotation is created. Each value must be separated with a comma.

Different annotation types:

```text
Line,Oval,Rectangle,Highlight,Cross-Out,Inserted Text,Replacement Text,Reply,Sticky Note,Signature,Approved Stamp,Accept Stamp,Reject Stamp,Reviewed Stamp,PageSizedCheckmark Stamp,Status,Freetext,File Attachment,Free Draw,Redaction
```

Default value: `""`

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

For more information on configuring overlays, see the `oaSecureViewing` property in [Configure Overlays]({%link enterprise-viewer/latest/config/overlay.md%}).

Default value: `false`

### enableAEVTOverlays

Whether or not to enable functionality for AEVT (Optimus Transformations) overlays. When `true` (and AEVT is enabled), overlays are applied where configured.

For more information on configuring overlays, see [Configure Overlays]({%link enterprise-viewer/latest/config/overlay.md%}). 

Default value: `false`

### zoomClientID

Client ID property for sending a Zoom authorization call that eventually sends a request that creates a meeting. Blank by default, as you'll need to create a Zoom app to get this value and use this feature.

Default value: ``

### clientKey

The optional OC client key to be used in `OAUtil.oaRestTemplateGet/oaRestTemplatePost` calls. This key, if configured, sets as a request header and eventually used OC side for some SSO implementations.

Default value: ``

## OpenContent - default properties

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
