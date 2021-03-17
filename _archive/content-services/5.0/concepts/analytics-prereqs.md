---
author: Alfresco Documentation
audience: 
category: 
---

# Prerequisites for using Alfresco Analytics

There are a number of software requirements for using Alfresco Analytics.

You require one of each of the following components:

**Platform requirements**

Linux operating system

**Database requirements**

You require one of the following databases:

-   PostgreSQL v9.3.5 or later \(this is shipped in the Alfresco Analytics distribution zip, but you can use an existing instance if required\). See [Alfresco supported platforms](http://www.alfresco.com/services/subscription/supported-platforms/) for your version of Alfresco for information on the supported version of PostgreSQL.

    **Note:** If you are using PostgreSQL, you must have a 64-bit Linux operating system.

-   MySQL Server v5.1.73, or v5.5, or a later release

**Analytics server requirements**

Dual-core processor with a minimum of 8 GB RAM. See [Pentaho Components Reference](http://help.pentaho.com/Documentation/5.1/0D0/160/000) for further details on the required specification for the Analytics server.

**Alfresco requirements**

Alfresco Enterprise 5.0 or later for both pre-defined and custom reports

**Java requirements**

Java 7 or later

**General requirements**

Apache ActiveMQ 5.11.1 \(this is shipped in the Alfresco Analytics distribution zip, but you can use an existing instance if required\)

Make sure that you have added the JDBC database driver to your Alfresco classpath \(for example, tomcat/lib\) for the database that you are using.

To avoid scalability problems and Tomcat conflict issues, install the Alfresco and Analytics servers on separate logical servers. See [Analytics architecture](analytics-architecture.md) for more information.

**Browser support**

The Analytics server supports the following browsers:

-   Chrome version 37 or later
-   Internet Explorer versions 9, 10 and 11
-   Mozilla Firefox version 31 or later

