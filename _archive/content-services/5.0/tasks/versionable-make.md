---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Making all content versionable

Edit the contentModel.xml file to enable versioning for all content in the repository.

1.  Download the [contentModel.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/model/contentModel.xml) file.

    If you are deploying a nightly build, you may prefer to extract the contentModel.xml file from the deployed alfresco.war file to ensure you have the correct version.

2.  Create a $TOMCAT\_HOME/shared/classes/alfresco/extension/models directory.

3.  In the contentModel.xml file, search for `<type name="cm:content">`, and immediately after the closing `</properties>` tag, insert the following lines to make the content versionable:

    ```
    <mandatory-aspects>       
        <aspect>cm:versionable</aspect>    
    </mandatory-aspects>
    ```

4.  Copy the edited contentModel.xml file to the $TOMCAT\_HOME/shared/classes/alfresco/extension/models directory.

5.  Add a Spring context file to $TOMCAT\_HOME/shared/classes/alfresco/extension with the following lines:

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    
    <beans>
        <bean parent="dictionaryModelBootstrap" depends-on="dictionaryBootstrap">
            <property name="models">
                <list>
                    <value>alfresco/extension/models/contentModel.xml</value>
                </list>
            </property>
        </bean>
    </beans>
    ```

6.  Save the file.

7.  Restart the Alfresco server.


Uploaded content will then have the `cm:versionable` aspect.

**Parent topic:**[About versioning](../concepts/versioning.md)

