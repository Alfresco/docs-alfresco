---
title: Enterprise Viewer FAQ
---

### Is Enterprise Viewer based on OpenAnnotation (`http://www.openannotation.org/`)?

No, Enterprise Viewer is based on the open Adobe XFDF standard for annotating PDFs - [https://www.iso.org/obp/ui/#iso:std:iso:19444:-1:ed-1:v1:en](https://www.iso.org/obp/ui/#iso:std:iso:19444:-1:ed-1:v1:en>){:target="_blank"}.

### Where are annotations stored?

Annotations are stored in the ECM repository as related objects to the document being annotated. The annotations are stored in the XFDF specification to allow other applications to interface with the open specification.

### I use old versions of web browsers. Is it compatible?

The front-end uses jQuery and Dojo.

### Does Enterprise Viewer allow concurrent access to annotate the same document by several users?

Enterprise Viewer allows any number of users to concurrently annotate a document since each users' annotations are stored as separate objects.

### I am seeing stale page images, does Enterprise Viewer Cache?  How can I clear this cache?

Yes. Enterprise Viewer makes heavy use of caching at both the Server and Browser level. To see totally fresh document pages, clear out AEV's server caches, as well as your browser cache to see your changes take effect. To clear a running instance of AEV's server cache, you can simply hit these endpoints:

First:

![Get Ticket Endpoint]({% link enterprise-viewer/images/get-ticket.png %})

Save the ticket from the above call for the next call:

Finally:

![Clear Caches]({% link enterprise-viewer/images/clear-caches.png %})

After those two steps and browser cache clear, you should see fresh images.

### How does Enterprise Viewer scale for large deployments?

Enterprise Viewer easily scales to multiple instances with load balancing to allow scaling to any number of users.
