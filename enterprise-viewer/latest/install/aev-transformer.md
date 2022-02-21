---
title: Install AEV Transformer
---
This documentation is used for the installation of the Alfresco Enterprise Viewer (AEVT) Transformer.

## Prerequisites
* Enterprise Viewer has already been installed on Linux. 
* Access to the Alfresco Content Services installation.

### PDFIUM Installation
Ensure that PDFIUM is properly installed on the AEVT deployment server.

1. Unpack the `pdfium.tar.gz` source to a location on your server.

2. Note the path where `pdfium` is being installed as `PDFIUM_HOME`.

3. Navigate into the newly unpacked PDFIUM directory.

4. Execute the following command from the `PDFIUM_HOME` to ensure `pdfium` was unpacked successfully:

   ```bash
   ./{PDFIUM_HOME}/pdfium --help
   ```

   The `pdfium` help message is displayed.

## OpenContent Configuration
Ensure that OpenContent is properly properly configured to use AEVT:

1. Navigate to the server running your Alfresco instance. If Alfresco is currently running, shut it down.

2. Add the following property to your existing `override-placeholders.properties` file in the tomcat shared directory, 
   at `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent`:

   `annotation.useContentFilepathForTransformations=true`

3. Start Alfresco Tomcat.

4. Test: Navigate to `http://${alfresco-servername}/alfresco/OpenContent` within a web browser. The OpenContent home
    page, indicating that OpenContent has been successfully deployed, should be displayed.
   
## Enterprise Viewer Configuration (OPTIONAL)
>**Note:** This can be skipped if the environment does not require overlays.

Update AEV configurations for overlays so that AEVT is properly installed:

1. Navigate to the server running AEV. (Note this may be the Alfresco Tomcat depending on how the environment is set up). 
   If Tomcat is running, shut down Tomcat.

2. Make sure the server running AEVT is configured to use the shared folder. Open `AEV_HOME/conf/catalina.properties`.
   Confirm the `shared.loader` property has the value: `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`

3. Navigate to the `AEV_HOME/shared` directory. Create a folder here named `classes` if it does not exist already. 
   Navigate into that directory. 

4. Create the `openannotate-override-placeholders.properties` file if it does not exist. Within that file add the line:
   `enableAEVTOverlays=true`
   
5. Start Tomcat.

## AEV Transformer Installation
Ensure that AEVT is properly installed:

1. Navigate to the server with Tomcat running AEVT. If Tomcat is running, shut down Tomcat.

2. Make sure the server running AEVT is configured to use the shared folder. Open `TOMCAT_HOME/conf/catalina.properties`.
   Confirm the `shared.loader` property has the value: `shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar`
   
3. Navigate to the `TOMCAT_HOME/webapps` directory and delete any existing `oat.war` files as well as the `oat` unzipped 
   directory.

4. Place the `oat.war` into the `TOMCAT_HOME/webapps` directory.

5. Navigate to the `TOMCAT_HOME/shared` directory. Create a folder here named `classes` if it does not exist already. 
   Navigate into that directory.
   
6. Place the contents of `aevtTomcatSharedResources` into the active directory. This is where AEVT custom properties 
   will be set.
   
7. Within the `application.properties` file, set the `pdfium-configs.executablePath` property to point to `{PDFIUM_INSTALLATION_DIR}`
   This path should point to the location of your `mutool` binary.
   
8. If you are using the S3 connector or have any Alfresco files stored within S3, set the various S3 related properties 
   within the `application.properties` file:
   
   ```text
   s3-configs.accessKey=
   s3-configs.secretKey=
   s3-configs.bucketName=
   s3-configs.region=
   s3-configs.useIAMAuthentication=false
   ```

   If you are using IAM roles, filling out the key properties are not required. Be sure to flip 
   `s3-configs.useIAMAuthentication` to `true`.

9. Start Tomcat

10. Configure your proxy/load balancer to successfully redirect calls to AEVT.

    An example Apache configuration can be found 
    [here](https://github.com/tsgrp/OpenAnnotate/wiki/OAT-Deployment-&-Configuration-Guide){:target="_blank"}.

    The general idea is:
   
    * Calls to `/alfresco/OpenContent/openannotate/` must be redirected to `http://${oat-servername)/oat/optimus/` 
    * Any other calls to `/alfresco/OpenContent` must be redirected to `http://${alfresco-servername}/alfresco/OpenContent`
   
    >**Note**: Replace the `${oat-servername}` and `${alfresco-servername}` placeholders in the above URL with the 
    correct AEVT and Alfresco server name values for the environment being installed to.

11. Try to open an Alfresco PDF document via Alfresco Enterprise Viewer. 