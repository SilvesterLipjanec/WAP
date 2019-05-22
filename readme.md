<!DOCTYPE html>
<head>
    <title>Dokumentácia WAP</title>
</head>
<body>
    <h1>Dokumentácia k projektu z predmetu WAP</h1>
    <h3>variant - Správce oken</h3>
    <h3>Silvester Lipjanec - xlipja01</h3>
    <br>
    <section>
        <h2>Návod k pouitiu</h2>
        <h3>Prepojenie HTML a JS súboru</h3>
        <p>K pouitiu správcu okien implementovaného v súbore windows.js je potrebné tento súbor 
            pripoji k súboru HTML. To môeme urobi pomocou vloenia elemetu script do súboru HTML vrámci sekcie head
            a nastavením parametru src=<q>cesta/k/súboru/windows.js</q>. Súbor HTML by mal obsahova elementy
            div s nastavenou triedou (class) <q>desktop</q> a v òom vnorené prvky div s nastavenou triedou 
            class=<q>window</q>.</p>
        <h3>Volanie implementovanıch funkcií</h3>
        <p>Na konci sekcie body dokumentu HTML je nutné vloi element script. V rámci elementu script je
            potom potrebné zavola jedinú funkciu init() bez parametrov.
        </p>
        <h3>Pouité štıly</h3>
        <p>Štıly pouité pre jednotlivé elementy sú definované v súbore style.css. Pre správne fungovanie je nutné 
            do súboru HTML vrámci sekcie head vloi element link s parametrami type=<q>text/css</q> href=<q>cesta/k/style.css</q>.
            Štıly definujú vzh¾ad okien, ich poèiatoènú ve¾kos a farebnos a taktie ohranièenie a ve¾kos elementu desktop.
        </p>
    </section>
</body>