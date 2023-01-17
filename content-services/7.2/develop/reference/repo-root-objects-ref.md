---
title: Repository JavaScript root objects reference
---

The JavaScript API provides a number of root objects which are available from your JavaScript code.

The root objects have various types, depending on which part of the system they expose. For example, the common 
repository concepts, such as the Company Home folder and the logged in user, are represented through objects of type 
`ScriptNode`. These objects support the full range of properties and object-oriented API of the `ScriptNode` class.

Depending on the context in which the script is invoked, other types of root object are available that represent aspects 
of the system such as server details, user information, request headers and parameters passed to the script. Further, a 
variety of services are accessible from your JavaScript code, each of these services has a corresponding root object, on 
which properties can be accessed and a variety of methods called as dictated by the service's API.

The root objects available to your JavaScript code will depend on the context in which the code is invoked. Different 
contexts will have access to a different set of root objects. There are several contexts to be considered:

* Repository Web scripts (see this [reference]({% link content-services/7.2/develop/reference/repo-root-objects-ref.md %}))
* Surf Web Scripts (see this [reference]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#surfrootobjects))
* Rules/actions
* Workflow
* Share

This information looks at the most commonly used root objects. More specialized root objects are described in more 
detail in the relevant sections of this documentation.

## Simple root objects

The following table lists root objects that do not expose an API, but consist of simple data structures or types:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`guest`|Boolean|True if the user is logged in as a guest|
|`server`|Object|Server details|
|`model`|Object|Used to pass a model from the control script to the view renderer (template). Web scripts only.|

## Root objects that expose ScriptNode objects

The following table lists root objects that expose `ScriptNode` objects:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`companyhome`|`org.alfresco.repo.jscript.ScriptNode`|The company home `ScriptNode`. See ScriptNode API for properties and methods.|
|`document`|`org.alfresco.repo.jscript.ScriptNode`|The current node `ScriptNode` (if any)|
|`person`|`org.alfresco.repo.jscript.ScriptNode`|The `ScriptNode` representing the `Person` object of the currently authenticated user. See ScriptNode API for properties and methods.|
|`roothome`|`org.alfresco.repo.jscript.ScriptNode`|The store root `ScriptNode`. The repository root folder. See ScriptNode API for properties and methods.|
|`script`|`org.alfresco.repo.jscript.ScriptNode`|The `ScriptNode` representing the script object itself. This is only available if the script is loaded from the Java classpath.|
|`space`|`org.alfresco.repo.jscript.ScriptNode`|The primary parent ScriptNode for the current node (ScriptNode). For a script executing from a rule, the `space` object is the space in which the rule resides. If the rule is inherited, this might not be the expected space.|
|`userhome`|`org.alfresco.repo.jscript.ScriptNode`|The current user's Home Space `ScriptNode`. See ScriptNode API for properties and methods.|

## Root objects also available in web scripts

The following table lists root objects that are available when the script is running as a web script. See the web script 
reference for additional information on these root objects.

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`args`|List|List of arguments passed to the script|
|`argsM`|List|List of arguments passed to the script|
|`cache`|Object|Object containing cache information|
|`headers`|List|List of headers passed to the script|
|`headersM`|List|List of headers passed to the script|
|`session`|Object|Object containing session information for the user connection|
|`url`|Object|Object containing information about the URL used to invoke web script|

## Root objects that expose additional APIs

The following table lists root objects that expose additional APIs:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`actions`|`org.alfresco.repo.jscript.Actions`|Root object providing invocation of registered [actions]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %})|
|`activities`|`org.alfresco.repo.activities.script.Activity`|Root object providing access to the Alfresco Process Services API.|
|`appUtils`|`org.alfresco.repo.jscript.ApplicationScriptUtils`|Root object providing access to methods specifically for external application use|
|`bulkFSImport`|`org.alfresco.repo.bulkimport.script.BulkImport`|Bulk Import object|
|`classification`|`org.alfresco.repo.jscript.Classification`|Access to the root elements of the Classification API|
|`cmis`|`org.alfresco.repo.cmis.client.CMISLocalConnectionManagerImpl`|CMIS client|
|`cmisServer`|`org.alfresco.repo.cmis.rest.CMISScript`|CMIS server REST access|
|`crossRepoCopy`|`org.alfresco.repo.jscript.CrossRepositoryCopy`|Cross repository copy support.|
|`imap`|`org.alfresco.repo.jscript.Imap`|Root object providing access to IMAP methods for mailbox support|
|`format`|`org.springframework.extensions.webscripts.FormatModel`|Format model|
|`jsonUtils`|`org.springframework.extensions.webscripts.json.JSONUtils`|JSON utilities. Web scripts only.|
|`logger`|`org.alfresco.repo.jscript.ScriptLogger`|Root object providing access to console logging facilities for script debugging|
|`msg`|`org.springframework.extensions.webscripts.ScriptMessage`|Web scripts only|
|`paging`|`org.alfresco.repo.web.util.paging.Paging`|Paging API. web scripts only.|
|`people`|`org.alfresco.repo.jscript.People`|Root object providing access to and manipulation of person objects and groups|
|`presence`|`org.alfresco.repo.jscript.Presence`|Root object providing access to methods for detecting online presence of users|
|`search`|`org.alfresco.repo.jscript.Search`|Root object providing access to the various Content Services search interfaces such as FTS-Alfresco, Lucene, XPath, and Saved Search results|
|`session`|`org.alfresco.repo.jscript.Session`|Session-related information such as the current authentication ticket|
|`slingshotDocLib`|`org.alfresco.repo.jscript.SlingshotDocLibCustomResponse`|Slingshot|
|`stringUtils`|`org.springframework.extensions.webscripts.ScriptableUtils`|String utilities|
|`test`|`org.alfresco.repo.jscript.ScriptTestUtils`|Root object providing access to test utilities|
|`utils`|`org.alfresco.repo.jscript.ScriptUtils`|Root object providing access to a library of helper functions that are not provided as part of generic JavaScript|
|`workflow`|`org.alfresco.repo.workflow.jscript.WorkflowManager`|Root object providing access to the workflow service.|

