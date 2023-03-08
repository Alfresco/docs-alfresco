---
title: Configuring AEV actions and modes
---

To modify what actions and modes appear in the Alfresco Enterprise Viewer, certain properties can be edited in the `openannotate-override-placeholders.properties` file. This file would have been deployed to the tomcat classpath as a part of the install process. Note that in order for changes to this file to take effect, the tomcat will need to be restarted after the changes are made.  

Some important configuration features to point out when it comes to configuring AEV

1. You can configure what buttons (actions) should appear in each mode individually, as well as the order they appear in the toolbar
1. You can add Action types to whitelist, rather than listing each button individually
1. You can configure where actions appear and what they look like  
​
This is a list of the properties you can override in the `openannotate-override-placeholders.properties` to change what actions and modes appear in each AEV mode:

* enabledAnnotationActions
* enabledRedactionActions
* enabledIndexerActions
* enabledEditActions
* enabledPageSelectActions
* enabledSignatureActions
* enabledOpenViewerActions
* enabledOpenViewerWithTextActions

Additional detail about each of these properties and their default values are listed in the next section.

## Default AEV enabled actions

The following dives into each of these properties and documents the default values for the AEV actions enabled in each mode.

### enabledAnnotationActions

The Actions enabled in annotation mode.

Default Value: `(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),
(t:Mode),d(t:Download,--dropdownLabel-Downloads,--dropdownIcon-download-alt),(t:AnnotationManipulation),
(t:Misc),d(t:Text,--dropdownLabel-Text Annotations,--dropdownIcon-text-background),
d(t:Color,--dropdownLabel-Color Picker,--dropdownIcon-OA-Color),
d(drawLine,drawArrow,drawEllipse,drawRectangle,drawBox,textbox,freeDraw,--dropdownLabel-Drawing Tools,--dropdownIcon-pencil),
d(approvedStamp,reviewedStamp,acceptStamp,rejectStamp,pageSizedCheckmarkStamp,--dropdownLabel-Stamps,--dropdownIcon-OA-Stamp),(t:Compare),
(save,--isSmallScreen),(stickyNote,--isSmallScreen),(highlight,--isSmallScreen),(t:Help),(t:Collaboration,t:Summary,--sidebar)`

### enabledRedactionActions

The Actions enabled in redaction mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(save,--showAtAllSizes),(mouse),(drawRedaction,textRedaction,--showAtAllSizes),(t:Help)`

### enabledIndexerActions

The Actions enabled in indexing mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(selectText),(t:Help)`

### enabledEditActions

The Actions enabled in document editing mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(save,--showAtAllSizes),(t:DocumentManipulation,--showAtAllSizes),(sectionPdfDocument,--showAtAllSizes),(t:Help)`

### enabledPageSelectActions

The Actions enabled in document page selecting mode.  No additional actions are configured by default
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Help)`
​

### enabledSignatureActions

The Actions enabled in document signing mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(save,--showAtAllSizes),(mouse),(signature),(t:Help)`
​

### enabledOpenViewerActions

The Actions enabled in the quick document viewing mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(printAnnotatedPdf),(t:DocumentManipulation,--showAtAllSizes),(mouse),(t:Help)`

### enabledOpenViewerWithTextActions

The Actions enabled in the quick document viewing mode with text search and select capabilities added.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(selectText),
(t:Mode),(t:PageEntry),(printAnnotatedPdf),(t:DocumentManipulation,--showAtAllSizes),(mouse),(t:Search,--sidebar)`

## Overriding enabled actions

Overriding any of the properties listed in the last section in the `openannotate-override-placeholders.properties` with a value different than the default would change the actions displayed in AEV for that mode.

### Overriding enabled actions using ActionIds

To add a particular action to a specific mode in AEV, the actionId for that action can be added to the comma separated list for the mode specific property.

For example, if we wanted to add the `Print Annotated PDF` Action to `Signature Mode` I would add the following to the `openannotate-override-placeholders.properties`:

`enabledSignatureActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Mode),(save,--showAtAllSizes),(mouse),(signature),(t:Help),(printAnnotatedPdf)`

 This would then override the default value of `enabledSignatureActions` which is:

`enabledSignatureActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Mode),(save,--showAtAllSizes),(mouse),(signature),(t:Help)`

 And add the `printAnnotatedPdf` action to this mode.

### Overriding enabled actions using ActionTypes

AEV action types are predefined groups of actions made for faster/easier (though less granular) configuration of AEV.

Notice that in the default values listed in the section above, certain values are prefixed with "t:" (example: `(t:Navigation)`) while others are listed without a prefix (example: `(selectText)`).

Those with the prefix signify that we are configuring an entire action type (group of actions) while those without the prefix signify that what we are configuring is a specific actionId for one singular action.

See the full list and description of these Action Types below:

```json
/**
 * Action which change the mode Alfresco Enterprise Viewer is currently in.
 */
MODE: "Mode",

