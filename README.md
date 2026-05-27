# Produktpanelen

Det här är en enkel webbapplikation byggd med React, TypeScript och SCSS.

Appen använder DummyJSON API för att visa och hantera produkter.

## Funktioner

- Visa produkter
- Visa produktdetaljer
- Skapa produkt
- Uppdatera produkt
- Ta bort produkt
- Ladda upp och visa en bild lokalt
- Routing med React Router
- Responsiv design

## API

Jag har använt DummyJSON Products API:

https://dummyjson.com/products

## API-anrop

### GET

Används för att hämta alla produkter.

### GET by ID

Används för att hämta information om en specifik produkt.

### POST

Används när en ny produkt skapas.

### PATCH

Används när en produkt uppdateras.

### DELETE

Används när en produkt tas bort.

## Tekniker

- React
- TypeScript
- Axios
- React Router
- SCSS
- Vite

## Bilduppladdning

Bilduppladdningen görs med en egen Express-server och Multer.

Frontend skickar bilden till:

POST /api/upload

Servern sparar bilden i uploads-mappen och skickar tillbaka en imageUrl som sedan visas på sidan.