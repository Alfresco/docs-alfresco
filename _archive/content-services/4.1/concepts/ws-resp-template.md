---
author: Alfresco Documentation
---

# Web script response template

Known as views, web script response templates render output in the correct format for specific needs, such as HTML, Atom, XML, RSS, JSON, CSV, or any combination of these.

The HTTP response is rendered via one of the supplied templates, where the chosen template is based on the required response content type or status outcome. The template has access to the URI query string, common repository data entry points, and any data items built by the optional controller script.

```

        
<html>
  <body>
    <img src="${url.context}/images/logo/AlfrescoLogo32.png" alt="Alfresco" />
    Blog query: ${args.q}
    <br/>
    <table>
<#list resultset as node>
     <tr>
       <td><img src="${url.context}${node.icon16}"/></td>
       <td><a href="${url.serviceContext}/api/node/content/${node.nodeRef.storeRef.protocol}/${node.nodeRef.storeRef.identifier}/${node.nodeRef.id}/${node.name?url}">${node.name}</a></td>
     </tr>
</#list>
    </table>
  </body>
</html>        
        
      
```

**Parent topic:**[Web script components](../concepts/ws-components.md)

