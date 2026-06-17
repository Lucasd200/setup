// Download chooser modal + latest-release link resolution.
(function () {
  var modal = document.getElementById('modal')
  var btn = document.getElementById('downloadBtn')
  var close = document.getElementById('modalClose')
  var optWin = document.getElementById('optWin')
  var optMac = document.getElementById('optMac')

  function open() { modal.classList.add('open') }
  function hide() { modal.classList.remove('open') }
  btn.addEventListener('click', open)
  close.addEventListener('click', hide)
  modal.addEventListener('click', function (e) { if (e.target === modal) hide() })
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide() })

  // Resolve direct links to the latest installer assets (works once the
  // releases repo is public). Falls back to the releases page otherwise.
  fetch('https://api.github.com/repos/Lucasd200/botcord/releases/latest')
    .then(function (r) { return r.ok ? r.json() : null })
    .then(function (rel) {
      if (!rel || !rel.assets) return
      rel.assets.forEach(function (a) {
        if (/\.exe$/i.test(a.name)) optWin.href = a.browser_download_url
        if (/\.dmg$/i.test(a.name)) optMac.href = a.browser_download_url
      })
      var ver = document.getElementById('ver')
      if (ver && rel.tag_name) ver.textContent = rel.tag_name + ' · for Windows & macOS'
    })
    .catch(function () {})
})()
