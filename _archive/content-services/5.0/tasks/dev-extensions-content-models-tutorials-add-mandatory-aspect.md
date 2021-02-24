---
author: Alfresco Documentation
---

# Add mandatory aspect

In this tutorial you will add a mandatory aspect to your model.

This tutorial assumes you have completed the previous tutorials in this series.

You will see how to create a mandatory aspect and add it to your model. All content of the specified type \(and child types\) will have the mandatory aspect automatically applied when the content is created and added to the repository. The mandatory aspect you will add is called `cm:generalClassifiable`.

1.  In Eclipse, load customModel.xml into the editor.

2.  Find the type `my:doc` \(the parent custom type\). After the type's associations add the following mandatory aspect:

    <mandatory-aspects\> <aspect\>cm:generalclassifiable</aspect\> </mandatory-aspects\>

3.  Right-click the build.xml file in the Eclipse Package Explorer and select **Run As** \> **Ant Build** to build the JAR containing the model and deploy it.

4.  You will now need to restart Alfresco in order to pick up the modified model.

5.  Log back into Share and create a new piece of content. Add the type `Whitepaper` to the content.

6.  Once the type has been changed click **Manage Aspects**.

    You will see that the mandatory aspect, `Classifiable` has been applied by default.


You have seen how to add a mandatory aspect to your model.

**Parent topic:**[Content Model Tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

