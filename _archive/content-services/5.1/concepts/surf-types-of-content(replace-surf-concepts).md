---
author: Alfresco Documentation
---

# Surf content types

In Spring Surf, content is devided into *Semantic content* and *Presentation content*, and the web application looks at both to render the final look of the Web page.

## Semantic content

Semantic content represents the domain specific content that should be displayed on the web page. This can be for example project information,document information, customer information, discussion thread, wiki page data, workflow task information. This content is typically authored, approved, and published.

Semantic content describes what should be rendered. It contains the approved message but it does not contain any formatting information. It is represented in a structured data format, such as JSON or XML. The following code is an example of JSON text for a biography:

```
{ 
"author": "Pablo Neruda", 
"country": "Chile", "image": "pablo_neruda.jpg", 
"description": "Pablo Neruda is adored in South America for his romantic prose.", 
"popular_works": ["Cien sonetos de amor", "Confieso que he vivido"] 
}
```

This code does not contain any formatting like HTML tags or other markup, just simple data. This type of content is usually fetched by a Spring Surf Web Script dynamically.

## Presentation content

Presentation content are files that describe presentation configuration for a website, it is represented in XML and FreeMarker template files. Presentation content comprises configuration that tells the Surf rendering engine how the Web page or page component should look and feel.

Presentation content answers questions like:

-   What is the layout of the Web page
-   Which theme to use to render the Web page
-   How many articles to display on a Web page
-   Which advertisement to display in a particular section of the site for the current user

A website presentation framework, such as Surf, looks to this content to figure out how to display the page. For example, the following XML code configures a Surf Web Script for rendering a biography to end users and tells the web script to render a link to the full article as well as to show the image of the author.

```


<component> 
  <url>/content/display/biography</url> 
  <properties> 
    <link-title-to-full-article>true</link-title-to-full-article> 
    <show-image>true</show-image> 
  </properties> 
</component>

        
```

These properties are custom properties that are just passed on to the Web Script implementation. This component definition tells Surf to call this Web Script \(i.e. `/content/display/biography`\) to render the biography.

## Semantic and Presentation content work together to render the Web page.

The end-to-end rendering flow is illustrated in the following figure.

![](../images/12-1.png)

This figure depicts a simple request for a biography of a poet. Here is what happens:

1.  Alfresco Surf receives the browser request.
2.  Surf asks the content delivery services for the *Presentation Content* that describes what is being requested.
3.  The *Presentation Content* is handed back as XML and FTL.
4.  Surf determines the *Web Script* to execute using the configuration specified by the component XML.
5.  The *Web Script Controller* \(JavaScript or Java\) calls a service somewhere to retrieve biography data.
6.  The *biography* is returned as *JSON*.
7.  The *Web Script Template* \(FreeMarker\) renders HTML markup to the end user. This HTML contains presentation output \(formatting\) as well as the semantic data \(the biography itself\).

The website user then sees the poet's content. Rending a complete Web page with more stuff then just the biography, such as title, footer, header etc, will loop through step 4 - 7 multiple times.

**Parent topic:**[Surf Framework Guide](../concepts/surf-fwork-intro.md)

