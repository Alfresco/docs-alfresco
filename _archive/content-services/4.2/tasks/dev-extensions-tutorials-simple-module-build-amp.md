---
author: Alfresco Documentation
---

# Building the AMP file

In this task you will learn how to build the AMP file using the simple Ant script you created earlier in this tutorial. An AMP file is simply a Zip file that has an `.amp` file extension instead of a `.zip` extension, and whose contents is laid out in a particular structure \(as you have seen in the previous tasks\).

To create the AMP file you first need to build a Zip file containing the module contents, and with a file extension `.zip`. The resultant AMP file then needs to be located in the amps directory of the Alfresco installation. The relevant section of the Ant build script is:

```

                
﻿    <!-- Create AMP -->
  <target name="create-amp" depends="mkdirs" description="Creates the AMP file">
    <zip destfile="${dist.path}/${module.id}.amp" 
         basedir="./" 
         includes="**/*"
         excludes="${dist.path}, ${dist.path}/${module.id}, ${ant.file}, build*.xml"/>
  </target>

  <!-- Install AMP -->
  <target name="install-amp" depends="mkdirs, create-amp" description="Copy AMP file to amps directory">
    <copy file="${dist.path}/${module.id}.amp"
          todir="${amp.path}"/>
  </target>
              
            
```

There are two steps here:

1.  Create the Zip file.
2.  Copy the AMP to the amps directory of the Alfresco installation.

A copy of the AMP file into the amps directory is performed, rather than a move, for convenience, as it is handy to leave a copy of the AMP file in the dist directory, in case it needs to be reinstalled.

1.  To build the AMP file simply type `ant` in the project directory. This will run the default target. The default target will invoke the `mkdirs`, `create-amp` and `install-amp` targets.


You have now built the AMP file and located it in the target directory. However, you must now use the Module Management Tool to complete the installation of the AMP file.

**Parent topic:**[Creating a simple module with Ant](../tasks/dev-extensions-tutorials-simple-module.md)

