---
title: Alfresco Enterprise Viewer Configuration Files
---

When installing and setting up Alfresco Enterprise Viewer, formerly OpenAnnotate, it's important to understand how configuration settings work.

### Spring Properties Files

### AEV Web Application Properties

Spring loads properties files into the system in a specific order to allow overriding.  Properties are loaded in the following order (last wins):

1. `defaults.properties` (sensible defaults for every property)
1. `project-placeholders.properties` (project specific properties)
1. `openannotate-override-placeholders.properties` (Optional. Tomcat Specific properties)
1. `override-placeholders.properties` (environment specific properties)

In general, use the `openannotate-override-placeholders.properties` to override any of the default properties.  This file is typically placed in `<TOMCAT_HOME>/shared/classes` folder, and will override all properties located in the OpenAnnotate.war.  Properties defined here can still be overridden by `override-placeholders.properties`, but if for example server urls are all that needs to be defined, these can be left in `openannotate-override-placeholders.properties`, allowing WARs to be promoted through various environments without needing to be re-built / configured.

### OpenContent Properties

OpenContent properties related to AEV are located in the `universal-defaults.properties` file.  Any of these properties can be overridden if desired in the `opencontent-override-placeholders.properties` file.  See the [OpenContent Configuration Files](https://github.com/tsgrp/OpenContent/wiki/OC-Configuration-Files) page for more information.  

### Default Properties

The following are the configurable properties for Alfresco Enterprise Viewer:

#### serviceAccountUsername

This is the service account username to use when logging in using the "stored" endpoint. The stored endpoint allows you to log in using the configured service account and provide a displayName to identify the user you are logging in for. **NOTE: This property must be overridden if you're using the "stored" endpoint.**

Default Value: `""`

#### serviceAccountPassword

This is the service account password to use when logging in using the "stored" endpoint. The stored endpoint allows you to log in using the configured service account and provide a displayName to identify the user you are logging in for. **NOTE: This property must be overridden if you're using the "stored" endpoint.**

Default Value: `""`

#### isServiceAccountPasswordEncrypted

True if the password for the service account for the stored login endpoint is encrypted, false otherwise.

Default Value: `false`

#### serviceAccountDocbase

The docbase the service account should login to

Default Value: `""`

#### emailInviteUrl

This URL is the URL to use in the invitation to collaborate email. If the `[docId]` placeholder is specified, it will be replaced by the `objectId` of the document being viewed when the invitation is sent.

Default Value: `http://localhost:8080/OpenAnnotate/viewer.htm?docId=[docId]&presenterMode=true&mode=readOnly`

#### ocRestEndpointAddress

This URL is the REST endpoint for the running instance of OpenContent. If Alfresco Enterprise Viewer is being used in a load balancing setup and the instances of Alfresco Enterprise Viewer and OpenContent are on the same server, this property should be the **non-load balanced url**, to ensure that the requests to OpenContent are always directed to the same OpenContent instance.

Default Value: `http://localhost:8080/OpenContent/rest`

#### clientRequestUrl

The URL that client requests from Alfresco Enterprise Viewer to OpenContent should be made to. This generally will only be change if OpenContent has a different rest root, `/alfresco/OpenContent` for example used when OC is an Alfresco subsystem.

Default Value: `/OpenContent/rest`

#### collaborationEndpoint

This URL is the endpoint on which the web socket server is listening for a connection. This should be used when Alfresco Enterprise Viewer is being run in collaboration mode. If collaboration mode is enabled but this property is not specified, collaboration mode will not work properly.
For load balanced setups, there should only be a single collaboration server. So this should point to the **single, non-load balanced url**.

Default Value: `http://localhost:3000`

#### collaborationModeEnabled

This property represents whether or not Alfresco Enterprise Viewer is being run in collaboration mode to take advantage of features like real-time annotations and chat functionality.

Default Value: `false`

#### forceNonModalNotifications

This property represents whether or not Alfresco Enterprise Viewer will force non modal notifications.

Default Value: `true`

#### singleAnnotationDialog

True if only ever one annotation dialog should be open at a time, false otherwise.

Default Value: `true`

#### excludeEmbeddedAnnotations

True if annotations embedded on the pdf should not be fetched, false otherwise.

Default Value: `true`

#### serverAnnotationsEditable

True if server annotations can be edited. Setting this to false prevents users from editing their annotations after their session ends.

Default value: `true`

#### sidebarDefaultOpen

This property represents whether or not Alfresco Enterprise Viewer  should start up with its sidebar (which contains other modules like summary, search and collaboration) showing.

Default Value: `true`

#### helpUrl

This URL points to a "help" website for using Alfresco Enterprise Viewer. **This is not recommended to be overridden.**

Default Value: `http://www.tsgrp.com/Open_Source/OpenAnnotate/open_annotate.jsp`

#### printSummaryBaseType

This is the base type to use when fetching the attributes for the print summary window. If the attributes specified are not attributes on this type, Alfresco Enterprise Viewer will fail to initialize properly.

Default Value: `Document`

#### oaLogoPath

The path for the logo to display at the top left corner on the toolbar in the Alfresco Enterprise Viewer interface. Useful to override for different client logos. This path is relative to the `src/main/webapp` directory.

Default Value: `images/logos`

#### oaIconPath

The path for the icons to display in the Alfresco Enterprise Viewer interface. This path is relative to the `src/main/webapp` directory.

Default Value: `images/icons`

#### targetMimetype

The target mimetype to use when transforming documents. Defaulted to PNG, but support JPG (image/jpeg) as well.

Default Value: `image/png`

#### imageFullResolution

The final resolution to use when transforming image pages to PNG or JPG. Lower resolutions may be loaded first.

Default Value: `64`

#### imageMinimumResolution

The minimum resolution to load the image when progressively loading the image

Default Value: `16`

#### pdfFullResolution

The final resolution to use when transforming PDF pages to PNG or JPG. Lower resolutions may be loaded first.

Default Value: `244`

#### pdfMinimumResolution

The minimum resolution to load the image when progressively loading the image

Default Value: `64`

#### progressiveReloadSteps

The number of reloads to make between the minimum resolution image, and the full resolution.

Default Value: `1`

#### pageZoom

The initial page zoom to use when loading a document. The allowed values are either `fitHeight` or `fitWidth`. Fit height will adjust the document so the entire height is visible. Fit width will adjust the document so the entire width is visible.

Default Value: `fitWidth`

#### numPreloadPages

The number of pages to preload. Preloading works by making requests to fetch pages close to the current page the user is viewing in order to cache the image, which results in shorter load times when the page is changed. The allowed values are the following:

* `0`: This tells AEV to preload all the pages of the document
* `-1`: This tells AEV to not use preloading at all
* Any other positive integer: This integer specifies the total number of pages to preload - half will be pages forward from the current page and the other half will be behind the current page. **The configured value should therefore be a multiple of 2. Because the number of pages to preload is divided in half, specifying `1` and `2` accomplishes the same thing.** Once the number of preloaded pages equals the configured value, no more pages will be preloaded until the page is changed.

Default Value: `10`

#### enhancedColorMode

This flag controls the colors that are displayed and allowed to be chosen for annotations. If set to `true` there is no limit on the color of created annotations and the downloaded annotations will maintain their colors. If set to `false` the user may not choose different colors for annotations and instead, all of the user's annotations will be red (or yellow if it's a highlight) and all other annotations will be blue (the same is true for the downloaded annotated PDF).

