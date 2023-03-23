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

## Redaction Types & Security
There are three types of redaction that may be configured:

* `redactInPlace` will make the redactions directly on the document being redacted
* `redactedAsCopy` will make a copy of the document being redacted and make the redactions on the copy (the original document will not be modified)
* `unredactedAsCopy` will make a copy of the document being redacted and make the redactions on the original document (the copy will not include the redactions)

### Setting up Security for Redacted / Unredacted files
In order to lock a version (Redacted or Unredacted) to a particular security level, we can create a new Alfresco Behavior to run once the redactions occur. We may implement the `org.alfresco.repo.node.NodeServicePolicies` interface and use the method `OnUpdatePropertiesPolicy` to write custom logic to secure the redacted/unredacted document appropriately.
Below is a sample code snippet showing custom logic written to set stricter permission to the UNREDACTED version of a document. 

In this example...
* The behavior code is written for the scenario where the redactionType is set to `unredactedAsCopy`. They are therefore securing the unredacted copy of the document to limit access more strictly. 
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

## Default AEV Enabled Actions

The following dives into each of these properties and documents the default values for the AEV actions enabled in each mode.

### enabledAnnotationActions

The Actions enabled in annotation mode.

Default Value: `(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),d(checkinOfflineAnnotatedPdf,annotatedPdf,nativeContentDownload,extractPdfPages,offlineAnnotatedPdf,printAnnotatedPdf,
printSectionsAction,--dropdownLabel-Downloads,--dropdownIcon-save_alt),(t:AnnotationManipulation),
(t:Misc),d(t:Text,--dropdownLabel-Text Annotations,--dropdownIcon-font_download,--dropdownShowSelected),
d(drawLine,drawArrow,drawEllipse,drawRectangle,drawBox,textbox,freeDraw,--dropdownLabel-Drawing Tools,--dropdownIcon-edit,--dropdownShowSelected),
d(approvedStamp,paidStamp,reviewedStamp,acceptStamp,rejectStamp,pageSizedCheckmarkStamp,--dropdownLabel-Stamps,--dropdownIcon-layers,--dropdownShowSelected),
d(t:Color,--dropdownLabel-Color Picker,--dropdownIcon-palette,--dropdownShowSelected),
(save,--isSmallScreen),(printAnnotatedPdf,--isSmallScreen),(stickyNote,--isSmallScreen),(highlight,--isSmallScreen),(t:Help),(toggleChat,t:Summary,--sidebar)`

### enabledRedactionActions

The Actions enabled in redaction mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(mouse),(drawRedaction,textRedaction,--showAtAllSizes),(t:Help),(t:Search,--sidebar)
enabledIndexerActions=(t:PageEntry),(t:Navigation),(mouse),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(drawRectangle,--showAtAllSizes),(selectText),(t:Help)
enabledEditActions=(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(t:DocumentManipulation,--showAtAllSizes),(t:Help)`

### enabledIndexerActions

The Actions enabled in indexing mode.
​

Default Value: `(t:PageEntry),(t:Navigation),(mouse),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(drawRectangle,--showAtAllSizes),(selectText),(t:Help)`

### enabledEditActions

The Actions enabled in document editing mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(t:DocumentManipulation,--showAtAllSizes),(t:Help)`

### enabledPageSelectActions

The Actions enabled in document page selecting mode.  No additional actions are configured by default
​

Default Value: `(t:PageEntry),(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(t:Help)`
​

### enabledSignatureActions

The Actions enabled in document signing mode. **NOTE: This action will allow users to draw their signature on a document.**
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(save,--showAtAllSizes),(mouse),(signature),(t:Help)`
​

### enabledOpenViewerActions

The Actions enabled in the quick document viewing mode.
​

Default Value: `(t:Navigation),(prevPage,nextPage, zoomIn,zoomOut,--isSmallScreen),
(t:Mode),(t:PageEntry),(printAnnotatedPdf),(t:DocumentManipulation,--showAtAllSizes),(mouse),(t:Help)`

### enabledOpenViewerWithTextActions

The Actions enabled in the quick document viewing mode with text search and select capabilities added.
​

Default Value: `(t:Navigation),(prevPage,nextPage,zoomIn,zoomOut,--isSmallScreen),(selectText),
(annotationMode,editMode,redactMode,viewerwithtextMode),(t:PageEntry),(printAnnotatedPdf),(mouse),(t:Search,--sidebar)`

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
