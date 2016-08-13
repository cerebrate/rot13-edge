function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log ("error creating item:" + browser.runtime.lastError);
  } else {
    console.log ("item created successfully");
  }
}

function rot( t, u, v ) {
  return String.fromCharCode( ( ( t - u + v ) % ( v * 2 ) ) + u );
}

function rot13( s ) {
  var b = [], c, i = s.length,
    a = 'a'.charCodeAt(), z = a + 26,
    A = 'A'.charCodeAt(), Z = A + 26;
  while(i--) {
    c = s.charCodeAt( i );
    if( c>=a && c<z ) { b[i] = rot( c, a, 13 ); }
    else if( c>=A && c<Z ) { b[i] = rot( c, A, 13 ); }
    else { b[i] = s.charAt( i ); }
  }
  return b.join( '' );
}

function whenClicked (info, tab) {
  alert (rot13 (info.selectionText));
}

browser.contextMenus.create ({"id" : "do-rot13",
                              "title" : "rot13",
                              "contexts" : ["selection"],
                              "onclick" : whenClicked}, onCreated);

console.log ("rot13 startup executed");
