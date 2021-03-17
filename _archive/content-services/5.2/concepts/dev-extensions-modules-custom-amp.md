---
author: Alfresco Documentation
---

# Customizing the AMP to WAR mapping

A custom mapping from the AMP directory structure to the WAR file is sometimes useful, for example if you wish to use a non-standard module directory structure, or if you wish to map files into non-default locations in the target WAR. This custom mapping is achieved through use of the file-mapping.properties file.

The [default mappings](dev-extensions-modules-amp-mapping.md) are applied if the file-mapping.properties file is not provided.

This file has the same format as a standard Java properties file. The **key** is the directory \(with a leading '/'\) in the source AMP file, and the **value** is the directory \(also with a leading '/'\) in the target WAR file. The contents of each mapped path will be recursively copied into the target WAR when the MMT applies the AMP.

It is possible to control whether the default mappings are applied or not using the `include.default` property. The property is set to `true` by default. If it is set to `false` then the default mappings will not be applied. As custom mappings always take precendence over the default mappings it is possible to load the defaults and then override them on an individual basis.

If the source directory does not exist in the AMP file, then the mapping will be ignored; however, the destination directory in the target WAR file must exist or a runtime exception will be raised when the MMT attempts to install the AMP.

An example follows:

```

          
# Custom AMP to WAR location mappings

#
# The following property can be used to include the standard set of mappings.
# The contents of this file will override any defaults.  The default is
# 'true', i.e. the default mappings will be augmented or modified by values in
# this file.
#
include.default=false

#
# Custom mappings.  If 'include.default' is false, then this is the complete set.
#
/WEB-INF=/WEB-INF
/web=/          
          
        
```

**Parent topic:**[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-packaging-techniques-amps.md)

