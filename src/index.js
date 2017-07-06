let fs = require("fs")
let child_process = require("child_process")

async function capture() {
  // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  let location = `${os.tmpdir()}/tmp-${new Date().getTime()}.png`
  let args = []
  switch(process.platform) {
    case "darwin": {
      binary = "/usr/sbin/screencapture"
      args.push("-iox")
      break
    }
    case "linux": {
      binary = "import"
      break
    }
    case "win32": {
      binary = "../win/screenshot"
      break
    }
    default: {
      throw new Error("Platform not supported!")
    }
  }
  args.push(location)
  let cap = child_process.spawn(binary, args)
  cap.stderr.on("data", function(data) {
    throw new Error(data)
  })
  cap.on("close", function(code) {
    if(code == 1) return false
    if(code != 0) throw new Error(`Unknown error. Command exited with error code ${code}`)
    // We shouldn't have any other errors?
    return fs.createReadStream(location)
  })
}

module.exports = {
  capture: capture
}
