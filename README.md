# Simple Regex Engine

This project is a simple regex engine written in JavaScript that supports basic regular expression functionality, such as matching strings and patterns. It supports special characters like `^`, `.`, and `$` for pattern matching and can be used to find substrings in a given text.

## Features

- **Literal Matching**: Matches exact characters from the pattern to the text.
- **Wildcard (`.`)**: Matches any single character.
- **Quantifier (`*`)**:  Matches zero or more occurences of the preceding character.
- **Optional Character (`?`)**:  Matches zero or one occurence of the preceding character.
- **Start of String Anchor (`^`)**: Ensures the pattern matches from the beginning of the string.
- **End of String Anchor (`$`)**: Ensures the pattern matches at the end of the string.


## Limitations

- Does not support classes, quantifiers (`+`, `{}`), or alternation (`|`).

### Examples:


```javascript
search(pattern, text);
```

#### Basic

```javascript
search('abc', 'abc'); // returns true
search('abc', 'abb'); // returns false
search('abc', 'abbaabc'); // returns true
```

#### Wildcard

```javascript
search('a.c', 'abc'); // returns true, '.' matches any single character
search('a.c', 'axc'); // returns true, '.' matches 'x'
search('a.c', 'ac');  // returns false, no character to match '.'
```

#### Quantifier

```javascript
search('ca*t', 'ct'); // returns true
search('ca*t', 'cat'); // returns true
search('ca*t', 'caat'); // returns true
search('ca*t', 'caaat'); // returns true
```

#### Optional Character

```javascript
search('colou?r', 'color'); // returns true
search('colou?r', 'colour') //returns true
search('colou?r', 'colouur'); // returns false
```

#### Start Of String Anchor

```javascript
search('^abc', 'abcde'); // returns true, 'abc' is at the start
search('^abc', 'xabcde'); // returns false, 'abc' is not at the start
```

#### End Of String Anchor

```javascript
search('abc$', '123abc'); // returns true, 'abc' is at the end
search('abc$', '123ab');  // returns false, no match at the end
```