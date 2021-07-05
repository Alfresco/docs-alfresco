---
title: Overview of Share extension points
---

An extension point is an interface that a developer can use to customize the Share web application in a supported way. There are a number of extension points that can be used to do things like adding custom pages, hiding content on existing pages, display custom metadata, modify the menu, and so on. To fully understand the extension points it is a good idea to first read through [Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).

The Share extension points can be grouped into three different categories:

- **Declarative** - XML configuration that requires no coding
- **Programmatic** - Code that adds new functionality
- **Override** - Code that overrides default behavior of Share

The following table lists all the extension points that are available to you when customization the Share web application:

|Extension Point Name|Category|Support Status|
|--------------------|--------|--------------|
|[Share Configuration]({% link content-services/5.2/develop/share-ext-points/share-config.md %})|Declarative|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Form Controls]({% link content-services/5.2/develop/share-ext-points/form-controls.md %}#form-controls)|Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Form Field Validation Handlers]({% link content-services/5.2/develop/share-ext-points/form-field-validation-handlers.md %}#form-field-validation-handlers)|Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Evaluators]({% link content-services/5.2/develop/share-ext-points/evaluators.md %}#evaluators)|Declarative and Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Site Presets]({% link content-services/5.2/develop/share-ext-points/site-presets.md %}#site-presets)|Declarative|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Share Themes]({% link content-services/5.2/develop/share-ext-points/share-themes.md %}#share-themes)|Declarative|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Document Library]({% link content-services/5.2/develop/share-ext-points/doclib.md %}#document-library))|Declarative and Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|Declarative and Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Surf Web Scripts]({% link content-services/5.2/develop/repo-ext-points/web-scripts.md %}#surf-web-scripts)|Declarative and Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Surf Web Script JavaScript Root Objects]({% link content-services/5.2/develop/share-ext-points/javascript-root-objects.md %}#surf-web-script-javascript-root-objects)|Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Surf Pages]({% link content-services/5.2/develop/share-ext-points/surf-pages.md %}#surf-pages)|Declarative and Programmatic|[Limited Support]({% link support/latest/policies/product-lifecycle.md %}) (Use Aikau Pages instead)|
|[Surf Dashlets]({% link content-services/5.2/develop/share-ext-points/surf-dashlets.md %}#surf-dashlets)|Declarative and Programmatic|[Limited Support]({% link support/latest/policies/product-lifecycle.md %}) (Use Aikau Dashlets instead)|
|[Surf Widgets]({% link content-services/5.2/develop/share-ext-points/surf-widgets.md %}#surf-widgets)|Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Aikau Menus]({% link content-services/5.2/develop/share-ext-points/aikau-menus.md %}#aikau-menus)|Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Aikau Pages]({% link content-services/5.2/develop/share-ext-points/aikau-pages.md %}#aikau-pages)|Declarative and Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Aikau Dashlets]({% link content-services/5.2/develop/share-ext-points/aikau-dashlets.md %}#aikau-dashlets)|Declarative and Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Aikau Widgets]({% link content-services/5.2/develop/share-ext-points/aikau-widgets.md %}#aikau-widgets)|Programmatic|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Modifying OOTB Surf Pages]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-surf-pages)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|[Modifying OOTB Surf Dashlets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-surf-dashlets)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|[Modifying OOTB Surf Widgets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-surf-widgets)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|[Modifying OOTB Aikau Pages]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-aikau-pages)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|[Modifying OOTB Aikau Dashlets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-aikau-dashlets)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|[Modifying OOTB Aikau Widgets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-aikau-widgets)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Modifying OOTB Surf Web Scripts]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md%}#modifying-out-of-the-box-surf-web-scripts)|Override|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
