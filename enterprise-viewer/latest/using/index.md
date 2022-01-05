---
title: Using Enterprise Viewer
---

This section details everything that a user needs to know in order to take complete advantage of the Enterprise Viewer 
application.

## Mode Dropdown
The Enterprise Viewer has four modes: 

* Add Annotations 
* Redact Content 
* Edit Pages
* Add Signature. 
      
Users can be launched directly into any of these modes. By default, a document is launched into annotation mode. The 
mode dropdown can also be disabled:

![Img Txt]({% link enterprise-viewer/images/aev-mode-dropdown.png %})
![Img Txt]({% link enterprise-viewer/images/aev-mode-dropdown2.png %})

### Add Annotations
Add Annotations mode allows the user to annotate the document. More information on this mode can be found in 
[Section 4](TODO #Section_4) of this guide.

### Redact Content
Redact Content mode allows the user to redact text and images in the document. More information on this mode can be 
found in [Section 5](TODO #Section_5) of this guide.

### Edit Pages
Edit Pages mode allows the user to edit pages by reordering, splitting, rotating, or sectioning them. More information 
on this mode can be found in [Section 6](TODO #Section_6) of this guide.

### Add Signatures
Add Signatures mode allows the user to add a signature to the document. More information on this mode can be found in 
[Section 7](TODO #Section_7) of this guide.

## Add Annotations Interface
This section walks through the interface used to add annotations .

### Toolbar
The toolbar contains all the core functionality of the Enterprise Viewer in Annotation mode. This is where document 
navigation and zooming occur, and where annotations can be created, saved, and more information on Enterprise Viewer is 
found.

It is located at the top of the Enterprise Viewer window:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})

Dark grey buttons cannot be used until certain actions are made. A button that is in use will have a blue interior.

#### Manual Page Navigation
If the page number entered is not a number, this value gets reset to the current page. If the page number entered is 
lower than the first page, the user is navigated to the first page. If the page number entered is higher than the last 
page, the user is navigated to the last page.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar2.png %}) 

Manually entering a value into this text field and then hitting the Enter key will navigate to the new page number.

This text field is located to the right of the Enterprise Viewer logo and to the left of the **Fit to Height** button.

#### Total Number of Pages
This is a non-editable field denoting the total number of pages for the document.

#### Fit to Height
The **Fit to Height** button is located to the right of the Manual Page Navigation text field and to the left of the 
**Fit to Width** button.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar3.png %}) 

Clicking this button automatically calculates the zoom level to make the window show the entire height of the document. 
This does not take into account the width of the document, and thus scroll bars may appear horizontally depending on the 
page's aspect ratio against the size of the window.

#### Fit to Width
The **Fit to Width** button is located to the right of the **Fit to Height** button and to the left of the **Next Page** 
button. The **Fit to Width** button is to the left of the **Zoom Out** button if the **Next Page** button is not 
displayed in the toolbar:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar4.png %}) 

Clicking this button automatically calculates the zoom level to make the window show the entire width of the document. 
This does not take into account the height of the document, and thus scroll bars may appear vertically depending on the 
page's aspect ratio against the size of the window.

#### Next Page
The **Next Page** button is located to the right of the **Fit to Width** button and to the left of the **Previous Page** 
button.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar5.png %})

Clicking this button takes the user to the next page of the document. The button will become disabled once the user 
reaches the end of the document.

>**Note:** This feature is unavailable if the document does not have more than one page.

#### Previous Page
The **Previous Page** button is located to the right of the **Next Page** button and to the left of the **Zoom Out** button.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar6.png %}) 

Clicking this button takes the user to the previous page of the document. The button will become disabled once the 
user reaches the beginning of the document.

>**Note:** This feature is unavailable if the document does not have more than one page.

#### Zoom Out
The **Zoom Out** button is located to the right of the **Previous Page** button and to the left of the **Zoom In** button. The
**Zoom Out** button is to the right of the **Fit to Width** button if the **Previous Page** button is not displayed in the toolbar.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar7.png %})

Clicking this button zooms out in increments of ten. While zooming out, if possible, the current middle of the page 
will remain in the middle (unless zooming out reveals an image that does not need to be scrolled).

If the target zoom level is below the minimum zoom level, the zoom is set to the minimum zoom level. This is set for 
performance and usability reasons.

#### Zoom In
The **Zoom In** button is located to the right of the **Zoom Out** button and to the left of the Download dropdown.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar8.png %}) 

Clicking this button zooms in using increments of ten. While zooming in, the current middle of the page will remain in 
the middle.

If the target zoom level is above the maximum zoom level, the zoom is set to the maximum zoom level. This is set for 
performance and usability reasons.

#### Download Dropdown
Provides various options related to downloading, checking in, or checking out documents:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar9.png %})

##### Annotated PDF Download
Clicking the following button downloads the document to be used for annotating documents offline. All annotations other than the 
current users will be locked in the downloaded PDF:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar10.png %})

##### Checkin Annotated PDF
Clicking the following button will allow the user to check-in a document that has been checked out for offline use. This will 
update the online annotations with any differences present in the offline copy. The annotations in the repository will 
match the annotations from the offline copy following check in, regardless of any changes made in the repository between 
the annotated pdf download and checking in the document:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar11.png %})

Attempting to check in a PDF not downloaded via the "Offline Annotated PDF Download" action, or a PDF 
downloaded from a different document will fail.

##### Print Annotated PDF
Clicking the following button will print a version of the PDF with annotations. This is unrelated to checking in and 
checking out documents:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar12.png %})

##### Extract Pages
Clicking the following button will allow the user to choose which pages to download. The user can type in the selected pages or 
select them by clicking the box in the top left corner of each page. The user must then select split PDF which will 
download the user's selected pages:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar13.png %})

>**Note:** This feature is unavailable if the document does not have more than one page.

##### Annotated PDF Download
Similar to Offline Annotated PDF Download, but this is not meant for annotating documents offline and checking them back 
in. This is simply for downloading. Other users' annotations will not be locked:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar14.png %})

##### Download Original
Clicking the following button will download a version of the PDF without annotations, only the base document:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar15.png %})

#### Save
Clicking the following button will save any new or modified annotations to the server, as well as refresh any unmodified 
annotations from other users that have been updated:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar16.png %})

The **Save** button is located to the right of the **Download** dropdown and to the left of the **Undo** button.

#### Undo Last Change
Clicking the following button will undo the last modification that was made to the document prior to the last save of 
the document:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar17.png %})

The **Undo** button is located to the right of the **Save** button and to the left of the **Redo** button.

#### Redo Last Change
Clicking the following button will redo the last change made to the document prior to the last save of the document:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar18.png %})

The **Redo** button is located to the right of the **Undo** button and to the left of the **Refresh** button. The **Redo** 
button is to the left of the **Show/Hide Annotations** button if the **Refresh** button is not displayed in the toolbar.

#### Refresh Annotations
Clicking the following button will refresh any unmodified annotations from the server from other users that have been 
updated:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar19.png %})

The **Refresh Annotations** button is located to the right of the **Redo** button and to the left of **Show/Hide Annotations** button.

>**Note:** This feature will not appear if "Collaboration Mode" is active, as annotation refreshes will happen in real-time.

