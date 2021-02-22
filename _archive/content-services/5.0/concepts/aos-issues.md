---
author: Alfresco Documentation
---

# Considerations when using Alfresco Office Services

Use this information to understand some of the dependencies that you might encounter when using Alfresco Office Services \(AOS\).

-   AOS relies on SSL to allow communication with the Alfresco repository:
    -   It is strongly advised that you activate SSL when using Alfresco Office Services. For more information, see [Secure Sockets Layer \(SSL\) and the Alfresco repository](configure-ssl-intro.md).
    -   If you are using a non-SSL connection, you must edit your Mac or Windows client registry files as specified in [Setting up Alfresco Office Services using a non-SSL connection](../tasks/aos-config-nonSSL.md) to allow for communication between Microsoft Office and Alfresco.
    -   If you are using a proxy server to handle SSL, make sure that the proxy is not filtering requests to Alfresco. For more information on proxy SSL configurations, see [Configuring SSL for a production environment](../tasks/configure-ssl-prod.md).
    -   There is limited support for AOS with Microsoft Office for Mac. It is a known problem that there is no property mapping function in Microsoft Office for Mac.
-   AOS is installed by default with the standard Alfresco installation:
    -   If you have installed Alfresco manually or upgraded from a previous version of Alfresco, you might not have installed the additional WAR files required for AOS \(\_vti\_bin.war and ROOT.war. See [Installing the Alfresco WARs](../tasks/alf-war-install.md) for information on where the deployed ROOT and \_vti\_bin files need to be located.
    -   If you have a custom application that is running at the server root directory, it is important that you merge the `_vti_inf.html` and `index.jsp` files into this application to enable AOS. For more information, see [Installing Alfresco into an existing web application](../tasks/install-server-root.md).
-   AOS interacts very closely with Microsoft Office, and there are some implications as a result:

    -   Alfresco simulates a SharePoint Site in the /alfresco/aos directory and uses the child folder to represent the SharePoint document library. As a result, Office does not check out documents in the repository root; that is, if your document is located in /alfresco/aos. Make sure that you add a child folder in the /alfresco/aos directory and place documents there. For example:

        ```
        http://localhost:8080/alfresco/aos/documents/doc1.docx
        ```

    Alfresco and Office handle property mapping and time values differently:

    -   Alfresco and Microsoft use different mechanisms to calculate Daylight Saving Time \(DST\). In Alfresco, DST is applied to dates; for example, a time in August is displayed in DST, but a time in November is displayed without DST. Microsoft applies DST to all dates depending on the current date. For example, if today is in August, the time values of all dates are displayed in DST, even a time in November. This means that if you are looking at a date six months away, there is a one-hour difference between the time value displayed by Alfresco One and the time displayed in Microsoft Office. This mechanism is used across Microsoft products; for example, the same behaviour is visible in the last modified timestamp in Windows Explorer.
    -   Date values are represented by Microsoft Office and Alfresco as `DateTime` values with the time zeroed out \(for example, `03.09.2014 00:00:00`\). After applying time zone conversion to this value, the date might change to the previous or next day. For example, if you are storing `03.09.2014 00:00:00` in `UTC+2` and then reading the value in `UTC-1`.
    -   If mapped properties are embedded into an OOXML file \(e.g. a `.docx` file\), time values are displayed in the user's timezone. Properties embedded into OLE files \(e.g. `.doc` files\) are displayed in Coordinated Universal Time \(UTC\).
    -   There are known issues with decimal numeric values \(float and double\) in non-English versions of certain Office products and if Office runs with a non-English regional setting.

**Parent topic:**[Installing and configuring Alfresco Office Services](../concepts/aos-intro.md)

