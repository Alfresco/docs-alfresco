---
author: Alfresco Documentation
source: 
---

# Desktop Sync FAQs

Here's a list of common questions about Desktop Sync.

**Initial sync and normal sync**

-   [So, what gets synced?](ds-faqs-mac.md#1)
-   [Can I use Desktop Sync during initial sync?](ds-faqs-mac.md#5)
-   [Will syncing happen while I am offline?](ds-faqs-mac.md#6)
-   [Where can I find my synced files?](ds-faqs-mac.md#15)
-   [How many folder levels can I sync?](ds-faqs-mac.md#22)
-   [Can I cancel initial sync?](ds-faqs-mac.md#21)

**Normal sync**

-   [I made changes to a local file that aren't showing in Alfresco.](ds-faqs-mac.md#2)
-   [What's the *orphaned* folder in my local synced drive?](ds-faqs-mac.md#3)
-   [If a file is checked out by another user in Alfresco, can I update it?](ds-faqs-mac.md#7)
-   [When will a deferred file be synced?](ds-faqs-mac.md#8)
-   [I see a red flag on my menu bar. What does that mean?](ds-faqs-mac.md#9)
-   [Do I need to restart Desktop Sync when I restart my computer?](ds-faqs-mac.md#10)
-   [Can I use Desktop Sync while I am offline?](ds-faqs-mac.md#11)
-   [What happens to a file/folder which is moved out of Alfresco folder on my desktop?](ds-faqs-mac.md#14)
-   [Why can't I see status icons on my files and folders?](ds-faqs-mac.md#19)
-   [What happens if two Alfresco sites have the same name?](ds-faqs-mac.md#25)
-   [What happens if the site name is invalid or contains unsupported characters?](ds-faqs-mac.md#26)

**Install and uninstall**

-   [How do I uninstall Desktop Sync?](ds-faqs-mac.md#16)
-   [Can Desktop Sync be installed in an unattended mode?](ds-faqs-mac.md#17)
-   [Upon unselecting files and folders from the Select files and folders to sync screen not all files are getting removed. What's wrong??](ds-faqs-mac.md#23)

**Manage sites, files, and folders**

-   [What is the Icon? file in the Alfresco Content Services sync folder?](ds-faqs-mac.md#35)
-   [Where do I find the Desktop Sync log file?](ds-faqs-mac.md#4)
-   [Where do I find the Desktop Sync crash log file?](ds-faqs-mac.md#33)
-   [I no longer need a site. How do I remove the site and its contents from my desktop?](ds-faqs-mac.md#20)
-   [Will my files be versioned in Alfresco?](ds-faqs-mac.md#12)
-   [Can I recover a deleted file using Desktop Sync?](ds-faqs-mac.md#13)
-   [Which file extensions are supported by Desktop Sync?](ds-faqs-mac.md#30)
-   [If a file has a file extension which is in the exempted list above, how can I include that file in the sync set?](ds-faqs-mac.md#31)
-   [How are files with an unknown or no extension handled?](ds-faqs-mac.md#34)
-   [What files should be backed up/restored on the client?](ds-faqs-mac.md#32)
-   [I have a new computer, is it possible to migrate my Alfresco sync folder to the new computer?](ds-faqs-mac.md#36)

**So, what gets synced?**

Desktop Sync shows you all your Alfresco sites and folders which you have access to, plus your My Files and Shared Files content. You can select any \(or all\) of these and click **Sync** to create a local copy of the content on your computer.

Individual files you've favorited aren't displayed and can be synced directly, you need to sync the folder they're in.

Whenever you update any of this local content \(which includes adding, moving, and deleting files and folders within the synced area\) these changes will automatically be replicated on Alfresco.

Whenever you or anyone else make changes in Alfresco to sites or folders that you've synced with, then these changes will be replicated in your local content.

**Note:** Some temporary files don't get synced. These include, but aren't limited to `*.tmp`, `*.temp`, `desktop.ini`, `*.~`, and `Thumbs.db` files. You can configure the file types you don't want to be synced in `AlfrescoSync.config`. For more information, see [Configuring Desktop Sync](../concepts/ds-config-mac.md).

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Can I use Desktop Sync during initial sync?**

Yes. During initial sync, any content created on your desktop will be synced only after the initial sync is over.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Will syncing happen while I am offline?**

Sync needs a connection to the server. Syncing will resume when the connection is restored.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Where can I find my synced files?**

The content is synced to <userHome\>/Alfresco. The Alfresco folder can also be found in Finder under **Home**.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**How many folder levels can I sync?**

You can sync as many folder levels on a Mac. This is only a limitation of the Windows File System, where the maximum length for a path should not be more than 260 characters.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Can I cancel initial sync?**

Yes. As a Desktop Sync user, you can either:

-   Take your computer offline: You can simply ignore initial sync and shut down your computer or disconnect the network. Initial sync will resume when connection is restored.
-   Keep your computer running but discontinue initial sync: You can quit Desktop Sync and initial sync will resume when you restart Desktop Sync.
-   Amend your selected content choices by clicking **Return to Content Selection**.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**I made changes to a local file that aren't showing in Alfresco.**

A number of scenarios can cause this:

-   The file is held/locked open by an application on your computer.
-   Network connection problems, Alfresco connection problems, or synchronization service connection problems; contact your IT team.
-   If you've made changes locally that are showing in Alfresco, then make sure that Desktop Sync is running by confirming that the ![Menu bar](../images/ico-ds-alfresco.png) icon is showing in the system tray \(Windows\) or menu bar \(Mac\).
-   It's also possible that someone was updating the content in Alfresco at the same time as you were updating the local content. The file is in conflict state. See [Conflict matrix](../concepts/ds-conflicts-mac.md) on how to resolve the conflict.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**What's the *orphaned* folder in my local synced drive?**

If you deselect synced content in Desktop Sync and click **Sync**, then you're effectively breaking the link between local content and Alfresco content.

The content won't be synced any more. Files that weren't synced to Alfresco due to conflict or deferred can be found in the *orphaned* folder. This folder is automatically created in your synced area and the previously synced content is moved to there.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**If a file is checked out by another user in Alfresco, can I update it?**

No, you can't update files that are checked out by other users.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**When will a deferred file be synced?**

First you need to find the reason why the file is in a deferred state. The file can be in a deferred state for the following reasons.

-   When you don't have free space on your desktop.
-   If you have an Office file open and you're saving it to your computer.
-   You're not connected to the server.

Resolve the issue and your file will be synced automatically.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**I see a red flag on my menu bar. What does that mean?**

See [Working with Desktop Sync](../concepts/ds-working-mac.md) to find out what each of the Desktop Sync icons means.

If a file is in conflict and the parent folder is also in conflict:

-   You can only resolve the parent folder.
-   You can't resolve the child as the Finder menu actions aren't visible.
-   Any children in conflict are shown in an indented list below the parent.
-   Once you select a resolution, the child is resolved using the same choice as the parent.

See [note about conflicts](ds-taskbar-mac.md#conflict).

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Do I need to restart Desktop Sync when I restart my computer?**

No, Desktop Sync is automatically started when your computer starts.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Can I use Desktop Sync while I am offline?**

You can continue working on your files offline and they'll be synced to Alfresco whenever you have a connection to the server.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**What happens to a file/folder which is moved out of Alfresco folder on my desktop?**

The moved file or folder is deleted in Alfresco.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Why can't I see content icons on my files and folders?**

If, for some reason, your content icons are hidden in Finder, you can make them visible by checking your **System Preferences**. See [note about content icons](../concepts/ds-working-mac.md#finder_extension) for more details.

Additionally, check if you have accidentally quit Desktop Sync. Upon restart, the icons should be restored.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**What happens if two Alfresco sites have the same name?**

If the site name is duplicated, one of the site names will be displayed as SiteName\_01, for example, Test Site\_01.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**What happens if the site name is invalid or contains unsupported characters?**

A file name can't contain the following characters: `\ / : * ? " < >`. Desktop Sync replaces these characters with underscores, for example, Test\>test is replaced by Test\_test on your desktop.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**How do I uninstall Desktop Sync?**

See [Uninstalling Desktop Sync](../tasks/ds-uninstall-mac.md).

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Can Desktop Sync be installed in an unattended mode?**

Yes.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Upon unselecting not all files are getting removed. What's wrong?**

When a file or folder is locked by Finder, applications, like Desktop Sync, can't remove that file and folder. In that case, when unsubscribing content or removing the application, some files and folders maybe left behind. They should be removed manually.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**What is the Icon? file in the Alfresco Content Services sync folder?**

`Icon?` is a hidden file that's used by Mac OS X to put the Alfresco Content Services logo on the Alfresco Content Services sync folder in Finder. 

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Where do I find the Desktop Sync log file?**

If you're having any issues with Desktop Sync, then your IT team might ask you to provide the log file.

You can find the log file in the following location, but be aware that it's a hidden file. If you don't know how to view hidden files, then your IT team can help you.

-   ~/Library/Application Support/Alfresco/AlfrescoSync.log

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Where do I find the Desktop Sync crash log file?**

If Desktop Sync quits unexpectedly, a log file is generated that can help to identify potential issues on your Mac. To help troubleshoot the issue, your IT team may ask you to provide the crash log.

To find your crash logs follow these steps.

1.  In Finder, click on the **Go** menu and select **Go to Folder...**. A text field should appear in Finder.
2.  Paste the path ~/Library/Logs/DiagnosticReports/ into the text field and click **Go**.
3.  In this folder, find all log files with filename `Alfresco*.crash`.
4.  Send these files to your IT team.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**I no longer need a site. How do I remove the site and its contents from my desktop?**

Go to **Settings \> Manage Sync Folder** and deselect the sites you no longer need. Click **Sync** to remove the selected files and folders from your desktop.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Can I use Desktop Sync while I am offline?**

You can continue working on your files offline but they will get synced to Alfresco whenever you have a connection to the server.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Will syncing happen while I am offline?**

Sync needs a connection to the server. Syncing will resume when your connection is restored.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Will my files be versioned in Alfresco?**

Yes. All file updates synced in Alfresco using Desktop Sync are versioned.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Can I recover a deleted file using Desktop Sync?**

Yes. Any file deleted in Alfresco using Desktop Sync is moved to the Alfresco trashcan.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**Which file extensions are supported by Desktop Sync?**

Desktop Sync syncs all file extensions except for the temporary file extensions mentioned in the table below:

|part|thumbdata3--1967290299|thumbdata3--1763508120|crdownload|~cr|exo|tmp|cvr|download|thumbdata3--number|mxdl|tt2|etl|egt|
|csi|thumbdata5--1763508120\_0|csd|fseventsd-uuid|localstorage-journal|thumbdata5--1967290299\_0|dwl|laccdb|torchdownload|thumbdata5|cache|lck|ewc2|!ut|
|regtrans-ms|blf|mmsyscache|sfk|filepart|imgcache|dtapart|sav|aaa|thumbdata|h64|lock|rra|bc|
|npk|download|adadownload|hex|tec|chkn|steamstart|partial|thumbdata5--1967290299\_1|pnf|idlk|lrd|thumbdata5-1763508120\_1|fb!|
|temp|waf|tmt|dlm|bu|swo|rcv|reapeaks|dap|pkf|fsf|thumbdata3-1763508120|dmp|db-wal|
|pft|little|\_501|glh|db-shm|box|cfa|installstate|tv5|tbn|sqlite-journal|dat|thumbdata3-1967290299|onecache|
|msj|exd|isl|objectcache|nov|dca|thumbdata4--1967290299|swn|rld|temporaryitems|aso|thumbdata5--1967290299\_3|rsc\_tmp|bdm|
|ptn2|indexarrays|id3tag|thumbdata3|cos2|dia|download|cah|wfm|as$|meb|clp|thumbdata5-1763508120\_2|thumbdata4--1763508120|
|save|heu|nb2|tof|thumbdata5-1763508120\_3|bc!|snapdoc|hrd|rsx|\)2\(|cache-2|prmdc|bridgecachet|tmd|
|fuse\_hidden|db3-journal|phc|rdn|ims|cache-3|bsd|thumbdata4|ytf|4sh|tic|hax|buf|init|
|cdc|bmc|sqlite3-journal|indexpositions|bts|db|wov|dinfo|indexcompactdirectory|bmb|crc|citriodownload|pkc|pm$|
|shadowindexgroups|dtf|peb|bom|oemigaccount|utpart|lai|m\_p|md0|bdi|00a|appdownload|inprogress|mbc|
|mex|qbi|help|tombstone|csstore|adm|qbt|xp|hmap|@@2|indexdirectory|yumtx|@@1|thumbdata5--1967290299\_4|
|bridgecache|thumbdata5--1967290299\_5|zoner-rawdata-cache|wcc|tst|000|ci|onetmp|indexpositiontable|stf|identcache|qdat|out|inf|
|shadowindextermids|adblock|filetablelock|wpk|thumbdata5-1967290299\_8|xcuserstate|tv2|aria2|mx1|002|ilp|bv4|par|alt|
|nc2|a$v|ddat|cpd|escopy|ipe\_tempfile|mpgindex|bv1|tv4|$db|db$|pat|bphys|wa~|
|clean|thumbdata5--1967290299\_7|^fsf|xps~|sss~|chk|iniis|moz|---|bt0|fts|tv7|wlx|nmu|
|swd|dov|bde|~$~|~nt|vsscc|jnk|abc|tv3|thumbdata5-1763508120\_6|wsb|dmsk|fes|shadowindexcompactdirectory|
|ird|thumbdata5-1763508120\_5|qtindex|bv2|svn-work|pzx|$ed|tv1|rad|thumbdata5-1763508120\_4|thumbdata5-1763508120\_0|$vm|thumbdata5-1763508120\_7|compo|
|preview7|asab|$$$|pls|pet|001|wtmp|lockfile|ger|tb0|pfc|\(d\)|zoner-index-cache|qp1|
|blk|zsr|mtx|wid|ipl22|tv6|vdjcache|xp~|lex|xps|cachedmsg|bv3|f2l|lst|
|4sw|wtmp|mov|iff|\#$\#|vmdk-converttmp|bv7|t44|dw3|zl|nav2|bv5|bsi|ccc|
|asx|ipl|sdx|u96|dir00|qp2|qtmp|s2mi|fdpart|t$m|hmap.dir|journal|spc|als|
|simpl\_int|r1m|scuf|dem|patchcache|ers|csac|sfm|thumbdata5-1763508120\_8|cnv|vmc|file|s|m|
|met|mpx|tv8|zn~|thumbdata5-1763508120\_20|cdt|db$|thumbdata5-1763508120\_12|ebktml|bv6|tv9|bv8|vaf|thumbnail|
|ref|\#\#\#|pspcache|c1s|muf|onlineresources|memb|w44|§§§|dir|lvl|bcm|$a|bv9|
|fchc|rgt|ncch|grbdropfile|wrk|cached\_icon|thumbdata5-1763508120\_17|aecache|mdccache|thumbdata5-1763508120\_19|lref|1|0| |

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**If a file has a file extension which is in the exempted list above, can I include that file in the sync set?**

Yes. In the ~/Library/Application Support/Alfresco/AlfrescoSync.conf file, find the Sync constraints section, and update the `syncmanager.constraint.1=FileExt|.tmp,.temp` property.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**How are files with an unknown or no extension handled?**

When a file is renamed in Alfresco Content Services to either an unknown extension \(such as `.aaa`\) or to remove the extension, it may not open on your computer. Since the file extension is used to associate programs with files, rename the file to a known extension to fix the file association so you can open the file.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**What files should be backed up/restored on the client?**

You'll find the synced data in the <userHome\>/Alfresco folder. The sync client settings/database/logs are in the ~/Library/Application Support/Alfresco folder.

When the sync client starts up, it uses the modification time stamp from the `AlfrescoSync.time` file in the /Application Support/Alfresco folder to check if any files/folders were changed while Desktop Sync wasn't running. If you delete and recreate the `AlfrescoSync.time` file after restoring the Desktop Sync data and settings, it'll do a full scan of the local and remote folders.

[back to top](ds-faqs-mac.md#)

![](../images/hr.png)

**I have a new computer, is it possible to migrate my Alfresco sync folder to the new computer?**

To avoid problems with conflicts on device registration, and content going out of sync during the migration process, you should first remove your account from the deprecated computer and then setup Alfresco Desktop Sync on the new machine.

[back to top](ds-faqs-mac.md#)

**Parent topic:**[Using Desktop Sync for Mac](../concepts/desktopsync-using-mac.md)

