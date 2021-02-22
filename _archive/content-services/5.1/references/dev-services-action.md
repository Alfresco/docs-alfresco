---
author: [Alfresco Documentation, Alfresco Documentation]
---

# ActionService

An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.

|Information|ActionService|
|-----------|-------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|An Action is a unit of work that can be carried out on a node. Actions are commonly used in conjunction with Rules, but that is not mandatory. When you create Rules for a folder in Alfresco, you can specify certain Actions to occur to nodes added to the folder. For example, when a Word document is added to a folder, you may want a PDF to be automatically generated, or a notification email to sent. There are a number of built-in Actions available by default: -   Execute Script
-   Copy
-   Move
-   Checkin
-   Checkout
-   Link to category
-   Add Aspect
-   Remove Aspect
-   Add simple workflow
-   Send email
-   Transform and copy content
-   Transform and copy image
-   Extract common metadata fields
-   Import
-   Specialise type
-   Increment counter
-   Set property value

 You can also create custom Actions to do whatever you want to content added to the folder.

 While Actions are typically triggered by Rules, you can also invoke them directly by selecting them from a menu item. The Action Service also allows you to call them directly from code. Any piece of code that can access the ActionService can invoke the Action, for example:

 -   JavaScript
-   Workflow
-   Web script
-   Java

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/action/ActionService.html)|
|Java example|```

                  
public void sendEmailWithDoc(String to, String subject, String bodyText, NodeRef docNodeRef) {
    boolean executeAsync = true;
    Map<String, Serializable> aParams = new HashMap<String, Serializable>();
    aParams.put("to", to);
    aParams.put("subject", subject);
    aParams.put("body_text", bodyText);

    Action a = serviceRegistry.getActionService().createAction("send-as-email", aParams);
    if (a != null) {
       serviceRegistry.getActionService().executeAction(a, docNodeRef, true, executeAsync);
    } else {
       throw new RuntimeException("Could not create send-as-email action");
    }
}                  
                  
               
```

|
|More Information|-   [Actions platform extension point documentation](dev-extension-points-actions.md).
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|[Jeff Potts Custom Action tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/actions/tutorial/tutorial.html)|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