Default Value: `true`

#### dateFormat

The format to use when displaying dates in annotation dialog boxes. The formatting uses the open source library Moment.js, so any formats found on the Moment.js [formatting docs](http://momentjs.com/docs/#/displaying/format/) may be used.

Default Value: `MM/DD/YYYY`

#### enabledActions & Modes

Configuring what Buttons / Actions appear in Alfresco Enterprise Viewer is a little more in-depth than the average config option.  See
[Configuring OpenAnnotate Actions Buttons and Modes](https://github.com/tsgrp/OpenAnnotate/wiki/Configuring-OpenAnnotate-Actions-Buttons-and-Modes) for more details.

#### quillEnabledButtons

A comma separated list of buttons that are visible in the quill toolbar. Currently, only Italic and Bold are supported. All currently supported quill buttons are bold, italic, and underline.

Default Value: `bold,italic`

#### leftSidebarModules

A comma separated list of views to be enabled in the left sidebar.

Default Value: `bookmarks,attachedDocs,thumbnails,sections,documentList`

#### rightSidebarModules

A comma separated list of views to be enabled in the right sidebar.

Default Value: `summary,search,participants,suggestedRedactions`

#### redactionType

What type of redaction should be made when entering redaction mode via the dropdown.
Possible values include `redactInPlace`, `redactedAsCopy`, and `unredactedAsCopy`

Default Value: `redactInPlace`

#### initialDrawingTool

A comma separated list of drawing buttons that should be selected when Alfresco Enterprise Viewer loads.  The first valid button on the list will be selected when Alfresco Enterprise Viewer first loads.

Default Value: `drawRedaction, signature, mouse`

#### autosaveInterval

The number of milliseconds Alfresco Enterprise Viewer will wait between each autosave.

* `0`: This tells AEV to NOT autosave.
* Any other positive integer: The number of milliseconds Alfresco Enterprise Viewer will wait between each autosave.  This should not be set to a number below 5000 - 10000 (five to ten seconds), as it could cause undefined behavior.

Default Value: `60000`

#### autosaveBeforeExit

True if Alfresco Enterprise Viewer should automatically save before exiting, false otherwise.

Default Value: `true`

#### enabledPopupNotifications

This is the list of the Collaboration mode notifications that are enabled and will therefore appear on the on internal popups when the Participants tab is close. To disable a type of notification, remove it from the list of notification in this property.  The default is that all notification are enabled.

Default Value: `chat,userJoined,userLeft,serverConnection,checkInAnnotations,checkInAnnotationsFailed,burnInRedactionFailed,checkinAnnotationsFinished,pageSelectMode,welcomeBackPage,save,loadedAnnotations,saveFinished,copyPaste,copyPasteNotReady,tooLargeForThumbnails,closeSave,closeCopyPaste,pageRangeInvalid,logstashFailed,portfolioContainsNonPdf,docHasAnnotations,afterPageLoad,textLocationDataFailed,enterSectioningMode,sectionNameInvalid,displayDocumentListFailed`

#### slideViewerTileDirectoryRoot

This is the root directory on the server filesystem where the slide viewer "tiles" should be served from. It is commonly a URL that is redirected through Apache to request files from the server. For more information on Slide viewer, see [Using Slide Viewer with OpenAnnotate](https://github.com/tsgrp/OpenAnnotate/wiki/Using-Slide-Viewer-with-OpenAnnotate).

Default Value: `http://localhost:8080/OpenAnnotate/images/seadragon/`

#### sessionCookieName

The name of the session cookie which is used to track sticky sessions in load balanced environments.  For load balanced environments, sticky sessions are required to ensure Alfresco Enterprise Viewer always hits the correct correct OpenContent with all its internal requests.

Default Value: `JSESSIONID`

#### checkServletRequestForSessionId

True if we should check for the sessionId on the Servlet requests from Alfresco Enterprise Viewer's frontend and append it to the requests to OC, false otherwise.  This sessionId is used to maintain sticky sessions in load balanced environment.  If both this property and checkServletCookieForSessionId are both set, the sessionId set on the Servlet request will override any sessionId set on the cookie.

Default Value: `true`

#### checkServletCookieForSessionId

True if we should check for the sessionId on a cookie and append it to the requests to OC, false otherwise.  This sessionId is used to maintain sticky sessions in load balanced environment.  If both this property and checkServletRequestForSessionId are both set, the sessionId set on the Servlet request will override any sessionId set on the cookie.

Default Value: `true`

#### snapThreshold

This value is the % of a highlight must overlap a word for it to be detected as a word.  Highlights will snap to the detected words and get the underlying text.  If no highlight snapping is desired, this should be set to a value over 100% (i.e. < 1.0).  The gifs below show the results of different values of snapThreshold:

10% ( =0.1)

![Highlight Snap Threshold 10%](http://i.imgur.com/c8AhYLA.gif)

40% ( =0.4)

![Highlight Snap Threshold 40%](http://i.imgur.com/JhNegB9.gif)

100% or more (greater than 1.0)

![Highlight Snap Threshold 100% or more (greater than 1.0)](http://i.imgur.com/N7ySDlT.gif)

Default Value: `0.15`

#### rerenderPageOnResize

True if we should send new requests to OC every time we zoom in or out on a page. False otherwise.

Default value: `true`

#### quickSearch

True if we want to allow the user to immediately search selected text when a user presses Ctrl+F. False otherwise.

Default value: `false`

#### numberOfPagesForLargeDocuments

The number of pages needed to be considered a "large" document. If the value is 0, there is no bounds for large documents. If a document has more pages than the value here, text search data will not be loaded initially, and thumbnails will be disabled.  Text Search data can still be manually loaded by the user later, after they answer 'yes' to a modal informing them of the delay.

Default value: `200`

#### sizeOfLargeFiles

The size (in bytes) needed to be considered a "large" document. If a document's size is bigger than the value here, a user will be prompted with a modal to confirm calls that require a lot of resources to limit memory usage.

Default value: `104857600`(100MB)

#### maxDocumentSize

The max size of a document (in bytes) that we allow to be loaded. If the value is 0, there is no bounds for large documents. Otherwise, if a document's size is bigger than the value here, a modal will appear to let the user know that their document is too large to open.

Default value: `2147483648`(2GB)

#### enableCommentBox

True if the comment box is enabled in the annotation dialog box, false otherwise.

Default value: `true`

#### enablePicklist

True if picklist features are enabled for Alfresco Enterprise Viewer, false otherwise.  If picklists are enabled, picklistUrl MUST have a parameter to work.

NOTE: Picklists are only used for annotation dialog boxes at this point in time.

Default value: `false`

#### enableStatuses

True if annotations can be statused and have previous statuses appear.

Default value: 'true'

#### showSmallActionName

True if the actions dropdown shown at small resolutions should reflected the currently selected tool, false otherwise.

Default value: 'true'

#### asyncPicklist

True if picklists used for Alfresco Enterprise Viewer are asynchronous, false otherwise.

Default value: `false`

#### picklistUrl

The picklist information needed to retrieve picklist data. This will either be a picklist name to reference a configured picklist in OpenContent or this will be a URL to retrieve picklist data from an external source.

Default value: `""`

#### externalPicklist

True if the picklist we are using is from an external source, false otherwise.

Default value: `false`

#### searchPagesPerRequest

The number of pages we fetch search data for in a single request.

Default value: `200`

#### textDataPagesPerRequest

The number of pages we fetch text select data for in a single request.

Default value: `200`

#### enableMacroMetadataFetching

>**NOTE: UNIMPLEMENTED - DO NOT USE -**

Gets all PDF MetaData (wordmaps, text select, bookmarks, etc.) in a sinlge request if set to true.  Otherwise each will be fetched via its own server request.

Default value: `false`

#### macroMetadataFetchingBatchSize

>**NOTE: UNIMPLEMENTED - DO NOT USE -**

Number of pages to fetch ALL pdf metadata for  per request.  REQUIRES 'enableMacroMetadataFetching' to be set to 'true', or does nothing.

Default value: `200`

#### maxUserPageCookieSize

The maximum number of user page cookie objects to store.

Default value: `50`

#### annotationSummaryDefaultSort

The xfdf fields to sort the annotation summaries on, ordered from most important to least important.

Default value: `page,!p4`

#### warnBeforeSaveModifications

Whether or not the user wants a modal to appear asking them to confirm that they want to save page modifications when in edit mode.

Default value: `false`

#### controlledPrint

Whether or not we want a controlled print to be enabled. Controlled print only allows certain people to print a document, and controls the number of times it can be printed.

Default value: `false`

#### thumbnailResolution

The minimum resolution to load the thumbnail images for the document.

Default value: `32`

#### initialThumbnailLoad

Amount of thumbnails to initially load.

Default value: `25`

#### newVersionOnModification

True if the a new version of the document will be created when the document is modified. if false, the document in the repository will remain the same version when modified

Default value: `true`

#### majorVersionOnModification

True if the a major version of the document will be created when the document is modified. If false, the document in the repository will default to a minor version when modified.

Default value: `false`

#### alertDocumentHasAnnotations

True if the user will be alerted that the current document in OpenViewer has annotations.

Default value: `true`

#### keepToolSelectedDefault

Whether the keep tool selected feature should be on by default.

Default value: `false`

#### annotationTypesToShowDialogForWithKeepToolSelected

Which annotation type(s) dialogs that we wish to show when the annotation is created.

Different annotation types:
Line,Oval,Rectangle,Highlight,Cross-Out,Inserted Text,Replacement Text,Reply,Sticky Note,Signature,Approved Stamp,Accept Stamp,Reject Stamp,Reviewed Stamp,PageSizedCheckmark Stamp,Status,Freetext,File Attachment,Free Draw,Redaction,Signature

Default value: `""`

#### thumbnailBatchSize

The number of thumbnails to load for every subsequent batch after the first.

Default value: `200`

#### thumbnailWidth

The width of the sidebar thumbnail previews.

Default value: `150`

#### configuredLocales

All locales we currently have configured. German is actually "half" configured currently. We have a localization json file, but are missing the bundle.

Default value: `en,fr,de`

#### defaultLocale

The default locale we will go to if the user has no configured locales. This value must be in the configured locales.

Default value: `en`

#### checkRenditioningDelay

The default time between checks for whether a document has a rendition

Default value: `10000`

#### loadAnnotationsWithDocInfo

Load annotations simultaneous with document info. Do not let the user into the document until the annotations are loaded

Default value: `false`

#### displayAnnotationModifyDate

Display an annotations modified date instead of its creation date throughout AEV

Default value: `false`

#### minPagesToDefafultSectionModeOn

The minimum number of pages to default into sectionining mode. Override this to 0 to never default into sectioning mode.

Default value: `10`

#### determineSectionsFromProperty

Whether we want to determine sections automatically from a property ("false" by default, should be the property name if you want to use it).

Default value: `false`

#### saveSectionsAsBookmarks

Whether or not to save sections as bookmarks. Overriding this to false will ONLY save the page reordering and rotating when done sectioning.

Default value: `true`

#### enablePageObfuscation

Whether or not OpenContent should Obfuscate pages when transforming them. This is to prevent users from viewing a secure document through the network calls

Default value: `false`

#### enableSecureViewingOverlay

Whether or not we should apply the secure viewing overlay to pages when viewing them. This overlay will show the display name of the user viewing. Displays on the document the current username and the Date when they were viewing it

Default value: `false`

#### enableAEVTOverlays

Whether or not to enable functionality for AEVT (Optimus Transformations) overlays. Defaulting to false no functionality added. When true, additional parameters are passed on the MAV and sent on the transform and getThumbnails requests providing necessary properties to OpenOverlay.

Default value: `false`

#### zoomClientID

Client ID property for sending off a zoom authorization call that will eventually send off a request that creates a meeting. Defaulting to nothing as you will need to create a zoom app to get this value and use this feature

Default value: ``

#### clientKey

The optional OC client key to be used in OAUtil.oaRestTemplateGet/oaRestTemplatePost calls.  This key, if configured, will be set as a request header and eventually used OC side for some SSO implementations

Default value: ``

#### aevChatAuthor

The chat author name that will be posting in the chat from OpenContent

Default value: `AEV Chat Bot`

A fully qualified Rest URL for client side use

Default value: `http://localhost:8080/OpenContent/rest`

### OpenContent - Default Properties

#### license.doSendWarningEmail

Whether or not to send a warning email when the current OpenContent license is approaching an invalid state (i.e - expiring or almost at the max user or group user limit)

Default value: `true`

#### license.expiringSoonCounter

The amount of days before the license expires in which OpenContent will set a warning state for the active license.

Default value: `30`

#### license.systemUserLimitCounter

Used with a user based license - this property configures how close to the maximum allowed users the system can get before setting a warning state on the active license.

Default value: `25`

#### license.groupUserLimitCounter

Used with a group based license - this property configures how close to the maximum allowed users the license group(s) can get before setting a warning state on the active license.

Default value: `5`

#### license.warning.email.recipients

When in a warning state and configured to do so - OpenContent will send a license warning email to all of the recipients listed in this property.

Default value: ``

#### fail.loud.on.errored.embedded.annotations

Fail loudly on errors that occur with embedded annotations. This is
defaulted to true so that the user will be notified of errors loading annotations.
This is an experimental feature. If set to false, users may be able to load, download, print
previously erroring annotated pdfs but some annotations may be missing.

Default value: `true`
