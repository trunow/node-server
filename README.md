Ставим пакеты
`npm i`

Создаём таблицу в БД
`sqlite3 db/db.sqlite`

```
CREATE TABLE stat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  field1 text NOT NULL,
  field2 text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

`.exit`

Запускаем сервер (работает, пока терминал жив)
`node server.js`

Если надо демонизровать:

Можно через создать `/lib/systemd/system/node.service`
Или нужен `forever` или `pm2` глобально.

Я юзал forever:
https://www.npmjs.com/package/forever

