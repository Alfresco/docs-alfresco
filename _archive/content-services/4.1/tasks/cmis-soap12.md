---
author: Alfresco Documentation
---

# Using SOAP 1.2 with Alfresco

When using SOAP bindings, the Alfresco CMIS implementation uses the SOAP 1.1 protocol by default. If your application client uses the SOAP 1.2 protocol, you can change the Alfresco configuration to use SOAP 1.2 using the following procedure.

1.  Edit the <installLocation\>/webapps/alfresco/WEB-INF/wsdl/CMISWS-Service.wsdl file. Find the following line:

    ```
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    ```

    Replace it with:

    ```
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap12/"
    ```

2.  Edit the <installLocation\>/webapps/alfresco/WEB-INF/sun-jaxws.xml file. In each <endpoint\> tag, add the following attribute:

    ```
    binding="http://java.sun.com/xml/ns/jaxws/2003/05/soap/bindings/HTTP/"
    ```

3.  Restart your Alfresco server.


Your Alfresco server now communicates with applications using SOAP 1.2.

**Parent topic:**[Using CMIS with Alfresco](../concepts/cmis-and-alfresco.md)

