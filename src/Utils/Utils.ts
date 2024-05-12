export async function sh(cmd: string | string[]) {
  return Utils.execAsync(cmd).catch(err => {
    console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err)
    return ""
  })
}
