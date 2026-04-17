// [PROTECTED] © Tharish Dental Clinic — All Rights Reserved
// Unauthorized reproduction or distribution is strictly prohibited.
// ---------------------------------------------------------------
// All method/property identifiers are hex-encoded.  Any attempt to
// run this file from a local filesystem (file://) will immediately
// blank the page and raise an unrecoverable JS error.
// ---------------------------------------------------------------
!function(){'use strict';
  var _w=window,_d=document;
  var _pr=_w['\x6c\x6f\x63\x61\x74\x69\x6f\x6e']['\x70\x72\x6f\x74\x6f\x63\x6f\x6c'];

  /* ══ PROTOCOL GUARD ══════════════════════════════════════════════
     Fires when the HTML file is opened directly from disk (file://).
     Injects a full-page hide rule then throws — halting ALL further
     script execution and leaving the page permanently blank.        */
  if(_pr==='\x66\x69\x6c\x65\x3a'){
    var _blk=_d['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74']('\x73\x74\x79\x6c\x65');
    _blk['\x74\x65\x78\x74\x43\x6f\x6e\x74\x65\x6e\x74']=
      '*,*::before,*::after{'+
        'display:none!important;'+
        'visibility:hidden!important;'+
        'pointer-events:none!important'+
      '}';
    _d['\x68\x65\x61\x64']['\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64'](_blk);
    throw new Error(
      '\u26D4\u0020\u0055\u006e\u0061\u0075\u0074\u0068\u006f\u0072\u0069'+
      '\u007a\u0065\u0064\u003a\u0020\u006c\u006f\u0063\u0061\u006c\u0020'+
      '\u0066\u0069\u006c\u0065\u0073\u0079\u0073\u0074\u0065\u006d\u0020'+
      '\u0061\u0063\u0063\u0065\u0073\u0073\u0020\u0064\u0065\u006e\u0069'+
      '\u0065\u0064'
    );
  }

  /* ══ DISABLE RIGHT-CLICK ════════════════════════════════════════ */
  _d['\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72'](
    '\x63\x6f\x6e\x74\x65\x78\x74\x6d\x65\x6e\x75',
    function(e){e['\x70\x72\x65\x76\x65\x6e\x74\x44\x65\x66\x61\x75\x6c\x74']();},
    !1
  );

  /* ══ DISABLE TEXT SELECTION ═════════════════════════════════════ */
  _d['\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72'](
    '\x73\x65\x6c\x65\x63\x74\x73\x74\x61\x72\x74',
    function(e){e['\x70\x72\x65\x76\x65\x6e\x74\x44\x65\x66\x61\x75\x6c\x74']();},
    !1
  );

  /* ══ DISABLE DRAG ═══════════════════════════════════════════════ */
  _d['\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72'](
    '\x64\x72\x61\x67\x73\x74\x61\x72\x74',
    function(e){e['\x70\x72\x65\x76\x65\x6e\x74\x44\x65\x66\x61\x75\x6c\x74']();},
    !1
  );

  /* ══ BLOCK KEYBOARD SHORTCUTS ═══════════════════════════════════
     Ctrl+U  view-source   Ctrl+S  save page   Ctrl+A  select all
     Ctrl+P  print         Ctrl+Shift+I/J/C  DevTools  F12 DevTools */
  _d['\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72'](
    '\x6b\x65\x79\x64\x6f\x77\x6e',
    function(e){
      var k=e['\x6b\x65\x79'];
      if(e['\x63\x74\x72\x6c\x4b\x65\x79']&&
         (k==='u'||k==='U'||k==='s'||k==='S'||
          k==='a'||k==='A'||k==='p'||k==='P')){
        e['\x70\x72\x65\x76\x65\x6e\x74\x44\x65\x66\x61\x75\x6c\x74']();
        return !1;
      }
      if(e['\x63\x74\x72\x6c\x4b\x65\x79']&&e['\x73\x68\x69\x66\x74\x4b\x65\x79']&&
         (k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c')){
        e['\x70\x72\x65\x76\x65\x6e\x74\x44\x65\x66\x61\x75\x6c\x74']();
        return !1;
      }
      if(k==='\x46\x31\x32'){
        e['\x70\x72\x65\x76\x65\x6e\x74\x44\x65\x66\x61\x75\x6c\x74']();
        return !1;
      }
    },
    !1
  );

  /* ══ CONSOLE DETERRENT ══════════════════════════════════════════ */
  _w['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x6c\x6f\x67'](
    '%c\u26D4 STOP!',
    'color:red;font-size:48px;font-weight:bold'
  );
  _w['\x63\x6f\x6e\x73\x6f\x6c\x65']['\x6c\x6f\x67'](
    '%cThis is a protected website. Unauthorized access or reproduction is strictly prohibited.',
    'color:red;font-size:14px'
  );
}();
