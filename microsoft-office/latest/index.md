---
title: Alfresco Office Services
---

Alfresco Office Services (AOS) allows you to access Alfresco directly from your Microsoft Office applications.

Installing Alfresco Office Services allows Microsoft Office Suite applications (for example, Word, PowerPoint, and Excel) to interact with Alfresco similar to SharePoint. This feature allows you to edit Office documents in Alfresco Share and to modify Office files without checking them in and out. Alfresco locks the file while it is being modified and releases the lock when the file is saved and closed.

It is important to note the URL required to access Alfresco from a Microsoft Office application. For more information, see [Using Alfresco from Microsoft Office]({% link microsoft-office/latest/using/index.md %}). The following diagram shows the architecture of AOS in relation to an Alfresco installation:

![Office Services architecture]({% link microsoft-office/images/architecture.png %})

Communication is over HTTP with either the repository (through Alfresco Share) or directly from a Microsoft Office application.

If you are using a proxy server to handle SSL communication, the proxy handles the communication with Share and Microsoft Office through an AJP port (if you are using Tomcat). For more information about setting up a proxy server, see [Configuring SSL]({% link content-services/latest/config/repository.md %}#ssl-repo). The architecture is as follows:

![Office Services proxy architecture]({% link microsoft-office/images/architecture-proxy.png %})

AOS replaces and enhances the Microsoft SharePoint Protocol Support that was available in previous versions of Alfresco.

## Considerations when using Alfresco Office Services

There are some dependencies that you might encounter when using Alfresco Office Services (AOS).

* AOS relies on SSL to allow communication with the repository:
  * You must activate SSL when using Alfresco Office Services. For more information, see [Configuring SSL]({% link content-services/latest/config/repository.md %}).

    If you are using a proxy server to handle SSL, make sure that the proxy is not filtering requests to Alfresco. For more information on proxy SSL configurations, see [Configuring SSL in a production environment]({% link content-services/latest/config/repository.md %}#ssl-prod).

  * There are some limitations when using the Alfresco `external` authentication subsystem. External authentication can work well when using a web browser client, but not when using the MS Office client. This is because no authentication information is sent with the file URL, and MS Office does not store authentication information, so starts a new authentication process. An example of this is when using CAS. CAS authenticates using an HTML form and a web browser that follows an HTTP redirect. The web authentication works correctly, but MS Office authentication will not work because it does not permit completion of the form. This problem is caused by the limited set of authentication protocols that MS Office supports.

    MS Office supports the following authentication mechanisms:

    * HTTP Basic
    * HTTP Digest (NTLM, Kerberos)

    NTLM and Kerberos can be used in an SSO environment.

  * There is limited support for AOS with Microsoft Office for Mac. It is a known problem that there is no property mapping function in Microsoft Office for Mac.
* AOS is installed by default during the standard Alfresco installation:
  * If you are installing the repository manually, you'll need to install the Alfresco Office Services AMP file. See the guidance in [Install an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}) for more information.
  * If you have a custom application that is running at the server root directory, it is important that you merge the `_vti_inf.html` and `index.jsp` files into this application to enable AOS. For more information, see [Install into an existing web application]({% link microsoft-office/latest/install/index.md %}#installing-into-an-existing-web-application).
* AOS interacts very closely with Microsoft Office, and there are some implications as a result:
  * Alfresco simulates a SharePoint Site in the `/alfresco/aos` directory and uses the child folder to represent the SharePoint document library. As a result, Office does not check out documents in the repository root; that is, if your document is located in `/alfresco/aos`. Make sure that you add a child folder in the `/alfresco/aos` directory and place documents there. For example:

    ```bash
    http://localhost:8080/alfresco/aos/documents/doc1.docx
    ```

* Alfresco and Office handle property mapping and time values differently:
  * Alfresco and Microsoft use different mechanisms to calculate Daylight Saving Time (DST). In Alfresco, DST is applied to dates; for example, a time in August is displayed in DST, but a time in November is displayed without DST. Microsoft applies DST to all dates depending on the current date. For example, if today is in August, the time values of all dates are displayed in DST, even a time in November. This means that if you are looking at a date six months away, there is a one-hour difference between the time value displayed by Alfresco and the time displayed in Microsoft Office. This mechanism is used across Microsoft products; for example, the same behavior is visible in the last modified timestamp in Windows Explorer.
  * Date values are represented by Microsoft Office and Alfresco as `DateTime` values with the time zeroed out (for example, `03.09.2014 00:00:00`). After applying time zone conversion to this value, the date might change to the previous or next day. For example, if you are storing `03.09.2014 00:00:00` in `UTC+2` and then reading the value in `UTC-1`.
  * If mapped properties are embedded into an `OOXML` file (for example, a `.docx` file), time values are displayed in the user's timezone. Properties embedded into `OLE` files (for example, `.doc` files) are displayed in Coordinated Universal Time (UTC).
  * There are known issues with decimal numeric values (float and double) in non-English versions of certain Office products and if Office runs with a non-English regional setting.

See [Troubleshoot Alfresco Office Services]({% link microsoft-office/latest/admin/index.md %}) to resolve any other issues you might have.
