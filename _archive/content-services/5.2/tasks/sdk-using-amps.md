---
author: Alfresco Documentation
---

# Working with AMPs

Since the early days of the Alfresco SDK, the Alfresco Module Packages \(AMP\) have been the way customizations were packaged. In Alfresco SDK 3.0 everything is now packaged as a JAR by default, while the AMPs are still available as an optional assembly. This gives you much more control over packaging, and simple modules can easily be deployed as JARs.

The [Maven Assembly Plugin](http://maven.apache.org/plugins/maven-assembly-plugin/) allows you to control the final artifacts that [Maven](https://www.apache.org/) builds. You add the plugin configuration and point it to an XML file that contains the full configuration on the artifact we want to produce.

**Building AMPs with Alfresco SDK 3**

To build AMPs the SDK ships a default assembly XML file that will tell the assembly plugin how to produce an AMP file. You will find this file in `src/main/assembly/amp.xml`. The plugin configuration is already present in your `pom.xml` file, as shown:

```
<plugin>
<artifactId>maven-assembly-plugin</artifactId>
<version>2.6</version>
<executions>
    <execution>
        <id>build-amp-file</id>
        <phase>package</phase>
        <goals>
            <goal>single</goal>
        </goals>
        <configuration>
            <appendAssemblyId>false</appendAssemblyId>
            <descriptor>src/main/assembly/amp.xml</descriptor>
        </configuration>
    </execution>
</executions>
<dependencies>
    <dependency>
        <groupId>org.alfresco.maven.plugin</groupId>
        <artifactId>alfresco-maven-plugin</artifactId>
        <version>${alfresco.sdk.version}</version>
    </dependency>
</dependencies>
</plugin>
```

This section is commented out by default.

1.  To produce both a JAR file and an AMP, remove the comments and run the `mvn package` command.

    Now you have full control over how your AMPs are built. If you want to change the content of the AMP, you can change the assembly `amp.xml` and tailor it to your needs.

    **Installing AMPs with the SDK**

    When you run your project using the Alfresco SDK, the Alfresco Maven Plugin always defaults to load the JAR version of your module into your project. Now that you've also built an AMP, what if you want to tell the Alfresco Maven Plugin to install that AMP using the [Alfresco Module Management Tool](../concepts/dev-extensions-modules-management-tool.md) \(MMT\)?

    Well, luckily this is easy. Let's review the Alfresco Maven Plugin configuration in your `pom.xml`. Starting from the default one \(for an All-In-One project\), let's assume that we want to use the AMP version of our platform module. In order to do so, we have to look at the `<platformModules/>` section. By default, it will install the Alfresco Share Services. Note that this dependency has `<type>amp</type>`. Our `platform-jar` does not have a type specified so the SDK will assume a JAR by default.

    Since we have the assembly plugin enabled now, we know there is an AMP version of this artifact available.

2.  Add `<type>amp</type>` to the module, as shown:

    ```
    <moduleDependency>
        <groupId>${project.groupId}</groupId>
        <artifactId>aio-amp-example-platform-jar</artifactId>
        <version>${project.version}</version>
        <type>amp</type>
    </moduleDependency>
    ```

3.  When you run the project you see the following in the output:

    ```
    [INFO] Configured Artifact: org.alfresco:alfresco-share-services:5.2.d:amp
    [INFO] Configured Artifact: dk.ohej.tutorial:aio-amp-example-platform-jar:1.0-SNAPSHOT:amp
    [INFO] Copying alfresco-share-services-5.2.d.amp to /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps/alfresco-share-services-5.2.d.amp
    [INFO] Copying aio-amp-example-platform-jar-1.0-SNAPSHOT.amp to /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps/aio-amp-example-platform-jar-1.0-SNAPSHOT.amp
    [info] Installing all AMPs from directory /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps into WAR/exploded webapp at /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/platform-war
    ```

    This means that the Alfresco Maven Plugin successfully grabbed the `alfresco-share-services.amp`, the platform AMP module, and installed them using the Module Management Tool \(MMT\).

    **Installing 3rd party AMPs**

    Looking at the previous example, we already have the recipe to install 3rd party AMPs; Alfresco Share Services is an AMP that is downloaded and installed by Maven. Here is an example of how to install Florian Maul's Javascript Console.

    ```
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
            JARs and AMPs that should be overlayed/applied to the Platform/Repository WAR
            (i.e. alfresco.war)
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
                    <artifactId>aio-amp-example-platform-jar</artifactId>
                    <version>${project.version}</version>
                    <type>amp</type>
                </moduleDependency>
                
                <!-- Install Javascript Console -->
                <moduleDependency>
                    <groupId>de.fmaul</groupId>
                    <artifactId>javascript-console-repo</artifactId>
                    <version>0.6</version>
                    <type>amp</type>
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
                    <artifactId>aio-amp-example-share-jar</artifactId>
                    <version>${project.version}</version>
                </moduleDependency>
                
                <!-- Install Javascript Console -->
                <moduleDependency>
                    <groupId>de.fmaul</groupId>
                    <artifactId>javascript-console-share</artifactId>
                    <version>0.6</version>
                    <type>amp</type>
                </moduleDependency>
            </shareModules>
        </configuration>
    </plugin>
    ```

4.  Launch the app using `run.sh` or `mvn install alfresco:run`.

    Here is the output:

    ```
    [INFO] Configured Artifact: org.alfresco:alfresco-share-services:5.2.d:amp
    [INFO] Configured Artifact: dk.ohej.tutorial:aio-amp-example-platform-jar:1.0-SNAPSHOT:amp
    [INFO] Configured Artifact: de.fmaul:javascript-console-repo:0.6:amp
    [INFO] Copying alfresco-share-services-5.2.d.amp to /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps/alfresco-share-services-5.2.d.amp
    [INFO] Copying aio-amp-example-platform-jar-1.0-SNAPSHOT.amp to /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps/aio-amp-example-platform-jar-1.0-SNAPSHOT.amp
    [INFO] Copying javascript-console-repo-0.6.amp to /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps/javascript-console-repo-0.6.amp
    [info] Installing all AMPs from directory /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/platform/amps into WAR/exploded webapp at /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/platform-war
    [INFO] Copying javascript-console-share-0.6.amp to /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/share/amps/javascript-console-share-0.6.amp
    [info] Installing all AMPs from directory /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/modules/share/amps into WAR/exploded webapp at /Users/ohejlskov/work/sdk/tutorials/aio-amp-example/target/share-war
    ```

    For further details and examples, you can check the [public repository on GitHub](https://github.com/ohej/alfresco-sdk-tutorials/tree/master/aio-amp-example).

    **External references**

    Blog post about [Working with Alfresco SDK 3: AMPs](https://community.alfresco.com/people/ohej/blog/2017/04/14/working-with-alfresco-sdk-3-amps)


**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

