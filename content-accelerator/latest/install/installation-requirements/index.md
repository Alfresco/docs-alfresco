---
title: Installation Requirements
---

The server setup required to run ACA vary based on client needs as well as the type of ACA being installed.  Below are some general guidelines and TSG recommendations.

**Application Components for Every Installation**
- ACA - web application
- OpenContent Services - web services layer.  See the [OpenContent Services Install Guide](https://github.com/tsgrp/OpenContent/wiki/Installation-guide) for information specific to OpenContent Services.
- Java Application server - required to run OpenContent Services and potentially ACA, AEV, and Active Wizard Admin.  TSG recommends Apache Tomcat 8.x or above.

**Server Requirements**
- Both physical and virtual servers are acceptable.  TSG clients have used Windows, Linux and UNIX servers in production successfully.
- TSG recommends 64-bit architecture servers
- Application servers can be load balanced for performance as well as HA/DR, however *sticky sessions* are required.  In other words, if a user accesses ACA on Server A, that instance must communicate with the same OpenContent Services for the entire session.
- ACA can be installed as a Java web application (WAR) or as a JavaScript application on the web server.  If Single Sign-On (SSO) is required, then ACA must be installed as a WAR to a Java application server.
- As always, the more RAM the better.  TSG typically recommends a minimum of 4GB of heap on the application server.  At least 8GB is preferable.
- When running older versions of OpenContent Services on Java 7 or lower, OC requires 256MB of PermGen space in the heap.  See the [OpenContent Memory Requirements](https://github.com/tsgrp/OpenContent/wiki/Installation-guide#memory-requirements) page.
- If OpenContent is installed on a Linux server, a TrueType Font set including Arial is required to be installed onto the instance.  Read more here: [[Installation Requirements Font Install]]

**Client Requirements**

The following web browsers are supported:
- Internet Explorer 11 and above.  Additional project time may be needed for application tweaks to support old IE versions.
- Chrome (any recent version)
- Firefox (any recent version)

The following sections discuss requirements for each of the major ACA application categories:

## Application and Web Server Requirements
Note - the following settings assume Apache HTTP and Tomcat.  Appropriate settings may be needed for other application and web servers.

### Encoded Slashes
ACA has some routes that are formatted like the following:
```
/hpi/{aca-module}/{object-id}
```
In the above case, the object ID is URL encoded.  This means that using Alfresco as a back-end, causes forward slashes in the object ID to be URL encoded to `%2F`.  By default, neither Tomcat nor Apache serve any URLs with a URL encoded forward (or back) slash.  

To work around the issue on the Alfresco Tomcat itself, add the following configuration to the to your Java Opts / CATALINA_OPTS.  To update the java options, go to {TOMCAT_HOME}/bin and run tomcat7w.exe //ES//{TOMCAT_SERVICE_NAME}

```
-Dorg.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
```

OR you can add the following to the catalina.properties in {alfresco}/tomcat/conf
```
org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
```

To work around the issue on Apache, add the following configuration to the `httpd-vhosts.conf` file for the host(s) ACA is running on:

```
AllowEncodedSlashes On
```

Please note the Apache Tomcat that ACA is running on may also require the ALLOW_ENCODED_SLASH property setting as well.

### UTF-8 Encoding

By default, Apache Tomcat doesn't support UTF-8 characters for languages other than English. To enable support, the web.xml and server.xml files need to be modified in the deployed Tomcat:

__${tomcat.home}/conf/web.xml__

Un-comment the setCharacterEncodingFilter and its mapping in web.xml

```xml
  <!-- ================== Built In Filter Definitions ===================== -->


  <!-- A filter that sets character encoding that is used to decode -->
  <!-- parameters in a POST request -->
    <filter>
        <filter-name>setCharacterEncodingFilter</filter-name>
        <filter-class>org.apache.catalina.filters.SetCharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <async-supported>true</async-supported>
    </filter>

  <!-- ==================== Built In Filter Mappings ====================== -->

  <!-- The mapping for the Set Character Encoding Filter -->
    <filter-mapping>
        <filter-name>setCharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

__${tomcat.home}/conf/server.xml__

Enable UTF-8 support for GET requests by adding ```URIEncoding="UTF-8"``` to the Tomcat connector.

```xml
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443"
               URIEncoding="UTF-8" />
    <!-- A "Connector" using the shared thread pool-->
```

Restart Tomcat for changes to take effect.

### Encoded Path and Query Characters
When running OpenContent on Tomcat 8+, the `relaxedQueryChars` and `relaxedPathChars` parameters are required on the Connector.  This can be found in __${tomcat.home}/conf/server.xml__

For example:

```xml
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443"
               URIEncoding="UTF-8"
               relaxedQueryChars="{}[]|"
               relaxedPathChars="{}[]|" />
```

If you are using Tomcat older than version 8.5 - you may need to add this to catalina.properties in your tomcat/conf folder.: ```tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}```

### Same Origin Policy
Note that ACA must be exposed on the same port as OpenContent.  In other words, if the user access ACA using  `http://myserver:8080/hpi`, then ACA must make Ajax requests to OpenContent at: `http://myserver:8080/OpenContent`.  This is due to the [Same Origin Policy](http://en.wikipedia.org/wiki/Same_origin_policy).  The easiest way to set this up is to install ACA and OpenContent to the same application server.  However, you could also deploy to different application servers but proxy all ACA and OpenContent requests through a web server such as Apache.  For example:

* Install ACA on `http://myserver1:8080/hpi`
* Install OpenContent on `http://myserver2:9090/OpenContent`
* Setup Apache to route:
  * `http://myserver3/hpi` routes to `http://myserver1:8080/hpi` 
  * `http://myserver3/OpenContent` routes to `http://myserver2:9090/OpenContent`

In the above example, ACA would be configured to access OpenContent at `http://myserver3/OpenContent`.  Now, to the browser all communication is on the same protocol, server, and port so the Same Origin Policy is upheld.

For more information on how to setup the above with Apache, see [[Front Tomcat with Apache]].

## ACA for Alfresco

**Additional Application Components**
- Alfresco Enterprise (see the [OpenContent Installation Guide](https://github.com/tsgrp/OpenContent/wiki/Installation-guide) for version information)
- Alfresco Enterprise Viewer (WAR) - required if using AEV for document annotations
- Active Wizard admin (WAR) - required if using Active Wizard for forms and workflow

**Notes**
- OpenContent Services is deployed as an Alfresco subsystem rather than a separate WAR file.
- TSG recommends installing ACA, AEV, and AW admin to a separate application server (not on the Alfresco tomcat).
- Alfresco can have high memory requirements for Solr. Review Alfresco sizing guides for your Alfresco version to ensure enough memory is allocated. See http://docs.alfresco.com/4.1/concepts/solrnodes-memory.html for 4.1.