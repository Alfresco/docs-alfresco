---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Administration
keyword: [audit, Records Management]
---

# Audit recording values

The `RecordValue` element makes use of the `DataExtractor` definitions, but specifies when to be activated \(`dataTrigger`\) and where to get the data from \(`dataSource`\). Both the `dataTrigger` and `dataSource` attributes default to the path of the `RecordValue` element. Data is always written to the path where the `RecordValue` is declared. So, it is possible to trigger the `RecordValue` when a data path is present \(such as a `null` value\) and then to read a value from a completely different location.

1.  Activate sample /audit/alfresco-audit-example-extractors.xml file.

2.  Restart Alfresco \(or restart the Audit subsystem\).

3.  Tail the log to capture `createNode` calls:

    ```
    tail -f ../logs/catalina.out | grep -G "createNode" -A 200 -B 20
    ```

4.  Login to explorer and add some content under **Company Home**.

    ```
    20:18:52,817 User:admin DEBUG [repo.audit.AuditComponentImpl] 
    New audit entry: 
    	Application ID: 8
    	Entry ID:       177
    	Values:         
    		/auditexampleextractors/args/properties=...
    		/auditexampleextractors/args/assocQName={http://www.alfresco.org/model/content/1.0}alfresco.log
    		/auditexampleextractors/args/parentRef=workspace://SpacesStore/37884669-0607-4527-940d-cb34b4f07d75
    		/auditexampleextractors/no-error=null
    		/auditexampleextractors/args/assocTypeQName={http://www.alfresco.org/model/content/1.0}contains
    		/auditexampleextractors/args/nodeTypeQName={http://www.alfresco.org/model/content/1.0}content
    		/auditexampleextractors/result=workspace://SpacesStore/37884669-0607-4527-940d-cb34b4f07d75|workspace://SpacesStore/c0fabc6d-903f-4317-87d1-ec62de37089c|...
    	Audit Data: 
    		/auditexampleextractors/create/out/a=workspace://SpacesStore/37884669-0607-4527-940d-cb34b4f07d75|workspace://SpacesStore/c0fabc6d-903f-4317-87d1-ec62de37089c|...
    		/auditexampleextractors/create/derived/parent-node-name=Company Home
    		/auditexampleextractors/create/derived/parent-node-null=null
    		/auditexampleextractors/create/in/c={http://www.alfresco.org/model/content/1.0}contains
    		/auditexampleextractors/create/in/d={http://www.alfresco.org/model/content/1.0}alfresco.log
    		/auditexampleextractors/create/in/a=workspace://SpacesStore/37884669-0607-4527-940d-cb34b4f07d75
    		/auditexampleextractors/create/derived/parent-node-type={http://www.alfresco.org/model/content/1.0}folder
    		/auditexampleextractors/create/in/b={http://www.alfresco.org/model/content/1.0}content
    ```

5.  View the audited data using the query API:

    ```
    % curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleExtractors?limit=1&forward=false&verbose=true"
    {
       "count":1,
       "entries": 
       [
          {
             "id":177,
             "application":AuditExampleExtractors,
             "user":admin,
             "time":"2010-09-20T20:18:52.761+01:00",
             "values":
             {
                         "\/auditexampleextractors\/create\/out\/a":"workspace:\/\/SpacesStore\/37884669-0607-4527-940d-cb34b4f07d75|workspace:\/\/SpacesStore\/c0fabc6d-903f-4317-87d1-ec62de37089c|...
                         ,"\/auditexampleextractors\/create\/derived\/parent-node-name":"Company Home"
                         ,"\/auditexampleextractors\/create\/in\/c":"{http:\/\/www.alfresco.org\/model\/content\/1.0}contains"
                         ,"\/auditexampleextractors\/create\/in\/d":"{http:\/\/www.alfresco.org\/model\/content\/1.0}alfresco.log"
                         ,"\/auditexampleextractors\/create\/in\/a":"workspace:\/\/SpacesStore\/37884669-0607-4527-940d-cb34b4f07d75"
                         ,"\/auditexampleextractors\/create\/derived\/parent-node-type":"{http:\/\/www.alfresco.org\/model\/content\/1.0}folder"
                         ,"\/auditexampleextractors\/create\/in\/b":"{http:\/\/www.alfresco.org\/model\/content\/1.0}content"
             }
             
          }
       ]
    }
    ```

    The /no-error path was used as the `dataTrigger` to activate all the `RecordValue` elements, that is, the presence of the path triggered the data rather than any specific value. /create/derived/... audit values show how the parent node reference was used to record values that were not part of the inbound data set.


Using the example, to search for values that are not strings, use the following:

```
% curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleExtractors/ \
                 auditexampleextractors/create/derived/parent-node-type?                              \
                 valueType=org.alfresco.service.namespace.QName&                                      \
                 value=%7Bhttp://www.alfresco.org/model/content/1.0%7Dfolder"
{
   "count":1,
   "entries": 
   [
      {
         "id":177,
         "application":AuditExampleExtractors,
         "user":admin,
         "time":"2010-09-20T20:18:52.761+01:00",
         "values":
null
      }
   ]
}

% curl -u admin:admin "http://localhost:8080/alfresco/service/api/audit/query/AuditExampleExtractors/ \
                 auditexampleextractors/create/in/a?                                                  \
                 valueType=org.alfresco.service.cmr.repository.NodeRef&                               \
                 value=workspace://SpacesStore/37884669-0607-4527-940d-cb34b4f07d75"
{
   "count":1,
   "entries": 
   [
      {
         "id":177,
         "application":AuditExampleExtractors,
         "user":admin,
         "time":"2010-09-20T20:18:52.761+01:00",
         "values":
null
      }
   ]
}
```

**Note:** It is not possible to restrict results to a specific value path. The path AND the value are enough to return a result. This does not usually yield duplicate results but it is not as restrictive as it should be. For example, generate the audit data and query for verbose output. Choose to search based on a path and a value and check that you get the correct number of results. Now choose a different path in the value list and query with that, that is, use a path and value that are not related.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

