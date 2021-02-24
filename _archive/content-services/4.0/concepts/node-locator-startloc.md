---
author: Alfresco Documentation
---

# NodeLocator service startLocation

The main use of the `NodeLocatorService` is to determine where the forms association control should start when it is first displayed. In some scenarios, the picker may need to start in the root of the document library of a Share site or start in the folder where the node being edit is located.

`NodeLocators` are configured using form control parameters. The name of the `NodeLocator` implementation is provided as the `startLocation` parameter and the parameters are provided by a `startLocationParameters` parameter. They should be provided in the form of query string parameters, that is, `name=value&name=value`.

The configuration for the example node locator is shown as follows.

```
<field id="my:association">
   <control>
      <control-param name="startLocation"gt{namedfolder}</control-param>
      <control-param name="startLocationParams"gtname=Example</control-param>
   </control>
</field>
```

It looks for a folder named `Example` in the same folder as the node being edited.

**Note:** The curly braces are required around the node locator name.

**Parent topic:**[NodeLocator service](../concepts/node-locator-intro.md)