## Root Objects that expose services

The following table lists root objects that expose services:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`actionTrackingService`|`org.alfresco.repo.action.script.ActionTrackingService`|Root of the Action Tracking Service|
|`atom`|`org.springframework.extensions.webscripts.atom.atomService`|Atom service|
|`commentService`|`org.alfresco.repo.web.scripts.comment.ScriptCommentService`|Root of the Comment Service|
|`formService`|`org.alfresco.repo.forms.script.ScriptFormService`|Root of the Form Service|
|`groups`|`org.alfresco.repo.security.authority.script.ScriptAuthorityService`|Root of the Group authorities providing access to advanced authority APIs for manipulating groups and zones.|
|`invitations`|`org.alfresco.repo.invitation.script.ScriptInvitationService`|Root of the Invitations API providing access to invitations for web sites.|
|`preferenceService`|`org.alfresco.repo.preference.script.ScriptPreferenceService`|Root of the Preference Service|
|`ratingService`|`org.alfresco.repo.rating.script.ScriptRatingService`|Root of the Rating Service|
|`renditionService`|`org.alfresco.repo.rendition.script.ScriptRenditionService`|Root of the Rendition Service|
|`replicationService`|`org.alfresco.repo.replication.script.ScriptReplicationService`|Root of the Replication Service|
|`siteService`|`org.alfresco.repo.site.script.ScriptSiteService`|The root of sites service providing access to the sites service.|
|`taggingService`|`org.alfresco.repo.Tagging.script.ScriptTaggingService`|Root of the Tagging Service|
|`thumbnailService`|`org.alfresco.repo.thumbnail.script.ScriptThumbnailService`|Root of the Thumbnail Service|
|`transfer`|`org.alfresco.repo.transfer.script.ScriptTransferService`|The root of transfer service providing access to the transfer service.|
