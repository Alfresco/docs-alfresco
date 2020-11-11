---
title: Install Alfresco Office Services
---

Installing Alfresco Office Services allows Microsoft Office Suite applications (for example, Word, PowerPoint, and Excel) to interact with Alfresco similar to SharePoint. This feature allows you to edit Office documents in Alfresco Share and to modify Office files without checking them in and out. Alfresco locks the file while it is being modified and releases the lock when the file is saved and closed.

## Prerequisites for using Alfresco Office Services

There are a number of software requirements for using AOS.

Alfresco Office Services is part of the standard Alfresco installation, and software and hardware requirements are the same as those for Alfresco. See [Supported platforms]({% link microsoft-office/1.1/support/index.md %}) for more information.

* Microsoft Office 2010 (32 or 64-bit)
* Microsoft Office 2013 (32 or 64-bit)
* Microsoft Office for Mac 2011

> **Note:** Microsoft Office 2016 is supported with AOS 1.1.2 and Alfresco 5.1 or later. If you use Office 2016, you must upgrade to Alfresco 5.1 or later.

> **Note:** You must activate SSL when using Alfresco Office Services. For more information, see [Configuring SSL](LINK 5.1/concepts/configure-ssl-intro.html).

## Installing manually using the AMP file

If you install Alfresco using the setup wizard, AOS is installed as a component at the same time.

A fully-compatible SharePoint repository is also installed, that allows Microsoft Office Suite applications (for example, Word, PowerPoint, and Excel) to interact with Alfresco as if it was SharePoint. This feature allows you to edit Office documents in Alfresco Share and to modify Office files without checking them in and out. Alfresco locks the file while it is being modified and releases the lock when the file is saved and closed.

1. If you are installing using the setup wizard, choose the installation wizard that you require (for your platform) and follow the instructions in [Installing Alfresco using setup wizards](LINK 5.1/concepts/installs-eval-intro.html).

    If you use the **Easy** install option, Alfresco Office Services is installed by default. If you use the Advanced option, ensure that in the Select Components window, you check the Alfresco Office Services box.

2. If you are installing the Alfresco repository manually, or are installing into an existing Alfresco instance:

    1. Install the AMP file, `alfresco-aos-module-1.1.x.amp`. See [Installing an AMP](LINK /5.1/tasks/amp-install.html) for information about installing an AMP file.

    2. Deploy the `_vti_bin.war` file.

    For Tomcat, copy the file to the `tomcat/webapps` folder. When the server starts up, it deploys the WAR file automatically.

    > **Note:** If the `_vti_bin` folder already exists under `tomcat/webapps` (for example, in the case of an upgrade), then remove the folder first, otherwise the new WAR file won't be deployed.

## Installing into an existing web application

If you install Alfresco manually, you must deploy the `ROOT.war` application to the server root. If you already have an application running in the server root, you can merge the Alfresco function into your existing web application.

The `ROOT.war` application is required to enable Alfresco Office Services (AOS). If you have a custom application that is running in the server root directory, it is important that you modify this application to enable AOS.

There are two types of requests that are sent to the server root directly by Microsoft Office and Windows:

1. A request for the `_vti_inf.html` file that contains configuration information
2. `OPTIONS` and `PROPFIND` requests

The following diagram shows the information flow between Microsoft Office and Alfresco, including interactions with the `/alfresco`, `_vti_bin` and `ROOT` applications:

![How it works]({% link microsoft-office/images/howitworks.png %})

1. Extract the `_vti_inf.html` file from the <TOMCAT\_HOME\>webapps/ROOT.war archive file and add it to your web application.

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
