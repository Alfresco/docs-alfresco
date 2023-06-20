---
title: Configuring overlays 
---

## What is an overlay?

An overlay, also known as a watermark, is applied to the surface of the PDF and bonded to it, preventing the user from moving or modifying the overlay. The overlay is applied using OpenOverlay, a Java-based tool embedded within Alfresco Content Services. Out of the box overlays are supplied as part of some base Accelerator configurations. Configuration is required to customize overlay behavior in Alfresco Content Accelerator and Alfresco Enterprise Viewer. Below are the details of how to wire up a new overlay configuration file and how to assemble it.  

## Overlay capabilities

OpenOverlay can apply overlays to document PDF renditions. These overlays include static text, a static image file, a dynamic property value (such as a value set on the document node), and/or one of a few special keywords tokens including `pageNum`, `isFirstPage` and `isLastPage`. For example, you can stamp `cm:createdDate` or `cm:title` on the document, with pixel precision at any location on the page. You can configure different overlays to be applied based on dynamic criteria, including Object Type, node property value, and page layout. You can also configure dynamically generated overlays upon document view time (most common use case), or permanently applied upon initial PDF creation. For instance, many customers use OpenOverlay to dynamically apply the `Viewed On` date to the document to ensure the date extracted is known, should the document be printed or sent outside the system. You can specify the text as any font, color, and size.

## Overlay limitations

* OpenOverlay applies images directly at the pixel location specified, and does not wrap text or images.
* OpenOverlay is limited to working with the fonts that are installed on the operating system running OpenOverlay (either the Alfresco Content Services system or the AEVT system depending on your configuration).

## Set up application to display overlays

There are a few configurations that need to be set up to view overlays on documents.

1. `annotation.shouldUseOverlays=true/false`

    This property tells the application that it should display configured overlays on documents. This should be set to true in order to see any configured overlays on viewing of documents.

    Out of the Box, this is set to `false` by default. If you installed an accelerator (PnP or Claims) which included installing the `opencontent-override-placeholders.properties` file packaged with the release, then the configuration will by default be set to `true`.

    You can override this property in the `opencontent-extension-override-placeholders.properties` file in your [custom AMP]({% link content-accelerator/latest/develop/extension-content-accelerator.md %}).

2. `enableAEVTOverlays=true/false`

    This property enables AEVT (OAT) to handle the overlays. If you have AEVT installed and overlays should be displayed, then this should be set to `true`, or else it should be set to `false`. The default value is `false`.

    You can override this property in the `openannotate-override-placeholders.properties` file in the `/alfresco` classpath, for example, `ALFRESCO_HOME/tomcat/shared/classes`.

## Creating a new overlay

You can configure a new overlay using XML. The following section walks through the different components of an example XML overlay configuration and provides additional sample overlays. These same principles apply when modifying existing overlay configurations by overriding existing XML overlay beans.

### Overlay configuration XML components

Below are the XML components for overlay configuration.

#### Text Templates

The text template allows for the reuse of certain text formatting within overlays.  

`<text-templates />`  

Properties:

* name: unique id used as a reference for the template.

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

* template: template to use for the overlay. If not specified the template named `default` is used. **Note:** Not required for tags within `<text-template>`.
* font-size: the size of the font in points  
* font-family: the font/font-family to use  
* font-weight: bold is the currently the only supported option  
* font-style: italic is currently the only supported option  
* color: color of font as a hex (i.e. `#FFFFFF`) or string (i.e. `"red"`)  
* embed-font: `true` if the font should be embedded (defaults to `false` if not specified)  

Example:  

```xml
<text font-size="12" font-family="Arial" embed-font="true" font-weight="none" font-style="none" color="black">Text string goes here.</text>
```

#### Overlays

Specifies the configuration for an overlay.  

`<overlay />`

Properties:  

* id: unique identifier for this overlay.

Example:  

```xml
<overlay id="mySampleOverlay">...</overlay>
```

##### Block Tag

A Tag within the overlay tag. It is used as a container for a aspects of the overlay. Allows you to set it's position on the page, styling, and rotation.

`<block />`

Properties:  

* id: unique id for the overlay  
* x: x position (0 is right)
* y: y position (0 is bottom)
* alignment: defaults to left (right, left, center)  
* rotation: degrees, defaults to 0 (0, 90, 180, 270)  
* opacity: float between 0-1.0 (defaults to 1.0)  

The following example has a rectangle placed within this parent block:  

