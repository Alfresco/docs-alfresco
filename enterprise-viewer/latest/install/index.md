---
title: Enterprise Viewer Installation Guide
---

## Supported Versions

### Java

Alfresco Enterprise Viewer requires Java 11 or above. Consult your repository of choice for more detailed requirements. For example, Alfresco 4.0 and 4.1 require Java 1.6.  Alfresco 4.2 requires Java 1.7.

## Installation

### Prerequisites

OpenContent is a prerequisite before Alfresco Enterprise Viewer can be installed. For OpenContent installation instructions, please see the [OpenContent Installation Guide](https://github.com/tsgrp/OpenContent/wiki/Installation-guide). Note: you MUST install OpenContent before Alfresco Enterprise Viewer will function, so be sure to follow those steps before continuing.

### Alfresco Enterprise Viewer Installation

Before installing Alfresco Enterprise Viewer, you must update configurations based on your environment. Open the OpenAnnotate.war file using a Zip viewer such as 7-zip and edit the `WEB-INF/classes/override-placeholders.properties` file. Alternatively, you can explode the war file, edit the file, and then re-create the war file.

We need to override the `ocRestEndpointAddress` property to point to the root REST endpoint URL for OpenContent.  Add or modify the following line to `override-placeholders.properties`:

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
    - The Alfresco Enterprise Viewer install distribution includes an 'OpenAnnotate.acp' that can be installed that automates the above process by creating the folders and setting the permissions automatically.
1. Configure OpenContent with an existing folder (make sure all users have "CONTRIBUTOR" permissions on this folder)
    - In your OpenContent installation edit the following file `/alfresco/WEB-INF/classes/override-placeholders.properties`
    - Add the following property:

        > **Properties:** \# Substitute your folder path here.
        annotation.annotationPath=/OpenAnnotate/Annotations

## Understand Configuration Files

Once you have finished installing, it's important that you understand how AEV can be configured. Please see the [Alfresco Enterprise Viewer Configuration Guide]({% link enterprise-viewer/latest/config/files.md %}) for more information.

## Alfresco Enterprise Viewer Integrations

Also, don't forget to configure the integrations with Webtop/FirstDoc, HPI, D2, CARA:

- [[Webtop/FirstDoc Integration Installation]]
- [OCMS](https://github.com/tsgrp/hpi/wiki/Installation-guide)
- D2
- CARA
- [Alfresco Share]({% link enterprise-viewer/latest/install/alfresco.md %})
- [Alfresco ADF]
