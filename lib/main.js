'use babel';

import os from 'os';
import glob from 'glob';

export function provideBuilder() {
	
	// https://github.com/noseglid/atom-build/blob/master/create-provider.md
	
	return class ExtendScriptBuildProvider {
		
		// `constructor` [optional] - is used in ES6 classes to initialize the
		// class. The path where this instance of the build provider will
		// operate is provided. Please note that the build provider will be
		// instanced once per project folder.
		constructor(cwd) {
			
			this.cwd = cwd;
			
		}
		
		// `getNiceName` - aesthetic only and should be a string which is a
		// human readable description of the build configuration is provided.
		getNiceName() {
			
			return 'ExtendScript';
			
		}
		
		// `isEligible` - should be a function which must return synchronously.
		// It should return `true` or `false` indicating if it can build the
		// folder specified in the constructor into something sensible.
		// Typically look for the existence of a build file such as gulpfile.js
		// or Makefile.
		isEligible() {
			
			var eligible = false;
			
			if (glob.sync(this.cwd + '/*.@(jsx)').length >= 1) {
				
				eligible = true;
				
			}
			
			return eligible;
			
		}
		
		// `settings` - can return a Promise or an array of objects. It can
		// provide anything which is allowed by the custom build configuration.
		// This includes the command, cmd, to execute, any arguments, args, and
		// so on.
		settings() {
			
			// Need to test this on Windows … I have no clue if this works:
			//var command = '"C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit\ExtendScript Toolkit.exe"'
			var command = '';
			
			if (os.platform() === 'darwin') {
				
				command = '"/Applications/Adobe ExtendScript Toolkit CC/ExtendScript Toolkit.app/Contents/MacOS"'
				
			}
			
			return {
				exec: command + ' -run',
				errorMatch: [
					'(?<file>.+):(?<line>\\d+):(?<column>\\d+):\\s+(?<type>\\w+):\\s+(?<message>.+)'
				]
			};
			
		}
		
	}
	
}
