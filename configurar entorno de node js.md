1\. comando iniciales

npm init -y

* Instalar y configurar typescript

npm install --save-dev typescript @types/node

&nbsp;  - Generar el archivo de configuración de typescript tsconfig.ts

&nbsp;	npx tsc --init

* &nbsp;Este archivo es fundamental para definir cómo se compilará el código TypeScript. Una configuración básica recomendada para proyectos Node.js incluye opciones como target (por ejemplo, "ES2016" o "es6"), module ("commonjs"), rootDir ("./src"), outDir ("./dist"), y strict (true) para activar comprobaciones de tipo estrictas.


* &nbsp;Asegúrate de incluir en include la carpeta src y excluir node\_modules y archivos de pruebas si es necesario.


* Crea una carpeta src para almacenar tus archivos TypeScript y agrega un archivo de ejemplo, como src/index.ts, con código básico para probar la configuración.


* &nbsp;Para facilitar el desarrollo, instala herramientas adicionales como ts-node para ejecutar archivos TypeScript directamente sin compilarlos, nodemon para reiniciar automáticamente el servidor durante el desarrollo, y ESLint y Prettier para mantener un código limpio y consistente. Instala estas dependencias con :

	***npm install --save-dev @types/express ts-node tsx eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-prettier typescript-eslint @eslint/js eslint-config-prettier jiti***

  npm install express

***2. Configurar tsconfig***


* ***module: nodenext y target: esnext son configuraciones modernas que permiten usar ES Modules nativos (usar import/export) en vez de require y aprovechar las últimas funciones de JavaScript***
* ***verbatimModuleSyntax: true obliga a que los imports de tipos sean explicitos (import type {....}) lo cual ayuda a herramientas como Vita y SWC a compilar más rápido.***
* ***Calidad de código (Strict Mode): strict: true activa todas las comprobaciones de seguridad de Typescript.***
* ***noUncheckedIndexedAcces:true es muy últil ya que si accedes a un array como miArray\[5], TS te recordará que ese valor podría ser undefined.***
* ***Incluir excluir archivos. agregar por fuera de compilerOptions las propiedades include y exclude para incluir los archivos ts y que node los pueda usar y excluir carpetas como node modules y dist***
* 
***{***

  ***"compilerOptions": { ... },***

  ***"include": \["src/\*\*/\*"],***

  ***"exclude": \["node\_modules", "dist"]***

***}***



* ***Habilitar node si es para backend o para herramientas de build en react, luego de intalas @types/node descomentar***



***"lib": \["esnext", "dom"], // Agrega "dom" si es para navegador/React***

***"types": \["node"]***



* ***Si utilizaremos librerías de npm, añadir moduleResolution: nodenext, aunque ya viene implicito en module: nodenext. También añadir esModuleInterop: true para poder importar librerías que no usan ES modules como algunas que son viejas de JavaScript sin problemas.***



***Así debería queda, es un ejemplo para comprobar (asegurarse de agregar type: module en package.json):***



***{***

  ***"compilerOptions": {***

    ***"target": "esnext",***

    ***"module": "nodenext",***

    ***"moduleResolution": "nodenext",***

    ***"lib": \["esnext", "dom", "dom.iterable"],***

    

    ***/\* File Layout \*/***

    ***"rootDir": "./src",***

    ***"outDir": "./dist",***



    ***/\* Outputs \*/***

    ***"sourceMap": true,***

    ***"declaration": true,***

    ***"declarationMap": true,***



    ***/\* Interop \*/***

    ***"esModuleInterop": true,***

    ***"forceConsistentCasingInFileNames": true,***

    ***"skipLibCheck": true,***



    ***/\* Strictness \*/***

    ***"strict": true,***

    ***"noUncheckedIndexedAccess": true,***

    ***"exactOptionalPropertyTypes": true,***

    ***"isolatedModules": true,***



    ***/\* React \*/***

    ***"jsx": "react-jsx",***



    ***/\* Style (Descomenta estas para un código más limpio) \*/***

    ***"noUnusedLocals": true,***

    ***"noUnusedParameters": true,***

    ***"noImplicitReturns": true***

  ***},***

  ***"include": ["src/**/*"],***

  ***"exclude": ["node\modules", "dist"]***

***}***





***3. Configurar scripts y lint***


* Configura los scripts en el archivo package.json para facilitar el flujo de trabajo. Por ejemplo, puedes añadir 

 "scripts": {
    "format": "prettier --write 'src/**/*.ts'",
    "build": "rimraf dist && tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint 'src/**/*.{ts,js}'",
  },

&nbsp;

* Además, crea un archivo eslint.config.ts para configurar ESLint con soporte para TypeScript y un archivo .prettierrc.json para definir las reglas de formato.

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { Linter } from "eslint";

export default tseslint.config(
    // 1. Configuración base de JS (reeemplaza eslint:recommended)
    js.configs.recommended,

    // 2. Configuración de TS (reemplaza plugin: @typescript-eslint/recommended)
    ...tseslint.configs.recommended,

    // 3. Configuración global de reglas y entorno
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                process: "readonly",
                console: "readonly",
            },
        },
        rules: {
            "no-console": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { "argsIgnorePattern": "^_" },
            ],
        },
    },

    // 4. Prettier (debe ir al final para que mande en el estilo)
    eslintConfigPrettier,

    // 5. Ignorar archivos (reemplaza .eslintignore)
    {
        ignores: ["dist/**", "node_modules/**"],
    }
) as Linter.Config[];

