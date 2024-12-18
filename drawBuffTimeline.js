import SkillIds from 'gw2-data/SkillIds';

const boringBuffs = {
  'Do Nothing Transformation Buff': true,
  'Conjure Fire Attributes': true,
  'Conjure Fiery Greatsword': true,
  'Number of Boons': true,
  'Ride the Lightning': true,
  'Signet of Restoration': true,
  'Elemental Refreshment': true,
  'The Light of Deldrimor': true,
  'Hylek Language Effect': true,
  'Incoming!': true,
  'Jump Mushroom Knowledge': true,
  'Mushroom Tracking Knowledge': true,
  'Nuhoch Alchemy': true,
  'Radiant Attunement': true,
  'Speed Mushroom Knowledge': true,
  'Solar Beam': true,
  'Stealth Gliding': true,
  'Xera\'s Fury': true,
};

const profSpecificBuffs = {
  // Weaver
  'Fire/Fire': 0,
  'Earth/Fire': 1,
  'Earth/Earth': 2,
  'Fire/Earth': 3,
  'Fire/Water': 4,
  'Water/Fire': 5,
  'Water/Earth': 6,
  'Air/Water': 7,
  'Air/Fire': 8,
  'Air/Air': 9,
  'Fire/Air': 10,
  'Primordial Stance': 11,
  'Elements of Rage': 12,
  'Signet of Fire': 13,
  'Glyph of Elemental Power (Fire)': 14,
  'Magnetic Wave': 15,
  'Weaver\'s Prowess': 16,
  'Persistent Flames': 17,
  'Fire Aura': 18,
  'Shocking Aura': 19,
  'Fresh Air': 20,
  // Tempest
  'Air Attunement': 0,
  'Earth Attunement': 1,
  'Fire Attunement': 2,
  'Water Attunement': 3,
  'Tempestuous Aria': 4,
  'Transcendent Tempest': 5,
  // Catawyst
  'Crescent Wind': 5,
  'Rocky Loop': 6,
  'Flame Wheel': 7,
  'Icy Coil': 8,
  'Relentless Fire': 9,
  'Elemental Empowerment': 10,
  'Empowering Auras': 11,

  // Chrono
  'Fencer\'s Finesse': 0,
  'Time Anchored': 1,
  'Signet of the Ether': 2,
  // Mirage
  'Mirage Cloak': 0,
  'Compounding Power': 1,
  'Chaos Armor': 3,
  // Virtuoso
  'Deadly Blades': 4,
  'Virtuoso Blade': 5,
  'Signet of Illusions': 6,

  // Reaper
  'Reaper\'s Shroud': 0,
  // Scourge
  'Plague Sending': 1,
  'Soul Barbs': 2,
  // Harbinger
  'Harbinger Shroud': 0,
  'Blight': 3,
  'Locust Swarm': 4,

  // Daredevil
  'Assassin\'s Signet (Passive)': 0,
  'Assassin\'s Signet (Active)': 1,
  'Bounding Dodger': 2,
  Revealed: 3,
  'Lead Attacks': 4,
  'Lotus Training': 5,
  'Skale Venom': 6,
  'Spider Venom': 7,
  // Specter
  'Shadow Shroud': 0,
  // Deadeye
  'Kneeling': 8,
  'Deadeye\'s Gaze': 9,

  // Soulbeast
  'One Wolf Pack': 0,
  'Sharpening Stone': 1,
  'Sic \'Em!': 2,
  'Twice as Vicious': 3,
  // Untamed
  'Unleashed': 2,
  'Pet Unleashed': 3,

  // Holosmith
  'Photon Forge': 0,
  'Afterburner': 1,

  // Mechanist (nothing interesting yet)
  // Scrapper (stability added based on profession)

  // Renegade
  'Legendary Demon Stance': 0,
  'Legendary Assassin Stance': 1,
  'Legendary Renegade Stance': 2,
  'Legendary Dragon Stance': 3,
  'Legendary Alliance Stance': 4,
  'Legendary Dwarf Stance': 5,
  'Embrace the Darkness': 6,
  'Impossible Odds': 7,
  'Razorclaw\'s Rage': 8,
  'Improved Kalla\'s Fervor': 9,
  // Herald
  'Facet of Nature': 15,
  'Facet of Light': 16,
  'Facet of Elements': 17,
  'Facet of Darkness': 18,
  'Facet of Strength': 19,
  'Burst of Strength': 20,
  'Facet of Chaos': 21,
  'Expose Defenses': 22,
  // Vindicator
  'Forerunner of Death': 23,

  // Firebrand
  'Zealot\'s Flame': 0,
  'Renewed Focus': 1,
  'Ashes of the Just': 2,
  // Dragonhunter
  'Symbolic Avenger': 0,
  'Shield of Wrath': 1,
  'Spear of Justice': 2,
  Justice: 3,
  // Willbender
  'Lethal Tempo': 8,
  'Rushing Justice': 9,
  // Guardian
  'Inspiring Virtue': 4,
  'Virtue of Courage': 5,
  'Virtue of Justice': 6,
  'Virtue of Resolve': 7,
};

