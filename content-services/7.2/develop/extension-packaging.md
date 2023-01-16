---
title: Extension packaging (modules)
---

Extensions can be packaged as loadable modules. These modules are registered with Content Services and can be 
viewed from the Admin Console or the Share Admin Tools.

There are two main types of extension that can be packaged as modules: Platform and Share extensions. For modules, 
there are two supported module packaging formats available: **Alfresco Module Package (AMP)** and **Simple JAR Module**.

An extension must include a `module.properties` file to be identified as a module. It may also include a `module-context.xml` 
file if the extension uses Spring beans. The `module.properties` file is discussed in more detail here, and the `module-context.xml` 
file is discussed in more detail here.

Customization packaging matrix:

|Extension type|Package format|
|--------------|--------------|
|Platform extension that includes third-party library|AMP|
|Platform extension that **does not** include third-party library|Simple Module (JAR)|
|Share extension that includes third-party library|AMP|
|Share extension that **does not** includes third-party library|Simple Module (JAR)|
|Client Application|Web application (WAR)|

## Viewing installed modules

You can view installed modules if you have Administrator privileges. In Share Admin Tools, you can use the following URL 
to view installed Module Packages:

```html
http://<your_domain>:<your_port>/share/page/console/admin-console/module-package        
```

You can also use the Repository Admin Console (Enterprise Only) to view installed Module Packages using the following URL:

```html
http://<your_domain>:<your_port>/alfresco/service/enterprise/admin/admin-systemsummary              
```

The System Summary includes information about installed Module Packages.

You can find out more about using the Repository Admin Console [here]({% link content-services/7.2/admin/admin-console.md %}).

## Module properties file

The module properties file is required by the module service to identify the module, and its details, when it is installed.

The `module.properties` file should be located in the directory `extension_root/alfresco/module/module_name`. Where 
`extension_root` is the root directory of the extension, and `module_name` is the name of the module.

The `module.properties` file itself contains the module id, version, title and description of the module. The following 
uses the records management module to give an example of a typical `module.properties` contents.

```text
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

|Property|Description|
|--------|-----------|
|module.id|*Required*. The module ID specified in this file will act as a unique identifier for this module. It is important that the module ID is globally unique so that it never clashes with other modules when it is installed. For example: `org_alfresco_module_rm_share`.<br><br>**Note:** Module IDs can contain a-z, A-Z, 0-9, dot, space, minus and underscore. Module renaming is supported using the alias mechanism.|
|module.aliases|*Optional*. When a module gets renamed, it is necessary to add the original name to the list of aliases. This ensures that the module tool and repository startup can correctly match the new name to one of the old names.<br><br>**Attention:** The `module.aliases` property can only be used in AMPs, not Simple Modules.|
|module.version|*Required*. The module version number specifies the current version of the module. This is taken into consideration when installing the module into a WAR. It will determine whether it is a new install or an update to an existing installation of a previous version. The version number must be made up of numeric values separated by dots. For example `2.1.56` is a valid version number, `2.3.4a` is not.|
|module.title|*Required*. The title of the module.|
|module.description|*Required*. The description of the module.|
|module.depends.*|*Optional*. When a module is installed, it might be a requirement that another module is installed. It might be a requirement that a specific version, set of versions or range of versions is present. The dependency has been met as long as the installed version of the dependency matches any of the ranges or versions give.|

Here are some examples of `module.depends.*`:

```text
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

```text
# Alfresco Records Management Share Module                                                                                                                     
module.id=org_alfresco_module_rm_share

# 28/02/2012 - Renamed                                                                                                                                         
module.aliases=org_alfresco_module_dod5015_share

module.title=Alfresco Record Management Share Extension
module.description=Alfresco Record Management Share Extension
module.version=2.0

module.repo.version.min=4.0
```

## Module context file

If a module uses Spring beans it requires a module context file. This is used to load the Spring configuration for the module.

A module is initialized when the repository loads the root Spring configuration for that module.

A module's root Spring configuration must be placed in the package `alfresco/module/<module_id>` and should be called 
`module-context.xml`.

When the module service is initialized, all the `module-context.xml` configurations found are loaded, thus initializing 
the installed modules ready for use.

The `module-context.xml` file is a standard Spring configuration file and typically new beans will be defined, 
custom content models and client configuration specified and data loaded or patched.

In a complex module the configuration can be split up into smaller Spring configurations which are included by `module-context.xml`.

>**Note:** The property `executeOnceOnly`, the default value of which is true, tells the system how many times to execute your module. If you want your module to run every time Content Services is started, set `executeOnceOnly` to false.

