---
author: Alfresco Documentation
---

# Creating an Extension module

Using Advanced Components, you create extension modules to allow web scripts to replace or extend from Sub-Components.

1.  Use [Surfbug](../concepts/Surf_v4_surfbug.md#) to target in which component your extension could appear \(/share/page/surfBugStatus\)

2.  Create a extension module definition \(xml\) in which to configure your new Sub-Component.

    1.  Define where you want your extension to appear, using the scope, region-id, and the source id. If the source-id contains a site name or user name parameter, replace the absolute value with \{user\} or \{site\}.

        Use the index to control the display order in relation to the parent Component, such as before, after, replace. If no index or the same index is specified, the Sub-Components display in the order the models are deployed.

        Built in Share Components do not specify and index and default to 50. You can override this.

    2.  Identify when it will appear, using Evaluators. This is optional.

        Evaluators are used to change the behavior if certain conditions are true. You use out of the box Evaluators, such as Site Name and Site Preset.

        -   site.component.evaluator \(Site Name\)
        -   preset.component.evaluator \(Site Preset - such as RM\)
        -   config.component.evaluator
        -   equals.component.evalator
        -   portlet.component.evaluator
    3.  Create what will display with a web script.

3.  Deploy the extension using Module Deployment Tool \(/share/page/modules/deploy\).


-   **[Example - creating an Extension module](../tasks/Create-a-Model-example.md)**  
To familiarize yourself with the approach to creating an extension module, walk through a simple Hello World example.

**Parent topic:**[Customizing Share through Advanced Component configuration](../concepts/Surf_v4_components_Share.md)

