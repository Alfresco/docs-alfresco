---
author: [Alfresco Documentation, ]
audience: 
category: WQS
keyword: [WQS, Web, Quick Start]
---

# Configuring the web application host name, port, and context

This section describes how to change the host name, port, and context for the Web Quick Start web application.

The Web Quick Start installation assumes that the web application has been deployed to localhost on port 8080, using the context of wcmqs. This means that the editorial website can be accessed at [http://localhost:8080/wcmqs](http://localhost:8080/wcmqs). The "live" website can be accessed as default on [http://127.0.0.1:8080/wcmqs](http://127.0.0.1:8080/wcmqs).

If you are not running the web application on port 8080 or if the web application is deployed to a different container or host, you can configure the site to the required location.

1.  In the Web Quick Start site, navigate to the **Document Library**.

2.  Click **Edit Metadata** on either the **Quick Start Editorial** folder, or the **Quick Start Live** folder.

3.  Configure the **Host Name**, **Port**, and **Web App Context** fields to point to the location your web application \(wcmqs.war\).

4.  Click **Submit**.


**Parent topic:**[Configuring Web Quick Start](../tasks/WQS-config.md)

