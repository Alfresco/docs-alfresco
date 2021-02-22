---
author: Alfresco Documentation
---

# Modifying Out-of-the-box Surf Web Scripts

Most of the Share UI functionality can be traced back to a Web Script in one place or another. Sometimes it is useful to be able to override the controller or template of one of these Out-of-the-box \(OOTB\) Web Scripts.

|Extension Point|Modifying Out-of-the-box Surf Web Scripts|
|---------------|-----------------------------------------|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|Out-of-the-box Surf Web Scripts can be overridden by putting the modified files under alfresco/web-extension/site-webscripts/org/alfresco/... directory. Let's say you wanted to add code to display some custom types in the Upload Dialog. So an end user could select type for the file that he or she is uploading. We got the following type that we want to be available:

 ```
<type name="mc:itDocument">
    <title>My Company IT Document</title>
    <parent>cm:content</parent>
</type>                          
```

 This can be done by overriding an OOTB Web Script called Flash Upload that is contained in the flash-upload.get.\* files. These files are located in the tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/upload/ directory. We need to override the controller file \(flash-upload.get.js\) to do what we want.

 Update the controller to look like this:

 ```
/**
 * Custom content types
 */
function getContentTypes()
{
   // TODO: Data webscript call to return list of available types
   var contentTypes = [
   {
      id: "cm:content",
      value: "cm_content"
   },
**   \{
      id: "mc:itDocument",
      value: "type.mc\_itDocument"
   \}
**];

   return contentTypes;
}

model.contentTypes = getContentTypes();

function main()
{
   // Widget instantiation metadata...
   var flashUpload = {
      id : "FlashUpload", 
      name : "Alfresco.FlashUpload"
   };
   model.widgets = [flashUpload];
}
```

 Now we just need to put this new controller file here: alfresco/web-extension/site-webscripts/org/alfresco/components/upload/flash-upload.get.js for it to override the original one.

 To try out this example you will need to first enable Flash Upload, in tomcat/conf/context.xml update to:

 ```
<Context useHttpOnly="false">       
```

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-webscripts/org/alfresco \(Untouched by re-depolyments and upgrades\)

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|-   share-amp/src/main/amp/config/alfresco/web-extension/site-webscripts/org/alfresco - Modified web script files

|
|More Information|-   [Surf Web Scripts](dev-extensions-share-surf-web-scripts.md)

|
|Tutorials||
|Alfresco Developer Blogs||

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

