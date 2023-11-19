import { wait } from './helpers'
export default class Drumkit {
  private keys: NodeListOf<Element>

  constructor() {
    this.keys = document.querySelectorAll('.key')
    this.setupEventListeners()

    this.playSound = this.playSound.bind(this)
    this.removeTransition = this.removeTransition.bind(this)
    this.clickPlaySound = this.clickPlaySound.bind(this)

    this.init()
  }

  private playSound(e: KeyboardEvent): void {
    const audio = document.querySelector(
      `audio[data-key="${e.code}"]`
    ) as HTMLAudioElement
    const key = document.querySelector(
      `.key[data-key="${e.code}"]`
    ) as HTMLDivElement

    if (!audio) return // stop the function from running altogether

    key.classList.add('playing')
    audio.currentTime = 0 // rewind to the start
    audio.play()
  }

  private removeTransition(e: KeyboardEvent): void {
    const key = document.querySelector(`.key[data-key="${e.code}"]`)
    if (!key) return
    key.classList.remove('playing')
  }

  private async clickPlaySound(e: MouseEvent): Promise<void> {
    const target = e.currentTarget as HTMLElement
    const currentKey = target.dataset.key
    const audio = document.querySelector(
      `audio[data-key="${currentKey}"]`
    ) as HTMLAudioElement
    const key = document.querySelector(
      `.key[data-key="${currentKey}"]`
    ) as HTMLDivElement

    if (!audio) return // stop the function from running altogether

    key.classList.add('playing')
    audio.currentTime = 0 // rewind to the start
    audio.play()
    await wait(50)
    key.classList.remove('playing')
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', this.playSound)
    window.addEventListener('keyup', this.removeTransition)
    for (const key of this.keys) {
      key.addEventListener('click', (e) => this.clickPlaySound)
    }
  }

  private init(): void {
    this.setupEventListeners()
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.playSound)
    window.removeEventListener('keyup', this.removeTransition)
    for (const key of this.keys) {
      key.removeEventListener('click', (e) => this.clickPlaySound)
    }
  }
}
