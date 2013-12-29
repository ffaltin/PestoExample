#!/bin/bash

if [ -n "$1" ]; then
	savepath="$1"
	cd "$savepath"
fi
savepath="$PWD"

test ! -d "$savepath" && echo "Give a valid save directory" && exit 1

dp="$(cd "${0%/*}" && echo $PWD)"
app="$(dirname $(dirname $dp))"
readconf="php $dp/src/readconf.phpx"

appname="$(basename $app | sed 's:[^a-z0-9]::gi')"
ts="$(date +%Y%m%d-%H%M%S)"

test "$($readconf maindb.type)" != "postgres" && echo "Main database must be PostgreSQL" && exit 1
pg_host="$($readconf maindb.host)"
pg_user="$($readconf maindb.user)"
pg_pass="$($readconf maindb.pass)"
pg_db="$($readconf maindb.name)"

test "$($readconf contentdb.type)" != "mongo" && echo "Content database must be MongoDB" && exit 1
mongo_host="$($readconf contentdb.host)"
mongo_user="$($readconf contentdb.user)"
mongo_pass="$($readconf contentdb.pass)"
mongo_db="$($readconf contentdb.name)"

temp="$(mktemp -d)"
mkdir "$temp/$appname-$ts"
cd "$temp/$appname-$ts"

echo -n "Dumping main database... "
mkdir main-db
cd main-db
pg_pass_bak="$PGPASS"
export PGPASS="$pg_pass"
pg_dump -O -h "$pg_host" -U "$pg_user" "$pg_db" | gzip > "${pg_db}.sql.gz"
export PGPASS="$pg_pass_bak"
cd .. > /dev/null
echo "done"

echo -n "Dumping content database... "
mkdir content-db
cd content-db
mongodump -h "$mongo_host" -u "$mongo_user" -p "$mongo_pass" -d "$mongo_db" -o . > /dev/null
cd .. > /dev/null
echo "done"

echo -n "Copying assets... "
cp -r "${app}/public/assets" .
echo "done"

echo -n "Compressing... "
cd .. > /dev/null
tar -zcf "$appname-$ts.tar.gz" "$appname-$ts"
rm -rf "$appname-$ts"
mv "$appname-$ts.tar.gz" "$savepath"
cd "$savepath"
rm -rf "$temp"
echo "done"
