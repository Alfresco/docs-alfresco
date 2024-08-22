---
title: Configure AEV actions and modes
---

To modify what actions and modes appear in the Alfresco Enterprise Viewer, certain properties can be edited in the `openannotate-override-placeholders.properties` file. This file would have been deployed to the Tomcat classpath as a part of the install process. Note that in order for changes to this file to take effect, the Tomcat will need to be restarted after the changes are made.  

Some important configuration features to point out when configuring AEV:

1. You can configure what buttons (actions) should appear in each mode individually, as well as the order they appear in the toolbar.
2. You can add Action types to whitelist, rather than listing each button individually.
3. You can configure where actions appear and what they look like.

Below is a list of the properties you can override in the `openannotate-override-placeholders.properties` to change the actions and modes that appear in each AEV mode:

* enabledAnnotationActions
* enabledRedactionActions
* enabledIndexerActions
* enabledEditActions
* enabledPageSelectActions
* enabledSignatureActions
* enabledOpenViewerActions
* enabledOpenViewerWithTextActions

Additional detail about each of these properties and their default values are listed in the next section.

## Redaction types and security

There are three types of redaction that you can configure:

* `redactInPlace` makes the redactions directly on the document being redacted.
* `redactedAsCopy` makes a copy of the document being redacted, and makes the redactions on the copy, so the original document is not be modified.
* `unredactedAsCopy` makes a copy of the document being redacted, and make the redactions on the original document, so the copy doesn't include the redactions.

### Set up security for redacted/unredacted files

To lock a version (redacted or unredacted) to a particular security level, you can create a new Alfresco Behavior to run once the redactions occur. You may implement the `org.alfresco.repo.node.NodeServicePolicies` interface and use the method `OnUpdatePropertiesPolicy` to write custom logic to secure the redacted/unredacted document appropriately.

Below is a sample code snippet showing custom logic written to set stricter permission to the UNREDACTED version of a document. In this example:

* The behavior code is written for the scenario where the `redactionType` is set to `unredactedAsCopy`. This secures the unredacted copy of the document to limit access more strictly.
* The `nodeRef` mentioned in this example is the unredacted copy of the original document.

```java
public void onUpdateProperties(final NodeRef nodeRef, final Map<QName, Serializable> before, final Map<QName, Serializable> after) {
    logger.debug("Starting UnredactedPermissionsBehavior.onUpdateProperties");
    
    // STEP 1: Add "-UNREDACTED" to cm_title of the copy document
    NodeService nodeService = serviceRegistry.getNodeService();
    QName titleProp = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, TITLE_NAME);
    Serializable currentTitle = nodeService.getProperty(nodeRef, titleProp);
    currentTitle = (StringUtils.contains(currentTitle.toString(), "-UNREDACTED") ? currentTitle : currentTitle + "-UNREDACTED");
    nodeService.setProperty(nodeRef, titleProp, currentTitle);
    
    AuthenticationUtil.runAs(new AuthenticationUtil.RunAsWork<Boolean>(){
        public Boolean doWork() {		
            PermissionService permissionService = serviceRegistry.getPermissionService();
            
            // STEP 2: clear out any permissions the copy document may be inheriting from its parent
            boolean inheritTrue = permissionService.getInheritParentPermissions(nodeRef);
            if(inheritTrue) {
                permissionService.setInheritParentPermissions(nodeRef, false);
            }
            
            // STEP 3: loop through the property names that are keys on the propertyMap...
            // the propertyMap in this example is a 2 level map(Map<String, Map<String, String>>), it maps a property name to another map
            // the second Map maps a property value to the list of groups that that property value corresponds to
            // We recommend injecting this map into this new behavior class via spring bean injection 
            for (String prop : propertyMap.keySet()) {
                // the "prop" here is the oc_name for a particular property (ex: hy_documentTypeCode)
                // We use that prop to get the second level map (aka propertyValueMap) based on that "prop"
                Map<String, List<String>> propertyValueMap = propertyMap.get(prop);
                
                // We then get QName of property
                QName propName = getPropertyQName(prop);

                // Make sure our injected map was configured correctly and that we were able to locate the property we are currently looping on
                if (propName != null) {

                    // At this point, we've located the property...
                    // Since this behavior runs on update, check if the property value changed on this doc as a part of this update
                    if (AlfrescoEmbUtil.propertyChanged(propName, before, after)) {
                        if (propertyValueMap.get((String)before.get(propName)) != null) {

                            // STEP 5: If the property value changed, let's clear out the permissions related to the old value of the property 
                            // since the permissions will now be based on the new property value 
                            List<String> prevGroups = propertyValueMap.get((String)before.get(propName));
                            for (String groupName : prevGroups) {
                                permissionService.clearPermission(nodeRef, groupName);
                            }
                        }
                    }

                    // STEP 6: Get the current value of the property we are looping on 
                    // and check if that value is in our propertyValueMap (meaning we have a permissions value in the map we can set for it)
                    if (propertyValueMap.get((String)after.get(propName)) != null) {
                        // STEP 7: If we found that property value in the map, lets set permissions for the new groups
                        // after we get the value of the groups from the map 
                        List<String> newGroups = propertyValueMap.get((String)after.get(propName));

                        // for each group, set the permissions on the doc
                        for (String groupName : newGroups) {
                            permissionService.setPermission(nodeRef, groupName, PermissionService.CONSUMER, true);
                        }
                    }	
                } else {
                    // if the property doesn't exist will log an error and continue
                    logger.error("UnredactedPermissionsBehavior: Unable to set permissions - property does not exist: " + prop);
                }
            } 
            return true;
        }
    }, AuthenticationUtil.getSystemUserName());

    logger.debug("Finishing UnredactedPermissionsBehavior.onUpdateProperties");
}
```