```xml
<block id="1" x="30" y="720" alignment="left" rotation="0" opacity="1">
    <rectangle x-offset="550" y-offset="0.5" background-color="black" border-width="0"/>
</block>
```

>**Note:** x="0" y="0" specifies the BOTTOM RIGHT corner of the page.

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

* key: the OpenContent name-variable key which the restriction will be applied to.
* Hint: OpenContent names are "Alfresco Short Namespace" followed by `_` followed by "Local Property Name. For example, for `cm:name`, it would be `cm_name`.

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

### Using property values in XML overlay configuration  

Below are examples of properties that you can use throughout the configuration file. These keys are the OpenContent names related to each property. Depending on the environment, and even object type, these keys will change.  

```xml
<block id="0" x="30" y="30" alignment="left" rotation="0">
    <text template="default" font-size="10">Status: ${status}</text>
</block>

```

#### Built-in properties

There are also built in properties that do not need to relate to the specific object. Below are examples of these:  
`${currentDate}` resolves to the datetime that the overlay was created for the user. Ex: May 20th, 2020 11:10AM CST. It can also accept a formatting along with other datetime properties. `${currentDate~dd-MMM-yyyy}`  

```xml
<block id="0" x="30" y="30" alignment="left" rotation="0">
    <text template="default" font-size="10">Created On: ${currentDate}</text>
</block>
```

### Useful XML overlay configuration Examples

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

## Override overlay configuration files - AEVT not installed

When AEVT is not installed, you can override the overlay configurations in your [custom AMP].

Follow the steps in [Extension Content Accelerator]({% link content-accelerator/latest/develop/extension-content-accelerator.md %}) in the Content Accelerator documentation.

### How to override overlay configurations in the custom AMP

To override the default overlay configurations, the custom AMP will need to inject a file called `opencontent-override-overlay-spring-config.xml` into the `alfresco/module/com.tsgrp.opencontent` location. This file should contain similar looking beans to this:

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">

  <bean id="overlayConfigBean" class="com.tsgrp.openoverlay.core.XmlConfigFactory" factory-method="createInstance">
    <!-- Spring note - even though these elements are 'constructor-arg' elements, they are really params for the createInstance factory method -->
    <constructor-arg value="path to custom oc overlay configurations.xml" />
    <constructor-arg value="default" />
  </bean>

<!-- iText Overlay Engine-->
  <bean id="openPdfEngine" name="overlayEngine" class="com.tsgrp.openoverlay.openpdf.OpenPdfOverlayEngine" init-method="onInit">
    <property name="overlayConfig">
      <ref bean="overlayConfigBean" />
    </property>
  </bean>
