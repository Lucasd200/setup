// Download chooser modal + latest-release link resolution.
(function () {
  var modal = document.getElementById('modal')
  var btn = document.getElementById('downloadBtn')
  var close = document.getElementById('modalClose')
  var optWin = document.getElementById('optWin')
  var optMacArm = document.getElementById('optMacArm')
  var optMacIntel = document.getElementById('optMacIntel')

  function open() { modal.classList.add('open') }
  function hide() { modal.classList.remove('open') }
  btn.addEventListener('click', open)
  close.addEventListener('click', hide)
  modal.addEventListener('click', function (e) { if (e.target === modal) hide() })
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide() })

  // Resolve direct links to the latest assets. Prefer the .dmg, fall back to
  // the .zip per architecture so users always get a native build.
  fetch('https://api.github.com/repos/Lucasd200/botcord/releases/latest')
    .then(function (r) { return r.ok ? r.json() : null })
    .then(function (rel) {
      if (!rel || !rel.assets) return
      var pick = function (re) {
        var hit = rel.assets.filter(function (a) { return re.test(a.name) })[0]
        return hit ? hit.browser_download_url : null
      }
      var exe = pick(/\.exe$/i)
      var armDmg = pick(/-arm64\.dmg$/i), armZip = pick(/-arm64\.zip$/i)
      var x64Dmg = pick(/-x64\.dmg$/i), x64Zip = pick(/-x64\.zip$/i)
      if (exe) optWin.href = exe
      if (armDmg || armZip) optMacArm.href = armDmg || armZip
      if (x64Dmg || x64Zip) optMacIntel.href = x64Dmg || x64Zip
      var ver = document.getElementById('ver')
      if (ver && rel.tag_name) ver.textContent = rel.tag_name + ' · for Windows & macOS'
    })
    .catch(function () {})
})()