## Default AEV enabled actions

The following dives into each of these properties and documents the default values for the AEV actions enabled in each mode.

### enabledAnnotationActions

The Actions enabled in annotation mode.

Default value:

```text
(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),d(checkinOfflineAnnotatedPdf,annotatedPdf,nativeContentDownload,extractPdfPages,offlineAnnotatedPdf,printAnnotatedPdf,
printSectionsAction,--dropdownLabel-viewer.toolbar.downloadTools.tooltip,--dropdownIcon-save_alt),(t:AnnotationManipulation),
(t:Misc),d(t:Text,--dropdownLabel-viewer.toolbar.textSelect.tooltip,--dropdownIcon-font_download,--dropdownShowSelected),
d(drawLine,drawArrow,drawEllipse,drawRectangle,drawBox,textbox,freeDraw,--dropdownLabel-viewer.toolbar.drawingTools.tooltip,--dropdownIcon-edit,--dropdownShowSelected),
d(approvedStamp,paidStamp,reviewedStamp,acceptStamp,rejectStamp,pageSizedCheckmarkStamp,--dropdownLabel-viewer.toolbar.stamps.tooltip,--dropdownIcon-layers,--dropdownShowSelected),
d(t:Color,--dropdownLabel-viewer.toolbar.colorpicker.tooltip,--dropdownIcon-palette,--dropdownShowSelected),
d(t:ChangeBgColor,--dropdownLabel-viewer.toolbar.changeBgColor.tooltip,--dropdownIcon-format_paint,--dropdownShowSelected),
(save,--isSmallScreen),(printAnnotatedPdf,--isSmallScreen),(stickyNote,--isSmallScreen),(highlight,--isSmallScreen),(t:Help),(toggleChat,t:Summary,--sidebar)
```

### enabledRedactionActions

The Actions enabled in redaction mode.
​

Default value:

```text
(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(mouse),(drawRedaction,textRedaction,--showAtAllSizes),(t:Help),(t:Search,--sidebar)
```

### enabledIndexerActions

The Actions enabled in indexing mode.
​

Default value:

```text
(t:PageEntry),(t:Navigation),(mouse),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(drawRectangle,--showAtAllSizes),(selectText),(t:Help)
```

### enabledEditActions

