---
title: SAP Connector reference
---

This page provides useful references for the SAP Connector.

## Abbreviations

Here are all the abbreviations that are used in the SAP Connector documentation.

| Abbreviation | Description |
| ------------ | ----------- |
| ABAP | Advanced Business Application Programming (SAP) |
| AMP | Alfresco Module Package |
| DIR | Document Info Record (SAP) |
| DMS | Document Management Service (SAP) |
| ECC | SAP ERP Central Component |
| ERP | Enterprise Resource Planning |
| HTTP(S) | Hypertext Transfer Protocol (Secure) |
| ICM | Internet Communication Manager (SAP) |
| IMG | Implementation Guide (SAP) |
| JCo | SAP Java Connector |
| PSE | Personal Security Environment (SAP) |
| SAP | Systeme, Anwendungen und Produkte |
| OSS | Online Service System (SAP) |
| t-code | Transaction Code |

The SAP Connector release includes the following third-party software. These are used either at runtime or while packaging the delivery:

| Abbreviation | Description |
| ------------ | ----------- |
| jcabi-manifests | Manager of MANIFEST.MF files |
| jcabi-logs | Wrapper for Simple Logging Facade for Java (SLF4J) and a few supplementary logging classes |
| license4j-runtime-library | License4J runtime library |
| jcommander | Library to handle command line arguments for the password encryption |
| commons-io | Library of utilities to assist with developing IO functionality required for the SAP JCo Packer tool only |
| commons-compress | Library to compress the modified SAP Connector repository AMP with the included SAP JCo libraries. Required for SAP JCo Packer tool only |
| zip4j | Library to extract the ZIP file from the SAP Java Connector, downloaded from SAP. Required for SAP JCo Packer tool only |
| slf4j-api | Logging framework used for the SAP-Packer. Required for SAP JCo Packer tool only |
| slf4j-simple |Java binding for the logging framework. Required for SAP JCo Packer tool only |

## Additional repository settings {#additionalrepoconfig}

The following table lists additional settings that can be provided in the `alfresco-global.properties` file to override the standard behavior of the SAP Connector. These settings are not related to a particular SAP System Configuration, but they will affect the basic functionality and should be used with caution.

> **Important:** The recommendation is to always consult Alfresco Support before overriding SAP Connector standard behavior with any of the settings below.

