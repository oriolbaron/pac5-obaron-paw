# Resum dels informes LightHouse i decisions de disseny

## Resum dels resultats de LightHouse
### Versió escriptori:
- **Rendiment (Performance):** 70
  - *Primer Renderitzat de Contingut (FCP):* 1,4 s
  - *Major Renderitzat de Contingut (LCP):* 4,0 s
  - *Temps Total de Bloqueig (TBT):* 150 ms
  - *Desplaçament de la Disposició Acumulativa (CLS):* 0
  - *Speed Index:* 1,5 s
- **Accessibilitat (Accessibility):** 87
- **Millors Pràctiques (Best Practices):** 100
- **SEO:** 91

### Versió mòbil:
- **Rendiment (Performance):** 39
  - *Primer Renderitzat de Contingut (FCP):* 7,3 s
  - *Major Renderitzat de Contingut (LCP):* 24,0 s
  - *Temps Total de Bloqueig (TBT):* 810 ms
  - *Desplaçament de la Disposició Acumulativa (CLS):* 0
  - *Speed Index:* 7,3 s
- **Accessibilitat (Accessibility):** 87
- **Millors Pràctiques (Best Practices):** 100
- **SEO:** 91

## Observacions clau
- **Problemes comuns detectats:**
  - Utilització elevada de recursos sense compressió, amb un estalvi potencial de 2,878 KiB mitjançant compressió (*gzip*, *deflate* o *brotli*).
  - JavaScript no minificat, amb un estalvi potencial de 1,220 KiB.
  - JavaScript no utilitzat, amb un estalvi potencial de 1,328 KiB.
  - Retràs en el renderitzat dels elements principals de la pàgina (FCP i LCP especialment crítics en mòbil).

- **Recomanacions per millorar el rendiment:**
  - **Activar compressió de text** per optimitzar el trànsit de xarxa.
  - **Minificar i optimitzar JavaScript**, incloent-hi el carregament deferit dels scripts no essencials.
  - **Preconnectar a les fonts requerides** i **precarregar imatges crítiques** per a reduir els temps de càrrega.

## Decisions de disseny per a la configuració del *Service Worker*
1. **Caché de recursos estàtics:**
   - Utilitzar estratègies com "Cache First" per a recursos immutables (fonts, imatges, JS compilats).
   - Configurar "Stale-While-Revalidate" per als recursos que requereixen actualitzacions ocasionals.

2. **Gestió de les peticions dinàmiques:**
   - Implementar "Network First" per a dades dinàmiques, garantint que els usuaris vegin contingut actualitzat.
   - Establir una caché temporal amb caducitat per evitar sol·licituds duplicades.

3. **Optimització de LCP amb Service Worker:**
   - Precarregar les imatges del LCP durant la instal·lació del Service Worker.
   - Assegurar que les fonts i altres recursos rellevants es carreguin amb prioritat.

4. **Monitorització i actualització:**
   - Implementar una estratègia de registre per detectar errors al Service Worker.
   - Planificar un mecanisme per forçar actualitzacions en cas de canvis en els recursos clau.
