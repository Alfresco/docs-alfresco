---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Default email mappings

The Email Mapping page shows a list of the current maps between email headers and Alfresco properties.

For example, the email Subject heading mapping to the property title is shown as: `messageSubject` to `cm:title`

The email header field `messageSubject` is on the left, and is separated by the word “to”, which indicates that it is mapped to a property `cm:title`.

The following field mappings are defined:

-   private static final String KEY\_MESSAGE\_FROM = "messageFrom";
-   private static final String KEY\_MESSAGE\_TO = "messageTo";
-   private static final String KEY\_MESSAGE\_CC = "messageCc";
-   private static final String KEY\_MESSAGE\_SUBJECT = "messageSubject";

The following custom mappings are also useful to map:

-   `messageCc` to `rma:otherAddress`
-   `messageFrom` to `rma:address`
-   `Date` to `rma:dateReceived`

Date is case sensitive.

**Parent topic:**[Mapping emails](../concepts/rm-emailmap-intro.md)

