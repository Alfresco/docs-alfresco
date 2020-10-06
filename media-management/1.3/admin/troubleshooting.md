---
title: Troubleshooting
---

Use this information to help diagnose any problems when using Media Management.

## Video proxy generation starts but does not complete

If the timeout value for video transformation is too low, it is likely that videos will not load in Alfresco Share. In some setups, the `content.transformer.default.timeoutMs` setting might be limited. To resolve this problem, set the following option in your `alfresco-global.properties` file and check that this value is not being overridden by JMX:

```xml
content.transformer.default.timeoutMs=64800000
```

## Error in Alfresco log if FFmpeg is not installed, thumbnails not available

If you preview a video or image and you do not have FFmpeg installed, you will see an error in the `alfresco.log` file, for example:

```xml
ERROR [org.springframework.extensions.webscripts.AbstractRuntime] [http-apr-8080-exec-11]  Exception from executeScript - redirecting to status template error:  03220008
The content node was not specified so the content cannot be streamed to the client: classpath*:alfresco/templates/webscripts/org/alfresco/repository/thumbnail/thumbnail.get.js org.springframework.extensions.webscripts.WebScriptException: 03220008  
The content node was not specified so the content cannot be streamed to  the client: classpath*:alfresco/templates/webscripts/org/alfresco/repository/thumbnail/thumbnail.get.js
```

The error message should not affect the ability to preview the video, however thumbnails will not be available. Install FFmpeg to resolve this error.

## Error when running ImageMagick: *RegistryKeyLookupFailed*, *CoderModulesPath*

If you see a `CoderModulesPath` error, it might be because the file type that you are trying to transform has not been added to the DELEGATES list for ImageMagick. To check which delegates are supported, run this command from the ImageMagick installation directory:

```bash
convert -version
```

The delegates supported are listed in the results.

If you are using RAW image formats, you must install an ImageMagick delegate, for example, UFRaw.

## Unable to create proxy when loading video

When you load a video in Alfresco Share, if you receive the message `Could not create proxy, try viewing or downloading the source`, you need to include the correct proxy, for example, H.264. See [FFmpeg](http://ffmpeg.org/ffmpeg.html){:target="_blank"} for more information.

## Failure loading images or video in Alfresco Share

If you do not have FFmpeg or ImageMagick available to Java, then you will not be able to view images and video in Alfresco Share. Ensure that Java has FFmpeg and ImageMagick on its command line path, or define the path location in your `alfresco-global.properties` file. See See [step 7 of Installing Media Management]({% link media-management/1.3/install/index.md %}) for information on how to set these in the `alfresco-global.properties` file.
