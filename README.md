# MeshChat (desktop)

Windows-клієнт MeshChat. Відкриває сайт MeshChat у вікні і сам оновлюється через GitHub Releases.

## Запуск для розробки
```
npm install
npm start
```

## Випуск версії
1. Підніміть `version` у `package.json`.
2. Створіть тег і відправте його:
   ```
   git tag v1.0.1
   git push origin v1.0.1
   ```
3. GitHub Actions збере установник `.exe` і опублікує його в Releases. Клієнти побачать оновлення під час запуску.

Адресу сайту задано в `main.js` (`SITE_URL`) або змінною середовища `MESHCHAT_URL`.
