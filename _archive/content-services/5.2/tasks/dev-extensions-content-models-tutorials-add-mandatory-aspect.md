---
author: Alfresco Documentation
---

# Adding mandatory aspect

In this tutorial you add a mandatory aspect to your model.

Complete the previous tutorials in this series before attempting this one.

You create a mandatory aspect and add it to your model. All content of the specified type \(and child types\) will have the mandatory aspect automatically applied when the content is created and added to the repository. The mandatory aspect you add is called `cm:generalClassifiable`.

1.  In your IDE, open the file aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/model/content-model.xml and load it into the editor.

2.  Find the type `my:doc` \(the parent custom type\). After the type's associations add the following mandatory aspect:

    <mandatory-aspects\> <aspect\>cm:generalclassifiable</aspect\> </mandatory-aspects\>

3.  You need to restart your SDK maven project using [run.sh](../concepts/alfresco-sdk-cmd-reference-aio.md) in order to pick up the modified model.

4.  Log back into Share and create a new piece of content. Add the type `Whitepaper` to the content.

5.  Once the type has been changed click **Manage Aspects**.

    You can see that the mandatory aspect, `Classifiable` has been applied by default.


You have seen how to add a mandatory aspect to your model.

**Parent topic:**[Content model tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