## Module package formats

There are two supported ways of packaging extensions: Alfresco Module Packages (AMPs) and Simple JAR Modules.

### Alfresco Module Package (AMP)

Alfresco Module Packages, known as AMPs, are Zip files containing the extension. The extension must follow a prescribed 
layout and include important files that describe the module.

Alfresco Module Packages, known as AMPs, are the recommended way of packaging customizations and extensions for deployment, 
where those extensions depend on third-party libraries, as such dependencies are not yet supported by Simple JAR Modules. 
Simple JAR modules are generally the preferred type of packaging for extensions where dependencies on third-party libraries do not exist.

AMPs can be used to package custom templates, custom models, web scripts, UI customizations, and can be used to implement 
extensive additions to the Content Services functionality. Records Management is an an example of an application 
that provides a significant enhancement to the capabilities ot Content Services and is distributed via AMP files.

AMPs are Zip files that follow a specific layout and can be merged with the other WAR files such as `alfresco.war` or `share.war` 
using the Alfresco Module Management Tool (MMT), which is available as `alfresco-mmt.jar` in the `bin` directory of your installation.

AMPs can be thought of as installable extensions to Content Services. Once packaged into an AMP file format, 
an extension can be applied to Content Services using the Module Management Tool (MMT). There are two directories 
that contain AMP files, the `amps` directory and the `amps_share` directory. Modules that extend the platform (repository) tier are 
located in the `amps` directory. Modules that extend the Share tier are located in the `amps_share` directory.

When a module is installed using the MMT it is applied to the relevant WAR file. Content Services typically 
consists of at least two WAR files: `alfresco.war` for the content server and `share.war` for the Share web client. 
The module AMP file is applied to the appropriate WAR using the MMT.

Larger, more complex modules can be distributed as two AMP files, one to be applied to the WAR file and another to be 
applied to the Share WAR file. Records Management, for example, is distributed in this manner.

>**Note:** If your extension does not require third-party libraries you should use the Simple JAR Module format. Only use the AMP format where your extension has dependencies on third-party libraries.

#### Advantages of AMP files

The difference between AMP packaging and JAR packaging is how 3rd-party dependencies are handled (e.g. libs - JAR files). 
An AMP can bundle all the 3rd-party dependencies it needs, while a JAR cannot and relies on either the deployment automation 
or the person doing a deployment to handle all the dependencies in addition to itself.

#### AMP file format

The AMP file has a specific directory layout that contains the files that make up the extension. In addition it contains 
special files such as `module-context.xml`, `module.properties` and `file-mapping.properties` that control the behavior of the AMP.

##### AMP file structure

The module package format is a compressed zip file. The AMP file has the following structure:

```text
/
|_ /config
       |_ /alfresco
                |
                |_ /extension
                       |_ /templates
                              |_ /webscripts
                |              
                |_ /web-extension
                       |_ /templates
                              |_ /webscripts
                |
                |_ /module
                       |_ /<module_id>
                              |_ module-context.xml
|_ /lib
|_ /licenses
|_ /web
       |
       |_ /jsp
       |_ /css
       |_ /images
       |_ /scripts
|_ module.properties
|_ file-mapping.properties
```

