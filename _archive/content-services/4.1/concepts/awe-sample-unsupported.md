---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Customization]
option: Web Editor sample WAR
---

# Sample web application using Alfresco Web Editor

A sample customer WAR file is available in the Alfresco Web Editor distribution. It demonstrates how a customer may use Alfresco Web Editor in a very simple JSP-based web application. This sample must not be used in a production environment and is not supported.

A sample customer tag library is provided, which includes two tags. These tags are included as a demonstration sample and should never be used in a production environment.

-   **`content`**

    Allows content to be pulled from an Alfresco repository and sends output to a JSP page. The `content` tag requires one mandatory attribute called `nodeRef`

-   **`property`**

    Allows properties to be pulled from an Alfresco repository and sends output to a JSP page. The `property` tag requires two mandatory attributes: `nodeRef` and `property`.


The following example show the use of these tags:

```
<customer:content nodeRef="<%=mainTextNodeRef%>" />
<customer:property nodeRef="<%=subTextNodeRef%>" property="cm:description" />
```

The sample customer application consists of several, simple JSP pages that display the content and properties of two nodes from the repository. Update the `/includes/noderefs.jsp` page to provide the NodeRefs of two nodes in your repository.

By default, the sample pulls content from the Alfresco repository located at http://localhost:8080/alfresco, using a user name and password of admin. These values can be supplied using `context-param` values in the web.xml file, for example:

```
 <context-param>
      <param-name>org.customer.alfresco.host</param-name>
      <param-value>localhost</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.port</param-name>
      <param-value>8080</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.context</param-name>
      <param-value>alfresco</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.username</param-name>
      <param-value>admin</param-value>
   </context-param>
   
   <context-param>
      <param-name>org.customer.alfresco.password</param-name>
      <param-value>admin</param-value>
   </context-param>
```

**Parent topic:**[Alfresco Web Editor](../concepts/awe-intro.md)

