---
title: Encrypting a Password
---

## Encrypting Text for OpenContent
Some OpenContent configurations require a password encrypted with the `TsgEncrypter`.  Follow these steps to obtain an encrypted password:

1. Navigate to a directory that contains the tsgrp.jar file and open a command prompt
    * The OpenContent jar is included in the OpenContent AMP and will be deployed to `${alfresco.tomcat.home}/webapps/alfresco/WEB-INF/lib`
1. Execute the following Java command, replacing the name of the jar file if the version has changed, and changing 'myText' with your text string:
    * `java -classpath ./tsgrp-2.0.3.jar com.tsgrp.util.TsgEncrypter myText`

### Working with Encrypted Values
Encrypted values can be placed in properties files like the following:

```properties
my.property=@{the-tsg-encrypted-value}
```

Note that when utilizing this token strategy with a custom property in an extension AMP, the property must be injected via Spring for the value to be read properly by the extension code.