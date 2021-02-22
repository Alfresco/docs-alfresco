---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Transform
---

# Attribute and metadata field mapping for file types

Use this information to understand the default mapping in Alfresco Content Services between file types, metadata extractors, and mapped attributes.

This table provides information about the fields that can be extracted for certain file types, and the attribute that the extracted field maps to.

For information about configuring metadata extractors, see [Metadata Extractors](dev-extension-points-custom-metadata-extractor.md).

|File type|Extracted Field|Mapped Attribute|
|---------|---------------|----------------|
|3G2, 3GP, FLAC, OGG, M4A, M4V, MOV, MP4|author|`cm:author`|
| |title|`cm:title`|
| |created|`cm:created`|
| |xmpDM:artist|`audio:artist`|
| |xmpDM:composer|`audio:composer`|
| |xmpDM:engineer|`audio:engineer`|
| |xmpDM:genre|`audio:genre`|
| |xmpDM:trackNumber|`audio:trackNumber`|
| |xmpDM:releaseDate|`audio:releaseDate`|
|AI, PDF|author|`cm:author`|
| |title|`cm:title`|
| |subject|`cm:description`|
| |created|`cm:created`|
| |Custom metadata|Can be configured|
|AIFF, AU, BMP, CDF, CPIO, FLV, GIF, GZIP, HDF, JAR, JAVA, JPG, KEY, NUMBERS, OGV, OGX, PAGES, PNG, PSD, RSS, RTF, SVG, TAR, TIFF, TXT, WAV, XML, ZIP|author|`cm:author`|
| |title|`cm:title`|
| |subject|`cm:description`|
| |created|`cm:created`|
| |comments|Can be configured|
| |geo:lat|`cm:latitude`|
| |geo:long|`cm:longitude`|
| |Geographic details|`cm:geographic`|
| |exif|`exif:exif`|
|DOC, MPP, PPT, VSD, XLS|author|`cm:author`|
| |title|`cm:title`|
| |subject|`cm:description`|
| |createDateTime|`cm:created`|
| |lastSaveDateTime|`cm:modified`|
| |comments|Can be configured|
| |editTime|Can be configured|
| |format|Can be configured|
| |keywords|Can be configured|
| |lastAuthor|Can be configured|
| |lastPrinted|Can be configured|
| |osVersion|Can be configured|
| |thumbnail|Can be configured|
| |pageCount|Can be configured|
| |wordCount|Can be configured|
|DOCM, DOCX, DOTM, DOTX, POTX, PPAM, PPSM, PPSX, PPTM, PPTX, XLAM, XLSM, XLSX, XLTM, XLTX|author|`cm:author`|
| |title|`cm:title`|
| |subject|`cm:description`|
| |created|`cm:created`|
| |Any custom property|Not mapped|
|DWG|title|`cm:title`|
| |description|`cm:description`|
| |author|`cm:author`|
| |keywords|Can be configured|
| |comments|Can be configured|
| |lastauthor|Can be configured|
|EML|messageFrom|`imap:messageFrom`, `cm:originator`|
| |messageTo|`imap:messageTo`|
| |messageCc|`imap:messageCc`|
| |messageSubject|`imap:messageSubject`, `cm:title`, `cm:description`, `cm:subjectline`|
| |messageSent|`imap:dateSent`, `cm:sentdate`|
| |messageReceived|`imap:dateReceived`|
| |Header names: Thread-Index|`imap:threadIndex`|
| |Header names: Message-ID|`imap:messageId`|
| |Email details|`cm:emailed`|
|HTML, XHTML|author|`cm:author`|
| |title|`cm:title`|
| |description|`cm:description`|
|MP3|songTitle|`cm:title`|
| |albumTitle|`audio:album`|
| |artist|`audio:artist`, `cm:author`|
| |description|`cm:description`|
| |comment|Can be configured|
| |yearReleased|`audio:releaseDate`|
| |trackNumber|`audio:trackNumber`|
| |genre|`audio:genre`|
| |composer|`audio:composer`|
| |lyrics|Can be configured|
|MSG|sentDate|`cm:sentdate`|
| |originator|`cm:originator`, `cm:author`|
| |addressee|`cm:addressee`|
| |addressees|`cm:addressees`|
| |subjectLine|`cm:subjectline`, `cm:description`|
| |toNames|Can be configured|
| |ccNames|Can be configured|
| |bccNames|Can be configured|
|ODB, ODC, ODF, ODG, ODM, ODI, ODP, ODS, ODT, OTG, OTH, OTP, OTS, OTT, SXW|creationDate|`cm:created`|
| |creator|`cm:author`|
| |date|Can be configured|
| |description|`cm:description`|
| |generator|Can be configured|
| |initialCreator|Can be configured|
| |keyword|Can be configured|
| |language|Can be configured|
| |printDate|Can be configured|
| |printedBy|Can be configured|
| |subject|Can be configured|
| |title|`cm:title`|
| |All user properties|Can be configured|

**Parent topic:**[JMX bean categories reference](../concepts/jmx-reference.md)

