---
author: Alfresco Documentation
---

# Extension development practices

There are several ways of developing extensions. The best method for your project will depend on how complex your extension is, how many extensions you will be deploying, your environment \(such as which app server you are using\), which version of Alfresco you are on, and your development culture.

Whatever development approach you use, make sure you:

-   Track the history of your code using source control
-   Track your static assets
-   Keep your code separate from Alfresco code
-   Use the extension and web-extension folders
-   Isolate multiple customizations
-   Be consistent
-   Test all extensions in a non-production environment

These practices will pay dividends such as:

-   Allow you to remove your customizations when troubleshooting an issue
-   Ask for help from an Alfresco expert without confusing your code and Alfresco code
-   Identify what needs to be audited during an Alfresco upgrade

**Parent topic:**[Alfresco Extensions](../concepts/dev-extensions-intro.md)

