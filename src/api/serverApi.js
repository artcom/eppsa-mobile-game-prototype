/* eslint-disable no-unused-vars,import/no-extraneous-dependencies */
import client from "socket.io-client"

export default class ServerApi {
  constructor(hostname, dispatch) {
    this.socket = client(`${hostname}:5000`, { secure: true })
  }

  get id() {
    return this.socket.id
  }

  setName(name) {
    this.socket.emit("setName", name)
  }

  playSolo() {
    this.socket.emit("playSolo")
  }

  playRandom() {
    this.socket.emit("playRandom")
  }

  playWith(player) {
    this.socket.emit("playWith", player)
  }

  acceptInvite(fromPlayer) {
    this.socket.emit("acceptInvite", fromPlayer)
  }

  itemScanned(item) {
    this.socket.emit("itemScanned", item)
  }

  ready(ready, partner) {
    this.socket.emit("ready", { ready, partner })
  }

  on(event, fn) {
    this.socket.on(event, fn)
  }
}
