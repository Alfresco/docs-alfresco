---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Cross-Origin Resource Sharing \(CORS\) filters

Use this information to enable Cross-Origin Resource Sharing \(CORS\) in Alfresco Content Services, so that the repository accepts incoming requests from applications that are running on a different webserver.

1.  To enable CORS in Alfresco Content Services, set the `filter` and `filter-mapping` in `<CATALINA_HOME>/webapps/alfresco/WEB-INF/web.xml`:

    ```
    <filter>
        <filter-name>CORS</filter-name>
        <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
        <init-param>
            <param-name>cors.allowGenericHttpRequests</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>cors.allowOrigin</param-name>
            <param-value>http://localhost:8081,http://myapp.example.com</param-value>
        </init-param>
        <init-param>
            <param-name>cors.allowSubdomains</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>cors.supportedMethods</param-name>
            <param-value>GET, HEAD, POST, PUT, DELETE, OPTIONS</param-value>
        </init-param>
        <init-param>
            <param-name>cors.supportedHeaders</param-name>
            <param-value>origin, authorization, x-file-size, x-file-name, content-type, accept, x-file-type, range</param-value>
        </init-param>
        <init-param>
            <param-name>cors.exposedHeaders</param-name>
            <param-value>Accept-Ranges, Content-Encoding, Content-Length, Content-Range</param-value>
        </init-param>
        <init-param>
            <param-name>cors.supportsCredentials</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
             <param-name>cors.maxAge</param-name>
             <param-value>3600</param-value>
        </init-param>
    </filter>
    
    <filter-mapping>
        <filter-name>CORS</filter-name>
        <url-pattern>/api/*</url-pattern>
        <url-pattern>/service/*</url-pattern>
        <url-pattern>/s/*</url-pattern>
        <url-pattern>/cmisbrowser/*</url-pattern>
        <url-pattern>/definitions/*</url-pattern>
    </filter-mapping>
    ```

    This will make CORS available only to certain origins \(e.g. [http://localhost:8081](http://localhost:8081/), [http://myapp.example.com](http://myapp.example.com/)\).

2.  For development, a wildcard can be used to allow all origins:

    ```
        <init-param>
            <param-name>cors.allowOrigin</param-name>
            <param-value>*</param-value>
        </init-param>
    ```


To disable CORS, comment out the CORS `filter` and `filter-mapping` settings.

**Parent topic:**[Alfresco Repository Security policies and filters](../concepts/repository-security-policies-filters.md)

