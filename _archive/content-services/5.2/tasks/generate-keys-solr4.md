---
author: [Alfresco Documentation, Alfresco]
---

# Generating secure keys for Solr communication

This task describes how to replace or update the keys used to secure communication between Alfresco Content Services and Solr, using secure keys specific to your installation.

The following instructions assume that Solr has been extracted and a keystore directory has already been created, either automatically by the Alfresco Content Services installer or manually by following the instructions in the [Configuring Solr](solr4-install-config.md) section.

If you are applying these instructions to a clustered installation, the steps should be carried out on a single host, and then the generated .keystore and .truststore files must be replicated across all other hosts in the cluster.

1.  Download the relevant script from the [Customer Support](https://support.alfresco.com) website, or from the following location in the extracted distribution zip content:

    <installLocation\>/alf\_data/keystore/generate\_keystores.sh \(for Linux and Solaris\)

    <installLocation\>/alf\_data/keystore/generate\_keystores.bat \(for Windows\)

2.  Check the following directories for your environment.

    1.  If you are updating an environment created by the installer, you only need to edit ALFRESCO\_HOME and SOLR\_HOME to specify the correct installation directory.

    2.  For manual installations, carefully review ALFRESCO\_KEYSTORE\_HOME, SOLR\_HOME, JAVA\_HOME, REPO\_CERT\_DNAME and SOLR\_CLIENT\_CERT\_DNAME and edit as appropriate.

        By default, for Solr SOLR\_HOME refers to <ALFRESCO\_HOME\>/solr4.

3.  Run the edited script to generate your certificates.

    You should see the message Certificate update complete and another message reminding you what dir.keystore should be set to in the alfresco-global.properties file.


**Parent topic:**[Configure Solr search service](../concepts/configure-solr4.md)

