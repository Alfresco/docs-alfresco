---
author: Alfresco Documentation
---

# Linking Standard Alfresco AMPs to an AIO project

Some functionality of the Alfresco content management system is delivered as extra modules, such as Records Management \(RM\), Google Docs Integration, and Alfresco Office Services, which provides SharePoint Protocol support. You can link such modules to an All-in-One \(AIO\) project.

You should have completed [Installing and Configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md) and generated [an AIO project](alfresco-sdk-tutorials-all-in-one-archetype.md).

You will learn how to link standard Alfresco AMPs to the AIO project so you can use the extra Alfresco functionality that they provide. Most of these modules are implemented with two AMPs. One for server side \(Repository\) customizations that should be added to the alfresco.war, and one with the custom UI functionality that should be added to the share.war. **As an example we will add/link the Records Management \(RM\) module to the AIO project.** It comes implemented in two AMPs. Note that there are different AMPs for Community and Enterprise.

1.  Update to latest RM version.

    In the IDE, open up the all-in-one/pom.xml parent project file. Scroll down so you see the `properties` section. Uncomment the `alfresco.rm.version` property and set to latest Community release:

    ```
    <properties>
        <!-- The following are default values for data location, Alfresco Community version, and Records Management Module version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.1)
          <alfresco.version>5.1.e</alfresco.version>
          <alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> -->
          
        <alfresco.rm.version>2.4.b</alfresco.rm.version>
    
    ```

    If you are using the Enterprise edition set the version to `2.4`.

2.  Linking the RM repository AMP to the alfresco.war.
3.  Add the RM repository AMP dependency.

    In the IDE, open up the all-in-one/repo/pom.xml project file. Scroll down so you see the `dependencies` section. Then uncomment the RM dependency and update the `artifactId` to match the Community RM release:

    ```
    <!-- Uncomment if you are using the RM (Records Management) module. -->
        <!-- Set alfresco.rm.version in parent pom to appropriate version for 5.1 -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm-community-repo</artifactId>
            <version>${alfresco.rm.version}</version>
            <type>amp</type>
        </dependency>
    
    ```

    If you are using the Enterprise edition then you need to define two AMP dependencies, first the `alfresco-rm-core-repo` artifact and then the `alfresco-rm-enterprise-repo` artifact, group and version are the same as for Community.

4.  Overlay the RM repository AMP on the alfresco.war.

    The RM repository AMP will not be automatically added to the alfresco.war by just adding the AMP dependency \(JARs will though\). We need to add some configuration to the war plugin. Scroll further down in the all-in-one/repo/pom.xml project file until you see the `maven-war-plugin` section. Uncomment the RM overlay specification and update `artifactId`:

    ```
    <!-- Uncomment if you are using RM -->
        <overlay>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm-community-repo</artifactId>
            <type>amp</type>
        </overlay>
    
    ```

    If you are using the Enterprise edition then you need to define two AMP overlays, first the `alfresco-rm-core-repo` artifact and then the `alfresco-rm-enterprise-repo` artifact.

5.  Linking the RM Share AMP to the share.war.
6.  Add the RM Share AMP dependency.

    In the IDE, open up the all-in-one/share/pom.xml. Scroll down so you see the `dependencies` section. Then uncomment the RM dependency and update the `artifactId` to match the Community RM release:

    ```
    <!-- Uncomment if you are using RM (Records Management) module -->
        <!-- Make sure to set the correct version for 5.1 with alfresco.rm.version property in parent POM -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm-community-share</artifactId>
            <version>${alfresco.rm.version}</version>
            <type>amp</type>
        </dependency>
    
    ```

    If you are using the Enterprise edition then you need to define two AMP dependencies, first the `alfresco-rm-core-share` artifact and then the `alfresco-rm-enterprise-share` artifact, group and version are the same as for Community.

7.  Overlay the RM Share AMP on the share.war.

    The RM Share AMP will not be automatically added to the share.war by just adding the AMP dependency \(JARs will though\). We need to add some configuration to the war plugin. Scroll further down in the all-in-one/share/pom.xml file until you see the `maven-war-plugin` section:

    ```
    <!-- Uncomment if you are using RM -->
         <overlay>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm-community-share</artifactId>
            <type>amp</type>
        </overlay>
    
    ```

    If you are using the Enterprise edition then you need to define two AMP overlays, first the `alfresco-rm-core-share` artifact and then the `alfresco-rm-enterprise-share` artifact.

8.  Verify that the AIO project has been configured with the RM module.
9.  Build and Run the AIO project.

    Use the `all-in-one/run.sh` script to run Alfresco Tomcat with the customized WARs.

10. Check the logs for installation of RM module.

    ```
    
    ... Repository Side:
    2016-05-04 07:49:31,752  INFO  [repo.module.ModuleServiceImpl] [localhost-startStop-1] Found 3 module package(s).
    2016-05-04 07:49:31,777  INFO  [repo.module.ModuleServiceImpl] [localhost-startStop-1] Installing module 'org_alfresco_module_rm' version 2.4.
    2016-05-04 07:49:32,328  INFO  [repo.module.ModuleServiceImpl] [localhost-startStop-1] Installing module 'alfresco-share-services' version 5.1.0.
    2016-05-04 07:49:32,363  INFO  [repo.module.ModuleServiceImpl] [localhost-startStop-1] Installing module 'aio-220-rm-repo-amp' version 1.0-SNAPSHOT.
    ... Share Side:                       
    2016-05-04 07:50:01,595  INFO  [config.packaging.ModulePackageManager] [localhost-startStop-1] Found 2 module package(s)
    2016-05-04 07:50:01,597  INFO  [config.packaging.ModulePackageManager] [localhost-startStop-1] Alfresco Share AMP Module, 1.0-SNAPSHOT
    Alfresco Record Management Share Extension, 2.4, Alfresco Record Management Share Extension
    ...
    INFO: Starting ProtocolHandler ["http-bio-8080"]
    
    ```

    **Note:** We can see here that version 2.4 of the RM module has been installed.

11. Check that the Site Type `Records Management` is available.

    Login to Share via http://localhost:8080/share and then create a new site. When you create the site select `Records Management Site` from the **Type** drop down. If this type is not available then something is not configured correctly, go back and verify that you have followed all the steps correctly.


You have now seen how a standard Alfresco extension module, such as RM, can be brought into the All-in-One project. Other standard modules, such as SPP, can be added in a similar way. Note that some extension modules are implemented in only one AMP. For example, the SPP AMP is implementing the SharePoint Protocol, which only touches the repository functionality, and so there is only an SPP dependency and overlay in the all-in-one/repo/pom.xml project.

**Parent topic:**[Advanced Topics](../concepts/alfresco-sdk-advanced-topics.md)

