<!DOCTYPE html>
<head>
    <title>Dokument�cia WAP</title>
</head>
<body>
    <h1>Dokument�cia k projektu z predmetu WAP</h1>
    <h3>variant - Spr�vce oken</h3>
    <h3>Silvester Lipjanec - xlipja01</h3>
    <br>
    <section>
        <h2>N�vod k pou�itiu</h2>
        <h3>Prepojenie HTML a JS s�boru</h3>
        <p>K pou�itiu spr�vcu okien implementovan�ho v s�bore windows.js je potrebn� tento s�bor 
            pripoji� k s�boru HTML. To m��eme urobi� pomocou vlo�enia elemetu script do s�boru HTML vr�mci sekcie head
            a nastaven�m parametru src=<q>cesta/k/s�boru/windows.js</q>. S�bor HTML by mal obsahova� elementy
            div s nastavenou triedou (class) <q>desktop</q> a v �om vnoren� prvky div s nastavenou triedou 
            class=<q>window</q>.</p>
        <h3>Volanie implementovan�ch funkci�</h3>
        <p>Na konci sekcie body dokumentu HTML je nutn� vlo�i� element script. V r�mci elementu script je
            potom potrebn� zavola� jedin� funkciu init() bez parametrov.
        </p>
        <h3>Pou�it� �t�ly</h3>
        <p>�t�ly pou�it� pre jednotliv� elementy s� definovan� v s�bore style.css. Pre spr�vne fungovanie je nutn� 
            do s�boru HTML vr�mci sekcie head vlo�i� element link s parametrami type=<q>text/css</q> href=<q>cesta/k/style.css</q>.
            �t�ly definuj� vzh�ad okien, ich po�iato�n� ve�kos� a farebnos� a taktie� ohrani�enie a ve�kos� elementu desktop.
        </p>
    </section>
</body>