</beans>
```

See the above section [Creating a new Overlay](#creating-a-new-overlay) for instructions on building new overlay beans as well as additional overlay examples. To override an existing overlay configuration and make changes to it, just make a copy of the overlay bean you wish to override and maintain the bean id of the original overlay bean. Then, make any desired changes and this override file will override the existing overlay configurations.

## Override overlay configuration files - AEVT installed

This section only applies to installations that include AEVT (most do not). This section explains how to override the overlay configuration files within our AEVT application (formerly OAT).

AEVT loads these overlay configuration override files via the GET REST endpoint `/configs/assetFile` within the `RESTConfigService`. This returns the `.zip` file that holds all the overlay configuration override files. These files are placed within the temporary directory of whatever Tomcat is running AEVT, and reference (or pointed to) so that OpenOverlay knows to use these files instead of the `oc-overlay-config.xml` file within the Tomcat classpath (ex: `tomcatHome/shared/classes`), if there is one.

There are two ways that the overlay configuration override files are used within AEVT:

1. On startup of AEVT, there is a scheduled job that runs only on startup.

    See [Override overlay configuration files - first time use](#override-overlay-config-files-for-the-first-time)

2. Calling an AEVT REST endpoint called `optimus/refreshOverlayConfigOverrides`.

    See [Update or version existing overlay configuration overrides](#update-or-version-existing-overlay-config-overrides)

### Override overlay configuration files - first time use

#### Turn on override

In order to let AEVT know that you want to override the overlay configuration files, simply switch the property `optimus.enableOverlayConfigOverride` to `true`, within the `application.properties`. To override the `application.properties`, place a file called `application.properties` (that will contain all the properties you want to override) on the Tomcat classpath (for example, in the `tomcatHome/shared/classes` directory).

```xml
optimus.enableOverlayConfigOverride=true
```

In order for AEVT to use your overrides, you also need to set useOverrideOverlayConfigs to `true` in the `application.properties` file.

```xml
optimus.useOverrideOverlayConfigs=true
```

#### Configure overlay overrides

Once you enable the overlay configuration override, you have to add the overlay override ZIP file in the correct place within the repository by following these steps.

1. Create the `oc-overlay-config-override.xml`:

    > **Note:** The naming of this file is crucial as the new enhancements to AEVT specifically look for this specific file name overlay configuration XML.

    * You can create the `oc-overlay-config-override.xml` like any other `oc-overlay-config.xml`.

      See the OpenOverlay XML configuration section above for additional details on configuring your overlay.

    * However, remember anything in the `oc-overlay-config-override.xml` will be used instead of `oc-overlay-config.xml` entirely, since it overrides this file.

2. Change any `classPath` with `tempPath` in the overlay configuration XML file:

    * One important change within the `oc-overlay-config-override.xml` is the for pointing to the location of the image files. Typically, in the `oc-overlay-config.xml` this would be denoted by `classpath:@imagesBase@ocforms-header-logo.png`.
    * Now, use the `tempPath` followed by whatever you named the overlay configuration override ZIP file then the name of the asset/image like normal. Here is an example of what is should look like:

    ```xml
    <image file="tempPath:oc-overlay-override-files/ocforms-header-logo.png" scale="23%"/>
    ```

3. Find or create the assets folder:

    * We have the ability to configure different asset files within the application when they are placed under an `Assets` folder.
    * However, only assets that will override the default assets will be placed within this folder. So, it is possibly to not have this `Assets` folder. 
    * If the folder path does not exist in the repository, create it now. The folder path needed in the repository is `hpi > default > Assets`
        * Note that this path assumes the appId is configured to the default (`optimus.overlayConfigOverrideAppId=default`) if you are overriding this value, you will need to update this path to reflect that.

4. Name the overlay configuration override ZIP file:

    * Naming is important within the `Assets` folder as AEVT will look for a particular ZIP name. This ZIP name is configurable within the `application.properties`. The default ZIP name is `oc-overlay-override-files`.

    ```xml
    optimus.overlayConfigOverrideZipName=oc-overlay-override-files
    ```

5. Upload overlay configuration override ZIP file:

    * Upload the overlay configuration override ZIP file into the Assets folder in the repository.

6. Check other notable configuration properties:

    * There are a couple other notable configuration properties that need to be set.

    * **openContentUrl**: the openContentUrl will be exactly what the name indicates, the URLthat points to OpenContent (for example, `http://localhost:8080/alfresco/OpenContent`). This is important for how AEVT needs to communicate with OpenContent.

    * **tempDirForFilesCachedFromNas**: the name is a little deceiving for how we are using it here, but it is defining what directory should we use as the temporary directory (for example, `C:/apacheHome/temp`). The `temp` directory is where these overridden overlay configuration files are placed.

    ```xml
    optimus.tempDirForFilesCachedFromNas=C:/Apache/apache-tomcat-8.5.45-oat/temp
    optimus.openContentUrl=http://localhost:8080/alfresco/OpenContent/
    optimus.overlayConfigOverrideZipName=oc-overlay-override-files
    ```

7. Restart ACS:

    A job runs on startup to pull in the updated overlay configurations.

### Update or version existing overlay configuration overrides

The overlay configuration override file has been set and at this point you want to make changes to it. Follow the steps below.

1. Update the overlay configuration override ZIP file:

    * To make changes, simply follow ([step 5 in Configure Overlay Overrides](#configure-overlay-overrides)) to re-upload the configurations or re-upload the overlay configuration override file within the repository.

2. Clear the OC cache:

    * The asset files are cached for faster retrieval time. This is an issue when an update needs to be made to the overlay configuration override ZIP file, though.
    * Run this OC endpoint to refresh the caches: `/cache/refreshEagerCaches` by supplying an **administrator's ticket**
    * Example of endpoint call: `http://localhost:8080/alfresco/OpenContent/cache/refreshEagerCaches?ticket=`

3. Run the AEVT refresh endpoint:

    * Once the following update was made to the overlay configuration override ZIP file within the `Assets` folder, you can run the AEVT GET endpoint `/optimus/refreshOverlayConfigOverrides` to refresh the overlay configuration override files. If successful, this deletes any existing overlay configuration override files within the temp directory and put these updated ones in the temp directory.
    * The GET endpoint has no parameters. Here is an example of the endpoint: `http://localhost:7080/oat/optimus/refreshOverlayConfigOverrides`.