```​json
Actions that belong to this type: `annotationMode`, `redactMode`, `editMode`, `signatureMode`
​
```

```json
/**
 * Actions which require the document being viewed to be a  PDF to function.
 */
PDF: "Pdf",
```

```json​
Actions that belong to this type: `drawRedaction`, `signature`, `rotatePageClockwise`, `rotatePageCounterClockwise`, `selectText`, `strikeout`, `insertText`, `replaceText`, `annotatedPdf`, `unannotatedPdf`, `offlineAnnotatedPdf`, `extractPdfPages`, `printAnnotatedPdf`, `controlledPrintAnnotatedPdf`, `checkinOfflineAnnotatedPdf`
```

```json
/**
 * Actions which require the document to have multiple pages.
 */
MULTI_PAGE: "MultiPage"
```

```json
Actions that belong to this type: `extractPdfPages`, `extractPdfAndSavePages`, `prunePdf`, `deletePdfPages`, `nextPage`, `prevPage`, `sectionPdfDocument`
```

```json
/**
 * Actions related to navigating the document.
 */
NAVIGATION: "Navigation",
```

```json
Actions that belong to this type: `zoomIn`, `zoomOut`, `fitWidth`, `fitHeight`, `nextPage`, `prevPage`
​```

```json
/**
 * Actions related to changing the zoom level of the document being viewed.
 */
ZOOM: "Zoom",
```

```json
Actions that belong to this type: `zoomIn`, `zoomOut`, `fitWidth`, `fitHeight`
​```

```json
/**
 * Actions that once selected, remain active until the tool is used.  Currently these are all actions for 
 * creating annotations or annotation-like objects.  
 */
TOOL: "Tool",
```

```json
Actions that belong to this type: `mouse`, `drawRedaction`, `signature`, `stickyNote`, `drawLine`, `drawArrow`, `drawRectangle`, `textbox`, `drawEllipse`, `freeDraw`, `selectText`, `highlight`, `strikeout`, `insertText`, `replaceText`, `acceptStamp`, `approvedStamp`, `pageSizedCheckmarkStamp`, `rejectStamp`, `reviewedStamp`
​
```

```json
/**
 * Actions that once selected, remain active until the they are selected again.  Toggle actions might also
 * have different behaviors between when they are selected and de-selected.
 */
TOGGLE: "Toggle",
```

```json
Actions that belong to this type: `toggleAnnotations`, `keepToolSelected`,  `compareDoc`, `syncScroll`, `sectionPdfDocument`
```

```json
/**
 * Actions that in some form download or export the document being viewed.
 */
DOWNLOAD: "Download",
```

```json
Actions that belong to this type: `annotatedPdf`, `unannotatedPdf`, `offlineAnnotatedPdf`, `extractPdfPages`, `printAnnotatedPdf`, `controlledPrintAnnotatedPdf`, `sectionPdfDocument`
​
```

```json
/**
 * Actions that create annotations on the document.
 */
ANNOTATION: "Annotation",
```

```json
Actions that belong to this type: `stickyNote`, `drawLine`, `drawArrow`, `drawRectangle`, `textbox`, `drawEllipse`, `freeDraw`, `highlight`, `strikeout`, `insertText`, `replaceText`, `acceptStamp`, `approvedStamp`, `pageSizedCheckmarkStamp`, `rejectStamp`, `reviewedStamp`, `undo`, `redo`, `checkinOfflineAnnotatedPdf`
​
```

```json
/**
 * Actions that manipulate/related-to annotations but do not create then.
 */
ANNOTATION_MANIPULATION: "AnnotationManipulation",
```

```json
Actions that belong to this type: `save`, `undo`, `redo`, `refresh`, `toggleAnnotations`
​
```

```json
/**
 * Actions that create/draw annotations on the document using Raphael.
 */
DRAWING: "Drawing",
```

```json
Actions that belong to this type: `drawLine`, `drawArrow`, `drawRectangle`, `textbox`, `drawEllipse`, `freeDraw`, `drawRedaction`
​
```

```json
/**
 * Actions that create/draw annotations that are attached to the document's text.
 */
TEXT: "Text",
```

```json
Actions that belong to this type: `selectText`, `highlight`, `strikeout`, `insertText`, `replaceText`
​
```

```json
/**
 * Actions that create annotations which are a static or dynamic image on the document.
 */
STAMP: "Stamp",
```

```json
Actions that belong to this type: `acceptStamp`, `approvedStamp`, `pageSizedCheckmarkStamp`, `rejectStamp`, `reviewedStamp`, `signature`
​
```

```json
/**
 * Miscellaneous. Actions that create annotations and do not fit into any other type.
 */
MISC: "Misc",
```

```json
Actions that belong to this type: `mouse`, `stickyNote`, `keepToolSelected`, `addAttachment`
​
```

```json
/**
 * Actions that can permanently modify the document itself.
 */
DOCUMENT_MANIPULATION: "DocumentManipulation",
```

