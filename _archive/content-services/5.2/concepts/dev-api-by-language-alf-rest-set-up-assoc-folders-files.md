---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Working with relationships between folders/files

Setting up relationships, referred to as associations, between different types of nodes is useful when modelling a specific domain.

|API Call|Description|API Explorer|
|--------|-----------|------------|
|GET nodes/\{parentId\}/children|List the parent-to-primary-child associations \(i.e. cm:contains\) for a parent node.|[http://localhost:8080/api-explorer/\#!/nodes/listNodeChildren](http://localhost:8080/api-explorer/#!/nodes/listNodeChildren)|
|POST nodes/\{parentId\}/children|Create a new parent-to-primary-child association \(i.e. cm:contains\) for a parent node.|[http://localhost:8080/api-explorer/\#!/nodes/createNode](http://localhost:8080/api-explorer/#!/nodes/createNode)|
|GET nodes/\{parentId\}/secondary-children|List the parent-to-secondary-child associations for a parent node.|[http://localhost:8080/api-explorer/\#!/nodes/listSecondaryChildren](http://localhost:8080/api-explorer/#!/nodes/listSecondaryChildren)|
|GET nodes/\{childId\}/parents|Get a list of parent nodes that are associated with a child node.|[http://localhost:8080/api-explorer/\#!/nodes/listParents](http://localhost:8080/api-explorer/#!/nodes/listParents)|
|POST nodes/\{parentId\}/secondary-children|Create a new parent-to-secondary-child association for a parent node.|[http://localhost:8080/api-explorer/\#!/nodes/createSecondaryChildAssociation](http://localhost:8080/api-explorer/#!/nodes/createSecondaryChildAssociation)|
|DELETE /nodes/\{parentId\}/secondary-children/\{childId\}|Delete a parent-to-secondary-child association.|[http://localhost:8080/api-explorer/\#!/nodes/deleteSecondaryChildAssociation](http://localhost:8080/api-explorer/#!/nodes/deleteSecondaryChildAssociation)|
|GET nodes/\{sourceId\}/targets|List the peer-to-peer associations for a source node.|[http://localhost:8080/api-explorer/\#!/nodes/listTargetAssociations](http://localhost:8080/api-explorer/#!/nodes/listTargetAssociations)|
|GET nodes/\{targetId\}/sources|Get a list of source nodes that are associated with a target node.|[http://localhost:8080/api-explorer/\#!/nodes/listSourceAssociations](http://localhost:8080/api-explorer/#!/nodes/listSourceAssociations)|
|POST nodes/\{sourceId\}/targets|Create a new peer-to-peer association for a source node.|[http://localhost:8080/api-explorer/\#!/nodes/createAssociation](http://localhost:8080/api-explorer/#!/nodes/createAssociation)|
|DELETE /nodes/\{sourceId\}/targets/\{targetId\}|Delete a peer-to-peer association.|[http://localhost:8080/api-explorer/\#!/nodes/deleteSecondaryChildAssociation](http://localhost:8080/api-explorer/#!/nodes/deleteSecondaryChildAssociation)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)||

When working with content, it's important to be able to set up relationships such as folder to files and file to file. These relationships are referred to as associations in the Alfresco content model. Out of the box you have already worked with a folder to folders and files association, which is used to build the folder hierarchy that you see in the UI clients. This association is called `cm:contains` and is part of the `cm:folder` type:

```
<type name="cm:folder">
  <title>Folder</title>
  <parent>cm:cmobject</parent>
  <archive>true</archive>
  <associations>
    <child-association name="cm:contains">
      <source>
        <mandatory>false</mandatory>
        <many>true</many>
      </source>
      <target>
        <class>sys:base</class>
        <mandatory>false</mandatory>
        <many>true</many>
      </target>
      <duplicate>false</duplicate>
      <propagateTimestamps>true</propagateTimestamps>
    </child-association>
  </associations>
</type>
```

This association is of the type `child-association`, which means that if you delete the folder the contained folders and files will also be automatically deleted. There is also a peer-to-peer association type that you can see an example of in the out-of-the-box `cm:person` type definition:

```
<type name="cm:person">
  <title>Person</title>
  <parent>cm:authority</parent>
  <properties>
    ...
  </properties>
  <associations>
    <association name="cm:avatar">
      <source>
        <role>cm:avatarOf</role>
        <mandatory>false</mandatory>
        <many>false</many>
      </source>
      <target>
        <class>cm:content</class>
        <role>cm:hasAvatar</role>
        <mandatory>false</mandatory>
        <many>false</many>
      </target>
    </association>
  </associations>
</type>
      
```

The peer-to-peer association type is called just `association`. If you delete a person node the associated avatar will not be automatically deleted.

An association is built up of a `source` and a `target` definition, and the source is basically the class \(i.e. type or aspect\) that defines the association. You can use the `mandatory` and `many` properties to define the cardinality for the association.

When you work with the `cm:contains` association type you set up what is referred to as primary parent-child associations. This is what happens when you upload a file or create a folder. There is also the possibility to work with other types of child associations, they are then referred to as secondary child associations. We will have a look at them now.

To be able to show how to use secondary child associations and peer-to-peer associations we will use a custom content model. For those of you that have been with Alfresco for a while you might remember the Forms Development Kit \(FDK\) custom model. It contains a Gadget type definition with some useful association definitions that we can use for demonstration purposes:

![](../images/fdk-content-model.png)

The `fdk:gadget` type extends `cm:content`, which represents a file, so it can be used to represent for example a review of a gadget in a magazine. We can also see a number of associations defined for `fdk:gadget` representing things like gadget pictures \(`fdk:images`\), gadget company \(`fdk:company`\), gadget contact person \(`fdk:contact`\), gadget press release \(`fdk:pressRelease`\), and gadget reviews \(`fdk:reviews`\). Note that you cannot create an `fdk:gadget` without supplying a picture of it as the `fdk:images` association has been defined with cardinality `1..*`, meaning one is mandatory.

For reference, the `fdk:gadget` type definition looks like this:

```
<type name="fdk:gadget">
   <parent>cm:content</parent>
   <properties>
       <property name="fdk:make">
           <type>d:text</type>
           <mandatory>true</mandatory>
       </property>
       <property name="fdk:model">
           <type>d:text</type>
           <mandatory>true</mandatory>
       </property>
       <property name="fdk:summary">
           <type>d:text</type>
           <mandatory>true</mandatory>
           <constraints>
               <constraint ref="fdk:summary" />
           </constraints>
       </property>
       <property name="fdk:type">
           <type>d:text</type>
           <constraints>
               <constraint ref="fdk:type" />
           </constraints>
       </property>
       <property name="fdk:subType">
           <type>d:text</type>
           <constraints>
               <constraint ref="fdk:subType" />
           </constraints>
       </property>
       <property name="fdk:rrp">
           <type>d:float</type>
       </property>
       <property name="fdk:releaseDate">
           <type>d:datetime</type>
       </property>
       <property name="fdk:endOfLifeDate">
           <type>d:date</type>
       </property>
       <property name="fdk:retailers">
           <type>d:text</type>
           <multiple>true</multiple>
       </property>
       <property name="fdk:rating">
           <type>d:int</type>
           <constraints>
               <constraint ref="fdk:percentage" />
           </constraints>
       </property>
   </properties>
   <associations>
       <association name="fdk:contact">
           <source>
               <mandatory>false</mandatory>
               <many>true</many>
           </source>
           <target>
               <class>cm:person</class>
               <mandatory>false</mandatory>
               <many>false</many>
           </target>
       </association>
       <association name="fdk:reviews">
           <source>
               <mandatory>false</mandatory>
               <many>true</many>
           </source>
           <target>
               <class>cm:content</class>
               <mandatory>false</mandatory>
               <many>true</many>
           </target>
       </association>
       <association name="fdk:company">
           <source>
               <mandatory>false</mandatory>
               <many>true</many>
           </source>
           <target>
               <class>fdk:company</class>
               <mandatory>false</mandatory>
               <many>false</many>
           </target>
       </association>
       <child-association name="fdk:pressRelease">
           <source>
               <mandatory>false</mandatory>
               <many>true</many>
           </source>
           <target>
               <class>cm:content</class>
               <mandatory>false</mandatory>
               <many>false</many>
           </target>
       </child-association>
       <child-association name="fdk:images">
           <source>
               <mandatory>false</mandatory>
               <many>true</many>
           </source>
           <target>
               <class>cm:content</class>
               <mandatory>true</mandatory>
               <many>true</many>
           </target>
       </child-association>
   </associations>
</type>
```

We have two child associations defined for the image and press release files, which will be automatically deleted when you delete the gadget file. Then we have the company, contact, and reviews associations that are peer-to-peer associations and these will not be deleted when you deleted the gadget file, which make sense as a company and contact person can be related to multiple gadgets.

Before we move on and use the FDK content model to demonstrate associations we need to install it into our Alfresco system. It's assumed that you are using Alfresco SDK.

**Installing the FDK content model into an Alfresco SDK AIO project:**

*1\) Download the Form Development Kit \(FDK\) Source JAR*

Download the FDK Source code from [Alfresco artifacts repository \(Nexus\)](https://artifacts.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/test/fdk-custom-model-module/1.0/fdk-custom-model-module-1.0-sources.jar).

*2\) Copy the FDK content model files into the SDK project*

Change the extension name for the FDK JAR file so its a ZIP file instead. Then open and extract its content. Now copy both the fdk-model.xml file and the fdk-model.properties file into the aio/aio-platform-docker/src/main/docker AIO SDK directory.

*3\) Bootstrap FDK content model*

Update the acs61-aio/acs61-aio-platform/src/main/resources/alfresco/module/acs61-aio-platform/context/bootstrap-context.xml file so it also bootstraps the FDK content model, the dictionary bootstrapper bean should now look something like this:

```
<bean id="acs61-aio-platform.dictionaryBootstrap" parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
        <property name="models">
            <list>
                <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
                <value>alfresco/module/${project.artifactId}/model/workflow-model.xml</value>
                <value>alfresco/extension/fdk-model.xml</value>
            </list>
        </property>
        <property name="labels">
            <list>
                <!-- Bootstrap Resource Bundles for the content model types, aspects, properties etc -->
                <value>alfresco/module/${project.artifactId}/messages/content-model</value>
                <value>alfresco/extension/fdk-model</value>
            </list>
        </property>
    </bean>
```

*4\) Open up the platform/repository Docker file and add the command to copy the FDK content model files into an alfresco/extension directory*

The platform \(repository\) Docker file is located in the aio/aio-platform-docker/src/main/docker AIO SDK directory. Add the following COPY command at the end of this file:

```
...
# Copy in the FDK content model for association/relationship example
COPY fdk-model.xml fdk-model.properties $TOMCAT_DIR/shared/classes/alfresco/extension/
```

What this Dockerfile will do is build a custom Repository Docker image that is based on the out-of-the-box Alfresco Repository Docker image that you are using. After it has copied in all the extensions, config files, license etc it will finish by copying in the fdk-model.xml and fdk-model.properties files into the tomcat/shared/classes/alfresco/extension directory where they will be picked up and deployed.

*5\) Restart the platform/repository container*

We have changed only the platform/repository, so it is enough to just restart this container:

```
acs61-aio mbergljung$ ./run.sh reload_acs
Killing docker_acs61-aio-acs_1 ... done
Going to remove docker_acs61-aio-acs_1
Removing docker_acs61-aio-acs_1 ... done
...
```

***Note**. this does not remove any content or metadata.*

Now that the FDK content model is available in our Alfresco installation we can move on and try out associations.

As we learned, a gadget file cannot be created without an associated picture. If we tried we would get an error such as:

```
{
  "error": {
	"errorKey": "framework.exception.ApiDefault",
	"statusCode": 422,
	"briefSummary": "10190002 Found 1 integrity violations:\nThe association child multiplicity has been violated:
...
```

So we need to upload a gadget picture first.

Before uploading any files create a folder called **My Gadgets** under **/Company Home** \(i.e. root\). To do this we POST to the **/nodes/\{id\}/children** URL:

```
curl -H "Content-Type: application/json" -d '{"name":"My Gadgets","nodeType":"cm:folder"}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
```

Now we can upload the gadget picture, prepare a PNG somewhere with the filename gadget-picture.png and then upload it as follows:

```
$ curl -X POST -F filedata=@gadget-picture.png -F "name=gadget-picture.png" -F "nodeType=cm:content" -F "relativePath=My Gadgets" -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 43532    0   701  100 42831   1070  65390 --:--:-- --:--:-- --:--:-- 66359
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-21T09:32:53.121+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "image/png",
      "mimeTypeName": "PNG Image",
      "sizeInBytes": 42303,
      "encoding": "UTF-8"
    },
    "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author",
      "exif:exif"
    ],
    "createdAt": "2019-10-21T09:32:53.121+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "gadget-picture.png",
    "id": "b8dc45cd-6828-41df-a908-e0fa8dbbd96b",
    "properties": {
      "exif:pixelYDimension": 340,
      "cm:versionType": "MAJOR",
      "cm:versionLabel": "1.0",
      "exif:pixelXDimension": 340
    }
  }
}
```

Make a note about the Node Identifier for the gadget-picture.png file as we are going to need it in a bit. While we are at it we can also prepare two of the other associations that we can specify when we create a gadget node. Let’s first upload a gadget review. Create a text file called gadget-review.txt and upload it as follows to the My Gadgets folder:

```
$ curl -X POST -F filedata=@gadget-review.txt -F "name=gadget-review.txt" -F "nodeType=cm:content" -F "relativePath=My Gadgets" -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1212    0   638  100   574   2345   2110 --:--:-- --:--:-- --:--:--  4472
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-21T09:42:48.727+0000",
    "nodeType": "cm:content",
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 47,
      "encoding": "ISO-8859-1"
    },
    "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3",
    "aspectNames": [
      "cm:versionable",
      "cm:titled",
      "cm:auditable",
      "cm:author"
    ],
    "createdAt": "2019-10-21T09:42:48.727+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "gadget-review.txt",
    "id": "581baebd-3814-4cd0-884a-3179f2dac0ac",
    "properties": {
      "cm:versionLabel": "1.0",
      "cm:versionType": "MAJOR"
    }
  }
}
```

Make a note about the Node Identifier for the gadget-review.txt file as we are going to need it too later. Next let’s also create a company node:

```
$ curl -H "Content-Type: application/json" -d '{"relativePath":"My Gadgets", "name":"Cool Gadgets Inc","nodeType":"fdk:company", "properties": {"fdk:email":"info@coolgadgets.com","fdk:url":"www.coolgadgets.com","fdk:city":"London"}}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   844    0   659  100   185   9835   2761 --:--:-- --:--:-- --:--:-- 12597
{
  "entry": {
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-21T10:01:55.279+0000",
    "nodeType": "fdk:company",
    "content": {
      "mimeType": "application/octet-stream",
      "mimeTypeName": "Binary File (Octet Stream)",
      "sizeInBytes": 0,
      "encoding": "UTF-8"
    },
    "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3",
    "aspectNames": [
      "cm:auditable"
    ],
    "createdAt": "2019-10-21T10:01:55.279+0000",
    "isFolder": false,
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Cool Gadgets Inc",
    "id": "5bae662a-b450-49c0-8f40-8ba2046aa423",
    "properties": {
      "fdk:email": "info@coolgadgets.com",
      "fdk:city": "London",
      "fdk:url": "www.coolgadgets.com"
    }
  }
}
```

**Warning:** If you get an error response saying "fdk:company isn't a valid QName" it means you haven't installed the FDK content model properly.

Now we're finally ready to create our gadget node. We can specify the child associations using the `secondaryChildren` property and the peer associations using the `targets` property. Use the node IDs for the gadget image, review, and company that we created earlier on. We POST to **/nodes/\{id\}/children** as usual:

```
$ curl -H "Content-Type: application/json" -d '{"relativePath":"My Gadgets","name":"My Gadget","nodeType":"fdk:gadget", "secondaryChildren": [ {"childId":"b8dc45cd-6828-41df-a908-e0fa8dbbd96b","assocType":"fdk:images"}], "targets": [ {"targetId":"581baebd-3814-4cd0-884a-3179f2dac0ac","assocType":"fdk:reviews"},{"targetId":"5bae662a-b450-49c0-8f40-8ba2046aa423","assocType":"fdk:company"}]}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   893    0   549  100   344   3496   2191 --:--:-- --:--:-- --:--:--  5687
{
  "entry": {
    "aspectNames": [
      "cm:auditable"
    ],
    "createdAt": "2019-10-21T10:08:09.561+0000",
    "isFolder": false,
    "isFile": true,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-10-21T10:08:09.561+0000",
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "My Gadget",
    "id": "74351ea7-8c72-44e4-829c-7d606a8682c7",
    "nodeType": "fdk:gadget",
    "content": {
      "mimeType": "application/octet-stream",
      "mimeTypeName": "Binary File (Octet Stream)",
      "sizeInBytes": 0,
      "encoding": "UTF-8"
    },
    "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3"
  }
}
```

Here we are creating a contentless file with three associations. We cannot actually see in the response that these associations have been created. There is an endpoint we can use to return the associations for a node.

To get a list of the targets \(peer associations\) we created make a GET call to the following URL:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{sourceId\}/targets**

The `{sourceId}` represents the node identifier for the node we want to list peer associations for. To list associations for our newly created gadget with the node id 74351ea7-8c72-44e4-829c-7d606a8682c7 make a call as follows:

```
$ curl -X GET -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/targets | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1226    0  1226    0     0  15325      0 --:--:-- --:--:-- --:--:-- 15325
{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-10-21T09:42:48.727+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T09:42:48.727+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "gadget-review.txt",
          "association": {
            "assocType": "fdk:reviews"
          },
          "id": "581baebd-3814-4cd0-884a-3179f2dac0ac",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 47,
            "encoding": "ISO-8859-1"
          },
          "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3"
        }
      },
      {
        "entry": {
          "createdAt": "2019-10-21T10:01:55.279+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T10:01:55.279+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "Cool Gadgets Inc",
          "association": {
            "assocType": "fdk:company"
          },
          "id": "5bae662a-b450-49c0-8f40-8ba2046aa423",
          "nodeType": "fdk:company",
          "content": {
            "mimeType": "application/octet-stream",
            "mimeTypeName": "Binary File (Octet Stream)",
            "sizeInBytes": 0,
            "encoding": "UTF-8"
          },
          "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3"
        }
      }
    ]
  }
}
```

We can see here that there exists two peer associations for the gadget node, one for the review and one for the company. If you remove the gadget node these target nodes will not be deleted automatically.

We can also combine some of the techniques we've learned in other sections of the ReST API User Guide and just request the `fdk:reviews` association and show the path and properties of the target node using the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{sourceId\}/targets?include=properties,path&where=\(assocType='\{association type\}'\)**

To get all the reviews for the gadget make the call as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/targets?where=(assocType%3D'fdk%3Areviews')&include=path%2C%20properties' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1064    0  1064    0     0  50666      0 --:--:-- --:--:-- --:--:-- 53200
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T09:42:48.727+0000",
          "association": {
            "assocType": "fdk:reviews"
          },
          "nodeType": "cm:content",
          "content": {
            "mimeType": "text/plain",
            "mimeTypeName": "Plain Text",
            "sizeInBytes": 47,
            "encoding": "ISO-8859-1"
          },
          "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3",
          "createdAt": "2019-10-21T09:42:48.727+0000",
          "path": {
            "name": "/Company Home/My Gadgets",
            "isComplete": true,
            "elements": [
              {
                "id": "695c2c56-3ba0-4539-b301-12bd9bb47712",
                "name": "Company Home",
                "nodeType": "cm:folder",
                "aspectNames": [
                  "cm:titled",
                  "cm:auditable",
                  "app:uifacets"
                ]
              },
              {
                "id": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3",
                "name": "My Gadgets",
                "nodeType": "cm:folder",
                "aspectNames": [
                  "cm:auditable"
                ]
              }
            ]
          },
          "isFolder": false,
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "gadget-review.txt",
          "id": "581baebd-3814-4cd0-884a-3179f2dac0ac",
          "properties": {
            "cm:versionLabel": "1.0",
            "cm:versionType": "MAJOR"
          }
        }
      }
    ]
  }
}
```

We can retrieve the list of secondary child associations by using the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{sourceId\}/secondary-children**

Here is how that looks like:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/secondary-children' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   671    0   671    0     0  13420      0 --:--:-- --:--:-- --:--:-- 13420
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-10-21T09:32:53.121+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T10:08:09.614+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "gadget-picture.png",
          "association": {
            "isPrimary": false,
            "assocType": "fdk:images"
          },
          "id": "b8dc45cd-6828-41df-a908-e0fa8dbbd96b",
          "nodeType": "cm:content",
          "content": {
            "mimeType": "image/png",
            "mimeTypeName": "PNG Image",
            "sizeInBytes": 42303,
            "encoding": "UTF-8"
          },
          "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3"
        }
      }
    ]
  }
}
```

The response is similar to the previous example except we're seeing the fdk:images child association.

What if we want to go in the other direction and see what links to a particular node, for peer associations we can use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{targetId\}/sources**

In this case the `{targetId}` would be the node identifier of the target node in the association. For example, to get anything linking to the gadget review text file \(581baebd-3814-4cd0-884a-3179f2dac0ac\) use the following GET call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/581baebd-3814-4cd0-884a-3179f2dac0ac/sources' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   673    0   673    0     0   9219      0 --:--:-- --:--:-- --:--:--  9219
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-10-21T10:08:09.561+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T10:08:09.561+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "My Gadget",
          "association": {
            "assocType": "fdk:reviews"
          },
          "id": "74351ea7-8c72-44e4-829c-7d606a8682c7",
          "nodeType": "fdk:gadget",
          "content": {
            "mimeType": "application/octet-stream",
            "mimeTypeName": "Binary File (Octet Stream)",
            "sizeInBytes": 0,
            "encoding": "UTF-8"
          },
          "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3"
        }
      }
    ]
  }
}
```

We should see that the "My Gadget" node is linked to the review text file.

To see parents for child associations we use a GET call to the following URL:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{childId\}/parents**

For example, to see the parents of the gadget picture file \(b8dc45cd-6828-41df-a908-e0fa8dbbd96b\) we uploaded earlier, we should see 2 parents, the "My Gadget" node and the “My Gadgets” folder where the image itself was uploaded:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/b8dc45cd-6828-41df-a908-e0fa8dbbd96b/parents' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1139    0  1139    0     0  33500      0 --:--:-- --:--:-- --:--:-- 33500
{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "createdAt": "2019-10-21T10:08:09.561+0000",
          "isFolder": false,
          "isFile": true,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T10:08:09.561+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "My Gadget",
          "association": {
            "isPrimary": false,
            "assocType": "fdk:images"
          },
          "id": "74351ea7-8c72-44e4-829c-7d606a8682c7",
          "nodeType": "fdk:gadget",
          "content": {
            "mimeType": "application/octet-stream",
            "mimeTypeName": "Binary File (Octet Stream)",
            "sizeInBytes": 0,
            "encoding": "UTF-8"
          },
          "parentId": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3"
        }
      },
      {
        "entry": {
          "createdAt": "2019-10-21T09:30:41.096+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "modifiedAt": "2019-10-21T10:08:09.692+0000",
          "modifiedByUser": {
            "id": "admin",
            "displayName": "Administrator"
          },
          "name": "My Gadgets",
          "association": {
            "isPrimary": true,
            "assocType": "cm:contains"
          },
          "id": "e2bdf9a3-ef31-469f-aeb4-07f2083961b3",
          "nodeType": "cm:folder",
          "parentId": "695c2c56-3ba0-4539-b301-12bd9bb47712"
        }
      }
    ]
  }
}
```

