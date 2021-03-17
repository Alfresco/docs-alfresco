---
author: Alfresco Documentation
---

# Switch to using Alfresco version 4.2.x

Starting from a newly created Alfresco SDK 3.0 project \(All-In-One, Platform JAR, or Share JAR\), let's replace the two properties with the following ones.

1.  Open the `pom.xml` in your generated project.

2.  Replace the properties with the following:

    ```
    <alfresco.platform.war.artifactId>alfresco</alfresco.platform.war.artifactId>
    <alfresco.platform.version>4.2.f</alfresco.platform.version>
    <alfresco.share.version>4.2.f</alfresco.share.version>
    ```

    **Note:** If you're using the Share JAR archetype, don't specify the `alfresco.platform.war.artifactId` and `alfresco.platform.version` properties. If you're using the All-In-One or Platform JAR archetype, use all three properties.

    In this example we have shown the switch to version `4.2.f`. Feel free to use the correct version for your project, paying specific attention since in version 4.2 the `alfresco.war` and `share.war` artifacts have the same version number.

    Considering that the Alfresco Share Services AMP applied to the Platform WAR \(i.e. `alfresco.war`\) was introduced in version 5.1, you may need to take an additional step.

3.  Remove or comment out the module dependency from the Alfresco Maven Plugin configuration in the `pom.xml` file. This is valid if and only if you used the All-In-One archetype or Platform JAR archetype to generate the project, and not if you used the Share JAR archetype.

    ```
    <!-- Comment out or remove the dependency below.
    <moduleDependency>
    <groupId>${alfresco.groupId}</groupId>
    <artifactId>alfresco-share-services</artifactId>
    <version>${alfresco.share.version}</version>
    <type>amp</type>
    </moduleDependency>  -->
    ```

    **Note:** The Alfresco Maven Plugin is smart enough to know that you are not running a 5.1 version or newer, and won't apply the `alfresco-share-services` AMP from the above configuration even if you leave it in. It is clearer if you comment it out. However, if you are going to switch back and forth between versions you can leave the AMP configuration in, the plugin knows when to apply it and when not to.

    If you used the All-In-One archetype or the Share JAR archetype to generate the project, you need to add to the Share related `pom.xml` file. The dependence on Share classes and files from the Share AMP is different in version 4.2.f.

4.  For these archetype, edit the relevant `pom.xml` file: in the sub-project for Share JAR \(for All-In-One\) or in the root \(for Share JAR\), and update the dependencies as shown in the following example.

    ```
    <!--
        Include libs that the Share JAR extension will use.
        They are mostly provided by Alfresco during runtime so 
        scope should be set as provided (if in doubt then check for 
        the lib in tomcat/webapps/share/WEB-INF/lib, if it's there 
        then it's provided). 
    -->
    <dependencies>
        <!-- Include JAR that has classes such as BaseEvaluator -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-share</artifactId>
            <version>${alfresco.share.version}</version>
            <scope>provided</scope>
            <exclusions>
                <!-- Exclude org.alfresco:alfresco-web-framework-commons:jar:classes:4.2.f 
                     dependency -->
                <exclusion>
                    <groupId>org.alfresco</groupId>
                    <artifactId>alfresco-web-framework-commons</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        
        <!-- Bring in the correct version of alfresco-web-framework-commons -->
        <dependency>
            <groupId>org.alfresco</groupId>
            <artifactId>alfresco-web-framework-commons</artifactId>
            <version>${alfresco.share.version}</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    ```

5.  If you used the All-In-One archetype or the Platform JAR archetype, update the indexing subsystem to Apache Solr1, in the four files found under the following path: src/test/properties/local/alfresco-global.\*.properties.

    Here you will update the property: `index.subsystem.name=solr`

6.  Set the database configuration parameters, adding a new configuration setting to the `pom.xml` file:

    `<alfresco.db.params>**MODE=PostgreSQL;**AUTO_SERVER=TRUE;DB_CLOSE_ON_EXI T=FALSE;LOCK_TIMEOUT=10000;MVCC=TRUE</alfresco.db.params>`

    Finally, if you used all three archetypes, change the Alfresco module not use `SNAPSHOT` versions as these aren't supported in version 4.2.

7.  Update all the `module.properties` files stored in the src/main/resources/alfresco/module path to use `module.version=1.0`

    There are two for an All-In-One project, and one for Platform JAR and Share JAR.

8.  After changing the versions, delete the `alf_data_dev` folder \(if it exists\).

9.  Restart the project using the `run.sh` script.


**Parent topic:**[Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md)