function recreateJusticeFromSpearPassive(log) {
  const buffs = log.buffs;
  if (!buffs.hasOwnProperty(SkillIds.SPEAR_OF_JUSTICE)) {
    console.log('no spear', log);
    return;
  }
  const soj = buffs[SkillIds.SPEAR_OF_JUSTICE];
  const fakeJusticeEvents = [];
  for (const buffEvent of soj) {
    if (!buffEvent.hasOwnProperty('Remove')) {
      continue;
    }
    const time = buffEvent.Remove;
    if (time === 0) {
      continue;
    }
    const justiceDur = 6000 * 1.33; // 6000 base plus Big Game Hunter trait
    fakeJusticeEvents.push({Apply: time});
    fakeJusticeEvents.push({Remove: time + justiceDur});
  }
  buffs[SkillIds.JUSTICE] = fakeJusticeEvents;
  log.skills[SkillIds.JUSTICE] = 'Justice';
  console.log('did the thing', log);
}

function createBuffElement(x, y, height, outlineOnly) {
  const group = document.createElementNS('http://www.w3.org/2000/svg',
                                         'g');
  const title = document.createElementNS('http://www.w3.org/2000/svg',
                                         'title');
  const rect = document.createElementNS('http://www.w3.org/2000/svg',
                                        'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('height', height);
  rect.classList.add('buff');
  if (outlineOnly) {
    rect.classList.add('buff-outline');
  } else {
    group.appendChild(title);
  }
  group.appendChild(rect);
  return group;
}

function finalizeBuffElement(buffElement, timeToX, end) {
  const rect = buffElement.querySelector('rect');
  rect.setAttribute('width', timeToX(end) -
                    rect.getAttribute('x'));
  const title = buffElement.querySelector('title');
  if (!title) {
    return;
  }
  const start = parseFloat(buffElement.dataset.start);
  const startStr =
    (parseFloat(buffElement.dataset.start) / 1000).toFixed(2);
  const duration = ((end - start) / 1000).toFixed(2);
  title.textContent = `${startStr}s, ${duration}s`;
}

function draw(board, legend, log, player, startRow, dimensions, showBoring,
              outlineOnly) {
  const {railHeight, railPad, timeToX} = dimensions;

  recreateJusticeFromSpearPassive(log);

  if (player.profession === 'Weaver') {
    Object.assign(boringBuffs, {
      'Fire Attunement': true,
      'Water Attunement': true,
      'Air Attunement': true,
      'Earth Attunement': true,
    });
  }

  if (player.profession === 'Scrapper') {
    Object.assign(profSpecificBuffs, {
      'Stability': 0,
    });
  }

  for (let id in log.buffs) {
    if (!log.skills[id]) {
      console.warn('Missing skill name', id);
      log.skills[id] = `${id}`;
    }
  }

  let buffs = log.buffs;

  if (!showBoring) {
    buffs = {};
    for (const id in log.buffs) {
      const buffName = log.skills[id];
      if (boringBuffs.hasOwnProperty(buffName)) {
        continue;
      }
      if (profSpecificBuffs.hasOwnProperty(buffName)) {
        buffs[id] = log.buffs[id];
      }
    }
  }

  const buffIds = Object.keys(buffs).sort((a, b) => {
    let aName = log.skills[a];
    let bName = log.skills[b];
    if (profSpecificBuffs.hasOwnProperty(aName)) {
      if (profSpecificBuffs.hasOwnProperty(bName)) {
        return profSpecificBuffs[aName] - profSpecificBuffs[bName];
      }
      return -1;
    } else if (profSpecificBuffs.hasOwnProperty(bName)) {
      return 1;
    }
    return aName.localeCompare(bName);
  });

  let row = startRow;
  for (const buffId of buffIds) {
    // if (/^[+(12]/.test(skills[buffId])) {
    //   continue;
    // }
    if (!/^[A-Z]/.test(log.skills[buffId])) {
      continue;
    }

    if (log.skills[buffId].startsWith('Guild')) {
      continue;
    }

    if (boringBuffs[log.skills[buffId]]) {
      continue;
    }

    const buffElements = [];
    for (const event of buffs[buffId]) {
      if (event.Apply) {
        const buffElement = createBuffElement(
          timeToX(event.Apply), (railHeight + railPad) * row, railHeight,
          outlineOnly);
        buffElement.dataset.start = event.Apply;
        buffElements.push(buffElement);
      }
      if (event.Remove) {
        let buffElement = buffElements.pop();
        if (!buffElement) {
          buffElement = createBuffElement(
            timeToX(log.start), (railHeight + railPad) * row, railHeight,
            outlineOnly);
          buffElement.dataset.start = log.start;
        }
        finalizeBuffElement(buffElement, timeToX, event.Remove);
        board.appendChild(buffElement);
      }
    }
    for (const buffElement of buffElements.reverse()) {
      finalizeBuffElement(buffElement, timeToX, log.end);
      board.appendChild(buffElement);
    }

    if (!outlineOnly) {
      const name = document.createElementNS('http://www.w3.org/2000/svg',
                                            'text');
      name.textContent = log.skills[buffId];
      name.setAttribute('x', 0);
      name.setAttribute('y', row * (railHeight + railPad) + railHeight / 2);
      name.classList.add('name');
      legend.appendChild(name);
    }
    row += 1;
  }

  return row - startRow;
}

export default draw;