#### Show/Hide Annotations
Clicking the following button will show or hide the annotations made to the document. If the button is active the annotations can 
be seen. Annotations cannot be seen if the button is deactivated:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar20.png %})

The **Show/Hide Annotations** button is located to the right of the **Refresh Annotations** button and to the left of 
the **Keep Tool Selected** button. The **Show/Hide Annotations** button is to the right of the **Redo** button if the
**Refresh Annotations button** is not displayed in the toolbar.

#### Keep Tool Selected
Clicking the following button will keep the currently selected annotation tool selected. This allows users to be able to 
make multiple annotations of the same type without having to select their chosen tool multiple times:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar21.png %})

The **Keep Tool Selected** button is located to the right of the **Show/Hide Annotations** button and to the left of 
the **Selection Tool** button.

#### Annotation Tools
The buttons listed below denote the different types of interactions the user can have with the document itself, as 
opposed to single events of the previous toolbar items. The selections will persist until another selection is made, 
or they are unselected due to a particular event:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar22.png %})

All of the annotation tools can be used for clicking a toolbar button, dragging annotations around a page, dragging and 
resizing annotation dialogs. The user can also set the status of the annotation to None, Accepted, Cancelled, Completed, 
or Rejected. If the user does not set the status of the annotation, then it is set to None by default.

After an annotation is created, the annotation tool returns to its default cursor.

##### Selection Tool
The selection tool button is the default cursor when opening Enterprise Viewer and signifies that the mouse does not 
do anything out of the ordinary:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar23.png %})

The **Selection Tool** button is located to the right of the **Keep Tool Selected** button and to the left of the 
**Sticky Note** button.

##### Sticky Note
The sticky note button is used when a sticky note needs to be added to a page. Once the cursor is selected, the user 
can click anywhere on the page to add a sticky note. The sticky note will set its top left corner to where the user 
clicked, and an annotation dialog will pop up to allow the user to edit the text. The user can also use the Color 
Selection menu to change the color of the sticky note annotation:

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar24.png %})

The **Sticky Note** button is located to the right of the **Selection Tool** button and to the left of the 
**Add Attachment** button.

##### 4.1.16.3 **Add Attachment**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1255b06110fbf3f0.png) he add attachment button is used when a file needs to be attached to a page. Once the cursor is selected, the user can click anywhere on the page to add an attachment annotation. The attachment will set its top left corner to where the user clicked, and an annotation dialog will pop up to allow the user to edit the text. The user can also use the Color Selection menu to change the color of the attachment annotation.

The Add Attachment button is located to the right of the Sticky Note button and to the left of the Text Select dropdown.

###### 4.1.16.3.1**D ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})8061450604500509.png) ownloading Attachment**

Once an attachment annotation is added to the page, a user can download the file by simply clicking the Download Attachment button in the dialog box of the annotation.

#### 4.1.17T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})d46074e25075cc43.gif) ext Select Dropdown

The Text Select dropdown includes all of the available text select annotations. These include Select Text, Highlight, Strikeout, Insert Text, Underline, and Replace Text. The user can select one or more lines of text from any section to make an annotation from this group. The dialog box will appear from the top left corner of all the annotations in this group except for select text. The select text annotation allows a user to copy their selection of text in order to paste it into another application.

The Text Select dropdown is located to the right of the Add Attachment button and to the left of the Color selection box.

##### 4.1.17.1 **Select Text**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})51f1de2012f91c7e.png) he Select Text button is used when text on the page needs to be selected to copy it. Once the cursor is selected, the user can click on the text they wish to select. The user can then drag the mouse over the text to select it until the mouse is released.

The Select Text button is located in the Text Select dropdown above the Highlight button.

##### 4.1.17.2 **Highlight**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b19bcf0891fa0b3c.png) he highlight button is used when text needs to be highlighted on the page. Once the cursor is selected, the user can click on the text they wish to highlight. The user then can drag the mouse over the text to highlight it until the mouse is released.

The Highlight button is located in the Text Select dropdown below the Select Text button and above the Strikeout button.

##### 4.1.17.3 **Strikeout**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a66d06fab67a0124.png) he strikeout button is used to strikethrough text on the page. Once the cursor is selected, the user can click on the beginning point of the text they wish to strikeout. The user can then drag the mouse over the text striking it out until the mouse is released.

The Strikeout button is located in the Text Select dropdown below the Highlight button and above the Insert Text button.

##### **4.1.17.4Insert Text**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cacaa32b58295b73.png) he insert text at placeholder button is used to add text to the document in an annotation dialog box. Once the cursor is selected, the user can click on any text to add a placeholder. The placeholder will set its top left corner to where the user clicked.

The Insert Text button is located in the Text Select dropdown below the Strikeout button and above the Underline button.

##### 4.1.17.5 **Underline**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})33b50bb663bb710c.png) he underline button is used to underline text on the page. Once the cursor is selected, the user can click on the beginning point of the text they wish to underline. The user can then drag the mouse over the text underlining it until the mouse is released.

The Underline button is located in the Text Select dropdown below the Insert Text button and above the Replace Text button.

##### 4.1.17.6 **Replace Text**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})8ad352578933254c.png) he replace text button is used to replace text in the document in an annotation dialog box. Once the cursor is selected, the user can click on any text to add a placeholder. The placeholder will set its top left corner to where the user clicked.

The Replace Text is located in the Text Select dropdown below the Underline button.

#### 4.1.18Color

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})25211b46a963e60c.png) licking this button will open a box displaying the available colors the user can choose. The user can select a color to change the color of the annotation when using the line, arrow, ellipse, rectangle, free draw, highlight, strikeout, or insert text as placeholder buttons. Once the desired tool is selected, the user can then select a new color that will appear on the page when the tool is used. Only one color can be chosen at a time. The annotation tools each have their own default color, which will appear when the user selects a new tool and a color has not been chosen yet.

The Color selection box is located to the right of the Text Select dropdown and to the left of the Drawing Tools dropdown.

##### 4.1.18.1 **Set Default Color**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})3f02b6b6fc5a4eb8.png) he user can set the default color by choosing a color, then clicking the Set Default button. The user will be prompted by a popup window asking whether they want to set the selected color as the default color. Setting the default color in the picker specifies the color that will be set on page load and used for all types of annotations. This value is saved in regards to the browser it was saved on.

The Set Default button is located in the Color dropdown above the Reset button.

##### 4.1.18.2 **Reset Color**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})73a11a6617530026.png) he user can reset the default color by clicking the Reset button. The user will be prompted by a popup window asking whether they want to reset the default color. Doing this will default the color back to red.

The Reset button is located in the Color dropdown below the Set Default button.

#### 4.1.19Drawing Tools Dropdown

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cca013824c932dc4.png) he Drawing Tools dropdown includes all of the available drawing annotations. These include Line, Arrow, Ellipse, Rectangle, Text Box, and Free Draw. The drawing annotation tools are drawn from where the user clicks on the page to where the user's mouse is when unclicking. If the mouse has not been dragged far enough from the starting point, the annotation will not be drawn, and the selected annotation tool will not be changed. Additionally, all drawing annotations can be resized by clicking on them to highlight them and dragging them. An annotation dialog will pop up to allow the user to edit the text. Clicking on drawing objects will also open a dialog for notes.

