---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, directory, configuration files]
---

# Solr directory structure

After you have installed Alfresco, several directories and configuration files related to Solr will be available in the Alfresco home directory. This section explains the Solr directory structure.

-   ****alfresco\\alf\_data\\solr****

    This is the Solr home directory. It contains the Solr cores: archive-SpacesStore\(for deleted content\) and workspace-SpacesStore\(for live content\). It also contains two configurations files: context.xml and solr.xml.

    A Solr core holds one Lucene index and the supporting configuration for that index.


-   ****

    The Solr directory contains the following sub-folders and files:

    -   archive: This directory contains the Lucene index for the archive core.
    -   archive-SpacesStore: This is the configuration directory for the archive core.
    -   docs: This directory contains example update, delete, and commit XML documents.
    -   lib: This directory contains extra libraries that Solr loads on start up. These libraries are used to communicate with Alfresco via CMIS, Alfresco data model or Spring Surf Web Scripts.
    -   workspace: This directory contains the Lucene index for the workspace core.
    -   workspace-SpacesStore: This is the configuration directory for the workspace core.
    -   apache-solr-1.4.1.war: This is the patched version of Apache Solr 1.4.1 Web Application by Alfresco.
    -   apache-solr-1.4.1.war.unpatched: This is the original unpatched version of Apache Solr 1.4.1.
    -   CreateSSLKeystores.txt: This file contains instructions for generating Solr SSL keystores.
    -   HowToSetUpSolr.txt: This file contains instructions on setting up Solr on a dedicated server.
    -   solr.xml: This configuration file specifies the cores to be used by Solr.
    -   context.xml: This configuration file specifies the Solr web application context template to use when installing Solr in separate tomcat server.
-   **alfresco\\alf\_data\\solr\\workspace-SpacesStore and alfresco\\alf\_data\\solr\\archive-SpacesStore**

    Both these directories are instance directories for Solr core.

    The Solr directory contains the following sub-folders and files:

    -   alfrescoModels: This directory contains all the content models that come out of the box with Alfresco. Any new custom content model added to Alfresco are synced to this directory so that Solr knows about it.
    -   alfrescoResources: This directory contains resource files that specifies what Data Type Index Analyzers should be used for different languages. For example, the default analyzer for Alfresco data type is defined in the **dataTypeAnalyzers.properties** file as:

        ```
        d_dictionary.datatype.d_text.analyzer=org.alfresco.repo.search.impl.lucene.analysis.AlfrescoStandardAnalyser
        ```

    -   conf: This is the main configuration directory for Solr core.
-   **alfresco\\alf\_data\\solr\\workspace-SpacesStore\\conf and alfresco\\alf\_data\\solr\\archive-SpacesStore\\conf**

    This is the configuration directory for Solr core. Both these directories are instance directories for Solr core.

    The conf directory contains the following configuration files: schema.xml, solrconfig.xml, solrcore.properties, ssl.repo.client.keystore, ssl.repo.client.truststore, ssl-keystore-passwords.properties and ssl-truststore-passwords.properties. To know more about these configuration files, see [Solr Configuration Files](solr-config-files.md).


**Parent topic:**[Configuring Solr](../concepts/solr-webapp-config.md)

