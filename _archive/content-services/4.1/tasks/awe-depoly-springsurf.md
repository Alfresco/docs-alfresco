---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: Alfresco Web Editor AWE
---

# Deploying the Alfresco Web Editor to a Spring Surf application

The Alfresco Web Editor distribution also includes all the files required to provide the functionality within an existing Spring Surf application.

1.  Copy the following files to your application WEB-INF/lib directory:

    1.  yui-2.7.0.jar

    2.  spring-webeditor-1.0.0.CI-SNAPSHOT.jar

    3.  alfresco-forms-client.jar

    4.  alfresco-webeditor-plugin.jar

    The yui and spring-webeditor JAR files represent the Web Editor Framework \(WEF\) upon which the Web Editor is built. The remaining alfresco-form-client and alfresco-webeditor-plugin JAR files provide the Web Editor functionality.

2.  If you plan to use the Web Editor within the application \(rather than the application being a host for the Web Editor services\) you also must copy the following additional files into the WEB-INF/lib directory:

    1.  spring-webeditor-client-jsp-1.0.0.CI-SNAPSHOT.jar

    2.  alfresco-webeditor-taglib.jar

3.  If you use the additional files, define a servlet filter in your application's web.xml file.

    If you do not provide the filter, the tags will be ignored. The following filter configuration is required:

    ```
    <filter>
        <filter-name>Alfresco Web Editor Filter</filter-name>
        <description>Enables support for the Alfresco Web Editor</description>
        <filter-class>org.alfresco.web.awe.filter.WebEditorFilter</filter-class>
        <init-param>
           <param-name>contextPath</param-name>
           <param-value>/your-context-path</param-value>
        </init-param> 
    </filter>
      
    <filter-mapping>
       <filter-name>Alfresco Web Editor Filter</filter-name>
       <url-pattern>/*</url-pattern>
    </filter-mapping>
    ```

4.  Set the `contextPath` parameter.

    If you do not provided a value for this parameter, a default `contextPath` of /awe is presumed.

    No further configuration is required as all the necessary Spring context files and Alfresco configuration files are contained within the JAR files. However, there is no default hook point for custom form configuration but this can be located anywhere within your application.


**Parent topic:**[Alfresco Web Editor deployment](../concepts/awe-deploy-overview.md)

