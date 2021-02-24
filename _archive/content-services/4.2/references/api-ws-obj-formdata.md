---
author: Alfresco Documentation
---

# formdata

Encapsulates data submitted via a multipart form.

When `multipart/form-data` is posted to a web script, the Web Script Framework provides a special root object named `formdata` that allows access to the posted request through a simple API, hiding the complexities of parsing the request directly. The API provides access to each form field, including its name and value. For form fields of type `file`, the content of the uploaded file is also provided. To simplify even further, all fields other than those of type file are also added to the root objects `args` and `argsM`.

The `formdata` root object provides an API that allows direct access to form fields submitted through the `multipart/form-data` content type. The `formdata` object comprises a number of *formfields*.

## `formdata` API

`formdata` is the root object that represents the submitted form, which comprises one or more form fields.

The following API provides access to the form fields.

-   **`hasField(string fieldname)`**

    Returns a Boolean indicating the existence of the form field named `fieldname`.


-   **`fields`**

    \(Read-only\) An array of `formfield` objects where each entry represents a field within the form


## The `formfield` API

The `formfield` object represents a single field within the form, allowing access to the field metadata and content through the following API:

-   **`name`**

    \(Read-only string\) The name of the field as defined in the form. Note that form fields may not be uniquely named.


-   **`isFile`**

    \(Read-only Boolean\) Indicates whether the field is of type `file`.


-   **`value`**

    \(Read-only string\) The value of the field as entered into the form. Fields of type `file` return the file name. File content must be retrieved through content instead.


-   **`content`**

    \(Read-only `ScriptContent`\) The value of the field as entered into the form represented as a `ScriptContent` object.


-   **`mimetype`**

    \(Read-only string\) For form fields of type `file`, the MIME type of the content; otherwise, null.


-   **`filename`**

    \(Read-only string\) For form fields of type `file`, the file name of the uploaded file; otherwise, null.


**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

