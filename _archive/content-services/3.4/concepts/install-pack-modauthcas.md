---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Install required packages

This topic provides a list of the packages required at machine 1 to enable Alfresco to work with `mod_auth_cas`.

The installation requires an Apache server with `mod_ssl` installed, as well as the packages required to compile and install other apache modules. So, ensure the following packages are installed at machine 1:

-   `httpd`
-   `mod_ssl`
-   `httpd-devel`
-   `apr`
-   `apr-devel`
-   `apr-util`
-   `apr-util-devel`
-   `subversion`

**Note:** Ensure that Red Hat's Tomcat packages are not installed, as CAS and Alfresco will require their own Tomcat 6 installation.

**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

