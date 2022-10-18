---
title: Building the Alfresco Enterprise Viewer Alfresco and Share AMPS
---

The OpenAnnotate Alfresco and Share AMPs contain customizations that allow users to open a repository asset in OpenAnnotate directly from the Share web application and/or view assets through the OpenAnnotate viewer directly in the Share interface. This page contains instructions on building the OpenAnnotate Alfresco and Share AMPs from the SVN source code. Once the AMPs are built, follow the [Alfresco Share Integration Installation](https://github.com/tsgrp/OpenAnnotate/wiki/Alfresco-Share-Integration-Installation) instructions for details on deploying the AMPs.

## Building the OpenAnnotate Alfresco AMP

**NOTE:** There are currently NO environment specific code updates that are required so no overlay folders need to be created.

1. Pull down the Share AMP source code into a local directory (we'll call this `OA_ALFRESCO_ROOT`) from the following SVN location:

    <http://svn.tsgrp.com/repos/annotationtool/trunk/external-integrations/alfresco-share/alfresco-amp>

1. Open a command prompt in the `OA_ALFRESCO_ROOT` directory.

1. Run the following command:

        gradle clean amp

1. Navigate to `OA_ALFRESCO_ROOT/build/distributions` to find the built `oa-alfresco.amp` file.

## Building the OpenAnnotate Share AMP - External Launcher

### This amp provides users

* an action that will open the document currently being viewed in Share in OpenAnnotate within a new tab
* an action that will open the document currently being viewed in Share in the OCMS indexer within a new tab
* an action to print an annotated PDF from the document currently being viewed in Share

1. Pull down the Share AMP source code into a local directory (we'll call this `OA_SHARE_EXTERNAL_LAUNCHER_ROOT`) from the following SVN location:

    <http://svn.tsgrp.com/repos/annotationtool/trunk/external-integrations/alfresco-share/share-external-launcher-amp>

1. To build, run the following command

        gradle clean amp

### The amp is configured with relative paths but overlays are available so that a user can

* launch to different paths than the default/ launch to full rather than relative paths

> Copy the C:\...\share-external-launcher-amp\src\main\web\components\documentlibrary\annotation-url.js file into your overlay under web/components/documentLibrary and adjust the urls in this file

* configure actions to appear based on different evaluators (the default evaluator checks that the document is unlocked before displaying the action)

> See the mnbopd overlay as an example - C:\...\share-external-launcher-amp\config\alfresco\web-extension\custom-slingshot-OA-context.xml file into your overlay under config\alfresco\web-extension and override the evaluator.doclib.action.can.annotate and evaluator.doclib.action.can.index beans to match the conditions you want your actions to appear based on

* turn off specific actions included in the amp

> Copy the C:\...\share-external-launcher-amp\config\alfresco\web-extension\share-config-OA-custom.xml file into your overlay under config\alfresco\web-extension and remove any action beans that you do not want to appear

#### Building with an overlay

1. Return to the `OA_SHARE_EXTERNAL_LAUNCHER_ROOT` directory and open a command prompt.

1. Run the following command (replace {ENV} with the new overlay directory you created in the `overlay` directory):

        gradle clean amp -Poverlay={ENV}

**Note: You do not need to use an overlay. If you build without an overlay the relative paths will be used and you can create this amp in an environment agnostic way.**

1. Navigate to `OA_SHARE_EXTERNAL_LAUNCHER_ROOT/build/distributions` to find the built `oa-share-external-launcher.amp` file.

## Building the OpenAnnotate Share WebPreview AMP

### This amp allows users to view specific document types within OpenAnnotate, directly in the Share web interface

1. Pull down the Share AMP source code into a local directory (we'll call this `OA_SHARE_WEBPREVIEW_ROOT`) from the following SVN location:

    <http://svn.tsgrp.com/repos/annotationtool/trunk/external-integrations/alfresco-share/share-webpreview-amp>

1. Open the `OA_SHARE_WEBPREVIEW_ROOT/overlay` folder and make a copy of the `overlayExample` directory. Rename this copied folder based on the environment you are creating the amp for (your machine, a development environment, etc.).

1. In the newly created folder, navigate to `web/components/preview` and open the `annotation-url.js` file.

1. Update the `Alfresco.constants.WEBPREVIEW_ANNOTATION_URL` variable to point to the location of the external login endpoint for OpenAnnotate. For example:

        Alfresco.constants.WEBPREVIEW_ANNOTATION_URL= "http://localhost:8080/OpenAnnotate/login/external.htm";

1. Return to the `OA_SHARE_WEBPREVIEW_ROOT` directory and open a command prompt.

1. Run the following command (replace {ENV} with the new overlay directory you created in the `overlay` directory):

        gradle clean amp -Poverlay={ENV}

**Note: You do not need to use an overlay. If you build without an overlay the relative paths will be used and you can create this amp in an environment agnostic way.**

1. Navigate to `OA_SHARE_WEBPREVIEW_ROOT/build/distributions` to find the built `oa-share-webpreview.amp` file.
