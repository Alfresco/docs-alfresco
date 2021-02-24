---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, I18N]
---

# Internationalization \(I18N\)

Consider the importance of Internationalization \(often abbreviated to I18N\) when developing a web script.

For human-readable web script responses it is often necessary to render the output in the preferred language of the user or the preferred language of the client. This means that human-readable text cannot be placed directly in the web script response template.

Therefore, the Web Script Framework uses the common practice of allowing text to be placed into resource bundles, where a resource bundle exists for each supported language.

-   **[Creating resource bundles supporting I18N](../tasks/ws-I18N.md)**  
The Web Script Framework allows text to be placed into resource bundles, where a resource bundle exists for each supported language.
-   **[Adding resource bundles for additional languages](../tasks/ws-I18N-german.md)**  
Once you have created and registered your web script, you can add additional resource bundles for other languages.
-   **[Overriding the default message bundle](../concepts/kb-preset-internationalization.md)**  
To quickly provision your site for many different countries and languages, you can provide a message bundle for the Alfresco Share configuration. To do so, you need to wire in your own message bundle to Alfresco Share that overrides Alfresco Share’s default message bundle values.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

