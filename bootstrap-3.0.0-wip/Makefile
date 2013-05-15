BOOTSTRAP ?= ../templates/css/bootstrap.css
BOOTSTRAP_LESS ?= ./less/bootstrap.less
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔ Done\033[39m
HR=\033[37m--------------------------------------------------\033[39m
PATH := ./node_modules/.bin:$(PATH)


#
# BUILD DOCS
#

build:
	@echo "\n\n"
	@echo "\033[36mBuilding Bootstrap...\033[39m"
	@echo "${HR}"
	@printf "Running JSHint on JavaScript..."
	@jshint js/*.js --config js/.jshintrc
	@jshint js/tests/unit/*.js --config js/.jshintrc
	@echo "             ${CHECK}"
	@printf "Compiling LESS with Recess..."
	@recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	@echo "               ${CHECK}"
	@printf "Prepping documentation assets..."
	@cp fonts/* ../templates/font/
	@cp js/*.js ../templates/js/
	@cp js/tests/vendor/jquery.js ../templates/js/
	@echo "            ${CHECK}"
	@printf "Compiling and minifying JavaScript..."
	@cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-affix.js > ../templates/js/bootstrap.js
	@uglifyjs -nc ../templates/js/bootstrap.js > ../templates/js/bootstrap.min.tmp.js
	@echo "/**\n* Bootstrap.js v3.0.0 by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > ../templates/js/copyright.js
	@cat ../templates/js/copyright.js ../templates/js/bootstrap.min.tmp.js > ../templates/js/bootstrap.min.js
	@rm ../templates/js/copyright.js ../templates/js/bootstrap.min.tmp.js
	@echo "       ${CHECK}"
	@echo "${HR}"
	@echo "\033[36mSuccess!\n\033[39m"
	@echo "\033[37mThanks for using Bootstrap,"
	@echo "<3 @mdo and @fat\n\033[39m"

#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

test:
	jshint js/*.js --config js/.jshintrc
	jshint js/tests/unit/*.js --config js/.jshintrc
	node js/tests/server.js &
	phantomjs js/tests/phantom.js "http://localhost:3000/js/tests"
	kill -9 `cat js/tests/pid.txt`
	rm js/tests/pid.txt

#
# CLEANS THE ROOT DIRECTORY OF PRIOR BUILDS
#

clean:
	rm -r bootstrap

#
# BUILD SIMPLE BOOTSTRAP DIRECTORY
# recess & uglifyjs are required
#

bootstrap: bootstrap-font bootstrap-css bootstrap-js


#
# JS COMPILE
#
bootstrap-js: bootstrap/js/*.js

bootstrap/js/*.js: js/*.js
	cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-affix.js > ../templates/js/bootstrap.js
	uglifyjs -nc ../templates/js/bootstrap.js > ../templates/js/bootstrap.min.tmp.js
	echo "/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > ../templates/js/copyright.js
	cat ../templates/js/copyright.js ../templates/js/bootstrap.min.tmp.js > ../templates/js/bootstrap.min.js
	rm ../templates/js/copyright.js ../templates/js/bootstrap.min.tmp.js

#
# CSS COMPLILE
#

bootstrap-css: bootstrap/css/*.css

bootstrap/css/*.css: less/*.less
	recess --compile ${BOOTSTRAP_LESS} > ../templates/css/bootstrap.css
	recess --compress ${BOOTSTRAP_LESS} > ../templates/css/bootstrap.min.css

#
# FONTS
#

bootstrap-font: ../templates/font/*

../templates//font/*: fonts/*
	cp fonts/* ../templates/font/

#
# WATCH LESS FILES
#

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"


.PHONY: docs watch gh-pages bootstrap-img bootstrap-css bootstrap-js
