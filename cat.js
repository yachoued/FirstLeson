"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// Get command-line arguments
var args = process.argv.slice(2);
// The slice() method returns selected elements in an array, as a new array.
// The slice() method selects from a given start, up to a (not inclusive) given end.
// The slice() method does not change the original array.
// Function to print file contents
function printFile(filePath, addLineNumbers, startingLineNumber) {
    if (addLineNumbers === void 0) { addLineNumbers = false; }
    if (startingLineNumber === void 0) { startingLineNumber = 1; }
    var fileName = path.basename(filePath); // The path.basename() method returns the filename part of a file path.
    // OR
    // const fileParts :string[] = filePath.split("/");        // Splits the path into an array
    // const lastParts  :string = fileParts[fileParts.length - 1];  // Accesses the last element of the array (fileName)
    // Check if the file exists and is a valid file
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) { // existsSync :  check if a file exists ,statSync : The file information is included in the stats variable
        // stats.isFile() : is used to check whether fs.Stats object describes a file or not.
        console.error("Error: ".concat(fileName, " is not a valid file."));
        return startingLineNumber;
    }
    // Read file content
    var content = fs.readFileSync(filePath, "utf8");
    var lines = content.split("\n"); // The split("\n") method splits this string into an array of lines.
    // "\n" represents a newline character
    // Print each line, with or without line numbers
    lines.forEach(function (line, index) {
        if (addLineNumbers) {
            console.log("".concat(startingLineNumber + index, "  ").concat(line)); // index is the current position in the array (start with 0)
        }
        else {
            console.log(line);
        }
    });
    return startingLineNumber + lines.length; // lines.length gives the total number of lines, so we add it to 'startingLineNumber'
    // to calculate the number of the next line for potential subsequent files.
}
// ** Not included in the project i add just for testing **
function createFile(fileName) {
    var filePath = path.resolve(fileName);
    // Check if the file already exists
    if (fs.existsSync(filePath)) {
        console.error("Error: The file \"".concat(fileName, "\" already exists."));
        console.error('Error: The file "' + fileName + '" does not exist.');
        return;
    }
    // Create a file 
    try {
        fs.writeFileSync(filePath, ""); // Creates an empty file
        console.log("File \"".concat(fileName, "\" created successfully."));
    }
    catch (error) {
        console.error("Error creating file: ".concat(error.message));
    }
}
//*******/
// Function to display help information
function showHelp() {
    console.log("Usage:\n  cat [FILE]...           Concatenate FILE(s) to standard output.\n  cat -n [FILE]...        Number all output lines.\n  cat -c [FILE]           Create a new file. \n  cat --help              Display this help and exit.");
}
// Main function to handle input
function main() {
    if (args.length === 0 || args.includes("--help")) {
        showHelp();
        return;
    }
    var addLineNumbers = false;
    var files = [];
    var startingLineNumber = 1;
    // ** Not included in the project i add just for testing **
    // Check if the command is for creating a file ()
    if (args[0] === "-c") {
        if (args.length < 2) {
            console.error("Error: No file name for creation.");
            return;
        }
        var fileName = args[1];
        createFile(fileName);
        return;
    }
    //*******/
    // Check if -n is used for add lines numbers
    if (args[0] === "-n") {
        addLineNumbers = true;
        files = args.slice(1); // Get files , Beispiel. args :-n test.txt test2.txt
        // args[0] = -n , args[1] = test.txt , args[2] = test2.txt
        // args.slice(1) Start from args[1].....
    }
    else {
        files = args;
    }
    // Process each file
    files.forEach(function (file) {
        var fullPath = path.resolve(file); // The path.resolve() method in Node.js is a powerful tool for constructing absolute paths from relative path segments
        // Beispiel. the absolute path : home/mohammedyachou/Desktop/node-cat-clone/
        startingLineNumber = printFile(fullPath, addLineNumbers, startingLineNumber);
    });
}
// Start the program
main();
// Command Beispiel: node cat.js -n test.txt test2.txt 
