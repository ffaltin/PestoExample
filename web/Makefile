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
# Configuration
#-----------------------------------------------------------------------

app_name = web
src_main = main.js

#-----------------------------------------------------------------------
# Build parameters
#-----------------------------------------------------------------------

# Parameters
SHELL = /bin/bash
ifndef env
	ifdef UNT_MAKE_DEFAULT_ENV
		env = $(UNT_MAKE_DEFAULT_ENV)
	else
		env = debug
	endif
endif

# Environment configuration
node = node
jspp_bin = jspp
jspp_obj = min
uglify_bin = uglifyjs
uglify_flags = --compress --mangle

# Resources original files
res_src = $(wildcard res/*)

# Resources targets
res_target = $(addprefix dist/, $(notdir $(res_src)))

# Application sources
app_src = $(shell $(jspp_bin) dep src/$(src_main)) $(realpath src/$(src_main))
app_src_all = $(wildcard src/*.js) $(wildcard src/**/*.js)
lib_src_all = $(wildcard lib/*.js) $(wildcard lib/**/*.js)

# Application intermediate objects
app_obj = $(addsuffix .$(jspp_obj), $(app_src))
app_obj_all = $(wildcard src/*.js.$(jspp_obj)) $(wildcard src/**/*.js.$(jspp_obj))
lib_obj_all = $(wildcard lib/*.js.$(jspp_obj)) $(wildcard lib/**/*.js.$(jspp_obj))

#-----------------------------------------------------------------------
# Commands
#-----------------------------------------------------------------------

default: app theme resources

clean:
	@echo -n "Cleaning app and resources..."
	@rm -rf dist/* || true
	@rm -f $(app_obj_all) || true
	@rm -f $(lib_obj_all) || true
	@echo "done."
	@echo -n "Cleaning theme..."
	@test -f theme/Makefile && (cd theme; $(MAKE) clean 1>/dev/null 2>/dev/null) || true
	@echo "done."

.PHONY: default clean

#-----------------------------------------------------------------------
# Targets
#-----------------------------------------------------------------------

app: dist/$(app_name).js

resources: $(res_target)

theme: theme/prepare
	@$(MAKE) -s env=$(env) SHELL=$(SHELL) theme/import

#
# Note: the addprefix/wildcard stuff should be processed after the theme
# have been prepared (to determine what are the distributed files).
#
theme/import: $(addprefix dist/theme/, $(notdir $(wildcard theme/dist/*)))

.PHONY: app resources theme theme/import

#-----------------------------------------------------------------------
# Rules for the app
#-----------------------------------------------------------------------

dist/$(app_name).js: $(app_obj)
	@echo -n "Building $(app_name).js..."
	@cat $(app_obj) > dist/$(app_name).js
	@echo "done."

%.js.$(jspp_obj): %.js
	@echo -n "Compiling $(notdir $*.js)..."
	@$(jspp_bin) clean "$<" | $(uglify_bin) $(uglify_flags) --output "$@" 2>/dev/null \
		&& (echo >> dist/$(app_name).js; echo "done.") \
		|| (echo -e "\033[0;31mfailed!\033[0m"; exit 1)

#-----------------------------------------------------------------------
# Rules for the theme
#-----------------------------------------------------------------------

# $@: target
# $*: target basename
# $<: first dep
# $^: all deps
# $?: more recent deps

theme/prepare:
	@echo -n "Preparing theme..."
	@test -d dist/theme || mkdir -p dist/theme
	@(cd theme && ( \
		$(MAKE) env=$(env) SHELL=$(SHELL) 1>/dev/null 2>/dev/null \
			&& echo "done." \
			|| (echo -e "\033[0;31mfailed!\033[0m"; exit 1); \
	))

dist/theme/%: theme/dist/%
	@echo -n "Importing $(notdir $@) from theme..."
	@[[ ! -e "$@" && ! -L "$@" ]] || rm -rf "$@"
	@test "$(env)" = "debug" && ln -sr "$<" "$@" || true
	@test "$(env)" = "release" && cp -r "$<" "$@" || true
	@echo "done."

.PHONY: theme/prepare

#-----------------------------------------------------------------------
# Rules for resources
#-----------------------------------------------------------------------

# $@: target
# $*: target basename
# $<: first dep
# $^: all deps
# $?: more recent deps

dist/%: res/%
	@echo -n "Creating resource: $*..."
	@[[ ! -e "$@" && ! -L "$@" ]] || rm -rf "$@"
	@test "$(env)" = "debug" && ln -sr "$<" "$@" || true
	@test "$(env)" = "release" && cp -r "$<" "$@" || true
	@echo "done."
