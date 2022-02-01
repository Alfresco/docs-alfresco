---
title: Data persistence
---

When you build a process you use Form variables and decalre Process variables. You can either give values to these variables or you can allow a user to give values to them once the process has started. 
Once the process has completed however, all these values are stored in your database but are no longer needed. You can use the Data persistence functionality to free up space in your database and remove this redundant data.

Once you have created a process you can click on Data persistence.

![data persistence]({% link process-services/images/data-persistence.png %})

![change value]({% link process-services/images/change-value.png %})

Once you select Data persistence you are presented with the model.

Save All – On selecting, all variables that are used in the process, will get stored into DB.
So, it is required to choose when data declared is important & can be required in future. By default, process save all into DB if nothing is checked into Data persistence by user.

Don’t Save any - On selecting, all variables that are used in the process, will be deleted from DB.
So, it is required to choose when data declared is not important & is not required later.
It deletes all variables and leave initiator that tell when the process was started and ended.

'45095', '45094', '45094', NULL, 'initiator', 'string', '0', NULL, NULL, NULL, '2', NULL, '2022-01-25 13:37:52.373', '2022-01-25 13:37:52.373'

Save Specified process - On selecting, it allows feasibility what to persist and what to not. It shows list of all Forms and Process variables that are used in the process. User can make persist and non-persist accordingly.

FORM

Checking Forms – contains 4 buttons, you can use according to your use case.
Persist – selecting any field and then choose on persist button it will move to Persist block.
Not Persist- selecting any field and then choose on Not persist button it will move to Not Persist block.
Persist All – Clicking on Persist All button, will move all fields to persist block
Not Persist All – Clicking on Not-Persist All button, will move all fields to Not Persist block

![form button]({% link process-services/images/form-button.png %})


You can choose process variable and select radio button accordingly. 
(Yes- persist/No- Not Persist)

![form radio]({% link process-services/images/form-radio.png %})

After marking your Forms & Process variables Persist, you can save the model.
Later you will see your updated Not persisted elements into screen.


![not persisted]({% link process-services/images/not-persisted.png %})












