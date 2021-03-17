---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: Utility API
---

# Utility methods

A root level `utils` object is provided as a library of helper methods that are missing from generic JavaScript.

-   **[createPaging](../references/API-JS-Utility-createPaging.md)**  
`createPaging` methods are used to build a `ScriptPagingDetails` object from the parameters supplied.
-   **[disableRules](../references/API-JS-Utility-disableRules.md)**  
`disableRules` disables rule execution for the current thread.
-   **[displayPath](../references/API-JS-Utility-displayPath.md)**  
`displayPath(node)` method to return the `cm:name` display path for a node with minimum performance overhead.
-   **[enableRules](../references/API-JS-Utility-enableRules.md)**  
`enableRules` enables rule execution for the current thread.
-   **[fromISO8601](../references/API-JS-Utility-fromISO8601.md)**  
 `fromISO8601(string)` parses a Date from an ISO8601 formatted string.
-   **[getLocale](../references/API-JS-Utility-getLocale.md)**  
`getLocale` returns the locale string for the current thread.
-   **[getNodeFromString](../references/API-JS-Utility-getNodeFromString.md)**  
`getNodeFromString(noderef)` returns a `ScriptNode` object representing the supplied `NodeRef` string. The node is not confirmed to exist in the repository.
-   **[longQName](../references/API-JS-Utility-longQName.md)**  
`longQName(string)` returns the long version of a short prefixed QName.
-   **[moduleInstalled](../references/API-JS-Utility-moduleInstalled.md)**  
 `moduleInstalled(moduleName)` checks if a module is installed.
-   **[pad](../references/API-JS-Utility-pad.md)**  
`pad(string, length)` pads a string with leading zeros to the specified length.
-   **[setLocale](../references/API-JS-Utility-setLocale.md)**  
`setLocale` sets the locale for the current thread.
-   **[setServiceRegistry](../references/API-JS-Utility-setServiceRegistry.md)**  
`setServiceRegistry(services)` sets the Service Registry.
-   **[setNodeService](../references/API-JS-Utility-setNodeService.md)**  
`setNodeService(nodeService)` sets the Node Service.
-   **[shortQName](../references/API-JS-Utility-shortQName.md)**  
`shortQName(string)` returns the short, or prefix, version of a long QName.
-   **[toBoolean](../references/API-JS-Utility-toBoolean.md)**  
`toBoolean(string)` returns a Boolean object from a string value.
-   **[toISO8601\(Date\)](../references/API-JS-Utility-toISO8601Date.md)**  
 `toISO8601(Date)` formats a date to an ISO8601 formatted string.
-   **[toISO8601\(long\)](../references/API-JS-Utility-toISO8601Long.md)**  
 `toISO8601(long)` formats a time in milliseconds to an ISO8601 formatted string.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

