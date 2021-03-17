# Document Merge Bean \(`documentMergeBean`\)

The `documentMergeBean` can be used to merge the content of multiple documents \(files of type .doc or.docx\) from a process into a single document which will be become the value of a provided process variable. The file name of the new document will be set to the file name of the first field in the list followed by the string "\_merged" and the suffix from the same field.

In the following example, the content of *myFirstField* and *mySecondField* will be merged into a new document with the field ID set to *myFirstField* and the filename set to:

`<filename-from-myFirstField>_merged.<filenameSuffix-from-myFirstFields>`

The new document will become the value of a process variable named *myProcessVariable*.

`${documentMergeBean.mergeDocuments(*myFirstField;mySecondField*, *myProcessVariable*, execution)}`

**Parent topic:**[Default Spring Beans](../topics/default_spring_beans.md)