The Drawing Tools dropdown is located to the right of the Color selection box and to the left of the Stamps dropdown.

##### **4.1.19.1Line**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})ab0ba9f7676b00a.png) he line button is used when a line needs to be added to a page. Once the cursor is selected, the user can click anywhere on the page to start the line. The user can then drag the mouse anywhere else on the page to put the other end point of the line. A line will be drawn from one point to the other.

The Draw Line button is located in the Drawing Tools dropdown above the Draw Arrow button.

##### 4.1.19.2 **Arrow**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})18d0b5681bd3069b.png) he arrow button is used when an arrow needs to be added to a page. Once the cursor is selected, the user can click anywhere on the page to start the arrow. The user can then drag the mouse anywhere else on the page to put the tip of the arrow. An arrow will be drawn from one point to the other. The arrow will point to the second point. Dialog boxes will be anchored at the beginning of the arrow.

The Draw Arrow button is located in the Drawing Tools dropdown below the Draw Line button and above the Draw Ellipse button.

##### 4.1.19.3 **Ellipse**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})fdeb67edb34ed788.png) he ellipse button is used when an ellipse needs to be added to a page. Once the cursor is selected, the user can click anywhere on the page to start the rectangle that will contain the ellipse. The user can then drag the mouse anywhere else on the page to put the other end point of the rectangle containing the ellipse. An ellipse will be drawn within the two points so that the top is the highest point in the rectangle containing it, the bottom is the lowest point, and the sides are the two widest points. Dialog boxes will be anchored in the center of the ellipse.

The Draw Ellipse button is located in the Drawing Tools dropdown below the Draw Arrow button and above the Draw Rectangle button.

##### **4.1.19.4Rectangle**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})60e8c61e7452221f.png) he rectangle button is used when a rectangle needs to be added to a page. Once the cursor is selected, the user can click anywhere on the page to start the rectangle. The user can then drag the mouse anywhere else on the page to put the other corner of the rectangle. A rectangle will be drawn from one point to the other. Dialog boxes are anchored in the beginning of the rectangle.

The Draw Rectangle button is located in the Drawing Tools dropdown below the Draw Ellipse button.

##### **4.1.19.5Text Box**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})3afde382ff0c235f.png) he text box button is used to add a text box to the document. Once the cursor is selected, the user can click anywhere on the page to start the text box. The user can then drag the mouse anywhere else on the page to put the other corner of the text box. A text box will be drawn from one point to the other. The user can use the comments section in the dialog box to add their text.

The Text Box button is located in the Drawing Tools dropdown below the Draw Rectangle button and above the Free Draw button.

##### 4.1.19.6 **Free Draw**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b4ac484040995fbf.png) he free draw button is used for free hand drawing on the document. Once the cursor is selected, the user can click anywhere on the page to start the free draw. The user can then drag the mouse anywhere else on the page until the drawing is complete. Dialog boxes are anchored to the top left corner of the drawing.

The Free Draw button is located in the Drawing Tools dropdown below the Text Box button.

#### 4.1.20Stamp Tools Dropdown

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})ca319f5b448fa8f8.gif)The Stamps dropdown includes all of the available stamp annotations. These include Approved, Reviewed, Accepted, Rejected, and Checkmark. When one of these stamps are selected, a preview will appear on the document that will allow the user to see how the stamp will look when it is placed on the document. The dialog box will appear from the top left corner of the stamp annotation and will appear every time the annotation is selected.

The Stamps dropdown is located to the right of the Drawing Tools dropdown and to the left of the Help button.

##### **4.1.20.1Approved Stamp**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})fb4fc1f4cd1656d5.png) he approved stamp is used when an approved stamp needs to be added to a page. Once the approved stamp button is clicked, a preview of the stamp will appear on the document to allow the user to see what the stamp annotation will look like before it is placed on the document.

The Approved Stamp is located in the Stamps Dropdown menu above the Reviewed Stamp button.

##### 4.1.20.2 **Reviewed**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})88f556bbf1f259ab.png) he reviewed stamp is used when a reviewed stamp needs to be added to a page. Once the reviewed stamp button is clicked, a preview of the stamp will appear on the document to allow the user to see what the

stamp annotation will look like before it is placed on the document.

The Reviewed Stamp button is located in the Stamps dropdown below the Approved Stamp and the Accepted Stamp button.

##### 4.1.20.3 **Accepted Stamp**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})91939e7295238d6d.png) he accepted stamp is used when an accepted stamp needs to be added to a page. Once the accepted stamp button is clicked, a preview of the stamp will appear on the document to allow the user to see what the stamp annotation will look like before it is placed on the document.

The Accepted Stamp button is located in the Stamps Dropdown menu below the Reviewed Stamp button and above the Rejected Stamp button.

##### **4.1.20.4Rejected Stamp**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a602063380cebe70.png) he rejected stamp is used when a rejected stamp needs to be added to a page. Once the rejected stamp button is clicked, a preview of the stamp will appear on the document to allow the user to see what the stamp annotation will look like before it is placed on the document.

The Rejected Stamp button is located in the Stamps dropdown below the Accepted Stamp button and above the Checkmark stamp button.

##### 4.1.20.5 **Checkmark Stamp**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})bd4ec6182eb5619c.png) he checkmark stamp is used when a checkmark stamp needs to be added to a page. Once the checkmark stamp button is clicked, a preview of the stamp will appear on the document to allow the user to see what the stamp annotation will look like before it is placed on the document.

The Checkmark Stamp button is located in the Stamps dropdown below the Rejected Stamp button.

#### 4.1.21Help

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1b09fc8fbf563d74.png) he help button is used to give the user more information regarding Enterprise Viewer. When this button is clicked a new tab in the browser will open with Technology Services Group information regarding their services and description of Enterprise Viewer.

The Help button is located to the right of the Stamp Tools dropdown and to the left of the Active Users box.

#### 4.1.22Active Users

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})49bf88ae7c887bc8.png) he active users box shows the user how many users are currently viewing the current document. Clicking this button will change the tab in the sidebar to the

Participants tab.

The Active Users box is located to the right of the Help button and to the left of the Load Time.

>**Note:** The Active Users box is only displayed if "Collaboration Mode" is active.

#### 4.1.23L ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})26834eaf0ef5a93b.png) ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})88a97498f63e41b1.png) oad Time

The load time shows the user how many seconds it took to load the document. The user can see more details when clicking on the text. The load time takes into consideration the time it took the user to login, the browser JavaScript load time, the time it took to retrieve document information, the time it took to display the document, and the document's size. The user can copy the load time information into their clipboard by clicking the Copy to Clipboard button found in the load time information window.

The Load Time text is located to the right of the Active Users box.

### 4.2Right Sidebar

The sidebar displays the annotation summary and search tabs. It is to the right of the document and below the toolbar.

#### 4.2.1Hide Sidebar

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})30357ba6faa8b7c8.png) he hide sidebar button allows the user to hide or show the sidebar depending upon the current state of the view. By default, the sidebar is in view. When clicked the sidebar will be hidden from the display. When the sidebar is not in view, the button can be clicked to show the sidebar and the sidebar will reappear in its default position.

This button is located in the upper right corner of the sidebar.

#### 4.2.2Annotation Summary

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})f28c524be8e7c160.png) ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b6fab7e3eb1da78a.png)

