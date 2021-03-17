---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring SSL for a production environment

This scenario provides a set of forwarding rules that your proxy needs to meet and the corresponding Alfresco configuration, with sample configuration files for Apache HTTP Server.

Several proxy application servers are available to configure for SSL communications; for example, Apache HTTP Server, HAProxy or Nginx. Using a proxy server means that you can do not have to edit your Alfresco configuration files directly.

A client machine connects to the proxy server instead of the application server directly.  As a result, Share and Alfresco must be configured to use an externally available URL, rather than an internal machine name. This external URL can then be passed to other parts of the Share application; for example, when Share creates a link to Alfresco Office Services for online editing.

For security reasons, configure your proxy to forward only requests to the resources that you want to expose to the outside world. In this scenario, the applications need to use the internal machine name when talking to each other but use the external name when creating links for the user.

1.  Set your proxy to forward the following URL extensions to Alfresco:

    ```
    /share  
    /share/*
    /alfresco/api/*/public/cmis/versions/*
    /alfresco/api/*/public/alfresco/versions/*
    /alfresco/api/cmis/versions/*
    /alfresco/service/api/server
    /alfresco/cmisatom/*
    /alfresco/service/cmis/*
    ```

2.  If you are using WebDAV, add these URL extensions to your proxy:

    ```
    /alfresco/webdav  
    /alfresco/webdav/*
    ```

3.  For Alfresco Office Services, add these URL extensions to your proxy:

    ```
    /_vti_inf.html
    /_vti_bin/*
    /alfresco/aos
    /alfresco/aos/*
    ```

    and for `OPTIONS` and `PROPFIND` requests:

    ```
    /
    /alfresco
    /alfresco/
    ```

4.  Block requests with these URL patterns:

    ```
    /share/*/proxy/alfresco/api/solr/*
    /share/-default-/proxy/alfresco/api/*
    ```

    The communication between Solr and Alfresco is, by default, protected by SSL. These patterns need to be explicitly blocked to protect the API endpoints.

5.  Edit the alfresco-global.properties file with these values:

    ```
    alfresco.context=alfresco
    alfresco.host=<external-proxy-host-name>
    alfresco.port=443
    alfresco.protocol=https
    share.context=share
    share.host=<external-proxy-host-name>
    share.port=443
    share.protocol=https
    opencmis.context.override=true
    opencmis.context.value=
    opencmis.servletpath.override=true
    opencmis.servletpath.value=
    opencmis.server.override=true
    opencmis.server.value=https://<external-proxy-host-name>
    ```

    **Note:** Port 443 and the HTTPS protocol settings must be enabled in alfresco-global.properties in Alfresco and Share. This is because if a proxy is serving `https`, and then proxying back to Tomcat using `http`, Tomcat determines that HTTP traffic is being served. This in turn informs the applications running in Tomcat that they are serving traffic over HTTP, and when Share or Alfresco internally generate URLs for page assets, they are generated with an `http` link \(when the client browser expects `https`\). Setting these properties:

    ```
    alfresco.port=443
    alfresco.protocol=https
    share.port=443
    share.protocol=https
    ```

    ensures that the applications generate URLs as HTTPS links.

6.  If you are using a proxy server other than Apache with AJP, follow these steps:

    1.  Add this line to your alfresco-global.properties file:

        ```
        aos.baseUrlOverwrite=https://<external-proxy-host-name>/alfresco/aos
        ```

    2.  Configure proxy redirect responses sent by the application server.

        The server behind the proxy uses the `http` schema because it is not aware of SSL. Here is an example of an nginx configuration:

        ```
        proxy_redirect http://example.com/alfresco/ https://example.com/alfresco/;
        ```

        **Note:** The `proxy_redirect` configuration shows the change from `http` to `https`.

