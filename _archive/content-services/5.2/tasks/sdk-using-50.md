---
author: Alfresco Documentation
---

# Switch to using Alfresco version 5.0.x

Starting from a newly created Alfresco SDK 3.0 project \(All-In-One, Platform JAR, or Share JAR\), let’s replace the two properties with the following ones.

1.  Open the `pom.xml` in your generated project.

2.  Replace the properties with the following:

    ```
    <alfresco.platform.war.artifactId>alfresco</alfresco.platform.war.artifactId>
    <alfresco.platform.version>5.0.d</alfresco.platform.version>
    <alfresco.share.version>5.0.d</alfresco.share.version>
    <alfresco.surf.version>5.0.d</alfresco.surf.version>
    ```

    **Note:** If you're using the Platform JAR archetype, don’t specify the `alfresco.surf.version` property.

    **Note:** If you're using the Share JAR archetype, don't specify the `alfresco.platform.war.artifactId` and `alfresco.platform.version` properties.

    In this example we have shown the switch to version `5.0.d`. Feel free to use the correct version for your project, paying attention to the compatible versions of Alfresco Content Services and Alfresco Share.

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

4.  If you are unclear about which [Alfresco Surf](../references/APISurfPlatform-intro.dita) version should be used, you can search for it in your installed Alfresco folder.

    1.  Search for `spring-surf-api-*.jar` and `spring-surf-*.jar` files in the WEB-INF/lib folder.

    2.  Find the correct version number to replace the asterisks \(i.e. `spring-surf-api-6.3.jar`\).

    The Spring Surf project at this time, was part of the Spring Framework extensions \(now it is an Alfresco project\), so we need to update a few dependencies.

5.  If you used the All-In-One JAR archetype to generate the project, edit the `pom.xml` file to comment out the Spring Surf related dependencies:

    ```
    <!-- Comment out or remove the dependency below.
    <dependency>
        <groupId>org.alfresco.surf</groupId>
        <artifactId>spring-surf</artifactId>
        <version>${alfresco.surf.version}</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>org.alfresco.surf</groupId>
        <artifactId>spring-surf-api</artifactId>
        <version>${alfresco.surf.version}</version>
        <scope>provided>
    </dependency> -->
    ```

6.  If you used the All-In-One JAR archetype or the Share JAR archetype to generate the project, edit the relevant `pom.xml` file: in the sub-project for Share JAR \(for All-In-One\) or in the root \(for Share JAR\), to update the Spring Surf API dependency on the Spring Framework group ID:

    ```
    <dependency>
        <!-- Update the property below. -->
        <groupId>org.springframework.extensions.surf</groupId>
        <artifactId>spring-surf-api</artifactId>
        ...
    </dependency>
    ```

    If you used the Platform JAR archetype to generate the project, nothing has to be done to make the project run on Alfresco version 5.0.

7.  After changing the versions, delete the `alf_data_dev` folder \(if it exists\).

8.  Restart the project using the `run.sh` script.


**Parent topic:**[Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md)

