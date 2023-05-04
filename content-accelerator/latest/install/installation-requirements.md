---
title: Installation Requirements
---

The server setup required to run ACA will vary based on the needs for that specific install.  Below are some general guidelines and recommendations. Please note that this page is meant to represent general guidance and recommendations regarding deployments. For additional info, see the [Deployment and Containerization Support Policy]({% link support/latest/policies/deployment.md %}).

### Application Components for Every Installation

* ACA - web application
* OpenContent Services - web services layer
* Java Application server - required to run OpenContent Services and potentially ACA, AEV, and Active Wizard Admin.  Apache Tomcat 8.x or above is recommended. **Note:** It is possible to deploy these apps to the Alfresco Tomcat directly. Installing ACA, AEV, and AW admin to a separate application server (not on the Alfresco tomcat) is recommended.

### Additional Application Components

* Alfresco Enterprise Viewer (WAR) - required if using AEV for document annotations
* Active Wizard admin (WAR) - required if using the Policy and Procedure Solution

### Server Requirements

* Both physical and virtual servers are acceptable.  Windows, Linux and UNIX servers have been used in production successfully.
* 64-bit architecture servers are recommended.
* Application servers can be load balanced for performance as well as HA/DR, however *sticky sessions* are required.  In other words, if a user accesses ACA on Server A, that instance must communicate with the same OpenContent Services for the entire session.
* ACA is installed as a Java web application (WAR).
* As always, the more RAM the better.  A minimum of 4GB of heap on the application server is typically recommended.  At least 8GB is preferable.
* If OpenContent is installed on a Linux server, a TrueType Font set including Arial is required to be installed onto the instance.  Read more here: [[Installation Requirements Font Install]]

### Client Requirements

The following web browsers are supported:

* Internet Explorer 11 and above
* Chrome (any recent version)
* Firefox (any recent version)

<!-- removed line as it had no following list:
The following sections discuss requirements for each of the major ACA application categories: -->
