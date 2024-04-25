---
title: Install Alfresco Office Services
---

If you deploy Alfresco using containerized deployment, AOS is already pre-installed in our Docker images. Use this information to install the repository manually, or for installing into an existing Alfresco instance.

Installing Alfresco Office Services allows Microsoft Office Suite applications (for example, Word, PowerPoint, and Excel) to interact with Alfresco similar to SharePoint. This feature allows you to edit Office documents in Alfresco Share and to modify Office files without checking them in and out. Alfresco locks the file while it is being modified and releases the lock when the file is saved and closed.

## Prerequisites for using Alfresco Office Services

There are a number of software requirements for using AOS.

Alfresco Office Services is part of the standard Alfresco installation, and software and hardware requirements are the same as those for Alfresco. See [Supported platforms]({% link microsoft-office/2.0/support/index.md %}) for more information.

* Microsoft Office 2016 for Windows (boxed version)
* Microsoft Office 2016 for Mac (boxed version)
* Office 365 Desktop Version for Windows v16 (through subscription)
* Office 365 Desktop Version for Mac v15 (through subscription)
* Microsoft Office 2013 (32 or 64-bit)

> **Note:** You must activate SSL when using Alfresco Office Services 1.2 or above. For more information, see [Configuring SSL]({% link content-services/latest/config/repository.md %}#ssl-repo).

In the latest Microsoft Office versions, such as Microsoft Word for Microsoft 365 and Microsoft Office (Version 2401 Build 16.0.17231.20236) 64-bit, Microsoft has removed the ability to use basic authentication in Exchange Online for Exchange ActiveSync (EAS), POP, IMAP, Remote PowerShell, Exchange Web Services (EWS), Offline Address Book (OAB), Autodiscover, Outlook for Windows, and Outlook for Mac.

> **Note:** To make Alfresco Office Services work with the latest versions of Microsoft Office, you must either:
>
> * Use IdP-initiated Single Sign On (IdP/SSO), since basic authentication is not supported in the latest Microsoft Office versions.
> * Downgrade Microsoft Office to a version where basic authentication is supported.

## Installing manually using the AMP file

To install manually into an existing Alfresco instance, you use the AOS AMP file.

> **Note:** If you deploy Content Services using containerized deployment, AOS is pre-installed in the Docker images.

1. Install the AMP file `alfresco-aos-module-2.0.x.amp`. See [Installing an AMP]({% link content-services/latest/install/zip/amp.md %}) for information about installing an AMP file.

2. Deploy the `_vti_bin.war` file.

    For Tomcat, copy the file to the `tomcat/webapps` folder. When the server starts up, it deploys the WAR file automatically.

    > **Important:** If the `_vti_bin` folder already exists under `tomcat/webapps` (for example, in the case of an upgrade), then remove the folder first, otherwise the new WAR file won't be deployed.

## Install into an existing web application

If you install Alfresco manually, you must deploy the `ROOT.war` application to the server root. If you already have an application running in the server root, you can merge the Alfresco function into your existing web application.

The `ROOT.war` application is required to enable Alfresco Office Services (AOS). If you have a custom application that is running in the server root directory, it is important that you modify this application to enable AOS.

There are two types of requests that are sent to the server root directly by Microsoft Office and Windows:

1. A request for the `_vti_inf.html` file that contains configuration information
2. `OPTIONS` and `PROPFIND` requests

The following diagram shows the information flow between Microsoft Office and Alfresco, including interactions with the `/alfresco`, `_vti_bin` and `ROOT` applications:

![How it works]({% link microsoft-office/images/howitworks.png %})

1. Extract the `_vti_inf.html` file from the `<TOMCAT_HOME>webapps/ROOT.war` archive file and add it to your web application.

2. In your web application, modify the service that responds to requests to the server root, so that it sends `PROPFIND` and `OPTIONS` requests to the /alfresco application.

    If you have a `.jsp` page responding to the server root, you can add this code example to that page:

    ```java
    <%
    if(request.getMethod().equals("PROPFIND") || request.getMethod().equals("OPTIONS"))
    {
      ServletContext alfrescoContext = application.getContext("/alfresco");
      if( (alfrescoContext != null) && !alfrescoContext.equals(getServletContext()) )
      {
         RequestDispatcher rd = alfrescoContext.getRequestDispatcher("/AosResponder_ServerRoot");
         if(rd != null)
         {
                 rd.forward(request, response);
                 return;
         }
      }
    }
    %>
    ```

    and add this import statement to the top of the `.jsp` page:

    ```java
    <%@page session="true" import="javax.servlet.ServletContext, javax.servlet.RequestDispatcher” %>
    ```

    If you have deployed alfresco to a different context path (something other than `/alfresco`), make sure that you edit the `application.getContext` value to represent this.

    If you have a servlet responding to these requests, integrate the Java code from these JSP code examples into your application.

3. Depending on your application server, ensure that requests are dispatched by default between different application servers.

    For Tomcat, add a file called `context.xml` to the META-INF directory of your web application. Here is an example of the `context.xml` file:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Context path="/" debug="100" privileged="true" reloadable="true" crossContext="true">
    </Context>
    ```
