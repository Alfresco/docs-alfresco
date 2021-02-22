---
author: Alfresco Documentation
---

# Simple Module

Platform and Share extensions are most suitably packaged in the Simple Module format. This module type uses the standard JAR file format. A Simple Module contains, in addition to the files that comprise the extension, at least a module.properties file to identify the extension as a module.

**Note:** This is the preferred package format if the extension does not require any dependencies on third-party libraries to be contained within the extension.

The main advantage of this format over the AMP format is that it does not require the modification of the Alfresco standard WAR files, and so makes troubleshooting and support much easier.

Simple Modules are located in the modules/platform or modules/share folder of your Alfresco installation, depending on whether they are an extension for Platform or Share respectively.

When Alfresco starts up it will check the directories modules/platform and modules/share in the root of the Alfresco installation directory for any modules it may find. Modules found will be loaded, their dependencies on Platform and Share versions checked as required, and dependent module versions also checked. If everything is not as required then Platform or Share will fail to start.

As a minimum the Simple Module will contain a [module.properties](dev-extensions-modules-module-properties.md) file, but may also contain a [module-context.xml](dev-extensions-modules-module-context.md) file, if the extension has Spring beans.

In the Simple Module the module.properties file and module-context.xml file should be located in the directory extension\_root/alfresco/module/module\_name. Where extension\_root is the root directory of the extension, and module\_name is the name of the module.

Any web resources the extension might have would go in the directory extension\_root/META-INF/resources/module\_name.

**Important:** Although the web resources could go directly into the resources directory, it is **best practice** to use a further subdirectory based on the module name, as this means that when there are multiple modules, their web resources will not conflict with eachother.

You can examine the layout of a sample Simple Module on [GitHub](https://github.com/Alfresco/alfresco-sdk-samples/tree/master/samples/alfresco-simple-module).

As a Simple Module uses the standard JAR file format, it can be deployed via a Maven repository. You can add a dependency on the module in the pom.xml file for your project:

```

      
<dependency>
  <groupId>com.alfresco.tuturials</groupId>
  <artifactId>simple-module</artifactId>
  <version>1.0.0.SNAPSHOT</version>
</dependency>
    
```

There are some important points to know when using Simple Modules:

1.  When creating Share extensions you should specify the new `module.share.version.min` and `module.share.version.max` properties \(in the module.properties file for the module\). These specify the minimum and maximum versions of Share required by the module. If these properties are not satisfied, Share will fail to start. Legacy extensions that instead specify `module.repo.version.min` and `module.repo.version.max` would have those values compared with the Share version. Note that from Alfresco 5.1 and above it is possible for the Platform and Share to have different version numbers, so Share extensions should ideally use the specific `module.share.version.min` and `module.share.version.max` properties.
2.  The module.properties file can contain `module.depends.(id_of_module)` to specify the presence and version of a required module. Note that for Share extensions only the presence of a module can be checked for, so version information \(if supplied\) will be ignored. This is a small limitation for Share modules that will be removed in the future.
3.  Note that when MMT applies AMPs to WARS it is essentially an "install time" check. If the operation fails at that time this can be remedied and the AMP reapplied. With Simple Modules however, checks are made at run \(load\) time, that is, as Alfresco starts up. This means that if any version checks or module presence checks fail, Platform or Share will fail to start.

**Parent topic:**[Module package formats](../concepts/dev-extensions-packaging-techniques.md)