The annotation summary tab is used to show the summaries of the annotations that have been made in the document. The user can export the summary to excel, print the summary, filter through the annotations, and view the summaries in this tab.

##### 4.2.2.1 **Export Summary to Excel**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})622b80583368f2d1.png) his button is used to export the summaries to excel. When clicked a message will appear stating that the excel sheet is being downloaded and the user can continue to annotate the document. The excel sheet will display the annotation summaries in a table format. It will include but is not limited to the title of the document, creation date, page, author, type, status, and comments.

This button is located near the top of the Annotation Summary tab, to the right of the Annotation Summary title, and to the left of the Printable Summary button.

##### 4.2.2.2 **Printable Summary**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e01d1ce417b90336.png) his button is used to print the annotation summaries. When clicked a new window will open displaying all of the annotation summaries in a table format. It will display the object name, title, creation date, page, author, type, comment, status, and replies if any. The user can print the page by selecting the window and clicking Ctrl + P or in a form of the user's choosing.

This button is located near the top right corner of the Annotation Summary tab and to the right of the Export Summary to Excel button.

##### 4.2.2.3 **Filter Text Box**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})f19eae6e66d36699.png) he filter text box allows the user to sort through the annotation summaries efficiently. When the user types in the text box, the annotation summary boxes will be sorted. The annotation summary boxes with text matching the user's input will appear below the filter search box. The filter field will filter on the:

- Username of the annotation creator
- Contents of the annotation comment
- Date of the comment
- Page Number
- Annotation type (ex: Highlight, Cross-Out, Sticky Note)

This text box is located at the top of the Annotation Summary tab below the Export Summary to Excel and Printable Summary buttons.

##### **4.2.2.4Filters**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})d67780d5188e8760.png) he filters button allows the user to filter through the annotation summary boxes based upon the status and author. When clicked, a checkbox list will appear displaying status, author(s), and type options for user to select. Multiple statuses, authors and/or types can be selected. The filters box can be used with the filter text box.

This button is located on the immediate right of the filter text box.

##### 4.2.2.5 **Clear Filters**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})df1a1ca084686bde.png) he clear filters button is used to clear all filters from the filter text box and the filters button. When clicked, the text in the filters text box will be cleared as well as the selections made in the filters list. The clear filters button will appear to the right of the filter text box when there is text in the filter text box or when a selection is made in the filters list.

##### 4.2.2.6 **Annotation Summary Boxes**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e1083ae684f1b35d.png) he annotation summary boxes appear in the sidebar below the filter text box. They are used to display information regarding each annotation. Each annotation will have one corresponding annotation summary box. An annotation summary box will display the author of the annotation, the date the annotation was created, the page the annotation was made on, the type of annotation, and the status of the annotation. If the status is set to none the status will not be displayed on the annotation summary boxes. The left side of the box will display a color corresponding to the color of the annotation. When an annotation summary box is clicked the user will be taken to that annotation in the document and the annotation dialogue box will appear. The user can delete and edit their annotations through the annotation summary or in the dialogue box. The user can also reply to theirs' and others' annotations.

###### **4.2.2.6.1Delete**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})d63148083475cc66.png) licking this button will delete the annotation. This button will not appear if the user is trying to delete another user's annotation.

The Delete button is located in the top right corner of the annotation summary box and above the Edit button.

###### **4.2.2.6.2Edit**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})2bd4cdcf4d88b8d.png) licking this button will open the text area of the annotation summary box and allow the user to edit their annotation comment. This button will not appear if the user is trying to edit another user's annotation.

The Edit button is located in the annotation summary box below the Delete button and above the Reply button.

###### **4.2.2.6.3Reply**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})54e0574d6b8c0ebf.png) licking this button allows the user to reply to an annotation. A user can reply to their annotation as well as other's annotations. If an annotation with a reply is deleted, the reply will be orphaned.

The Reply button is located in the annotation summary box below the Edit button.

#### 4.2.3Search

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})3ae184d53c9021c8.png)

Clicking on the search tab will display the search tab which includes a search text box and arrows to move through the search matches.

##### 4.2.3.1 **Text Search**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})8abc72815a47773e.png) he text search box allows the user to search for text in the document. It does not search through annotation summary boxes or annotation dialogue boxes. When a user inputs text into the search box, matching results will appear below the text search box. The results will be highlighted on the document. The result the user is currently viewing will be highlighted a different color than the other results. The matching result box that is in view has a corresponding color to the result text on the document. The text search box is not case sensitive.

##### 4.2.3.2 **Match Whole Words Only**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})627e1649f4d9e52c.png) licking this button will only display the results which match the whole word searched for in the text search box. For example, if the user searches for the word "the" with the Match Whole Words Only button activated, words such as "them" or "there" will not appear in the search results.

The button is located to the right of the text search box and to the left of the Previous Result button.

##### 4.2.3.3 **Previous Result**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cab7a795391a64e2.png) licking this button will display the previous matching result from the text search. If there are no results previous to the result currently in view the button will not be in use.

This button is located to the right of the Match Whole Words Only button and to the left of the Next Result button..

##### 4.2.3.4 **Next Result**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})4ec99640dff8485e.png) licking this button will display the next matching result from the text search. If there are no results after the result currently in view the button will not be in use.

This button is located to the right of the Previous Result button.

#### 4.2.4Participants

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})6d8984207b0ef148.png)

Clicking on the Participants tab will display the participants tab which includes a list of the current users and a chat box that allows the user to chat with the other users viewing the document.

>**Note:** The Participants tab only appears when "Collaboration Mode" is active, and the user is connected to the Collaboration Server.

##### 4.2.4.1 **Participants List**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e5759492e627fbe5.png) his section of the Participants tab shows the list of the current users viewing the document. When a new user starts viewing the document, their name will be added to the bottom of the list. When a user stops viewing the document, their name will be removed from the list.

##### **4.2.4.2Following**

This section of the Participants tab allows the user to follow another user when they are scrolling.

###### 4.2.4.2.1 **Follower**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})c417773951bf033c.png) he user can follow another user by clicking on the other user's name. The user will jump to the page of the user they are following. The zoom level will also change to match that of the followee. A icon will be displayed next to the name of the user they are following, and a notification will pop up at the bottom of the page that says which user is being followed. The user can unfollow the user by clicking on the other user's name.

###### 4.2.4.2.2 **Followee**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1e1f770c5b54b1ec.png) he user will be notified that they are being followed by another user. A icon will be displayed next to the name of the user that is following them, and a notification will pop up at the bottom of the page that says the user is being followed. The user can stop others from following them by clicking on the other user's name or clicking the Stop All button in the notification.

>**Note:** The followee cannot follow another user while they are being followed.

##### 4.2.4.3 **Activate Chat**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})eeeaec721da19adf.png) his section of the Participants tab allows the user to activate the chat box. The chat box is activated if the button is blue. The user can disable the chat box by clicking the Activate Chat button. The button will turn grey and disable the text input box.

This button is located below the Participants List, to the right of the Start Zoom Call button, and above the Chat Box.

##### 4.2.4.4 **Start Zoom Call**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})3e8af21b49526de7.png) he zoom integration feature allows a user to start a Zoom call within the Enterprise Viewer window between everyone that is viewing the same document. The Zoom call can be recorded and saved back to the user's repository.

