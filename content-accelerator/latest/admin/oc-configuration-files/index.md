---
title: OC Configuration Files
---

When installing and setting up OpenContent, it's important to understand how configuration settings work.

### Spring Properties Files
Spring loads properties files into the system in a specific order to allow overriding.  Properties are loaded in the following order (last wins):

1. *-defaults.properties
1. project-placeholders.properties
1. override-placeholders.properties
1. opencontent-override-placeholders.properties (This file is stored outside of open content.  see [External Properties](https://github.com/tsgrp/OpenContent/wiki/External-Configurations-and-Properties))
1. opencontent-extension-override-placeholders.properties (This file is stored outside of open content.  see [External Properties](https://github.com/tsgrp/OpenContent/wiki/External-Configurations-and-Properties))

Therefore, if you you want to override a property in one of the defaults, you should place the overridden value in one of the higher level properties files.  Technically, it doesn't matter which, as long as the final value is correct for your system.

* use `project-placeholders.properties` for values that do not change between project builds.
* use `override-placeholders.properties` for values that will change between builds using an overlay.
* use `opencontent-override-placeholders.properties` for environment specific values (ex: paths, server names, etc.)
* use `opencontent-extension-override-placeholders.properties` for customer specific overrides to a generic AMP build

Since all OC properties are available to the entire OC application by default, follow the naming convention for any new property keys: {ocModule}.{package}.{moreSpecificPackage}....{propertyName}

For instance:

    core.config.serviceAddress=http://localhost:8080
    universal.smtpServer=smtp.google.com

### Encrypting property values
If any of your property values contain sensitive information you have the option to encrypt them using this page [Encrypting-a-value](https://github.com/tsgrp/OpenContent/wiki/Encrypting-a-Password).
Once you've retrieved the encrypted property value, set it in the properties file between '@{' and '}'

Example: 

If the property you want to encrypt is `password=sensitive` you would encrypt your value `sensitive` and set password to `password=@{<encrypted_value>}` This pattern allows the decrypter to recognize that the property value is encrypted.


### How to retrieve property values in code

The easiest way to retrieve a property value is using the @Value annotation, like this:

    @Value("${core.config.serviceAddress}")
    private String myServiceAddress;

### How to retrieve Spring beans in code

Sometimes a property value is not enough for storing configuration information, and a Spring bean is needed to represent a data structure. An easy way to configure and retrieve a <util> Spring bean is also with the @Value annotation, like this:

    <util:list id="MyExampleList">
        <value>Item One</value>
        <value>Item Two</value>
    </util:list>

and in Java to retrieve the value:

    @Value("#{MyExampleList})
    private List<String> exampleList;

### Apache Commons Hierarchical Config Files
These files start with 'oc-config-'.  The actual hierarchical config files are XML, with the settings provided in a .properties file.  We are slowly deprecating these files in lieu of the Spring properties files described above.  Many of the properties in these files are no longer set, but if you run into some older code that uses these properties files, you may need to make updates.