---
author: Alfresco Documentation
---

# Configuring the Alfresco Maven plugin

One of the most important changes of the Alfresco SDK 3 is that all the logic to run Alfresco Content Services and Share has been moved out of the profiles and Maven parent pom. The Maven plugin now has a single goal `alfresco:run`, which can be invoked directly.

The Alfresco Maven Plugin has a lot of configuration options to cover different use cases. It's easy to configure it to use an external database like MySQL, PostgreSQL, or enterprise databases. It's also easy to control exactly which webapps should be run. For example, the plugin used in `alfresco-platform-jar-archetype` is already configured to use the H2 database, and to start Alfresco Content Services, Solr 4, and Alfresco REST API Explorer.

The plugin also reads properties, like `<alfresco.platform.version />` and `<alfresco.share.version />` to control which version you want to run with your customization. Adding third party dependencies \(either AMPs or JARs\) is easier than ever - a simple configuration enables you to define which dependencies to install.

We'll summarize all the parameters available in the Alfresco Maven Plugin later in this page. Further details about the plugin are in the [public Alfresco GitHub repository](https://github.com/Alfresco/alfresco-sdk).

**Where the Alfresco Maven Plugin acts**

The [Alfresco Maven Plugin](https://github.com/Alfresco/alfresco-sdk/tree/master/plugins/alfresco-maven-plugin) can be controlled directly into the `pom.xml` file of your project created with Alfresco SDK 3. Below is an example configuration for the plugin, based on an All-In-One project.

```
<!-- 
The Alfresco Maven Plugin contains all the logic to run the extension in an embedded Tomcat with the H2 database. 
-->
<plugin>
    <groupId>org.alfresco.maven.plugin</groupId>
    <artifactId>alfresco-maven-plugin</artifactId>
    <version>${alfresco.sdk.version}</version>
    <configuration>
        <!-- We need the flat file H2 database to run the Repo -->
        <enableH2>true</enableH2>
        <!-- We always need the Platform/Repo webapp - alfresco.war -->
        <enablePlatform>true</enablePlatform>
        <!-- Enable Solr webapp so we can use search -->
        <enableSolr>true</enableSolr>
        <!-- We need Share webapp, so we got a UI for working with the Repo -->
        <enableShare>true</enableShare>
        <!-- Enable the REST API Explorer -->
        <enableApiExplorer>true</enableApiExplorer>
        
        <!--
        JARs and AMPs that should be overlayed/applied to the Platform/Repository WAR (i.e. alfresco.war)
        -->
        <platformModules>
            
            <!-- Share Services will be ignored if you are on Platform earlier than 5.1 -->
            <moduleDependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>alfresco-share-services</artifactId>
                <version>${alfresco.share.version}</version>
                <type>amp</type>
            </moduleDependency>
            
            <!-- Bring in custom Modules -->
            <moduleDependency>
                <groupId>${project.groupId}</groupId>
                <artifactId>my-all-in-one-project-platform-jar</artifactId>
                <version>${project.version}</version>
            </moduleDependency>
            
            <!-- Bring in the integration tests -->
            <moduleDependency>
                <groupId>${project.groupId}</groupId>
                <artifactId>integration-tests</artifactId>
                <version>${project.version}</version>
                <classifier>tests</classifier>
            </moduleDependency>
        
        </platformModules>

        <!--
        JARs and AMPs that should be overlayed/applied to the Share WAR (i.e. share.war)
        -->
        <shareModules>
            <!-- Bring in custom Modules -->
            <moduleDependency>
                <groupId>${project.groupId}</groupId>
                <artifactId>my-all-in-one-project-share-jar</artifactId>
                <version>${project.version}</version>
            </moduleDependency>
        </shareModules>
    </configuration>
</plugin>
        
```

**Alfresco Maven Plugin properties**

Here is a reference to all the possible properties available and a brief description of their use.

|Property|Default|Description|
|--------|-------|-----------|
|`enableSolr`|`true`|Switch to enable/disable the Apache Solr 4 web application when running embedded Tomcat.|
|`enableH2`|`false`|Switch to enable/disable the H2 database when running embedded Tomcat. This also brings in the needed H2 database scripts.|
|`enableMySQL`|`false`|Switch to enable/disable the MySQL database when running embedded Tomcat.|
|`enablePostgreSQL`|`false`|Switch to enable/disable the PostgreSQL database when running embedded Tomcat.|
|`enableEnterpriseDb`|`false`|Switch to enable/disable the Enterprise database \(such as Oracle or MS SQL Server\) when running embedded Tomcat.|
|`enablePlatform`|`true`|Switch to enable/disable the Platform/Repository \(`alfresco.war`\) when running embedded Tomcat.|
|`copyHotswapAgentConfig`|`true`|Enable or disable generation of Hotswap Agent configuration.|
|`enableShare`|`true`|Switch to enable/disable the Share \(`share.war`\) when running embedded Tomcat.|
|`shareContextPath`|`/share`|Enables the use of custom context path for the Share webapp. Some solution integrators uses a custom context path for Share in their projects. This property enables them to continue to do that in SDK 3 without having to completely override the Maven Tomcat plugin configuration, or not use it at all and go back the good old runner project again.|
|`useCustomShareLog4jConfig`|`true`|Share Log4j properties configuration cannot be customized via extension put on the classpath, like on the platform side. So we need to override the `log4j.properties` in s`hare/WEB-INF/classes` to be able to log from custom code. This property can be used to turn off this overriding, to produce a WAR with the standard Share `log4j.properties` file.|
|`enableApiExplorer`|`false`|Switch to enable/disable the Alfresco REST API Explorer \(`api-explorer.war`\) when running embedded Tomcat.|
|`enableTestProperties`|`true`|Switch to enable/disable test properties when running embedded Tomcat.|
|`startTomcat`|`true`|Control if Tomcat 7 Plugin should be kicked off and start Apache Tomcat.|
|`testFolder`|`src/test/properties/${env}`|Directory containing test files that should be used when running embedded Tomcat.|
|`testInclude`|`**`|Test files in testFolder that should be included when running embedded Tomcat.|
|`platformModules`|``|JARs and AMPs that should be overlayed/applied to the Platform/Repository WAR \(i.e. `alfresco.war`\). This is a list of `ModuleDependency`.|
|`shareModules`|``|JARs and AMPs that should be overlayed/applied to the Share WAR \(i.e. `share.war`\). This is a list of `ModuleDependency`.|
|`alfrescoEdition`|`community`|Community Edition or Enterprise Edition? \(i.e `community` or `enterprise`\).|
|`tomcatDependencies`|``|Tomcat dependencies that should be added to the Embedded Tomcat configuration before start up. Normally there wouldn't be any extra dependencies, but could be if you run an Enterprise database such as Oracle, for which there's no quick configuration, such as enableH2, enableMySQL, or enablePostgreSQL. This is a list of `TomcatDependency`.|
|`tomcatSystemProperties`|``|System properties to feed the Tomcat plugin before start up. Normally there wouldn't be any extra dependencies, but you could run a custom webapp that needed a custom system property set. This is a list of properties with values.|
|`tomcatCustomWebapps`|``|Custom webapps that should be deployed to the embedded Tomcat engine. Normally there wouldn't be any extra webapps, but we could run a bigger project that uses some custom webapp. This is a list of `TomcatWebapp`.|
|`tomcatPort`|``|Port to run Tomcat on.|
|`mavenTomcatPort`|`8080`|Legacy to be compatible with `maven.tomcat.port`.|
|`alfrescoGroupId`|`org.alfresco`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoPlatformWarArtifactId`|`alfresco-platform`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoShareWarArtifactId`|`share`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoSolrArtifactId`|`alfresco-solr4`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoApiExplorerArtifactId`|`api-explorer`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoPlatformVersion`|`5.2.f`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoShareVersion`|`5.2.e`|Maven GAV \(groupId, artifactId, version\) properties.|
|`alfrescoApiExplorerVersion`|`5.2.e`|Maven GAV \(groupId, artifactId, version\) properties.|
|`solrHome`|`${project.basedir}/ ${alfresco.data.location}/ solr`|Directory that contains the Solr 4 configuration.|

**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

