---
title: Content Accelerator For Claims Management
---

## Integrations

The below integration point can be used from Guidewire, Duck Creek, Salesforce, or any custom system to allow for integration from these systems to create a claim and launch users directly into the claim folder. A typical integration involves generating a URL link on the existing interface that can be put into an iframe or launch a new tab/window that takes the user directly into the claim folder. It will commonly pass in some key metadata from the claims data system to populate and update the claim info each time it is launched.

![Img Txt]({% link content-accelerator/images/cached-repoinsurancesystemintegrationfull.png %})

### REST API

#### Create/Update a Claim Folder and Navigate to the Claim

* **URL**  
`/claim`  
* **Method**  
`GET`  
* **Url Parameters**  
**Required:**  
`claimNumber=[claim number of folder to fetch/create/update]`  
**Optional:**  
Additional parameters can be passed. These parameter will be set on the claim folder if one exists, the matching parameters will be updated on the claim folder. All properties on the claim folder are valid parameters, below are two samples.  
`lossDate=[the Date of Loss]`  
`claimOwner=[the name of the claimant]`  
* **Data Parameters**  
None  
* **Success Response**  
  * **Code:** 200  
  * User will be routed to claim folder within the Content Accelerator  
* **Sample Call**  
Expected Result - claim folder created/updated for claim number 111111 and the user is routed to that folder. The claim folder has its attributes set to whatever values are passed in.

> `https://{server}/ocms/claim?claimNumber=8005882300&claimOwner=Joe%20Claimant&lossDate=2020-05-15&participants[]=Joe%20Claimant&participants[]=Slipping%20Jimmy&policyNumber=8675309`

* All Fields Available
  * claimNumber
  * claimOwner
  * policyNumber
  * insuredName
  * participants[]  (This is a repeating field, so must be passed in as an array, each time the key should be repeated)
  * lossDate
  * reportDate
  * closeDate

> **Note:**
>
> * Dates should be passed in in the following format: YYYY-MM-DD.
> * Custom fields in your object model that extend the "claimDocument" can also be passed in. Example: `customModel:myCustomAttribute` would be passed in as `&myCustomAttribute=MyValue`.

### Default Claim Properties

The following properties are defaulted for the claims accelerator. This may be something you want to override for different model types.

```plaintext
#the oc name of the folder type for the claim as defined in the data model
insurance.dataModel.folderType=insurance_claimsFolder

# the oc property associated with the folder's name (can remove the model type)
insurance.folder.nameProperty=claimNumber
# comma separated list (no spaces before/after property) of oc names required when creating a new object
insurance.folder.requiredProperties=claimNumber
```

#### Modify these Properties

To do this, create the file `opencontent-override-placeholders.properties`. It will need to be located on the `/alfresco` classpath, for example, `tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent`. Put the updated properties in there.

Two things to note with this:

1. This file will win out on any other property files, even ones in the custom amp. For this reason, if you are using a custom amp, it is better to override the properties in the amp than this file.
2. You will likely need to create the `module/com.tsgrp.opencontent/` folders.