```json
Actions that belong to this type: `extractPdfAndSavePages`, `prunePdf`, `deletePdfPages`, `sectionPdfDocument`, `rotatePagerClockwise`, `rotatePageCounterClockwise`
​
```

```json
/**
 * Actions that uses page selection.
 */
PAGE_SELECTION: "PageSelection",
```

```json
Actions that belong to this type: `extractPdfPages`, `extractPdfAndSavePages`, `prunePdf`, `deletePdfPages`, `sectionPdfDocument`
​
```

```json
/**
 * Actions relating to the annotation summary.
 */
SUMMARY: "Summary",
```

```json​
Actions that belong to this type: `printSummary`, `exportSummary`
​
```

```json
/**
 *  Actions relating to redact all search button in the redaction mode.
 */
SEARCH: "Search",
```

```json
​
Actions that belong to this type: `redactSearchResults`
​
```

```json
/**
 * Actions that related to comparing the current document with another document within Alfresco Enterprise Viewer. 
 */
COMPARE: "Compare",
```

```json
​
Actions that belong to this type: `compareDoc`, `syncScroll`
```

```json
/**
 * Actions that should be collapsed into the 'Tools' dropdown when the screen is a small size.
 */
SMALL_DROPDOWN: "Smalldropdown",
```

```json
Actions that belong to this type: `extractPdfPages`, `extractPdfAndSavePages`, `prunePdf`, `sectionPdfDocument`
​
```

```json
/**
 * Actions that refer the user to help or tutorials that show them how to use Alfresco Enterprise Viewer.
 */
HELP: "Help"
```

```json
Actions that belong to this type: `help`
​
```

```json
/**
 * Actions that should be used only if the document has sections.
 */
SECTIONED: "Sectioned"
```

```json
Actions that belong to this type: `printSectionsAction`.
​
**Note** : The `printSectionsAction` action and the `SECTIONED` action type was developed alongside a new property, `determineSectionsFromProperty` that can allow you to parse sections automatically for your document based on a document property. `determineSectionsFromProperty` defaults to `false`, but should be equal to the name of the property if you want to turn on the feature. 
​
```

```json
/**
 * Actions that can be used by non-sectioned documents. 
 */
NONSECTIONED: "NonSectioned"
```

Actions that belong to this type: `printAnnotatedPdf`.
​

## Action groups, toolbar order, and dropdowns

### Action groups

The grouping of actions is controlled by enclosing each group of actions or action types within parenthesis.  These action groups are displayed in the toolbar separated by vertical dividers.

### Toolbar ordering

The order of actions in the toolbar is controlled by the order of the comma separated list of these action groups. The order of the comma separated list determines how the toolbar appears in AEV.  

> **Note:** The AEV logo, load time, and color picker are currently not configurable and will always appear in set positions.  

### Action dropdowns

Dropdowns are configured by adding dropdown specific properties within the group.  For example, the actions in the Action Type `Download` can be set as a dropdown using the following:

`d(t:Download,--dropdownLabel-Downloads,--dropdownIcon-download-alt)`

The `d` surrounding the group configures it to be a dropdown.
​
Properties relating to dropdowns:

| Property | Description |
| -------- | ----------- |
| --dropdownLabel | Sets the `dropdownLabel` to the specified value. Defaults to an empty string. |
| --dropdownIcon  | Sets the `dropdownIcon` to the specified value. Defaults to chevron-down. These refer to glyphicon values provided at [https://getbootstrap.com/docs/3.3/components/](https://getbootstrap.com/docs/3.3/components/){:target="_blank"}. |

## Enabling and disabling modes of AEV

The modes that appear in AEV are controlled by the `enable{MODE}Actions` properties just like the actions are.

Available modes in AEV are displayed on the toolbar in a dropdown. To display all available modes in AEV, you can configure the `(t:Mode)` Action Group on every `enable{MODE}Actions` property and all modes will show in the dropdown no matter what mode you are currently in.

To get more granular with what modes appear you can use a comma separated list of modes to include rather than using the Action Group. For example, `(annotationMode,editMode)`.

Take a look at the following example of disabling modes in AEV:

To disable certain modes in AEV, we would change the (t:Mode) enabledAction to the specific modes we want to be enabled. For instance, if we only wanted to enable Edit mode, then our properties would go from:

`enabledEditActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),`
`(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(t:DocumentManipulation,--showAtAllSizes),(t:Help)`
`enabledOpenViewerActions=(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),`
`(t:Mode),(t:PageEntry),(printAnnotatedPdf),(t:DocumentManipulation,--showAtAllSizes),(mouse),(t:Help)`
​
\
\
to:

`enabledEditActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),`
`(editMode),(t:PageEntry),(save,--showAtAllSizes),(rotatePageCounterClockwise,rotatePageClockwise,--showAtAllSizes),(t:Help)`
`enabledOpenViewerActions=(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),`
`(editMode),(t:PageEntry),(printAnnotatedPdf),(rotatePageCounterClockwise,rotatePageClockwise,--showAtAllSizes),(mouse),(t:Help)`
