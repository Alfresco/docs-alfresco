---
title: Configure SAP S/4HANA Cloud Essentials
---

Use this information to configure the SAP Cloud Connector for SAP S/4HANA Cloud Essentials.

## Connect SAP Cloud with SAP Business Technology Platform (BTP) {#connect-btp}

There are a few steps required to connect an external repository to the SAP S/4HANA Cloud Essentials, such as:

* SAP BTP must be fundamentally configured (i.e. Subaccount, Cloud Foundry, Entitlements).
* SAP BTP must be enabled to work with the Document Management Service.
* The Content Services repository must be set up as a Destination in the SAP BTP (described in the step below).
* In SAP S/4HANA Cloud Essentials, the required Communication Scenarios (including Communication User) must be created and maintained.
* SAP S/4HANA Cloud Essentials must be enabled to connect to the SAP BTP.
  
> **Note:** The steps above are explained roughly because they're not part of the SAP Cloud Connector installation. They might differ slightly from customer to customer.

The final configuration steps required in SAP are to connect an arbitrary external content repository to SAP S/4HANA Cloud Essentials. You'll find a good starting point for the complete list of required steps in the *Document Management Service, Integration Option* link below. Follow the steps in the official SAP documentation:

* [Content Management Interoperability Services (CMIS)](https://help.sap.com/viewer/a630d57fc5004c6383e7a81efee7a8bb/LATEST/en-US/afa76f9f02204717958bbef34a81c386.html){:target="_blank"}
* [Manage Document Management Service, Integration Option](https://help.sap.com/viewer/f6e70dd4bffa4b65965b43feed4c9429/LATEST/en-US/64fa80a1d698429fa8c57a6160e9ba40.html){:target="_blank"}
* *Set-Up Instructions for Customer managed CMIS Repository*
  * This PDF document is provided directly to customers by SAP

### Create Destination on SAP BTP {#create-destination}

As a foundation, Content Services must be created as a Destination on the SAP Business Technology Platform. This is the only touch-point in the whole process where the connection to the Content Services must be specified.

1. Navigate to the Subaccount and click `Destinations`.
2. Select `New Destination` to start configuring a new destination.
3. Specify the required fields, including the mandatory ones marked with an asterisk (*).
    For the `URL:*` field:

    1. Enter the fully qualified URL to the CMIS Browser binding of Content Services.

        The default should look like this:

        ```text
        http://<content-services>/alfresco/api/-default-/public/cmis/versions/1.1/browser
        ```

    2. **Replace** the default Content Services endpoint `cmis` with the value **`sapcmis`**.

        The URL should look like this:

        ```text
        http://<content-services>/alfresco/api/-default-/public/sapcmis/versions/1.1/browser
        ```

Here's an example of the configuration screen:

![Create Destination]({% link sap-cloud/images/sap_btp_destination.png %})
