# Sass-to-html
Sass-to-html provides a command-line sass compilation directly into an HTML file into a `<style>` tag. 

## Example
You have to have one HTML input and one SCSS input _(which can @import another SCSS files)_.
### Input
index.html (without styles)
```html
<html>
<head>
    <title>My great title</title>
</head>
<body>
   <p>Hello world!</p>
</body>
</html>
```
style.scss
```scss
$primary: green;
body {
   color: $primary;
}
```
### Command
```
sass-to-html 
```
### Result
original index.html has been modified:
```
<html>
<head>
    <title>My great title</title>
    <style>body{color:green}</style>
</head>
<body>
   <p>Hello world!</p>
</body>
</html>
```

## Usage
After installation command `sass-to-html` should be available in your environment.
```
sass-to-html [options]
```
Or you can run it manually with absolute path
```
node path/to/sass-to-html/index.js [options]
```

### Options:
| short | long | description |
|---|---|---|
| -V, | --version     | output the version number    
| -d, | --debug       | output extra log    
| -w, | --watch       | watch selected .scss file (default: false)    
| -i, | --html <type> | path to .html file (default: "index.html")    
| -s, | --scss <type> | path to .scss file (default: "style.scss")    
| -h, | --help        | display help for command    
