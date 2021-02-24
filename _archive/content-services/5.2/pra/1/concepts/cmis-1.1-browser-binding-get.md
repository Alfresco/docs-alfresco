---
author: Alfresco Documentation
---

# Getting content

You use the HTTP GET command with parameters to retrieve content from a repository.

Use the `cmisselector` parameter to define which content you want returned on a resource. For example if you want the children of an object:

```
cmisselector=children 
```

The URL to get all of the children of the root/test node in the repository looks like this:

```

http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root/test?cmisselector=children

```

All content will be returned as JSON by default.

## returning JSONP

In some cases you might want to request data from a server in a different domain, this is normally prohibited by web browsers due to their [same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy). CMIS 1.1 uses the `callback` parameter to return [JSONP](http://en.wikipedia.org/wiki/JSONP). This format also known as JSON with padding returns JavaScript code. It is evaluated by the JavaScript interpreter, not parsed by a JSON parser. You use the `callback` parameter to provide a JavaScript function to cope with the returned JSONP. For example the following function would write repository information into an HTML page:

```
  <script type="text/javascript"> 
  function showRepositoryInfo(repositoryInfo) { 
  for(repId in repositoryInfo) {
  var ri = repositoryInfo [repId];   
  document.write("<h1>Information</h1>"); 
  document.write("<ul>");  
  document.write("<li>ID..."
  + ri.repositoryID+"</li>"); 
  document.write("<li>Name..."
  + ri.productName+"</li>");
  document.write("<li>Description..."
  + ri.productVersion);
  document.write("</li>"); 
  document.write("</ul>"); 
  }
} 
 
```

The following function would invoke the CMIS URL GET with the callback function `showRepositoryInfo`.

```
  <script type="text/javascript" 
src="/alfresco/api/-default-/public/cmis/versions/1.1/browser?callback=showRepositoryInfo">
</script>
 
```

The JSONP returned would look like this:

```
  showRepositoryInfo (
{"-default-":{ 
”vendorName":”Alfresco",
”productName" : ”Alfresco Enterprise”,
"productVersion": "4.2.0 (r56201)“
  }
 }
)

 
```

**Parent topic:**[The Browser binding](../../../pra/1/concepts/cmis-1.1-browser-binding.md)

