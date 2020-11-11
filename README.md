# sass-to-html
Sass-to-html provides a command-line sass compilation directly into an HTML file into a `<style>` tag. 

## Usage
```
node index.js [options]
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