The Start Zoom Call button is located to the right of the Activate Chat button and to the left of the Start Microsoft Teams Call button.

##### 4.2.4.5 **Start Microsoft Teams Call**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})3e8af21b49526de7.png) he team integration feature allows a user to start a Microsoft Teams call within the Enterprise Viewer window between everyone that is viewing the same document. The Microsoft Teams call can be recorded and saved back to the user's repository.

The Start Microsoft Teams Call button is located to the right of the Start Zoom Call button.

##### **4.2.4.6Chat Box**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})badf4d6fa46525cb.png) his section of the Participants tab allows the user to view the conversation with the other users who are also currently viewing the document. Each new message that a user sends contains the user's name, the time at which they sent the message, and the content of the message itself.

#### **4.2.4.7Send**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})4f1ea733ba1a502d.png) he Send button allows the user to send a message of their own composition to the other participants of the conversation.

This button is located at the bottom right corner of the Participants tab below the chat box.


NEED TO CHANGE HEADERS FROM HERE

## 4.3Left Sidebar

### 4.3.1Hide Sidebar

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})2596e1f3406e360f.png) he Hide Sidebar button allows the user to hide the sidebar containing the list of bookmarks. When the button is clicked, the sidebar will collapse into the left side of the Enterprise Viewer window. When the button is clicked again, the sidebar will expand back into view.

This button is located in the top right corner of the sidebar.

### 4.3.2Thumbnails

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})d597836a40b8b64.png)

The thumbnails sidebar displays all of the thumbnails of the document, if available. Clicking on an entry in the list will take the user to the page the user selected. Thumbnails are unavailable for large documents.

It is located on the left side of the Enterprise Viewer window.

#### 4.3.2.1 **Annotation Indicator**

A ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e832ece931578986.png) ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})491bf0aa6fc37c1d.png) n annotation indicator will appear on the page's thumbnail if an annotation was made on that page. If no annotations have been made on the page, then an annotation indicator will not be displayed on the thumbnail.

#### **4.3.2.2User Icon**

A ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b2cf158297b2494.png) user icon will appear on the thumbnail of the page a collaborator is on. The icon will have the initials of the collaborator and will display the full name when the user hovers over the icon. Multiple icons will appear as users view the same page.

### 4.3.3Bookmarks

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})2a4e64554cfbfe78.png)

The bookmarks sidebar displays all of the bookmarks that the document has, if available. Clicking on an entry in the list will take the user to the section of the document where the bookmark begins.

It is located on the left side of the Enterprise Viewer window.

#### 4.3.3.1 **Expand All Bookmarks**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})507a4902cb63d927.png) he Expand All Bookmarks button allows the user to expand all of the sub-lists in the bookmarks list in order for the user to see all bookmarks in all categories.

This button is located in the top right corner of the Bookmarks sidebar and to the left of the Collapse All Bookmarks button.

#### 4.3.3.2 **Collapse All Bookmarks**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})507a4902cb63d927.png) he Collapse All Bookmarks button allows the user to collapse all of the sub-lists in the bookmarks list in order for the user to see only the categories of bookmarks.

This button is located in the top right corner of the Bookmarks sidebar, to the right of the Expand All Bookmarks button, and below the Hide Sidebar button.

### 4.3.4Internal Links

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})50b400e690e62c82.png)

Internal Links allow the user to jump to different places within the document. An internal link will be highlighted light blue when a user hovers over it.

### 4.3.5Attachments

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e68656bdb598e331.png)

The attachments sidebar displays the attached documents that the document has, if any. If there are no attached documents, the attachments sidebar tab will not be displayed. Clicking on an entry in the list will automatically download the attached document.

The Attachments sidebar is located on the left side of the Enterprise Viewer window.

### 4.3.6Document List

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a95b5944d6c3ecb.png)

The document list sidebar displays documents that have been added to the document list, if any. If no documents were added to the list, the document list sidebar will not be displayed. The document list allows you to easily switch between documents in Enterprise Viewer. To switch to a new document in Enterprise Viewer, click on a document in the list.

The Document List sidebar is located on the left side of the Enterprise Viewer window.

>**Note:** The user will not be able to see the previous document in the document list unless it is added.

# 5Redact Content Interface

## 5.1Toolbar

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})617a3d0056e9f127.png)

The toolbar (displayed above) contains all of the core functionality to Enterprise Viewer in Redact Content mode. This is where document navigation and zooming occur, and where redactions can be created, saved, and more information on Enterprise Viewer is found.

It is located at the top of the Enterprise Viewer window.

Dark grey buttons cannot be used until certain actions are made. A button that is in use will have a blue interior.

### 5.1.1Manual Page Navigation

M ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})12b0d850b9c2d563.png) anually entering a value into this text field and then hitting the Enter key will navigate to the new page number.

If the page number entered is not a number, this value gets reset to the current page. If the page number entered is lower than the first page, the user is navigated to the first page. If the page number entered is higher than the last page, the user is navigated to the last page.

This text field is located to the right of the Enterprise Viewer logo and to the left of the Fit to Height button.

### 5.1.2Total Number of Pages

This is a non-editable field denoting the total number of pages for the document.

### 5.1.3Fit to Height

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a465caf35bcafc46.png) licking this button automatically calculates the zoom level to make the window show the entire height of the document. This does not take into account the width of the document, and thus scroll bars may appear horizontally depending on the page's aspect ratio against the size of the window.

The Fit to Height button is located to the right of the Manual Page Navigation text field and to the left of the Fit to Width button.

### 5.1.4Fit to Width

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e901f91fb6ffa990.png) licking this button automatically calculates the zoom level to make the window show the entire width of the document. This does not take into account the height of the document, and thus scroll bars may appear vertically depending on the page's aspect ratio against the size of the window.

The Fit to Width button is located to the right of the Fit to Height button and to the left of the Next Page button. The Fit to Width button is to the left of the Zoom In button if the Next Page button is not displayed in the toolbar.

### 5.1.5Next Page

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})ae0115b570b8061c.png) licking this button takes the user to the next page of the document. The button will become disabled once the user reaches the end of the document.

The Next Page button is located to the right of the Fit to Width button and to the left of the Previous Page button.

>**Note:** This feature is unavailable if the document does not have more than one page.

### 5.1.6Previous Page

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b273af53178e550f.png) licking this button takes the user to the previous page of the document. The button will become disabled once the user reaches the beginning of the document.

The Previous Page button is located to the right of the Next Page button and to the left of the Zoom In button.

>**Note:** This feature is unavailable if the document does not have more than one page.

### 5.1.7Zoom In

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})7f91d8b0141a5ee9.png) licking this button zooms in in increments of ten. While zooming in, the current middle of the page will remain in the middle.

If the target zoom level is above the maximum zoom level, the zoom is set to the maximum zoom level. This is set for performance and usability reasons.

The Zoom In button is located to the right of the Previous Page button and to the left of the Zoom Out button. The Zoom In button is to the right of the Fit to Width button if the Previous Page button is not displayed in the toolbar.

### 5.1.8Zoom Out

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})15fd3ebdc367cba0.png) licking this button zooms out in increments of ten. While zooming out, if possible, the current middle of the page will remain in the middle (unless zooming out reveals an image that does not need to be scrolled).