It's also possible to create associations on nodes that already exist, let's add some more to our "My Gadget" `fdk:gadget` node. Before we do that though upload another image to the “My Gadgets” folder and some more content to represent another review, do it via ReST API or UI.

To create another child association we use the same URL we used earlier to retrieve the list of secondary child associations \(**nodes/\{sourceId\}/secondary-children**\) except this time we POST to it. Sending the body below will create another child association to the 2nd image with node ID 3e76d633-5dad-475e-bc9d-26a33ec64e11:

```
{
  "childId": "3e76d633-5dad-475e-bc9d-26a33ec64e11",
  "assocType": "fdk:images"
}
```

Here is how the call looks like:

```
$ curl -H "Content-Type: application/json" -d '{"childId":"3e76d633-5dad-475e-bc9d-26a33ec64e11", "assocType":"fdk:images"}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/secondary-children | jq
100   161    0    85  100    76   1328   1187 --:--:-- --:--:-- --:--:--  2515
{
  "entry": {
    "assocType": "fdk:images",
    "childId": "3e76d633-5dad-475e-bc9d-26a33ec64e11"
  }
}
```

We can do the same thing to create another peer association by POSTing the following data to **nodes/\{sourceId\}/targets** \(second review node ID = 80983f1e-ef4e-4285-bd08-94a343923192\):

