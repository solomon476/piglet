const STORAGE_KEY = 'piglet_settings_v1';

const defaultSettings = {
  theme: 'soul',
  ambientSound: null,
  pinnedEntryId: 'piglet', // Default to Piglet
  alwaysShowPinnedFirst: true, // If true, skips opening screen or changes it
  lastVisitDate: new Date().toISOString(),
  firstVisitDate: new Date().toISOString(),
  vaultUnlocked: false,
};

export function getSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...defaultSettings, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error("Could not load settings", e);
  }
  return defaultSettings;
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Could not save settings", e);
  }
}

export function updateLastVisit() {
  const settings = getSettings();
  settings.lastVisitDate = new Date().toISOString();
  saveSettings(settings);
}

export function getDaysSinceLastVisit() {
  const settings = getSettings();
  const last = new Date(settings.lastVisitDate);
  const now = new Date();
  const diffTime = Math.abs(now - last);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
