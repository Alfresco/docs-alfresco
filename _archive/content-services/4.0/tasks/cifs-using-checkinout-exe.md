---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Check out files from outside Alfresco

You can use the CheckInOut.exe to check content out so that you can work on it securely.

**Note:** The CheckInOut.exe is available in a Windows environment if the Alfresco repository has been mapped by your administrator so that you can access it from Windows Explorer.

1.  In Windows Explorer, drag a file from the mapped Alfresco repository onto the CheckInOut.exe icon.

    **Note:** There is a copy of the CheckInOut.exe at each level of the repository.

2.  Click **OK** when the Run check in/out action dialog box displays.

3.  Click **OK** when a message displays that the file has been checked out.

    A copy of your file is created in the same location as the original file with \(Working Copy\) appended to the title. The original file is now locked, so you can work on the \(Working Copy\) file and other users cannot edit it until you check it back in.

4.  When you have finished working on the file and saved your changes, drag the \(Working Copy\) file onto the CheckInOut.exe icon.

5.  Click **OK** when the Run check in/out action dialog box displays.

    The \(Working Copy\) file is removed and any updates made while it was checked out are applied to the original file.


**Parent topic:**[Using Alfresco outside of the Alfresco interface](../concepts/cifs-outside-interface-intro.md)

