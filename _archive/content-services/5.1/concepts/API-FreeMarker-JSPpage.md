---
author: Alfresco Documentation
---

# JSP Page

Custom JSP pages can be written to render templates.

As well as the commonly used Web script-based mechanisms for rendering template output, developers can write custom JSP pages with JSF components that render templates.

## Example

Following is the minimum JSP code required to display a template using the JSF Template component:

```

  
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="/WEB-INF/repo.tld" prefix="r" %>
 
<html>
  <body>
  
    <f:view>
      <h:form>
        <r:template template="alfresco/templates/userhome_docs.ftl" />
      </h:form>
    </f:view>
  
  </body>
</html>
  

```

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

