---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
---

# `getAllCategoryNodes`

`getAllCategoryNodes` these methods return a list of `CategoryTemplateNodes` which represent the category nodes for a given classification.

**Parent topic:**[Classification API](../references/API-FreeMarker-Classification.md)

## `getAllCategoryNodes(aspect)`

`getAllCategoryNodes(aspect)` this method returns a list of CategoryTemplateNodes that represent all the category nodes for a given classification.

### Parameters

-   **aspect**

    A string representing the aspect for which to return the category nodes.


### Returns

Returns a `TemplateNode` object representing the user with the specified user name.

### Example

```


<#list classification.getAllCategoryNodes("cm:generalclassifiable") as n>
  ${n.name}<br>
</#list>          

          
```

The preceding code snippet would return output similar to the following:

```

Software Document Classification
Software Descriptions
Main Software Descriptions
Short System Description
Requirement Description
Architecture Description
Implementation Description
Configuration Description
Software Description Appendices
Terminology Description
Internal Message Description
External Message Description
Record Description
User Interface Description
Process Description
Initialization Description
Utilization Documents
User's Manual
Operator's Manual
Installation Manual
Service Manual
User's Help
Operator's Help
Installations Help
Service Help
Development Plans
Responsibility Plan
Work Breakdown Plan
Schedule Plan
Expense Plan
Phase Plan
Risk Plan
Test Plan
Acceptance Plan
Manual Plan
Method Plan
Quality Plan
Documentation Plan
Version Control Plan
Quality Documents
Change Request
Analysis Request
Information Request
Reader's Report
Review Report
Inspection Report
Test Report
Review Call
Inspection Call
Test Call
Administrative Documents
Preliminary Contract
Development Contract
Extended Contract
Maintenance Contract
Contract Review Minutes
Project Meeting Minutes
Languages
English
British English
American English
Australian English
Canadian English
Indian English
French
French French
Canadian French
German
German German
Austrian German
Swiss German
Spanish
Spanish
Mexican Spanish
American Spanish
Regions
AFRICA
Eastern Africa
Burundi
Comoros
Djibouti
Eritrea
Ethiopia
Kenya
Madagascar
Malawi
Mauritius
Mozambique
Reunion
Rwanda
Seychelles
Somalia
Uganda
United Rep. of Tanzania
Zambia
Zimbabwe
Middle Africa
Angola
Cameroon
Central African Republic
Chad
Congo
...
Tags
          
        
```

## `getAllCategoryNodes(aspect)`

`getAllCategoryNodes(aspect)` this method returns a list of CategoryTemplateNodes that represent all the category nodes for a given classification.

### Parameters

-   **aspect**

    A `QName` object representing the aspect for which to return the category nodes.


### Returns

Returns a `TemplateNode` object representing the user with the specified user name.

### Example

