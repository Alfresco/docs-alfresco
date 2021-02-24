---
author: Alfresco Documentation
---

# Unpackaged files or Zip files

The simple packaging technique may be to simply copy or unzip the extension's files into the Alfresco directory hierarchy. As well as copying individual files, perhaps using a scripting language or build tool such as Ant, it is possible to simply package the files into a Zip with an embedded directory structure, and then unzip this over the Alfresco installation. This can be an effective technique during the early phases of development.

Many development environments employ a build process that can execute a script to move unpackaged modified files from source control into the web application's exploded WAR file. Ant, Bash, Maven or a scripting language can achieve this.

Moving unpackaged files has the advantage of being quick and easy to understand, but it may be better to package the files into a Zip artifact that will then be unzipped over the exploded WAR.

CAUTION:

This approach is not recommended for QA or production environments, as Tomcat \(and other application servers\) may re-explode WAR files at unpredictable times, thereby overwriting any extensions that may have been deployed using this technique. This is one of the reasons that AMP files were created.

**Parent topic:**[Packaging techniques](../concepts/dev-extensions-packaging-techniques.md)

