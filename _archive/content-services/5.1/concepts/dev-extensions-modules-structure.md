---
author: Alfresco Documentation
---

# Project layout

When developing a module it is recommended that code is structured in a consistent format to comply with AMP file requirements.

When developing your module you will need to organize your source code. It is recommended that your project be laid out as follows:

```

          
\
|-- source
   |   
   |-- java
      |
      |-- <module package structure starts here>
   |
   |-- web
      |
      |-- css
      |
      |-- images
      |
      |-- jsp 
      |
      |-- scripts
|
|-- config
   |
   |-- <resource package structure starts here>
|
|-- lib
|
|-- build
   |
   |-- dist
|
|-- project-build.xml     

        
```

|Directory|Description|
|---------|-----------|
|source/java|This contains the Java source for your Alfresco module. The package structure can be anything suitable, but many of the Alfresco written modules have the package structure `org_alfresco_module_<module_id>`, where `module_id` is the ID of the module.

 This code will need to be built into a JAR and placed in the final AMP file.

|
|source/web|This contains any web UI resources split into the various folders outlined previously, including JSP pages, images, CSS, and scripts.|
|build|The class files that implement the module are built into this directory, with any resulting JARs and the AMP file itself being built to the build/dist folder.|

**Note:** If you are using the [Maven Alfresco SDK](alfresco-sdk-intro.md) the correct directory structure will be created automatically for you.

**Parent topic:**[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-packaging-techniques-amps.md)

