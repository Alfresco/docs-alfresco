---
title: OAT Override Overlay Configs
---

# Overview
This section will explain how to override the overlay configuration files within our OAT application. If you are unfamiliar the overlay file, please visit this page for more information [https://github.com/tsgrp/OpenContent/wiki/OpenOverlay:-Creating-a-New-Overlay](https://github.com/tsgrp/OpenContent/wiki/OpenOverlay:-Creating-a-New-Overlay).

The way OAT will get these overlay config override files will be to utilize the GET rest endpoint called `/configs/assetFile` within the `RESTConfigService`. This will return the `.zip` file that holds all the overlay config override files. These files will be placed within the temporary directory of whatever tomcat is running OAT. They the will be pointed to so that OpenOverlay knows to use these files instead of the `oc-overlay-config.xml` file within the `tomcatHome/shared/classes`, if there is one. 

The two ways that the overlay config override files can be gotten and used within OAT:
1. On startup of OAT, there is a scheduled job to only run on startup.
2. Calling an OAT rest endpoint called `optimus/refreshOverlayConfigOverrides` [https://github.com/tsgrp/OpenContent/wiki/OAT-Override-Overlay-Configs/_edit#updateversion-overlay-config-override-file](https://github.com/tsgrp/OpenContent/wiki/OAT-Override-Overlay-Configs/_edit#updateversion-overlay-config-override-file) 

# Turn on to Override
In order to let OAT know that you want to override the overlay configuration files, simply switch the property `optimus.enableOverlayConfigOverride` to `true`, within the `application.properties`. To override the `application.properties`, place a file called `application.properties` (that will contain all the properties you want to override) in the `tomcatHome/shared/classes`.

```
optimus.enableOverlayConfigOverride=true
```

In order for OAT to use your overrides you will also need to set useOverrideOverlayConfigs to `true` in the application.properties. 

```
optimus.useOverrideOverlayConfigs=true
```
# Where to Put Overlay Config Override File
Once you enable the overlay config override, you have to add the overlay override zip file in the correct place within the Alfresco Content Accelerator (ACA) configs by following these steps.

## 1. Create the `oc-overlay-config-override.xml`
* **The naming here of this file is crucial as the new enhancements to OAT specifically looks for this overlay configuration xml to have this name.**
* The `oc-overlay-config-override.xml` can be created like any other `oc-overlay-config.xml` (See if unfamiliar: [https://github.com/tsgrp/OpenContent/wiki/OpenOverlay:-Creating-a-New-Overlay](https://github.com/tsgrp/OpenContent/wiki/OpenOverlay:-Creating-a-New-Overlay)).
* However, remember anything in the `oc-overlay-config-override.xml` will be used instead of `oc-overlay-config.xml` entirely.

## 2. Change any `classPath` with `tempPath` in overlay config xml file
* One important change within the `oc-overlay-config-override.xml` is the for pointing to the location of the image files. Typically, in the `oc-overlay-config.xml` this would be denoted by `classpath:@imagesBase@ocforms-header-logo.png`.
* Now, use the `tempPath` followed by whatever you named the overlay config override zip file then the name of the asset/image like normal. Here is an example of what is should look like: 

```
<image file="tempPath:oc-overlay-override-files/ocforms-header-logo.png" scale="23%"/>
```

## 3. Find or create the assets folder
* The ACA configs have the ability to configure different asset files within the application that are placed under within an `Assets` folder.
* However, only assets that will override the default assets will be placed within this folder. So, it is possibly to not have this `Assets` folder. Please create that folder now if not already created.

## 4. Name the overlay config override zip file
* Naming is important within the `Assets` folder as OAT will look for a particular zip name. This zip name is configurable within the `application.properties`. The default zip name is `oc-overlay-override-files`. 

```
optimus.overlayConfigOverrideZipName=oc-overlay-override-files
```

## 5. Upload overlay config override zip file
* Under the `Assets` folder, upload the overlay config override file by moving or copying it to the `Assets` folder locally. Then, you can use the Config Archiver within the Admin section of ACA to upload these updated configs. 
* A second option would be Alfresco specific. You can navigate in share to find the ACA config `Asset` folder [https://github.com/tsgrp/OpenContent/wiki/OAT-Override-Overlay-Configs/_edit#1-find-or-create-the-assets-folder](https://github.com/tsgrp/OpenContent/wiki/OAT-Override-Overlay-Configs/_edit#1-find-or-create-the-assets-folder). Then you can simply upload the overlay config override zip file here.

## 6. Check other notable configuration properties
* There are a couple other notable configuration properties that I will highlight here that need to be set. 
* **overlayConfigOverrideAppId** : the asset file endpoint that is used within OAT needs to know of an `appId`. This `appId` is what the outer folder is named within the ACA configs. Most of the time this `appId` will be set to `default`.
* **openContentUrl**: the openContentUrl will be exactly what the name indicates, the url that points to OpenContent (EX: [http://localhost:8080/alfresco/OpenContent](http://localhost:8080/alfresco/OpenContent)). This is important for how OAT needs to communicate with OpenContent.
* **tempDirForFilesCachedFromNas**: the name is a little deceiving for how we are using it here, but it is defining what directory should we use as the temp directory (EX: C:/apacheHome/temp). The temp directory is where these overridden overlay config files will be placed.

```
optimus.tempDirForFilesCachedFromNas=C:/Apache/apache-tomcat-8.5.45-oat/temp
optimus.openContentUrl=http://localhost:8080/alfresco/OpenContent/
optimus.overlayConfigOverrideZipName=oc-overlay-override-files
```

# Update/Version Overlay Config Override File
The overlay config override file has been set and at this point you want to make changes to it. Follow the steps below. 

## 1. Update Overlay Config Override Zip File
* To make changes, simply follow step above ([https://github.com/tsgrp/OpenContent/wiki/OAT-Override-Overlay-Configs#3-upload-overlay-config-override-zip-file](https://github.com/tsgrp/OpenContent/wiki/OAT-Override-Overlay-Configs#3-upload-overlay-config-override-zip-file)) to re-upload the configs or re-upload the overlay config override file within Share, if you are in Alfresco.

## 2. Clear OC Cache
* The asset files are cached for faster retrieval time. This is an issue when an update needs to be made to the overlay config override zip file, though.
* Run this OC endpoint to refresh the caches: `/cache/refreshEagerCaches` by supplying an **administrator's ticket**
* Example of endpoint call: `http://localhost:8080/alfresco/OpenContent/cache/refreshEagerCaches?ticket=`

## 2. Run the OAT Refresh Endpoint
* Once the following update was made to the overlay config override zip file within the `Assets` folder of the ACA configs, you can run the OAT GET endpoint `/optimus/refreshOverlayConfigOverrides` to refresh the overlay config override files. If successful, this will delete out any existing overlay config override files within the temp directory and put these updated ones in the temp directory. 
* The GET endpoint has no parameters. Here is an example of the endpoint: `http://localhost:7080/oat/optimus/refreshOverlayConfigOverrides`.