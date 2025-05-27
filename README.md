# [![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/N68_urbh)

## Design Prototype

Du kan se Figma-designen som den här applikationen baseras på här.:  
[Figma Design](https://www.figma.com/design/Cws5C4jQzawLjICpdOocSY/U09-Figma-Skisser?node-id=0-1&p=f&t=RGQaKOCAgZIV5bQA-0)

---
Williams röra:
npm init -y

npm install express mongoose

npm install dotenv


npm install --save-dev @types/express @types/node

npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose 
npx tsc --init

npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx eslint --init

Lägg i scripts:
"dev": "ts-node-dev --respawn --transpile-only src/server.ts"

npm install passport passport-google-oauth20 express-session
npm install @types/express-session --save-dev

npm install cors
npm install --save-dev @types/cors

npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

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