|File or Dir|Description|
|-----------|-----------|
|module| The module directory contains a directory using the module's ID. This ID provides a module namespace and should be unique. The convention is to use a reverse domain name (with underscore as the separator).|
|module.properties|*Required*. This file stores module related properties such as the module's ID, version, title and description. Module dependencies and required Content Services version can also be set in this file. This file is located in the root of the AMP structure.
|module-context.xml|*Required*. This is a Spring bean configuration file. All beans specified within this file will get initialized when Content Services starts and loads the module. Beans that import content or initialize the module would be referenced here. Other required context files would be imported from this file too. This file is located in the directory `config/alfresco/module/<module_id>/`.
|file-mapping.properties|This file is used when your module does not conform to the standard directory structure. The mapping file maps a directory in the module to a directory in the exploded web application directory. the property `include.default` (which is true by default) specifies whether the default mappings should be applied. You can apply the defaults and then apply your own specific mappings. If you set `include.default` to false, you will need to provide all the necessary mappings for your module. This file is located in the root of the module directory structure.|
|config|This directory will be mapped into the `/WEB-INF/classes` directory in the WAR file. Generally your Spring and UI config will reside in the standard package structure within this directory.<br><br>Resources that are used by your extension, such as XML import files or ACPs can also reside in here, as it can often be convenient to place such things on the classpath for loading from Spring.<br><br>As a module developer, you will be required to provide a `module-context.xml` (and optionally a `module-disable-context.xml` and `module-uninstall-context.xml`) in the `alfresco.module.<moduleId>` package. These will reside in the `/config` directory.<br><br>You should place server-side webscripts here. AMP to war file mappings are:<br><br>`config/alfresco/templates/webscripts` to `$CATALINA_HOME/webapps/alfresco/WEB-INF/classes/alfresco/templates/webscripts`<br><br>`config/alfresco/extension/templates/webscripts` to `$CATALINA_HOME/webapps/alfresco/WEB-INF/classes/alfresco/extension/templates/webscripts`<br><br>To be more specific `/config/alfresco` locates to `$CATALINA_HOME/webapps/alfresco/WEB-INF/classes/alfresco/`|
|lib|This directory will be mapped into `/WEB-INF/lib`. It should contain any JAR files that relate to your module.|
|licenses|If your module includes any third-party JARs that require the inclusion of licenses that are not currently included in the standard repository WAR, then these should be placed here.|
|/web/jsp|This directory should contain any custom or modified JSP's that relate to your module. The contents are mapped into the `/jsp` directory in the WAR file.|
|/web/css|This directory should contain any CSS files that relate to your module. The contents are mapped into the `/css` directory in the WAR file.|
|/web/images|Any images that relate to your module should be placed here. The contents are mapped into the `/images` directory in the WAR file.|
|/web/scripts|JavaScript files that are used by the user interface should be placed here. The contents are mapped into the `/scripts` directory in the WAR file.<br><br>Any folder structures found in any of these directories are mapped, as they are found, into the destination folders in the WAR.<br><br>If a file already exists it is overridden in the WAR. When this happens a recoverable backup is saved by the Module Management Tool (MMT).|

#### AMP to WAR mapping {#defaultamp2warmap}

When an AMP file is to be deployed it is applied to the target WAR file using the Module Management Tool. This is a 
convenient way of applying a number of files to a variety of directories within the target WAR's exploded directory 
structure. When the AMP is applied, the default mappings can be applied to map from the module directory structure to 
the exploded WAR directory structure. Custom mappings can also be applied.

By default the module directories, and their sub-directories, are mapped into the target WAR file using the 
Module Management Tool (MMT), as indicated in the following table. Any of the specified directories can be empty or 
missing if not required by the module.

|Directory|Description|AMP to WAR file mapping|
|---------|-----------|-----------------------|
|/config|Typically contains Spring configuration and UI configuration. Files are organized in a directory structure that reflects the Java package structure of the application. XML import files or ACPs can also be conveniently located here. Any content that needs to be on the Tomcat classpath can be located here.<br><br>Modules also require a `module-context.xml` file, which is a Spring configuration file. This is located in the directory `alfresco_module_<moduleId>`.|`./tomcat/webapps/<target_webapp>/WEB-INF/classes`|
|/config/alfresco/extension/templates/webscripts|Server-side repository-tier web scripts can be located here.|`./tomcat/webapps/<target_webapp>/WEB-INF/classes/alfresco/extension/templates/webscripts`|
|/config/alfresco/web-extension/templates/webscripts|Server-side web-tier web scripts can be located here.|`./tomcat/webapps/<target_webapp>/WEB-INF/classes/alfresco/web-extension/templates/webscripts`|
|/lib|Any JAR files required by the module are located here.|`./tomcat/webapps/<target_webapp>/WEB-INF/lib`|
|/licenses|If the module requires any third party JARs that specify certain licenses, then those licenses can be located here.|`./tomcat/webapps/<target_webapp>/WEB-INF/licenses`|
|/web/jsp|This directory should contain any custom or modified JSPs that are required by the module.|`./tomcat/webapps/<target_webapp>/jsp`|
|/web/css|This directory should contain any CSS style sheets required by the module.|`./tomcat/webapps/<target_webapp>/css`|
|/web/images|This directory contains any images required by the module.|`./tomcat/webapps/<target_webapp>/images`|
|/web/scripts|Client-side JavaScript files are located here.|`./tomcat/webapps/<target_webapp>/scripts`|
|module.properties|The module.properties file is required to be present in the AMP file. It contains metadata about the module, most importantly the `id` and `version` of the module that the AMP file contains.|`./tomcat/webapps/<target_webapp>/WEB-INF/classes/alfresco/module/module_id/module.properties`|
|file-mapping.properties|It is possible to customize the way the AMP file contents is mapped into the target WAR file by the MMT. This is achieved with the file-mapping.properties file. If this file is not present then the default mapping will be used.|Not mapped - drives the mapping process.|

