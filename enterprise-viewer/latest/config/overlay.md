---
title: Configuring Overlays 
---

## What is an Overlay?

An overlay, also known as a watermark, is applied to the surface of the image and bonded to it preventing the user from moving or modifying the overlay. The overlay is applied using OpenOverlay and requires a few files to get it functioning. Below will detail how to wire up a new overlay configuration file and how to assemble it.  

## Creating a new Overlay

### The Overlay Configuration xml Components

#### Text Templates

The text template allows for reuse of certain text formatting within overlays.  

`<text-templates />`  

Properties:

* name: unique id used as a reference for the template  

Example:

```xml
<text-template name="default">
    <text font-size="12" font-family="Arial" embed-font="true" font-weight="none">Sample.</text>
</text-template>
```

##### Text Tag {#text}

The tag within a text Template.

`<text />`

Properties:  

* template: template to use for the overlay. If not specified the template named 'default' will be used. (not required for tags within `<text-template>`  
* font-size: the size of the font in points  
* font-family: the font/font-family to use  
* font-weight: bold is the currently the only supported option  
* font-style: italic is the currently the only supported option  
* color: color of font as a hex (i.e. #FFFFFF) or string (i.e. "red")  
* embed-font: true if the font should be embedded (defaults to false if not specified)  

Example:  

```xml
<text font-size="12" font-family="Arial" embed-font="true" font-weight="none" font-style="none" color="black">Text string goes here.</text>
```

#### Overlays

Specifies the configuration for an overlay.  

`<overlay />`

Properties:  

* id: unique identifier for this overlay  

Example:  

```xml
<overlay id="mySampleOverlay">...</overlay>
```

##### Block Tag

A Tag within the overlay tag. It is used as a container for a aspects of the overlay. Allows you to set it's position on the page, styling, and rotation.

`<block />`

Properties:  

* id: unique id for the overlay  
* x: x position  
* y: y position  
* alignment: defaults to left (right, left, center)  
* rotation: degrees, defaults to 0 (0, 90, 180, 270)  
* opacity: float between 0-1.0 (defaults to 1.0)  

Example (The following example has a rectangle placed within this parent block):  

```xml
<block id="1" x="30" y="720" alignment="left" rotation="0" opacity="1">
    <rectangle x-offset="550" y-offset="0.5" background-color="black" border-width="0"/>
</block>
```

##### Text Tag

Like the text tag within the Text Template, there can also be a text tag within the overlay tag. When within a block, these text elements can take advantage of a predefined template. Any property added to the text element will override what is set in the referenced template, or the default template if no template is specified.  

`<text />`

Properties:  

* See [here]({% link enterprise-viewer/latest/config/overlay.md %}#text) for properties.  
Example (The following example's output will have formatting following that the default template but it will have red text and print `Updated Text.`):  

```xml
<text template="default" color="red">Updated Text.</text>
```

##### Image Tag

A Tag within the overlay tag. Used for adding images to overlays.

`<image />`

Properties:  

* file: Path to image to use for overlay as either a absolute path or classpath.  
* scale: percentage to scale the image by  

Example:  

```xml
<image file="classpath:@imagesBase@ocforms-header-logo.png" scale="23%"/>
```

##### Rectangle Tag

A Tag within the overlay tag. Used for adding rectangles to overlays.

`<rectangle />`

Properties:  

* background-color: color of rectangle as a hex (i.e. #FFFFFF) or string (i.e. "red")  
* border-width: line width of rectangle (must be defined, if set to 0 will defaulted to 0.1)  
* x-offset: offset to add to the x position of the block coordinate to determine the upper right x position of the rectangle  
* y-offset offset to add to the y position of the block coordinate to determine the upper right y position of the rectangle  

Example:

```xml
<rectangle x-offset="550" y-offset="0.5" background-color="black" border-width="0" />
```

##### Restrictions Tag

A Tag within the overlay tag. These tags set the container for restriction tags.

`<restrictions />`  

##### Restriction Tag

A Tag within the overlay tag. These tags are used to limit which documents/scenarios apply to the specific overlay.  

`<restriction />`  

Properties:  

* key: the oc name/variable key which the restriction will be applied to.  
* value: which specific value that needs to match for the overlay to be applied.  

Example:  

```xml
<overlay id="sample-portrait>
    <restrictions>
        <restriction key="page.orientation" value="portrait"/>
        <restriction key="ocContentRequest" value="true"/>
    </restrictions>
</overlay>
```

##### Actions Tag

 `<actions />`

### Using Property Values in an XML Overlay Configuration  

Below are examples of properties that can be used throughout the configuration file. These keys are the OpenContent names related to each property. Depending on the environment, and even object type, these keys will change.  

```xml
<block id="0" x="30" y="30" alignment="left" rotation="0">
    <text template="default" font-size="10">Status: ${status}</text>
</block>

```

#### Built-In Properties

There are also built in properties that do not need to relate to the specific object. Below are examples of these:  
`${currentDate}` resolves to the datetime that the overlay was created for the user. Ex: May 20th, 2020 11:10AM CST. It can also accept a formatting along with other datetime properties. `${currentDate~dd-MMM-yyyy}`  

```xml
<block id="0" x="30" y="30" alignment="left" rotation="0">
    <text template="default" font-size="10">Created On: ${currentDate}</text>
</block>
```

### Useful XML Overlay Configuration Examples

```xml
<overlay id="headerOnView">
    <restrictions>
        <restriction key="page.orientation" value="portrait"/>
        <restriction key="page.size" value="letter"/>
        <restriction key="objectType" value="Page Set Instance|simple_cr"/>
        <restriction key="ocContentRequest" value="true"/>
    </restrictions>
    <actions />
    <block id="0" x="580" y="730" alignment="right" rotation="0">
        <text template="default" font-size="10">${aw_status}</text>
    </block>
</overlay>
```

```xml
<overlay id="footerOnEmail">
    <restrictions>
        <restriction key="page.orientation" value="portrait"/>
        <restriction key="page.size" value="letter"/>
        <restriction key="objectType" value="Page Set Instance|simple_cr"/>
        <restriction key="ocEmail" value="true"/>
    </restrictions>
    <actions />
    <block id="0" x="30" y="20" alignment="left" rotation="0">
        <!-- extra space to line up with creation date -->
        <text template="default" font-size="10">Viewed On:  ${currentDate}</text>
    </block>
    <block id="0" x="580" y="30" alignment="right" rotation="0">
        <text template="default" font-size="10">Page ${currentPage} of ${totalPages}</text>
    </block>
</overlay>
```

```xml
<overlay id="engPortraitDraft">
    <restrictions>
        <restriction key="objectType" value="engDemo_document|engDemo_drawing|engDemo_procedure|engDemo_instructional"/>
        <restriction key="engDemo_status" value="Draft" />
    </restrictions>

    <block x="195" y="275" rotation="45" opacity="0.25">
        <text template="draft" />
    </block>
</overlay>
```

```xml
<overlay-config>
    <text-templates>
        <text-template name="default">
            <text font-size="12" font-family="Arial" embed-font="true" font-weight="none" font-style="none" color="black">This is the default text.</text>
        </text-template>
    </text-templates>
    <overlay id="oaSecureViewing">
        <restrictions>
            <restriction key="oaSecureViewing" value="true"/>
        </restrictions>
        <actions/>
        <block id="0" x="50" y="760" alignment="left" rotation="0" opacity="0.25">
            <text template="default" font-size="17" font-family="arial" font-weight="bold" color="red">Viewed by: ${displayName} on ${currentDate~dd-MMM-yyyy}</text>
        </block>
    </overlay>
</overlay-configs>
```

## Overriding Overlay Config Files

This section will explain how to override the overlay configuration files within our AEVT application (formerly OAT).

The way AEVT will get these overlay config override files will be to utilize the GET rest endpoint called `/configs/assetFile` within the `RESTConfigService`. This will return the `.zip` file that holds all the overlay config override files. These files will be placed within the temporary directory of whatever tomcat is running AEVT. They the will be pointed to so that OpenOverlay knows to use these files instead of the `oc-overlay-config.xml` file within the tomcat classpath (ex: `tomcatHome/shared/classes`), if there is one.

The two ways that the overlay config override files can be gotten and used within AEVT:

1. On startup of AEVT, there is a scheduled job to only run on startup.
2. Calling an AEVT rest endpoint called `optimus/refreshOverlayConfigOverrides` [Make Updates or Version Existing Overlay Config Overrides](#make-updates-or-version-existing-overlay-config-overrides)

## Override Overlay Config Files for The First Time

### Turn on Override

In order to let AEVT know that you want to override the overlay configuration files, simply switch the property `optimus.enableOverlayConfigOverride` to `true`, within the `application.properties`. To override the `application.properties`, place a file called `application.properties` (that will contain all the properties you want to override) on the tomcat classpath (for example, in the `tomcatHome/shared/classes` directory).

```xml
optimus.enableOverlayConfigOverride=true
```

In order for AEVT to use your overrides you will also need to set useOverrideOverlayConfigs to `true` in the application.properties.

```xml
optimus.useOverrideOverlayConfigs=true
```

### Configure Overlays Overrides

Once you enable the overlay config override, you have to add the overlay override zip file in the correct place within the Alfresco Content Accelerator (ACA) configs by following these steps.

1. Create the `oc-overlay-config-override.xml`

    * **The naming here of this file is crucial as the new enhancements to AEVT specifically looks for this overlay configuration xml to have this name.**
    * The `oc-overlay-config-override.xml` can be created like any other `oc-overlay-config.xml`. See the OpenOverlay XML configuration section above for additional details on configuring your overlay.
    * However, remember anything in the `oc-overlay-config-override.xml` will be used instead of `oc-overlay-config.xml` entirely (since it overrides this file).

1. Change any `classPath` with `tempPath` in overlay config xml file

    * One important change within the `oc-overlay-config-override.xml` is the for pointing to the location of the image files. Typically, in the `oc-overlay-config.xml` this would be denoted by `classpath:@imagesBase@ocforms-header-logo.png`.
    * Now, use the `tempPath` followed by whatever you named the overlay config override zip file then the name of the asset/image like normal. Here is an example of what is should look like:

    ```xml
    <image file="tempPath:oc-overlay-override-files/ocforms-header-logo.png" scale="23%"/>
    ```

1. Find or create the assets folder

    * The ACA configs have the ability to configure different asset files within the application that are placed under within an `Assets` folder.
    * However, only assets that will override the default assets will be placed within this folder. So, it is possibly to not have this `Assets` folder. Please create that folder now if not already created.

1. Name the overlay config override zip file

    * Naming is important within the `Assets` folder as AEVT will look for a particular zip name. This zip name is configurable within the `application.properties`. The default zip name is `oc-overlay-override-files`.

    ```xml
    optimus.overlayConfigOverrideZipName=oc-overlay-override-files
    ```

1. Upload overlay config override zip file

    * Under the `Assets` folder, upload the overlay config override file by moving or copying it to the `Assets` folder locally. Then, you can use the Config Archiver within the Admin section of ACA to upload these updated configs.
    * A second option would be Alfresco specific. You can navigate in share to find the ACA config `Asset` folder (Refer Step 3 above for Find or create the assets folder). Then you can simply upload the overlay config override zip file here.

1. Check other notable configuration properties

    * There are a couple other notable configuration properties that I will highlight here that need to be set.
    * **overlayConfigOverrideAppId** : the asset file endpoint that is used within AEVT needs to know of an `appId`. This `appId` is what the outer folder is named within the ACA configs. Most of the time this `appId` will be set to `default`.
    * **openContentUrl**: the openContentUrl will be exactly what the name indicates, the url that points to OpenContent (EX: [http://localhost:8080/alfresco/OpenContent](http://localhost:8080/alfresco/OpenContent)). This is important for how AEVT needs to communicate with OpenContent.
    * **tempDirForFilesCachedFromNas**: the name is a little deceiving for how we are using it here, but it is defining what directory should we use as the temp directory (EX: C:/apacheHome/temp). The temp directory is where these overridden overlay config files will be placed.

    ```xml
    optimus.tempDirForFilesCachedFromNas=C:/Apache/apache-tomcat-8.5.45-oat/temp
    optimus.openContentUrl=http://localhost:8080/alfresco/OpenContent/
    optimus.overlayConfigOverrideZipName=oc-overlay-override-files
    ```

## Make Updates or Version Existing Overlay Config Overrides

The overlay config override file has been set and at this point you want to make changes to it. Follow the steps below.

1. Update Overlay Config Override Zip File

    * To make changes, simply follow step above ([Refer Step 5 from Configure Overlays Overrides](#configure-overlays-overrides)) to re-upload the configs or re-upload the overlay config override file within Share, if you are in Alfresco.

1. Clear OC Cache

    * The asset files are cached for faster retrieval time. This is an issue when an update needs to be made to the overlay config override zip file, though.
    * Run this OC endpoint to refresh the caches: `/cache/refreshEagerCaches` by supplying an **administrator's ticket**
    * Example of endpoint call: `http://localhost:8080/alfresco/OpenContent/cache/refreshEagerCaches?ticket=`

1. Run the AEVT Refresh Endpoint

    * Once the following update was made to the overlay config override zip file within the `Assets` folder of the ACA configs, you can run the AEVT GET endpoint `/optimus/refreshOverlayConfigOverrides` to refresh the overlay config override files. If successful, this will delete out any existing overlay config override files within the temp directory and put these updated ones in the temp directory.
    * The GET endpoint has no parameters. Here is an example of the endpoint: `http://localhost:7080/oat/optimus/refreshOverlayConfigOverrides`.
