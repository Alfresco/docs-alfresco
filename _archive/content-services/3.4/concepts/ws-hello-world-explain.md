---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, Web Script]
option: Hello World
---

# How Hello World works

After creating the sample Hello World web script you typed the URL in the web browser to test it. This caused the Alfresco Web Script Framework to kick into action. It is triggered whenever a URL starting with `/alfresco/service` is invoked.

First, the Web Script Framework determines which web script to invoke by matching the remainder of the URL and the HTTP method of the HTTP request \(in this case, a GET request from the web browser\) to the appropriate registered web script descriptor, if one matches. The Hello World web script is matched to the URL `/hello` as defined by its web script descriptor file named hello.get.desc.xml.

Having found a web script, the Web Script Framework executes it by first invoking its controller script, if one exists, and then invoking its response template to render an HTTP response. The simple Hello World example does not consist of a controller script and does not define a default kind of response to render, so the Web Script Framework assumes an HTML response is to be rendered and locates the FreeMarker template named hello.get.html.ftl. The template renders an HTML response back to the web browser, which in turn displays Hello World.

**Parent topic:**[Developing a Hello World web script](../tasks/ws-hello-world-create.md)

**Related information**  


[Creating a Hello World web script](../tasks/ws-hello-world-create.md)

