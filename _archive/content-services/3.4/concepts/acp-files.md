---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: ACP content package
---

# Alfresco Content Package files

An Alfresco Content Package \(ACP\) is a single file \(with an extension of .acp\) that bundles together the metadata and content files for the information to be transported.

An ACP file is a ZIP archive whose structure is as follows:

```
/<packagename>.xml
/<packagename>/
   contentNNN.pdf
   contentNNN.txt
   ...

```

The `packagename` is assigned on export.

<packagename\>.xmlcontains an XML rendition of the transported information in the form of repository nodes. There is no restriction on the information types that can be transported but typically a bundle contains folders and files. Other information types may include forums, rules, preferences, tasks, or anything that is described by a repository content model.

The XML conforms to the export and import view schema, which describes the transported nodes in terms of their types, aspects, properties, associations, and permissions. Content properties are handled specifically where the binary content of the property is held in a separate file under the packagename directory of the ZIP archive, and the XML contains a reference to the file.

Although the repository provides different ways to create an ACP file \(that is, to export\), it is also possible to manually create one using any means. This is very useful for system to system integration.

**Parent topic:**[Exporting and importing](../concepts/import-export.md)

