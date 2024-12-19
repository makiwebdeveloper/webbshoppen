# webbshoppen

1. Fetch från API (https://fakestoreapi.com/)
2. Render produkterna med map() function
3. Filter produkterna med filter() function
4. Sortera produkterna med sort() function
5. Reduce function för summera total summa
6. Save produkterna till LocaleStorage
7. Clear LocaleStorage items
8. Prev and Next buttons and logic for page numbers

**Reflektera i teamet och sammanfatta på 300-500 ord i Readme.md. Vilka möjligheter finns det med händelsespårning? Finns det begränsningar?**

Vi har skapat en webbshop där vi har fetchat 20 olika produkter från https://fakestoreapi.com/products genom att använda en async functiion. Vidare har vi, för att  visa produkterna på hemsidan, implementerat html kod genom JS med att använda map and join. 

Gällande UX kommer besökare till en landing page där alla produkter finns tillgänliga. Därefter kan besökare välja att sortera produkter utifrån produkt kategori som mens clothing, womans clothing, electronic mm. Besökare kan även sortera produkterna utifrån pris (low-high / high-low), rating (low-high / high-low) och namn (A-Z / Z-A). Besökare kan köpa produkt genom en add to cart knapp som fungerar med minst ett i antal. Vi har valt att använda sort, filter och push till ovan interatktion samt en modal för att visa meddelanden på resultat av eventen. Val av produkter sparas tillfälligt i localstorage och resetar med en pay knapp som innehåller .reset.

Formen för kundinformation vid checkout använde vi emailjs.

**GTAG**

Bild för gtag data:
https://imgur.com/a/kC8IhQ7 alternativt i ./assets/images

Vi har lagt till 3st olika "custom events" som spårar hur många knapptryck som görs på de valda knapparna. De vi har är:

- PayButton:
  Denna data registrerar knapptryck Pay-button, som är det sista knapptryck man gör för att slutföra sin beställning.
  Med andra ord, kan vi se hur många beställningar som görs.

- Checkout:
  Här kan vi se hur många det är som trycker på knappen "checkout", så man kommer till sidan där man fyller i sina leveransdetaljer.
  Med även denna funktion kan det jämföras med om hur många som tryckt på knappen checkout, till att faktiskt slutföra sin beställning.

- AddingItems:
  Denna "custom event" räknar antalet knapptryck som görs, när man ändrar sin quantity/antal produkter som man vill ha. Lägga till eller reducera sitt antal.