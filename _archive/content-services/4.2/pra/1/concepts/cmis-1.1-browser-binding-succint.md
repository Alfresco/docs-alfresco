---
author: Alfresco Documentation
---

# Compact JSON return values

The JSON returned on a browser binding call includes type and property definitions, which can be quite large. Your application may not need this information. You can use `succinct` to produce more compact responses. `succinct` is expressed as a parameter on HTTP GET calls and as a control on HTTP POST calls.

In the following example the `succint` parameter is used on an HTTP GET call to retrieve information on some children of the Presentations folder in the test site. Specifying `succint` reduces the size of the returned JSON significantly.

```

http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root/sites/test/documentLibrary/Presentations?cmisselector=children&succinct=true

```

**Parent topic:**[The Browser Binding](../../../pra/1/concepts/cmis-1.1-browser-binding.md)

