---
author: Alfresco Documentation
---

# Cross-Site Request Forgery \(CSRF\) filters for Repository

You can configure the repository in Alfresco Content Services with a filter to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.

The CSRF filter can be configured in the [web-client-security-config.xml](https://github.com/Alfresco/acs-packaging/blob/master/war/src/main/resources/alfresco/web-client-security-config.xml#L61) file, which is located in the `alfresco.war` file \(see `tomcat/webapps/alfresco/WEB-INF/classes/alfresco/web-client-security-config.xml`\). To override values in this file, create a file called `web-scripts-config-custom.xml` in the `tomcat/shared/classes/alfresco/extension` directory with the updated configuration.

For example, to disable the CSRF filter all together, create the file and add the following configuration to it:

```
<alfresco-config>
    <config evaluator="string-compare" condition="CSRFPolicy" replace="true">
        <filter/>
    </config>
</alfresco-config>
```

Restart the server for the changes to take effect. There is no need to update the `alfresco.war` file.

If you want to configure the CSRF filter and allow a specific domain and port to access the server, then copy the original configuration from [web-client-security-config.xml](https://github.com/Alfresco/acs-packaging/blob/master/war/src/main/resources/alfresco/web-client-security-config.xml#L61) to `web-scripts-config-custom.xml` and then make necessary changes. Ensure that it is replacing the out-of-the-box configuration section:

```
 <config evaluator="string-compare"
      condition="CSRFPolicy" **replace="true"**> 
```

For example, when running Alfresco Content Services behind a reverse proxy, such as Nginx, and accessing Admin Console at `http://localhost/alfresco/service/enterprise/admin`, configure the CSRFPolicy filter as follows \(add your rule as the first child of the <filter\>  element\):

```
<alfresco-config>
  <config evaluator="string-compare" condition="CSRFPolicy" replace="true">
    <session>true</session>

    <properties>
      <token>alf-csrftoken</token>
      <referer>http://localhost/.*</referer>
      <origin>http://localhost</origin>
    </properties>

    <client>
      <cookie>{token}</cookie>
      <header>{token}</header>
      <parameter>{token}</parameter>
    </client>

    <!-- The first rule with a matching request will get its action invoked, the remaining rules will be ignored. -->        
    <filter>
     <rule>
      <request>
        <method>POST</method>
        <path>/page/trusted/call/1|/page/trusted/call/2</path>
      </request>
      <action name="assertReferer">
        <param name="always">false</param>
        <param name="referer">{referer}</param>
      </action>
      <action name="assertOrigin">
        <param name="always">false</param>
        <param name="origin">{origin}</param>
      </action>
    </rule>

    <!-- Refresh token on each new page visit -->
    <rule>
      <request>
        <method>GET</method>
        <path>/service/enterprise/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
       </action>
    </rule>

    <rule>
      <request>
        <method>GET</method>
        <path>/s/enterprise/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>GET</method>
        <path>/wcservice/enterprise/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>GET</method>
        <path>/wcs/enterprise/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>GET</method>
        <path>/service/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>
  
    <rule>
      <request>
        <method>GET</method>
        <path>/s/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>GET</method>
        <path>/wcservice/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>GET</method>
        <path>/wcs/admin/.*</path>
      </request>
      <action name="generateToken">
        <param name="session">{token}</param>
        <param name="cookie">{token}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>POST</method>
        <header name="Content-Type">multipart/.+</header>
      </request>
      <action name="assertToken">
        <param name="session">{token}</param>
        <param name="parameter">{token}</param>
      </action>
      <action name="assertReferer">
        <param name="referer">{referer}</param>
      </action>
      <action name="assertOrigin">
        <param name="origin">{origin}</param>
      </action>
    </rule>

    <rule>
      <request>
        <method>POST|PUT|DELETE</method>
      </request>
      <action name="assertToken">
        <param name="session">{token}</param>
        <param name="header">{token}</param>
      </action>
      <action name="assertReferer">
        <param name="referer">{referer}</param>
      </action>
      <action name="assertOrigin">
        <param name="origin">{origin}</param>
      </action>
    </rule>
  </filter>
</config>
</alfresco-config>
```

**Parent topic:**[Alfresco Repository Security policies and filters](../concepts/repository-security-policies-filters.md)

