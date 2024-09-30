
function matchCharacter(pattern, text) {
  if (!pattern) return true;          // Empty pattern always matches
  if (!text) return false;            // No text left but pattern exists, no match
  if (pattern === '.') return true;   // '.' is a wildcard and matches any character
  return pattern === text;            // Otherwise, check for exact character match
}

// Function to handle '?' in the pattern (matches 0 or 1 occurrence of preceding character)
function matchQuestion(pattern, text) {
  // If the first characters match, try matching the rest of the pattern and text
  if (matchCharacter(pattern[0], text[0]) && match(pattern.slice(2), text.slice(1))) {
    return true;
  }
  // Otherwise, skip the optional character ('?') and try matching the rest of the pattern
  return match(pattern.slice(2), text);
}

// Function to handle '*' in the pattern (matches 0 or more occurrences of preceding character)
function matchStar(pattern, text) {
  // Try matching one or more occurrences OR skip the '*' and try matching the rest
  return (matchCharacter(pattern[0], text[0]) && match(pattern, text.slice(1))) || match(pattern.slice(2), text);
}

// Recursive function to check if the entire pattern matches the entire text
function match(pattern, text) {

  if (!pattern) return true;          // Base case: empty pattern always matches
  if (pattern === '$' && !text) return true; // '$' at the end of pattern means end of string match
  
  // Handle '?' or '*' as the second character in the pattern
  if (pattern.startsWith('?', 1)) return matchQuestion(pattern, text);
  if (pattern.startsWith('*', 1)) return matchStar(pattern, text);

  // If no special characters, check if the first characters match and recurse
  return matchCharacter(pattern[0], text[0]) && match(pattern.slice(1), text.slice(1));
}

// Search function to find the pattern in the text, handling start-of-string anchor ('^')
function search(pattern, text) {
  
  // Validate pattern: it shouldn't start with '?' or '*' without a preceding character
  if (pattern.startsWith('?') || pattern.startsWith('*')) {
    throw new Error("Invalid pattern: '?' or '*' cannot appear at the beginning of the pattern");
  }

  if (pattern.startsWith('^')) {
    // Match the pattern from the start of the text
    return match(pattern.slice(1), text);
  }
  // Otherwise, search for the pattern at any position in the text
  return text.split("").some((_, index) => match(pattern, text.slice(index)));
}

// CommonJS export (Node.js)
module.exports = { search };

// Uncomment for ECMAScript module export (frontend or modern JavaScript)
// export default search;