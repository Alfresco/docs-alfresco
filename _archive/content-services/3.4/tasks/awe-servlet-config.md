---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: servlet filter tags startTemplate markContent endTempalte JSP
---

# Configuring the servlet filter

The `startTemplate`, `markContent`, and `endTemplate` tags will only render their output if they detect the presence of the Web Editor servlet filter. The tags can remain in the JSP page in production and have no effect until the servlet filter configuration is added to the web.xml file.

1.  Add the following servlet filter configuration to the web application's web.xml file:

    ```
    <filter>
       <filter-name>Alfresco Web Editor Filter</filter-name>
       <description>Enables support for the Alfresco Web Editor</description>
       <filter-class>org.alfresco.web.awe.filter.WebEditorFilter</filter-class>
    </filter>
      
    <filter-mapping>
       <filter-name>Alfresco Web Editor Filter</filter-name>
       <url-pattern>/*</url-pattern>
    </filter-mapping>
    ```

    This enables the tags.

2.  Set the following two optional parameters:

    ```
    <init-param>
       <param-name>contextPath</param-name>
       <param-value>/quickstart</param-value>
    </init-param>
    
    <init-param>
       <param-name>debug</param-name>
       <param-value>true</param-value>
    </init-param>
    ```

    These parameters control the `contextPath` that is used when URLs to the Web Editor are generated and the debug mode.


**Parent topic:**[Configuring Alfresco Web Editor](../concepts/awe-config.md)

