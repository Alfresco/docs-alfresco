---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [JavaScript, API/Script]
keyword: [JavaScript API, root-scoped objects]
---

# Root-scoped objects

The JavaScript API provides the common Alfresco repository concepts \(such as nodes, aspects, associations, and properties\) through `ScriptNode` objects. They also provide access to common services through an object-oriented API.

The objects available by default vary depending on how you access the script engine. If the script is processed through a rule/action \( `Execute a Script)` in the web client or through the Script Command Processor, the following objects are available:

|Type|Description|
|----|-----------|
|`companyhome`|The company home `ScriptNode`|
|`userhome`|The current user's Home Space `ScriptNode`|
|`person`|The `ScriptNode` representing the current user's `Person` object|
|`space`|The current space `ScriptNode` \(if any\). For a script executing from a rule, the `space` object is the space in which the rule resides. If the rule is inherited, this may not be the expected space.|
|`document`|The current document `ScriptNode` \(if any\)|
|`script`|The `ScriptNode` representing the script object itself. This is only available if the script is loaded from the Java classpath.|
|`args`|An associative array of any URL parameters passed using the Script Processor Servlet. This is only available if the script was executed using the Script Servlet.|
|`search`|Host object providing access to the various Alfresco search interfaces such as FTS-Alfresco, Lucene, XPath, and Saved Search results|
|`people`|Host object providing access to and manipulation of person objects and groups|
|`actions`|Host object providing invocation of registered Alfresco actions|
|`logger`|Host object providing access to console logging facilities for script debugging|
|`session`|Session-related information such as the current authentication ticket|
|`classification`|Access to the root elements of the Classification API|
|`utils`|Access to a library of helper functions that are not provided as part of generic JavaScript|
|`avm`|Access to WCM objects such as AVM paths and searching within AVM stores and web projects.|
|`crossRepoCopy`|Cross repository copy support.|
|`webprojects`|Root of the WCM JavaScript API providing access to web projects, sandboxes, WCM assets, and project membership|
|`invitations`|Root of the Invitations API providing access to invitations for web sites|
|`groups`|Root of the Group authorities providing access to advanced authority APIs for manipulating groups and zones|
|`transfer`|The root of transfer service providing access to the transfer service.|
|
|`sites`|The root of sites service providing access to the sites service.|

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

