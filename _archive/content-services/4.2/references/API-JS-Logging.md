---
author: Alfresco Documentation
---

# Logging API

A root level `logger` object provides the following methods to help debug scripts.

## Properties

-   **`loggingEnabled`**

    True if logging is enabled.

-   **`debugLoggingEnabled`**

    True if debug logging is enabled.

-   **`infoLoggingEnabled`**

    True if info logging is enabled.

-   **`warnLoggingEnabled`**

    True if warn logging is enabled.

-   **`errorLoggingEnabled`**

    True if error logging is enabled.


```
logger.debug("Debug string")
```

-   **[log](../references/API-JS-Logging-log.md)**  
`log(string)` writes a message string to the log.
-   **[warn](../references/API-JS-Logging-warn.md)**  
`warn(string)` writes a message string to the log.
-   **[info](../references/API-JS-Logging-info.md)**  
`info(string)` writes a message string to the log.
-   **[error](../references/API-JS-Logging-error.md)**  
`error(string)` writes a message string to the console.
-   **[debug](../references/API-JS-Logging-debug.md)**  
`debug(string)` writes a debug message string to the log.

**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

