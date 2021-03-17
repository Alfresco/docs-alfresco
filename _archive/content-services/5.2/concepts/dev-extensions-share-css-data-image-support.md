---
author: Alfresco Documentation
---

# Surf CSS data image support

Surf provides support for CSS data URIs. Data URIs are a way of embedding image data into a CSS page. The advantage of using this approach is that no additional HTTP Requests are required to fetch and return images. This increases the performance of a web page considerable, especially for pages with numerous image files.

Much of the performance hit associated with a browser loading a web page comes from the multiple HTTP Requests \(and returns\) that are required to load multiple resources required by the page, particularly image files. One solution to this is to combine the images into a so called CSS Sprite - this means that a single HTTP request is then required for a page with multiple images. CSS is then used to locate sub-sections of the CSS Sprite on the web page. While this provides a performance boost, especially for image rich pages, it still requires an HTTP request to obtain the CSS Sprite file. Also, the technique requires some preparation on the part of the web page developer.

An alternative to the CSS Sprite is to use Data URIs. Data URIs effectively allow data to be embedded within the CSS stylesheet itself. This data can be image data. The advantage of this approach is that no additional HTTP Requests are required for images beyond the one to fetch the CSS stylesheet itself. This represents an additional performance boost, and is more convenient for the web page developer, as it does not require the potentially tricking positioning code required by the CSS Sprite approach \(although in practice this is somewhat alleviated by web page design tools\).

While it might seem that embedding image data into a CSS file has the potential to make CSS files unweildy, the image data is typically Base64 encoded and gzipped to make it far more compact.

With regards Share, while the CSS Sprite could be applied to Share pages, it has the potential to break existing Share customizations, so this appraoch is not used in Share. The approach taken instead is to use the Data URI approach to embed images in CSS stylesheets.

## Configuration in Share

Surf can now automatically produce CSS data images by simply adding the following line to its configuration file. For Share this configuration file is located in webapps/share/WEB-INF/surf.xml.

```
<web-framework> 
   ...
      <generate-css-data-images>true</generate-css-data-images> 
   ... 
</web-framework>
```

[Providing that checksum dependencies are also enabled](dev-extensions-share-surf-checksums.md) then all images reference by CSS files will be embedded as data within those CSS files. In addition to eliminating HTTP requests for images, when an image changes, the CSS checksum will change so the browser will not use stale cached images. The Dependency Handler service defers some of this work to a dedicated `CssDataImage` service which can be overridden in the Spring application context if required. All images are cached for the life-cycle of the server so that performance is not impeded when requesting the same image multiple times.

**Important:** CSS data image files are not supported by Internet Explorer versions 6 and 7. If these browsers are detected then the CSS data image will not be generated.

**Parent topic:**[Advanced Surf Topics](../concepts/dev-extensions-share-advanced-surf-topics.md)

