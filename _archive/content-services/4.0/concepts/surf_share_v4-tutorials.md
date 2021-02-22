---
author: Alfresco Documentation
---

# Tutorials

With Alfresco 4.0, there are new extensibility features that have been added into the Spring Surf framework upon which Alfresco Share is built to make customization easier.

The primary goal of these features was to ensure that it isn’t necessary to completely re-write Alfresco Share. Although this release introduces new concepts, it was important that developers did not need to completely re-learn how Alfresco Share is put together.

The following tutorials with introduce you to these features and explore the new framework in detail. It is recommended that you do these tutorials in order as they build upon each other.

-   **[1. Add content to an Alfresco Share page](../tasks/tu_40_add-content.md)**  
This tutorial demonstrates how to create and deploy an extension module that adds some extra content to a user dashboard page in Alfresco Share.
-   **[2. Control rendering of content on an Alfresco Share page](../tasks/tu-40-hide-content.md)**  
Building on the previous tutorial where you created and deployed an extension module that added extra content to a user dashboard page in Alfresco Share, this tutorial demonstrates how to use an extension module to prevent content being rendered in an Alfresco Share page. This tutorial also shows how to use evaluations to decide whether a component should be rendered or not.
-   **[3. Sub-Component Evaluations](../tasks/tu-v4-subcomponent-evals.md)**  
In the previous tutorial, you extended a Component and prevented its default Sub-Component from being rendered through the use of an Evaluation. This tutorial delves further into Evaluations and introduces Evaluators, demonstrating how they are defined and used.
-   **[4. Customize Alfresco Share i18n properties](../tasks/tu-share-i18n-customize.md)**  
Previous tutorials described how to customize Alfresco Share through the use of Component extensions. This tutorial starts describing the changes Alfresco has made to Spring Surf to further simplify customization use cases, starting with demonstrating how to customize web script i18n properties.
-   **[5. Customize Alfresco Share JavaScript controllers](../tasks/tu-share-JS-customize.md)**  
Extension module `customizations` elements can be used to override behaviour of components. This tutorial uses customizations to override the behaviour of the WebView dashlet.
-   **[6. Customize Alfresco Share FreeMarker templates](../tasks/tu-share-FM-temp-customize.md)**  
In this tutorial you see how to add content to a page by using the `<@region>` directive extension.
-   **[7. Auto-Readme extensions example](../concepts/tu-auto-readme-extension-example.md)**  
This tutorial discusses how to extend the Document Library for a site to automatically display the content of any readme.txt files in the current folder. It is not intended to explain the extensibility features but simply to show how they can be applied to achieve a practical result.
-   **[8. Add a new page to Alfresco Share](../tasks/tutorial-share-add-page.md)**  
This tutorial demonstrates how to add a new page to Alfresco Share and then make it the landing page.
-   **[9. Override Alfresco Share login page](../tasks/tutorial-share-override-login-page.md)**  
This tutorial demonstrates how to override the default Alfresco Share login page.

**Parent topic:**[Share Extensibility](../concepts/Share-Extensibility-Intro.md)

