(() => {
  'use strict';
  const base = 'https://mvekzxjruttvpdcgqyuf.supabase.co/rest/v1/';
  // Public browser key. Database policies allow published content to be read only.
  const key = 'sb_publishable_C0vOAduTf-dSmoiJoAtuqw_vost5OIg';
  const id = 'dongbeom-cho-2026';
  const headers = { apikey: key };
  const lines = (target, values) => {
    target.replaceChildren();
    values.forEach((value, index) => {
      if (index) target.append(document.createElement('br'));
      target.append(document.createTextNode(value));
    });
  };
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  async function read(table, query) {
    const response = await fetch(base + table + '?' + query, {
      headers, signal: AbortSignal.timeout(8000), cache: 'no-store'
    });
    if (!response.ok) throw new Error('Content request failed: ' + response.status);
    return response.json();
  }
  async function load() {
    const [exhibitions, programs] = await Promise.all([
      read('exhibitions', 'id=eq.' + id + '&select=*'),
      read('programs', 'exhibition_id=eq.' + id + '&select=*&order=position.asc,id.asc')
    ]);
    const exhibition = exhibitions[0];
    if (!exhibition || !Array.isArray(exhibition.title_lines) || !exhibition.title_lines.length) {
      throw new Error('No published exhibition');
    }
    document.querySelector('.hero .artist').textContent = exhibition.artist;
    const title = document.querySelector('.hero h1');
    title.replaceChildren();
    exhibition.title_lines.forEach((line, index) => {
      if (index) title.append(document.createElement('br'));
      title.append(index === exhibition.title_lines.length - 1
        ? element('em', line) : document.createTextNode(line));
    });
    document.title = exhibition.title_lines.join(' ') + ' — ' + exhibition.artist + ' | 갤러리 세빈';
    document.querySelector('.hero .date').textContent = exhibition.date_label;
    document.querySelector('.hero .hours').textContent = exhibition.hours + ' · ' + exhibition.closed_days;
    document.querySelector('#about > div > p').textContent = exhibition.summary;
    const details = document.querySelectorAll('#visit dd');
    details[0].textContent = exhibition.visit_period;
    lines(details[1], [exhibition.hours, exhibition.closed_days]);
    lines(details[2], [exhibition.location, exhibition.address]);
    lines(details[3], [exhibition.subway, '초대장에 안내된 출구입니다.']);
    document.querySelector('#visit .button').href = 'https://map.naver.com/p/search/' + encodeURIComponent(exhibition.address);
    const list = document.querySelector('.program-list');
    const scheduled = document.createDocumentFragment();
    const extras = document.createDocumentFragment();
    programs.forEach(program => {
      const info = element('div');
      info.append(element('h3', program.title));
      const description = element('p');
      lines(description, program.details);
      info.append(description);
      if (program.kind === 'scheduled') {
        const item = element('li');
        const time = element('time', program.date_label);
        if (program.event_date) time.dateTime = program.event_date;
        item.append(time, info);
        scheduled.append(item);
      } else {
        info.className = 'program-extra';
        if (program.badge) info.prepend(element('span', program.badge, 'pending'));
        extras.append(info);
      }
    });
    list.replaceChildren(scheduled);
    document.querySelectorAll('#programs .program-extra').forEach(node => node.remove());
    list.after(extras);
    document.documentElement.dataset.contentSource = 'supabase';
  }
  load().catch(error => {
    // Keep the complete HTML exhibition available when the network is unavailable.
    document.documentElement.dataset.contentSource = 'fallback';
    console.warn('전시 정보를 불러오지 못해 기본 안내를 표시합니다.', error.message);
  });
})();
