// todo headers

$(function() {
  if (T.UI.Compatibility.check() !== true) {

    new T.UI.Message(
        T.Locale.get('ui warnings compatibility'), 'WARNING',
        `<button class="micro-button" onclick="T.Plugins.open('browser-compatibility')" >` +
            T.Locale.get('ui', 'buttons', 'compatibility') + `</button>`);
  }
});
