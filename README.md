# dont-sacrifice-your-principals

Prototype of a flashcard app that supports toggling of principal parts and other vocabulary "baggage". My first (and, God willing, my last) time using React!

To run this, you'll need to `npm install`. You might have to `npm uninstall babel; npm install --save-dev babel-cli` afterwards. Who knows why!

Afterwards you'll need to generate `script-compiled.js` from `script.js` using Babel so you can use that sweet sweet React JSX. The command I used: `npm babel --watch script.js --out-file script-compile.js --presets react-app/prod`

Things I'd like to add include:

* introduce `Principal Parts` mode where the L2 side has all principal parts listed out (e.g. `schreiben, schriebt, schrieb, geschrieben`) alongside `Base Words Only`
* allow toggling of detail cards in flashcard set maker
* allow vocab mode (allow all three modes - Base Words Only, Principal Parts, or All Word Details) and grammar mode (All Word Details only) - with some kind of accounting for languages where principal parts aren't applicable