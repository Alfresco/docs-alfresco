---
title: Share Configuration Extension Point
---

Alfresco Share provides a rich web-based collaboration environment for managing documents, wiki content, blogs and more. 
Share leverages the repository to provide content services and uses the Surf platform to provide the underlying 
presentation framework.

A number of options are available to developers and administrators for configuring Share to better fit into their environment. 
Many of these mechanisms are provided by the underlying Surf framework, therefore a knowledge of 
[Surf]({% link content-services/7.2/develop/software-architecture.md %}#surf-framework) is considered useful 
for anyone wishing to implement substantial customizations.

A lot of the customizations that you might want to do to the Share user interface does not require coding. They can be 
handled by XML configuration and a simple restart of Content Services.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description
 
The configurations typically goes into the `share-config-custom.xml` file. The following is an example of stuff that 
you can configure in this file:

* Visibility of Aspects and Types (from custom content models)
* Metadata forms (from custom content model)
* Workflow task forms
* Document Library indicators, views, actions, and metadata templates
* Visibility of workflow process definitions (that is, what workflows can be started)
* Advanced Search
* Themes
* Menu bar
* Repository location
* Sorting fields and labels
* Web Framework settings
* Data Lists
* Cross-site request forgery (CSRF) policy

Note that a lot of the other extension points that require coding also involve configuration, so it is a good idea to 
read up on the configuration bit before starting any development with the other extension points.

## Share configuration files

Share can be configured through a number of configuration files.

The main Share configuration file is `share-config.xml`. This can be found at `tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml`. 
While it is possible to change configuration through direct changes to this file this is not recommended as any 
customizations will be lost if the Share WAR is re-exploded, or you install a new version of Content Services.

To get around this issue it is advisable to make configuration changes to a file outside of the Share WAR. This can be 
done through the file `share-config-custom.xml`, which can be found at `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml`
in the default Alfresco installation. Any changes made here will be applied once the changes have been saved, and 
Content Services restarted. Further, your configuration changes can be saved between reinstalls and if the 
Share WAR re-explodes at any point your configuration file will be unaffected.

>**Note:** If you are overriding a configuration section, you must apply the `replace="true"` attribute to replace the existing Content Services configuration.

It should also be noted that it is possible to package a `share-config-custom.xml` file in a JAR or AMP. In this way you 
can have multiple `share-config-custom.xml` files packaged in JARs or AMPs if necessary. JARs will be loaded from the 
classpath, for example `./tomcat/shared/lib`. AMPs will be applied to the Share WAR file.

>CAUTION: The order in which multiple `share-config-custom.xml` files are applied is not guaranteed in the case where multiple files override the same section of configuration.

Another key Share configuration file is `slingshot-application-context.xml` which can be found at 
`tomcat/webapps/share/WEB-INF/classes/alfresco/slingshot-application-context.xml` in the default Alfresco installation. 
This loads a number of other configuration files:

```xml
﻿    <!-- Spring Web Scripts -->
<value>classpath:org/springframework/extensions/webscripts/spring-webscripts-config.xml</value>
<value>classpath:META-INF/spring-webscripts-config-custom.xml</value>
<value>jar:*!/META-INF/spring-webscripts-config-custom.xml</value>

<!-- Alfresco Surf -->
<value>classpath:org/springframework/extensions/surf/spring-surf-config.xml</value>
<value>classpath:org/springframework/extensions/surf/spring-surf-config-remote.xml</value>
<value>classpath:META-INF/spring-surf-config-custom.xml</value>
<value>jar:*!/META-INF/spring-surf-config-custom.xml</value>

<!-- Surf Autowire Support -->
<value>webapp:WEB-INF/surf.xml</value>

<!-- Common form config -->
<value>classpath:alfresco/form-config.xml</value>

<!-- Share default config -->
<value>classpath:alfresco/share-config.xml</value>

<!-- Share help url config -->
<value>classpath:alfresco/share-help-config.xml</value>

<!-- Share form config -->
<value>classpath:alfresco/share-form-config.xml</value>

<!-- Share Document Library config -->
<value>classpath:alfresco/share-documentlibrary-config.xml</value>

<!-- Share Data List form config -->
<value>classpath:alfresco/share-datalist-form-config.xml</value>

<!-- Share workflow form config -->
<value>classpath:alfresco/share-workflow-form-config.xml</value>

<!-- Share CMIS config -->
<value>classpath:alfresco/share-cmis-config.xml</value>

<!-- Share Security config -->
<value>classpath:alfresco/share-security-config.xml</value>

<!-- Share custom config -->
<value>classpath:alfresco/web-extension/share-config-custom.xml</value>
<value>jar:*!/META-INF/share-config-custom.xml</value>
<value>classpath:alfresco/web-extension/share-config-custom-dev.xml</value>
<value>jar:*!/META-INF/share-config-custom-dev.xml</value>
```

Note that the custom configuration files are loaded last, so that they can override existing configuration.

>CAUTION: configuration files with the same base file name must have different effective paths in order to be loaded. For example, if you tried to load `classes/alfresco/web-extension/share-config-custom.xml` and `WEB-INF/classes/alfresco/web-extension/share-config-custom.xml`, only one of them would be loaded, as these both have the effective path `alfresco/web-extension/share-config-custom.xml`. Note that where files are loaded from multiple JAR files, such as through `<value>jar:*!/META-INF/share-config-custom.xml</value>`, they have different effective paths, and so multiple configuration files with the same base file name can be successfully loaded in this case.

The following table summarizes the main Share configuration files:

|Configuration file|Description|Location|
|------------------|-----------|--------|
|share-config.xml|Default Share configuration file.|`classpath:alfresco`|
|slingshot-application-context.xml|Spring beans file which also loads various configuration files.|`tomcat/webapps/share/WEB-INF/classes/alfresco`|
|share-form-config.xml|Default configuration for the `cm:content` and `cm:folder` forms.|`classpath:alfresco`|
|share-datalist-form-config.xml|Default configuration for datalists.|`classpath:alfresco`|
|share-documentlibrary-config.xml|Default configuration for the document library, my files, shared files and repository pages.|`classpath:alfresco`|
|share-workflow-config.xml|Default configuration file for the Alfresco Process Services Workflow forms.|`classpath:alfresco`|

>**Note:** Usually, once you have changed a configuration file, you will need to restart Content Services for the changes to take effect.

## Setting minimum length for username and password 

This information describes how to change the minimum length of the Share user name and password.

1.  Open the `<web-extension>/share-config-custom.xml` file.

2.  Search for the text "username". You see the following configuration:

    ```xml
    <config evaluator="string-compare" condition="Users">
      <users>
         <!-- minimum length for username and password -->
         <username-min-length>2</username-min-length>
         <password-min-length>3</password-min-length>
      </users>
    </config>                                 
    ```

3.  Change the value of `<username-min-length>` and `<password-min-length>`.

## Enable mixed username types

When there is a mix of username types, for example, some using the `@domain` in their username, this may have an impact 
on the use of Share.

For example, there may be users with both the `@domain` and without:

* `user2@domain.com`
* `user1`

This configuration enables Share to function correctly when using mixed users types.

1.  Open the `<web-extension>/share-config-custom.xml` file.

2.  Add the following bean:

    ```xml
    <bean id="webframework.slingshot.persister.remote" class="org.springframework.extensions.surf.persister.PathStoreObjectPersister" parent="webframework.sitedata.persister.abstract">
        <property name="store" ref="webframework.webapp.store.remote" />
        <property name="pathPrefix"><value>alfresco/site-data/${objectTypeIds}</value></property>
        <property name="tenantObjectCache"><value>false</value></property>
    </bean>           
    ```

3.  Save the file, and restart the Alfresco server.

## Setting default port

Use this information to configure the default port configuration for Share.

1.  Open the `<web-extension>/share-config-custom.xml` file.

2.  Uncomment the following section by removing the begin comment `<--` and end comment `-->` lines surrounding this section.

    ```xml
    <config evaluator="string-compare" condition="Remote">
       <remote>
          <endpoint>
             <id>alfresco-noauth</id>
             <name>Alfresco - unauthenticated access</name>
             <description>Access to Alfresco Repository WebScripts that do not require authentication</description>
             <connector-id>alfresco</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <identity>none</identity>
          </endpoint>
    
          <endpoint>
             <id>alfresco</id>
             <name>Alfresco - user access</name>
             <description>Access to Alfresco Repository WebScripts that require user authentication</description>
             <connector-id>alfresco</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <identity>user</identity>
          </endpoint>
    
          <endpoint>
             <id>alfresco-feed</id>
             <name>Alfresco Feed</name>
             <description>Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description>
             <connector-id>http</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <basic-auth>true</basic-auth>
             <identity>user</identity>
          </endpoint>  
                
          <endpoint>
             <id>alfresco-api</id>
             <parent-id>alfresco</parent-id>
             <name>Alfresco Public API - user access</name>
             <description>Access to Alfresco Repository Public API that require user authentication.
               This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
             <connector-id>alfresco</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
             <identity>user</identity>
          </endpoint>
       </remote>
    </config>
    ```

3.  Uncomment the following section if you are using Kerberos, or external SSO, or an HTTP load balancer.

    ```xml
     <config evaluator="string-compare" condition="Remote"> 
          <remote> 
            <ssl-config>
                 <keystore-path>alfresco/web-extension/alfresco-system.p12</keystore-path>
                 <keystore-type>pkcs12</keystore-type>
                 <keystore-password> alfresco-system</keystore-password>
    
                 <truststore-path> alfresco/web-extension/ssl-truststore</truststore-path>
                 <truststore-type>JCEKS</truststore-type>
                 <truststore-password>password</truststore-password>
    
                 <verify-hostname>true</verify-hostname>
             </ssl-config>
              
             <connector> 
                <id>alfrescoCookie</id> 
                <name>Alfresco Connector</name> 
                <description>Connects to an Alfresco instance using cookie-based authentication</description> 
                <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class> 
             </connector> 
              
             <endpoint> 
                <id>alfresco</id> 
                <name>Alfresco - user access</name> 
                <description>Access to Alfresco Repository WebScripts that require user authentication</description> 
                <connector-id>alfrescoCookie</connector-id> 
                <endpoint-url>http://localhost:8080/alfresco/wcs</endpoint-url> 
                <identity>user</identity> 
                <external-auth>true</external-auth> 
             </endpoint> 
                
             <endpoint>
                <id>alfresco-api</id>
                <parent-id>alfresco</parent-id>
                <name>Alfresco Public API - user access</name>
                <description>Access to Alfresco Repository Public API that require user authentication.
                  This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                <connector-id>alfresco</connector-id>
                <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                <identity>user</identity>
                <external-auth>true</external-auth>
             </endpoint> 
          </remote> 
       </config> 
    ```

4.  Replace all instances of 8080 with the required port number.

5.  Save the file.

## Removing persistent cookies

Use this information to turn off cookies that store a username after a session expires.

By default, a cookie is stored that allows you to repopulate the user name after a user logs out, or the session expires. 
Follow these instructions if you do not want this user name stored.

1.  Open the following file: `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml`

2.  Set the `enableCookie` property to `false`.

    ```xml
    <config evaluator="string-compare" condition="Cookie" replace="true">
      <cookie>
           <enableCookie>false</enableCookie>
      </cookie>
    </config>
    
    ```

    and disable the login cookie:

    ```xml
    <config evaluator="string-compare" condition="WebFramework">
      <web-framework>
          <defaults>
             <login-cookies-enabled>false</login-cookies-enabled>
          </defaults>
      </web-framework>
    </config>
    ```

3.  Save the edited file.

4.  Restart Alfresco.

## Enable actions when using Smart Folders

Share actions are disabled by default when using Smart Folders in Content Services.

If you need to enable Share actions, these must be explicitly set in the following files:

* `<configRootShare>/classes/alfresco/share-documentlibrary-config.xml`: these are Share standard defaults, do not modify them
* `<classpathRoot>/alfresco/web-extension/share-config-custom.xml`: for standard Share actions
* `<classpathRoot>/alfresco/web-extension/smartfolders-amp-actions-config.xml`: for custom module actions and Google Docs

For example:

```xml
<action index="100" id="document-download" appendEvaluators="true">
    <evaluator>evaluator.doclib.action.DocumentEnableInSmartFolder</evaluator> 
</action> 
```

In each file, you can find the new evaluators to enable actions in the `actionGroups` section:

* `DocumentEnableInSmartFolder`: enable action for documents in a Smart Folder
* `FolderEnableInSmartFolder`: enable action for folders in a Smart Folder
* `SmartFolderEnable`: enable action for Smart Folders
* `FolderAndSmartFolderEnable`: enable action for folders and Smart Folders

Action limitations on Smart Folders include:

* Alfresco permissions apply when viewing objects in a Smart Folder (permissions on the object are required)
* Alfresco permissions apply when viewing a Smart Folder (permissions on the physical parent folder are required)
* Suppressed actions in Share: Comment, Like, Favorite
* Unsupported actions: Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy
* Rules can't be used on a Smart Folder
* Permissions can't be set on a Smart Folder

## Enabling External Users panel

The External Users panel is disabled by default in Alfresco Share. Use this information to enable this panel to add external users.

1.  Open the `<web-extension>/share-config-custom.xml` file.

2.  Add the following section to the `share-config-custom.xml` file.

    ```xml
    <config evaluator="string-compare" condition="Users" replace="true">
       <enable-external-users-panel>true</enable-external-users-panel>
    </config>
    ```

This implementation enables the External Users panel in the Share user interface.

>**Note:** External users are a way for users without Administrator permissions to add a user to Content Services. When they accept the invite they will have the same access as a standard user, and will be counted against licensing.

## Share Document Library {#sharedoclib}

The Share document library is a feature that gives full access to the Content Services repository.

The default content structure for Share is based on sites, and this does not give full visibility of the content in the 
repository. By enabling the document library configuration setting, you have access to multiple navigation options, for 
example, folders and categories, tags, and filters. This feature also allows you to recreate and edit text files, 
for example, within the Data Dictionary.

It is possible to copy or move files to the document library without any repository permissions.

The document library is accessed in Share through the **Repository**, **My Files**, and **Shared Files** links in the 
header, and through the **Document Library** link in a site. These all kind different views of the complete content repository.

### Configuring the Repository link

It is possible to control the visibility of the **Repository** link in Share through configuration. Note the **Repository** 
link is always visible to Administrators.

1.  Load the file `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml` into your favorite editor (assuming you are using the Tomcat application server).

2.  Locate the `Repository Library config` section:

    ```xml
       <!-- Repository Library config section -->
       <config evaluator="string-compare" condition="RepositoryLibrary" replace="true">
          <!--
             Root nodeRef or xpath expression for top-level folder.
             e.g. alfresco://user/home, /app:company_home/st:sites/cm:site1
             If using an xpath expression, ensure it is properly ISO9075 encoded here.
          -->
          <root-node>alfresco://company/home</root-node>
    
          <tree>
             <!--
                Whether the folder Tree component should enumerate child folders or not.
                This is a relatively expensive operation, so should be set to "false" for Repositories with broad folder structures.
             -->
             <evaluate-child-folders>false</evaluate-child-folders>
             
             <!--
                Optionally limit the number of folders shown in treeview throughout Share.
             -->
             <maximum-folder-count>500</maximum-folder-count>
          </tree>
    
          <!--
             Whether the link to the Repository Library appears in the header component or not.
          -->
          <visible>true</visible>
       </config>
    ```

3.  The configuration that can make the **Repository** link visible or invisible for non-administrators is the following:

    ```xml
      <visible>false</visible>                
    ```

    Set to `true` to have the Repository link available to all users.

4.  Restart the Content Services server.

### Configuring aspects {#configaspects}

Aspects can be configured in the file `./tomcat/webapps/share/WEB-INF/classes/alfresco/share-documentlibrary-config.xml`.

Aspects can be added to any document in the repository. Examples of aspects include `taggable`, `exif`, and `versionable`. 
There are many others. Each aspect can be configured as visible, hidden, addable, and removable.

1.  Load the file `share-documentlibrary-config.xml` into your favorite editor.

2.  Search for the text "aspects". You will find the following configuration:

    ```xml
      <!--
         Used by the "Manage Aspects" action and Rules pages

         For custom aspects, remember to also add the relevant i18n string(s)
            aspect.cm_myaspect=My Aspect
      -->
      <aspects>

         <!--
            Aspects that a user can see in UI.
            Used by Rules, aspects are the listed aspects for rule's "has-aspect" action condition.
         -->
         <visible>
            <aspect name="cm:generalclassifiable" />
            <aspect name="cm:complianceable" />
            <aspect name="cm:dublincore" />
            <aspect name="cm:effectivity" />
            <aspect name="cm:summarizable" />
            <aspect name="cm:versionable" />
            <aspect name="cm:templatable" />
            <aspect name="cm:emailed" />
            <aspect name="emailserver:aliasable" />
            <aspect name="cm:taggable" />
            <aspect name="app:inlineeditable" />
            <aspect name="cm:geographic" />
            <aspect name="exif:exif" />
            <aspect name="audio:audio" />
            <aspect name="cm:indexControl" />
            <aspect name="dp:restrictable" />
         </visible>

         <!--
            Aspects that a user can add in UI.
            Used by Rules, aspects are the listed aspects for rule's "add-features" action.
            Same as "visible" if left empty.
         -->
         <addable>
         </addable>

         <!--
            Aspects that a user can remove in UI.
            Used by Rules, aspects are the listed aspects for rule's "remove-features" action.
            Same as "visible" if left empty
         -->
         <removeable>
         </removeable>
      </aspects>
    ```

3.  Modify the configuration of aspects as required.

You have seen how to configure aspects via the document library configuration file. You can also add similar 
configurations to `share-config-custom.xml`.

### Extending the Alfresco Share Document Library

Alfresco Share offers a number of extension points for the document library. 

This includes:

* Repository tier
* Web tier
* Status indicators
* Metadata templates
* Actions
* Client-side extension points

This documentation also includes a `jsNode` client-side help object reference and a list of out-of-the-box evaluators.

#### Document Library repository tier

In order to preserve existing customizations and third party add-ons, a parallel set of data web scripts has been 
developed to coexist with the previous data web scripts. These web scripts are located in the `remote-api` project and 
have URLs starting with `/slingshot/doclib2/`.

There are three extension points supported by the repository data web scripts.

##### Document Library custom response

A custom response appears within the `metadata.custom` section of the JSON response. An example of a cleanly installed 
service is the `vtiServer` configuration, defined within the slingshot-context.xml file.

The `customResponses` property defines a map of JSON key to custom response bean within the 
`SlingshotDocLibCustomerResponse` bean definition.

Default `slingshotDocLibCustomResponse` bean configuration:

```xml
<bean id="slingshotDocLibCustomResponse"
       parent="baseJavaScriptExtension"
       class="org.alfresco.repo.jscript.SlingshotDocLibCustomResponse">
  <property name="extensionName">
     <value>slingshotDocLib</value>
  </property>
  <property name="<b>customResponses</b>">
    <map>
       <entry key="vtiServer">
          <ref bean="doclibCustomVtiServer"/>
       </entry>
    </map>
  </property>
</bean>
```

The bean for returning the **vtiServer** configuration is defined as:

```xml
<bean id="doclibCustomVtiServer" class="org.alfresco.repo.jscript.app.VtiServerCustomResponse">
    <property name="scriptUtils">
        <ref bean="utilsScript" />
    </property>
    <property name="sysAdminParams">
        <ref bean="sysAdminParams" />
    </property>
    <property name="port">
        <value>${vti.server.external.port}</value>
    </property>
    <property name="host">
        <value>${vti.server.external.host}</value>
    </property>
</bean>
```

The `VtiServerCustomResponse` class (which implements `CustomResponse`) returns a Serializable object (for example a `LinkedHashMap`) 
that is serialized into the JSON response by the DocLib web scripts.

This extension point is designed to return useful information that is not specific to any node, for example, the presence 
of an optional module; whether a subsystem is active or not, etc.

##### Property decorators

The other place the data web scripts may be extended is via the property decorator extension mechanism.

To add a new property decorator, the baseDecorator bean needs to be extended with the property decorator you wish to use. For example:

```xml
<bean id="customPropertyDecorator" parent="baseDecorator" class="org.alfresco.repo.jscript.app.UsernamePropertyDecorator">
    <property name="nodeService" ref="nodeService"/>
    <property name="personService" ref="PersonService" />
    <property name="propertyNames">
      <set>
        <value>ds:uploader</value>
      </set>
    </property>
</bean>  
```

##### Permissions list

The third place the data web script response can be extended is by using the list of permissions that are returned for 
each node. These are defined by using the `userPermissions` property on the `applicationScriptUtils` bean. For example:

```xml  
<property name="<b>userPermissions</b>">
  <list>
      <value>CancelCheckOut</value>
      <value>ChangePermissions</value>
      <value>CreateChildren</value>
      <value>Delete</value> 
      <value>Write</value>
  </list>
</property>
```

The default set of permissions should not be reduced without fully understanding the impact on actions, indicators, and 
metadata evaluators already in use throughout Share.

#### Document Library web tier {#doclibconfig}

In versions of Alfresco Share previous to 4.0, the client-side JavaScript requested JSON data from the repository directly 
by using the proxy servlet. From 4.0 onwards, there is a new data web script (at `/components/documentlibrary/data/`) that 
requests data from the repository and processes the response based on a configurable set of evaluators before finally 
returning JSON data to the browser.

All configuration for, and evaluation of, Document Library status indicators, metadata templates, and actions is on the 
web tier instead of split between the repository and the browser.

##### Web tier configuration overview

The individual action configuration files (for example `documentlist.get.config.xml`, `document-details.get.config.xml`) 
have been removed and all actions are now defined within common configuration sections.

The new or altered areas of configuration in `share-documentlibrary-config.xml` are:

* **DocumentLibrary**
    * New `<indicators>` section for configuring status indicators
    * New `<metadata templates>` for configuring the metadata displayed within the Document Library's "browse" view
* **DocLibActions**
    * `<actions>` section defining all available actions across the various Document Library view pages
    * `<actionGroups>` that define which (and in what order) actions are to appear on the Document Library pages
* **DocLibCustom**
    * `<dependencies>` section for defining custom client-side functionality and stylesheets

The `slingshot-documentlibrary-context.xml` file contains all bean definitions for web tier evaluators.

##### Status indicators

Defined within the `DocumentLibrary` config section, status indicators are small icons 
typically used to indicate the presence of a marker aspect, or whether a document is in a particular state, for example checked out for editing.

(![status-indicators]({% link content-services/images/status-indicators.png %})

Indicator images by default are referenced by id: `/res/components/documentlibrary/indicators/{id}-16.png` unless the 
name is overridden by the “icon” attribute. Tooltip labels are also defaulted by id: `status.{id}` and can be overridden 
by the `label` attribute.

The status indicators are located in the `<indicators>` config container element with the following structure:

```xml
<indicator id (index) (icon) (label)>
    <evaluator />
    <labelParam index />
    <override />
</indicator>
```

where:

* `<indicator>`: Status indicator element with the following attributes: 
    * `id`: Unique indicator id
    * `index`: Determines display order of this indicator
    * `icon`: Icon filename; if not specified, `id` is used
    * `label`: Tooltip i18 label; if not specified, `id` is used
* `<evaluator>`: Bean id of evaluator that determines the visibility of the image. The Evaluator extends `org.alfresco.web.evaluator.BaseEvaluator`
* `<labelParam>`: Allows placeholder values within i18n label to be replace at runtime with node properties. The value is the replacement string or dot notation path to a node property. The attribute is:
    * `index`: Index of placeholder value with i18n message.
* `<override>`: Allows this indicator to override (hide) other indicators that would otherwise be visible. The value is the id of another indicator to override.

**Example config**

```xml
<config evaluator="string-compare" condition="DocumentLibrary">
...
    <indicator id="google-docs-locked" index="10">
        <evaluator>evaluator.doclib.indicator.googleDocsLocked</evaluator>
        <labelParam index="0">{jsNode.properties.owner.displayName}</labelParam>
        <labelParam index="1">{jsNode.properties.owner.userName}</labelParam>
        <override>locked</override>
    </indicator>
</config>
```

A note about the `labelParam` `value`: refactoring on the client-side (JavaScript code) means that a common helper object 
is available for each node within the Document Library during the rendering cycle, namely `jsNode`. A full reference for 
this new resource is in [jsNode reference.]({% link content-services/7.2/develop/reference/share-document-library-ref.md %}#jsnoderef)

##### Metadata templates

The metadata template refers to the section of the document "browse" page under the file name. This area can be customized 
with node properties and/or by custom rendering functions.

![metadata-template]({% link content-services/images/metadata-template.png %})

In a clean install, there are two templates defined: the `default` (fallback) template and one used when rendering 
working copies. These are both defined within `share-documentlibrary-config.xml` and can be extended or overridden as 
required (by using `share-config-custom.xml`).

The metadata templates are located in the `<metadata-templates>` config container element with the following structure:

```xml
<template id>
    <evaluator />
    <line id (index) (simpleView) (evaluator) />
    <override />
</template>
```

where:

* `<template>`: Template element with the following attribute: 
    * `id`: Unique template id
* `<evaluator>`: Bean id of evaluator that determines whether the template is to be used for this node or not. The Evaluator extends `org.alfresco.web.evaluator.BaseEvaluator`
* `<line>`: Allows placeholder values within i18n label to be replace at runtime with node properties. The value refers either to a node property (such as `cm_description`) or a customer JavaScript renderer. To add a label in front of the property, add the label's i18n messageId after the property value, separated by a space (such as {`cm_description details.description`}. The attributes are:
    * `id`: Id of the line within the template. Must be unique within this template.
    * `index`: Optional index for ordering the lines when rendering.
    * `view`: If set to "simple" or "detailed", then this line will only be rendered when either the simple or detailed view is toggled on, respectively. Leave empty, or omit the attribute for both views.
    * `evaluator`: Optional evaluator to determine whether this line will be rendered for a node when using the template.

**Example config**

```xml
<config evaluator="string-compare" condition="DocumentLibrary">
...
    <template id="isPhoto">
       <evaluator>evaluator.doclib.metadata.hasExif</evaluator>
       <line index="10" id="date" view="detailed">{date}{size}</line>
       <line index="20" id="exposure" evaluator="evaluator.doclib.metadata.hasExposure">
          {exposure exif.label.exposure}
       </line>
       <line index="30" id="description" view="detailed">{description}</line>
       <line index="40" id="social" view="detailed">{social}</line>
    </template>
</config>
```

**Custom JavaScript renderers**

A renderer can either be a simple property value, or use a custom JavaScript renderer. To register a custom renderer, 
fire a Bubbling (global) event, passing-in the renderer id and the rendering function:

```javascript
if (Alfresco.DocumentList)
{
    YAHOO.Bubbling.fire("registerRenderer",
    {
        propertyName: "renderer id",
        renderer: function(record, label)
        {
           return "...";
        }
    });
}
```

The rendering function should return property escaped HTML.

##### Actions

Actions are defined globally in the `share-documentlibrary-config.xml` file, in the `DocLibActions` config section. 
This means they can be overridden and extended by using a `share-config-custom.xml` file. These customizations can be 
by using the AMP, JAR or web-extension folder mechanism, or a mixture of all three.

Actions are also now grouped by view type instead of node “state”.

![doclib-actions]({% link content-services/images/doclib-actions.png %})

The actions are located in the `<actions>` config container element with the following structure:

```xml
<action id type (icon) label>
    <param name />
    <evaluator negate />
    <permissions>
      <permissions allow />
    </permissions>
    <override />    
</action>        
```

where:

* `<action>`: Action config container element with the following attributes: 
    * `id`: Unique action id
    * `type`: Action type. Javascript, link, and pagelink are supported
    * `icon`: Optionally, override the icon name. If not set, the ID is used
    * `label`: The action's i18n message ID
* `<param>`: Action parameter elements with the following attribute: 
    * `name`: Parameter name
* `<evaluator>`: Bean ID of evaluator that determines whether the action is valid for this node or not. Evaluator extends `org.alfresco.web.evaluator.BaseEvaluator` and contains the following attribute: 
    * `negate`: If set to `true`, the output of the evaluator is inverted.
* `<permissions>`: Permission config container element.
* `<permission>`: List of permissions required for the actions, as defined in the `applicationScriptUtils` bean config with the following attributes:
    * `allow`: If the permission specifies, the action is allowed.
    * `deny`: If the permission specifies, the action is hidden.
    * Only one of the "allow" or "deny" permissions can be specified
* `<override>`: If this action should override the visibility of other actions, they are specified using this element.

**Example config**

```xml
<config evaluator="string-compare" condition="DocLibActions">
...
    <!-- Inline edit -->
    <action id="document-inline-edit" type="pagelink" label="actions.document.inline-edit">   
       <param name="page">inline-edit?nodeRef={node.nodeRef}</param>
       <permissions>
         <permission allow="true">Write</permission>   
       </permissions>  
       <evaluator>evaluator.doclib.action.inlineEdit</evaluator>
    </action>
</config>
```

```xml
<!-- Checkin from Google Docs -->
<config evaluator="string-compare" condition="DocLibActions">
...
    <action id="document-checkin-from-googledocs" type="javascript" label="actions.document.checkin-google">
         <param name="function">onActionCheckinFromGoogleDocs</param>  
         <evaluator>evaluator.doclib.action.googleDocsCheckIn</evaluator>  
         <override>document-checkout-to-googledocs</override>
    </action>
</config>
```

An action can be disabled across the whole application using the following configuration. 
For example the following config removes the "Upload New Version" action from users.

```xml
<config evaluator="string-compare" condition="DocLibActions">
...
   <actions>
      <action id="document-upload-new-version">
          <evaluator>evaluator.doclib.action.disableAction</evaluator>
      </action>
   </actions>
</config>
```

Add an evaluator, used on an out-of-the-box action:

```xml
<config evaluator="string-compare" condition="DocLibActions">
   <actions>
      <action id="document-publish">
          <evaluator negate="true">wcmqs.evaluator.doclib.action.isWebsiteContainerType</evaluator>
      </action>
   </actions>
</config>
```

##### Action groups

Actions are grouped using the `actionGroup` elements. The type of node and also the view currently in use determines 
the actual group used. The group is calculated by the `calculateActionGroupId()` function in `surf-doclist.lib.js` and is 
designed to be overridden if many new and/or altered actions are required.

The action groups defined in a default installation are:

|Action Group ID|Default Usage|
|---------------|-------------|
|document-browse|Documents on the browse page|
|document-details|Document on the document details page|
|folder-browse|Folders on the browse page|
|folder-details|Folders on the folder details page|
|document-link-browse|Links to documents on the browse page|
|document-link-details|Links to folders on the document details page|
|folder-link-browse|Links to folders on the browse page|
|folder-link-details|Links to folders on the folder details page|

The action groups are located in the `<actionGroups>` config container element with the following structure:

```xml
<actionGroup id>
    <action />  
</actionGroup>
```

where:

* `<actionGroup>`: Action group config container element with the following attribute: 
    * `id`: Unique action group ID
* `<action>`: Action element with the following mandatory attribute:
    * `id`: Reference to action as defined in `<actions>` config section

Other actions properties can be overridden here, although it is recommended from a maintenance view to only override 
"simple" properties like the icon and label. These make it possible to reuse an action with document-biased icon and 
label to be used for folders.

**Example config**

```xml
<config evaluator="string-compare" condition="DocLibActions">
...
    <actionGroup id="folder-browse">
        <action index="100" id="folder-view-details" />  
        <action index="110" id="folder-edit-properties" icon="folder-edit-properties" />
        <label="actions.folder.edit-metadata" />
    </actionGroup>
</config>        
```

##### Custom client extensions 

The `DocLibCustom` config section is where dependencies on custom client-side assets can be defined. These are defined 
in exactly the same way as for custom Forms dependencies.

The client-side dependencies are located in the `<dependencies>` config container element with the following structure:

```xml
<css src />  
<js src />        
```

where:

* `<css>`: Stylesheet dependencies element with the following attribute: 
    * `src`: Path to the css file, relative to the `/res` servlet
* `<js>`: JavaScript dependencies element with the following attribute: 
    * `src`: Path to the js file, relative to the `/res` servlet

Other actions properties can be overridden here, although it is recommended from a maintenance point of view to only 
override "simple" properties like the icon and label. These make it possible to reuse an action with document-biased 
icon and label to be used for folders.

**Example config**

```xml
<config evaluator="string-compare" condition="DocLibCustom">   
    <dependencies>
        <css src="/custom/my-customization.css" />  
        <js src="/custom/my-customization.js" /> 
    </dependencies>
</config>
```

#### Client-side template and action extensions

Two global events are available to make it easier to add new metadata template renderers and client-side action handlers.

##### Metadata template renderer

Custom client renderers are registered with the Document Library using the new `registerRenderer` Bubbling event.

Ensure the client-side assets are loaded onto the page using the `DocLibCustom` / dependencies configuration section.

Using the example to add a new EXIF metadata renderer to produce the output as follows.

![doclib-metadata-template-renderer]({% link content-services/images/doclib-metadata-template-renderer.png %})

Giving the renderer an `id` of exposure also extends the metadata templates using a custom line config:

```xml
<line index="20" id="exposure">{exposure exif.label.exposure}</line>
```

The JavaScript to register the custom renderer is then as follows. Note the event name, the event property names and 
where the custom renderer id is specified.

```javascript
YAHOO.Bubbling.fire("registerRenderer",
{
  propertyName: "exposure",
  renderer: function exif_renderer(record, label)
  {      
  ...      
     return html;
  }
  });
```

See [EXIF renderer source code]({% link content-services/7.2/develop/reference/share-document-library-ref.md %}#exifrendref) for the complete source for this example.

##### Custom action handler

In a very similar way to metadata renderers, new client-side actions are registered using the **registerAction** 
Bubbling event message.

```javascript
YAHOO.Bubbling.fire("**registerAction**",
{   
  actionName: "onActionPreviewWebAsset",
  fn: function WCMQS_onActionPreviewWebAsset(record)
  {      
  ...      
  }
});
```

#### Customizing document library views {#customizedoclibviews}

Within the document library it is possible to select from a number of views. It is also possible to add custom views to 
the document library through configuration in the `share-documentlibrary-config.xml` file.

When browsing content in the document library it is possible to select from a variety of views including:

* Simple
* Detailed
* Gallery
* Filmstrip
* Table
* Audio
* Media

These views are selected from the **Options** button.

The `share-documentlibrary-config.xml` file controls what views will be available as options when browsing the 
Document Library, My Files, Shared Files, and repository pages. It is also possible to use a module that provides 
evaluated configuration to have the options change based on criteria such as site name, site preset, user group, and so on.

It is possible to customize these views, and also add additional view types through configuration in the 
`share-documentlibrary-config.xml` file. These views are also present in the My Files, Shared Files and repository pages.

The views are rendered by view renderers, which have various attributes and also a block of configuration (in JSON) 
associated with them. For example:

```xml
<view-renderer id="email" iconClass="table" label="button.view.email" index="50" widget="Alfresco.DocumentListTableViewRenderer">
     <dependencies>
        <js src="components/documentlibrary/documentlist-view-detailed.js" />
        <js src="components/documentlibrary/documentlist-view-table.js" />
        <css src="components/documentlibrary/documentlist-view-table.css" />
     </dependencies>
     <json-config>
        {
           "actions": {
              "show": "true"
           },
           "indicators": {
              "show": "true"
           },
           "selector": {
              "show": "true"
           },
           "thumbnail": {
              "show": "false"
           },
           "propertyColumns": [
              {
                 "property": "cm:originator",
                 "label": "table.email.label.originator",
                 "link": "true"
              },
              {
                 "property": "cm:subjectline",
                 "label": "table.email.label.subjectline",
                 "link": "true"
              },
              {
                 "property": "cm:sentdate",
                 "label": "table.email.label.sentdate"
              },
              {
                 "property": "cm:addressee",
                 "label": "table.email.label.addressee"
              },
              {
                 "property": "cm:addressees",
                 "label": "table.email.label.addressees"
              },
              {
                 "property": "cm:attachments",
                 "label": "table.email.label.attachments"
              }
           ]
        }
     </json-config>
  </view-renderer>  
```

The following snippet shows a custom simplified view called “minimalist”:

```xml
    <view-renderer id="minimalist" iconClass="table" label="button.view.minimalist" index="60" widget="Alfresco.DocumentListTableViewRenderer">
      <dependencies>
        <js src="components/documentlibrary/documentlist-view-simple.js" />
        <js src="components/documentlibrary/documentlist-view-table.js" />
        <css src="components/documentlibrary/documentlist-view-table.css" />
      </dependencies>
      <json-config>
        {
           "actions": {
              "show": "false"
           },
           "indicators": {
              "show": "false"
           },
           "selector": {
              "show": "true"
           },
           "thumbnail": {
              "show": "false"
           },
           "propertyColumns": [
              {
                 "property": "cm:name",
                 "label": "table.minimalist.label.name",
                 "link": "true"
              }
           ]
        }
      </json-config>
    </view-renderer>      
```

Note that the value of labels such as `table.minimalist.label.name` are set in properties files, so that multiple 
translations can be provided.

The minimalist custom view uses the Table View renderer.

There are four columns that are always present in the table, which can be hidden if required:

* actions: the menu of actions that can be performed on the document
* indicators: the set of icons that visually communicate information about the document
* selector: the check box to use when selecting multiple documents
* thumbnail: the thumbnail-sized preview of the document

All other columns must be defined in the `propertyColumns` array. The property attribute can be set to either a document 
property, such as `cm:name` or a metadata template renderer such as `size`, `tags` or `date`.

## Share themes {#sharethemeconfig}

When you run Share, the look and feel is set by a default theme. Use this information to select one of the alternative 
themes available in Share, and also how to create and use your own themes for corporate branding.

Share themes consist of a directory containing a CSS and images files, and they can be located in the theme directory 
(<`TOMCAT_HOME>/webapps/share/WEB-INF/classes/alfresco/site-data/themes`). The default theme is called `default.xml`.

The following themes are available:

* Blue theme (default)
* Light theme
* Yellow theme
* Green theme
* High contrast black
* Google Docs theme

The default theme, which comprises the CSS and image assets used across all pages, displays in a new installation.

You can also create your own themes. Take a look at the [Share Theme Extension Point]({% link content-services/7.2/develop/share-ext-points/share-themes.md %}) 
and the [Adding a custom Share Theme]({% link content-services/7.2/tutorial/share/style.md %}#addcustomtheme) tutorial.

### Selecting Share themes

Only an Administrator user can select the Share theme. Any change to the theme will affect all users of the 
Content Services instance from the next time that they log in or from a browser refresh.

The available themes are installed in the `<configRootShare>/classes/alfresco/site-data/themes` directory.

1.  On the toolbar, select the **Admin Tools** menu option and click **Application** in the Tools list.

    The Options page appears.

2.  Select the required theme from the menu:

    * **Green Theme**
    * **Yellow Theme**
    * **High Contrast Theme**
    * **Default Theme**
    * **Google Docs Theme**
    
3.  Click **Apply**.

The new theme displays in Share. The new theme persists across sessions.

### Editing a Share theme

A theme consists of some CSS files, an image directory, and a directory for assets for YUI. To create a new look, 
change the presentation.css file and, if required, replace or add images to the `/images` directory.

1.  Open the `presentation.css` file.

2.  Locate the properties at the end of the `presentation.css` file.

3.  Edit the following four properties:

    1.  `color`
    2.  `background`
    3.  `background-color`
    4.  `border`

    Any change to these properties will change the theme.

    ```text
    / Theme colors /
    .theme-color-1,
    a.theme-color-1,
    a.theme-color-1:visited,
    a.theme-color-1:hover
    {
       color: #6CA5CE;
    }
    
    .theme-color-2,
    a.theme-color-2,
    a.theme-color-2:visited,
    a.theme-color-2:hover
    {
       color: #038603;
    }
    
    .theme-color-3,
    a.theme-color-3,
    a.theme-color-3:visited,
    a.theme-color-3:hover
    {
       color: #C7DBEB;
    }
    
    .theme-color-4,
    a.theme-color-4,
    a.theme-color-4:visited,
    a.theme-color-4:hover
    {
       color: #0D3B57;
    }
    
    / Theme background colors /
     .theme-bg-color-1,
    div.theme-bg-color-1
    {
       background-color: #6CA5CE;
    }
    
     .theme-bg-color-2,
    div.theme-bg-color-2
    {
       background-color: #fffbdd;
    }
    
     .theme-bg-color-3,
    div.theme-bg-color-3
    {
       background-color: #DEE8ED;
    }
    
     .theme-bg-color-4,
    div.theme-bg-color-4
    {
       background-color: #EBEFF1;
    }
    
    .theme-bg-color-5,
    div.theme-bg-color-5
    {
       background-color: #2B6EB5;
    }
    
     .theme-bg-1
    {
       / background-image: url(images/navbar-bg.png); /
    }
    
     .theme-bg-2
    {
       / background-image: url(images/navbar-bg-2.png); /
    }
    
     / Theme border type/colors /
     .theme-border-1
    {
       border-color: #457f63;
       border-style: dotted;
    }
    
     .theme-border-2
    {
       border-color: #2B6EB5;
    }
    ```

4.  Locate the `YUI Theme Changes` section.

    This section allows changes to the YUI components.

5.  Edit the properties in this section to change the theme.

## Share Forms {#shareformsconfig}

Alfresco Share presents data view and entry forms throughout its user interface, which are built on the Surf framework. 
This framework provides a convention for implementing forms.

Content Services uses only one configuration syntax and one set of UI controls for forms throughout.

### Use of forms in Share

Forms are used in the **View Metadata** and **Edit Metadata** pages within Share.

The following screen shot shows the form component on the **Edit Metadata** page:

![FormsMetadata_edit]({% link content-services/images/FormsMetadata_edit.png %})

The content of the form is completely driven from configuration custom types, custom aspects. Their properties and 
associations can be displayed.

### Forms architecture

The forms engine consists of four major parts; the form service, form component, form configuration, and the JavaScript 
for UI component (which includes the forms runtime).

The following diagram shows a high-level architecture diagram of the forms engine.

![FormsArch]({% link content-services/images/FormsArch.png %})

The forms runtime is responsible for the execution of a form. It manages all input, validation (client or call-back), 
events, submission, and it consists of a small, lightweight JavaScript library. An unobtrusive JavaScript pattern is used, 
where behavior is added to the HTML form elements when the page loads. The forms runtime provides the following capabilities:

* Mandatory property handling
* Validation (enforceable at submission, as the user types or when a field loses focus), which includes:
    * Regular expression matching
    * String length
    * Email address
    * Is number
    * Numeric range
    * Date range
    * List of values
* Repeating fields (for handling multi-valued properties)

### Forms event sequence

When a request is made to a page containing the form component, the following sequence of events occurs.

1.  The form component looks up the form configuration for the item being requested.
2.  The form component retrieves the list of fields to display (if any) and requests a form definition for those fields and the item from the form service by using its REST API.
3.  The form service looks for a form processor that can process the kind of item.
4.  The form processor is asked to generate a form definition.
5.  The form processor executes any registered filters before and after the main processing.
6.  The REST API takes the result from the form processor/form service and constructs the form definition JSON response.
7.  The form component receives the result from the form service and combines it with the form configuration to produce the form UI model.
8.  The form component FreeMarker template iterates around the fields and includes the relevant controls.
9.  The form component FreeMarker template instantiates the FormUI JavaScript component.
10. The FormUI JavaScript instantiates the forms runtime and registers all validation handlers.

For a description of the available form controls, refer to [Forms reference]({% link content-services/7.2/develop/reference/share-document-library-ref.md %}#formref).

At this point, the form is ready for the user to interact. When the user interacts with the form, the forms runtime constantly checks the validation rules enabling and disabling the **Submit** button appropriately. When the user submits the form, the following sequence of events occurs.

1.  The browser submits the form by calling the REST API.
2.  The form service looks for a form processor that can process the kind of item.
3.  The form processor is asked to persist the form data.
4.  The form processor executes any registered filters before and after the main processing.
5.  The REST API takes the result from the form processor/form service and constructs the JSON response.
6.  The browser receives the response and processes it appropriately.

### Configuring forms

Forms can be configured through the `share-config-custom.xml` file.

The default forms configuration is specified in the `./tomcat/webapps/share/WEB-INF/classes/alfresco/share-form-config.xml` 
file. This file contains all the default controls and constraint handlers for the content model and the form configuration 
for the `cm:content`and `cm:folder` types. This file also contains an example of configuring the `cm:content` type.

>**Note:** You should apply all your forms customizations to a custom configuration file. To configure forms for the Share application, use the custom configuration file named `share-config-custom.xml`.

There are a number of files involved in form configuration, but generally you should add your configurations to a custom 
configuration file. The default configuration files are listed here so that you can see the range of configurations available:

|File|Description|
|----|-----------|
|form-config.xml|Default form configuration file|
|share-form-config.xml|Default forms for content and folder creation, edit and search|
|share-datalist-form-config.xml|Forms for the built-in datalists|
|share-workflow-form-config.xml|Core workflow forms and built-in workflows|

>CAUTION: Avoid editing the default configuration files directly.

1.  Open the ./tomcat/shared/classes/alfresco/<web-extension>/share-config-custom.xml file.
2.  Modify the forms configuration settings using the XML configuration syntax.

### Customizing forms controls {#customizeformcontrols}

One of the most common customizations is to add new controls. A control is the label for a field and the interface that 
the user interacts with for setting the value of the field.

A control is a FreeMarker template snippet that includes the markup to define the control. The model for the template 
includes the field and form being generated, represented by a `field` and `form` object, respectively. The following 
snippet shows the structure of the `field` object, using the `cm:name` property as an example:

```json
{
   kind : "field",
   id : "prop_cm_name",
   configName : "cm:name",
   name : "prop_cm_name",
   dataType : "d:text",
   type : "property",
   label : "Name",
   description : "Name",
   mandatory : true
   disabled : false,
   repeating : false,        
   dataKeyName : "prop_cm_name",
   value : "plain-content.txt",
   control:
   {
      params: {},
      template : "controls/textfield.ftl"
   }
}
```

Although the `id` property provides a unique identifier for the field, it is only scoped to the current form. If there 
are multiple forms on the page containing the same field, this identifier will not be unique. The model property 
`fieldHtmlId` should be used as the identifier for the control, as this is guaranteed to be unique for the page.

The state of the `disabled` property must always be adhered to when implementing controls as this is driven from the 
field definition returned from the `FormService` and from the `read-only` attribute in the form configuration. If the 
`disabled` property is set to true, the control should never allow the value to be edited.

The control is also responsible for rendering an appropriate UI representation for the mode the form is currently in. 
The form mode can be retrieved from the `form.mode` property. A pattern used by most the out-of-the-box controls is shown:

```xml
<#if form.mode == "view">
   // view representation goes here...
<#else>
   // edit and create representation goes here...
</#if>
```

The final rule for controls is that they must supply the field current value in a DOM element that has a `value` 
property and the `id` property set to the value of `fieldHtmlId` FreeMarker variable.

For advanced controls, that is, association, date, period, and so on, this usually requires a hidden `form` field.

### Customizing the validation handler

A validation handler is a small JavaScript function that gets called by the forms runtime when a field value needs to 
be validated.

The JavaScript function signature for a validation handler looks like this:

```javascript
/**
 * Validation handler for a field.
 * 
 * @param field {object} The element representing the field the validation is for
 * @param args {object} Object containing arguments for the handler
 * @param event {object} The event that caused this handler to be called, maybe null
 * @param form {object} The forms runtime class instance the field is being managed by
 * @param silent {boolean} Determines whether the user should be informed upon failure
 * @param message {string} Message to display when validation fails, maybe null
 * @static
 */
function handler-name(field, args, event, form, silent, message)   
```

The built in "mandatory" validation handler is defined as follows:

```javascript
Alfresco.forms.validation.mandatory = function mandatory(field, args, event, form, silent, message)
```

The `field` parameter is usually the HTML DOM element representing the field's value, which is normally an HTML input 
DOM element, so that the value property can be accessed. The structure of the `args` parameter is dependent on the handler 
being implemented. By default, these will be the parameters of the constraint defined on the field.

The handler is responsible for taking the value from the field and uses the `args` parameter to calculate whether the 
current value is valid or not, returning `true` if it is valid and `false` if it is not.

### Displaying type metadata {#displaytypemetadata}

You can configure the type metadata in the `share-config-custom.xml` file in `<web-extension>`. It is also possible to 
deploy custom configurations via JARs or AMPs.

The following snippet shows the forms definition in the `share-config-custom.xml` file.

```xml
<config evaluator="node-type" condition="cm:content">
   <forms>
      <form>
         <field-visibility>
            <show id="cm:name" />
            <show id="cm:title" force="true" />
            <show id="cm:description" force="true" />
            <show id="mimetype" />
            <show id="cm:author" force="true" />
            <show id="size" for-mode="view" />
            <show id="cm:creator" for-mode="view" />
            <show id="cm:created" for-mode="view" />
            <show id="cm:modifier" for-mode="view" />
            <show id="cm:modified" for-mode="view" />
         </field-visibility>
      </form>
   </forms>
</config>
```

The configuration defines that the `cm:name` property is visible in all modes, whereas the `cm:creator`, `cm:created`, 
`cm:modifier`, and `cm:modified` properties are visible in view mode only.

The `mimetype` and `size` properties are known as transient properties because they do not exist as properties in the model. 
These properties are formed from the `cm:content` property. The `NodeFormProcessor` knows about these properties and 
generates a field definition to represent them so that they will appear in the forms.

The `force` attribute ensures that the `NodeFormProcessor` searches the entire content model for the property or 
association definition before returning anything.

1.  Open the `<web-extension>/share-config-custom.xml` file.

2.  Enter the configuration for custom types.

    The following example configuration shows the `my:text`, `my:dateTime` and `my:association` properties being configured for the custom `my:example` type.

    ```xml
    <config evaluator="node-type" condition="my:example">
       <forms>
          <form>
             <field-visibility>
                <show id="my:text" />
                <show id="my:dateTime" />
                <show id="my:association" />
             </field-visibility>
          </form>
       </forms>
    </config>
    ```

3.  Add more fields to the default configuration.

    The following example shows how to show the node's `DBID` property for all `cm:content` nodes.

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
         <form>
            <appearance>
               <field id="cm:description">
                  <control>
                     <control-param name="rows">20</value>
                     <control-param name="columns">20</value>
                  </control>
               </field>
            </appearance>
         </form>
      </forms>
    </config>
    ```

    >**Note:** The full prefix version of the type is required in the `condition` attribute.

    The `force` attribute forces the `NodeFormProcessor` to search the entire content model for the property or association definition before returning anything.

4.  Save your file.

### Displaying aspect metadata {#displayaspectmetadata}

Add the properties and associations defined on aspects by adding them to the list of fields to show for a type. 
The aspects that appear can be defined on a type by type basis, and you can control the ordering of the fields.

1.  Open the `<web-extension>\share-config-custom.xml` file.

    >**Note:** While you can configure the aspect metadata by directly editing the `share-config-custom.xml` file in `<web-extension>`. It is also possible to deploy custom configurations via JARs or AMPs.

2.  Enter the configuration for custom types.

    The following example configuration shows the `cm:from` and `cm:to` properties for the `cm:effectivity` aspect.

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <field-visibility>
                <show id="cm:name" />
                <show id="cm:title" force="true" />
                <show id="cm:description" force="true" />
                <show id="mimetype" />
                <show id="cm:author" force="true" />
                <show id="size" for-mode="view" />
                <show id="cm:creator" for-mode="view" />
                <show id="cm:created" for-mode="view" />
                <show id="cm:modifier" for-mode="view" />
                <show id="cm:modified" for-mode="view" />
    
                <!-- cm:effectivity aspect -->
                <show id="cm:from"/>
                <show id="cm:to"/>
             </field-visibility>
          </form>
       </forms>
    </config>
    ```

3.  Add custom aspects to the default configuration by overriding the configuration.

    The following example shows how to add the fields of an example aspect to all forms for the `cm:content` type.

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <field-visibility>
                <!-- fields from my example aspect -->
                <show id="my:aspectProperty" />
                <show id="my:aspectAssociation" />
             </field-visibility>
          </form>
       </forms>
    </config>
    ```

    This will apply the aspects to all `cm:content` nodes.

4.  Save the file.

5.  It is also possible to have the fields appear for any type of node to which the aspect is applied. For example, you may wish to display the `my:aspectProperty` and `my:aspectAssociation` fields for any type of node to which the `my:customAspect` is applied:

    ```xml
    <config evaluator="aspect" condition="my:customAspect">
       <forms>
          <form>
             <field-visibility>
                <!-- fields from my example aspect -->
                <show id="my:aspectProperty" />
                <show id="my:aspectAssociation" />
             </field-visibility>
          </form>
       </forms>
    </config>
    ```

### Configuring a form control {#formcontrolconfig}

Most of the built in controls have parameters that allow some basic customization.

1.  Open the `<web-extension>\share-config-custom.xml` file.

2.  Change the number of rows and columns used for the `textarea` control that the `cm:description` field uses by default.

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <appearance>
                <field id="cm:description">
                   <control>
                      <control-param name="rows">20</control-param>
                      <control-param name="columns">80</control-param>
                   </control>
                </field>
             </appearance>
          </form>
       </forms>
    </config>
    ```

3.  If all `textarea` controls in the application need to have these settings, configure the control in the `default-controls` element. For example:

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <default-controls>
             <type name="d:mltext">
                <control-param name="rows">20</control-param>
                <control-param name="columns">80</control-param>
             </type>
          </default-controls>
       </forms>
    </config>    
    ```

4.  Save the file.

### Grouping fields {#displayfieldsingroups}

For longer forms, you can group fields together in logical grouped or nested sections.

1.  Open the `<web-extension>\share-config-custom.xml` file.

2.  Enter the configuration for custom types.

    The following example configuration shows how to group some fields from an imaginary custom `my:example` type.

    ```xml
    <config evaluator="model-type" condition="my:example">
       <forms>
          <form>
             <field-visibility>
                <show id="cm:name" />
                <show id="my:text" />
                <show id="my:mltext" />
                <show id="my:boolean" />
                <show id="my:int" />
                <show id="my:long" />
                <show id="my:double" />
                <show id="my:float" />
                <show id="my:status" />
                <show id="my:restricted-string" />
                <show id="my:date" />
                <show id="my:dateTime" />
             </field-visibility>
             <appearance>
                <set id="text" appearance="fieldset" label="Text Fields" />
                <set id="number" appearance="panel" label="Number Fields" />
                <set id="date" appearance="fieldset" label="Date Fields" />
                   
                <field id="cm:name" set="text" />
                <field id="my:text" set="text" />
                <field id="my:mltext" set="text" />
                <field id="my:boolean" set="text" />
                   
                <field id="my:int" set="number" />
                <field id="my:long" set="number" />
                <field id="my:double" set="number" />
                <field id="my:float" set="number" />
                   
                <field id="my:date" set="date" />
                <field id="my:dateTime" set="date" />
             </appearance>
          </form>
       </forms>
    </config>
    ```

    Nested sets are also supported. Use the `parent` attribute in the `set` element. The following example configuration shows the fields of the `my:example` type in a nested set.

    ```xml
    <config evaluator="model-type" condition="my:example">
       <forms>
          <form>
             <field-visibility>
                <show id="cm:name" />
                <show id="my:text" />
                <show id="my:mltext" />
                <show id="my:boolean" />
                <show id="my:int" />
                <show id="my:long" />
                <show id="my:double" />
                <show id="my:float" />
             </field-visibility>
             <appearance>
                <set id="builtin" appearance="fieldset" label="Built In" />
                <set id="custom" appearance="fieldset" label="Custom Data" />
                <set id="text" parent="custom" appearance="panel" label="Text" />
                <set id="number" parent="custom" appearance="panel" label="Numbers" />
                   
                <field id="cm:name" set="builtin" />
                   
                <field id="my:text" set="text" />
                <field id="my:mltext" set="text" />
                <field id="my:boolean" set="text" />
                   
                <field id="my:int" set="number" />
                <field id="my:long" set="number" />
                <field id="my:double" set="number" />
                <field id="my:float" set="number" />
             </appearance>
          </form>
       </forms>
    </config>
    ```

3.  Save the file.

### Changing the default set label

Fields that do not specify a set belong to the implicit `default` set. They are rendered together, by default, 
but without any visual grouping.

1.  Open the `<web-extension>\share-config-custom.xml` file.

2.  Enter the configurations for the set label.

    The appearance of the default set can be controlled in the same way as other sets, for example, using an identifier of an empty string.

    ```xml
    <set id="" appearance="panel" />
    ```

    This will render a panel around all the fields with a label of **Default**.

    To specify a different label, add the `label` attribute. For example, the following label will be **General**.

    ```xml
    <set id="" appearance="panel" label="General" />
    ```

    You can also use a message bundle key.

    ```xml
    <set id="" appearance="panel" label-id="form.set.general" />
    ```

3.  Save the file.

### Providing a custom form control {#customformcontrol}

If none of the out-of-the-box controls are sufficient, you can add new controls and reference them. Controls are FreeMarker 
template snippets, therefore, they contain only the HTML markup required to represent the control. The templates need to 
be stored in the `site-webscripts` directory, which will usually be in the application server shared classpath.

* The following example configuration shows a very simple custom text field control that always displays with a green background, white text, and 700 pixels wide. For a production system, use a CSS class; however, this example shows a hard coded style.

    ```xml
    <div class="form-field">
       <#if form.mode == "view">
          <div class="viewmode-field">
             <span class="viewmode-label">${field.label?html}:</span>
             <span class="viewmode-value">${field.value?html}</span>
          </div>
       <#else>
          <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">*</span></#if></label>
          <input id="${fieldHtmlId}" type="text" name="${field.name}" value="${field.value}" 
                       style="background-color: green; color: white; width: 700px;" <#if field.disabled>disabled="true"</#if> />
       </#if>
    </div>
    ```

* The following example configuration shows this control being used for the `cm:name` property, with a file name of `my-textfield.ftl`.

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
             <appearance>
                <field id="cm:name">
                   <control template="/my-textfield.ftl" />
                </field>
             </appearance>
          </form>
       </forms>
    </config>    
    ```

### Changing the field label position

By default, forms are rendered with the field labels positioned above the input control.

![Field_labels_on_top]({% link content-services/images/Field_labels_on_top.png %})

To change this layout, provide a custom CSS to override the default style rules. Control dependencies can be provided by 
using custom configuration.

1.  Add the custom CSS in the `custom-label-layout.css` file, located in the `/custom/forms` directory within the web application.

2.  Add the following configuration:

    ```xml
    <config>
       <forms>
          <dependencies>
             <css src="/custom/forms/custom-label-layout.css" />
          </dependencies>
       </forms>
    </config>
    ```

3.  To move the labels to the left of the input control, the following CSS should be present in the `custom-label-layout.css` file:

    ```xml
    .form-container label
    {
       display: inline;
       float: left;
       text-align: right;
       width: 6em;
       margin-right: 1em;
       margin-top: 0.4em;
    }
    ```

4.  Save the file.

    The result of this customization is shown as:

    ![Fields_labels_to_left]({% link content-services/images/Fields_labels_to_left.png %})

### Providing a custom form template

The default template that renders the form UI generates one column of fields. There are scenarios where more control 
might be required over the layout. To enable these scenarios, it is possible to replace the default template with a 
custom template. A different template can be provided for each form mode.

Store the custom templates in the `site-webscripts` directory, which is usually be in the application server shared classpath.

1.  The example shows the **Edit** form for the standard `cm:content` type being configured to render with two columns of fields.

    ```xml
    <config evaluator="node-type" condition="cm:content">
       <forms>
          <form>
                <edit-form template="/2-column-edit-form.ftl" />
          </form>
       </forms>
    </config>
    ```

    The example template `2-column-edit-form.ftl` is available in the distribution in the samples folder.

    The following example shows the contents of the `2-column-edit-form.ftl` file. It uses some of the FreeMarker macros available in `form.lib.ftl` but supplies its own `renderSetWithColumns` macro to render the HTML required to create the grid using the YUI grid CSS capabilities.

    ```xml
    <#import "/org/alfresco/components/form/form.lib.ftl" as formLib />
    
    <#if error?exists>
       <div class="error">${error}</div>
    <#elseif form?exists>
    
       <#assign formId=args.htmlid + "-form">
       <#assign formUI><#if args.formUI??>${args.formUI}<#else>true</#if></#assign>
    
       <#if formUI == "true">
          <@formLib.renderFormsRuntime formId=formId />
       </#if>
       
       <div id="${formId}-container" class="form-container">
          
          <#if form.showCaption?exists && form.showCaption>
             <div id="${formId}-caption" class="caption"><span class="mandatory-indicator">*</span>${msg("form.required.fields")}</div>
          </#if>
             
          <#if form.mode != "view">
             <form id="${formId}" method="${form.method}" accept-charset="utf-8" enctype="${form.enctype}" action="${form.submissionUrl}">
          </#if>
          
          <div id="${formId}-fields" class="form-fields"> 
            <#list form.items as item>
                <#if item.kind == "set">
                   <@renderSetWithColumns set=item />
                <#else>
                   <@formLib.renderField field=item />
                </#if>
             </#list>
          </div>
             
          <#if form.mode != "view">
             <@formLib.renderFormButtons formId=formId />
             </form>
          </#if>
    
       </div>
    </#if>
    
    <#macro renderSetWithColumns set>
       <#if set.appearance?exists>
          <#if set.appearance == "fieldset">
             <fieldset><legend>${set.label}</legend>
          <#elseif set.appearance == "panel">
             <div class="form-panel">
                <div class="form-panel-heading">${set.label}</div>
                <div class="form-panel-body">
          </#if>
       </#if>
       
       <#list set.children as item>
          <#if item.kind == "set">
             <@renderSetWithColumns set=item />
          <#else>
             <#if (item_index % 2) == 0>
             <div class="yui-g"><div class="yui-u first">
             <#else>
             <div class="yui-u">
             </#if>
             <@formLib.renderField field=item />
             </div>
             <#if ((item_index % 2) != 0) || !item_has_next></div></#if>
          </#if>
       </#list>
       
       <#if set.appearance?exists>
          <#if set.appearance == "fieldset">
             </fieldset>
          <#elseif set.appearance == "panel">
                </div>
             </div>
          </#if>
       </#if>
    </#macro>
    ```

2.  When the configuration and template is in place, the Edit Metadata page for a `cm:content` type in Share has the following appearance.

    ![Fields_in_2_columns]({% link content-services/images/Fields_in_2_columns.png %})

## Adding Custom MIME types

You can add custom MIME types to Share.

When you edit the properties of a document, it is possible to select a MIME types from a drop-down list. You can add 
custom MIME types to this list.

Custom MIME types are added to a configuration file. An example file is provided: 
`./tomcat/shared/classes/alfresco/extension/mimetype/mimetypes-extension-map.xml.sample`. You can rename this file to 
`./tomcat/shared/classes/alfresco/extension/mimetype/mimetypes-extension-map.xml`. It will be processed when 
Content Services is restarted.

The content of the example file is as follows:

```xml
<alfresco-config area="mimetype-map">
   
   <config evaluator="string-compare" condition="Mimetype Map">
      <mimetypes>

         <mimetype mimetype="application/XXX" display="Example mimetype">
            <extension>ex</extension>
         </mimetype>

      </mimetypes>
   </config>
   
</alfresco-config>               
```

You can add custom MIME types as required to this file, or create your own configuration file located on the classpath.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml` (Untouched by re-deployments and upgrades)

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/META-INF/share-config-custom.xml` - Share configuration related to a specific Share module extension, such as Document Library Action configuration, form configuration, aspect and type configuration.

## Tutorials

* [Making custom types visible]({% link content-services/7.2/tutorial/platform/content-model.md %}#shareconfigtypesprops)
* [Making custom aspects visible]({% link content-services/7.2/tutorial/platform/content-model.md %}#addaspect)
* [Controlling search results]({% link search-services/latest/config/transactional.md %}#controlling-search-results)