| Property | Description |
| -------- | ----------- |
| integrations.sap.configuration.attributeService.enabled | Use the SAP Connector internal `AttributeService` to find documents from SAP, across multiple nodes in high availability systems. Only required if the *Alfresco Full Text Search* within the *Transactional Query Options* was set to `**Never use Database**` in the Alfresco Admin Console. Default value: `false` |
| integrations.sap.configuration.defaultDocProtection | Override the default setting for the `SAP DocProtection` (property `connexasArchivelink:docprot`). If no `docProt` parameter is transferred or an [SAP Archivelink Document](#archivelinktype) is created, this value will be used to override the default. Default value: `rcdu` |
| integrations.sap.configuration.chunkSize | Chunk size that is used to read the payload of the HTTP request. Usually there is no need to change this setting. Default value: `65536 (byte)` |
| integrations.sap.configuration.postFilter.enabled | If `true`, the SAP Connector queries the database only for `docId` instead of `docId`, `compId` and `archiveId`.In this case, `compId` and `archiveId` will be filtered in a second step. Recommended if the database execution plan prioritizes `compId` and `archiveId` (both not unique) over the `docId` (unique) and therefore get an huge result set. Default value: `false` |
| integrations.sap.configuration.doubleSearch.enabled | If `true`, the query used for finding documents requested by SAP is first executed against Solr. If we don't find the desired document, we search again, but against the database using transactional metadata queries (TMQ). In some situations, especially large databases, this can improve speed. Default value: `false` |

## Example configurations {#examplesapsysconfigs}

This section gives examples of different types of system configurations.

### Example 1: One SAP system configuration with Archivelink only {#examplesapsysconfig1}

This is an example for one *SAP System Configuration* with one connected SAP Content Repository, using pure Archivelink (metadata replication is off).

Copy and paste the *SAP System Configuration* code snippet below to your `alfresco-global.properties` and replace the **values** indicated according to your specification.

> **Note:** Do not remove unused property keys.

```text
integrations.sap.system.1.al.alfrescoUser=**admin**
integrations.sap.system.1.al.alfrescoPassword=**t0ps3cR3t**
integrations.sap.system.1.al.archiveIds=**M1**
integrations.sap.system.1.al.documentRoot=**/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.1.al.checkSignature=**true**
integrations.sap.system.1.al.checkExpiration=**true**

integrations.sap.system.1.enabled=**false**
integrations.sap.system.1.name=${sap.system.1.name}
integrations.sap.system.1.host= ${sap.system.1.host}
integrations.sap.system.1.client= ${sap.system.1.client}
integrations.sap.system.1.systemNumber= ${sap.system.1.systemNumber}
integrations.sap.system.1.user= ${sap.system.1.user}
integrations.sap.system.1.password= ${sap.system.1.password}
integrations.sap.system.1.language= ${sap.system.1.language}
integrations.sap.system.1.webClient.enabled=false
integrations.sap.system.1.webClient.url=https://sapserver:port/sap/bc/gui/sap/its/webgui

integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression = 0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression = 0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression = 0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression = 0 0/1 * 1/1 * ? *
```

### Example 2: One SAP system configuration with metadata replication

This is an example for one *SAP System Configuration* with one connected SAP Content Repository, using default and additional metadata replication. It also enables the *Open corresponding business object in SAP* feature in Alfresco Share.

Copy and paste the *SAP System Configuration* code snippet below to your `alfresco-global.properties` and replace the **values** indicated according to your specification.

> **Note:** Do not remove unused property keys.

```text
integrations.sap.system.1.al.alfrescoUser=**admin**
integrations.sap.system.1.al.alfrescoPassword=**t0ps3cR3t**
integrations.sap.system.1.al.archiveIds=**M1**
integrations.sap.system.1.al.documentRoot=**/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.1.al.checkSignature=**true**
integrations.sap.system.1.al.checkExpiration=**true**

integrations.sap.system.1.enabled=**true**
integrations.sap.system.1.name=**SAP Finance (NSP)**
integrations.sap.system.1.host=**192.168.112.112**
integrations.sap.system.1.client=**800**
integrations.sap.system.1.systemNumber=**01**
integrations.sap.system.1.user=**ALFRESCO**
integrations.sap.system.1.password=**t0ps3cR3tP@Ssw0rD**
integrations.sap.system.1.language=**EN**
integrations.sap.system.1.webClient.enabled=**true**
integrations.sap.system.1.webClient.url=**https://192.168.112.112:8021/sap/bc/gui/sap/its/webgui**

integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression=0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression=0 0/1 * 1/1 * ? *
```

### Example 3: Two SAP system configurations with metadata replication

This is a more complex example with two *SAP System Configurations*, different SAP Content Repositories having a mix of properties enabled and disabled.

Copy and paste the *SAP System Configuration* code snippet below to your `alfresco-global.properties` and replace the **values** indicated according to your specification.

> **Note:** Do not remove unused property keys.

In this example, the first *SAP System Configuration* uses plain-text passwords while the second *SAP System Configuration* uses encrypted passwords (see [Encrypting passwords](#encryptpwd) for more). It also has two connected SAP Content Repositories and uses a different site to store the documents. It doesn't have the SAP Web-GUI enabled, and the metadata replication jobs are invoked every 5 minutes instead running each minute like in the first *SAP System Configuration*.

```text
// SAP System Configuration 1
integrations.sap.system.1.al.alfrescoUser=**admin**
integrations.sap.system.1.al.alfrescoPassword=**t0ps3cR3t**
integrations.sap.system.1.al.archiveIds=**M1**
integrations.sap.system.1.al.documentRoot=**/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.1.al.checkSignature=**true**
integrations.sap.system.1.al.checkExpiration=**true**

integrations.sap.system.1.enabled=**true**
integrations.sap.system.1.name=**SAP Finance (NSP)**
integrations.sap.system.1.host=**192.168.112.112**
integrations.sap.system.1.client=**800**
integrations.sap.system.1.systemNumber=**01**
integrations.sap.system.1.user=**ALFRESCO**
integrations.sap.system.1.password=**t0ps3cR3tP@Ssw0rD**
integrations.sap.system.1.language=**EN**
integrations.sap.system.1.webClient.enabled=**true**
integrations.sap.system.1.webClient.url=**https://192.168.112.112:8021/sap/bc/gui/sap/its/webgui**

integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression=0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression=0 0/1 * 1/1 * ? *
  
// SAP System Configuration 2
integrations.sap.system.2.al.alfrescoUser=**sapinteg**
integrations.sap.system.2.al.alfrescoPassword=**ENC(XbfE4Z112==)**
integrations.sap.system.2.al.archiveIds=**K2,Z1**
integrations.sap.system.2.al.documentRoot=**/app:company_home/st:sites/cm:sap_hr/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.2.al.checkSignature=**true**
integrations.sap.system.2.al.checkExpiration=**true**

integrations.sap.system.2.enabled=**true**
integrations.sap.system.2.name=**SAP HR (S4H)**
integrations.sap.system.2.host=**192.168.1.110**
integrations.sap.system.2.client=**100**
integrations.sap.system.2.systemNumber=**00**
integrations.sap.system.2.user=**ALF_HR**
integrations.sap.system.2.password=**ENC(RET45324GFDSFfsf43ZEr4rfer45)**
integrations.sap.system.2.language=**EN**
integrations.sap.system.2.webClient.enabled=**false**
integrations.sap.system.2.webClient.url=https://sapserver:port/sap/bc/gui/sap/its/webgui

integrations.sap.system.2.jobs.sapContentConnectorReplicate.enabled=**true**
integrations.sap.system.2.jobs.sapContentConnectorReplicate.cronExpression=**0 0/5 \* 1/1 \* ? \***
integrations.sap.system.2.jobs.sapContentConnectorPlus.enabled=**true**
integrations.sap.system.2.jobs.sapContentConnectorPlus.cronExpression=**0 0/5 \* 1/1 \* ? \***
integrations.sap.system.2.jobs.sapContentConnectorBarcode.enabled=false
integrations.sap.system.2.jobs.sapContentConnectorBarcode.cronExpression=0 0/1 * 1/1 * ? *
integrations.sap.system.2.jobs.sapContentConnectorDirReplicate.enabled=false
integrations.sap.system.2.jobs.sapContentConnectorDirReplicate.cronExpression=0 0/1 * 1/1 * ? *
```

## Reference for SAP Object Type Mapping {#refsapobjecttypemap}

This is the reference for all supported `SAP Object Types` that are available by default in Alfresco Share to open the associated SAP Business Object along with their related transaction within the SAP Web-GUI.

See the [Opening associated Business Object in SAP]({% link sap/5.3/config/advanced.md %}#openassocbusinessobjinsap) feature to learn how to enable and how to customize it.

> **Note:** Because the SAP Object Types `BKPF` and `BUS2081` requires a split of the replicated `SAP Object Id` into at least 2 separate parameters, the URL of both SAP Object Types should never be changed (not even the order).

| SAP Object Type | SAP Transaction | Description | URL parameter attached to the SAP Web-GUI |
| --------------- | --------------- | ----------- |----------------------------------------- |
| BKPF | FB03 | Accounting Document Header | ?~transaction=FB03%%20RF05L-BELNR=%s;RF05L-BUKRS=%s;RF05LGJAHR=%s&~okcode=/00 |
| BUS1065 | PA40 | Personnel Actions | ?~transaction=PA40%%20RP50G-PERNR=%s&~okcode=/00 |
| BUS2010 | ME43 | Request For Quotation | ?~transaction=ME43%%20RM06E-ANFNR=%s&~okcode=/00 |
| BUS2012 | ME23 | Purchase Order | ?~transaction=ME23%%20RM06E-BSTNR=%s&~okcode=/00 |
| BUS2017 | MB03 | Material Document | ?~sap-client=%SAP_CLIENT%&~transaction=MB03%20RM07M-MBLNR=%SAP_OBJECT_ID{1:10}%;RM07M-MJAHR=%SAP_OBJECT_ID{11:14}%&~okcode=/00 |
| BUS2032 | VA03 | Sales Order | ?~transaction=VA03%%20VBAK-VBELN=%s&~okcode=/00 |
| BUS2078 | QM03 | Quality Notification | ?~sap-client=%SAP_CLIENT%&~transaction=QM03%20RIWO00-QMNUM=%SAP_OBJECT_ID%&~okcode=/00 |
| BUS2081 | MIR4 | MIRO - Change Status | ?~transaction=MIR4%%20RBKP-BELNR=%s;RBKP-GJAHR=%s&~okcode=/00 |
| BUS2105 | ME53 | Purchase Requisition | ?~transaction=ME53%%20EBAN-BANFN=%s&~okcode=/00 |
| EQUI | IE03 | Equipment | ?~sap-client=%SAP_CLIENT%&~transaction=IE03%20RM63E-EQUNR=%SAP_OBJECT_ID%&~okcode=/00 |
| KNA1 | VD03 | Customer (Sales) | ?~sap-client=%SAP_CLIENT%&~transaction=VD03%20RF02D-KUNNR=%SAP_OBJECT_ID%&RF02D-D0110=true&~okcode=/00 |
| LFA1 | MK03 | Vendor Master | ?~sap-client=%SAP_CLIENT%&~transaction=MK03%20RF02K-LIFNR=%SAP_OBJECT_ID%&RF02K-D0110=true&~okcode=/00 |
| PREL | PA20 | HR Master Data | ?~sap-client=%SAP_CLIENT%&~transaction=PA20%20RP50G-PERNR=%SAP_OBJECT_ID{0:8}%&~okcode=/00 |
| VBRK | VF03 | Billing Documents | ?~sap-client=%SAP_CLIENT%&~transaction=VF03%20VBRK-VBELN=%SAP_OBJECT_ID%&~okcode=/00 |

## Additional SAP JavaConnector properties {#sapjavaconprops}

This reference lists the additional properties (such using Logon Groups) for the SAP JavaConnector that are supported for each available SAP System Configuration.

See [Configure repository properties]({% link sap/5.3/install/index.md %}#configrepo) and the [example configurations](#examplesapsysconfigs). The properties in the table below use [SAP system configuration with Archivelink only](#examplesapsysconfig1) as an example.

> **Note:** See the SAP JavaConnector documentation to learn more about the available properties and their behaviors in detail.

| Property | Description |
| --------- | ----------- |
| integrations.sap.system.1.destination.auth_type | The authentication type - configured user or current user. |
| integrations.sap.system.1.destination.auth_type | The authentication type - configured user or current user. |
| integrations.sap.system.1.configured_user | The destination configured for the specified user only. |
| integrations.sap.system.1.current_user | The connection created using this destination belongs to the current user. |
| integrations.sap.system.1.alias_user | Logon user alias, can be used instead of logon user. |
| integrations.sap.system.1.codepage | Initial logon codepage in SAP notation. |
| integrations.sap.system.1.pcs | Initial logon codepage type (`1`: non-Unicode or `2`: Unicode enabled, optional). |
| integrations.sap.system.1.mshost | SAP message server host. |
| integrations.sap.system.1.msserv | SAP message server service or port number (optional). |
| integrations.sap.system.1.r3name | System ID of the SAP system, the so-called SID. |
| integrations.sap.system.1.group | Logon group name of SAP application servers (optional, default is PUBLIC). |
| integrations.sap.system.1.saprouter | SAP router string to use for networks being protected by a firewall. |
| integrations.sap.system.1.mysapsso2 | SAP Cookie Version 2 as logon ticket. |
| integrations.sap.system.1.getsso2 | Get/don't get an SSO ticket after logon (`1` or `0`). |
| integrations.sap.system.1.x509cert | X.509 certificate as logon ticket. |
| integrations.sap.system.1.extid_data | External identification user logon data. |
| integrations.sap.system.1.extid_type | Type of the external identification user logon data. |
| integrations.sap.system.1.lcheck | Enable/disable logon check at open time (`1`: enable [default] or `0`: disable). |
| integrations.sap.system.1.delta|Enable/disable table parameter delta management (`1`: enable [default] or `0`: disable). |
| integrations.sap.system.1.snc_partnername | SNC name of the communication partner server. For example: p:CN=SID, O=ACompany, C=EN. |
| integrations.sap.system.1.snc_qop | SNC quality of protection; valid values: `1`, `2`, `3`, `8` (default), `9`. |
| integrations.sap.system.1.snc_myname | Own SNC name of the caller (optional). Overrides the default SNC name. For example: p:CN=MyUserID, O=ACompany, C=EN. |
| integrations.sap.system.1.snc_mode|Secure Network Communications (SNC) mode; `1`: on, `0`: off (default). |
| integrations.sap.system.1.snc_sso | Turn on/off the SSO mechanism of SNC. If set to `0`, use alternative credentials like user/password instead. Valid values are `1` (yes, default) and `0` (no). |
| integrations.sap.system.1.snc_lib | Full path to the library which provides the SNC service. Default: value from {% include tooltip.html word="SAP_JCo" text="JCo" %} middleware property `jco.middleware.snc_lib`. |
| integrations.sap.system.1.destination.peak_limit | Maximum number of active connections that can be created for a destination simultaneously. |
| integrations.sap.system.1.destination.pool_capacity | Maximum number of idle connections kept open by the destination. A value of `0` provides no connection pooling, i.e. connections will be closed after each request. |
| integrations.sap.system.1.destination.expiration_time | Time in milliseconds (ms) after that the connections held by the internal pool can be closed. |
| integrations.sap.system.1.destination.expiration_check_period | Interval in milliseconds (ms) with which the timeout checker thread checks the connections in the pool for expiration. |
| integrations.sap.system.1.destination.max_get_client_time | Maximum time in milliseconds (ms) to wait for a connection, if the maximum allowed number of connections is allocated by the application. |
| integrations.sap.system.1.destination.repository_destination | Specifies which destination should be used for repository queries. |
| integrations.sap.system.1.destination.repository.user | Optional: If repository destination is not set, and this property is set, it will be used as user for repository queries. This allows using a different user for repository lookups and restrict the permissions accordingly. |
| integrations.sap.system.1.destination.repository.passwd | The password for a repository user. Mandatory, if a repository user should be used. Enter as plain-text or use encrypted password. For latter, the value must be enclosed with string `ENC()`. |
| integrations.sap.system.1.destination.repository_scn_mode | Optional: If SNC is used for this destination, it is possible to turn it off for repository connections, if this property is set to `0`. Defaults to the value of `jco.client.snc_mode`. |
| integrations.sap.system.1.destination.repository_roundtrip_optimization | `1`: forces the usage of RFC_METADATA_GET in {% include tooltip.html word="SAP_ABAP" text="ABAP" %} System, `0`: deactivates it. If the property is not set, the destination will initially do a remote call to check whether RFC_METADATA_GET is available. If it's available, then it'll use it. |
| integrations.sap.system.1.cpic_trace | Enable/disable CPIC trace (`-1`: take over environment value CPIC_TRACE, `0`: no trace, `1,2,3` - different trace levels). |
| integrations.sap.system.1.trace | Enable/disable RFC trace (`0` or `1`). |
| integrations.sap.system.1.gwhost | SAP gateway host. |
| integrations.sap.system.1.gwserv | SAP gateway service or port number. |
| integrations.sap.system.1.tphost | Host on which to start an external RFC server executable program. |
| integrations.sap.system.1.tpname | Registered RFC server program ID / External RFC server executable program name. |
| integrations.sap.system.1.type | Connection type (optional). |
| integrations.sap.system.1.use_sapgui | Start a SAP GUI and associate with the connection (`0`: do not start [default], `1`: start GUI, `2`: start GUI and hide if not used). |
| integrations.sap.system.1.deny_initial_password | Deny usage of initial passwords (`0` [default] or `1`). |

## Communication via HTTPS {#securecomms}

Set up a secure communication between Content Services and SAP.

The SAP Connector works well over HTTPS. In general, there is no need to configure the SAP Connector. The main part is to prepare the SAP system and Content Services with the related certificates to use a secure connection.

> **Important:** This chapter only describes the necessary steps to implement the certificate from the Content Services web server in SAP and prepare SAP Content Repositories to use HTTPS over HTTP for the communication.

> **CAUTION**: The creation and installation of the certificate on the Content Services web server is not part of this section.

### Get current certificate from Alfresco {#getcertfromalfresco}

Get the current certificate from Alfresco.

The current certificate used by the Content Services webserver must be known (and imported) in SAP. Therefore, export the certificate by following the steps below:

> **Important:** The Content Services webserver must be up and running on a secure connection. This documentation does not cover the installation and configuration of the SSL connection on Content Services side. It only covers how to get the existing certificate.

1. Open Content Services (either the Alfresco Share or Alfresco Digital Workspace login page) in a web-browser and view the details of the current certificate.

    ![sap_inst_004_https_002_alf_certificate]({% link sap/images/sap_inst_004_https_002_alf_certificate.png %})

2. Export the certificate to the local machine (depending on the browser manufacturer).

    ![sap_inst_004_https_002_alf_certificate_export]({% link sap/images/sap_inst_004_https_002_alf_certificate_export.png %})

3. Make sure you use `DER encoded binary X.509 (.CER)` as the export format.

    ![sap_inst_004_https_002_alf_certificate_export_format]({% link sap/images/sap_inst_004_https_002_alf_certificate_export_format.png %})

4. Once successfully saved, the file will be required in step [Import Alfresco Certificate in SAP PSE](#importcertinsappse).

Prepare the SAP Content Repository to use a secure connection.

### Prepare SAP Content Repository for HTTPS

Set up SAP Content Repository connection to use a secure connection.

To prepare the SAP Content Repository to use a secure connection, follow these steps:

1. Open transaction `OAC0`.

2. Select the desired SAP Content Repository.

3. Enter `%https` in the transaction code field to show required HTTPS related settings:

    1. Remove the value for `Port Number`.

    2. Add the `SSL Port Number`.

    3. Select `HTTPS required` as a value for **HTTPS on frontend**.

    4. Select `HTTPS required` as a value for **HTTPs on backend**.

4. Save the settings for the SAP Content Repository.

![sap_inst_004_https_001]({% link sap/images/sap_inst_004_https_001.png %})

> **Note:** Make sure you remove the non-SSL Port Number, otherwise the connection will fail.

Import the certificate from Content Services to the Personal Security Environment (PSE) in SAP.

### Import Alfresco Certificate in SAP PSE {#importcertinsappse}

Import the certificate to the SAP Personal Security Environment.

Make sure you have the certificate from Content Services webserver available.

To import the certificate to the SAP {% include tooltip.html word="SAP_PSE" text="PSE" %} follow these steps:

1. Open transaction `STRUST`.

2. Check whether a `SSL Client (Standard)` {% include tooltip.html word="SAP_PSE" text="PSE" %} exists.

    > **Note:** If there is no `SSL Client (Standard)` PSE available yet, select `SSL Client (Standard)` entry and use the context menu to create a new PSE. Use default settings, if applicable.

3. Select the PSE (double-click) for `SSL Client (Standard)` and scroll down on the settings screen. At the bottom there is a button for uploading the certificate.

    ![sap_inst_004_https_003_strust_pse_import_certificate]({% link sap/images/sap_inst_004_https_003_strust_pse_import_certificate.png %})

4. Upload the certificate previously downloaded from the Content Services webserver ([Get current certificate from Alfresco](#getcertfromalfresco)).

5. Once imported, enter the **Edit** mode (menu **Display ↔ Change**) and click on **Add to Certificate List**.

    ![sap_inst_004_https_003_strust_pse_certificate_add]({% link sap/images/sap_inst_004_https_003_strust_pse_certificate_add.png %})

6. The certificate should now appear in the **Certificates List** of the screen.

    ![sap_inst_004_https_003_strust_certificate_save]({% link sap/images/sap_inst_004_https_003_strust_certificate_save.png %})

7. **Save** the changes.

### Restart SAP Internet Communication Manager

You can restart the Internet Communication Server (ICM) to apply the certificate to the SAP system. Make sure the certificate from the Content Services webserver was successfully imported in SAP {% include tooltip.html word="SAP_PSE" text="PSE" %}.

1. Open transaction `SMICM`.

2. Restart the SAP ICM in menu **More > Administration > ICM**.

    ![sap_inst_004_https_004_smicm_restart]({% link sap/images/sap_inst_004_https_004_smicm_restart.png %})

Next, test the communication via a secured connection.

### (Optional) Test secured connection

To test the secure connection from the SAP side:

1. Open transaction `SM59`.

2. Review the current HTTP connections to external servers by expanding the **HTTP Connections to External Server** section. In this section a new entry must be created pointing to Content Services.

3. Create a new RFC Destination via the **Create** icon with connection type `G HTTP connection to external server` and a name, then click **Continue**.

    ![sap_inst_004_https_005_sm59_create]({% link sap/images/sap_inst_004_https_005_sm59_create.png %})

4. Now, in the **Technical Settings** section, enter the Content Services **Host** along with the **SSL Port** and use `/alfresco` as the **Path Prefix**.

    ![sap_inst_004_https_005_sm59_create_2]({% link sap/images/sap_inst_004_https_005_sm59_create_2.png %})

5. Switch to section **Logon & Security** and scroll down to **Security Options > Status of Secure Protocol**. Select `Active` for **SSL** and choose `DEFAULT SSL Client (Standard)` as **SSL Certificate**.

    ![sap_inst_004_https_005_sm59_create_3]({% link sap/images/sap_inst_004_https_005_sm59_create_3.png %})

6. **Save** the settings.

7. Click **Connection Test** in the toolbar.

    ![sap_inst_004_https_005_sm59_test]({% link sap/images/sap_inst_004_https_005_sm59_test.png %})

8. Review the test result. The connection should work and return with HTTP status code `200` .

    ![sap_inst_004_https_005_sm59_testresult]({% link sap/images/sap_inst_004_https_005_sm59_testresult.png %})

9. The newly created RFC Destination is now available in section **HTTP Connections to External Servers** for transaction `SM59` and can be tested at any time.

The communication via HTTPS should work fine between the SAP system and Content Services.

## Using encrypted passwords {#encryptpwd}

Encrypt all passwords used in the `alfresco-global.properties` by the SAP Connector instead of storing it as plain-text. Make sure the SAP Connector is configured properly and working as expected.

1. Go to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2. Download the related JAR file:

    ```text
    sap-content-connector-encryptor-1.1.jar
    ```

3. Create a public key and private key:

    Navigate to the folder of the downloaded JAR and run the following command to create the key pair in the current path:

    ```bash
    java –jar sap-content-connector-encryptor-1.1.jar init -path .
    ```

    Two files are created:

    * `sapContentConnectorPrivateKey.pri` (private key)
    * `sapContentConnectorPublicKey.pub` (public key)

4. Create an encrypted password:

    ```bash
    java -jar sap-content-connector-encryptor-1.1.jar encrypt -password H3ll0W0rlD112! -publicKey ./sapContentConnectorPublicKey.pub
    ```

    The encrypted password will be printed to the console, for example:

    ```text
    ENC(XbfE4Z112==)
    ```

    Since it's already surrounded by the required `ENC()` function, it can be copied and used as-is.

5. Upload the private key file to Content Services.

    To be able to resolve the password, the previously created private key (`sapContentConnectorPrivateKey.pri`) must be uploaded to the application server root directory (such as `/usr/local/tomcat/sapContentConnectorPrivateKey.pri`).

6. Provide encrypted password.

    To use the encrypted password, paste it as a value for the required properties in the `alfresco-global.properties` file.

    For example:

    ```text
    integrations.sap.system.1.al.alfrescoPassword = **ENC(XbfE4Z112==)**
    ```

7. Restart the application server since `alfresco-global.properties` has changed.

The passwords are now encrypted and not plain-text.
