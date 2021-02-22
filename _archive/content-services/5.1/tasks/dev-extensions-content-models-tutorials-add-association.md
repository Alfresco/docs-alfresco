---
author: Alfresco Documentation
---

# Adding an association

In this tutorial you add an association to your model. An association is a logical link between content types, it is a way of connecting related content.

Complete the previous tutorials in this series before attempting this one.

1.  In your IDE, open the file repo-amp/src/main/amp/config/alfresco/module/repo-amp/model/content-model.xml and load it into the editor.

2.  Change the MyCompany generic document type to the following code:

    ```
    
        <!-- Enterprise-wide generic document type -->
        <type name="my:doc">
        	<title>MyCompany Generic Document</title>
        	<parent>cm:content</parent>
        	<associations>
        		<association name="my:relatedDocuments">
        			<title>Related Documents</title>
        			<source>
        				<mandatory>false</mandatory>
        				<many>true</many>
        			</source>
        			<target>
        				<class>my:doc</class>
        				<mandatory>false</mandatory>
        				<many>true</many>
        			</target>
        		</association>
        	</associations>
        </type>                    
                        
    ```

3.  You need to restart your SDK maven project using [run.sh](../concepts/alfresco-sdk-cmd-reference-aio.md).


The association has been created and deployed.

**Parent topic:**[Content model tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

