const BGM_SOURCES = {
  dev: 'cosmic-traveller.mp3',
  editor: 'dark.mp3',
};

const BGM_VOLUME = 0.6; // 60% target loudness (perceptual, not linear amplitude)
const FADE_MS = 3000;

/** Map 0–1 “percent” to gain so 60% feels ~60% as loud as max, not ~95%. */
function bgmGainForLevel(level) {
  const clamped = Math.max(0, Math.min(1, level));
  return clamped === 0 ? 0 : Math.pow(clamped, 2);
}

function resolveBgmUrl(filename) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}audio/${filename}`.replace(/([^:]\/)\/{2,}/g, '$1');
}

class SoundManager {
  constructor() {
    this.ctx = null;
    this.bgmEntry = null;
    this.bgmFadeTimer = null;
    this.isMuted = true;
    this.currentTheme = 'dev';
    this.listeners = [];
    this.bgmCache = {};
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.isMuted));
  }

  getBgmEntry(theme) {
    if (!this.bgmCache[theme]) {
      const audio = new Audio(resolveBgmUrl(BGM_SOURCES[theme]));
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 1;
      this.bgmCache[theme] = { audio, source: null, gain: null };
    }
    return this.bgmCache[theme];
  }

  ensureBgmGraph(entry) {
    this.init();
    if (!entry.source) {
      entry.source = this.ctx.createMediaElementSource(entry.audio);
      entry.gain = this.ctx.createGain();
      entry.gain.gain.value = 0;
      entry.source.connect(entry.gain);
      entry.gain.connect(this.ctx.destination);
    }
    return entry;
  }

  setTheme(theme) {
    this.currentTheme = theme;
    if (!this.isMuted) {
      this.playBGM(theme);
    }
  }

  toggleMute(theme) {
    this.init();
    this.isMuted = !this.isMuted;
    if (theme) this.currentTheme = theme;

    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.playBGM(this.currentTheme);
    }
    this.notify();
    return this.isMuted;
  }

  setMute(muteState, theme) {
    this.init();
    this.isMuted = muteState;
    if (theme) this.currentTheme = theme;

    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.playBGM(this.currentTheme);
    }
    this.notify();
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.currentTheme === 'dev') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  playTypewriter() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = this.currentTheme === 'dev' ? 4000 : 2500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  playTransition() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    if (this.currentTheme === 'dev') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.5);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.25);
      gain.gain.linearRampToValueAtTime(0, t + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    } else {
      const bufferSize = this.ctx.sampleRate * 1.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(50, t);
      filter.frequency.exponentialRampToValueAtTime(2000, t + 0.5);
      filter.frequency.exponentialRampToValueAtTime(50, t + 1.0);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.5);
      gain.gain.linearRampToValueAtTime(0, t + 1.0);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);
    }
  }

  fadeBgmGain(gainNode, targetGain, durationMs) {
    if (this.bgmFadeTimer) {
      clearInterval(this.bgmFadeTimer);
      this.bgmFadeTimer = null;
    }

    const start = gainNode.gain.value;
    const delta = targetGain - start;
    if (Math.abs(delta) < 0.001) {
      gainNode.gain.value = targetGain;
      return;
    }

    const steps = 30;
    const stepMs = durationMs / steps;
    let step = 0;

    this.bgmFadeTimer = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      gainNode.gain.value = start + delta * progress;
      if (progress >= 1) {
        clearInterval(this.bgmFadeTimer);
        this.bgmFadeTimer = null;
      }
    }, stepMs);
  }

  playBGM(theme) {
    this.stopBGM({ immediate: true });
    if (this.isMuted) return;

    this.init();
    const entry = this.ensureBgmGraph(this.getBgmEntry(theme));
    this.bgmEntry = entry;

    entry.gain.gain.value = 0;
    const playPromise = entry.audio.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
    this.fadeBgmGain(entry.gain, bgmGainForLevel(BGM_VOLUME), FADE_MS);
  }

  stopBGM({ immediate = false } = {}) {
    if (this.bgmFadeTimer) {
      clearInterval(this.bgmFadeTimer);
      this.bgmFadeTimer = null;
    }

    if (!this.bgmEntry) return;

    const entry = this.bgmEntry;
    this.bgmEntry = null;

    const finalize = () => {
      entry.gain.gain.value = 0;
      entry.audio.pause();
      entry.audio.currentTime = 0;
    };

    if (immediate) {
      finalize();
      return;
    }

    this.fadeBgmGain(entry.gain, 0, 1000);
    setTimeout(finalize, 1000);
  }
}

export const soundManager = new SoundManager();
if (typeof window !== 'undefined') {
  window.soundManager = soundManager;
}
