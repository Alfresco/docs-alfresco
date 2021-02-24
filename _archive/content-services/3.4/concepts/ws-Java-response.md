---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, APi/Script, Folder Listing, response status code]
---

# Setting the response status code

A web script uses a response status code to inform the calling client of its execution outcome. In Java, exceptions are often used for this and Java-backed web scripts may follow suit.

The Folder Listing web script validates that the provided folder path actually exists in the Alfresco content repository using the following code pattern:

```
. . .
if (folder == null)
{
   throw new WebScriptException(Status.STATUS_NOT_FOUND,
    "Folder " + folderPath + " not found");
}
. . .
```

The `WebScriptException` class is a special kind of exception supported by the Web Script Framework, which carries a status code and message. Whenever a web script throws this kind of exception, the Web Script Framework translates it into the equivalent status on the HTTP response. All other exceptions are caught by the Web Script Framework and translated into the 500 status code, which means an internal error occurred. In all cases, the status response template has access to details such as the status code, status message, and exception call stack. Throwing an exception is not always ideal, so the Web Script Framework provides another approach to setting the response status code. The `executeImpl()` method is passed a Status object, which allows the web script to set the status explicitly.

Your Folder Listing Web script can implement folder validation using the following alternate code:

```
. . .
if (folder == null)
{
   status.setCode(Status.SC_NOT_FOUND);
   status.setMessage("Folder " + folderPath + " not found");
   status.setRedirect(true);
   return;
}
. . .
```

One advantage of setting the status explicitly is that the web script may control whether a status response template is used to render the status through the `setRedirect()`method. Exceptions may be handled in a similar manner:

```
. . .
catch(ConstraintException e)
{
  status.setCode(Status.SC_FORBIDDEN);
  status.setMessage("Cannot create folder");
  status.setException(e);
  status.setRedirect(true);
}
. . .
```

The `setException()` method allows the web script to associate the status with the caught exception.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

