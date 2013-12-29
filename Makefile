#
# Copyright (C) 2013 Camelidae Group SPRL
#
# This file is part of UNT.
#
# UNT is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# UNT is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with UNT. If not, see <http://www.gnu.org/licenses/>.
#

#-----------------------------------------------------------------------
# Build parameters
#-----------------------------------------------------------------------

# Parameters
rev = 
SHELL = /bin/bash
ifndef env
	ifdef UNT_MAKE_DEFAULT_ENV
		env = $(UNT_MAKE_DEFAULT_ENV)
	else
		env = debug
	endif
endif

# Environment
read = read -ep
read_s = read -sep

web_dist = $(notdir $(wildcard web/dist/*))

#-----------------------------------------------------------------------
# Commands
#-----------------------------------------------------------------------

default: build

help:
	@echo "UNT build utility"
	@echo
	@echo "  make [build]           : build everything"
	@echo "  make install [rev=REV] : install this app / upgrade to revision REV"
	@echo "  make clean             : clean built objects"
	@echo "  make purge             : remove uploaded files"
	@echo "  make distclean         : clean, purge and remove configuration files"
	@echo "  make reset             : clean, purge, build, install"
	@echo

build: web

clean: clean/web

clean/web:
	@echo -n "Cleaning web app..."
	@for f in $(web_dist); do \
		test -e "public/$$f" && rm -rf "public/$$f" || true; \
	done
	@(cd web && $(MAKE) env=$(env) SHELL=$(SHELL) clean 1>/dev/null)
	@echo "done."

install:
	@test ! -d app/config/local && mkdir app/config/local || true
	@test ! -d public/content && mkdir public/content || true
	@if [ ! -f "app/config/local/databases.ini" ]; then \
		f="app/config/local/databases.ini"; \
		echo -n > "$$f"; \
		echo "[main]" >> "$$f"; \
		$(read) "databases.main.type (postgres)> "  pval; test -n "$$pval" || pval="postgres";  echo "type = $${pval}" >> "$$f"; \
		$(read) "databases.main.host (localhost)> " pval; test -n "$$pval" || pval="localhost"; echo "host = $${pval}" >> "$$f"; \
		$(read) "databases.main.name> " db_name; echo "name = $${db_name}" >> "$$f"; \
		$(read) "databases.main.user> " db_user; echo "user = $${db_user}" >> "$$f"; \
		$(read) "databases.main.pass> " db_pass; echo "pass = $${db_pass}" >> "$$f"; \
		echo >> "$$f"; \
		echo "[content]" >> "$$f"; \
		$(read) "databases.content.type (mongo)> "       pval; test -n "$$pval" || pval="mongo";     echo "type = $${pval}" >> "$$f"; \
		$(read) "databases.content.host (localhost)> "   pval; test -n "$$pval" || pval="localhost"; echo "host = $${pval}" >> "$$f"; \
		$(read) "databases.content.name ($${db_name})> " pval; test -n "$$pval" || pval="$$db_name"; echo "name = $${pval}" >> "$$f"; \
		$(read) "databases.content.user ($${db_user})> " pval; test -n "$$pval" || pval="$$db_user"; echo "user = $${pval}" >> "$$f"; \
		$(read) "databases.content.pass ($${db_pass})> " pval; test -n "$$pval" || pval="$$db_pass"; echo "pass = $${pval}" >> "$$f"; \
	fi
	@php util/installer/install.php $(rev)
	@if [ ! -f "app/config/local/services.ini" ]; then \
		f="app/config/local/services.ini"; \
		echo -n > "$$f"; \
		echo "[mailer]" >> "$$f"; \
		$(read) "services.mailer.smtp_host (localhost)> " pval; test -n "$$pval" || pval="localhost"; echo "smtp_host = $${pval}" >> "$$f"; \
		$(read) "services.mailer.smtp_port (25)> "        pval; test -n "$$pval" || pval="25";        echo "smtp_port = $${pval}" >> "$$f"; \
		$(read) "services.mailer.send_from> " pval; echo "send_from = $${pval}" >> "$$f"; \
		$(read) "services.mailer.send_to> "   pval; echo "send_to   = $${pval}" >> "$$f"; \
		echo >> "$$f"; \
		echo "[facebook]" >> "$$f"; \
		$(read) "services.facebook.app_id> "     pval; echo "app_id     = $${pval}" >> "$$f"; \
		$(read) "services.facebook.app_secret> " pval; echo "app_secret = $${pval}" >> "$$f"; \
		echo ";curl_opts[CURLOPT_] = " >> "$$f"; \
	fi
	@chmod 400 app/config/local/*


distclean: purge
	@echo -n "Removing configuration files......"
	@test "$$(ls -1 app/config/local | wc -l)" -gt 0 && rm -rf app/config/local/* || true
	@echo "done."

purge:
	@echo -n "Purging content files..."
	@test "$$(ls -1 public/content | wc -l)" -gt 0 && rm -rf public/content/* || true
	@echo "done."

reset: clean purge build install

.PHONY: default help build install clean clean/web purge distclean reset

#-----------------------------------------------------------------------
# Targets
#-----------------------------------------------------------------------

web: web/prepare
	@$(MAKE) -s env=$(env) SHELL=$(SHELL) web/import

#
# Note: the addprefix/wildcard stuff should be processed after the app
# have been prepared (to determine what are the distributed files).
#
web/import: $(addprefix public/, $(notdir $(wildcard web/dist/*)))

.PHONY: web web/import

#-----------------------------------------------------------------------
# Rules for web app
#-----------------------------------------------------------------------

# $@: target
# $*: target basename
# $<: first dep
# $^: all deps
# $?: more recent deps

web/prepare:
	@echo -n "Preparing web app..."
	@test -d public || mkdir -p public
	@(cd web && ( \
		$(MAKE) env=$(env) SHELL=$(SHELL) 1>/dev/null 2>/dev/null \
			&& echo "done." \
			|| (echo -e "\033[0;31mfailed!\033[0m"; exit 1); \
	))

public/%: web/dist/%
	@echo -n "Importing $@ from web..."
	@[[ ! -e "$@" && ! -L "$@" ]] || rm -rf "$@"
	@test "$(env)" = "debug" && ln -sr "$<" "$@" || true
	@test "$(env)" = "release" && cp -r "$<" "$@" || true
	@echo "done."

.PHONY: web/prepare
