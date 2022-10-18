---
title: Enterprise Viewer Installation Guide
---

## Supported Versions

### Document Repository

The open source download of OpenAnnotate is supported on the following ECM platforms:

ECM Platform | Minimum Version
--- | ---
EMC Documentum | 6.5 and above
Alfresco | 4.2 and above

If you need to support older versions of the repositories above or other repositories, TSG can build OpenAnnotate for our clients running:

Platform | Minimum Version
--- | ---
EMC Documentum | 5.3 SP6.5 and above
Alfresco | 4.0.2.9 and above

### Java

OpenAnnotate requires Java 1.5 or above. Consult your repository of choice for more detailed requirements. For example, Alfresco 4.0 and 4.1 require Java 1.6.  Alfresco 4.2 requires Java 1.7.

## Installation

### Prerequisites

OpenContent is a prerequisite before OpenAnnotate can be installed. For OpenContent installation instructions, please see the [OpenContent Installation Guide](https://github.com/tsgrp/OpenContent/wiki/Installation-guide). Note: you MUST install OpenContent before OpenAnnotate will function, so be sure to follow those steps before continuing.

### OpenAnnotate Installation

Before installing OpenAnnotate, you must update configurations based on your environment. Open the OpenAnnotate.war file using a Zip viewer such as 7-zip and edit the `WEB-INF/classes/override-placeholders.properties` file. Alternatively, you can explode the war file, edit the file, and then re-create the war file.

We need to override the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent.  Add or modify the following line to `override-placeholders.properties`:

- Documentum
  - `ocRestEndpointAddress=http://${your-server}:${port}/OpenContent/rest`
- Alfresco
  - `ocRestEndpointAddress=http://${your-server}:${port}/alfresco/OpenContent`

You must replace the tokens above as necessary.

Once the above configurations have been updated, simply deploy the updated OpenAnnotate.war file to the application server of your choice.  Example on an Apache Tomcat, simply place the OpenAnnotate.war in the ${tomcat_home}/webapps directory.

After installing and starting your Java application server, visit the following URL to verify your installation:

    http://${your-server}:${port}/OpenAnnotate

## Alfresco Additional Installation Steps

To save annotations in Alfresco, a new folder for holding annotation objects must be configured and/or created in which everybody has "CONTRIBUTOR" permissions. Choose one of the following:

1. Create new folder manually
    - Create a folder in the repository root named 'OpenAnnotate' and create a sub-folder named 'Annotations'. Set the permissions on the root 'OpenAnnotate' folder so that everybody that will be annotating has at least "CONTRIBUTOR" permissions.
1. Install the included ACP
    - The OpenAnnotate install distribution includes an 'OpenAnnotate.acp' that can be installed that automates the above process by creating the folders and setting the permissions automatically.
1. Configure OpenContent with an existing folder (make sure all users have "CONTRIBUTOR" permissions on this folder)
    - In your OpenContent installation edit the following file `/alfresco/WEB-INF/classes/override-placeholders.properties`
    - Add the following property:

        > **Properties:** \# Substitute your folder path here.
        annotation.annotationPath=/OpenAnnotate/Annotations

## Understand Configuration Files

Once you have finished installing, it's important that you understand how OA can be configured. Please see the [OpenAnnotate Configuration Guide](https://github.com/tsgrp/OpenAnnotate/wiki/OA-Configuration-Files) for more information.

## OpenAnnotate Integrations

Also, don't forget to configure the integrations with Webtop/FirstDoc, HPI, D2, CARA:

- [[Webtop/FirstDoc Integration Installation]]
- [OCMS](https://github.com/tsgrp/hpi/wiki/Installation-guide)
- D2
- CARA
- [Alfresco Share](https://github.com/tsgrp/OpenAnnotate/wiki/Alfresco-Share-Integration-Installation)
- [Alfresco ADF]
