---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, APi/Script, Folder Listing]
---

# Java approach to web scripts

The Java class for a Java-backed web script has to follow one rule: it must implement the Java interface: `org.alfresco.web.scripts.WebScript`

This interface defines the following two methods that must be implemented:

```
/**
* Gets the Web script Description
*
* @return the Web script description
*/
public WebScriptDescription getDescription();
/**
* Execute the Web script
*
* @param req the Web script request
* @param res the Web script response
*/
public void execute(WebScriptRequest req, WebScriptResponse res) throws
IOException;
```

The first method, `getDescription()`, returns a `WebScriptDescription` object, which is a Java representation of the web script description XML document. The second method, `execute()`, is invoked by the Web Script Framework to initiate the web script.

The Web Script Framework also provides two Java classes that implement the difficult parts of this interface, which you can extend as a starting point. The simplest helper Java class is named as follows: `org.alfresco.web.scripts.AbstractWebScript`

This helper provides an implementation of `getDescription()` but does not provide any execution assistance, which it delegates to its derived class. This allows a Java-backed web script to take full control of the execution process, including how output is rendered to the response.

The other helper Java class is named: `org.alfresco.web.scripts.DeclarativeWebScript`

This helper provides an implementation of `getDescription()` and `execute()`. It encapsulates the execution of a scripted web script, which is:

-   Locate an associated controller script written in JavaScript and, if found, execute it.
-   Locate an associated response template for the requested format and execute it, passing the model populated by the controller script.

By default, all web scripts implemented through scripting alone are backed by the `DeclarativeWebScript` Java class. There is one special hook point that makes this a useful class for your own Java-backed web scripts to extend. Prior to controller script execution, `DeclarativeWebScript` invokes the template method `executeImpl()`, which it expects derived Java classes to implement.

`protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache)`

This is where the behavior of a custom Java-backed web script is encapsulated, including the population of the web script model, which is returned from this method.

The Java Folder Listing web script uses `DeclarativeWebScript` for its starting point.

```
... 
public class JavaDir extends DeclarativeWebScript
{

. . .
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status,
      Cache cache)
    {

    . . .
    return model;
    }
    . . .
}
```

The model returned from `executeImpl`\(\) is passed to the response template for subsequent rendering. Prior to template rendering, the model may also be accessed and further refined by a controller script, if one happens to be provided for the web script. Apart from implementing the `WebScript` interface, there are no other web script demands on the Java class. You can give the Java class any name and place it in any Java package.

**Parent topic:**[Java-backed web scripts](../concepts/ws-folderListing-JavaBacked-create.md)

