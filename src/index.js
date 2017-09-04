let fs = require("fs")
let child_process = require("child_process")
let os = require("os")

async function cap(resolve, reject) {
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
      binary = "maim"
      args.push("-s")
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
    reject(data)
  })
  cap.on("close", function(code) {
    console.log(code)
    if(code == 1) resolve(false)
    if(code != 0) reject(`Unknown error. Command exited with error code ${code}`)
    // We shouldn't have any other errors?
    fs.readFile(location, function(err, buffer) {
      if(err) return reject(err)
      resolve(buffer)
    })
  })
}

function capture() {
  return new Promise(cap)
}

module.exports = {
  capture: capture
}
