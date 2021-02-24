---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Installing Alfresco on JBoss

You can install and deploy the Alfresco WAR on the JBoss application server.

Ensure that JBoss and Java 8 are installed. Review the Supported Platforms page on the [Support Portal](http://support.alfresco.com) for more information.

The following instructions:

-   Assume that you know the path of the JBoss directory, which is represented as <JBOSS\_EAP\_HOME\>.
-   Are written for Windows Server 2008 R2 installation with MySQL as data source. See the [JBoss Enterprise Application Platform 6](https://access.redhat.com/site/documentation/en-US/JBoss_Enterprise_Application_Platform/6/html-single/Administration_and_Configuration_Guide/index.html) guide for more details on JBoss EAP 6 configuration.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com).

2.  Download the alfresco-enterprise-ear-5.0.5.zip file.

3.  Create a temporary directory \(the path for it is represented as <TEMP\>\) and uncompress the zip file here.

4.  Create a module with Alfresco configuration.

    1.  Create a main directory, for example at <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main.

    2.  Copy the contents of <TEMP\>\\web-server\\classpath to the <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main directory.

        **Note:** Do not set the database properties at this stage.

    3.  Modify the alfresco-global.properties.sample file in the <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main directory.

        See [Modifying the global properties file](global-props-config.md) for more information.

    4.  Save the alfresco-global.properties.sample file without the .sample extension.

    5.  Create the Alfresco configuration file, module.xml in the <JBOSS\_EAP\_HOME\>\\modules\\org\\alfresco\\configuration\\main directory with the following content:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
          <module xmlns="urn:jboss:module:1.0" name="org.alfresco.configuration">
            <resources>
             <resource-root path="."/>
            </resources>
          </module>
        ```

    6.  Extract the EAR file and check the contents of the META-INF\\jboss-deployment-structure.xml:

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

5.  Follow the instructions for [configuring JBoss for Alfresco](alf-jboss-config.md).


-   **[Configuring JBoss for Alfresco](../tasks/alf-jboss-config.md)**  
Use this information to configure an Alfresco installation on JBoss.
-   **[Installing Solr on JBoss 6 EAP with Java 8](../tasks/solr-jboss-install.md)**  
Use this information to install Solr on the same JBoss 6 instance on which Alfresco is installed.
-   **[Configuring Alfresco on JBoss with Solr installed on a Tomcat instance](../tasks/solr-tomcat-install.md)**  
Use this information to configure Alfresco deployed on JBoss EAP 6 with Solr on a separate Tomcat instance.

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

**Related information**  


[Configuring JBoss for Alfresco](alf-jboss-config.md)

[Modifying the global properties file](global-props-config.md)