If the target zoom level is below the minimum zoom level, the zoom is set to the minimum zoom level. This is set for performance and usability reasons.

The Zoom Out is located to the right of the Zoom In button and to the left of the Save button.

### 5.1.9Save

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})99aa3f0408511ea.png) licking this button will save any new or modified redactions to the server, as well as refresh any unmodified redactions from other users that have been updated.

The Save button is located to the right of the Zoom In button and to the left of the Undo button.

### 5.1.10Selection Tool

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})90f44dea782bf749.png) he selection tool button is the default cursor when opening Enterprise Viewer and signifies that the mouse does not do anything out of the ordinary.

The Selection Tool button is located to the right of the Save button and to the left of the Draw Redaction button.

### 5.1.11Draw Redaction

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cef8afaf00d74133.png) licking this button allows the user to draw a redaction in a specific area of the page. Redactions are drawn in the form of rectangles. Once the cursor is selected, the user can click anywhere on the page to start the redaction. The user can then drag the mouse to anywhere else on the page to put the other corner of the redaction. A dim gray rectangle will be drawn from one point to the other as a preview of what the redaction will look like. Dialog boxes are anchored in the beginning of the redaction.

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cb5eb7a76b718443.png) he annotation comment from the dialog box will appear on the redacted area once the redaction is saved. The redacted area will become dark grey with white text if there is an annotation comment, otherwise it will turn black.

The Draw Redaction button is located to the right of the Save button and to the left of the Text Redaction button.

### 5.1.12Text Redaction

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})95c82e5b0ea6931c.png) licking this button allows the user to redact text in a document. Once the cursor is selected, the user can click on the text they wish to redact. The user can then drag the mouse over the text to redact it until the mouse is released. The user may redact multiple lines. Certain text such as Social Security numbers will be redacted automatically.

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})10752bad78a90c1b.png) he annotation comment from the dialog box will appear on the redacted area once the redaction is saved. The redacted area will become dark grey with white text if there is an annotation comment, otherwise it will turn black.

The Text Redaction button is located to the right of the Draw Redaction button and to the left of the Help button.

### 5.1.13Help

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1b09fc8fbf563d74.png) he help button is used to give the user more information regarding Enterprise Viewer. When this button is clicked a new tab in the browser will open with Technology Services Group information regarding their services and description of Enterprise Viewer.

The Help button is located to the right of the Text Redaction button and to the left of the Load Time.

### 5.1.14L ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})88a97498f63e41b1.png) oad Time

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})26834eaf0ef5a93b.png) he load time shows the user how many seconds it took to load the document. The user can see more details when clicking on the text. The load time takes into consideration the time it took the user to login, the browser JavaScript load time, the time it took to retrieve document information, the time it took to display the document, and the document's size. The user can copy the load time information into their clipboard by clicking the Copy to Clipboard button found in the load time information window.

The Load Time text is located to the right of the Help button.

## 5.2Right Sidebar

The sidebar displays the annotation summary and search tabs. It is to the right of the document and below the toolbar.

### 5.2.1Hide Sidebar

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})30357ba6faa8b7c8.png) he hide sidebar button allows the user to hide or show the sidebar depending upon the current state of the view. By default, the sidebar is in view. When clicked the sidebar will be hidden from the display. When the sidebar is not in view, the button can be clicked to show the sidebar and the sidebar will reappear in its default position.

This button is located in the upper right corner of the sidebar.

### 5.2.2Annotation Summary

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})c4e1644bb8fe86e5.png) ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a2dc5893b5755710.png)

The annotation summary tab is used to show the summaries of the redactions that have been made in the document. The user can filter through the redactions and view the summaries in this tab.

#### 5.2.2.1 **Filter Text Box**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})f19eae6e66d36699.png) he filter text box allows the user to sort through the annotation summaries efficiently. When the user types in the text box, the annotation summary boxes will be sorted. The annotation summary boxes with text matching the user's input will appear below the filter search box. The filter field will filter on the:

- Username of the annotation creator
- Contents of the annotation comment
- Date of the comment
- Page Number
- Redaction type (ex: Redaction, Text Redaction)

This text box is located at the top of the Annotation Summary above the summaries.

#### **5.2.2.2Filters**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})d67780d5188e8760.png) he filters button allows the user to filter through the annotation summary boxes based upon the status and author. When clicked, a checkbox list will appear displaying status, author(s), and type options for user to select. Multiple statuses, authors and/or types can be selected. The filters box can be used with the filter text box.

This button is located on the immediate right of the filter text box.

#### **5.2.2.3Clear Filters**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})df1a1ca084686bde.png) he clear filters button is used to clear all filters from the filter text box and the filters button. When clicked the text in the filters text box will be cleared as well as the selections made in the filters list. The clear filters button will appear to the right of the filter text box when there is text in the filter text box or when a selection is made in the filters list.

#### 5.2.2.4 **Annotation Summary Boxes**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})32bce3427e591bf3.png) he annotation summary boxes appear in the sidebar below the filter text box. They are used to display information regarding each redaction. Each redaction will have one corresponding annotation summary box. An annotation summary box will display the author of the redaction, the date the redaction was created, the page the redaction was made on, the type of redaction, and the status of the redaction. If the status is set to none the status will not be displayed on the annotation summary boxes. The left side of the box will display a color corresponding to the color of the annotation. When an annotation summary box is clicked the user will be taken to that redaction in the document and the redaction dialogue box will appear.

### 5.2.3Search

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cc269ae797b6d693.png)

Clicking on the search tab will display the search tab which includes a search text box, arrows to move through the search matches, and a redact search result option.

#### 5.2.3.1 **Bulk Redaction**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})12def047f4d6f028.png) he reason for redaction box and redact results button allows the user to redact all of the search results. The user can type their reason for redacting the search results in the reason for redaction box. This reason will be applied to each search result redaction. The redactions will be displayed in the annotation summary. A preview of the redactions can be seen in the document.

The Bulk Redaction feature is located below the Text Search box and above the search results.

#### 5.2.3.2 **Text Search**

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})8abc72815a47773e.png) he text search box allows the user to search for text in the document. It does not search through annotation summary boxes or annotation dialogue boxes. When a user inputs text into the search box, matching results will appear below the text search box. The results will be highlighted on the document. The result the user is currently viewing will be highlighted a different color than the other results. The matching result box that is in view has a corresponding color to the result text on the document. The text search box is not case sensitive.

#### 5.2.3.3 **Match Whole Words Only**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})627e1649f4d9e52c.png) licking this button will only display the results which match the whole word searched for in the text search box.

The button is located to the right of the text search box and to the left of the Previous Result button.

#### 5.2.3.4 **Previous Result**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})cab7a795391a64e2.png) licking this button will display the previous matching result from the text search. If there are no results previous to the result currently in view the button will not be in use.

This button is located to the right of the text search box and to the left of the Match Whole Words Only button.

#### 5.2.3.5 **Next Result**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})4ec99640dff8485e.png) licking this button will display the next matching result from the text search. If there are no results after the result currently in view the button will not be in use.

This button is located to the right of the Previous Result button.

## 5.3Left Sidebar

### 5.3.1Bookmarks

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})c9159c467e44a8bc.png)

The bookmarks sidebar displays all of the bookmarks that the document has, if available. Clicking on an entry in the list will take the user to the section of the document where the bookmark begins.

