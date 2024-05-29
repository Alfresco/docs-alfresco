---
title: Desktop Sync FAQ
---

Here's a list of common questions about Desktop Sync for Windows and Mac.

{% capture windows %}

### So, what gets synced?

Desktop Sync shows you all your Alfresco sites and folders which you have access to, plus your My Files and Shared Files content. You can select any (or all) of these and click **Sync** to create a local copy of the content on your computer.

Individual files you've favorited aren't displayed and can be synced directly, you need to sync the folder they're in.

Whenever you update any of this local content (which includes adding, moving, and deleting files and folders within the synced area) these changes will automatically be replicated on Alfresco.

Whenever you or anyone else make changes in Alfresco to sites or folders that you've synced with, then these changes will be replicated in your local content.

>**Note:** Some temporary files don't get synced. These include, but aren't limited to \*.tmp, \*.temp, desktop.ini, \*.~, and Thumbs.db files. You can configure the file types you don't want to be synced in AlfrescoSync.config. For more information, see [Client configuration]({% link desktop-sync/1.17/config/index.md %}).

### Can I use Desktop Sync during initial sync?

Yes. During initial sync, a content created on your desktop will be synced only after the initial sync is over.

### Will syncing happen while I am offline?

Sync needs a connection to the server. Syncing will resume when the connection is restored.

### Where can I find my synced files?

The content is synced to `C:\Users\<username>\Alfresco`, by default, or whatever location you chose after the initial setup. The `Alfresco` folder can also be found in File Explorer under **Favourites**.

### How many folder levels can I sync?

You can sync as many folder levels but the maximum length for a path should not be more than 260 characters. This is a limitation of the Windows File System.

