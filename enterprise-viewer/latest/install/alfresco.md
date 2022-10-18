---
title: Alfresco Integration Installation
---

## Alfresco Share

This page contains instructions for installing the OpenAnnotate Alfresco and Share AMPs.

1. `oa-alfresco.amp` - Required for either OpenAnnotate Share integration.

### One (or more) of the following

1. `oa-share-external-launcher.amp` - OpenAnnotate action in Share
1. `oa-share-webpreview.amp` - OpenAnnotate replacing the OOB Share viewer

If you are a developer looking to build these AMP packages from the SVN source code, see the page [Building the OpenAnnotate Alfresco and Share AMPs](https://github.com/tsgrp/OpenAnnotate/wiki/Building-the-OpenAnnotate-Alfresco-and-Share-AMPs).

If you are looking to install similar AMPs that use OpenAnnotate as a Service, see the page [Installing OpenAnnotate Service Alfresco and Share AMPs](https://github.com/tsgrp/OpenAnnotate/wiki/Installing-OpenAnnotate-Service-Alfresco-and-Share-AMPs).

### The Share Customizations

The OpenAnnotate Share customizations add additional functionality to Alfresco share for launching OpenAnnotate. The customizations are extensions to Alfresco share that follow the Alfresco SURF conventions for extending share. They do not impact other customizations, and do NOT extend/overwrite components that we typically see clients customize (like object models, security, folder structure).

#### oa-share-external-launcher.amp

The `oa-share-external-launcher.amp` package is designed to create an Alfresco Share customization that allow the user to open a repository asset in OpenAnnotate directly from the Share web application. It adds an additional action named "OpenAnnotate" that shows up in Share's document actions when viewing a document.

#### oa-share-webpreview.amp

The `oa-share-webpreview.amp` package is designed to create an Alfresco Share customization that replaces Share's viewer for certain documents viewed in Share with OpenAnnotate.  You can see a video of the integration working here : <http://www.tsgrp.com/video/openannotate-alfresco-share-integration/>

Here you can see a video of both integrations working : <http://www.tsgrp.com/video/openannotate-alfresco-share-integration/>

## Installing the OpenAnnotate Alfresco and Share AMPs

1. Copy the `oa-alfresco.amp` file to your `ALFRESCO_HOME/amps` folder.

1. Copy the `oa-share-external-launcher.amp` and/or the 'oa-share-webpreview.amp' file(s) to your `ALFRESCO_HOME/amps_share` folder.

1. If you built either of the OpenAnnotate Share AMP packages yourself, you may skip this step. Otherwise, edit the following files in your OpenAnnotate Share amp(s) by extracting them or by editing them directly inside the amp:

    - `/web/component/(documentlibrary or preview)/annotation-urls.js`
    - `/web/component/(documentlibrary or preview)/annotation-urls-min.js`

    In both cases, you need to update the `Alfresco.constants.WEBPREVIEW_ANNOTATION_URL` and/or `Alfresco.constants.EXTERNAL_LAUNCHER_ANNOTATION_URL` variable within these files. This variable needs to be updated with the URL of the server that OpenAnnotate is going to be deployed on (even if OpenAnnotate is deployed on the same server as the Share web application).

    For example:

        Alfresco.constants.WEBPREVIEW_ANNOTATION_URL = "http://jarvis2:8080/OpenAnnotate/login/external.htm";
        Alfresco.constants.EXTERNAL_LAUNCHER_ANNOTATION_URL = "http://jarvis2:8080/OpenAnnotate/login/external.htm";

1. If Alfresco and Share are running, shut them down.

1. Using `alfresco.mmt`, install the `oa-alfresco.amp` file into the `alfresco.war` file and the OpenAnnotate Share amp(s) file into the `share.war` file by navigating to the ${alfresco.home} directory and running the following commands:

        java -jar bin/alfresco-mmt.jar install amps/oa-alfresco.amp tomcat/webapps/alfresco.war -verbose
        java -jar bin/alfresco-mmt.jar install amps_share/oa-share-external-launcher.amp tomcat/webapps/share.war -verbose
        java -jar bin/alfresco-mmt.jar install amps_share/oa-share-webpreview.amp tomcat/webapps/share.war -verbose

1. Remove the old alfresco and share folders located in the ${alfresco.home}/tomcat/webapps directory.

1. Start up the Alfresco and Share server(s).

1. To verify the AMPs have been installed correctly, perform steps for each OpenAnnotate Share amp:

- `oa-share-external-launcher.amp` - open an asset in Share and look at the Document Actions panel on the right-hand side of the screen. Ensure that the asset has a PDF rendition or a suitable image rendition available for OpenAnnotate. If you installed the `oa-share-external-launcher.amp`, the "OpenAnnotate" action should be available.  
- `oa-share-webpreview.amp` - open an asset in Share. If you installed the `oa-share-webpreview.amp` and the asset has a PDF rendition or a suitable image rendition available for OpenAnnotate, the asset should appear in "OpenAnnotate" directly in the Share application screen.

## Alfresco Application Development Framework

1. Install OpenAnnotate as a WAR against Alfresco standalone, either as part of the Alfresco Tomcat or as a separate Tomcat/Java application server.

1. Update or fork the existing document preview action to open a link in an IFrame to the OpenAnnotate external link using the nodeId as parameter.

1. If on a separate application server, update the proxy rules for your ADF application to ensure the OpenAnnotate external link may be accessed without CORS errors.