It is located on the left side of the Enterprise Viewer window.

# 6Edit Pages Interface

## 6.1Toolbar

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})6be2c8c2c7a6f95d.png)

The toolbar (displayed above) contains all of the core functionality to Enterprise Viewer in Edit Pages mode. This is where document navigation and zooming occur, where the user can split the PDF, delete pages, rotate pages, and section the document, and where more information on Enterprise Viewer is found.

It is located at the top of the Enterprise Viewer window.

Dark grey buttons cannot be used until certain actions are made. A button that is in use will have a blue interior.

### 6.1.1Manual Page Navigation

M ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e8b3a44bca8f0bdb.png) anually entering a value into this text field and then hitting the Enter key will navigate to the new page number.

If the page number entered is not a number, this value gets reset to the current page. If the page number entered is lower than the first page, the user is navigated to the first page. If the page number entered is higher than the last page, the user is navigated to the last page.

This text field is located to the right of the Enterprise Viewer logo and to the left of the Fit to Width button.

### 6.1.2Total Number of Pages

This is a non-editable field denoting the total number of pages for the document.

### 6.1.3Fit to Width

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e901f91fb6ffa990.png) licking this button automatically calculates the zoom level to make the window show the entire width of the document. This does not take into account the height of the document, and thus scroll bars may appear vertically depending on the page's aspect ratio against the size of the window.

The Fit to Width button is located to the right of the Manual Page Navigation text field and to the left of the Fit to Height button.

### 6.1.4Fit to Height

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a465caf35bcafc46.png) licking this button automatically calculates the zoom level to make the window show the entire height of the document. This does not take into account the width of the document, and thus scroll bars may appear horizontally depending on the page's aspect ratio against the size of the window.

The Fit to Height button is located to the right of the Fit to Width button and to the left of the Next Page button. The Fit to Height button is to the left of the Zoom Out button if the Next Page button is not displayed in the toolbar.

### 6.1.5Next Page

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})20e98db25c528185.png) licking this button takes the user to the next page of the document. The button will become disabled once the user reaches the end of the document.

The Next Page button is located to the right of the Fit to Height button and to the left of the Previous Page button.

>**Note:** This feature is unavailable if the document does not have more than one page.

### 6.1.6Previous Page

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b273af53178e550f.png) licking this button takes the user to the previous page of the document. The button will become disabled once the user reaches the beginning of the document.

The Previous Page button is located to the right of the Next Page button and to the left of the Zoom Out button.

>**Note:** This feature is unavailable if the document does not have more than one page.

### 6.1.7Zoom Out

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})15fd3ebdc367cba0.png) licking this button zooms out in increments of ten. While zooming out, if possible, the current middle of the page will remain in the middle (unless zooming out reveals an image that does not need to be scrolled).

If the target zoom level is below the minimum zoom level, the zoom is set to the minimum zoom level. This is set for performance and usability reasons.

The Zoom out button is located to the right of the Previous Page button and to the left of the Zoom In button. The Zoom Out button is to the right of the Fit to Height button if the Previous Page button is not displayed in the toolbar.

### 6.1.8Zoom In

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})7f91d8b0141a5ee9.png) licking this button zooms in in increments of ten. While zooming in, the current middle of the page will remain in the middle.

If the target zoom level is above the maximum zoom level, the zoom is set to the maximum zoom level. This is set for performance and usability reasons.

The Zoom In button is located to the right of the Zoom Out button and to the left of the Save button.

### 6.1.9Save

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b3c6bfca7db38560.png) licking this button will save any changes to the server, as well as refresh any unmodified annotations from other users that have been updated.

The Save button is located to the right of the Zoom In button and to the left of the Split PDF button.

### 6.1.10Split PDF

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})8688290bfbe556f6.png) licking the Split PDF button will prompt the user to select the pages for the split. The user can select the pages by clicking on the box in the upper left corner of the page or by typing the pages in the blue notification located at the button of the screen. The selected pages will become green. The user then must click the Split PDF button which is located in the notification. Doing so will create a new document with the selected pages which has the same metadata and can be found in the same folder as the original document.

The Split PDF button is located to the right of the Save button and to the left of the Delete Pages button.

### 6.1.11Delete Pages

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})4035fd261f0e3f5f.png) licking the Delete Pages button will prompt the user to select the pages they wish to delete. The user can select the pages by clicking on the box in the upper left corner of the page or by typing the pages in the blue notification located at the bottom of the screen. The selected pages will become red. The user then has to click the Delete Pages button which is located in the notification.

The Delete Pages button is located to the right of the Split PDF button and to the left of the Rotate Page Counter-Clockwise button.

### 6.1.12Rotate Page Counter-Clockwise

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})dbd6ad46ed334153.png) licking this button will rotate all of the pages counter-clockwise. If the user wants specific pages to rotate, the user must select them by clicking the box in the top left corner of the page or by writing it in the range section of the notification in the bottom right corner.

The Rotate-Page Counter-Clockwise button is located to the right of the Delete Pages button and to the left of the Rotate Page Clockwise button.

### 6.1.13Rotate Page Clockwise

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})f78df8c6d8bcd6c4.png) licking this button will rotate all of the pages clockwise. If the user wants specific pages to rotate, the user must select them by clicking the box in the top left corner of the page or by writing it in the range section of the notification in the bottom right corner.

The Rotate Page Clockwise button is located to the right of the Rotate Page Counter-Clockwise button and to the left of the Section Document button.

### 6.1.14Section Document

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})c4b3b40d0f514730.png) licking this button will allow the user to split the document into different sections.Sectioning is an efficient way to reorder large documents. A blue notification will appear in the bottom right corner where the user can name the section and select the range of pages for the section. The user must then select the create section button. The new section will appear in the left sidebar. For more information on how to section a document, reference [Section 6.2.2](#SectionDocument).

The Section Document button is located to the right of the Rotate Page Clockwise button and to the left of the Help button.

### 6.1.15Help

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1b09fc8fbf563d74.png) he help button is used to give the user more information regarding Enterprise Viewer. When this button is clicked a new tab in the browser will open with Technology Services Group information regarding their services and description of Enterprise Viewer.

The Help button is located to the right of the Section Document dropdown and to the left of the Load Time.

### 6.1.16L ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})88a97498f63e41b1.png) oad Time

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})26834eaf0ef5a93b.png) he load time shows the user how many seconds it took to load the document.

The user can see more details when clicking on the text. The load time takes into consideration the time it took the user to login, the browser JavaScript load time, the time it took to retrieve document information, the time it took to display the document, and the document's size. The user can copy the load time information into their clipboard by clicking the Copy to Clipboard button found in the load time information window.

The Load Time text is located to the right of the Help button.

## 6.2Left Sidebar

### 6.2.1Hide Sidebar

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})2596e1f3406e360f.png) he Hide Sidebar button allows the user to hide the sidebar containing the list of sections. When the button is clicked, the sidebar will collapse into the left side of the Enterprise Viewer window. When the button is clicked again, the sidebar will expand back into view.

This button is located in the top right corner of the Sections sidebar.

### 6.2.2Sections

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})7432761cd8fcfbff.png)

