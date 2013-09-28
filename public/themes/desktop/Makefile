#-----------------------------------------------------------------------
# Configuration
#-----------------------------------------------------------------------

# Parameters
SHELL  = /bin/bash
lessc  = lessc --yui-compress -O2
uglify = uglifyjs

#-----------------------------------------------------------------------
# Commands
#-----------------------------------------------------------------------

default: scripts styles

clean:
	@echo -n "Cleaning..."
	@test -f scripts/all.js && rm scripts/all.js || true
	@test -f styles/all.css && rm styles/all.css || true
	@echo "done."

.PHONY: default clean

#-----------------------------------------------------------------------
# Targets
#-----------------------------------------------------------------------

scripts: scripts/all.js

styles: styles/all.css

.PHONY: scripts styles

#-----------------------------------------------------------------------
# Rules
#-----------------------------------------------------------------------

scripts/all.js: $(filter-out scripts/all.js, $(wildcard scripts/*))
	@echo -n "Compiling scripts..."
	@$(uglify) scripts/main.js >scripts/all.js 2>/dev/null || (rm scripts/all.js; echo -e "\033[0;31mfailed!\033[0m\n"; exit 1)
	@echo >> scripts/all.js
	@echo "done."


styles/all.css: $(filter-out styles/all.css, $(wildcard styles/*)) fonts
	@echo -n "Compiling styles..."
	@$(lessc) styles/main.less >styles/all.css || (rm styles/all.css; echo -e "\033[0;31mfailed!\033[0m\n"; exit 1)
	@echo >> styles/all.css
	@echo "done."
