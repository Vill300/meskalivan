# ⚡ БЫСТРОЕ ИСПРАВЛЕНИЕ 404

## 🔥 ВЫПОЛНИТЕ ЭТИ КОМАНДЫ:

```bash
# 1. Соберите проект
npm install && npm run build

# 2. Создайте ветку gh-pages
git checkout -b gh-pages

# 3. Удалите все файлы (кроме .git)
# На Windows:
rmdir /s /q *
# На Mac/Linux:
rm -rf * .gitignore .gitattributes

# 4. Скопируйте файлы из dist
cp -r dist/* .

# 5. Загрузите в GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 6. Вернитесь на главную ветку
git checkout main
```

## ⚙️ ЗАТЕМ НАСТРОЙТЕ GITHUB PAGES:

1. Перейдите: https://github.com/Vill300/meskalivan/settings/pages
2. Source: **"Deploy from a branch"**
3. Branch: **"gh-pages"** → **"/ (root)"**
4. Save

## 🎯 ГОТОВО!

Ваш сайт: **https://vill300.github.io/meskalivan**

---

## 🚨 Если не работает - используйте Vercel:

1. [vercel.com](https://vercel.com) → "New Project" → выберите `meskalivan`
2. Deploy
3. Получите ссылку: `https://meskalivan-xxx.vercel.app`