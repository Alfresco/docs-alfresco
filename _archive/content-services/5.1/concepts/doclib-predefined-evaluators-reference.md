---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library]
---

# Predefined evaluators

This information provides a list of the evaluators that are defined in the core Alfresco Share code, from v4.0 onwards.

They are all defined in slingshot-documentlibrary-context.xml and can be reused in customizations as required.

## Evaluators

These evaluators might need extra configuration before they can be used and form the basis of all metadata and action evaluators by using the bean configuration `parent` attribute.

|
|
|**Evaluator**|**Properties**|
|`evaluator.doclib.action.hasAspect`|-   aspects: List of aspects the node must have

|
|`evaluator.doclib.action.isMimetype`|-   mimetypes: The node must match one of the mimetypes

|
|`evaluator.doclib.action.propertyNotNull`|-   property: the node property must not be null for this evaluator to return true

|
|`evaluator.doclib.action.chainedMatchAll`|-   evaluators: List of evaluators that are run in turn until one returns false or the end is reached

|
|`evaluator.doclib.action.chainedMatchOne`|-   evaluators: List of evaluators that are run in turn until one returns true

|
|`evaluator.doclib.action.disableAction`|-   Always returns false

|
|`evaluator.doclib.action.sitePreset`|-   presets: current site must match one of the listed presets

|
|`evaluator.doclib.action.siteBased`|-   Returns true if the current node is located within a Share site and the Site Document Library is being used

|
|`evaluator.doclib.action.containerType`|-   types: Current documentLibrary container folder must match one of the listed types

|
|`evaluator.doclib.action.nodeType`|-   allow Subtypes: Whether subtypes of the node are also allowed
-   types: Node must match one of the listed types

|
|`evaluator.doclib.action.value`|This evaluator is described in further detail in the next topic.

 -   accessor: `jsNode` property to be tested
-   comparator: Bean definition of class implementing the Comparator interface

|
|`evaluator.doclib.action.metadataValue`|This evaluator is described in further detail in the next topic.

 -   accessor: metadata property to be tested
-   comparator: Bean definition of class implementing the Comparator interface

|
|`evaluator.doclib.action.isBrowser`|-   regex: Regular expression to match against browser userAgent string

|
|`evaluator.doclib.action.isPortlet`|Returns true if the application is deployed within a portlet environment|
|`evaluator.doclib.action.notPortlet`|Returns the inverse of `isPortlet`|

## Comparators

The `evaluator.doclib.action.value` and `evaluator.doclib.action.metadataValue` evaluators use comparator helper beans in order to test a value against certain conditions. The following comparators are available in a standard install.

|
|
|**Evaluator**|**Properties**|
|`org.alfresco.web.evaluator.StringEqualsComparator`|-   aspects: Value to test string against
-   caseInsensitive: Defaults to true

|
|`org.alfresco.web.evaluator.NullValueComparator`|-   value: Boolean to indicate if null should be the pass or fail case

|

## Evaluator Instances

The following lists describe each of the evaluators defined for the v4.0 release.

**Status indicator evaluators**

|
|
|`evaluator.doclib.indicator.editing`|The current user is editing this node \(working copy\)|
|`evaluator.doclib.indicator.lockOwner`|The current user is the lock owner \(original of a working copy pair\)|
|`evaluator.doclib.indicator.locked`|The node is locked by another user|
|`evaluator.doclib.indicator.googleDocsEditing`|The node is being edited using Google Docs|
|`evaluator.doclib.indicator.googleDocsOwner`|The current user is editing the node is Google Docs|
|`evaluator.doclib.indicator.googleDocsLocked`|Another user is editing the node using Google Docs|
|`evaluator.doclib.indicator.activeWorkflows`|The node is involved in one or more active \(advanced\) workflows|
|`evaluator.doclib.indicator.simpleWorkflow`|The node is part of a simple workflow process|
|`evaluator.doclib.indicator.rules`|The node has rules applied|
|`evaluator.doclib.indicator.exifMetadata`|The node has the EXIF metadata aspect applied|
|`evaluator.doclib.indicator.geographicMetadata`|The node has the Geographic aspect applied|

**Metadata template evaluators**

|
|
|`evaluator.doclib.metadata.hasCategories`|The node has the classifiable aspect applied|
|`evaluator.doclib.metadata.isWorkingCopy`|The node is a working copy|

**Action evaluators**

|
|
|`evaluator.doclib.action.simpleApprove`|Uses `simpleWorkflowAspect` and `simpleApproveProperty` to check for the simple workflow “Approve” action validity|
|`evaluator.doclib.action.simpleReject`|Uses `simpleWorkflowAspect` and `simpleRejectProperty` to check for the simple workflow “Reject” action validity|
|`evaluator.doclib.action.locateAction`|Checks the current filter is “path”|
|`evaluator.doclib.action.inlineEdit`|Uses the `inlineEditAspect` and `inlineEditMimetype` evaluators to determine if a content node can be edited inline|
|`evaluator.doclib.action.onlineEdit`|Uses `onlineEditVtiServer`, `onlineEditBrowser` and `onlineEditMimetype` evaluators to determine if the “Edit in Microsoft Office” action is valid|
|`evaluator.doclib.action.hasLockableAspect`|Used in an inverted state for the “Edit Offline”, “Copy”, “Move” and “Publish” actions|
|`evaluator.doclib.action.siteBased`|Enables the site-based permissions dialog. Used in inverted state for the repository-based permissions page action|
|`evaluator.doclib.action.isWorkingCopy`|Tests whether a node is a working copy|
|`evaluator.doclib.action.viewInExplorer`|Reads the `repository-url` config value to determine the validity of the “View in Explorer” action|
|`evaluator.doclib.action.googleDocsEditable`|Enables “Check out to Google Docs” action|
|`evaluator.doclib.action.googleDocsCheckIn`|Tests for the validity of the “Check in from Google Docs” action|
|`evaluator.doclib.action.googleDocsView`|Tests whether a node has been checked out to Google Docs|
|`evaluator.doclib.action.googleMaps`|Checks for the `cm:geographic` aspect|
|`evaluator.doclib.action.transferred`|Tests for the `trx:transferred` action for the “View in Source Repository” action|

**Parent topic:**[Reference](../concepts/doclib-reference.md)

