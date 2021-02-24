---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Scripts, API/Script]
keyword: [web script, response template]
---

# Response status code templates

Web scripts use response status code templates to render a custom response for a given status code. This is useful for providing unique information about a status code or to render a custom human readable interface.

Response status code templates have access to the same root objects as normal web script response templates, except that the default templates `<code>.ftl` and `status.ftl`only have access to the root objects `url`, `status`, `server`, and `date`.

**Note:** When developing web scripts, leave the implementation of response status code templates until the end as the templates are not essential to web script execution. You can test without custom response status code templates as the Web Script Framework will always eventually find the default template `status.ftl` in the root package. As with all other response templates, adding and removing a response status code template requires you to register the web script again.

-   **[Response status codes](../concepts/ws-resp-code-set.md)**  
A web script uses a response status code to inform the calling client of its execution outcome.

**Parent topic:**[Web Script Framework](../concepts/ws-framework.md)

