---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
keyword: [Java-backed web script, Surf]
---

# Modifying a web script using the Surf Remote API

This example uses the Surf Remote API to enhance the hotel listing example. It adjusts the Java-backed web script example to use a scriptable controller to access the remote service. This removes the need for Java code and makes the code much more portable.

You can retrieve a list of hotels from the Travel service using a purely script-based approach. Declarative web scripts support scriptable controllers. Spring Surf provides out-of- the-box support for server-side JavaScript, but you can also plug in add-on processors for Groovy and PHP. You can use Surf’s Remote API from within a scriptable controller to call out to the Travel service and acquire information.

1.  Remove the Java-backed web script. Remove the Java class and the registration of the Java bean from the Spring configuration.

2.  Add an additional file to the web script.

    For example:

    ```
    **hotellisting.get.js**
    var connector = remote.connect("travelService");
    varjsonString = connector.call("/hotels/find");
    model.hotelList = eval(jsonString);
    ```


This is a JavaScript controller that uses the remote variable to pull back content from an endpoint named `travelService`. You assume that the Travel service lives at this location. You also assume that it speaks JSON. This means that many different web applications can all talk to this Travel service and pull back data for use in rendering pages. It is a pure service-oriented architecture.

If you have set up the endpoint as well as any necessary connectors or authenticators, then the remote variable will let you open connections and work with services on the other side. In this case, you pull back a JSON object and then work with it via JavaScript, and nothing else changes. The advantage of this approach over the previous one is that it is entirely script-based. This means that the web script is more transportable; you can move it from one environment to the next with little difficulty. It is as easy as copying and pasting a set of files. It is also easy to change and does not require Java development skills.

**Parent topic:**[Creating a reusable Java-backed web script](../tasks/surf-java-ws-ex.md)

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

