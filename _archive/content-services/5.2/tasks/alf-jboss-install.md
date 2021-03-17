---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing Alfresco Content Services on JBoss

You can install and deploy the Alfresco WAR on the JBoss application server.

Ensure that JBoss and Java 8 are installed. Review the [Support Platforms](../concepts/supported-platforms-ACS.md) page for more information.

The following instructions:

-   Assume that you know the path of the JBoss directory, which is represented as <JBOSS\_EAP\_HOME\>.
-   Are written for Windows Server 2012 R2 installation with MySQL as data source. See the [JBoss Enterprise Application Platform 6](https://access.redhat.com/site/documentation/en-US/JBoss_Enterprise_Application_Platform/6/html-single/Administration_and_Configuration_Guide/index.html) guide for more details on JBoss EAP 6 configuration.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com).

2.  Download the Enterprise zip file alfresco-content-services-ear-distribution-5.2.7.zip.

3.  Create a temporary directory \(the path for it is represented as <TEMP\>\) and uncompress the zip file here.

4.  Create a module with Alfresco Content Services configuration.

    1.  Create a main directory, for example at <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main.

    2.  Copy the unzipped contents of <TEMP\>\\web-server\\classpath to <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main directory.

        **Note:** Do not set the database properties at this stage.

    3.  Modify the alfresco-global.properties.sample file in the <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main directory.

        See [Modifying the global properties file](global-props-config.md) for more information.

    4.  Save the alfresco-global.properties.sample file without the .sample extension.

    5.  Create the Alfresco Content Services configuration file, module.xml in the <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main directory with the following content:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
          <module xmlns="urn:jboss:module:1.0" name="org.alfresco.configuration">
            <resources>
             <resource-root path="."/>
            </resources>
          </module>
        ```

    6.  Extract the EAR file found in alfresco-content-services-ear-distribution-5.2.7.zip and check the contents of META-INF\\jboss-deployment-structure.xml:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
          <jboss-deployment-structure>
           <sub-deployment name="alfresco.war">
            <dependencies>
             <module name="org.alfresco.configuration" />
              <module name="org.apache.xalan" />
            </dependencies>
           </sub-deployment>
           <sub-deployment name="share.war">
            <dependencies>
             <module name="org.alfresco.configuration" />
            </dependencies>
           </sub-deployment>
          </jboss-deployment-structure>                                           
        ```

5.  Follow the instructions for [configuring JBoss for Alfresco Content Services](alf-jboss-config.md).


-   **[Configuring JBoss for Alfresco Content Services](../tasks/alf-jboss-config.md)**  
Use this information to configure an Alfresco Content Services installation on JBoss.
-   **[Installing Solr on JBoss 6 EAP with Java 8](../tasks/solr-jboss-install.md)**  
Use this information to install Solr on the same JBoss 6 instance on which Alfresco Content Services is installed.
-   **[Configuring on JBoss with Solr installed on a Tomcat instance](../tasks/solr-tomcat-install.md)**  
Use this information to configure Alfresco Content Services deployed on JBoss EAP 6 with Solr on a separate Tomcat instance.

**Parent topic:**[Installing Alfresco Content Services on other web applications](../concepts/other-apps-install.md)

**Related information**  


[Configuring JBoss for Alfresco Content Services](alf-jboss-config.md)

[Modifying the global properties file](global-props-config.md)

