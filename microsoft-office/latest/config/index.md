---
title: Configure Alfresco Office Services
---

You can configure AOS for your environment with a global path to access Alfresco, and you can configure property mapping for injecting custom properties and metadata into Office documents.

## Setting up a global filepath to access Alfresco

In Windows Explorer, you can set up a Group Policy to manage Favorites on client machines, or share a .lnk file in your Links folder. This can be useful if you want to preconfigure the folder that users will need to access the repository from Microsoft Office (`http://servername:port/alfresco/aos`).

On a Windows 7 machine, the contents of Favorites in Windows Explorer is assembled from the .lnk files in `C:\Users\username\Links`. You can create a `.lnk` file in your `Links` folder and distribute this to the `Links` folder of other users, or preferably, you can use a Group Policy to manage Favorites on user machines.

To use a Group Policy:

1. In the Group Policy Management Console, navigate to `User Configuration\Preferences\Window Settings\Shortcuts`.

2. Create a new shortcut (Group Policy Object) to a folder (not a link to a URL) with the following UNC target path:

    ```bash
    \\servername@SSL\DavWWWRoot\alfresco\aos
    ```

    Alternatively, you can specify `@port` instead of `@SSL`, but not both. The default port is `443`.

    For more information, see [Configure a Shortcut Item](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/cc753580(v=ws.11)?redirectedfrom=MSDN){:target="_blank"}.

## Configuring mapping properties in Alfresco Office Services

Property mapping in AOS allows you to inject custom properties and metadata into Office documents. Property mapping is deactivated by default. Follow these instructions to activate property mapping.

Property mapping is different from the standard metadata extraction mechanism and should be carefully configured to ensure that different properties are set up. Properties stored in the repository are injected into Office documents when these files are read through AOS, and equally properties are extracted from Office files written through AOS and then updated in the repository.

> **Note:** Injected properties form part of the document. If the document is removed from the organization, for example, anyone outside the organization reading the document can view all the properties that have been mapped into the document.

> **Note:** Property mapping in Alfresco Office Services doesn't work for password protected Microsoft Office Open XML files and will generate an exception. To ignore property mapping for password protected Microsoft Office Open XML files, set the property `aos.contentFilter.ignoreOOXMLProtected=false` in the `alfresco-global.properties` file.

Take note of the following:

* Single value properties only can be mapped in Office documents. Multi-value properties are ignored.
* Accepted data type properties are `text`, `mltext`, `int`, `long`, `float`, `double`, `date`, `datetime` and `boolean`. Other data type properties are ignored.
* The following constraints are supported: `MINMAX` for numeric data types, `LENGTH` for text, or `LIST` for text. Properties that have other constraints are ignored; for example, `REGEX` for text.
* Property mapping is only available for OOXML files (`.docx`, `.xlsx`, `.pptx`) and OLE files (`.doc`, `.xls`, `.ppt`). OLE files do not support read-only properties and are ignored. Protected properties are available in OOXML files only.

If any ignored properties are declared as mandatory, then users will not be able to save documents.

It is possible to define a list of types for new documents. Whenever a user creates a new document with the **Save As** dialog, Microsoft Office displays this list to choose from. If the type contains mandatory properties, Office enforces values for these properties before the file can be saved. Files created outside of Office (for example, in Windows Explorer) are created with a type of `cm:content`.

Alfresco provides basic configuration of four patterns, `includedTypesPatterns`, `excludedTypesPatterns`, `includedAspectsPatterns` and `excludedAspectsPatterns` in the `aosBaseDataModelMappingConfiguration` abstract bean.

1. Rename or copy the `<classpathRoot\>/alfresco/extension/custom-aos-metadata-mapping-context.xml.sample` file to `<classpathRoot\>/alfresco/extension/custom-aos-metadata-mapping-context.xml`.

    This sample configuration file activates metadata mapping for the basic `cm:content` type and all its sub-types, except for some system types. All type properties and all applied aspects (except for some system aspects) are mapped into the documents.

2. In `custom-aos-metadata-mapping-context.xml`, check your file type based on the `includedTypesPatterns` and `excludedTypesPatterns` properties.

    Both properties contain a list of regular expressions that are applied to the fully qualified QName. A file is valid for property mapping if its type is accepted by one of the regular expressions in the `includedTypesPatterns` list and does not exist in the `excludedTypesPatterns` list. For more information on regular expressions, see [Class pattern](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html){:target="_blank"}.

3. In `custom-aos-metadata-mapping-context.xml`, check the file aspects based on the `includedAspectsPatterns` and `excludedAspectsPatterns` properties.

    If a file is valid for property mapping, aspects applied to this file are filtered further depending on the two properties, `includedAspectsPatterns` and `excludedAspectsPatterns`. Property mapping occurs only if the file type is included in the `includedTypesPatterns` list (even if there are aspects that are included in the `includedAspectsPatterns` property).

4. In `custom-aos-metadata-mapping-context.xml`, check the `includedInstantiableTypesPatterns` and `excludedInstantiableTypesPatterns` properties.

    These properties define the list of types that are available to users for document creation in the **Save As** dialog. If the `includedInstantiableTypesPatterns` is empty or not set, new documents are always created with the default type. If no system type matches the types configured in `includedInstantiableTypesPatterns`, the base type `cm:content` is used by default. If exactly one type matches the configuration, this type is automatically used for all documents created with the **Save As** dialog in Microsoft Office.

## Configuring secure authentication with Identity Service

You can configure AOS to seamlessly integrate with Identity Service, disabling Basic Authentication and relying on Identity Service instead to perform the authentication when leveraging AOS capabilities.

Assuming Identity Service is properly installed and configured, the `authentication.chain` property should already be defined and should include an authentication chain component of type `identity-service`. For example:

```text
authentication.chain=identity-service-1:identity-service,alfrescoNtlm-1:alfrescoNtlm
```

To integrate AOS and Identity Service, it is sufficient that the `authentication.chain` property defines an authentication chain component of type `identity-service` as the first available component.

It is now possible to perform the secure authentication via Identity Service when editing documents in Microsoft Office through Alfresco Content Services.

You can still access the AOS endpoints via a web browser as long as the secure authentication has been performed first by visiting the following URL (assuming the Alfresco Content Services host name is `repo.example.com`):

```text
https://repo.example.com/alfresco/service/aos/authenticate
```

> **Note:** The duration of the authenticated session will be affected by the session timeouts configured within Keycloak.