7.  Use the following sample httpd.conf configuration file for Apache HTTP Server:

    ```
    # -------
    # General
    # -------
    
    ServerName  **yourserver.example.com**
    PidFile     **/path/to/your/http.pid**
    ErrorLog    **/path/to/your/apache/log/error\_log**
    LogLevel    info
    
    LoadModule  unixd_module       **/path/to/your/apache/modules/mod\_unixd.so**
    LoadModule  authn_core_module  **/path/to/your/apache/modules/mod\_authn\_core.so**
    LoadModule  authz_host_module  **/path/to/your/apache/modules/mod\_authz\_host.so**
    LoadModule  authz_core_module  **/path/to/your/apache/modules/mod\_authz\_core.so**
    LoadModule  rewrite_module     **/path/to/your/apache/modules/mod\_rewrite.so**
    
    <IfModule unixd_module>
        User _www
        Group _www
    </IfModule>    
    
    # ------------------
    # Block API requests
    # ------------------
    
    LoadModule     rewrite_module      **/path/to/your/apache/modules/mod\_rewrite.so**
    RewriteEngine  on
    RewriteBase    /
    RewriteRule    ^/share/(.*)/proxy/alfresco/api/solr/(.*)$   -   [F]
    RewriteRule    ^/share/-default-/proxy/alfresco/api/(.*)$   -   [F]
    
    
    # -------
    # Proxy
    # --------
    
    LoadModule     jk_module **/path/to/your/apache/modules/mod\_jk.so**
    JkWorkersFile  **/path/to/your/workers.properties**
    JkLogFile      **/path/to/your/apache/log/mod\_jk.log**
    JkLogLevel     info
    JkShmFile      **/path/to/your/apache/log/jk-runtime-status**  
    
    
    # -------
    # SSL
    # --------
    
    LoadModule ssl_module **/path/to/your/apache/modules/mod\_ssl.so**
    Listen 443
    <VirtualHost *:443>
        SSLEngine           on
        SSLProtocol         all -SSLv2
        SSLCipherSuite      HIGH:!aNULL:!MD5
        SSLVerifyClient     none
        SSLCertificateFile  **/path/to/your/certificate.pem**
        ErrorLog            **/path/to/your/apache/log/ssl\_error\_log**
        LogLevel            warn
        JkMount /share alfresco-worker
        JkMount /share/* alfresco-worker
        JkMount /alfresco/webdav alfresco-worker
        JkMount /alfresco/webdav/* alfresco-worker
        JkMount / alfresco-worker
        JkMount /_vti_inf.html alfresco-worker
        JkMount /_vti_bin/* alfresco-worker
        JkMount /alfresco alfresco-worker
        JkMount /alfresco/ alfresco-worker
        JkMount /alfresco/aos alfresco-worker
        JkMount /alfresco/aos/* alfresco-worker 
        JkMount /alfresco/images/* alfresco-worker 
        JkMount /alfresco/css/* alfresco-worker    
        # Un-comment these lines for public API access
        # JkMount /alfresco/api/*/public/cmis/versions/* alfresco-worker
        # JkMount /alfresco/api/*/public/alfresco/versions/* alfresco-worker
        # JkMount /alfresco/service/api/server alfresco-worker     
        # JkMount /alfresco/cmisatom/* alfresco-worker     
        # JkMount  /alfresco/service/cmis/* alfresco-worker
        # JkMount /alfresco/api/cmis/versions/* alfresco-worker
        # Un-comment these lines for Desktop Sync
        # JkMount /alfresco/api/*/private/alfresco/versions/* alfresco-worker
    </VirtualHost>
    ```

    This configuration file has been tested with Apache httpd 2.4. Replace the values in **bold** font with the file names and directories that are relevant to your system.

8.  Use the following sample worker.properties configuration file for Apache HTTP Server:

    ```
    worker.list=alfresco-worker
    worker.alfresco-worker.port=8009
    worker.alfresco-worker.host=**your-internal-alfresco-host-name**
    worker.alfresco-worker.type=ajp13
    worker.alfresco-worker.lbfactor=1
    ```

    In this example, Apache is configured to accept strong encryption only. Adapt SSLCipherSuite if this causes you problems.


**Parent topic:**[Secure Sockets Layer \(SSL\) and the Alfresco repository](../concepts/configure-ssl-intro.md)

