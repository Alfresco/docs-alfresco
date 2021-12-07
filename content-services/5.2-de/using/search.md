---
title: Suchen nach Inhalten
---

Sie können das Suchfeld in der Symbolleiste verwenden, um nach Dateien, Sites und Personen zu suchen.

Geben Sie Ihre Suche in das Suchfeld ein. Daraufhin wird eine Liste der entsprechenden Dateien, Sites und Personen während der Eingabe angezeigt.

Wenn Sie sich in einer Site befinden, können Sie auf **Alle Inhalte durchsuchen** oder auf **Suchen in [Sitename]** klicken, um alle Sites oder nur die Site zu durchsuchen, in der Sie sich befinden.

Es gibt viele [Tipps für die Suche](#search-tips), wie zum Beispiel die folgenden:

-   Geben Sie ein Sternchen `*` ein, um ein Wort zu vervollständigen, wenn Sie nicht das ganze Wort kennen, nach dem Sie suchen. Beispiel: Bei Eingabe des Begriffs `**resco*` oder `*alf**` wird als Ergebnis gleichermaßen *alfresco* angezeigt.
-   Um nach Elementen zu suchen, die nur eines von mehreren Wörtern enthalten, verwenden Sie `OR`, und schließen Sie die Suche in Klammern ein, z. B. *(groß OR rot)*. Wenn Sie keine Klammern verwenden, werden Suchergebnisse zurückgegeben, die sowohl *groß* als auch *rot* enthalten.

Die fünf relevantesten Dateien, Sites und Personen werden angezeigt. Sie können jedoch auf **Mehr** klicken, um weitere Ergebnisse anzuzeigen.

Sie haben die folgenden Möglichkeiten:

-   Klicken Sie auf eines der Ergebnisse, um es direkt aufzurufen, oder

-   Drücken Sie die EINGABETASTE (wobei sich der Cursor im Suchfeld befindet), um alle [Suchergebnisse](#search-results) für alle durch die Suche gefundenen Dateien anzuzeigen.

> **Hinweis:** Wiki-Seiten und Blogbeiträge werden zusammen mit anderen Dateien angezeigt. Für Kalenderereignisse, standortbezogene Weblinks, Diskussionsthemen oder Datenlisten und Listenelemente wird keine Vorschau angezeigt. Sie müssen die EINGABETASTE drücken, um danach zu suchen.

## Suchergebnisse {#search-results}

Wenn Sie im Suchfeld auf die EINGABETASTE drücken, werden alle von der Suche gefundenen Dateien und Ordner angezeigt.

Folgende Optionen sind nun verfügbar:

-   Klicken Sie auf die Miniaturansicht eines Ergebnisses, um eine Vorschau anzuzeigen.
-   Klicken Sie auf einen Ergebnisnamen, um ihn zu öffnen.

-   Klicken Sie auf eine oder mehrere Filteroptionen, um sie zu aktivieren bzw. zu deaktivieren und die Suchergebnisse einzugrenzen.

-   Führen Sie den Mauszeiger über ein Ergebnis. Klicken Sie anschließend auf **Aktionen** und wählen Sie eine Option aus dem Menü aus.

-   Wählen Sie mehrere Ergebnisse aus, und klicken Sie auf **Ausgewählte Elemente**, um eine Aktionsoption auszuwählen.

    >**Tipp:** Hier sind die wichtigsten Aktionen für Dateien verfügbar. Wenn Sie die Datei als Vorschau anzeigen, sind möglicherweise weitere Optionen verfügbar.

    Sie können eine Datei auf diese Weise löschen. Die Suchergebnisse werden jedoch erst aktualisiert, wenn Sie eine neue Suche durchführen.

> **Hinweis:** Klicken Sie auf das Menü **Suchen in**, um in allen Sites oder nur in der Site zu suchen, in der Sie sich gerade befinden.

Wenn Sie als Superuser [Search Manager]({% link content-services/5.2/admin/share-admin-tools.md %}#search-manager) sind, steht Ihnen zusätzlich die Option **Suchmanager** zur Verfügung, mit der Sie neue Suchfilter erstellen können.

Neben dem Suchfeld in der Symbolleiste gibt es auch zusätzliche erweiterte Suchfunktionen zum Suchen nach [Personen](#using-the-people-finder), [Sites](#using-the-site-finder) und [Inhalt](#using-the-advanced-search).

>**Tipp:** Wenn es sich bei einer Datei um einen Microsoft Office-, PDF- oder einen anderen textbasierten Dateityp handelt (nicht um ein Bild oder Video), können Sie in der Dateivorschau auch auf ![Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) klicken, um nach Text in der Datei zu suchen.

## Tipps für die Suche {#search-tips}

Es gibt mehrere Möglichkeiten, wie Sie eine Suche genauer definieren können.

> **Hinweis:** Datei- und Ordnernamen bieten zusätzliche Unterstützung bei der Suche anhand von Produktnamen, Produktcodes, Extraktion von Wörtern mit gemischter Groß-/Kleinschreibung, allgemeinen Dateinamenskonventionen und mehr.

|Zum Suchen nach|Geben Sie Ihre Suchkriterien ein|Folgendes wird durchsucht|
|-------------|-------------------------|-------------|
|dem Wort Banane überall dort, wo es vorhanden ist|`Banane`<br><br>oder<br><br>`=Banane`|Namen, Titel, Beschreibungen und Inhalte.|
|dem genauen Begriff *Bananenschale* überall dort, wo er vorhanden ist|`Bananenschale`|Namen, Titel, Beschreibungen und Inhalte.|
|den Wörtern *Banane*, *Schale* und *glitschig* überall dort, wo diese Wörter zusammen in beliebiger Reihenfolge oder Position auftreten|`Banane AND Schale AND glitschig`|Namen, Titel, Beschreibungen und Inhalte.|
|Inhalt, der eines der Wörter *Banane*, *Schale* und *glitschig* enthält|`Banane, Schale und glitschig` <br><br>oder<br><br>`Banane ODER Schale ODER glitschig`|Namen, Titel, Beschreibungen und Inhalte.|
|dem Wort *Banane* überall dort, wo es in einem Titel verwendet wird|`title:Banane`|Titel.|
|dem Wort *Banane* überall dort, wo es in einem Namen verwendet wird|`name:Banane`|Namen von Ordnern und Inhaltselementen in der Bibliothek; Wiki-Seitenüberschriften.|
|dem Wort *Banane* überall dort, wo es in einer Beschreibung verwendet wird|`description:Banane`|Beschreibungen von Ordnern und Inhaltselementen in der Bibliothek; Beschreibungen von Datenlisten.|
|dem Wort Banane überall dort, wo es im Site-Inhalt verwendet wird|`TEXT:Banane`|Wiki-Seiten, Blogbeiträge, Inhaltselemente, und Diskussionsthemen und Antworten.|
|Inhalt, der am 26. September 2011 erstellt wurde|`created:"2011-09-26"`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links, Diskussionsthemen und Datenlisten. Sie können nur nach dem Jahr suchen oder auch nach Monat und Tag.|
|Inhalt, der zwischen dem 26. September und dem 30. September 2011 erstellt wurde|`created:["2011-09-26" to "2011-09-30"]`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links, Diskussionsthemen und Datenlisten. Sie können nur nach dem Jahr suchen oder auch nach Monat und Tag.|
|allen Inhalten, die am 26. September 2011 geändert wurden|`modified:"2011-09-26"`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links, Diskussionsthemen und Datenlisten. Sie können nur nach dem Jahr suchen oder auch nach Monat und Tag.|
|allen Inhalten, die zwischen dem 26. September und dem 30. September 2011 geändert wurden|`modified:["2011-09-26" to "2011-09-30"]`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links, Diskussionsthemen und Datenlisten. Sie können nur nach dem Jahr suchen oder auch nach Monat und Tag.|
|Inhalten, die von einem bestimmten Benutzer erstellt wurden|`creator:<username>`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links, Diskussionsthemen und Datenlisten.|
|Inhalten, die von einem bestimmten Benutzer geändert wurden|`modifier:<username>`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links, Diskussionsthemen und Datenlisten.|
|allen Inhalten, die die Buchstabenfolge *verwend* enthalten. Die zurückgegebenen Ergebnisse enthalten Verweise auf *verwenden*, *Verwendung*, *Wiederverwendung* usw.|`TEXT:*verwend*`|Wiki-Seiten, Blogbeiträge, Bibliotheksordner, Inhaltselemente, Ereignisse, Links und Diskussionsthemen.|

## Verwenden des Site-Finders {#using-the-site-finder}

Sie können über das Suchfeld in der Symbolleiste nach Sites suchen oder detailliertere Site-Informationen über den Site-Finder abrufen.

Sie können über die Suchergebnisse zu einer Site navigieren, Sites beitreten bzw. verlassen oder eine Site löschen (nur Manager).

1.  Öffnen Sie das Menü **Sites** und klicken Sie auf **Site-Finder**.

2.  Geben Sie den vollständigen Namen oder einen Teil des Site-Namens in das Suchfeld ein.

    >**Tipp:** Lassen Sie das Suchfeld leer, um alle Sites anzuzeigen, auf die Sie zugreifen können.

    Im Rahmen des Suchvorgangs werden zunächst Sites gesucht, die Ihren Suchkriterien entsprechen – bei Eingabe des Suchkriteriums *awe* wird die Site *Project Awesome* jedoch nicht gefunden. Fügen Sie stattdessen das Zeichen `*` zu Ihren Suchkriterien hinzu `*awe`, damit die Suche nach der Site erfolgreich ist.

3.  Klicken Sie auf **Suchen**.

    Eine Liste der Sites, die Ihren Kriterien entsprechen, wird angezeigt. Diese Liste enthält öffentliche Sites, moderierte öffentliche Sites, von Ihnen erstellte Sites und private Sites, den Sie zugeordnet sind. Die Aktionen **Beitreten** und **Beitritt beantragen** rechts neben einer Site zeigen an, dass Sie kein Site-Mitglied sind; die Aktion **Verlassen** zeigt an, dass Sie ein Site-Mitglied sind.

## Verwenden des Mitarbeiter-Finders {#using-the-people-finder}

Sie können über das Suchfeld in der Symbolleiste nach Personen suchen oder detailliertere Benutzerinformationen über den Mitarbeiter-Finder abrufen.

Aktivieren Sie, nachdem Sie den gewünschten Benutzer gefunden haben, die Option **Folgen/Nicht mehr folgen** (optional). Außerdem haben Sie die Möglichkeit, das zugehörige Benutzerprofil anzuzeigen.

1.  Klicken Sie in der Symbolleiste auf **Mitarbeiter**.

2.  Geben Sie den vollständigen Namen oder einen Teil des Namens in das Suchfeld ein.

    Sie müssen mindestens ein Zeichen eingeben. Bei der Suche wird nicht zwischen Groß- und Kleinschreibung unterschieden.

    Im Rahmen des Suchvorgangs werden zunächst Benutzernamen gesucht, die Ihren Suchkriterien entsprechen – bei Eingabe des Suchkriteriums 1 wird Benutzer1 jedoch nicht gefunden. Fügen Sie stattdessen das Zeichen `*` zu Ihren Suchkriterien hinzu `*1`, damit die Suche nach dem Benutzer erfolgreich ist.

    > **Hinweis:** Lesen Sie die Suchtipps auf der Seite **Mitarbeiter-Finder** für komplexere Suchvorgänge.

3.  Klicken Sie auf **Suchen**.

4.  Klicken Sie in der Ergebnisliste auf einen Benutzernamen, um das Profil dieses Benutzers anzuzeigen.

## Überprüfen eines Benutzerprofils {#reviewing-a-user-profile}

Wenn Sie nach einem Benutzer suchen, können Sie dessen Profildetails einsehen.

Die Profildetails sind über mehrere Seiten verteilt:

-   **Info**

    Zeigt die persönlichen Daten des Benutzers an, einschließlich Kontaktinformationen, Firmendaten und ein Foto.

-   **Sites**

    Listet die Sites auf, zu denen der Benutzer gehört.

-   **Inhalt**

    Zeigt zwei Listen mit den letzten Aktivitäten des Benutzers an.

    Die Liste **Kürzlich hinzugefügt** zeigt die letzten drei Inhalte an, die der Benutzer zu einer beliebigen Site hinzugefügt hat. Dazu gehören Wiki-Seiten, Blogbeiträge, Bibliotheksinhalte und Diskussionsbeiträge. Die Liste **Kürzlich geändert** zeigt die letzten drei Inhalte an, die der Benutzer bearbeitet hat.

-   **Folgen (#)**

    Zeigt eine Liste der Personen an, denen der Benutzer folgt.

    Die Zahl rechts neben dem Seitenlabel gibt an, wie vielen Personen dieser Benutzer gerade folgt. Wenn der Benutzer seine Liste als privat markiert hat, wird diese Seite nicht im Profil angezeigt.

> **Hinweis:** Wenn Sie das Profil eines Benutzers anzeigen, werden auf diesen Seiten nur die Sites und Inhalte angezeigt, für die Sie die Berechtigung zum Anzeigen haben.

## Verwenden der Option Erweiterte Suche {#using-the-advanced-search}

Verwenden Sie das Suchfeld in der Symbolleiste, um auf die erweiterte Suche zuzugreifen.

1.  Klicken Sie im Suchfeld auf ![Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) und anschließend auf **Erweiterte Suche**.

    Der Bildschirm **Erweiterte Suche** wird angezeigt.

2.  Wählen Sie einen Suchtyp aus:

    -   **Inhalt**: Sucht nach allen Arten von Inhalten
    -   **Ordner**: Sucht nach allen Ordnern und Containern, z. B. Bibliotheksordnern und Datenlisten

3.  Geben Sie Ihre Suchkriterien ein.

    Klicken Sie bei der Suche nach dem Änderungsdatum auf das Kalendersymbol, um ein Datum aus einem Kalender auszuwählen.

    Geben Sie bei der Suche nach dem Benutzer, der den Inhalt zuletzt geändert hat, den entsprechenden Benutzernamen in das Feld **Bearbeiter** ein.

    >**Tipp:** Sie können zur Vervollständigung eines Suchbegriffs ein Sternzeichen `*` eingeben, wenn Sie den vollständigen Begriff nicht kennen. Beispiel: Bei Eingabe des Begriffs `**resco*` oder `*alf**` wird als Ergebnis gleichermaßen *alfresco* angezeigt.

4.  Klicken Sie auf **Suchen**.

    Es werden alle Dateien und Ordner angezeigt, die im Rahmen des Suchvorgangs gefunden wurden. Folgende Optionen sind nun verfügbar:

    -   Klicken Sie auf ein Ergebnis, um es zu öffnen.

    -   Klicken Sie auf eine oder mehrere Filteroptionen, um sie zu aktivieren bzw. zu deaktivieren und die Suchergebnisse einzugrenzen.

    -   Führen Sie den Mauszeiger über ein Ergebnis. Klicken Sie anschließend auf **Aktionen** und wählen Sie eine Option aus dem Menü aus.

        >**Tipp:** Sie können eine Datei auf diese Weise löschen. Die Suchergebnisse werden jedoch erst aktualisiert, wenn Sie eine neue Suche durchführen.

## Folgen von Benutzern {#following-users}

Es kann zahlreiche Benutzer für ein System geben, sodass es mit großer Wahrscheinlichkeit einige Benutzer gibt, deren Aktivitäten für Sie wichtiger sind als andere. Sie können diesen Benutzern folgen, um deren Aktivitäten einfach zu verfolgen.

1.  Klicken Sie auf **Site-Dashboard**.

2.  Klicken Sie auf dem Dashlet **Site-Aktivitäten** auf das Sortiermenü.

    Standardmäßig wird **Alle Aktivitäten** angezeigt, aber es sind hier auch andere Optionen verfügbar, einschließlich der Option, nur Aktivitäten von Personen anzuzeigen, für die Sie **Ich folge** gewählt haben, und der Option zur Anzeige von **Meine Aktivitäten**.

    Um einem anderen Benutzer zu folgen, müssen Sie lediglich dessen Profil besuchen. Klicken Sie hierzu im Dashlet **Site-Aktivitäten** auf deren Namen oder suchen Sie sie im Bereich **Mitarbeiter** der Site.

3.  Klicken Sie oben im Site-Dashboard auf **Mitarbeiter**.

    Hiermit wird der Mitarbeiter-Finder aufgerufen, in dem Sie nach anderen Site-Mitgliedern suchen können.

4.  Geben Sie **a** in das Suchfeld ein und klicken Sie auf **Suchen**.

    Es werden alle Benutzer angezeigt, deren Namen den Buchstaben **a** enthalten.

5.  Klicken Sie neben einem Benutzer auf die Schaltfläche **Folgen**. Sie folgen nun diesem Benutzer.

6.  Klicken Sie oben im Bildschirm auf Ihren Namen und dann auf **Mein Profil**.

Oben in der Seite wird die Anzahl der Mitarbeiter angezeigt, denen Sie folgen.
