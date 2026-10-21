(() => {
  const status = document.getElementById('share-status');
  const fallback = document.getElementById('share-fallback');
  const shareUrl = () => {
    const url = new URL(location.protocol === 'file:'
      ? document.querySelector('link[rel="canonical"]').href : location.href);
    url.hash = '';
    url.search = '';
    return url.href;
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      fallback.hidden = true;
      status.textContent = '링크를 복사했습니다. 카카오톡이나 인스타그램에 붙여넣어 주세요.';
    } catch {
      fallback.value = shareUrl();
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      status.textContent = '아래 주소를 길게 눌러 복사하거나 Ctrl+C를 눌러 주세요.';
    }
  }
  document.getElementById('copy-link').addEventListener('click', copy);
  document.getElementById('share-link').addEventListener('click', async () => {
    if (!navigator.share) return copy();
    try {
      await navigator.share({
        title: document.title,
        text: '갤러리 세빈에서 조동범 사진전을 만나보세요. 전시·프로그램 안내',
        url: shareUrl()
      });
      status.textContent = '공유 창을 닫았습니다.';
    } catch (error) {
      if (error.name !== 'AbortError') await copy();
    }
  });
})();
