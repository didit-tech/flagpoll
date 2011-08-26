##
# default task: when you just run `make`
##

file=*.test.js
files=`find test/unit -name '$(file)' -type f -print0 | xargs -0 echo`

default: all

all: unit

unit:
	@expresso -t 250 -I test -I lib -s $(files)

.PHONY: unit
