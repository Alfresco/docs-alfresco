---
title: Install Federation Services
---

The Federation Services capability for Alfresco Content Services is delivered in a number of installation files.

## Prerequisites

Check the [supported platforms]({% link federation-services/latest/support/index.md %}) for information on what you require before you start the installation.

> **Note**: A compatible version of Alfresco Governance Services (if you plan to use the Manage in Place capabilities) is required, for example: if using Alfresco Content Services 6.2, make sure that you install Alfresco Governance Services 3.2 or above.

You can download the Federation Services software from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

### Federation Services requirements

* Federation Services Admin server (i.e. Simflofy Admin)
* TSearch component (provides federated search capabilities)
* MongoDB server
* Tomcat server

    **Note:** We recommend using a separate instance, where possible, instead of using the same one used by Alfresco Content Services.

See the [Simflofy documentation](https://simflofy.helpdocsonline.com/iandc/architecture){:target="_blank"}, for specific hardware and software requirements.

**Note:** This release of Alfresco Federation Services doesn't support deployment in Docker containers.

## Install steps

These steps describe how to install Federation Services to an instance of Alfresco Content Services.

1. Go to [Hyland Community](https://community.hyland.com/){:target="_blank"} and download the files provided for the Federation Services release.

    This should include the following:

    * `federation.war`: Simflofy Admin application
    * `t-search-3.0.0.6.war`: Federated search application
    * `transparent-content-services-platform-3.0.0.6.jar`: Transparent Content Services (TCS) JAR module for Manage-In-Place (to be applied to the Alfresco Content Services repository)
    * `transparent-content-services-share-3.0.0.6.jar`: Transparent Content Services (TCS) JAR module for Manage-In-Place (to be applied to Alfresco Share)

2. Follow the steps in the Simflofy documentation, [Installing Simflofy Admin](https://simflofy.helpdocsonline.com/iandc/install){:target="_blank"}.

3. After completing all the installation steps, you'll need to access the Admin app through your preferred browser to [configure]({% link federation-services/latest/config/index.md %}) your installation.
