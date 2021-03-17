---
author: Alfresco Documentation
---

# Alfresco CMIS API

Alfresco fully implements both the CMIS 1.0 and 1.1 standards to allow your application to manage content and metadata in an Alfresco repository or in Alfresco cloud. This section gives a brief overview of the URL format for CMIS REST API calls, and explains the format of responses.

CMIS \(Content Management Interoperability Services\) is a vendor-neutral [OASIS Web services interface specification](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cmis) that enables interoperability between Enterprise Content Management \(ECM\) systems. CMIS allows rich information to be shared across Internet protocols in vendor-neutral formats, among document systems, publishers and repositories, in a single enterprise and between companies.

You can use basic HTTP methods to invoke CMIS methods, or you can use one of the many language-specific libraries that wrap CMIS. One such example for the Java language is the [OpenCMIS Client API](http://chemistry.apache.org/java/developing/guide.html) provided by the [Apache Chemistry](http://chemistry.apache.org/) project. Apache Chemistry provides client libraries for many other languages such as Python, PHP, and .NET.

You can use methods described by both CMIS [1.0](http://docs.oasis-open.org/cmis/CMIS/v1.0/cmis-spec-v1.0.html) and [1.1](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html) in the same application, although in practice it is advisable to write all new applications to the latest 1.1 specification.

-   **[CMIS basics](../../../pra/1/concepts/cmis-basics.md)**  
CMIS is built around a number of concepts. This section provides an overview of those that are shared between all CMIS versions.
-   **[CMIS 1.1](../../../pra/1/concepts/cmis-1.1-intro.md)**  
CMIS 1.1 introduces a number of new concepts that are supported by Alfresco. You can now use the new browser binding to simplify flows for web applications, use Alfresco aspects, and use the append data support to manage large items of content.
-   **[The Alfresco OpenCMIS Extension for CMIS 1.0](../../../pra/1/concepts/opencmis-ext-intro.md)**  
For existing CMIS 1.0 applications, the Alfresco OpenCMIS Extension extended OpenCMIS to provide support for Alfresco aspects.
-   **[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)**  
To get you started with CMIS, this section explains the format of the URL you will use, and what responses to expect.

**Parent topic:**[Alfresco One API](../../../pra/1/topics/pra-welcome.md)

