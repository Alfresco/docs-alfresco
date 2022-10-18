---
title: Alfresco Enterprise Viewer High Level Architecture
---

The following is an overview of some of the main architectural points of OpenAnnotate. It is not meant to be a comprehensive guide of each detail.

## Application Flow

The following are some of the major parts of the OpenAnnotate "flow" when the application is launched. The starting point for the application is in `core.js`.

1. Compile Handlebars templates
1. Initialize Dojo
1. Fetch the document information (pages, mimetypes, etc.)
1. Initialize the main application layout
1. Initialize the application modules (annotation controller, word map controller, modal, collaboration, etc.)

Once the application has been initialized, it waits for user interaction. In the background, requests are made for section/row data for drawing highlights and for word map data to enable search functionality. The application keeps track of pending requests so that it can cancel them if the user needs to jump to a new page (and thus we want to prioritize the request for fetching that page over the background requests). If configured to do so, the application also makes background requests to "pre-fetch" surrounding pages (relative to the page being viewed by the user). This causes the pages to be cached on the server and leads to faster load times when the user navigates to a different page.

## View Hierarchy

OpenAnnotate utilizes Backbone.Marionette in order to better structure its views.

Below is the view hierarchy:

    AppLayout (LayoutView)
     AbstractDocumentView (CollectionView)
      PDFDocumentView
       RedactionDocumentView
      ImageDocumentView
     SidebarView (ItemView)
     ToolbarView (ItemView)

    AbstractPageView (LayoutView)
     PDFPageView
      RedactionPageView
     ImagePageView

    TextView (ItemView)

The `AppLayout` view is the main layout view for the application. This view binds itself to the `body` and contains three regions for the document pages, the toolbar and the sidebar.

The `AbstractDocumentView` is the parent for the types of document views. It has the common code for all document views: concepts like zoom factors, page changes, etc. When the document view is initialized, it is provided a collection of pages.

The `AbstractPageView` is the parent for the types of pages. We can have PDF pages, redaction pages or image pages (for [slide viewer](https://github.com/tsgrp/OpenAnnotate/wiki/Using-Slide-Viewer-with-OpenAnnotate) for instance). When the app starts, we determine which kind of pages the document being viewed contains (based on mimetype), and we initialize a collection of pages appropriately. If the document is a PDF, each PDF page will also contain a `TextView` view. This sub-view controls the overlaying of Raphael canvases for tools like highlighting and search.

The `SidebarView` contains the sub-views for search, summary view, participants and chat. These sub-views are not currently Marionette views, but they could very easily be converted into Marionette views (and should be when there's time).

## Annotation Objects

Annotation objects are the in-memory representations of the parsed XFDF file for a user. We use a prototype chain to represent annotation objects in order to eliminate duplication of shared code.

Below is the prototype chain for annotation objects:

    Annotation
     DialogAnnotation
      DojoAnnotation
       Ellipse
       Line
       Rectangle
        TextSelect (Highlight & Strikeout)
        Caret
        Redaction
      StickyNote
     Reply
     Status

## Modules

OpenAnnotate contains several modules for isolating application logic into units.

### Annotation Controller

This controller contains the logic for manipulating the set of annotations on a document. Logic for saving, fetching and creating new annotations is contained here.

This controller can be extended for custom annotation logic. For instance, the redaction annotation flow is slightly different than the normal flow. The `RedactionAnnotationController` in `redactionAnnotationController.js` extends the core `AnnotationController` to provide the custom logic.

### Word Map Module

This module contains the logic for fetching and processing information about the words on a PDF document. It exposes the processed information for other views and modules to access.

### Modal

The modal module controls the display of information to the user. All information is conveyed using the same modal; therefore this module is responsible for managing the proper displaying and hiding of the shared modal.

### Change Manager

The change manager module is responsible for tracking user actions and provides the logic for performing an undo or a redo of a previous action.

### Socket Manager

The socket manager module is responsible for initializing a connection to the socket server through Socket.io. This module then controls emitting information to that server and responding to incoming information.
