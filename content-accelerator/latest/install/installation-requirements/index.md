---
title: Installation Requirements
---

The server setup required to run ACA vary based on client needs.  Below are some general guidelines and recommendations.

**Application Components for Every Installation**
- ACA - web application
- OpenContent Services - web services layer.  See the [OpenContent Services Install Guide](https://github.com/tsgrp/OpenContent/wiki/Installation-guide) for information specific to OpenContent Services.
- Java Application server - required to run OpenContent Services and potentially ACA, AEV, and Active Wizard Admin.  Apache Tomcat 8.x or above is reccommended. Note that it is possible to deploy these apps to the Alfresco Tomcat directly. Installing ACA, AEV, and AW admin to a separate application server (not on the Alfresco tomcat) is reccomended.

**Additional Application Components**
- Alfresco Enterprise Viewer (WAR) - required if using AEV for document annotations
- Active Wizard admin (WAR) - required if using the Policy and Procedure Solution

**Server Requirements**
- Both physical and virtual servers are acceptable.  Clients have used Windows, Linux and UNIX servers in production successfully.
- 64-bit architecture servers are reccomended. 
- Application servers can be load balanced for performance as well as HA/DR, however *sticky sessions* are required.  In other words, if a user accesses ACA on Server A, that instance must communicate with the same OpenContent Services for the entire session.
- ACA is installed as a Java web application (WAR). 
- As always, the more RAM the better.  A minimum of 4GB of heap on the application server is typically reccomended.  At least 8GB is preferable.
- If OpenContent is installed on a Linux server, a TrueType Font set including Arial is required to be installed onto the instance.  Read more here: [[Installation Requirements Font Install]]

**Client Requirements**

The following web browsers are supported:
- Internet Explorer 11 and above
- Chrome (any recent version)
- Firefox (any recent version)

The following sections discuss requirements for each of the major ACA application categories:
