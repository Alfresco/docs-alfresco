---
author: Alfresco Documentation
---

# Web script locations

Web scripts need to be located on the application server classpath.

There are certain locations where it is the convention to locate your web scripts. The normal location when using the Tomcat application server is `./tomcat/shared/classes/alfresco`. Within that directory there are a couple of directories you should know about:

-   `extension` - your repository-tier web scripts will most likely be located here, typically in `templates/webscripts`. Web scripts are usually organized into packages below this directory, for example `org/alfresco/*`. You might create a package `com/mycompany/*` in which you can locate your company's web scripts.
-   `web-extension` - custom Share configuration can go directly into this directory. There are two important sub-directories in the `web-extension` directory: `site-data` and `site-webscripts`. `site-data` would contain Surf configuration XML files, such as page definitions, template-instances and components \(see the Surf Framework documentation\). The `site-webscripts` directory would contain your presentation tier web scripts, consisting of description files, JavaScript controllers and FreeMarker template files.

**Parent topic:**[Presentation-tier web scripts](../concepts/ws-presentation-intro.md)

