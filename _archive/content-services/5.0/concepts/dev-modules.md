# Extension Packaging - Modules

Extensions can be packaged as loadable modules. These modules are registered with Alfresco and can be viewed from the Admin Console or the Share Admin Console.

There are two main types of extension that can be packaged as modules, Platform and Share extensions. Further, for modules there are two supported module packaging formats available Alfresco Module Package \(AMP\) and Simple JAR Module.

An extension must include a module.properties file to be identified as a module. It may also include a module-context.xml file if the extension uses Spring beans. The module.properties file is discussed in more detail here, and the module-context.xml file is discussed in more detail here.

Customization packaging matrix:

|Extension type|Package format|
|--------------|--------------|
|Platform extension that includes third-party library|AMP|
|Platform extension that **does not** include third-party library|Simple Module \(JAR\)|
|Share extension that includes third-party library|AMP|
|Share extension that **does not** includes third-party library|Simple Module \(JAR\)|
|Client Application|Web application \(WAR\)|

## Viewing installed modules

You can view installed modules if you have Administrator privileges in Alfresco. In the Share Admin Console you can use the following URL to view installed Module Packages:

```

        
http://<your_domain>:<your_port>/share/page/console/admin-console/module-package        
        
      
```

You can also use the Repository Admin Console \(Enterprise Only\) to view installed Module Packages using the following URL:

```

        
http://<your_domain>:<your_port>/alfresco/service/enterprise/admin/admin-systemsummary        
        
      
```

The System Summary includes information about installed Module Packages.

You can find out more about using the Admin Console in the [Admin Console documentation](at-adminconsole.md).

