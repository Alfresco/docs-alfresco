---
author: Alfresco Documentation
---

# Modifying Out-of-the-box Surf Web Scripts

Most of the Share UI functionality can be traced back to a web script in one place or another. Sometimes it is useful to be able to override the controller or template of one of these Out-of-the-box \(OOTB\) web scripts.

|Extension Point|Modifying Out-of-the-box Surf Web Scripts|
|---------------|-----------------------------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|The preferred way of modifying out-of-the-box Surf Web Scripts is by using [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md) to target the Web Script that should be replaced:

 ```
<extension>
    <modules>
        <module>
            <id>Customize a Web Script</id>
            <version>1.0</version>
            <auto-deploy>true</auto-deploy>
            <customizations>
                <customization>
                    <targetPackageRoot>The path to the out-of-the-box Web Script you are overriding, such as org.alfresco.components.dashlets</targetPackageRoot>
                    <sourcePackageRoot>The path to your Web Script customizations, such as org.alfresco.tutorials.customization.webscript.controller</sourcePackageRoot>
                </customization>
            </customizations>
        </module>
    </modules>
</extension>
```

 The Web Script files in your package should have the same names as the original ones that you are overriding. The Extension Modules section has all the details.

 Out-of-the-box Surf Web Scripts **used** to be overridden by putting the modified files under alfresco/web-extension/site-webscripts/org/alfresco/... directory using the exact same path. This approach is no longer needed.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ \(Untouched by re-depolyments and upgrades\)

|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Store extension modules here
-   aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts - Your Web Script overrides are stored here under a custom package path

|
|More Information|-   [Surf Web Scripts](dev-extensions-share-surf-web-scripts.md)
-   [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)

|
|Tutorials|-   See [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)

|

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

