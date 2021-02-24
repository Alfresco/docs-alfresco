---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Integration]
keyword: [integration, content service mapper]
---

# Content Service Mappers

Not all integrations work exclusively with Alfresco APIs. Sometimes there are standardized interfaces, which are Service Provider Interfaces to which a content management system provides an implementation. These are often protocol-based services to provide language neutrality and to naturally balance the load between the application and the CMS. Services typically include authentication, query, folder navigation, CRUD \(Create, Read, Update, Delete\) operations, content transfer, and versioning. These services are abstract and mapped onto the Alfresco native APIs.

Most patterns are similar between Content Service Mappers and are generally determined by commonality between the ECM systems they are accessing. As a result, these Content Service Mappers often implement a lowest common denominator of functionality.

![](../images/17-1.png)

## Using a Content Service Mapper

A content service accesses the content management system through either a remote protocol or direct calls. In most cases, the access is remote to allow for reuse of the repository by other applications and to simplify the administration of applications without dependencies on the ECM system. The most common protocols are based on SOAP or RESTful web services, such as AtomPub. However, some applications will mandate other Remote Procedure Call interfaces.

A Content Service Mapper then translates the calls into the appropriate mapping in the ECM system. The most common areas of mapping are Data Dictionary for determining what content types are available in the system, content access to map metadata and content streams, folder navigation to map Folder/Space hierarchies, and query interfaces to provide query and retrieval functionality. Query mapping can potentially be complex, such as XML query mapping against an SQL-based system. These mappings are implemented as Facades on the underlying ECM system.

Many systems provide kits for implementing a Content Service Mapper. Much of the framework may be already implemented in Java or C, leaving only the mapping functionality of the Facades to be implemented.

## When to use a Content Service Mapper

Use a Content Service Mapper when an application connects to more than one CMS and you want to isolate the porting of the application to a separate layer.

Some examples of Content Service Mapper interfaces that are specified by other applications include SAP ArchiveLink for archiving reports and accessing attached image files, IBM/Lotus’s Quickr Services for ECM, and OASIS CMIS as a general-purpose connector for many different types of applications. The Alfresco IMAP protocol mapping is an unusual Content Service Mapper in that it maps content services to an email domain model.

You can also define and build a Content Service Mapper if something like CMIS is overkill for your needs or you need functionality or protocol not covered by CMIS. For example, some applications use JSON for remote access of objects and these applications may need the CMS to comply with this pattern. Some systems provide aspects and since CMIS does not support aspects, it may be necessary to provide a separate Content Service Mapper. If an application needs only to access well-structured content as simple objects, a simple Content Service Mapper may be a simpler, higher-performance alternative.

## Example

Alfresco ECM Services for IBM Lotus Quickr are an example of a Content Service Mapper that provides content services on top of Alfresco and maps them to a service interface that Lotus Quickr expects in the Quickr application. The Content Service Mapper allows Quickr to navigate the Alfresco repository, store and retrieve content from Quickr into Alfresco, and manipulate metadata in the content objects from Quickr.

To provide the mapping to Quickr, IBM provided a guide of the services required to access an ECM system like Alfresco or IBM FileNet. This interface required implementing a combination of SOAP for content transfer and AtomPub services for metadata manipulation. See www.ibm.com/developerworks/lotus/library/quickr-web-services/ for more details. IBM provides a WSDL for the SOAP interfaces and can generate the abstract implementations of the WSDL.

For SOAP interfaces, the Alfresco Content Mapper for Quickr used the same web services infrastructure as the Alfresco CMIS web services. The AtomPub interface used web scripts implemented in Java for performance reasons. Both implementations used the Alfresco Java Foundation API.

The following example shows one portion of the implementation that lists children of a document as a feed. Notice that the Mapper is primarily handling the translation of terminology and the mechanics of accessing the objects. The concepts are roughly the same between Quickr and Alfresco. A collection is an artifact of AtomPub rather than Quickr, but the notions of folders, content, and children are the same in both systems.

