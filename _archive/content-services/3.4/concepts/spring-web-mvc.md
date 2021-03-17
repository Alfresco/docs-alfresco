---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
option: Surf Spring Web MVC
---

# Spring Web MVC

Spring Web MVC is the Model-View-Controller implementation for Spring framework web applications.

Based on Spring configuration, Java beans implement controllers, views, the model, and the mappings between URIs and handlers. Spring Web MVC is very extensible, letting you write your own Java code, plug in new beans, or rewire things through configuration.

The dispatcher for a Spring Web MVC application is the dispatcher servlet, which handles the request, executes the MVC pattern, and tries to identify a controller to handle the incoming request. A controller is a Plain Old Java Object \(POJO\) registered with the Spring framework. In the Spring framework, the model is a simple map of named properties. The controller computes these, and when finished, hands the model back to the dispatcher servlet. The dispatcher servlet then tries to determine a view to use to render the model to the end user. It consults a registry of view resolvers and asks each of them if they can handle the incoming request URI. If it finds a matching view resolver, it is used to produce a view object, rendering the model to the end user.

Typically, Spring Web MVC application developers focus most of their effort writing controllers and views in Java, which are then wired together with Spring configuration XML.

-   **[Rendering a Surf page](../tasks/surf-page-render.md)**  
This example describes how to render a Surf page through Spring Web MVC.
-   **[Using an annotated controller](../tasks/surf-controller-using.md)**  
This example describes how to use Spring to write controllers to build the model that your page ultimately uses.

**Parent topic:**[Working with the Surf framework](../concepts/surf-fwork-intro.md)

