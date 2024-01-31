---
title: OpenContent Property Overrides
---

When installing and setting up OpenContent, it's important to understand how configuration settings work.

### Spring Properties Files

Spring loads properties files into the system in a specific order to allow overriding.  Properties are loaded in the following order (last wins):

1. *-defaults.properties
2. project-placeholders.properties
3. override-placeholders.properties
4. opencontent-override-placeholders.properties
5. opencontent-extension-override-placeholders.properties

Therefore, if you you want to override a property in one of the defaults, you should place the overridden value in one of the higher level properties files.  Technically, it doesn't matter which, as long as the final value is correct for your system.

* use `opencontent-override-placeholders.properties` for environment specific values (ex: paths, server names, etc.)
* use `opencontent-extension-override-placeholders.properties` for customer specific overrides to a generic AMP build

### Encrypting property values

If any of your property values contain sensitive information (for example, a password) you have the option to encrypt them with the `TsgEncrypter`.

Follow these steps to obtain an encrypted password:

1. Navigate to a directory that contains the tsgrp.jar file and open a command prompt
    * The OpenContent jar is included in the OpenContent AMP and will be deployed to `${alfresco.tomcat.home}/webapps/alfresco/WEB-INF/lib`
2. Execute the following Java command, replacing the name of the jar file if the version has changed, and changing 'myText' with your text string:
    * `java -classpath ./tsgrp-2.0.3.jar com.tsgrp.util.TsgEncrypter myText`

Once you've retrieved the encrypted property value, set it in the properties file between '@{' and '}' like so:

```properties
my.property=@{the-tsg-encrypted-value}
```

> **Note:** When utilizing this token strategy with a custom property in an extension AMP, the property must be injected via Spring for the value to be read properly by the extension code.

Example:

If the property you want to encrypt is `password=sensitive` you would encrypt your value `sensitive` and set password to `password=@{<encrypted_value>}` This pattern allows the decrypter to recognize that the property value is encrypted.
