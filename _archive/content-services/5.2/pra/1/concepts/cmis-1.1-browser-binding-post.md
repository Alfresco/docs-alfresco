---
author: Alfresco Documentation
---

# Creating content

You use the HTTP POST command to create, update, and delete content from a repository. In an application a user would use an HTML form in a browser.

You use the `cmisaction` element to control the action. So for example to create a document you would set `cmisaction=createDocument`.

You define other CMIS properties as form elements for example: `propertyId[0]… propertyValue[0]`.

You define the content stream for a create or an update using the `file` input form element:

```
<input id="content” type="file”

```

The form shows an example of a document create command:

```
<form id="cd1" action="http://localhost:8080/alfresco/api/…" method="post">
  <table>
  <tr>
  <td><label for="name">Name:</label></td>
  <td><input name="propertyValue[0]" type="text" id="name”/></td>
  <td><input id="content" name="Browse" type="file" height="70px" size="50"/></td>
  </tr>
  </table>
  <input id="cd" type="submit" value="Create Document"/></td>
  <input name="propertyId[0]" type="hidden" value="cmis:name" />
  <input name="propertyId[1]" type="hidden" value="cmis:objectTypeId" />
  <input name="propertyValue[1]" type="hidden" type="text" id="typeId" value="cmis:document"/> </td>
  <input name="cmisaction" type="hidden" value="createDocument" />
  </form>
```

The form action URL is more specifically put together as follows. To create the document directly under /Company Home use:

```
<form id="cd1" action="http://localhost:8080/alfresco/api/browser/root" method="post">
```

And to store the document in a specific folder specify the folder path as the display path leaving out /Company Home:

```
<form id="cd1" action="http://localhost:8080/alfresco/api/browser/root/MyFolder" method="post">
```

**Parent topic:**[The Browser binding](../../../pra/1/concepts/cmis-1.1-browser-binding.md)

