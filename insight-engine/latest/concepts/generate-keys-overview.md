---
title: Generating secure keys overview
---
This section describes a recommended approach for generating and setting up certificates. It is not required that you use this approach if you have an alternative solution that you already use.

If you're installing Alfresco Content Services using the distribution zip, you need to generate certificates for the repository and Solr. By default, the distribution zips are configured to use SSL, so you'll need to generate these certificates to get your system to run successfully.

You can create the keystores, truststores and certificates required to configure SSL/mutual TLS authentication between different services in Alfresco Content Services, such as the repository and Solr.