For more information see [Maximum Path Length Limitation](https://docs.microsoft.com/en-gb/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN#maxpath){:target="_blank"}.

### Can I cancel initial sync?

Yes. As a Desktop Sync user, you can either:

* Take your machine offline: You can simply ignore initial sync and shut down your machine or disconnect the network. Initial sync will resume when connection is restored.
* Keep your machine running but discontinue initial sync: You can quit Desktop Sync and initial sync will resume when restart Desktop Sync.
* Amend your selected content choices by clicking **Return to content selection**.

### I made changes to a local file that aren't showing in Alfresco.

A number of scenarios can cause this:

* The file is held/locked open by an application on your computer.
* Network connection problems, Alfresco connection problems, or synchronization service connection problems; contact your IT team.
* If you've made changes locally that are showing in Alfresco, then make sure that Desktop Sync is running by confirming that the ![Menu bar]({% link desktop-sync/images/ico-ds-alfresco.png %}) icon is showing in the system tray.
* It's also possible that someone was updating the content in Alfresco at the same time as you were updating the local content. The file is in conflict state. See sync conflict resolution guide for [Windows]({% link desktop-sync/1.17/using/sync-conflict-guide.md %}#resolve-and-manage-sync-conflicts-on-windows).

### What's the *orphaned* folder in my local synced drive?

If you deselect synced content in Desktop Sync and click **Sync**, then you're effectively breaking the link between local content and Alfresco content.

The content won't be synced any more. Files that were not synced to Alfresco due to conflict or deferred can be found in *orphaned* folder. This folder is automatically created in your synced area and the previously synced content is moved to there.

### If a file is checked out by another user in Alfresco, can I update it?

No, you can't update files that are checked out by other users.

### When will a deferred file be synced?

First you need to find the reason why the file is in a deferred state. The file can be in a deferred state for the following reasons.

* When you don't have free space on your desktop.
* If you have an Office file open and you are saving it to your local.
* You're not connected to the server.

Resolve the issue and your file will be synced automatically.

### I see a red cross on my system tray. What does that mean?

See [App icons and context menu]({% link desktop-sync/1.17/using/app-icons.md %}#application-icons-and-menu-on-windows).

See also sync conflict resolution guide on [Windows]({% link desktop-sync/1.17/using/sync-conflict-guide.md %}#resolve-and-manage-sync-conflicts-on-windows).

### Do I need to restart Desktop Sync when I restart my machine?

No, Desktop Sync is automatically started when your machine starts.

### Can I use Desktop Sync while I am offline?

You can continue working on your files offline and they'll be synced to Alfresco whenever you have a connection to the server.

### What happens to a file/ folder which is moved out of Alfresco folder on my desktop?

The moved file or folder is deleted in Alfresco.

### Why can't I see status icons on my files and folders?

Windows has a limit of 15 icon overlay handlers, some of which are reserved by the system. 
The number of different icon overlay handlers is limited by the amount of space available for icon overlays 
in the system image list. So, uninstalling other applications that use system overlays could make some slots 
available for Desktop Sync icon overlays.

Additionally, check if you have accidentally quit Desktop Sync. Upon restart, the icons should be restored.

See [application icons]({% link desktop-sync/1.17/using/app-icons.md %}#application-icons-and-menu-on-windows) 
for more details.

### What happens if two Alfresco sites have the same name?

If the site name is duplicate, one of the site name will be displayed as SiteName_01, for example, Test Site_01.

### What happens if the site name is invalid or contains unsupported Windows characters?

A file name can't contain the following characters: `\ / : * ? " < >`. Desktop Sync replaces these characters with underscores, for example, Test\>test will be replaced as Test_test on your desktop.

### How do I uninstall Desktop Sync?

1. Open **Programs and Features** by clicking **Start**.
2. Click **Control Panel**.
3. Under **Programs**, click **Uninstall a program**.
4. Select Desktop Sync, and then click **Uninstall**.

### Can Desktop Sync be installed in an unattended mode?

Yes.

### Can I setup Desktop Sync using a central installation process?

Yes, Desktop Sync installer contains an MSI, which can be used with any central installation tool, such as Microsoft System Center Configuration Manager.

### I'm running Windows in a Virtual Machine. Why is the automatic update for the configuration file not working correctly?

This is due to folder paths in some virtual machines being non-standard Windows paths.

### I'm running Windows in a Virtual Machine. Why is the automatic update not installing correctly?

The download folder path in some virtual machines is a non-standard Window path, and the installer isn't able to start.

### Upon unselecting, not all files are getting removed. What's wrong?

When a file of folder is locked by Windows File Explorer, applications, like Desktop Sync, can not remove that file and folder. In that case, when unsubscribing content or removing the application, some files and folders maybe left behind. They should be removed manually.

### Where do I find the Desktop Sync log file?

If you're having any issues with Desktop Sync then your Alfresco Administrator might ask you to provide the log file.

You can find the log file in the following locations, but be aware that it's a hidden file. If you don't know how to view hidden files then your Alfresco Administrator can help you.

* Windows - `C:\Users\Administrator\AppData\Local\AlfrescoSync.log`

Additionally, you can use applications, such as DebugView to monitor debug output on your computer. To use DebugView, follow the steps below:

1. Download and install [DebugView](https://docs.microsoft.com/en-gb/sysinternals/downloads/debugview){:target="_blank"}.

    DebugView will immediately start capturing debug output.

2. On the top menu bar, click **Edit** and then **Filter/Highlight...**.

    The **DebugView Filter** window appears.

3. To filter and display only the output from the shell extension, specify `AlfrescoSyncExtension` in **Include** and click **OK**.

### I no longer need a site. How do I remove the site and its contents from my desktop?

Go to **Manage Folders** and deselect the sites you no longer need. Click **Sync** to remove the selected files and folders from your desktop.

### Can I use Desktop Sync while I am offline?

You can continue working on your files offline but they will get synced to Alfresco whenever you have a connection to the server.

### Will syncing happen while I am offline?

Sync needs a connection to the server. Syncing will resume when your connection is restored.

### Will my files be versioned in Alfresco?

Yes. All file updates in Alfresco using Desktop Sync are versioned.

### Can I recover a deleted file using Desktop Sync?

Yes. Any file deleted in Alfresco using Desktop Sync is moved to the Alfresco trash can.

### I have changed the site name in Alfresco. Can I continue using Desktop Sync?

Yes, you can continue working with Desktop Sync but the site name won't be updated in the File Explorer.

### Which file extensions are supported by Desktop Sync?

Desktop Sync syncs all file extensions except for the temporary file extensions mentioned below:

```bash
part,thumbdata3--1967290299,thumbdata3--1763508120,crdownload,~cr,exo,tmp,cvr,download,thumbdata3--number,mxdl,tt2,etl,egt
,csi,thumbdata5--1763508120_0,csd,fseventsd-uuid,localstorage-journal,thumbdata5--1967290299_0,dwl,laccdb,torchdownload,thumbdata5,cache,lck,ewc2,!ut
,regtrans-ms,blf,mmsyscache,sfk,filepart,imgcache,dtapart,sav,aaa,thumbdata,h64,lock,rra,bc
,npk,download,adadownload,hex,tec,chkn,steamstart,partial,thumbdata5--1967290299_1,pnf,idlk,lrd,thumbdata5-1763508120_1,fb!
,temp,waf,tmt,dlm,bu,swo,rcv,reapeaks,dap,pkf,fsf,thumbdata3-1763508120,dmp,db-wal
,pft,little,_501,glh,db-shm,box,cfa,installstate,tv5,tbn,sqlite-journal,dat,thumbdata3-1967290299,onecache
,msj,exd,isl,objectcache,nov,dca,thumbdata4--1967290299,swn,rld,temporaryitems,aso,thumbdata5--1967290299_3,rsc_tmp,bdm
,ptn2,indexarrays,id3tag,thumbdata3,cos2,dia,download,cah,wfm,as$,meb,clp,thumbdata5-1763508120_2,thumbdata4--1763508120
,save,heu,nb2,tof,thumbdata5-1763508120_3,bc!,snapdoc,hrd,rsx,)2(,cache-2,prmdc,bridgecachet,tmd
,fuse_hidden,db3-journal,phc,rdn,ims,cache-3,bsd,thumbdata4,ytf,4sh,tic,hax,buf,init
,cdc,bmc,sqlite3-journal,indexpositions,bts,db,wov,dinfo,indexcompactdirectory,bmb,crc,citriodownload,pkc,pm$
,shadowindexgroups,dtf,peb,bom,oemigaccount,utpart,lai,m_p,md0,bdi,00a,appdownload,inprogress,mbc
,mex,qbi,help,tombstone,csstore,adm,qbt,xp,hmap,@@2,indexdirectory,yumtx,@@1,thumbdata5--1967290299_4
,bridgecache,thumbdata5--1967290299_5,zoner-rawdata-cache,wcc,tst,000,ci,onetmp,indexpositiontable,stf,identcache,qdat,out,inf
,shadowindextermids,adblock,filetablelock,wpk,thumbdata5-1967290299_8,xcuserstate,tv2,aria2,mx1,002,ilp,bv4,par,alt
,nc2,a$v,ddat,cpd,escopy,ipe_tempfile,mpgindex,bv1,tv4,$db,db$,pat,bphys,wa~
,clean,thumbdata5--1967290299_7,^fsf,xps~,sss~,chk,iniis,moz,---,bt0,fts,tv7,wlx,nmu
,swd,dov,bde,~$~,~nt,vsscc,jnk,abc,tv3,thumbdata5-1763508120_6,wsb,dmsk,fes,shadowindexcompactdirectory
,ird,thumbdata5-1763508120_5,qtindex,bv2,svn-work,pzx,$ed,tv1,rad,thumbdata5-1763508120_4,thumbdata5-1763508120_0,$vm,thumbdata5-1763508120_7,compo
,preview7,asab,$$$,pls,pet,001,wtmp,lockfile,ger,tb0,pfc,(d),zoner-index-cache,qp1
,blk,zsr,mtx,wid,ipl22,tv6,vdjcache,xp~,lex,xps,cachedmsg,bv3,f2l,lst
,4sw,wtmp,mov,iff,\#$\#,vmdk-converttmp,bv7,t44,dw3,zl,nav2,bv5,bsi,ccc
,asx,ipl,sdx,u96,dir00,qp2,qtmp,s2mi,fdpart,t$m,hmap.dir,journal,spc,als
,simpl_int,r1m,scuf,dem,patchcache,ers,csac,sfm,thumbdata5-1763508120_8,cnv,vmc,file,s,m
,met,mpx,tv8,zn~,thumbdata5-1763508120_20,cdt,db$,thumbdata5-1763508120_12,ebktml,bv6,tv9,bv8,vaf,thumbnail
,ref,\#\#\#,pspcache,c1s,muf,onlineresources,memb,w44,§§§,dir,lvl,bcm,$a,bv9
,fchc,rgt,ncch,grbdropfile,wrk,cached_icon,thumbdata5-1763508120_17,aecache,mdccache,thumbdata5-1763508120_19,lref,1,0
```

### If a file has a file extension which is in the exempted list above, can I include that file in the sync set?

Yes. In the `<userHome>\AppData\Local\Alfresco\AlfrescoSync.conf` file, in the Sync constraints section, 
update the `syncmanager.constraint.1=FileExt|.tmp,.temp` property

### What files should be backed up/restored on the client ?

You can find the synced data in the `C:\Users\<username>\Alfresco` folder. 
The sync client settings/database/logs can be found in the `C:\Users\<username>\AppData\Local\Alfresco` folder.

When the sync client starts up, it uses the modification time stamp from the `AlfrescoSync.time` file in the `AppData\Local\Alfresco` folder to check if any files/folders were changed while Desktop Sync was not running. If you delete and recreate the `AlfrescoSync.time` file after restoring the Desktop Sync data and settings, it would do a full scan of the local and remote folders.

### I have a new computer, is it possible to migrate my Alfresco sync folder to the new computer?

To avoid problems with conflicts on device registration, and content going out of sync during the migration process, you should first remove your account from the deprecated computer, and then setup Alfresco Desktop Sync on the new machine.

{% endcapture %}

{% capture mac %}

### So, what gets synced?

Desktop Sync shows you all your Alfresco sites and folders which you have access to, plus your My Files and Shared Files content. You can select any (or all) of these and click **Sync** to create a local copy of the content on your computer.

Individual files you've favorited aren't displayed and can be synced directly, you need to sync the folder they're in.

Whenever you update any of this local content (which includes adding, moving, and deleting files and folders within the synced area) these changes will automatically be replicated on Alfresco.

Whenever you or anyone else make changes in Alfresco to sites or folders that you've synced with, then these changes will be replicated in your local content.

> **Note:** Some temporary files don't get synced. These include, but aren't limited to `*.tmp`, `*.temp`, `desktop.ini`, `*.~`, and `Thumbs.db` files. You can configure the file types you don't want to be synced in `AlfrescoSync.config`. For more information, see [Configuring Desktop Sync]({% link desktop-sync/1.17/config/index.md %}).

### Can I use Desktop Sync during initial sync?

Yes. During initial sync, any content created on your desktop will be synced only after the initial sync is over.

### Will syncing happen while I am offline?

Sync needs a connection to the server. Syncing will resume when the connection is restored.

### Where can I find my synced files?

The content is synced to `<userHome>/Alfresco`, by default, or whatever location you chose after the initial setup. The `Alfresco` folder can also be found in File Explorer under **Favourites**.

### How many folder levels can I sync?

You can sync as many folder levels on a Mac. This is only a limitation of the Windows File System, where the maximum length for a path should not be more than 260 characters.

### Can I cancel initial sync?

Yes. As a Desktop Sync user, you can either:

* Take your computer offline: You can simply ignore initial sync and shut down your computer or disconnect the network. Initial sync will resume when connection is restored.
* Keep your computer running but discontinue initial sync: You can quit Desktop Sync and initial sync will resume when you restart Desktop Sync.
* Amend your selected content choices by clicking **Return to content selection**.

### I made changes to a local file that aren't showing in Alfresco.

A number of scenarios can cause this:

* The file is held/locked open by an application on your computer.
* Network connection problems, Alfresco connection problems, or synchronization service connection problems; contact your IT team.
* If you've made changes locally that are showing in Alfresco, then make sure that Desktop Sync is running by confirming that the ![Menu bar]({% link desktop-sync/images/ico-ds-alfresco.png %}) icon is showing in the menu bar.
* It's also possible that someone was updating the content in Alfresco at the same time as you were updating the local content. The file is in conflict state. See sync conflict resolution guide for [Mac]({% link desktop-sync/1.17/using/sync-conflict-guide.md %}#faq/mac).

### What's the *orphaned* folder in my local synced drive?

If you deselect synced content in Desktop Sync and click **Sync**, then you're effectively breaking the link between local content and Alfresco content.

The content won't be synced any more. Files that weren't synced to Alfresco due to conflict or deferred can be found in the *orphaned* folder. This folder is automatically created in your synced area and the previously synced content is moved to there.

### If a file is checked out by another user in Alfresco, can I update it?

No, you can't update files that are checked out by other users.

### When will a deferred file be synced?

First you need to find the reason why the file is in a deferred state. The file can be in a deferred state for the following reasons.

* When you don't have free space on your desktop.
* If you have an Office file open and you're saving it to your computer.
* You're not connected to the server.

Resolve the issue and your file will be synced automatically.

### I see a red flag on my menu bar. What does that mean?

See [App icons and context menu]({% link desktop-sync/1.17/using/app-icons.md %}#faq/mac)

If a file is in conflict and the parent folder is also in conflict:

* You can only resolve the parent folder.
* You can't resolve the child as the Finder menu actions aren't visible.
* Any children in conflict are shown in an indented list below the parent.
* Once you select a resolution, the child is resolved using the same choice as the parent.

See also sync conflict resolution guide on [Mac]({% link desktop-sync/1.17/using/sync-conflict-guide.md %}#faq/mac).

### Do I need to restart Desktop Sync when I restart my computer?

No, Desktop Sync is automatically started when your computer starts.

### Can I use Desktop Sync while I am offline?

You can continue working on your files offline and they'll be synced to Alfresco whenever you have a connection to the server.

### What happens to a file/folder which is moved out of Alfresco folder on my desktop?

The moved file or folder is deleted in Alfresco.

### Why can't I see content icons on my files and folders?

If, for some reason, your content icons are hidden in Finder, you can make them visible by checking your **System Preferences**.

See [application icons]({% link desktop-sync/1.17/using/app-icons.md %}#faq/mac) for more details.

Additionally, check if you have accidentally quit Desktop Sync. Upon restart, the icons should be restored.

### What happens if two Alfresco sites have the same name?

If the site name is duplicated, one of the site names will be displayed as `SiteName_01`, for example, `Test Site_01`.

### What happens if the site name is invalid or contains unsupported characters?

A file name can't contain the following characters: `\ / : * ? " < >`. Desktop Sync replaces these characters with underscores, for example, `Test>test` is replaced by `Test_test` on your desktop.

### How do I uninstall Desktop Sync?

See [Uninstalling Desktop Sync]({% link desktop-sync/1.17/install/index.md %}#faq/mac).

### Can Desktop Sync be installed in an unattended mode?

Yes.

### I'm running Windows in a Virtual Machine. Why is the automatic update for the configuration file not working correctly?

This is due to folder paths in some virtual machines being non-standard Windows paths.

### I'm running Windows in a Virtual Machine. Why is the automatic update not installing correctly?

The download folder path in some virtual machines is a non-standard Windows path, and the installer isn't able to start.

### Upon unselecting not all files are getting removed. What's wrong?

When a file or folder is locked by Finder, applications, like Desktop Sync, can't remove that file and folder. In that case, when unsubscribing content or removing the application, some files and folders maybe left behind. They should be removed manually.

### What is the Icon? file in the Alfresco Content Services sync folder?

`Icon?` is a hidden file that's used by Mac OS X to put the Alfresco Content Services logo on the `Alfresco`sync folder in Finder.

### Where do I find the Desktop Sync log file?

If you're having any issues with Desktop Sync, then your IT team might ask you to provide the log file.

You can find the log file in the following location, but be aware that it's a hidden file. If you don't know how to view hidden files, then your IT team can help you.

* `~/Library/Application Support/Alfresco/AlfrescoSync.log`

### Where do I find the Desktop Sync crash log file?

If Desktop Sync quits unexpectedly, a log file is generated that can help to 
identify potential issues on your Mac. To help troubleshoot the issue, your IT team may ask you to provide the crash log.

To find your crash logs follow these steps.

1. In Finder, click on the **Go** menu and select **Go to Folder...**. A text field should appear in Finder.
2. Paste the path `~/Library/Logs/DiagnosticReports/` into the text field and click **Go**.
3. In this folder, find all log files with filename `Alfresco*.crash`.
4. Send these files to your IT team.

### I no longer need a site. How do I remove the site and its contents from my desktop?

Go to **Settings > Manage Sync Folder** and deselect the sites you no longer need. Click **Sync** to remove the selected files and folders from your desktop.

### Can I use Desktop Sync while I am offline?

You can continue working on your files offline but they will get synced to Alfresco whenever you have a connection to the server.

### Will syncing happen while I am offline?

Sync needs a connection to the server. Syncing will resume when your connection is restored.

### Will my files be versioned in Alfresco?

Yes. All file updates synced in Alfresco using Desktop Sync are versioned.

### Can I recover a deleted file using Desktop Sync?

Yes. Any file deleted in Alfresco using Desktop Sync is moved to the Alfresco trashcan.

### Which file extensions are supported by Desktop Sync?

Desktop Sync syncs all file extensions except for the temporary file extensions mentioned below:

```bash
part,thumbdata3--1967290299,thumbdata3--1763508120,crdownload,~cr,exo,tmp,cvr,download,thumbdata3--number,mxdl,tt2,etl,egt
,csi,thumbdata5--1763508120_0,csd,fseventsd-uuid,localstorage-journal,thumbdata5--1967290299_0,dwl,laccdb,torchdownload,thumbdata5,cache,lck,ewc2,!ut
,regtrans-ms,blf,mmsyscache,sfk,filepart,imgcache,dtapart,sav,aaa,thumbdata,h64,lock,rra,bc
,npk,download,adadownload,hex,tec,chkn,steamstart,partial,thumbdata5--1967290299_1,pnf,idlk,lrd,thumbdata5-1763508120_1,fb!
,temp,waf,tmt,dlm,bu,swo,rcv,reapeaks,dap,pkf,fsf,thumbdata3-1763508120,dmp,db-wal
,pft,little,_501,glh,db-shm,box,cfa,installstate,tv5,tbn,sqlite-journal,dat,thumbdata3-1967290299,onecache
,msj,exd,isl,objectcache,nov,dca,thumbdata4--1967290299,swn,rld,temporaryitems,aso,thumbdata5--1967290299_3,rsc_tmp,bdm
,ptn2,indexarrays,id3tag,thumbdata3,cos2,dia,download,cah,wfm,as$,meb,clp,thumbdata5-1763508120_2,thumbdata4--1763508120
,save,heu,nb2,tof,thumbdata5-1763508120_3,bc!,snapdoc,hrd,rsx,)2(,cache-2,prmdc,bridgecachet,tmd
,fuse_hidden,db3-journal,phc,rdn,ims,cache-3,bsd,thumbdata4,ytf,4sh,tic,hax,buf,init
,cdc,bmc,sqlite3-journal,indexpositions,bts,db,wov,dinfo,indexcompactdirectory,bmb,crc,citriodownload,pkc,pm$
,shadowindexgroups,dtf,peb,bom,oemigaccount,utpart,lai,m_p,md0,bdi,00a,appdownload,inprogress,mbc
,mex,qbi,help,tombstone,csstore,adm,qbt,xp,hmap,@@2,indexdirectory,yumtx,@@1,thumbdata5--1967290299_4
,bridgecache,thumbdata5--1967290299_5,zoner-rawdata-cache,wcc,tst,000,ci,onetmp,indexpositiontable,stf,identcache,qdat,out,inf
,shadowindextermids,adblock,filetablelock,wpk,thumbdata5-1967290299_8,xcuserstate,tv2,aria2,mx1,002,ilp,bv4,par,alt
,nc2,a$v,ddat,cpd,escopy,ipe_tempfile,mpgindex,bv1,tv4,$db,db$,pat,bphys,wa~
,clean,thumbdata5--1967290299_7,^fsf,xps~,sss~,chk,iniis,moz,---,bt0,fts,tv7,wlx,nmu
,swd,dov,bde,~$~,~nt,vsscc,jnk,abc,tv3,thumbdata5-1763508120_6,wsb,dmsk,fes,shadowindexcompactdirectory
,ird,thumbdata5-1763508120_5,qtindex,bv2,svn-work,pzx,$ed,tv1,rad,thumbdata5-1763508120_4,thumbdata5-1763508120_0,$vm,thumbdata5-1763508120_7,compo
,preview7,asab,$$$,pls,pet,001,wtmp,lockfile,ger,tb0,pfc,(d),zoner-index-cache,qp1
,blk,zsr,mtx,wid,ipl22,tv6,vdjcache,xp~,lex,xps,cachedmsg,bv3,f2l,lst
,4sw,wtmp,mov,iff,\#$\#,vmdk-converttmp,bv7,t44,dw3,zl,nav2,bv5,bsi,ccc
,asx,ipl,sdx,u96,dir00,qp2,qtmp,s2mi,fdpart,t$m,hmap.dir,journal,spc,als
,simpl_int,r1m,scuf,dem,patchcache,ers,csac,sfm,thumbdata5-1763508120_8,cnv,vmc,file,s,m
,met,mpx,tv8,zn~,thumbdata5-1763508120_20,cdt,db$,thumbdata5-1763508120_12,ebktml,bv6,tv9,bv8,vaf,thumbnail
,ref,\#\#\#,pspcache,c1s,muf,onlineresources,memb,w44,§§§,dir,lvl,bcm,$a,bv9
,fchc,rgt,ncch,grbdropfile,wrk,cached_icon,thumbdata5-1763508120_17,aecache,mdccache,thumbdata5-1763508120_19,lref,1,0
```

### If a file has a file extension which is in the exempted list above, can I include that file in the sync set?

Yes. In the `~/Library/Application Support/Alfresco/AlfrescoSync.conf` file, find the Sync constraints section, and update the `syncmanager.constraint.1=FileExt|.tmp,.temp` property.

### How are files with an unknown or no extension handled?

When a file is renamed in Alfresco Content Services to either an unknown extension (such as `.aaa`) or to remove the extension, it may not open on your computer. Since the file extension is used to associate programs with files, rename the file to a known extension to fix the file association so you can open the file.

### What files should be backed up/restored on the client?

You'll find the synced data in the `<userHome>/Alfresco` folder. The sync client settings/database/logs are in the `~/Library/Application Support/Alfresco` folder.

When the sync client starts up, it uses the modification time stamp from the `AlfrescoSync.time` file in the `/Application Support/Alfresco` folder to check if any files/folders were changed while Desktop Sync wasn't running. If you delete and recreate the `AlfrescoSync.time` file after restoring the Desktop Sync data and settings, it'll do a full scan of the local and remote folders.

### I have a new computer, is it possible to migrate my Alfresco sync folder to the new computer?

To avoid problems with conflicts on device registration, and content going out of sync during the migration process, you should first remove your account from the deprecated computer and then setup Alfresco Desktop Sync on the new machine.

{% endcapture %}

{% include tabs.html tableid="faq" opt1="Windows" content1=windows opt2="Mac" content2=mac %}
