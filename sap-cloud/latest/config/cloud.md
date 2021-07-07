---
title: Configure SAP Configure SAP S/4HANA Cloud Essentials
---

Use this information to configure the SAP Cloud Connector for SAP S/4HANA Cloud Essentials.

## Connect SAP Cloud with SAP Business Technology Platform (BTP)
There are a few steps required to connect an external repository to the SAP S/4HANA Cloud Essentials, such as:
 * SAP BTP must be fundamentally configured (i.e. Subaccount, Cloud Foundry, entitlements.).
 * SAP BTP must be enabled to work with the Document Management Service. 
 * The Content Services repository must be set up as Destination in the SAP BTP (refer to the below step).
 * In SAP S/4HANA Cloud Essentials, the required Communication Scenarios (including Communication User) must be created and maintained. 
 * SAP S/4HANA Cloud Essentials must be enabled to connect to the SAP BTP. 
  
The steps above are roughly explained, because they are not part of the Alfresco SAP Cloud Connector installation and might be different from customer to customer. It's required configuration steps in SAP to finally connect an arbriatary external content repository to the SAP S/4HANA Cloud Essentials. 
A good starting point with the complete list of steps required, is the **Document Management Service, Integration Option**. Please follow the steps in the official SAP documentation: 

* [Content Management Interoperability Services (CMIS)](https://help.sap.com/viewer/a630d57fc5004c6383e7a81efee7a8bb/LATEST/en-US/afa76f9f02204717958bbef34a81c386.html)
* [Manage Document Management Service, Integration Option](https://help.sap.com/viewer/f6e70dd4bffa4b65965b43feed4c9429/LATEST/en-US/64fa80a1d698429fa8c57a6160e9ba40.html)
* PDF document **Set
-Up Instructions for Customer managed CMIS 
Repository** provided by SAP to customers.

### Create Destination on SAP BTP
As a foundation, Content Services must be created as a Destination on the SAP Business Technology Platform. This is the only touchpoint in the whole process where the connection to the Content Services must be specified.

1. Navigate to the Subaccount and click on `Destinations`
2. Create a new Destination `Create Destination` 
3. Specify required fields. As for field `URL:*`:
   1. Enter the full qualified URL to the CMIS Browser binding of Content Services. The default should look like:
    
   > `http://<content-services>/alfresco/api/-default-/public/cmis/versions/1.1/browser`  
   
   2. Now **replace** the default Content Services endpoint `cmis` with the value __`sapcmis`__! Finally, the URL should look like: 
   
   > `http://<content-services>/alfresco/api/-default-/public/`__`sapcmis`__`/versions/1.1/browser`

![Create Destination]({% link sap-cloud/images/sap_btp_destination.png %})