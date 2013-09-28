#-----------------------------------------------------------------------
# Configuration
#-----------------------------------------------------------------------

# Parameters
SHELL  = /bin/bash
rev    = 

# Environment
read = read -ep
read_s = read -sep

# Sources configuration
themes_src = $(wildcard public/themes/*)

#-----------------------------------------------------------------------
# Commands
#-----------------------------------------------------------------------

default: build

help:
	@echo "LAS build utility."
	@echo
	@echo "  make [build]           : build everything"
	@echo "  make install [rev=REV] : install this app / upgrade to revision REV"
	@echo "  make clean             : clean built objects"
	@echo "  make purge             : remove uploaded files"
	@echo "  make distclean         : clean, purge and remove configuration files"
	@echo "  make reset             : clean, purge, build, install"
	@echo

build: themes

install:
	@test ! -d app/config/local && mkdir app/config/local || true
	@test ! -d public/content && mkdir public/content || true
	@test ! -d public/assets && mkdir public/assets || true
	@php util/installer/install.php $(rev)
	@if [ ! -f "app/config/local/mailer.ini" ]; then \
		echo -n > app/config/local/mailer.ini; \
		$(read) "mailer.default_from> " mailer_default_from; echo "default_from = $${mailer_default_from}" >> app/config/local/mailer.ini; \
		$(read) "mailer.default_to> " mailer_default_to;   echo "default_to = $${mailer_default_to}"     >> app/config/local/mailer.ini; \
		echo >> app/config/local/mailer.ini; \
		echo [smtp] >> app/config/local/mailer.ini; \
		$(read) "mailer.smtp.host> " mailer_smtp_host; echo "host = $${mailer_smtp_host}" >> app/config/local/mailer.ini; \
		$(read) "mailer.smtp.port> " mailer_smtp_port; echo "port = $${mailer_smtp_port}" >> app/config/local/mailer.ini; \
		echo >> app/config/local/mailer.ini; \
	fi
	@chmod 400 app/config/local/*

clean:
	@echo -n "Cleaning build stuff..."
	@for theme in public/themes/*; do \
		test -f "$$theme/Makefile" \
			&& (cd "$$theme" && make clean env=$(env) SHELL=$(SHELL) 1>/dev/null 2>/dev/null) \
			|| true; \
	done
	@echo "done."

distclean: purge
	@echo -n "Removing configuration files......"
	@test "$$(ls -1 app/config/local | wc -l)" -gt 0 && rm -rf app/config/local/* || true
	@echo "done."

purge:
	@echo -n "Purging assets and content files..."
	@test "$$(ls -1 public/content | wc -l)" -gt 0 && rm -rf public/content/* || true
	@test "$$(ls -1 public/assets | wc -l)" -gt 0 && rm -rf public/assets/* || true
	@echo "done."

reset: clean purge build install

.PHONY: default help build install clean purge distclean reset

#-----------------------------------------------------------------------
# Targets
#-----------------------------------------------------------------------

#-----------------------------------------------------------------------
# Rules
#-----------------------------------------------------------------------

themes:
	@for theme in public/themes/*; do \
		if [ -f "$$theme/Makefile" ]; then \
			echo -n "Building theme/$$(basename "$$theme")..."; \
			(cd "$$theme" && make env=$(env) SHELL=$(SHELL) 1>/dev/null 2>/dev/null) \
				&& echo "done." \
				|| (echo -e "\033[0;31mfailed!\033[0m"; exit 1); \
		fi \
	done

.PHONY: themes