#### Customizing the AMP to WAR mapping

A custom mapping from the AMP directory structure to the WAR file is sometimes useful, for example if you wish to use a 
non-standard module directory structure, or if you wish to map files into non-default locations in the target WAR. 
This custom mapping is achieved through use of the `file-mapping.properties` file.

The [default mappings](#defaultamp2warmap) are applied if the `file-mapping.properties` file 
is not provided.

This file has the same format as a standard Java properties file. The **key** is the directory (with a leading `/`) in 
the source AMP file, and the **value** is the directory (also with a leading `/`) in the target WAR file. The contents 
of each mapped path will be recursively copied into the target WAR when the MMT applies the AMP.

It is possible to control whether the default mappings are applied or not using the `include.default` property. 
The property is set to `true` by default. If it is set to `false` then the default mappings will not be applied. 
As custom mappings always take precedence over the default mappings it is possible to load the defaults and then 
override them on an individual basis.

If the source directory does not exist in the AMP file, then the mapping will be ignored; however, the destination 
directory in the target WAR file must exist or a runtime exception will be raised when the MMT attempts to install the AMP.

An example follows:

```text
# Custom AMP to WAR location mappings

#
# The following property can be used to include the standard set of mappings.
# The contents of this file will override any defaults.  The default is
# 'true', i.e. the default mappings will be augmented or modified by values in
# this file.
#
include.default=false

#
# Custom mappings.  If 'include.default' is false, then this is the complete set.
#
/WEB-INF=/WEB-INF
/web=/        
```

#### Project layout

When developing a module it is recommended that code is structured in a consistent format to comply with AMP file requirements.

When developing your module you will need to organize your source code. It is recommended that your project be laid out as follows:

```text
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
|source/java|This contains the Java source for your Content Services module. The package structure can be anything suitable. Many of the Content Services written modules have the package structure `org_alfresco_module_<module_id>`, where `module_id` is the ID of the module.<br><br>This code will need to be built into a JAR and placed in the final AMP file.|
|source/web|This contains any web UI resources split into the various folders outlined previously, including JSP pages, images, CSS, and scripts.|
|build|The class files that implement the module are built into this directory, with any resulting JARs and the AMP file itself being built to the build/dist folder.|

>**Note:** If you are using the Alfresco SDK, then the correct directory structure will be created automatically for you.

#### log4j.properties file {#log4jpropsfile}

Each module can have its own Apache Log4j properties file.

Each module can have its own `log4j.properties` file, which is placed in the same directory as the `module.properties` file. 
The collection of `log4j.properties` files within all modules installed into the `alfresco.war` act collectively to 
augment/override the global `WEB-INF/classes/log4j.properties` file.

You can control the logging levels of classes within your module without having to modify the main `log4j.properties` file; 
this also allows the logging configuration of a module to be handled cleanly by the Module Management Tool.

Given that `{module.id}` denotes the value of `module.id` set in `module.properties`, your `log4j.properties` file should 
be put in the following position within the source code directory structure of your module:

```text
config/alfresco/module/{module.id}/log4j.properties
```

At deployment time, this file will be copied to:

```text
WEB-INF/classes/alfresco/module/{module.id}/log4j.properties
```

For example, if `module.id=sample`, then in the module's source tree you'll have:

```text
config/alfresco/module/sample/log4j.properties
```

On the servlet container, your module's `log4j.properties` file will be deployed to:

```text
WEB-INF/classes/alfresco/module/sample/log4j.properties
```

If you wish to configure Log4j properties in the extensions that aren't packaged as AMP modules (i.e. as JAR modules), 
you can create `log4j.properties` file of the form: `{name}-log4j.properties` and place it within the `alfresco/extension` 
directory on the server's classpath. These properties override the module `log4.properties` files. For example:

```text
WEB-INF/classes/alfresco/extension/SIMPLE_EXAMPLE-log4j.properties
```

Finally, developers might also wish to maintain a `dev-log4j.properties` file outside of the webapp. This allows for 
changing Log4j settings without touching the "shipping product", or any of a customer's local settings. Your optional 
`dev-log4j.properties` file should be in the `alfresco/extension` directory within the server's classpath, and outside 
the webapp itself (so you don't accidentally delete it). 

The `dev-log4j.properties` file augments/overrides all others. For example:

```text
$TOMCAT_HOME/shared/classes/alfresco/extension/dev-log4j.properties
```

##### Best Log4j Configuration Practices

Local customizations/licenses are kept outside of the webapp. For example:

```text
$TOMCAT_HOME/shared/classes/alfresco/extension/...-log4j.properties
```

Shipping config files should be located within the webapp. For example:

```text
WEB-INF/classes/alfresco/extension/...-log4j.properties
```

A `dev-log4j.properties` file should never be used in an ongoing during production, nor packaged as a part of any product.

##### Advanced log4j.properties Configuration

In the unlikely event that you need to configure the set directories Content Services uses to find 
module-specific `log4j.properties` files, look at `WEB-INF/classes/alfresco/core-services-context.xml` and find a 
bean definition fragment that looks something like:

```xml
<property name="overriding_log4j_properties">
    <list>
      <!-- NOTE: value entries are listed from lowest precedence to highest.  -->
      
      <!--  Installed  AMP modules  -->
      <value>classpath*:alfresco/module/*/log4j.properties</value>
      
      <!--  Other installed extensions  -->
      <value>classpath*:alfresco/extension/*-log4j.properties</value>
      
      <!--  private developer overrides -->
      <value>classpath*:alfresco/extension/dev-log4j.properties</value>
    </list>
</property>
```

You can add additional path expressions here; for more information on the `classpath*:` notation used here, see 
Spring's `PathMatchingResourcePatternResolver` documentation. Generally this file will not need to be changed.

#### Using the Module Management Tool (MMT)

The Module Management Tool (MMT) helps install and manage modules packaged as an AMP (Alfresco Module Package) files. 
These AMP files are applied to a target WAR file, for example, `alfresco.war` or `share.war`.

The MMT supports the following: installation of AMP files including upgrades to later versions, uninstallation of 
installed modules, and listing of currently installed modules.

Modules are packaged and installed as AMP files. An AMP file relates to a specific module and version. During the 
installation of an AMP file the module and version are taken into consideration.

The MMT program, `alfresco-mmt.jar`, is available in the bin directory.

##### Running the MMT

Run the following command:

```bash
java -jar alfresco-mmt.jar [args]
```

It is compatible with WAR files v 2.0 and above.

Note that in some cases you must run `$ALF_HOME/scripts/setenv.sh` before this command, and to set `$ALF_HOME` and 
`$CATALINA_HOME` (as used in `$ALF_HOME/bin/apply_amps.sh`) is also recommended. `$ALF_HOME` is the installation directory. 
`$CATALINA_HOME` is the Tomcat installation directory.

**MMT Commands**

The MMT has a number of commands. Details of these are outlined as follows:

* **install**

    ```bash
    usage: install <AMPFileLocation> <WARFileLocation> [options]
        
    valid options:
          
        -verbose   : enable verbose output
        -directory : indicates that the amp file location specified is a directory.
          All amp files found in the directory and its sub directories are installed.
        -force     : forces installation of AMP regardless of currently installed module version
        -preview   : previews installation of AMP without modifying WAR file
        -nobackup  : indicates that no backup should be made of the WAR
    ```

    This installs the files found in the AMP file into the `alfresco.war`, updating it if an older version is already installed. If the module represented by the AMP is already installed and the installing AMP is of a higher release version, then the files relating to the older version will be removed from the WAR and replaced with the newer files.

    It is the responsibility of the module developer to provide the appropriate module components to bootstrap or patch any data as required when updated WAR is run.

    If the installing module version is less than or equal to the version already installed in the WAR then installation will be aborted unless the `-force` option is specified. In this case the installing AMP will always replace the currently installed version. This option is especially useful when developing an AMP.

    Before an AMP is installed into a WAR a copy of the original WAR is taken and placed in the same directory. Specifying the `-nobackup` option prevents this from occurring.

    Example:

    ```bash
    java -jar alfresco-mmt-2.1.0.jar install /root/alfresco-recordsmanagement-2.1.0.amp /usr/jboss-4.0.3SP1/server/default/deploy/alfresco.war 
    ```

* **list**

    ```bash
     usage: list <warFile>
    ```

    Lists the details about all the modules currently installed in the WAR file specified. The output is directed to the console.

* **uninstall**

    ```bash
    usage: uninstall <moduleId> <warFile>      
    ```

##### Best practices

It is good practice to install modules using the `-preview` option prior to doing the install proper. This reports the 
modifications that will occur on the WAR without making any physical changes. The changes that are of most importance to 
note are those that are going to update existing files.

As a general rule it is considered bad practice to overwrite an existing file in the WAR, however it is sometimes necessary. 
The MMT makes a backup copy of the updated file and stores it in the WAR. When an update of the module occurs and the 
old files are removed, this backup will be restored prior to the installation of the new files. Problems can occur if 
multiple installed modules modify the same existing file. In these cases a manual restore might be necessary if recovery 
to an existing state is required.

>**Note:** Note that some application servers, such as Tomcat, are sometimes ineffective at cleaning up their temporary working files, and this can interfere with successful installation of an AMP file. To remedy this situation, it is recommended to clean out these directories while Tomcat is shut down, using the `clean_tomcat.sh` script in bin.

### Simple Module (JAR) {#simplemodule}

Platform and Share extensions are most suitably packaged in the Simple Module format. This module type uses the standard 
JAR file format. A Simple Module contains, in addition to the files that comprise the extension, at least a `module.properties` 
file to identify the extension as a module.

>**Note:** This is the preferred package format if the extension does not require any dependencies on third-party libraries to be contained within the extension.

The main advantage of this format over the AMP format is that it does not require the modification of the standard WAR 
files, and so makes troubleshooting and support much easier.

Simple Modules are located in the modules/platform or modules/share folder of your Content Services installation, 
depending on whether they are an extension for Platform or Share respectively.

When Content Services starts up it will check the directories modules/platform and modules/share in the root of 
the installation directory for any modules it may find. Modules found will be loaded, their dependencies on Platform and 
Share versions checked as required, and dependent module versions also checked. If everything is not as required then 
Platform or Share will fail to start.

As a minimum the Simple Module will contain a [module.properties](#module-properties-file) file, 
but may also contain a [module-context.xml](#module-context-file) file, if the extension has Spring beans.

In the Simple Module the module.properties file and `module-context.xml` file should be located in the directory 
`extension_root/alfresco/module/module_name`. Where extension_root is the root directory of the extension, and `module_name` 
is the name of the module.

Any web resources the extension might have would go in the directory `extension_root/META-INF/resources/module_name`.

>**Important:** Although the web resources could go directly into the resources directory, it is **best practice** to use a further subdirectory based on the module name, as this means that when there are multiple modules, their web resources will not conflict with each other.

You can examine the layout of a sample Simple Module on [GitHub](https://github.com/Alfresco/alfresco-sdk-samples/tree/master/samples/alfresco-simple-module).

As a Simple Module uses the standard JAR file format, it can be deployed via a Maven repository. You can add a dependency 
on the module in the `pom.xml` file for your project:

```xml
<dependency>
  <groupId>com.alfresco.tuturials</groupId>
  <artifactId>simple-module</artifactId>
  <version>1.0.0.SNAPSHOT</version>
</dependency>
```

There are some important points to know when using Simple Modules:

1.  When creating Share extensions you should specify the new `module.share.version.min` and `module.share.version.max` properties (in the `module.properties` file for the module). These specify the minimum and maximum versions of Share required by the module. If these properties are not satisfied, Share will fail to start. Legacy extensions that instead specify `module.repo.version.min` and `module.repo.version.max` would have those values compared with the Share version. Note that from version 5.1 and above it is possible for the Platform and Share to have different version numbers, so Share extensions should ideally use the specific `module.share.version.min` and `module.share.version.max` properties.
2.  The `module.properties` file can contain `module.depends.(id_of_module)` to specify the presence and version of a required module. Note that for Share extensions only the presence of a module can be checked for, so version information (if supplied) will be ignored. This is a small limitation for Share modules that will be removed in the future.
3.  Note that when MMT applies AMPs to WARS it is essentially an "install time" check. If the operation fails at that time this can be remedied and the AMP reapplied. With Simple Modules however, checks are made at run (load) time, that is, as Content Services starts up. This means that if any version checks or module presence checks fail, Platform or Share will fail to start.

##### Simple JAR modules vs AMPs

Simple JAR Modules have some advantages over AMPs:

* They can be easily installed and uninstalled
* They don’t accidentally overwrite files from the product or other extensions
* Maven likes and knows about JARs
* Development Environments knows about JARs
* Developers knows about JARs

Working with JARs would have the following benefits for developers:

* It is easy to get going with the customization, project can be generated from archetype
* Less error prone implementation than managing AMPs
* When controlling the project template we can also promote best practices for how to structure JAR Module extensions.
* Customizations (JARs) can depend on other customizations (JARs)
* Build is faster than with AMPs
