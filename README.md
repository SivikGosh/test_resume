# Resumé Vault
Приложение (SPA + API) для работы с собственными резюме.
<br>
Демо доступно по адресу http://stack.eventfun.ru.

## Запуск

#### Клонировать репозиторий и перейти в корневой каталог
```bash
git clone git@github.com:SivikGosh/test_resume.git
cd test_resume/
```

#### Копировать файл переменных окружения
```bash
cp .env.example .env
```

Заменить значение **DB_HOST** с *localhost* на *db*.

#### Запустить сборку
```bash
docker compose up -d
```

Приложение будет доступно по адресу http://localhost.

### Адреса

| Адрес           | Описание                  |
| --------------- | ------------------------- |
| localhost       | Главная страница SPA.     |
| localhost/docs  | Интерактивный Swagger UI. |
| localhost/redoc | Документация ReDoc.       |
<!-- |                 |                           | -->

<br>

<div align="right">

## Author's contact
<a href='https://t.me/sivikgosh' target='_blank'><img src='https://img.shields.io/badge/SivikGosh-white?style=flat-square&logo=Telegram&logoColor=26A5E4'></a>

</div>
