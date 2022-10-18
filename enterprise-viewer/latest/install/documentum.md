---
title: Documentum Integration Installation
---

## Install on Webtop or FirstDoc

1. Grab the distribution of the OpenAnnotate Webtop/FirstDoc Customizations.
1. Stop the App Server instance running Webtop/FirstDoc.
1. Copy the OpenAnnotate customizations to your Webtop/FirstDoc directory.
1. Edit/save `/openannotate/app.xml` and update the module being extended to be the existing top level module that is being customized:

    ```xml
    <application extends="custom/app.xml">
    ```

    * wdk
    * webcomponent
    * webtop
    * custom
    * openannotate

1. Edit/save `/WEB-INF/web.xml` and update the `AppFolderName` context-param with a value of `openannotate`

    ```xml
    <context-param>
        <param-name>AppFolderName</param-name>
        <param-value>openannotate</param-value>
    </context-param>
    ```

1. Edit/save the `/openannotate/config/library/annotate/annotate_component.xml` file and update the URLs in the following sections to point to your OpenAnnotate/OpenContent instance (do NOT use localhost as the server name):

    ```xml
    <openAnnotateServer>http://servername:8080/OpenAnnotate</openAnnotateServer>
    ```

1. Edit/save the `/openannotate/config/library/annotate/exportAnnotatedPDF_component.xml` file and update the URL in the following section to point to your OpenContent instance:

    ```xml
    <openContentServer>http://servername:8080/OpenAnnotate</openContentServer>
    ```

1. Edit/save the `/openannotate/config/library/annotate/importAnnotatedPDF_component.xml` file and update the URL in the following section to point to your OpenContent instance:

    ```xml
    <openContentServer>http://servername:8080/OpenAnnotate</openContentServer>
    ```

1. Restart your Application Server
1. Right click on any document in your Webtop/FirstDoc instance and choose the new 'Annotate' action to launch OpenAnnotate:
    * User must have 'RELATE' permissions on the document to be able to annotate
    * Document must have a PDF rendition or suitable image rendition

## Install on D2

1. Login to the D2-Config application.
1. Backup the configuration before proceeding by selecting File -> Export Configuration, and ensuring any customizations which have been made are saved to a file outside of D2.
1. From the top dropdown initially labelled “Elements without application”, select “All elements”.
1. Select File -> New -> Menu D2-Client.
1. In the top bar, select “Cancel” so you do not create a new menu, and instead can configure a new action in the existing menu.
1. Within the Full Menu configuration, select the arrow next to “Right Click” under Contextual Menus.
1. Select the element you want Annotate to go underneath. For example, if you want the action to go underneath “View”, select “View”.
1. Select the “Add Menu item” button from the top row.
1. For the action, input the following:
    ```launchIE('window', 'http://server:port/OpenAnnotate/login/ticket.htm', 'height=600,width=800,resizable=yes,status=no,toolbar=no,location=yes,directories=no,menubar=no')```
where the server and the port are the server and port for the Tomcat application server, respectively.
For example,
    ```launchIE('window', 'http://tsgdevserver30:8110/OpenAnnotate/login/ticket.htm', 'height=600,width=800,resizable=yes,status=no,toolbar=no,location=yes,directories=no,menubar=no')```
In this instance, “tsgdevserver” is the server URL, and “8110” is the port that tomcat is running on.
1. Select “Save” from the above menu.
1. Access and login to the D2-Client as a user with access to a PDF document.
1. Right-click on the PDF document and confirm the “Annotate” option is now visible.
1. Select the “Annotate” option and confirm that OpenAnnotate successfully loads with the Document. Note: Documents may take a moment to load in OpenAnnotate.

## Install on CARA

1. Coming Soon...
