---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the web application host name, port, and context

This section describes how to change the host name, port, and context for the Web Quick Start web application.

The Web Quick Start installation assumes that the web application has been deployed to localhost on port 8080, using the context of wcmqs. This means that the editorial website can be accessed at [http://localhost:8080/wcmqs](http://localhost:8080/wcmqs). The "live" website can be accessed as default on [http://127.0.0.1:8080/wcmqs](http://127.0.0.1:8080/wcmqs).

If wcmqs.war is deployed on a different application server, such as Tomcat, you will need to modify the configuration to use the IP of the host application server where the wcmqs.war is deployed. For example, \{tomcat\}/webapps/wcmqs. Also, use the port that Tomcat is listening on.

1.  In the Web Quick Start site, navigate to the **Document Library**.

2.  Click **Edit Metadata** on either the **Quick Start Editorial** folder, or the **Quick Start Live** folder.

3.  Configure the **Host Name**, **Port**, and **Web App Context** fields to point to the location your web application \(wcmqs.war\).

4.  Click **Submit**.


A Web Quick Start installation with two projects, such as an editorial site and a live site, cannot use the same combination of host, port, and context.

**Parent topic:**[Configuring Web Quick Start](../tasks/WQS-config.md)

