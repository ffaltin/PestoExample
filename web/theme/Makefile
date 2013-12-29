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
lessc_bin = lessc
lessc_flags = -x -O2
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

# Application intermediate objects
app_obj = $(addsuffix .$(jspp_obj), $(app_src))
app_obj_all = $(wildcard src/*.js.$(jspp_obj)) $(wildcard src/**/*.js.$(jspp_obj))

fix_src = $(wildcard fixes/*)
fix_target = $(patsubst %.less, %.css, $(addprefix dist/fixes/, $(notdir $(fix_src))))

#-----------------------------------------------------------------------
# Commands
#-----------------------------------------------------------------------

default: scripts styles fixes resources

clean:
	@echo -n "Cleaning theme..."
	@rm -rf dist/* || true
	@rm -f $(app_obj_all) || true
	@rm -rf build/* || true
	@echo "done."

#-----------------------------------------------------------------------
# Targets
#-----------------------------------------------------------------------

scripts: dist/scripts.js

styles: dist/styles.css

fixes: dist/fixes $(fix_target)

resources: $(res_target)

.PHONY: scripts styles fixes resources

#-----------------------------------------------------------------------
# Rules for scripts
#-----------------------------------------------------------------------

dist/scripts.js: $(app_obj)
	@echo -n "Building scripts.js..."
	@cat $(app_obj) > dist/scripts.js
	@echo "done."

%.js.$(jspp_obj): %.js
	@echo -n "Compiling $(notdir $*.js)..."
	@$(jspp_bin) clean "$<" | $(uglify_bin) $(uglify_flags) --output "$@" 2>/dev/null \
		&& (echo >> dist/$(app_name).js; echo "done.") \
		|| (echo -e "\033[0;31mfailed!\033[0m"; exit 1)

#-----------------------------------------------------------------------
# Rules for styles
#-----------------------------------------------------------------------

dist/styles.css: $(wildcard styles/*) $(wildcard styles/**/*)
	@test -d dist || mkdir -p dist
	@echo -n "Compiling theme styles..."
	@$(lessc_bin) $(lessc_flags) styles/main.less > dist/styles.css \
		&& (echo >> dist/styles.css && echo "done.") \
		|| (rm dist/styles.css; echo -e "\033[0;31mfailed!\033[0m"; exit 1)

#-----------------------------------------------------------------------
# Rules for fixes
#-----------------------------------------------------------------------

dist/fixes: 
	@mkdir -p dist/fixes

dist/fixes/%.css: fixes/%.less
	@echo -n "Compiling fixes/$(notdir $@)..."
	@$(lessc_bin) $(lessc_flags) "$<" > "$@" \
		&& (echo >> "$@" && echo "done.") \
		|| (test ! -f "$@" || rm "$@"; echo -e "\033[0;31mfailed!\033[0m"; exit 1)

dist/fixes/%.js: fixes/%.js
	@echo -n "Compiling fixes/$(notdir $@)..."
	@$(uglify_bin) $(uglify_flags) -o "$@" "$<" \
		&& (echo >> "$@" && echo "done.") \
		|| (test ! -f "$@" || rm "$@"; echo -e "\033[0;31mfailed!\033[0m"; exit 1)

#-----------------------------------------------------------------------
# Rules for resources
#-----------------------------------------------------------------------

# $@: target
# $*: target basename
# $<: first dep
# $^: all deps
# $?: more recent deps

dist/%: res/%
	@test -d dist || mkdir -p dist
	@echo -n "Creating resource: $*..."
	@[[ ! -e "$@" && ! -L "$@" ]] || rm -rf "$@"
	@test "$(env)" = "debug" && ln -sr "$<" "$@" || true
	@test "$(env)" = "release" && cp -r "$<" "$@" || true
	@echo "done."
