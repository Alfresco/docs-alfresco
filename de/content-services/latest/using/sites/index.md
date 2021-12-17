---
title: Erstellen einer Site
menutitle: Erstellen einer Site
---

Nachdem Sie nun Ihr eigenes Dashboard und Profil erstellt haben, sind Sie bereit, eine Site einzurichten.

Die Zusammenarbeit in Alfresco Share basiert auf dem Konzept der Erstellung von Sites, in denen Teams Inhalte gemeinsam nutzen können. Eine Alfresco Share-Site ist jedoch mehr als nur ein Ort zum Teilen und Verwalten von Inhalten. Sie können Meetings und Kalender planen und verwalten, Blogs veröffentlichen und Foren einrichten, in denen Sie Teamdiskussionen führen können, und Sie können Inhalte sogar online schreiben und in einem Wiki veröffentlichen.

## Erstellen einer neuen Site {#creating-a-new-site}

Im ersten Schritt müssen Sie eine Site erstellen und die dazugehörigen Einstellungen wählen.

1.  Klicken Sie im Dashlet **Meine Sites** auf **Site erstellen** oder klicken Sie oben im Bildschirm auf das Menü **Sites** und wählen dann **Site erstellen**.

    Unabhängig davon, welche Methode Sie wählen, wird das Dialogfeld **Site erstellen** aufgerufen.

2.  Geben Sie nun Site-Details ein wie nachstehend beschrieben. Wie Sie sehen, wird der URL-Name automatisch erstellt.

    -   Name: Marketinginhalt
    -   Beschreibung: Diese Site ist für den Austausch von und die Zusammenarbeit an Marketinginhalt bestimmt.
    -   Sichtbarkeit: Öffentlich

        > **Hinweis:** Durch die Definition der Site als **Öffentlich** können alle Benutzer in Ihrer Organisation die Site anzeigen und ihr beitreten. Bei Auswahl von **Moderiert** kann jeder die Site anzeigen, Beitrittsanfragen müssen jedoch vom Site-Manager genehmigt werden. Wenn Sie die Sichtbarkeit der Site auf **Privat** setzen, können nur Benutzer, die von Ihnen, dem Site-Manager, zur einer Site hinzugefügt wurden, die Site anzeigen und ihr beitreten. Die von Ihnen gewählte Einstellung für die Sichtbarkeit wird neben dem Site-Namen angezeigt, wenn sich ein Benutzer auf der Site befindet. Weitere Informationen zu den Einstellungen für die Sichtbarkeit von Sites finden Sie unter [Alfresco Share-Sites](#sites).

    ![Create Site]({% link content-services/images/gs-create-site.png %})

3.  Falls Sie Module wie Records Management installiert haben, steht eine zusätzliche Option für den Typ zur Verfügung. Wählen Sie **Collaboration-Site**, um eine Standard-Site zu erstellen.

4.  Klicken Sie auf **Erstellen**. Das Dashboard für Ihre neue Site wird nun angezeigt.

    Nachdem Sie eine Site erstellt haben, können Sie sie anpassen. Gehen Sie ähnlich vor wie bei Ihrem persönlichen Dashboard.

## Anpassen des Site-Dashboards {#customizing-the-site-dashboard}

Ein Site-Dashboard enthält alle der Site zugewiesenen Informationen und Aktivitäten. Sie können das Site-Dashboard genauso anpassen wie Ihr persönliches Dashboard.

1.  Klicken Sie auf ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) und dann auf **Dashboard anpassen**.

2.  Nehmen Sie am aktuellen Layout keine Änderungen vor und klicken Sie auf **Dashlets hinzufügen**.

    > **Hinweis:** Beachten Sie, wie sich die Dashlets von denen für Ihr persönliches Dashboard unterscheiden. Die persönlichen Dashlets helfen Ihnen bei der Konfiguration dessen, was Sie sehen möchten, wie z.B. Aktivitäten auf Sites, bei denen Sie Mitglied sind, während die Site-Dashlets für die Zusammenarbeit im Team konzipiert sind.

3.  Ziehen Sie das **Wiki-** Dashlet auf Spalte 1 und klicken Sie auf **OK**.


Sie können die Größe der Dashlets auf dem Site-Dashboard gegebenenfalls anpassen. Sie können nun schon fast Inhalt zu Ihrer Site hinzufügen. Es fehlt noch ein Schritt zur weiteren Anpassung der Site.

## Hinzufügen von Funktionen zu einer Site {#adding-features-to-a-site}

Sie können Ihrer Site Funktionen hinzufügen, wie zum Beispiel ein Diskussionsforum, ein Wiki oder einen Blog.

Oben in Ihrem Site-Dashboard befinden sich Tabulatoren für die Bereiche Ihrer Site. Standardmäßig verfügen Sie über Site-Dashboard, Dokumentenbibliothek und Site-Mitglieder. Sie können gegebenenfalls zusätzliche Funktionen für eine Site hinzufügen und [eine Site-Homepage auswählen](#choosing-a-site-homepage). Wenn Sie sich das zuvor hinzugefügte Wiki-Dashlet ansehen, wird angegeben, dass keine Seite konfiguriert wurde. Sie konfigurieren nun ein Wiki für die Site.

1.  Klicken Sie auf ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}) und dann auf **Site anpassen**.

