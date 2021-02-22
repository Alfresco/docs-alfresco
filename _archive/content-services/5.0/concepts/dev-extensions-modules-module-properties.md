---
author: Alfresco Documentation
---

# Module properties file

The module properties file is required by the module service to identify the module, and its details, when it is installed.

When the AMP file is built, the module.properties file must be placed at the root of the AMP file, but during development it is recommended that it should reside in the package `alfresco_module_<module_id>` as this is the location it will end up in once it is installed into the WAR.

In this location it allows the developer to run unit tests within Eclipse and the embedded repository that is started will behave as if the module is installed. This is because the relevant module.properties file is on the class path in the correct location.

The module.properties file itself contains the module id, version, title and description of the module. The following uses the records management module to give an example of a typical module.properties contents.

```

    
    # MyModule module properties
    module.id=net.sf.myproject.module.MyModule
    module.aliases=myModule-123, my-module
    module.version=2.0
    module.title=My Module
    module.description=This is my first Alfresco module
    
    # The following optional properties can be used to prevent the module from being added
    # to inappropriate versions of the WAR file.
    module.repo.version.min=4.0
    module.repo.version.max=4.1
    
    # The following describe dependencies on other modules
    # Depends on net.sf.myproject.module.SupportModuleA version 1.0 or later
    module.depends.net.sf.myproject.module.SupportModuleA=1.0-*
    # Depends on net.sf.myproject.module.SupportModuleB version 1.0 to 2.0
    module.depends.net.sf.myproject.module.SupportModuleB=1.0-2.0
    # Depends on net.sf.myproject.module.SupportModuleC - any version
    module.depends.net.sf.myproject.module.SupportModuleC=*
  
  
```

-   **`module.id` \(required\)**

    The module ID specified in this file will act as a unique identifier for this module. It is important that the module ID is globally unique so that it never clashes with other modules when it is installed. For example: `org_alfresco_module_rm_share`.

    **Note:** Module IDs can contain a-z, A-Z, 0-9, dot, space, minus and underscore. Module renaming is supported using the alias mechanism.

-   **`module.aliases` \(optional\)**

    When a module gets renamed, it is necessary to add the original name to the list of aliases. This ensures that the module tool and repository startup can correctly match the new name to one of the old names.

-   **`module.version` \(required\)**

    The module version number specifies the current version of the module. This is taken into consideration when installing the module into a WAR. It will determine whether it is a new install or an update to an existing installation of a previous version. The version number must be made up of numeric values separated by dots. For example '2.1.56' is a valid version number, '2.3.4a' is not.

-   **`module.title` \(required\)**

    The title of the module.

-   **`module.description (required)`**

    The description of the module.

-   **`module.depends.*` \(optional\)**

    When a module is installed, it might be a requirement that another module is installed. It might be a requirement that a specific version, set of versions or range of versions is present. The dependency has been met as long as the installed version of the dependency matches any of the ranges or versions give. Here are some examples:


```
 
  
# Any version of X must be installed
module.depends.X=*
# Need to have versions 1.0, 1.5 or 2.0 of Y installed
module.depends.Y=1.0, 1.5, 2.0
# Need to have any version of Z in the range between 1.0 and 2.0 inclusive
module.depends.Z=1.0-2.0
# Need to have version any version of Z less than 1.0 installed
module.depends.Z=*-0.9.9
# Need to have any version of Z greater than or equal to 1.0 installed
module.depends.Z=1.0-* 
   

```

The Records Management Share extension also provides another example:

```

        
# Alfresco Records Management Share Module                                                                                                                     
module.id=org_alfresco_module_rm_share

# 28/02/2012 - Renamed                                                                                                                                         
module.aliases=org_alfresco_module_dod5015_share

module.title=Alfresco Record Management Share Extension
module.description=Alfresco Record Management Share Extension
module.version=2.0

module.repo.version.min=4.0

      
```

**Parent topic:**[Modules \(AMPs\)](../concepts/dev-extensions-modules-intro.md)