The Actions enabled in document editing mode.
​

Default value:

```text
(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(t:DocumentManipulation,--showAtAllSizes),(t:Help)
```

### enabledPageSelectActions

The Actions enabled in document page selecting mode.  No additional actions are configured by default
​

Default value:

```text
(t:PageEntry),(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Help)
```
​

### enabledSignatureActions

The Actions enabled in document signing mode.

> **Note: This action allows users to draw their signature on a document.**
​

Default value:

```text
(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(mouse),(signature),(t:Help)
```

### enabledOpenViewerActions

The Actions enabled in the quick document viewing mode.
​

Default value:

```text
(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(printAnnotatedPdf),(t:DocumentManipulation,--showAtAllSizes),(mouse),(t:Help)
```

### enabledOpenViewerWithTextActions

The Actions enabled in the quick document viewing mode with text search and select capabilities added.
​

Default value:

```text
(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(selectText),
(annotationMode,editMode,redactMode,viewerwithtextMode),(t:PageEntry),(printAnnotatedPdf),(mouse),(t:Search,--sidebar)
```

## Overriding enabled actions

Overriding any of the properties listed in the last section in the `openannotate-override-placeholders.properties` with a value different than the default would change the actions displayed in AEV for that mode.

### Overriding enabled actions using ActionIds

To add a particular action to a specific mode in AEV, the actionId for that action can be added to the comma separated list for the mode specific property.

For example, if you want to add the `Print Annotated PDF` Action to `Signature Mode`, add the following to the `openannotate-override-placeholders.properties`:

```text
enabledSignatureActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Mode),(save,--showAtAllSizes),(mouse),(signature),(t:Help),(printAnnotatedPdf)
```

 This overrides the default value of `enabledSignatureActions`:

```text
enabledSignatureActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Mode),(save,--showAtAllSizes),(mouse),(signature),(t:Help)
```

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
```

Actions that belong to this type: `annotationMode`, `redactMode`, `editMode`, `signatureMode`.
​

```json
/**
 * Actions which require the document being viewed to be a  PDF to function.
 */
PDF: "Pdf",
```

Actions that belong to this type: `drawRedaction`, `signature`, `rotatePageClockwise`, `rotatePageCounterClockwise`, `selectText`, `strikeout`, `insertText`, `replaceText`, `annotatedPdf`, `unannotatedPdf`, `offlineAnnotatedPdf`, `extractPdfPages`, `printAnnotatedPdf`, `checkinOfflineAnnotatedPdf`.

```json
/**
 * Actions which require the document to have multiple pages.
 */
MULTI_PAGE: "MultiPage"
```

Actions that belong to this type: `extractPdfPages`, `extractPdfAndSavePages`, `prunePdf`, `deletePdfPages`, `nextPage`, `prevPage`, `sectionPdfDocument`.

```json
/**
 * Actions related to navigating the document.
 */
NAVIGATION: "Navigation",
```

Actions that belong to this type: `zoomIn`, `zoomOut`, `fitWidth`, `fitHeight`, `nextPage`, `prevPage`.

```json
/**
 * Actions related to changing the zoom level of the document being viewed.
 */
ZOOM: "Zoom",
```

Actions that belong to this type: `zoomIn`, `zoomOut`, `fitWidth`, `fitHeight`.

```json
/**
 * Actions that once selected, remain active until the tool is used.  Currently these are all actions for 
 * creating annotations or annotation-like objects.  
 */
TOOL: "Tool",
```

Actions that belong to this type: `mouse`, `drawRedaction`, `signature`, `stickyNote`, `drawLine`, `drawArrow`, `drawRectangle`, `textbox`, `drawEllipse`, `freeDraw`, `selectText`, `highlight`, `strikeout`, `insertText`, `replaceText`, `acceptStamp`, `approvedStamp`, `pageSizedCheckmarkStamp`, `rejectStamp`, `reviewedStamp`.

```json
/**
 * Actions that once selected, remain active until the they are selected again.  Toggle actions might also
 * have different behaviors between when they are selected and de-selected.
 */