2.  Ziehen Sie die Wiki- und Kalender-Symbole in den Bereich **Aktuell verfügbare Seiten der Site** und klicken Sie auf **OK**.

    > **Hinweis:** Weitere Informationen zu diesen Funktionen finden Sie unter [Funktionen von Alfresco-Sites]({% link content-services/latest/using/sites/features.md %}#site-features).


Nachdem Sie zum Site-Dashboard zurückgekehrt sind, werden Wiki und Kalender angezeigt. Sie haben nun eine Site eingerichtet! Sie können nun Inhalt hinzufügen ...

## Hinzufügen von Benutzern zu Ihrer Site {#adding-users-to-your-site}

Nachdem Sie eine Site erstellt und Inhalt hinzugefügt haben, besteht der nächste Schritt darin, andere Alfresco Share-Benutzer zur Site einzuladen.

1.  Klicken Sie oben im Dashboard auf das Symbol **Benutzer hinzufügen** (![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}), um die Seite **Benutzer hinzufügen** aufzurufen.

    >**Tipp:** Hierfür müsse Sie sich nicht auf Ihrem Site-Dashboard befinden. Die Option **Benutzer hinzufügen** ist von jeder Stelle Ihrer Site verfügbar.

2.  Geben Sie den vollständigen oder teilweisen Namen eines Benutzers ein, den Sie einladen möchten, und klicken Sie auf **Suche**.

    > **Wichtig:** Ein interner Benutzer ist eine Person innerhalb Ihrer Organisation. In diesem Tutorial wird die Testbenutzerin Alice Beecher hinzugefügt. Wenn Ihr Alfresco Content Services-Administrator jedoch bereits Benutzer eingerichtet hat, können Sie auch echte Benutzer hinzufügen.

3.  Klicken Sie auf **Auswählen**, um den Benutzer zur Liste **Benutzerrolle einrichten** hinzuzufügen.

4.  Klicken Sie auf **Rolle auswählen** und wählen Sie **Mitarbeiter**.

    > **Hinweis:** Sie können verschiedene Rollen für verschiedene Benutzer festlegen. Weiter Einzelheiten zu Benutzerrollen finden Sie unter [Benutzerrollen und Berechtigungen]({% link content-services/latest/using/permissions.md %}) in Alfresco Share.

5.  Klicken Sie auf **Benutzer hinzufügen**.


Alle von Ihnen eingeladenen Personen erhalten eine E-Mail-Benachrichtigung und können die Site sofort nutzen.

## Sites {#sites}

Eine Site ist ein Bereich, in dem Sie Inhalte teilen und mit anderen Mitgliedern der Site zusammenarbeiten können.

Jeder Benutzer kann eine Site erstellen. Der Ersteller der Site wird standardmäßig zum Site-Manager, obwohl danach weitere oder alternative Manager hinzugefügt werden können.

Jede Site hat eine Sichtbarkeitseinstellung, die die Site als **Öffentlich**, **Moderiert** oder **Privat** markiert. Diese Einstellung steuert, wer die Site anzeigen kann und wie Benutzer Mitglieder der Site werden.

-   **Öffentliche Site**

    Alle Benutzer können den Inhalt anzeigen, es können jedoch nur Mitglieder der Site mit dem Inhalt arbeiten.

    Jeder Benutzer kann der Site beitreten.

-   **Moderierte Site**

    Alle Benutzer können auf die Site zugreifen, es können jedoch nur Mitglieder der Site den Inhalt sehen und damit arbeiten.

    Benutzer müssen nachfragen, der Site beitreten zu dürfen.

-   **Private Site**

    Nur Mitglieder der Site können auf die Site zugreifen.

    Benutzer müssen von einem Site-Manager zur Site hinzugefügt werden.


Der Manager jeder Site – ob öffentlich oder privat – kann Benutzer hinzufügen.

> **Hinweis:** Die Sichtbarkeitseinstellung einer Site wird neben dem Site-Namen angezeigt, wenn Sie sich auf der Site befinden.

Sie können sich jederzeit selbst von einer Site entfernen, indem Sie in der Site auf ![]({% link content-services/images/settings-icon.png %}) klicken und die Option **Site verlassen** wählen.

## Zugreifen auf vorhandene Sites {#accessing-existing-sites}

Der Zugriff auf eine vorhandene Site ist einfach.

Sie können mit dem Site-Finder oder über das Suchfeld in der Symbolleiste nach Sites suchen, oder Sie erhalten möglicherweise eine E-Mail-Benachrichtigung, dass Sie einer Site hinzugefügt wurden.

Wenn Sie in Alfresco Share einen Link zu einer Site sehen, klicken Sie einfach auf diesen Link, um sich die Site anzusehen.

Sie können alle Sites anzeigen, bei denen Sie Mitglied sind, indem Sie in der Alfresco-Symbolleiste auf **Sites** und dann auf **Meine Sites** klicken.

## Beitritt zu einer Site {#joining-a-site}

Wenn Sie einer Site beitreten, erhalten Sie Zugriff auf die Inhalte, die in dieser Site gespeichert sind.

> **Hinweis:** Sie können im Dashlet **Meine Sites** alle Sites anzeigen, denen Sie zugeordnet sind. Alternativ können Sie in der Symbolleiste auf **Sites** und anschließend auf **Meine Sites** klicken.

1.  Klicken Sie auf **Sites**, um die kürzlich besuchten Sites und die verfügbaren Tools anzuzeigen.

2.  Klicken Sie auf **Site-Finder**.

3.  Geben Sie einen Suchbegriff ein und klicken Sie auf **Suchen**.

    > **Hinweis:** Sie können das Suchfeld leer lassen, um nach allen verfügbaren Sites zu suchen.

    Es werden alle Sites angezeigt, die Ihren Suchkriterien entsprechen. Sie haben nun folgende Möglichkeiten:

    -   **Beitritt** zu einer öffentlichen Site
    -   **Beantragen des Beitritts** zu einer moderierten Site
    -   **Verlassen einer Site**, der Sie zugeordnet sind
    -   **Löschen einer Site**, der Sie als Manager zugeordnet sind

4.  Klicken Sie auf eine Site, um direkt zum Site-Dashboard zu gelangen.

    >**Tipp:** Klicken Sie auf ![Customize Dashboard icon]({% link content-services/images/settings-icon.png %}), um eine Site zu verlassen oder der Site beizutreten (je nachdem, ob Sie bereits Mitglied sind oder nicht). Wenn Sie den Beitritt zu einer moderierten Site beantragen, werden die Site-Manager darüber informiert und Sie müssen warten, bis sie Ihnen den Zugang gewähren.

5.  Klicken Sie auf **Sites**, um die aktuelle Site zu Ihrer Favoritenliste hinzufügen oder daraus zu entfernen.

    >**Tipp:** Wenn Sie eine Site als Favorit markieren, können Sie über das Menü **Sites** schnell auf die Site zugreifen.


## Verlassen einer Site {#leaving-a-site}

Sie können eine Site schnell und einfach verlassen, wenn Sie nicht mehr Mitglied dieser Site sein möchten.

1.  Klicken Sie im Dashboard der Site, die Sie verlassen möchten, auf ![]({% link content-services/images/settings-icon.png %}) und anschließend auf **Site verlassen**.

2.  Klicken Sie auf **OK**, um zu bestätigen, dass Sie die Site verlassen möchten.

    **Einschränkung:** Alle Sites erfordern einen Site-Manager. Wenn Sie der einzige Site-Manager sind, können Sie daher die Site nicht verlassen.

    >**Tipp:** Sie können eine Site auch verlassen, indem Sie im Site-Finder auf **Verlassen** klicken.


## Aufrufen einer Site {#entering-a-site}

Eine Site können Sie an mehreren Stellen in Alfresco Share aufrufen.

Zu Sites, bei denen Sie Mitglied sind, können Sie einfach über das Meine Sites-Dashlet navigieren. Alternativ können Sie auf **Sites** und anschließend in der Symbolleiste auf **Meine Sites** klicken. Wir die aufzurufende Site nicht angezeigt, können Sie auf der Seite **Site-Finder** oder im Suchfeld auf der Symbolleiste danach suchen.

1.  Klicken Sie auf **Home**.

2.  Klicken Sie im Meine Sites-Dashlet auf den Namen der aufzurufenden Site.

    >**Tipp:** Sie können auf ihre Favoriten-Sites oder auf Sites, die Sie kürzlich aufgerufen haben, zugreifen, indem Sie sie im Menü **Sites** auswählen. Sie müssen nicht zu Ihrem Dashboard zurückkehren.


Das Dashboard für die ausgewählte Site wird angezeigt.


## Bewegen innerhalb einer Site {#moving-around-a-site}

Folgende Bereiche sind standardmäßig auf einer Site verfügbar: **Site-Dashboard**,**Dokumentenbibliothek** und **Site-Mitglieder**. Wenn eine Site über zusätzliche Funktionen verfügt, wird das Menü **Mehr** angezeigt.

Zusätzliche Funktionen können vom Site-Manager während dem [Anpassen einer Site](#customizing-a-site) eingerichtet werden.

1.  Klicken Sie auf einer Site auf **Dokumentenbibliothek**,**Site-Mitglieder** oder **Mehr**, und wählen Sie eine Option aus dem Menü **Mehr** aus.

    Die von Ihnen ausgewählte Site-Funktion wird geöffnet. Weitere Details zu den einzelnen Funktionen erhalten Sie über die entsprechenden Links.

    >**Tipp:** Sie können jederzeit auf **Site-Dashboard** klicken, um zum Site-Dashboard zurückzukehren.

## Site-Dashboard {#site-dashboard}

Das Site-Dashboard enthält Informationen, die für die aktuelle Site spezifisch sind. Wie auf Ihrem Benutzer-Dashboard sind auch hier die Site-Informationen in Dashlets organisiert und werden dort angezeigt.

Der Name der Site wird oben auf dem Bildschirm angezeigt. Dem Site-Manager stehen im Tools-Menü ![]({% link content-services/images/settings-icon.png %}) zusätzliche Optionen zur Verfügung sowie die zusätzliche Schaltfläche **Benutzer hinzufügen** ![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}), um die Site und ihre Mitglieder einzurichten und zu verwalten.

Sites bestehen aus verschiedenen Funktionen oder Seiten, die Sie im Menü **Mehr** finden. Jede neue Site enthält nur eine Bibliothek. Ein Site-Manager kann die Site jedoch so anpassen, dass sie eine beliebige Kombination von Seiten enthält, einschließlich Wiki, Blog, Kalender, Diskussionsforum, Weblinks und Datenlisten.

> **Hinweis:** Site-Manager können statt dem Dashboard eine andere [Site-Homepage auswählen](#choosing-a-site-homepage) oder das Dashboard ganz entfernen.

Über den Link **Site-Mitglieder** kann er die Site-Mitgliedschaft verwalten.

> **Hinweis:** Wenn einer Site weitere Funktionen hinzugefügt werden, finden Sie diese Optionen im Menü **Mehr**.

Ein Site-Manager kann die Größe der meisten Dashlets ändern, indem er auf den unteren Rand des Dashlets klickt und ihn zieht, bis es die gewünschte Höhe hat. Diese Änderung wird zwischen den Sitzungen gespeichert.

>**Tipp:** Wenn Sie mit dem Mauszeiger auf eine Dashlet-Kopfzeile zeigen, wird das ![Add Event icon]({% link content-services/images/help-1.png %})-Symbol angezeigt. Klicken Sie auf das Symbol, um eine Erläuterung zur Funktion des Dashlets zu erhalten. Diese bleibt geöffnet, bis Sie sie schließen oder vom Dashboard weg navigieren.

## Auswahl der Site-Homepage {#choosing-a-site-homepage}

Site-Dashboards werden auf allen Alfresco Share-Sites als Standard-Homepage verwendet.

Site-Manager haben die Möglichkeit, das Site-Dashboard auf einzelnen Sites zu entfernen. Die Seite, die daraufhin unter **Aktuell verfügbare Seiten der Site** zuerst aufgeführt wird, wird als Standard-Homepage für die Site festgelegt. Sie können auch das Dashboard beibehalten und die Seiten neu anordnen, um eine andere Seite als Homepage festzulegen.

1.  Geben Sie eine Site ein.

2.  Klicken Sie auf ![]({% link content-services/images/settings-icon.png %}) und anschließend auf **Site anpassen**.

    Das Site-Dashboard wird standardmäßig unter **Aktuell verfügbare Seiten der Site** angezeigt.

3.  Klicken Sie auf **Entfernen**, um das Dashboard von der Site zu entfernen.

    Alternativ können Sie die Reihenfolge unter **Aktuell verfügbare Seiten der Site** so ändern, dass eine andere Seite zuerst aufgelistet wird (von links nach rechts). Diese Seite wird dann als Site-Homepage festgelegt.

4.  Klicken Sie auf **OK**, um Ihre Änderungen zu speichern.

Die Site wird mit zusammen mit der neuen Homepage angezeigt.

Sie können das Site-Dashboard zu einem späteren Zeitpunkt erneut hinzufügen.

## Wozu dienen Site-Dashlets? {#what-can-I-do-with-the-site-dashlets}

Die Dashlets bieten Ihnen nicht nur einen Überblick über die Aktivitäten und Informationen in Alfresco Share, sondern auch Links zu verschiedenen Bereichen in Share, und sie ermöglichen Ihnen, eine Reihe von Aktionen durchzuführen.

>**Tipp:** Wenn ein Benutzername, Site-Name oder Element als Link angezeigt wird, können Sie darauf klicken, um zur entsprechenden Seite zu gelangen. Wenn Sie den Mauszeiger über ein Dashlet bewegen, werden bei einigen Dashlets zusätzliche Optionen angezeigt.

> **Hinweis:** Die Site-Dashlets **RSS Feed**, **RSS-Feed für Alfresco-Add-ons** und **Web-Ansicht** auf dem Site-Dashboard sind identisch mit denen auf Ihrem persönlichen Dashboard. Die Dashlets **Meine Diskussionen**, **Site-Suche** und **Gespeicherte Suche** sind mit denen auf Ihrem Benutzer-Dashboard identisch, die auf dem Site-Dashboard angezeigten Ergebnisse sind jedoch für die Site spezifisch.

Es kann eine beliebige Kombination der Site-Dashlets auf dem Dashboard angezeigt werden:

-   **Site-Mitglieder**

    Zeigt die aktuellen Mitglieder dieser Site (maximal 100 Mitglieder) und die ihnen zugewiesenen Rollen an.

    -   Klicken Sie auf den Namen eines Mitglieds, um sein Benutzerprofil anzuzeigen.
    -   Klicken Sie auf **Alle Mitglieder**, um alle Mitglieder der Site anzuzeigen.
    -   Klicken Sie auf **Benutzer hinzufügen**, um dieser Site Benutzer hinzuzufügen. Diese Option ist nur verfügbar, wenn Sie ein Site-Manager sind.

-   **Site-Inhalt**

    Listet die Bibliotheksinhalte auf, die in den letzten sieben Tagen hinzugefügt oder bearbeitet wurden.

    -   Klicken Sie auf den Namen oder die Miniaturansicht eines Inhaltselements, um eine Vorschau anzuzeigen oder mit diesem Element in der Bibliothek zu arbeiten.
    -   Wählen Sie eine Ansichtsoption aus: **Einfach** oder **Detailliert**.
    -   Markieren Sie ein Element als Favorit, oder entfernen Sie es aus der Favoritenliste (nur in der detaillierten Ansicht).
    -   Markieren Sie ein Element mit **Gefällt mir** oder **Gefällt nicht mehr** (nur in der detaillierten Ansicht).
    -   Klicken Sie auf den Link **Kommentar**, um einen Kommentar zu einem Element hinzuzufügen (nur in der detaillierten Ansicht).

-   **Site-Aktivitäten**

    Verfolgt die neuesten Aktivitäten auf dieser Site, wie z. B. das Hinzufügen, Bearbeiten und Löschen von Inhalten sowie Änderungen der Site-Mitgliedschaft.

    -   Verwenden Sie den Filter, um die Aktivitäten nach Eigentum, Typ und Zeitraum anzuzeigen. Sie können auch nur Ihre Aktivitäten, nur die Aktivitäten anderer Benutzer oder alle Aktivitäten anzeigen. Sie können auch nur eine bestimmte Art von Aktivität anzeigen, wie z. B. Änderungen der Mitgliedschaft oder Statusaktualisierungen.
    -   Klicken Sie auf das RSS-Feed-Symbol, um den Feed zu abonnieren und automatisch Aktualisierungen zu den Aktivitäten zu erhalten.

    > **Hinweis:** Die einzigen Benutzer, die über Löschungen informiert werden, sind der Benutzer, der die Löschung vorgenommen hat, und der Alfresco-Administrator.

-   **Site-Profil**

    Zeigt eine Zusammenfassung der Site-Details an.

-   **Site-Kalender**

    Listet die bevorstehenden Ereignisse auf, die im Kalender dieser Site geplant sind.

-   **Wiki**

    Zeigt eine ausgewählte Seite aus dem Site-Wiki an.

    -   Klicken Sie auf den Namen der Wiki-Seite in der Dashlet-Kopfzeile, um zum Wiki zu gelangen.
    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um eine andere Wiki-Seite auszuwählen, die im Dashlet angezeigt werden soll. Diese Option ist nur verfügbar, wenn Sie ein Site-Manager sind.

-   **Site-Links**

    Zeigt die von den Benutzern der Site erstellten Weblinks an.

    -   Klicken Sie auf einen Link, um die entsprechende Webseite zu öffnen.
    -   Klicken Sie auf das Detailsymbol des Links ![]({% link content-services/images/ico-link-details.png %}), um den vollständigen Link und alle zugehörigen Kommentare anzuzeigen.

-   **Bildvorschau**

    Zeigt eine Miniaturansicht aller in der Bibliothek der Site gespeicherten Bilder an.

    -   Klicken Sie auf eine Miniaturansicht, um das Bild im aktuellen Fenster zu öffnen.
    -   Klicken Sie auf das Symbol **Details anzeigen**, um eine Vorschau zu erhalten oder mit dem Bild in der Bibliothek zu arbeiten.
    -   Klicken Sie auf das Symbol **Herunterladen**, um eine Kopie des Bildes auf Ihren Computer herunterzuladen.
    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um einen Ordner anzugeben. Das Dashlet zeigt nur die Bilder in diesem Ordner an.

-   **Übersicht Dateityp auf Site**

    Zeigt eine detaillierte Aufschlüsselung aller in der Bibliothek der Site gespeicherten Dateien an.

    -   Bewegen Sie den Mauszeiger über einen Abschnitt des Diagramms, um weitere Details anzuzeigen.

-   **Übersicht Site-Beitragender**

    Zeigt eine Aufschlüsselung aller Mitglieder der Site an, die Inhalte in die Bibliothek der Site einbringen.

    -   Wählen Sie einen Zeitraum aus, für den die Beiträge angezeigt werden sollen.
    -   Bewegen Sie den Mauszeiger über einen Abschnitt des Diagramms, um weitere Details zu einem spezifischen Beitragenden anzuzeigen.
    -   Klicken Sie auf einen Abschnitt des Diagramms, um das Benutzerprofil zu öffnen.

-   **Web-Ansicht**

    Zeigt eine Webseite an, die von einem Site-Manager konfiguriert wurde.

    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um eine andere Webseite auszuwählen, die angezeigt werden soll.

-   **Site-Hinweis**

    Zeigt eine benutzerdefinierte Meldung an, die von einem Site-Manager veröffentlicht wurde.

    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um die Meldung zu bearbeiten oder zu ändern. Diese Option ist nur verfügbar, wenn Sie ein Site-Manager sind.

    >**Tipp:** Dieser Dashlet-Titel kann angepasst werden, so dass das Dashlet wahrscheinlich eine andere Bezeichnung als **Site-Hinweis** hat.

-   **RSS-Feed**

    Zeigt standardmäßig den Alfresco-Website-Feed an.

    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um den RSS-Feed zu ändern.

-   **Alfresco Add-ons RSS Feed**

    Zeigt standardmäßig den Feed für die neuesten Add-ons von der Alfresco Add-ons-Webseite an.

    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um den RSS-Feed zu ändern.

-   **Datenlisten der Site**

    Listet die Datenlisten der Site auf.

    -   Klicken Sie auf eine Liste, um sie zu öffnen.
    -   Klicken Sie auf **Datenliste erstellen**, um eine neue Liste für diese Site zu erstellen. Diese Aktion ist für Benutzer mit der Rolle **Verbraucher** nicht verfügbar.

-   **Meine Diskussionen**

    Zeigt die neuesten Themen an, die im Diskussionsforum der Site erstellt wurden.

    -   Verwenden Sie den Filter, um die Informationen auszuwählen, die Sie sehen möchten.

-   **Site-Site**

    Ermöglicht die Suche in der aktuellen Site.

    -   Geben Sie Suchkriterien ein, und klicken Sie auf **Suchen**(oder drücken Sie die EINGABETASTE).
    -   Wählen Sie die maximale Anzahl von Ergebnissen aus, die Sie anzeigen möchten.

-   **Gespeicherte Suche**

    Zeigt die Ergebnisse einer vorkonfigurierten Suche an.

    -   Klicken Sie auf das Symbol **Konfigurieren** ![]({% link content-services/images/ico-configure.png %}), um die Suche zu definieren.

## Konfigurieren von RSS-Feed-Dashlets {#configuring-the-rss-feed-dashlets}

Es gibt zwei RSS-Feed-Dashlets, die Sie Ihrem persönlichen Dashboard und Site-Dashboards hinzufügen können: RSS-Feed und Alfresco Add-ons RSS-Feed. Für beide Dashlets können Sie die Standard-URL bearbeiten, um beliebige RSS-Feeds anzuzeigen.

1.  Klicken Sie im Dashlet-Titel auf das Symbol **Konfigurieren**.

2.  Geben Sie den Feed an, den Sie abonnieren möchten.

3.  Wählen Sie die Anzahl der anzuzeigenden Feed-Elemente aus.

4.  Wählen Sie **Links in neuem Fenster öffnen**, um die Zielstory in einem neuen Fenster anzuzeigen.

5.  Klicken Sie auf **OK**.

## Konfigurieren des Wiki-Dashlets {#configuring-the-wiki-dashlet}

Konfigurieren Sie das Dashlet der Wiki-Site, um den Inhalt einer bestimmten Wiki-Seite anzuzeigen.

Um diese Aufgabe durchführen zu können, muss das Wiki mindestens eine Seite enthalten. Nur Site-Manager können dieses Dashlet konfigurieren.

1.  Geben Sie eine Site ein.

2.  Klicken Sie im Wiki-Dashlet auf **Konfigurieren**.

    Im Dialogfeld **Wiki-Seite auswählen** werden alle Seiten dieses Site-Wikis angezeigt.

3.  Wählen Sie die Seite aus, die Sie im Dashlet anzeigen möchten.

4.  Klicken Sie auf **OK**.

## Einrichten des Dashlets für Site-Hinweise {#setting-up-the-site-notice-dashlet}

Richten Sie das Dashlet für Site-Hinweise ein, um eine Nachricht für die Benutzer der Site anzuzeigen.

Nur Site-Manager können dieses Dashlet einrichten.

1.  Geben Sie eine Site ein.

2.  Klicken Sie im Dashlet für Site-Hinweise auf das Symbol **Konfigurieren**.

    > **Hinweis:** Wenn dieses Dashlet bereits bearbeitet wurde, wird es wahrscheinlich einen anderen Titel als **Site-Hinweis** haben.

    Das Dialogfeld **Site-Hinweis konfigurieren** wird geöffnet.

3.  Geben Sie im Feld **Titel** den Text ein, der im Header des Dashlets angezeigt werden soll.

4.  Bearbeiten Sie im Feld **Text** die aktuelle Nachricht oder geben Sie eine neue Nachricht ein.

    Verwenden Sie die zur Verfügung stehenden Funktionen zum Formatieren des Textes, zum Einfügen von Listen mit Aufzählungszeichen und von nummerierten Listen, zum Hinzufügen von Links und Bildern und zum Aufrufen der Hilfe bei der Bearbeitung.

5.  Klicken Sie auf **OK**.

## Verwalten einer Site {#managing-a-site}

Die Erstellung einer Site ist schnell und einfach. Anschließend können Sie die Site anpassen, damit Sie eine voll funktionsfähige Projekt-Site haben.

Wenn Sie eine neue Site erstellen, werden Sie automatisch der Manager dieser Site. Hierdurch haben Sie den vollen Zugriff auf die Funktionen der Site.

## Erstellen einer Site {#creating-a-site}

Sie können eine Site innerhalb von Alfresco Share an jeder beliebigen Stelle erstellen. Sie werden für jede von Ihnen erstellte Site automatisch zum Manager ernannt.

>**Tipp:** Eine Site *kann* mehrere Manager haben.

1.  Rufen Sie in der Symbolleiste das Menü **Sites** auf und klicken Sie auf **Site erstellen**.

    >**Tipp:** Sie können eine Site auch im Dashlet **Meine Sites** erstellen: Klicken Sie dazu auf **Site erstellen**.

2.  Geben Sie die Site-Details ein:

    -   **Name**: Der Titel der Site.
    -   **URL-Name**: Wie Sie sehen, wird der URL-Name automatisch erstellt. Sie können diesen jedoch bei Bedarf bearbeiten.
    -   **Beschreibung**: Geben Sie eine Beschreibung zum Zweck der Site für die Benutzer ein.

3.  Falls Sie Module wie Records Management installiert haben, steht eine zusätzliche Option für den Typ zur Verfügung. Wählen Sie **Collaboration**, um eine Standard-Site zu erstellen.

4.  Legen Sie die Site-Sichtbarkeit fest:

    -   **Öffentlich**: Alle Benutzer können innerhalb ihres Unternehmens eine öffentliche Site anzeigen, unabhängig davon, ob sie der Site beigetreten sind oder nicht. Benutzer, die der Site beitreten, werden als Site-Mitglieder aufgelistet und können die Site-Inhalte – abhängig von den ihnen zugewiesenen Rollen – bearbeiten.
    -   **Moderiert**: Bei dieser Option gelten dieselben Regeln wie für **öffentliche** Sites; der Site-Manager muss jedoch die Anforderung des Benutzers zum Beitritt genehmigen.
    -   **Privat**: Diese Option ist nur für den Site-Manager und alle Benutzer verfügbar, die zur Site hinzugefügt wurden.

    > **Hinweis:** Die von Ihnen gewählte Einstellung für die Sichtbarkeit wird neben dem Site-Namen angezeigt, wenn sich ein Benutzer auf der Site befindet. Weitere Informationen zu den Einstellungen für die Sichtbarkeit von Sites finden Sie unter [Alfresco Share-Sites](#sites).

5.  Klicken Sie auf **Speichern**.

Das Dashboard für die neue Site wird angezeigt und Sie können das Dashboard nun anpassen. Von Ihnen erstellte Sites werden automatisch zu Ihrer Liste **Favoriten** hinzugefügt.

## Anpassen einer Site {#customizing-a-site}

Nach Erstellung einer Site können Sie die Site anpassen, um zusätzliche Funktionen hinzuzufügen.

Jede neue Site enthält eine Bibliothek. Der Site-Manager kann [weitere Funktionen hinzufügen]({% link content-services/latest/using/sites/features.md %}#site-features) – z. B. ein Wiki, einen Blog oder einen Kalender. Diese Funktionen können mittels Umbenennung oder durch die Erstellung eines Designs oder Farbschemas weiter angepasst werden. Außerdem können eine [Homepage-Site auswählen](#choosing-a-site-homepage).

1.  Geben Sie eine Site ein.

2.  Klicken Sie auf ![]({% link content-services/images/settings-icon.png %}) und anschließend auf **Site anpassen**.

3.  Wählen Sie ein Site-Thema.

4.  Ziehen Sie Seiten aus dem Bereich **Verfügbare Seiten der Site** zum Bereich **Aktuell verfügbare Seiten der Site**, um sie zur Site hinzuzufügen.

    Sie müssen die Seiten einzeln verschieben. Sie können Seiten auch an eine andere Stelle verschieben, um sie auf der Site in der gewünschten Anordnung anzuzeigen. Die Seite ganz außen links wird als Site-Homepage festgelegt.

    > **Hinweis:** Sie können im Bereich **Aktuell verfügbare Seiten der Site** Seiten **umbenennen** oder von einer Site **entfernen**.

5.  Klicken Sie auf **OK**, um Ihre Änderungen zu speichern.

Im Site-Dashboard wird das neue Thema angezeigt (falls ein Thema ausgewählt wurde). Sie können die neuen Seiten auswählen, indem Sie im Dashboard auf **Mehr** klicken.

Auf der benutzerdefinierten Site können Sie nun das Site-Dashboard anpassen, um Informationen anzuzeigen, die für die Site relevant sind.

## Anpassen des Site-Dashboards {#customizing-the-site-dashboard}

Ebenso wie Ihr Benutzer-Dashboard werden auch Site-Informationen organisiert und in Dashlets angezeigt. Als Site-Manager können Sie das Layout der Site ändern, Dashlets auswählen und die Anzeigereihenfolge konfigurieren.

>**Tipp:** Mithilfe von Filtern können Sie im Dashlet **Site-Aktivitäten** die angezeigten Aktivitäten anpassen. Sie können mehrere Kopien dieses Dashlets hinzufügen und anschließend die Filter so einstellen, dass jeder Filter unterschiedliche Informationen anzeigt.

1.  Geben Sie eine Site ein.

2.  Klicken Sie auf ![]({% link content-services/images/settings-icon.png %}) und anschließend auf **Dashboard anpassen**.

    Auf der Seite **Dashboard anpassen** werden das aktuelle Layout und die Konfiguration Ihres Dashboards angezeigt.

3.  Layout des Site-Dashboards ändern:

    1.  Klicken Sie auf **Layout ändern**.

    2.  Klicken Sie auf das Layout, das Sie verwenden möchten. Sie können auf das Bild oder die daneben liegende Schaltfläche **Auswählen** klicken.

4.  Site-Dashlets auswählen:

    1.  Klicken Sie auf **Dashlets hinzufügen**.

    2.  Ziehen Sie Dashlets aus dem Abschnitt **Dashlets hinzufügen** per Drag & Drop auf die folgenden Spalten.

        >**Tipp:** Einige Dashlets beziehen sich auf bestimmte Site-Funktionen – so zeigt beispielsweise das Wiki-Dashlet eine Seite aus dem Site-Wiki an. Wenn Sie der Site kein Wiki hinzugefügt haben, ist das Wiki-Dashlet leer.

    3.  Ziehen Sie ein Dashlet per Drag-and-Drop in den Mülleimer, um es zu entfernen (oder drücken Sie LÖSCHEN).

5.  Ziehen Sie die Dashlets innerhalb und zwischen den Spalten, um die Anzeigereihenfolge zu organisieren.

6.  Klicken Sie auf **OK**, um die Dashboard-Konfiguration zu speichern.

    Sie können die Größe der meisten Dashlets ändern. Klicken Sie auf den unteren Rand des Dashlets, und ziehen Sie ihn, bis er die gewünschte Höhe erreicht hat.

## Bearbeiten von Site-Details {#editing-site-details}

Sie können den Namen, die Beschreibung und die Sichtbarkeit einer Site nach deren Erstellung ändern.

Nur Site-Manager können die Site-Details bearbeiten.

1.  Geben Sie eine Site ein.

2.  Klicken Sie auf ![Settings icon]({% link content-services/images/settings-icon.png %}) und anschließend auf **Site-Details bearbeiten**.

3.  Ändern Sie die Site-Details nach Bedarf.

    Sie können den URL-Namen der Site nicht ändern.

4.  Klicken Sie auf **OK**.

## Hinzufügen von Sites zu den Favoriten {#favoriting-a-site}

Sie können eine Site als Favorit markieren, um sie im Site-Menü zur Favoritenliste hinzuzufügen. Dies ermöglicht Ihnen, in Alfresco Share überall im Handumdrehen auf die Site zugreifen. Sie können auf diese Weise beliebig viele Sites markieren.

-   Rufen Sie innerhalb einer Site über die Symbolleiste das Menü **Sites** auf und klicken Sie auf **Aktuelle Site zu den Favoriten hinzufügen**.

    > **Hinweis:** Wenn eine Site bereits als Favorit markiert wurde, können Sie stattdessen die Option **Site aus den Favoriten entfernen** wählen.

    Die aktuelle Site wird nun im Menü **Sites** und im Dashlet **Meine Sites** innerhalb der Liste **Favoriten** angezeigt.

## Löschen einer Site {#deleting-a-site}

Löschen Sie eine Site, um die Site und deren Inhalte in den Papierkorb zu verschieben.

Nur Site-Manager können eine Site löschen.

1.  Geben Sie eine Site ein.

2.  Klicken Sie auf ![Settings icon]({% link content-services/images/settings-icon.png %}) und anschließend auf **Site löschen**.

3.  Klicken Sie auf **OK**, um den Löschvorgang zu bestätigen.

    Die ausgewählte Site und alle zugehörigen Inhalte werden gelöscht. Die Rollen der Site-Mitglieder werden gespeichert, für den Fall, dass Sie die Site wiederherstellen möchten. Wenn Sie Ihren Papierkorb leeren, werden alle Site-Details und Site-Inhalte – einschließlich der Rollen der Site-Mitglieder – dauerhaft gelöscht.

    > **Hinweis:** Sie können Sites auch über den **Site-Finder** löschen.

## Verwalten von Site-Mitgliedern {#managing-site-members}

Site-Benutzer können leicht erkennen, wer noch Mitglied der Site ist, und Site-Manager können Benutzerrollen bearbeiten und einen Benutzer von der Site entfernen.

Rufen Sie eine Site auf, und klicken Sie auf **Site-Mitglieder**, um Mitglieder der Site anzuzeigen oder zu suchen.

-   **Benutzer**

    Verwenden Sie diese Seite, um nach einem Mitglied der Site zu suchen oder eine Liste aller Mitglieder anzuzeigen. Ein Site-Manager kann hier Benutzer hinzufügen, Benutzerrollen bearbeiten und Site-Mitglieder entfernen.

-   **Gruppen**

    Auf dieser Seite können Sie nach einer Site-Gruppe suchen oder eine Liste aller Gruppen anzeigen. Ein Site-Manager kann hier Gruppen zur Site hinzufügen, die Rolle einer Gruppe ändern und eine Site-Gruppe entfernen.

-   **Ausstehend**

    Verwenden Sie diese Seite, um Benutzer anzuzeigen, die für die Site eingeladen wurden oder angefordert haben, der Site beitreten zu können. Hier können Sie Einladungen auch stornieren. Die Seite **Ausstehend** wird nur für Site-Manager angezeigt.

    > **Hinweis:** Ab Alfresco Share-Version 5.1 werden Einladungen nur dann versendet, wenn der Alfresco-Administrator diese Option speziell konfiguriert hat. Wenn dies nicht der Fall ist, können Benutzer auf eine Site zugreifen, sobald sie von einem Site-Manager hinzugefügt wurden.

## Hinzufügen von Benutzern zu einer Site {#adding-users-to-a-site}

Site-Manager können Benutzer im Handumdrehen zu einer Site hinzufügen.

Sie können jeden beliebigen Benutzer – intern oder extern – zu Ihrem Unternehmen hinzufügen.

> **Hinweis:** Externe Benutzer können nur hinzugefügt werden, wenn Ihr Alfresco-Administrator das [Feld für externe Benutzer aktiviert]({% link content-services/5.2/develop/share-ext-points/share-config.md %}#enabling-external-users-panel) hat.

1.  Klicken Sie auf der Site, zu der Sie Benutzer hinzufügen möchten, auf ![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}). Klicken Sie alternativ im Dashlet für Site-Mitglieder auf **Benutzer hinzufügen**.

    >**Tipp:** Sie können die Seite **Benutzer hinzufügen** auch direkt über die Seite **Site-Mitglieder** öffnen.

    > **Wichtig:** Sie müssen ein Site-Manager sein, um Benutzer hinzufügen zu können.

2.  Geben Sie einen Suchbegriff ein (z. B. einen Benutzernamen) und klicken Sie auf **Suchen**.

    >**Tipp:** Sie müssen mindestens ein Zeichen eingeben. Bei der Suche wird nicht zwischen Groß- und Kleinschreibung unterschieden.

    > **Hinweis:** Wenn keine Benutzer angezeigt werden, verwenden Sie einen anderen Suchbegriff und überprüfen Sie, ob Ihr Alfresco-Administrator [Benutzer erstellt]({% link content-services/5.2/admin/users-groups.md %}#managing-users) hat.

3.  Klicken Sie für jeden Benutzer, den Sie hinzufügen möchten, auf **Auswählen**.

4.  Legen Sie die Site-Rolle für die einzelnen Benutzer fest oder verwenden Sie die Option **Alle Rollen setzen auf**, um allen Benutzern dieselbe Rolle zuzuweisen. Auf diese Weise wird festgelegt, welche Aktionen Benutzer auf der Site ausführen können.

    >**Tipp:** Weitere Informationen über Site-Rollen finden Sie unter [Benutzerrollen und Berechtigungen]({% link content-services/latest/using/permissions.md %}).

    Nachdem Sie die Site-Rollen für alle von Ihnen ausgewählten Benutzer festgelegt haben, wird die Schaltfläche **Benutzer hinzufügen** aktiviert.

5.  Klicken Sie auf **Benutzer hinzufügen**.

    Eine Meldung mit der Anzahl der von Ihnen hinzugefügten Benutzer wird angezeigt. All diese Benutzer erhalten eine E-Mail-Benachrichtigung und können nun die Site nutzen. Sie können bei Bedarf weitere Benutzer hinzufügen.

    > **Hinweis:** Diese Funktion ist deaktiviert, wenn Ihre Installation die Einladung neuer Benutzer nicht unterstützt. Besprechen Sie mit Ihrem Systemadministrator die Aktivierung dieser Funktion mithilfe der Eigenschaft 'notification.email.siteinvite'. Weitere Informationen finden Sie unter [Konfigurationseigenschaften für ausgehendes SMTP]({% link content-services/5.2/config/email.md %}#outbound-smtp-configuration-properties).

## Genehmigen von Benutzern für den Beitritt zu einer moderierten Site {#approving-users-to-join-a-moderated-site}

Wenn ein Benutzer den Beitritt zu einer moderierten Site anfordert, muss die Anfrage von einem Site-Manager genehmigt werden.

Wenn der Beitritt zu einer Site angefordert wird, erhalten die Manager der Site eine E-Mail-Nachricht und ihnen wird eine neue Genehmigungsaufgabe zugewiesen. Jeder Manager kann diese Aufgabe durchführen.

1.  Klicken Sie auf **Site-Mitglieder** und anschließend auf **Ausstehend**.

    Eine Liste der ausstehenden Anträge für den Site-Beitritt wird angezeigt.

    >**Tipp:** Sie können auch auf **Aufgaben** und anschließend auf **Meine Aufgaben** klicken, um zur Genehmigungsaufgabe zu gelangen, oder direkt über die gesendete Benachrichtigungs-E-Mail darauf zugreifen.

    > **Hinweis:** Alle ausstehenden Einladungen werden ebenfalls angezeigt. Ab Alfresco One, Version 5.1 oder höher, können Benutzer nur dann zu Sites hinzugefügt und Einladungen gesendet werden, wenn Ihr Alfresco-Administrator diese Option speziell konfiguriert hat.

2.  Klicken Sie auf **Genehmigen** oder auf **Anzeigen**, um die Genehmigungsaufgabe anzuzeigen, in der Sie die Beitrittsanfrage genehmigen, ablehnen und kommentieren können.

    Die Aufgabe wird aus Ihrer Aufgabenliste gelöscht und der Benutzer wird zur Site hinzugefügt.

## Hinzufügen von Gruppen zu einer Site {#adding-groups-to-a-site}

Es kann sehr zeitaufwendig sein, Benutzer einzeln für den Beitritt zu Ihrer Site einzuladen. Um Zeit zu sparen, können Sie ganze Benutzergruppen hinzufügen.

1.  Klicken Sie auf der Site, zu der Sie Gruppen hinzufügen möchten, auf ![Invite to Site]({% link content-services/images/invite-to-site-icon.png %}). Klicken Sie alternativ im Dashlet für Site-Mitglieder auf **Benutzer hinzufügen**.

    >**Tipp:** Sie können die Seite **Benutzer hinzufügen** direkt über die Seite **Site-Mitglieder** öffnen.

    > **Wichtig:** Sie müssen ein Site-Manager sein, um Gruppen hinzufügen zu können.

2.  Klicken Sie auf **Gruppen** und anschließend auf **Gruppen hinzufügen**.

3.  Geben Sie einen Suchbegriff ein (z. B. einen Gruppennamen), und klicken Sie auf **Suchen**.

    >**Tipp:** Sie müssen mindestens ein Zeichen eingeben. Bei der Suche wird nicht zwischen Groß- und Kleinschreibung unterschieden.

4.  Klicken Sie für jede Gruppe, die Sie hinzufügen möchten, auf **Hinzufügen**.

5.  Legen Sie die Site-Rolle für die einzelnen Gruppen fest oder verwenden Sie die Option **Alle Rollen setzen auf**, um allen Gruppen dieselbe Rolle zuzuweisen. Auf diese Weise wird festgelegt, welche Aktionen Gruppen auf der Site ausführen können.

    >**Tipp:** Weitere Informationen über Site-Rollen finden Sie unter [Benutzerrollen und Berechtigungen]({% link content-services/latest/using/permissions.md %}).

    Nachdem Sie die Site-Rollen für alle von Ihnen ausgewählten Gruppen festgelegt haben, wird die Schaltfläche **Gruppen hinzufügen** aktiviert.

6.  Klicken Sie auf **Gruppen hinzufügen**, um die aufgeführten Gruppen hinzuzufügen.

    Eine Meldung mit der Anzahl der von Ihnen hinzugefügten Gruppen wird angezeigt. Alle diese Gruppen können nun die Site nutzen. Sie können bei Bedarf weitere Gruppen hinzufügen.

    > **Hinweis:** Klicken Sie auf **Zurück zu Site-Gruppen**, wenn Sie zur Seite **Suche nach Gruppen in dieser Site** zurückzukehren möchten, ohne Gruppen hinzuzufügen.

## Überprüfen von Site-Mitgliedern {#reviewing-the-site-members}

Verwenden Sie die Suchfunktion, um ein bestimmtes Site-Mitglied zu finden. Sie haben auch die Möglichkeit, alle Site-Mitglieder aufzulisten.

1.  Klicken Sie auf einer Site auf **Site-Mitglieder** oder **Mehr** und anschließend auf **Site-Mitglieder**, wenn die Site über zusätzliche Funktionen verfügt.

    >**Tipp:** Sie können auch auf **Gruppen** klicken, um Gruppen anzuzeigen, die Mitglieder der Site sind.

2.  Geben Sie den vollständigen Namen oder einen Teil eines Benutzernamens ein.

    >**Tipp:** Lassen Sie das Suchfeld leer, um alle Site-Mitglieder anzuzeigen.

3.  Klicken Sie auf **Suchen**.

## Überprüfen von Site-Gruppen {#reviewing-site-groups}

Verwenden Sie die Suchfunktion, um ein bestimmtes Site-Mitglied zu finden. Sie haben auch die Möglichkeit, alle Site-Mitglieder aufzulisten.

1.  Klicken Sie auf einer Site auf **Site-Mitglieder** oder **Mehr** und anschließend auf **Site-Mitglieder**, wenn die Site über zusätzliche Funktionen verfügt.

2.  Klicken Sie auf **Gruppen**.

3.  Geben Sie den vollständigen Namen oder einen Teil eines Site-Gruppennamens ein.

    >**Tipp:** Lassen Sie das Suchfeld leer, um alle Site-Mitglieder anzuzeigen.

4.  Klicken Sie auf **Suchen**.

## Ändern von Site-Rollen {#changing-a-site-role}

Site-Manager können die verfügbaren Site-Aktionen von Mitgliedern oder Gruppenrollen ändern.

1.  Klicken Sie auf einer Site auf **Site-Mitglieder** oder **Mehr** und anschließend auf **Site-Mitglieder**, wenn die Site über zusätzliche Funktionen verfügt.

2.  Wählen Sie in der Komponente **Mitglieder** die Option **Benutzer** oder **Gruppen**.

3.  Suchen Sie das Site-Mitglied bzw. die Site-Gruppe, dessen/deren Rolle Sie ändern möchten.

    Geben Sie den vollständigen Namen oder einen Teil des Namens ein oder lassen Sie das Suchfeld leer, um alle Mitglieder bzw. Gruppen anzuzeigen. Die Ergebnisliste enthält die zugeordnete Rolle.

4.  Klicken Sie auf die aktuelle Rolle und wählen Sie eine neue Rolle aus der Liste aus.

## Site-Manager werden {#becoming-a-site-manager}

Wenn es sich bei Ihrem Konto um ein Administratorkonto handelt, können Sie sich selbst zum Site-Manager einer beliebigen Site ernennen, bei der Sie Mitglied sind.

> **Hinweis:** Benutzer, die kein Alfresco-Administrator sind, verfügen nicht über diese Option. Sie müssen einen Rollenwechsel bei einem bestehenden Site-Manager beantragen.

1.  Klicken Sie auf einer Site auf ![]({% link content-services/images/settings-icon.png %}) und anschließend auf **Site-Manager werden**.

Sie sind jetzt ein Manager dieser Site. Sie werden bemerken, dass beim Klicken auf ![]({% link content-services/images/settings-icon.png %}) zusätzliche Optionen zur Verfügung stehen.

## Entfernen von Site-Mitgliedern oder Site-Gruppen {#removing-a-site-member-or-site-group}

Wenn Sie Mitglieder oder Gruppen von einer Site entfernen, können diese nicht mehr auf die Site zugreifen; sie können der Site jedoch erneut beitreten, wenn diese öffentlich ist.

> **Hinweis:** Nur Site-Manager können Mitglieder von einer Site entfernen.

1.  Klicken Sie auf einer Site auf **Site-Mitglieder** oder **Mehr** und anschließend auf **Site-Mitglieder**, wenn die Site über zusätzliche Funktionen verfügt.

2.  Wählen Sie **Benutzer** oder **Gruppen** aus.

3.  Suchen Sie das Site-Mitglied bzw. die Site-Gruppe, die Sie entfernen möchten.

    Geben Sie den vollständigen Namen oder einen Teil des Namens ein oder lassen Sie das Suchfeld leer, um alle Mitglieder bzw. Gruppen anzuzeigen.

4.  Klicken Sie auf **Entfernen**.


## Verwalten ausstehender Einladungen {#managing-pending-invitations}

Site-Manager haben die Möglichkeit, ausstehende Einladungen anzuzeigen. Sie können eine Einladung widerrufen, bevor der Empfänger diese akzeptiert oder ablehnt.

> **Hinweis:** Wenn Sie die Alfresco Share-Version 5.1 oder höher verwenden, können Benutzer, die zu einer Site hinzugefügt werden, die Site sofort nutzen und es wird keine Einladung gesendet. In früheren Versionen von Share werden Benutzer erst dann zu einer Site hinzugefügt, nachdem sie die Einladung akzeptiert haben, die im Rahmen der Einladung zum Site-Beitritt gesendet wird.

Wenn Sie kürzlich auf Alfresco Share 5.1 oder höher aktualisiert haben, können Sie weiterhin alle ausstehenden Einladungen verwalten, die vor dem Upgrade gesendet wurden.

1.  Klicken Sie auf einer Site auf **Site-Mitglieder** oder **Mehr** und anschließend auf **Site-Mitglieder**, wenn die Site über zusätzliche Funktionen verfügt.

2.  Klicken Sie auf **Ausstehend**.

    Auf dieser Seite werden die Benutzer aufgeführt, die nicht auf die Site-Einladung reagiert haben, sowie alle Benutzer, die den Beitritt zur Site angefordert haben.

3.  Verwenden Sie die Suchfunktion, wenn Sie die Liste filtern möchten.

4.  Verwalten Sie die Site-Einladungen mithilfe der Schaltflächen rechts neben den einzelnen Benutzern:

    -   Klicken Sie auf **Abbrechen**, um die Einladung des Benutzers zu dieser Site zu widerrufen.
5.  Klicken Sie auf **Abbrechen**, wenn Sie die Einladung des Benutzers zu dieser Site widerrufen möchten.
