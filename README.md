# [![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

## Design Prototype

Du kan se Figma-designen som den här applikationen baseras på här.:  
[Figma Design](https://www.figma.com/design/Cws5C4jQzawLjICpdOocSY/U09-Figma-Skisser?node-id=0-1&p=f&t=RGQaKOCAgZIV5bQA-0)

---

Vi har i detta projekt använt flera olika biblotek som kräver sina egna dependencies. För att kunna arbeta på projektet lokalt på din dator följ dessa steg:

1: Gå till github och välj "code" i projektet.
2: Skapa en ny mapp på din dator.
3: i denna mapp, öppna powershell eller bash och kör (git clone <"Github adressen">).
4: Vi vill ju inte att node_modules ska skapas i projektroten utan i respektive back och frontend mapp. 
5: cd backend, npm install
6: cd frontend, npm install

Projektet har både en production och development version. CORS är uppsatt för lokalt också så för att se hela projektet i en lokal miljö kör i respektive mapp npm run dev.

npm run dev

### Branch och commit upplägg

Branch:
front/backend - typ/komponent

Exempel:
FR-feature/homepage

Commits:
1 feature eller komponent eller dylikt skapas och sparas.

Exempel:
git commit -m"routing"
git commit -m"scss"