tseslint.config(): Es una función de utilidad que te ayuda a escribir la configuración con autocompletado y valida que no cometas errores de sintaxis.

globals: En ESLint v9, ya no existe el objeto env. Ahora defines qué variables globales están permitidas (como process para Node o window para el Browser) dentro de languageOptions.globals.

eslintConfigPrettier: Simplemente se añade al final del array. Ya no se pone en un string de "extends".

ignores: Ahora se define directamente dentro del archivo, ya no necesitas un archivo .eslintignore por separado.

Un truco de memoria para el futuro:
En la nueva Flat Config, todo es un Array [].

Los elementos al principio del array son las bases (como los recomendados).

Los elementos al final del array sobrescriben a los anteriores (por eso Prettier va al final).


La diferencia entre prettier y eslint es que eslint se asegura de que el código sea correcto y no tenga errores potenciales, detecta variables que no se usan, funciones mal declaradas,et.



En cambio Prettier s asegura de que el código se vea bonito y consistente. No le importa si la lógica está mal, solo el aspecto. Decide donde  poner espacios, si usar comillas simples o dobles, donde romper una linea muy larga y si poner punto y coma.





Luego configurar Prettier:



eslint-config-prettier es clave: desactiva todas las reglas de ESLint que podrían chocar con Prettier.

{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}

"semi": true: Obliga al uso de punto y coma. En TypeScript es muy recomendado para evitar ambigüedades.

"singleQuote": true: Usa comillas simples ('text'). Es el estándar en la comunidad de JS/TS (aunque en HTML se usen dobles).

"tabWidth": 2: Define que cada nivel de indentación son 2 espacios.

"trailingComma": "es5": Añade una coma al final del último elemento en objetos y arrays (siempre que sea válido en ES5). Esto hace que los diffs en Git sean mucho más limpios.

"printWidth": 80: Si una línea supera los 80 caracteres, Prettier la romperá en varias líneas para que sea legible sin hacer scroll horizontal.

"endOfLine": "lf": Asegura que los saltos de línea sean consistentes (Linux/macOS style), evitando problemas si trabajas con gente que usa Windows.


Luego añadir "prettier" al final de la lista de extends en .eslintc.json para que tenga la última palabra en estilo



{

&nbsp; "extends": \[

&nbsp;   "eslint:recommended",

&nbsp;   "plugin:@typescript-eslint/recommended",

&nbsp;   "prettier" 

&nbsp; ]

}





* Finalmente, para compilar y ejecutar tu proyecto, puedes usar npm run build para generar los archivos JavaScript en la carpeta dist, y luego npm start para ejecutarlos con Node.js.

&nbsp;



* Este enfoque permite mantener el código fuente en TypeScript mientras se despliega código JavaScript compilado en producción.



Como levantar un servvidor de node js con typescript



import express, { Request, Response } from 'express';



const app = express();

const PORT = 3000;



// Middleware para entender JSON (vital para APIs)

app.use(express.json());



// Ruta principal (Ruta, Handler)

app.get('/', (req: Request, res: Response) => {

&nbsp; res.send('¡Servidor funcionando!');

});



// Levantar el servidor

app.listen(PORT, () => {

&nbsp; console.log(`⚡️ Servidor corriendo en http://localhost:${PORT}`);

});



Pasos para levantar el servidor:



1. Importar: Traer express (la herramienta) y los tipos Request y Response (para que typescript nop se queje).
2. Instanciar: Crear la aplicación con const app = express(). Es como encender el motor.
3. Definir rutas: Usas los verbos HTTP (get,post,put,patch,delete). Cada ruta reecibe el Request(lo que llega) y el Response(lo que envías).
4. Escuchar: El comando app.listen(PORT) es el que mantiene el proceso vivo esperando peticiones.



Trucos de memoria



* app.use(express.json()): Sin esto cuando se envíen datos desde un formulario o desde react al servidor, este dirá que el cuerpo del mensaje está vacío (undefined). Debe ir justo despues de crear app.
* El puerto: Se suele usar 3000 o el 8080 por convención en desarrollo.
* res.sen vvs res.json:Si estás haciendo una API para el frontend de React, acostumbrarse a usar res.json({mensaje: "hola"}) en lugar de send().



Como ejecutar:



Como se está usando TypeScript, no se pede usar node src/index.ts directamente porque Node no entiende TS. Hay dos opciones



* Para desarrollo: instalar tsx que es el sucesor moderno de nodemon: npm install -D tsx y ejecutar npx tsx src/index.ts
* Para producción: Compilas npx tsc (esto genera la carpeta /dist). Ejecuta el JS: node dist/index.js



