---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [JavaScript, API/Script]
keyword: [JavaScript API, script files]
---

# About script files

Script files are generally located either on the classpath \(for example, alfresco/extension/myscripts\), or in a repository store \(for example, the default repository in Company Home/Data Dictionary/Scripts\)

You can directly access scripts in the repository location using the `Execute a script` action or through a URL with the appropriate read permissions on the script document. You can import scripts on the classpath into other scripts but you cannot execute them directly in the Alfresco web client.

## Importing scripts

This feature allows you to build libraries of scripts for use by other scripts at runtime. The syntax to import the scripts is specific to Alfresco and is not a feature of standard JavaScript. For example, the `<script src='...'>` syntax, as supported by most web browsers, is not part of standard ECMA JavaScript and will not work in Alfresco.

The syntax to import other scripts is very strict and you must follow it exactly; otherwise, the import may fail. Import directives must be the first lines in the JavaScript file. This means that no code or comments are allowed above those lines, and the usual JavaScript code and comments appear after the import lines. Only the following syntax variants are supported:

-   Import a script from the repository using a name-based path: 

    `<import resource="/Company Home/Data Dictionary/Scripts/library.js">`

-   Import a script from the repository using a NodeRef reference: 

    `<import resource="workspace://SpacesStore/6f73de1b-d3b4-11db-80cb-112e6c2ea048">`

-   Import a script from a Java classpath location: 

    `<import resource="classpath:alfresco/extension/myutils.js">`


**Parent topic:**[Alfresco Repository JavaScript API](../concepts/API-JS-intro.md)

