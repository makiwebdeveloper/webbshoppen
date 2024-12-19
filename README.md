# webbshoppen

1. Fetch från API (https://fakestoreapi.com/)
2. Render produkterna med map() function
3. Filter produkterna med filter() function
4. Sortera produkterna med sort() function
5. Reduce function för summera total summa
6. Save produkterna till LocaleStorage
7. Clear LocaleStorage items
8. Prev and Next buttons and logic for page numbers
   arr.slice(currentPage _ perPage, (currentPage _ perPage) + perPage)

<!-- ---------------------------------------------------------------- -->

Bild för gtag data:
https://imgur.com/a/kC8IhQ7

Vi har lagt till 3st olika "custom events" som spårar hur många knapptryck som görs på de valda knapparna. De vi har är:

- PayButton:
  Denna data registrerar knapptryck Pay-button, som är det sista knapptryck man gör för att slutföra sin beställning.
  Med andra ord, kan vi se hur många beställningar som görs.

- Checkout:
  Här kan vi se hur många det är som trycker på knappen "checkout", så man kommer till sidan där man fyller i sina leveransdetaljer.
  Med även denna funktion kan det jämföras med om hur många som tryckt på knappen checkout, till att faktiskt slutföra sin beställning.

- AddingItems:
  Denna "custom event" räknar antalet knapptryck som görs, när man ändrar sin quantity/antal produkter som man vill ha. Lägga till eller reducera sitt antal.

<!-- ---------------------------------------------------------------- -->