TOGGLE: "Toggle",
```

Actions that belong to this type: `toggleAnnotations`, `keepToolSelected`,  `compareDoc`, `syncScroll`, `sectionPdfDocument`.

```json
/**
 * Actions that in some form download or export the document being viewed.
 */
DOWNLOAD: "Download",
```

Actions that belong to this type: `annotatedPdf`, `unannotatedPdf`, `offlineAnnotatedPdf`, `extractPdfPages`, `printAnnotatedPdf`, `sectionPdfDocument`.

```json
/**
 * Actions that create annotations on the document.
 */
ANNOTATION: "Annotation",
```

Actions that belong to this type: `stickyNote`, `drawLine`, `drawArrow`, `drawRectangle`, `textbox`, `drawEllipse`, `freeDraw`, `highlight`, `strikeout`, `insertText`, `replaceText`, `acceptStamp`, `approvedStamp`, `pageSizedCheckmarkStamp`, `rejectStamp`, `reviewedStamp`, `undo`, `redo`, `checkinOfflineAnnotatedPdf`.

```json
/**
 * Actions that manipulate/related-to annotations but do not create then.
 */
ANNOTATION_MANIPULATION: "AnnotationManipulation",
```

Actions that belong to this type: `save`, `undo`, `redo`, `refresh`, `toggleAnnotations`.

```json
/**
 * Actions that create/draw annotations on the document using Raphael.
 */
DRAWING: "Drawing",
```

Actions that belong to this type: `drawLine`, `drawArrow`, `drawRectangle`, `textbox`, `drawEllipse`, `freeDraw`, `drawRedaction`.

```json
/**
 * Actions that create/draw annotations that are attached to the document's text.
 */
TEXT: "Text",
```

Actions that belong to this type: `selectText`, `highlight`, `strikeout`, `insertText`, `replaceText`.

```json
/**
 * Actions that create annotations which are a static or dynamic image on the document.
 */
STAMP: "Stamp",
```

Actions that belong to this type: `acceptStamp`, `approvedStamp`, `pageSizedCheckmarkStamp`, `rejectStamp`, `reviewedStamp`, `signature`.

```json
/**
 * Miscellaneous. Actions that create annotations and do not fit into any other type.
 */
MISC: "Misc",
```

Actions that belong to this type: `mouse`, `stickyNote`, `keepToolSelected`, `addAttachment`.

```json
/**
 * Actions that can permanently modify the document itself.
 */
DOCUMENT_MANIPULATION: "DocumentManipulation",
```

Actions that belong to this type: `extractPdfAndSavePages`, `prunePdf`, `deletePdfPages`, `sectionPdfDocument`, `rotatePagerClockwise`, `rotatePageCounterClockwise`.

```json
/**
 * Actions that uses page selection.
 */
PAGE_SELECTION: "PageSelection",
```

Actions that belong to this type: `extractPdfPages`, `extractPdfAndSavePages`, `prunePdf`, `deletePdfPages`, `sectionPdfDocument`.

```json
/**
 * Actions relating to the annotation summary.
 */
SUMMARY: "Summary",
```

Actions that belong to this type: `printSummary`, `exportSummary`.

```json
/**
 *  Actions relating to redact all search button in the redaction mode.
 */
SEARCH: "Search",
```

Actions that belong to this type: `redactSearchResults`.

```json
/**
 * Actions that related to comparing the current document with another document within Alfresco Enterprise Viewer. 
 */
COMPARE: "Compare",
```

Actions that belong to this type: `compareDoc`, `syncScroll`.

```json
/**
 * Actions that should be collapsed into the 'Tools' dropdown when the screen is a small size.
 */
SMALL_DROPDOWN: "Smalldropdown",
```

Actions that belong to this type: `extractPdfPages`, `extractPdfAndSavePages`, `prunePdf`, `sectionPdfDocument`.

```json
/**
 * Actions that refer the user to help or tutorials that show them how to use Alfresco Enterprise Viewer.
 */