The sections sidebar displays all of the sections of the document, if available. Sectioning is an efficient way to reorder large documents. Unsectioned pages will be listed under Unsectioned. The pages belonging to each section are listed under the section's name. Clicking on an entry in the list in Add Annotations mode will take the user to the first page of the section. For more information on how to activate the Section Document feature, reference [Section 6.1.14](#ActivateSectionDocument).

It is located on the left side of the Enterprise Viewer window.

#### 6.2.2.1**C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})2f770813b10f9e03.png) reating a Section**

The user can create a new section through the blue notification that appears in the bottom right corner. The user can name the section and type the range of pages for the section. The user must then select the Create Section button in the notification. The new section will appear in the left sidebar.

#### 6.2.2.2 **Renaming a Section**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a4e2ac8ae69b1086.png) licking this button allows the user to rename the section. A text box will appear under the section's name prompting the user to enter a new section name.

This button is located to the right of the section's name.

#### 6.2.2.3 **Edit Section**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})d63b3a4f83f9e06f.png) licking this button displays the thumbnails of the section. The user can reorder the section by dragging the thumbnails to their desired positions. The user must click the button again to exit thumbnail view. Below are photos of the reordering pages process.

This button is located to the left of the Deleting a Section button and below the Clear All button.

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})5833e2b8536242e5.png)

**Figure 1: Thumbnails before reordering pages**

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e4b7038df7e3f216.png)

**Figure 2: Thumbnail is being dragged into new position**

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a25024c70cffbd17.png)

**Figure 3: Thumbnail is in new position. The pages have been reordered.**

#### 6.2.2.4 **Deleting a Section**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})47f16bd78b035d7e.png) licking this button allows the user to delete the section. The pages from the deleted section will then be listed under Unsectioned.

This button is located to the right of the Edit Section button and below the Clear All button.

#### 6.2.2.5 **Reordering Sections**

The user can reorder the sections by clicking on a section and dragging it to a new spot.

>**Note:** The user cannot reorder the sections if there are unsectioned pages.

#### 6.2.2.6 **Clear All**

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})c6f787d1944e9939.png) licking this button will clear all document sections and list the pages under Unsectioned. The user will be prompted by a question asking whether they are sure they want to clear all sections.

The Clear All button is located in the top right corner of the Sections sidebar below the Hide Sidebar button.

# 7Add Signatures Interface

## 7.1Toolbar

![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e7336159929c3481.png)

The toolbar (displayed above) contains all of the core functionality to Enterprise Viewer in Signature mode. This is where document navigation and zooming occur, and signatures can be added, saved, and more information on Enterprise Viewer is found.

It is located at the top of the Enterprise Viewer window.

Dark grey buttons cannot be used until certain actions are made. A button that is in use will have a blue interior.

### 7.1.1Manual Page Navigation

M ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e8b3a44bca8f0bdb.png) anually entering a value into this text field and then hitting the Enter key will navigate to the new page number.

If the page number entered is not a number, this value gets reset to the current page. If the page number entered is lower than the first page, the user is navigated to the first page. If the page number entered is higher than the last page, the user is navigated to the last page.

This text field is located to the right of the Enterprise Viewer logo and to the left of the Fit to Width button.

### 7.1.2Total Number of Pages

This is a non-editable field denoting the total number of pages for the document.

### 7.1.3Fit to Width

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})e901f91fb6ffa990.png) licking this button automatically calculates the zoom level to make the window show the entire width of the document. This does not take into account the height of the document, and thus scroll bars may appear vertically depending on the page's aspect ratio against the size of the window.

The Fit to Width button is located to the right of the Manual Page Navigation text field and to the left of the Fit to Height button.

### 7.1.4Fit to Height

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})a465caf35bcafc46.png) licking this button automatically calculates the zoom level to make the window show the entire height of the document. This does not take into account the width of the document, and thus scroll bars may appear horizontally depending on the page's aspect ratio against the size of the window.

The Fit to Height button is located to the right of the Fit to Width button and to the left of the Previous Page button. The Fit to Height button is to the left of the Zoom Out button if the Previous Page button is not displayed in the toolbar.

### 7.1.5Previous Page

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})b273af53178e550f.png) licking this button takes the user to the previous page of the document. The button will become disabled once the user reaches the beginning of the document.

The Previous Page button is located to the right of the Fit to Height button and to the left of the Next Page button.

>**Note:** This feature is unavailable if the document does not have more than one page.

### 7.1.6Next Page

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})20e98db25c528185.png) licking this button takes the user to the next page of the document. The button will become disabled once the user reaches the end of the document.

The Next Page button is located to the right of the Previous Page button and to the left of the Zoom Out button.

>**Note:** This feature is unavailable if the document does not have more than one page.

### 7.1.7Zoom Out

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})15fd3ebdc367cba0.png) licking this button zooms out in increments of ten. While zooming out, if possible, the current middle of the page will remain in the middle (unless zooming out reveals an image that does not need to be scrolled).

If the target zoom level is below the minimum zoom level, the zoom is set to the minimum zoom level. This is set for performance and usability reasons.

The Zoom out button is located to the right of the Next Page button and to the left of the Zoom In button. The Zoom Out button is to the right of the Fit to Height button if the Next Page button is not displayed in the toolbar.

### 7.1.8Zoom In

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})7f91d8b0141a5ee9.png) licking this button zooms in in increments of ten. While zooming in, the current middle of the page will remain in the middle.

If the target zoom level is above the maximum zoom level, the zoom is set to the maximum zoom level. This is set for performance and usability reasons.

The Zoom In button is located to the right of the Zoom Out button and to the left of the Save button.

### 7.1.9Save

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1fb8ccb3e5540cbc.png) licking this button will save any new or modified annotations to the server, as well as refresh any unmodified annotations from other users that have been updated.

The Save button is located to the right of the Zoom In button and to the left of the Selection Tool button.

### 7.1.10Selection Tool

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})90f44dea782bf749.png) he selection tool button is the default cursor when opening Enterprise Viewer and signifies that the mouse does not do anything out of the ordinary.

The Selection Tool button is located to the right of the Save button and to the left of the Draw Signature button.

### 7.1.11Draw Signature

C ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})953f04412b81d074.gif) licking this button allows the user to add a signature to the page. Once the cursor is selected, the user can click anywhere on the page to add a signature. The user will be prompted by a popup window asking them to sign below. The user can clear the signature if needed. The user must click the insert button of the popup window to insert the signature.

The Draw Signature button is located to the right of the Selection Tool button and to the left of the Help button.

### 7.1.12Help

T ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})1b09fc8fbf563d74.png) he help button is used to give the user more information regarding Enterprise Viewer. When this button is clicked a new tab in the browser will open with Technology Services Group information regarding their services and description of Enterprise Viewer.

The Help button is located to the right of the Draw Signature button and to the left of the Load Time.

### 7.1.13L ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})26834eaf0ef5a93b.png) ![Img Txt]({% link enterprise-viewer/images/aev-annotations-interface-toolbar.png %})88a97498f63e41b1.png) oad Time

The load time shows the user how many seconds it took to load the document. The user can see more details when clicking on the text. The load time takes into consideration the time it took the user to login, the browser JavaScript load time, the time it took to retrieve document information, the time it took to display the document, and the document's size. The user can copy the load time information into their clipboard by clicking the Copy to Clipboard button found in the load time information window.

The Load Time text is located to the right of the Help button.