```
publicclass AlfrescoAtomBasedFeedServiceImpl implements AtomBasedFeedService
{    

  private NodeService nodeService;

  private PersonService personService;

  public Feed getListDocuments(String id)
  {
    NodeRef storeRef = newNodeRef(id);

    // <feed>
    Feed feed = newFOMFeed();

    feed.setBaseUri("/library/" + id + "/");

    // <generator>
    feed.setGenerator("", "1.0", "Teamspace Documents");

    // <id>
    feed.setId("urn:lsid:ibm.com:td:" + id);

    // <link>
    feed.addLink("feed", "self");
    feed.addLink("http://quickr.acme.com/wps/mypoc?uri=dm:" + id
             + "&verb=view", "alternate");
    feed.addLink("feed?pagesize=2&page=3", "next");
    feed.addLink("feed?pagesize=2&page=1", "previous");

    String contentName = (String) nodeService.getProperty(storeRef,
               ContentModel.PROP_NAME);

    // <collection>
    feed.setCollection(new FOMCollection(contentName, "feed",
               new String[] { "*/*" }));

    String authorName = (String) nodeService.getProperty(storeRef,
                            ContentModel.PROP_AUTHOR);
    String email = (String) nodeService.getProperty(
                              personService.getPerson(authorName),
                              ContentModel.PROP_EMAIL);
    String userName = (String) nodeService.getProperty(
                              personService.getPerson(authorName),
                              ContentModel.PROP_USERNAME);

    // feed.addAuthor(createPerson(storeRef));

    // <author>
    feed.addAuthor(authorName, email, "uid=" + userName + ",o=acme");

    // <title>
    feed.setTitle(contentName);

    // <updated>
    feed.setUpdated((Date) nodeService.getProperty(storeRef,
                                    ContentModel.PROP_MODIFIED));

    // add<entry>
    for (ChildAssociationRef childAssoc : nodeService.getChildAssocs(storeRef))
    {
       NodeRef childRef = childAssoc.getChildRef();
       String childName = (String) nodeService.getProperty(childRef,
                                         ContentModel.PROP_NAME);

       Entry entry = newFOMEntry();

       // <id>
       entry.setId("urn:lsid:ibm.com:td:" + childRef.getId());

       // <link>
       entry.addLink("document/" + childRef.getId() + "/entry", "self");
       entry.addLink("http://quickr.acme.com/wps/mypoc?uri=dm:" + childRef.getId()
         + "&verb=view", "alternate");
       entry.addLink("document/" + childRef.getId() + "/entry", "edit");
       if (nodeService.getProperty(childRef, ContentModel.PROP_CONTENT) != null)
       {
         entry.addLink("document/" + childRef.getId() + "/entry", "edit-media");
         entry.addLink("document/" + childRef.getId() + "/entry", "enclosure",
               (String) nodeService.getProperty(childRef,
         ContentModel.PROP_CONTENT), childName, "en",
               (Long) nodeService.getProperty(childAssoc.getChildRef(),
         ContentModel.PROP_SIZE_CURRENT));

         // <category>
         entry.addCategory("tag:ibm.com,2006:td/type", "document", "document");
       }
       else
       {
         // <category>
         entry.addCategory("tag:ibm.com,2006:td/type", "folder", "folder");
       }

       authorName = (String) nodeService.getProperty(childRef,
         ContentModel.PROP_AUTHOR);
       email = (String) nodeService.getProperty(personService.getPerson(authorName),
         ContentModel.PROP_EMAIL);
       userName = (String) nodeService.getProperty(
         personService.getPerson(authorName),
         ContentModel.PROP_USERNAME);

       // <author>
       entry.addAuthor(authorName, email, "uid=" + userName + ",o=acme");

       // <title>
       entry.setTitle(childName);

       // <published>
       entry.setPublished((Date) nodeService.getProperty(childRef,
         ContentModel.PROP_CREATED));

       // <updated>
       entry.setUpdated((Date) nodeService.getProperty(childRef,
         ContentModel.PROP_MODIFIED));

       return feed;
    }

```

This example implements a small but important portion of the Quickr API as a Content Mapper Service. This is the service to get a list of documents that may be used in a portlet or document browser. The service, implemented as an Atom-based feed, references a space node by ID and returns the metadata associated with the space. It then iterates through the children of the node through the child associations. If the child is a document, it provides a link to the content. If it is a folder, it provides a link to the space representing that folder. This is likely to be a common pattern in many Content Mappers.

**Parent topic:**[Content management integration patterns](../concepts/integration-patterns.md)

