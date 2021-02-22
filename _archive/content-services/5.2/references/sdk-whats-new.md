---
author: Alfresco Documentation
---

# What's new?

Alfresco Content Services SDK 3 brings a lot of new changes into the way your customizations are built, packaged, run, and tested. Below a list of the major improvements and enhancements.

-   [JAR packaging](sdk-whats-new.md#1)
-   [Compatibility](sdk-whats-new.md#2)
-   [Easy upgrades](sdk-whats-new.md#3)
-   [Alfresco Maven Plugin](sdk-whats-new.md#4)
-   [Integration testing](sdk-whats-new.md#5)
-   [Simplified archetypes](sdk-whats-new.md#6)
-   [Support for different versioning of Content Services and Share UI](sdk-whats-new.md#7)
-   [Maven profiles](sdk-whats-new.md#8)
-   [Hot reloading](sdk-whats-new.md#9)
-   [All-In-One \(AIO\) Project change](sdk-whats-new.md#10)
-   [No forced parent pom](sdk-whats-new.md#11)

![](../images/hr.png)

**JAR packaging**

Since the early days of the SDK, AMPs have been the way customizations were packaged. In SDK 3 everything is now packaged as a JAR by default, while the AMPs are still available as an optional assembly. This gives developers much more control over packaging and simple modules can easily be deployed as JARs.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Compatibility**

One of the main motivators behind the improved Alfresco Content Services SDK 3 was to centralize run and integration testing logic in a plugin. This provides much more flexibility in the supported versions.

Alfresco Content Services SDK 3 is compatible with Alfresco One 4.2.7\*, 5.0.4, 5.1.2, 5.1.3, and Alfresco Content Services 5.2.x.

To change the version you want to test your customization against, change `<alfresco.platform.version />` and `<alfresco.share.version />` along with `<maven.alfresco.edition />`.

See [Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md) for more.

\**A small one line change is required in module.properties for 4.2.x support.*

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Easy upgrades**

SDK 3.0 strives to follow [SEMVER](http://semver.org/) closely. This means that no breaking changes within a major version.

We will continue to add new functionality and extra configuration options, but in a backwards compatible way.

Upgrading within a major version of the Alfresco SDK 3.0 should be as easy as changing the `<version />` in the plugin configuration, or for convenience, all the archetypes have a property defined as `<alfresco.sdk.version />`.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Alfresco Maven Plugin**

All logic to run Alfresco Platform and Share has been moved out of the profiles and parent pom. The plugin now has a single goal `alfresco:run` which can be invoked directly.

The Alfresco Maven Plugin has a lot of configuration options to cover many different use cases. It's easy to configure it to use an external database like MySQL, PostgreSQL, or enterprise databases. It's also easy to control exactly which webapps should be run, for example, `alfresco-platform-jar-archetype` comes with the plugin configured to use the H2 database and to start the Alfresco Platform, Solr 4, and Alfresco REST API Explorer.

The plugin also reads properties, like `<alfresco.platform.version />` and `<alfresco.share.version />` to control which version you want to run with your customization.

Adding third party dependencies \(whether AMPs or JARs\) is easier than ever, a simple configuration enables you to define which dependencies to install.

See [Configuring the Alfresco Maven plugin](../concepts/sdk-maven-plugin-configure.md) for more.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Integration testing**

The **Alfresco Maven Plugin** handles integration tests that are executed in the full context of the application, including Solr. Executing `mvn integration-test` detects if an Alfresco Platform is already running and executes the tests against it, giving developers instant feedback on their tests. If an Alfresco Platform is not currently running, one will be started to execute the tests.

See [Integration testing](../concepts/sdk-integration-testing.md) for more.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Simplified archetypes**

As we have moved to JAR packaging, the previous `alfresco-amp-archetype` and `share-amp-archetype` have now been replaced with `alfresco-platform-jar-archetype` and `alfresco-share-jar-archetype`. Also, `alfresco-allinone-archetype` is provided. The JAR packaging renders a standard Maven JAR structure.

The pom.xml files are simplified as all the previous profiles are now embedded inside the Alfresco Maven Plugin. This provides developers a pretty standard pom.xml, which defines dependencies, properties, and configuration of the Alfresco Maven Plugin.

The All-In-One archetype is much smaller than before. It no longer has the runner or the WAR overlay modules. It contains three modules: `platform-jar`, `share-jar`, and `integration-tests`.

See [Introduction to Maven archetypes](../concepts/sdk-archetypes.md) for more.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Support for different versioning of Content Services and Share UI**

The Alfresco product is no longer released under one common version. Alfresco Content Services \(i.e. `alfresco.war`\) and the Share UI \(`share.war`\) are now released with individual version numbers, such as Content Services 5.2.a-EA and Share 5.1.g. Alfresco SDK 3.0 supports specifying different versions for these artifacts.

See [Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md) for more.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Maven profiles**

Profiles are no longer used for running the project or for enabling Enterprise editions. The runner logic is now built into the Alfresco Maven Plugin. To use an Enterprise version specify its version in the properties section, and bring in relevant specific Enterprise dependencies. This means that the artifacts that are produced are always the same and not affected by the activated profile\(s\).

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**Hot reloading**

Alfresco SDK 3.0 no longer uses Spring Loaded for hot reloading. Instead [JRebel](https://zeroturnaround.com/software/jrebel/) \(commercial\) is used or the open source alternative [HotSwap](http://hotswapagent.org/), which works a lot better and gives hot reloading of Spring context \(only JRebel\), classes, web resources, property files etc. Hot reloading works for both the `alfresco.war` and the `share.war`. Note that in SDK release 2.2.0 you can [no longer use Spring Loaded for hot reloading](https://github.com/Alfresco/alfresco-sdk/issues/369) in `alfresco.war`.

See [Hot reloading](../concepts/sdk-hot-reloading.md) for more.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**All-In-One \(AIO\) Project change**

The All-In-One \(AIO\) project has been simplified as a result of build logic, run logic, and project configuration being moved into the Alfresco Maven Plugin.

See [Introduction to project structures](../concepts/sdk-projects.md) for more.

[back to top](sdk-whats-new.md#)

![](../images/hr.png)

**No forced parent pom**

SDK 3.0 no longer requires a parent pom in your project. All you need is a standard JAR project and the Alfresco Maven Plugin.

[back to top](sdk-whats-new.md#)

**Parent topic:**[Alfresco Content Services SDK 3](../concepts/sdk-intro.md)

