---
author: Alfresco Documentation
---

# Pages

You can define views of pages including specific pages, page formats, and page types.

Surf page XML defines Surf pages. A page binds to a URI. Surf allows you to render pages by passing the URI in the request.

-   Request a page using a URL as follows:

    `http://localhost:8080/surf/<page-id>http://localhost:8080/surf?p=<page-id>`

    If Surf finds this page, it looks at the page XML configuration to determine which template to use to render the output. Each page can have multiple templates keyed by format. A page might have a default template that it uses for HTML output to a browser, but it may have another template configured that it uses for output to a wireless device.

-   Request a particular format for a page using URLs as follows:

    `http://localhost:8080/surf/<page-id>?f=<format-id> http://localhost:8080/surf?p=<page-id>&f=<format-id>`

    This allows you to have different markup for different intended formats, such as for small display devices or integration purposes. Surf pages are also locale aware. This lets you finely adjust your site’s pages for different languages and localization needs. When you make a request for a page, Surf will do its best to find a match for your browser’s locale. If a locale match cannot be made, Surf will fall back to a specified default locale.

-   Request a page type using a format as follows:

    `http://localhost:8080/surf/pt/<page-type-id> http://localhost:8080/surf?pt=<page-type-id>`

    Surf lets you group pages into page types. By requesting a page type, Surf will determine which page to use to satisfy your request. It determines this by looking to your currently configured theme. Themes can override default pages for a given page type.

-   Request a login page type using a format as follows:

    `http://localhost:8080/surf/pt/login http://localhost:8080/surf?pt=login`

    Surf defines a login page type. Your site might have two themes, such as a normal theme and a holiday theme. You may also have two distinct login pages, such as a normal login page and a holiday login page. When the holiday theme is active, you would like Surf to resort to using the holiday login page. All you have to do is switch the theme for the site. None of the links or URLs change at all. The URLs in this example, will always take you to the theme’s designated login page.

    As before, you can request a particular format of the login page type by using a format parameter. Here are two URLs that request the wireless format of the login page type.

    `http://localhost:8080/surf/pt/login?f=wireless http://localhost:8080/surf?pt=login&f=wireless`


**Parent topic:**[Surf View Composition framework](../concepts/surf-view-fwork-intro.md)

