---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Upload a file with custom type

Uploading a file with a custom type to the Repository means creating a node with a type other than `cm:content`.

|API Call|POST nodes/\{id\}/children|
|--------|--------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode)|
|See also|[How to update metadata](dev-api-by-language-alf-rest-update-node-metadata.md) and [how to add aspects](dev-api-by-language-alf-rest-add-aspects-to-node.md) and [how to manage associations \(contains examples of uploading files\)](dev-api-by-language-alf-rest-set-up-assoc-folders-files.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

In the last section we saw how to upload a file and set an out-of-the-box content type \(i.e. `cm:content`\). Another common scenario is to upload a file and set a custom content type. To demonstrate this we need to first apply a custom content model to the Repository.

**The following steps show how to create a custom content model that can be deployed to ACS:**

*1\) Describe the custom content model with XML*

Let’s use the following content model, which defines the custom type `acme:document`:

```
<?xml version="1.0" encoding="UTF-8"?>
<model name="acme:contentModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">
   <description>Sample Document Model</description>
   <author>My Name</author>
   <version>1.0</version>

   <imports>
       <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
       <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
       <import uri="http://www.alfresco.org/model/system/1.0" prefix="sys"/>
   </imports>

   <namespaces>
       <namespace uri="http://www.acme.org/model/content/1.0" prefix="acme"/>
   </namespaces>

   <constraints>
       <constraint name="acme:securityClassificationOptions" type="LIST">
           <parameter name="allowedValues">
               <list>
                   <value></value>
                   <value>Public</value>
                   <value>Client Confidential</value>
                   <value>Company Confidential</value>
                   <value>Strictly Confidential</value>
               </list>
           </parameter>
       </constraint>
   </constraints>

   <types>
       <type name="acme:document">
           <title>Sample Document Type</title>
           <parent>cm:content</parent>
           <properties>
               <property name="acme:documentId">
                   <title>Document Identification Number</title>
                   <type>d:text</type>
               </property>
           </properties>
           <mandatory-aspects>
               <aspect>acme:securityClassified</aspect>
           </mandatory-aspects>
       </type>
   </types>

   <aspects>
       <aspect name="acme:securityClassified">
           <title>ACME Security Classified</title>
           <description>Content has been security classified</description>
           <properties>
               <property name="acme:securityClassification">
                   <type>d:text</type>
                   <index enabled="true">
                       <atomic>true</atomic>
                       <stored>false</stored>
                       <tokenised>false</tokenised>
                   </index>
                   <constraints>
                       <constraint ref="acme:securityClassificationOptions"/>
                   </constraints>
               </property>
           </properties>
       </aspect>
   </aspects>
</model>
```

This model also has a custom aspect `acme:securityClassified`, so we can see how aspects can be applied at the same time as we set a custom content type. Store the XML in a file called, for example, acme-content-model.xml.

*2\) Create a file that bootstraps the content model*

For the custom content model to be applied to the Repository we need to define a bootstrap file that points to the acme-content-model.xml file. Create a file called acme-bootstrap-context.xml with the following XML:

```
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
<beans>
    <bean id="acme.extension.dictionaryBootstrap" 
parent="dictionaryModelBootstrap" 
depends-on="dictionaryBootstrap">
        <property name="models">
          <list>                
<value>alfresco/extension/acme-content-model.xml</value>
          </list>
        </property>
    </bean>
</beans>
```

*3\) Create a directory somewhere for Repository extension files and copy the files there*

Now, copy both the acme-content-model.xml file and the acme-bootstrap-context.xml file into this new directory.

There are now two different ways of deploying this content model depending on if you are using an ACS Trial or an [Alfresco SDK](sdk-intro.md) project.

If you are using a trial version of ACS then you follow the first approach described below. If you are using the Alfresco SDK you would want to follow the second approach.

**Installing the WAR file into an ACS Trial environment:**

*1\) Put both the acme-content-model.xml file and the acme-bootstrap-context.xml into an alfresco/extension directory*

The easiest way to do this is to copy both these files into the <ALF-INSTALL-DIR\>/tomcat/shared/classes/alfresco/extension directory, which will be read by the Repository when it starts up.

*2\) Restart Alfresco so custom content model is applied*

The following command can be used to restart Alfresco Tomcat, standing in the Alfresco installation directory:

`$ ./alfresco.sh restart tomcat`

Look in the logs and make sure the Repository has started properly \($ tail -f tomcat/logs/catalina.out\):

```
...
Sep 09, 2019 8:16:43 AM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["http-bio-8080"]
Sep 09, 2019 8:16:43 AM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["ajp-bio-8009"]
Sep 09, 2019 8:16:43 AM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["http-bio-8443"]
Sep 09, 2019 8:16:43 AM org.apache.catalina.startup.Catalina start
INFO: Server startup in 85109 ms
```

We now got a custom content model applied with a custom content type called `acme:document`.

**Installing the custom content model into an Alfresco SDK AIO project:**

*1\) Verify what content model that is currently defined in the SDK project*

When you generate an Alfresco SDK project, such as an All-In-One \(AIO\) project, it comes with a predefined content model that already includes the `acme:document` type and the `acme:securityClassified` aspect. Look in the aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml file and check what is currently defined. If you see the type and the aspect, then you don't have to copy the files into the SDK project.

***OPTIONAL** 2\) Update the SDK project content model*

If your SDK project does not contain the `acme:document` type, then update the aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml file with the contents of the acme-content-model.xml file.

***OPTIONAL**4\) Restart the SDK Project*

Ctrl-C out of the running SDK project and then start it again as follows:

```
acs52-aio mbergljung$ ./run.sh 
...
```

We now got a custom content model applied with a custom content type called `acme:document`. We can use it when uploading a file as follows:

```
$ curl -X POST -F filedata=@test.txt -F "name=somefile.txt" -F "nodeType=acme:document" -F "acme:documentId=DOC001" -F "aspectNames=acme:securityClassified" -F "acme:securityClassification=Public" -F "cm:title=My text" -F "cm:description=My custom text document description" -F "relativePath=My Custom Folder" -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1957  100   804  100  1153    761   1091  0:00:01  0:00:01 --:--:--  1853
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-09-09T07:38:55.060+0000",
    "nodeType": "acme:document",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 34,
      "encoding": "ISO-8859-1"
    },
    "parentId": "69470c63-ea8f-4a93-a408-673d5668e369",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "acme:securityClassified",
      "cm:author"
    ],
    "createdAt": "2019-09-09T07:38:55.060+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "somefile.txt",
    "id": "d8f561cc-e208-4c63-a316-1ea3d3a4e10e",
    "properties": {
      "cm:title": "My text",
      "acme:securityClassification": "Public",
      "cm:versionType": "MAJOR",
      "acme:documentId": "DOC001",
      "cm:versionLabel": "1.0",
      "cm:description": "My custom text document description"
    }
  }
}
```

We can see that the custom content type \(i.e. `acme:document`\) has been set correctly, including the property it contains \(i.e. `acme:documentId`\). At the same time we also show how to apply new aspects with the `aspectNames` field \(note that some aspects are set automatically when you upload a file, such as `cm:author`, `cm:auditable` etc\). So this call is quite powerful.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

