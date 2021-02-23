---
author: Alfresco Documentation
---

# ScriptContentData API

The ScriptContentData API provides several methods and properties related to node properties of type `d:content` \(for example, `document.properties.content`\).

## Properties

-   **content**

    A read/write value that represents the content as a string

-   **mimetype**

    Guess and apply the MIME type to the content based on the file name

-   **encoding**

    A read/write string value that represents the encoding of the content

-   **size**

    A read-only long value that represents the size \(in bytes\) of the content

-   **url**

    A read-only string representing the download URL for the content

-   **downloadUrl**

    A read-only string representing the download \(as attachment\) URL for the content


-   **[write](../references/API-JS-write.md)**  
`write(content)` this method copies the content from the specified `ScriptContent`.
-   **[guessMimetype](../references/API-JS-guessMimetype.md)**  
`guessMimetype(filename)` this method guesses and applies the MIME type to the content based on the given file name.
-   **[guessEncoding](../references/API-JS-guessEncoding.md)**  
`guessEncoding()` this method guesses and applies the encoding to the content based on the current content. It uses the ContentCharsetFinder service.
-   **[getInputStream](../references/API-JS-getInputStream.md)**  
`getInputStream()` returns the input stream for the underlying ScriptContentData object.
-   **[getReader](../references/API-JS-getReader.md)**  
`getReader()` returns the reader for the input stream of the underlying ScriptContentData object.

**Parent topic:**[ScriptNode API](../references/API-JS-ScriptNode.md)