```
{
  "targetId": "80983f1e-ef4e-4285-bd08-94a343923192",
  "assocType": "fdk:reviews"
}
```

Here is how the call looks like:

```
$ curl -H "Content-Type: application/json" -d '{"targetId":"80983f1e-ef4e-4285-bd08-94a343923192", "assocType":"fdk:reviews"}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/targets | jq
100   161    0    85  100    76   1328   1187 --:--:-- --:--:-- --:--:--  2515
{
  "entry": {
    "targetId": "80983f1e-ef4e-4285-bd08-94a343923192",
    "assocType": "fdk:reviews"
  }
}
```

If you now do a GET on the same URLs you should now see two `fdk:images` child associations and three peer associations, two of type `fdk:reviews` and one of type `fdk:company`.

Alfresco has a feature called multi-filing, this is where a node can appear in multiple folders, think of it as a unix symbolic link. This feature has been available via the CMIS API for a long time but it's now exposed via the v1 ReST API too.

When we navigate around the repository we're actually following the `cm:contains` child association, to make a node appear in multiple folders we can create a secondary child association from the folder to the node. To make the review text we uploaded in the beginning also appear in the **/Company Home** folder POST the following body to **nodes/\{companyHomeFolderId\}/secondary-children**

```
{
  "childId": "{reviewTextId}",
  "assocType": "cm:contains"
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍
```

