---
title: Troubleshooting SAP Connector
---

Your problem may be related to any one of the following issues:

## License not valid

If you can't apply the SAP Connector license you've received successfully, make sure you've provided the correct details 
of your landscape (such as *Is Alfresco Content Services running in a virtual machine?*) which are important to issue 
the license.

## Error during connection test setting up a secure connection (HTTPS) in OAC0

If you receive an error during the connection test in OAC0 for the SAP Content Repository, make sure to have 
the `Port Number` removed. Only provide the `SSL Port Number` in this case.

## Payment required (HTTP Response code 402)

If the SAP Connector license becomes invalid or is missing, the SAP user will get a popup which states "Payment required", 
along with a 402 HTTP response code once they try to store a document in Alfresco Content Services. In this case, 
check the SAP Connector license. See [Installing the license]({% link sap/latest/install/index.md %}#installing-the-license) for more.