---
author: Alfresco Documentation
---

# The Browser binding

In addition to the existing XML-based AtomPub and Web services bindings, CMIS 1.1 provides a simpler JSON-based binding. The browser binding is designed for web applications and is easy to use just with HTML and JavaScript. It uses just two verbs, GET and POST, and resources are referenced using simple and predictable URLs.

You reference content in the repository by using the two URLs returned by the `getRepositories` or `getRepositoryInfo` service:

```
rootFolderUrl
repositoryUrl
```

Objects can then be referenced in two ways:

1.  by their ID

    ```
    
    <rootFolderUrl>?objectId=<objectId>
    
    ```

2.  by their path

    ```
    
    <rootFolderUrl>/<object path>
    
    ```


Content that is independent of a folder, for example a Type definition be accessed using the repositoryUrl service.

```

<repositoryUrl>?cmisselector=<selector>
```

-   **[Getting content](../../../pra/1/concepts/cmis-1.1-browser-binding-get.md)**  
You use the HTTP GET command with parameters to retrieve content from a repository.
-   **[Creating content](../../../pra/1/concepts/cmis-1.1-browser-binding-post.md)**  
You use the HTTP POST command to create, update, and delete content from a repository. In an application a user would use an HTML form in a browser.
-   **[Compact JSON return values](../../../pra/1/concepts/cmis-1.1-browser-binding-succint.md)**  
 The JSON returned on a browser binding call includes type and property definitions, which can be quite large. Your application might not need this information. You can use `succinct` to produce more compact responses. `succinct` is expressed as a parameter on HTTP GET calls and as a control on HTTP POST calls.

**Parent topic:**[CMIS 1.1](../../../pra/1/concepts/cmis-1.1-intro.md)

