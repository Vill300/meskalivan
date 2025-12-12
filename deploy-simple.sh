#!/bin/bash

# Скрипт для развертывания ПРОСТОЙ HTML версии Meskalivan

echo "🚀 Развертываем ПРОСТУЮ версию Meskalivan..."

# Проверяем наличие файлов
if [ ! -f "simple/index.html" ]; then
    echo "❌ Файл simple/index.html не найден!"
    exit 1
fi

# Создаем ветку simple (если не существует)
echo "🌿 Создаем ветку simple..."
git checkout -b simple 2>/dev/null || git checkout simple

# Очищаем ветку
echo "🧹 Очищаем ветку simple..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true

# Копируем простую версию
echo "📋 Копируем простую версию..."
cp -r simple/* .

# Добавляем .nojekyll для корректной работы
echo "⚙️ Создаем .nojekyll..."
touch .nojekyll

# Зафиксируем изменения
echo "💾 Фиксируем изменения..."
git add .
git commit -m "Deploy simple Discord clone - $(date)" || echo "⚠️  Нет изменений для коммита"

# Отправляем в GitHub
echo "📤 Отправляем в GitHub..."
git push origin simple

# Возвращаемся на главную ветку
echo "🔙 Возвращаемся на главную ветку..."
git checkout main 2>/dev/null || git checkout master

echo ""
echo "✅ Простая версия развернута!"
echo ""
echo "🌐 Настройте GitHub Pages:"
echo "   1. Перейдите: https://github.com/Vill300/meskalivan/settings/pages"
echo "   2. Source: 'Deploy from a branch'"
echo "   3. Branch: 'simple' → '/ (root)'"
echo "   4. Save"
echo ""
echo "🔗 После настройки ваш сайт будет доступен:"
echo "   https://vill300.github.io/meskalivan"
echo ""
echo "⏰ Подождите 1-2 минуты для активации"
echo ""
echo "🎉 ГОТОВО! Простая версия Discord-клона работает!"