HELP: "Help"
```

Actions that belong to this type: `help`.

```json
/**
 * Actions that can be used by non-sectioned documents. 
 */
NONSECTIONED: "NonSectioned"
```

Actions that belong to this type: `printAnnotatedPdf`.

```json
/**
 * Actions related-to collaboration mode.
 */
COLLABORATION: "Collaboration"
```

Actions that belong to this type: `toggleChat`, `teamsCall`, `zoomCall`.

```json
/**
 * Actions relating to color.
 */
COLOR: "Color"
```

Actions that belong to this type: `colorBlack`, `colorBlue`, `colorDefault`, `colorGray`, `colorGreen`, `colorOrange`, `colorPurple`, `colorRed`, `colorReset`, `color-white`, `colorYellow`.

```json
/**
 * Actions relating to fill color of text box.
 */
CHANGE_BG_COLOR: "ChangeBgColor"
```

Actions that belong to this type: `bgColorBlack`, `bgColorDefault`, `bgColorLavender`, `bgColorLightBlue`, `bgColorLightGreen`, `bgColorLightGrey`, `bgColorLightPink`, `bgColorLightSalmon`, `bgColorLightYellow`, `bgColorRemove`, `colorReset`, `bgColorWhite`.

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

## Require ACS Permissions for AEV modes and actions

The following table lists ACS Permissions for AEV Modes:

| AEV | ACS Security Access Needed |
| --- | -------------------------- |
| signature | Read, Write |
| annotationMode | {::nomarkdown}<ul><li>Read (All the actions works with Read permission will be visible)</li><li>Read, AddChildren, Write</li></ul>{:/} |
| editMode | Read, AddChildre, Write |
| redactMode | Read, Write |
| viewerwithtextMode | Read, Write |

The following table lists ACS Permissions for AEV Actions:

| AEV Actions | ACS Security Access Needed as per Front End |
| ----------- | ------------------------------------------- |
| prevPage | Read |
| nextPage | Read |
| zoomIn | Read |
| zoomOut | Read |
| checkinOfflineAnnotatedPdf | Read, AddChildren, Write |
| annotatedPdf | Read |
| nativeContentDownload | Read |
| extractPdfPages | Read |
| offlineAnnotatedPdf | Read |
| printAnnotatedPdf | Read |
| drawLine | Read, AddChildren, Write |
| drawArrow | Read, AddChildren, Write |
| drawEllipse | Read, AddChildren, Write |
| drawRectangle | Read, AddChildren, Write |
| textbox | Read, AddChildren, Write |
| freeDraw | Read, AddChildren, Write |
| approvedStamp | Read, AddChildren, Write |
| paidStamp | Read, AddChildren, Write |
| reviewedStamp | Read, AddChildren, Write |
| acceptStamp | Read, AddChildren, Write |
| rejectStamp | Read, AddChildren, Write |
| pageSizedCheckmarkStamp | Read, AddChildren, Write |
| save | Read, AddChildren, Write |
| stickyNote | Read, AddChildren, Write |
| highlight | Read, AddChildren, Write |
| toggleChat | Read |
| mouse | Read |
| drawRedaction | Read, Write |
| textRedaction | Read, Write |
| selectText | Read |
| strikeout | Read, AddChildren, Write |
| addAttachment | Read, AddChildren, Write |
| keepToolSelected | Read, AddChildren, Write |
| insertText | Read, AddChildren, Write |
| underline | Read, AddChildren, Write |
| replaceText | Read, AddChildren, Write |
| t:Navigation | Read |
| t:Mode | {::nomarkdown}<ul><li>Read, Write</li><li>Read, Write, AddChildren (to use it under annotationMode)</li></ul>{:/} |
| t:PageEntry | Read |
| t:AnnotationManipulation | Read, AddChildren, Write |
| t:Misc | Read, AddChildren, Write |
| t:Text | Read, AddChildren, Write |
| t:Color | Read, AddChildren, Write |
| t:Help | Read |
| t:Summary | Read |
| t:Search | Read |
| t:DocumentManipulation | Read, Write |