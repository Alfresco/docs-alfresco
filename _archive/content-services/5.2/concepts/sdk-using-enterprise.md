---
author: Alfresco Documentation
---

# Working with Enterprise

By default the Alfresco SDK will use Community Edition releases but it can be configured to use Enterprise Edition releases. Here you will learn how to set up a project to work with an Enterprise Edition release, highlighting the changes required to make it work.

If you would like to work with the Alfresco Enterprise Edition, then this requires just a few property changes and a license installation. You also need to have access to the private Alfresco Nexus repository. To configure access to the Alfresco private repository see [Using Alfresco One \(Enterprise\)](http://docs.alfresco.com/5.1/concepts/alfresco-sdk-using-enterprise-edition.html).

**Installing the license**

The very first task to complete is about installing an enterprise license, otherwise the server will remain in read-only mode. This task is required if and only if you used the All-In-One archetype or the Platform JAR archetype to generate your project. If you used the Share JAR archetype to generate your project, feel free to ignore this task and move on the next one.

If you are an Alfresco Partner or Customer, you can request an enterprise license by you opening a ticket on the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com/). The Enterprise license is nothing more and nothing less than a file with `lic` extension. The Enterprise license file goes into src/test/license folder. The license will be injected into the platform WAR before it is deployed to [Apache Tomcat](http://tomcat.apache.org/). The license file name doesn't matter, but make sure that you keep it simple and maintain the `lic` extension.

**Configuring the Enterprise release**

The configuration of the enterprise release is straightforward when using the `pom.xml` configuration file, stored in the root folder of your project. You'll need to update the following settings in the `pom.xml` file:

```
<maven.alfresco.edition>enterprise</maven.alfresco.edition>
```

Changing this parameter to `enterprise` helps the Alfresco Maven plugin to pick up the correct database.

**Note:** If you used previous versions of the Alfresco SDK, you'll notice that there is no longer a need to update any of the `run.*` scripts to use an Enterprise edition. Previously, this was necessary when the Enterprise edition was enabled via a profile.

**Configuring the Enterprise version**

The configuration of the Enterprise version is straightforward when using the `pom.xml` configuration file stored in the root folder of your project. You'll need to update the following settings in the `pom.xml` file:

```
<alfresco.platform.war.artifactId>alfresco-enterprise</alfresco.platform.war.artifactId>
<alfresco.platform.version>5.2.0</alfresco.platform.version>
<alfresco.share.version>5.2.0</alfresco.share.version>
<alfresco.surf.version>6.3</alfresco.surf.version>
```

**Note:** If you used the Platform JAR archetype, don't specify the `alfresco.surf.version` property. If you used the Share JAR archetype, don't write the `alfresco.platform.war.artifactId` and `alfresco.platform.version` properties.

If you are unclear which Alfresco Surf version should be used, you can search for it in your installed Alfresco folder. Search for `spring-surf-api-*.jar` and `spring-surf-*.jar` files in the `WEB-INF/lib` folder. Find the correct version number in place of the asterisks \(i.e. `spring-surf-api-6.3.jar`\).

**Removing the alf\_data\_dev folder and running the project**

Now it's time to delete the `alf_data_dev` directory \(if it exists\) and restart the project using the `run.sh` script.

**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