To find out the node ID for the company home folder you can go to **Admin Tools \| Node Browser** in Share.

Here is how this call looks like:

```
$ curl -H "Content-Type: application/json" -d '{"childId":"581baebd-3814-4cd0-884a-3179f2dac0ac", "assocType":"cm:contains"}' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/695c2c56-3ba0-4539-b301-12bd9bb47712/secondary-children | jq
100   161    0    85  100    76   1328   1187 --:--:-- --:--:-- --:--:--  2515
{
  "entry": {
    "assocType": "cm:contains",
    "childId": "581baebd-3814-4cd0-884a-3179f2dac0ac"
  }
}
```

The review file now has two parent folders but only one is the primary parent. If we use the Share UI and double click on the review file in the Company Home folder a details page is displayed for the file with breadcrumbs showing the My Gadget folder as the parent because it’s the primary parent folder.

If we request a listing of the Company Home folder secondary children using:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{companyHomeId\}/secondary-children?include=association**

We can find out if a child association is primary or not.

By asking for the association information to be included we can see that the gadget-review.txt node is a secondary child association via the `isPrimary` flag, this allows clients to handle these "linked" nodes differently \(i.e. restrict deletion\).

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/695c2c56-3ba0-4539-b301-12bd9bb47712/secondary-children?include=association' | jq
{
  "list": {
    "pagination": {
      "count": 1,
      "hasMoreItems": false,
      "totalItems": 1,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
...
          "name": "gadget-review.txt",
          "association": {
            "isPrimary": false,
            "assocType": "cm:contains"
          },
...
        }
      }
    ]
  }
}
```

The last thing to cover is deleting associations, let's start by removing the second review from our `fdk:gadget` node. To do this we send a DELETE request to:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{gadgetId\}/targets/\{secondReviewTextId\}?assocType=fdk:reviews**

Here’s how this looks like:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/targets/80983f1e-ef4e-4285-bd08-94a343923192?assocType=fdk:reviews' | jq
```

We can do the same thing for child associations using DELETE. To remove the child association between the `fdk:gadget` and the second image we uploaded use the following URL:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{gadgetId\}/secondary-children/\{secondImageId\}?assocType=fdk:images**

Here is how that looks like:

```
$ curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/74351ea7-8c72-44e4-829c-7d606a8682c7/secondary-children/3e76d633-5dad-475e-bc9d-26a33ec64e11?assocType=fdk:images' | jq
```

Although it's not mandatory it's important to specify the `assocType` query parameter, this defines which type of associations to remove, if we omit this parameter ALL associations \(peer or child depending on the URL used\) between the two nodes are removed.

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

