---
author: [Alfresco Documentation, Alfresco]
---

# Generating secure keys for Solr 4 communication

This task describes how to replace or update the keys used to secure communication between Alfresco and Solr 4, using secure keys specific to your Alfresco installation.

The following instructions assume that Solr 4 has been extracted and a keystore directory has already been created, either automatically by the Alfresco installer or manually by following the instructions in the [Configuring Solr 4](solr4-install-config.md) section.

If you are applying these instructions to a clustered installation, the steps should be carried out on a single host and then the generated .keystore and .truststore files must be replicated across all other hosts in the cluster.

1.  Obtain the file generate\_keystores.sh \(for Linux and Solaris\) or generate\_keystores.bat \(for Windows\) from the [Alfresco Customer Support](https://support.alfresco.com) website.

2.  If you are updating an environment created by the Alfresco installer, you only need to edit ALFRESCO\_HOME and SOLR\_HOME to specify the correct installation directory.

    1.  If you are updating an environment created by the Alfresco installer, you only need to edit ALFRESCO\_HOME to specify the correct installation directory.

    2.  For manual installations, carefully review ALFRESCO\_KEYSTORE\_HOME, SOLR\_HOME, JAVA\_HOME, REPO\_CERT\_DNAME and SOLR\_CLIENT\_CERT\_DNAME and edit as appropriate.

        By default, for Solr 4 SOLR\_HOME refers to <ALFRESCO\_HOME\>/solr4.

3.  Run the edited script.

    You should see the message Certificate update complete and another message reminding you what dir.keystore should be set to in the alfresco-global.properties file.


**Parent topic:**[Configure Solr 4 search service](../concepts/configure-solr4.md)

