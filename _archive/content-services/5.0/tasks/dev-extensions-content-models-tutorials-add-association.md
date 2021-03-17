---
author: Alfresco Documentation
---

# Add association

In this tutorial you will add an association to your model.

This tutorial assumes you have completed the previous tutorials in this series.

You will see how to create an association and add it to your model. An association is a logical link between content types, it is a way of connecting related content.

1.  In Eclipse, load customModel.xml into the editor.

2.  Change the MyCompany generic document type to the following code:

    <!-- Enterprise-wide generic document type --\> <type name="my:doc"\> <title\>MyCompany Generic Document</title\> <parent\>cm:content</parent\> <associations\> <association name="my:relatedDocuments"\> <title\>Related Documents</title\> <source\> <mandatory\>false</mandatory\> <many\>true</many\> </source\> <target\> <class\>my:doc</class\> <mandatory\>false</mandatory\> <many\>true</many\> </target\> </association\> </associations\> </type\>

3.  Right-click the build.xml file in the Eclipse Package Explorer and select **Run As** \> **Ant Build** to build the JAR containing the model and deploy it.

4.  You will now need to restart Alfresco.


The association has been created and deployed.

**Parent topic:**[Content Model Tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

