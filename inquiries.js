(() => {
  const form = document.querySelector("#inquiry-form");
  const status = document.querySelector("#inquiry-status");
  const list = document.querySelector("#inquiry-list");
  const configured = window.SUPABASE_URL && !window.SUPABASE_URL.includes("YOUR_")
    && window.SUPABASE_ANON_KEY && !window.SUPABASE_ANON_KEY.includes("YOUR_");

  const formatDate = (value) => new Intl.DateTimeFormat("ko-KR", {
    year: "numeric", month: "long", day: "numeric"
  }).format(new Date(value));

  const displayInquiries = (rows) => {
    list.replaceChildren();
    if (!rows.length) {
      const empty = document.createElement("p");
      empty.className = "empty-inquiries";
      empty.textContent = "아직 공개된 문의가 없습니다.";
      list.append(empty);
      return;
    }
    rows.forEach((row) => {
      const article = document.createElement("article");
      article.className = "inquiry-item";
      const meta = document.createElement("p");
      meta.className = "inquiry-meta";
      meta.textContent = `${row.name} · ${formatDate(row.created_at)}`;
      const message = document.createElement("p");
      message.className = "inquiry-message";
      message.textContent = row.message;
      article.append(meta, message);
      list.append(article);
    });
  };

  if (!configured) {
    list.innerHTML = "<p class=\"empty-inquiries\">문의 기능을 준비 중입니다.</p>";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "문의 시스템 설정 후 이용할 수 있습니다.";
      status.dataset.state = "error";
    });
    return;
  }

  const endpoint = window.SUPABASE_URL + '/rest/v1/inquiries';
  const headers = { apikey: window.SUPABASE_ANON_KEY };

  const loadInquiries = async () => {
    try {
      const response = await fetch(endpoint + '?select=name,message,created_at&public_display=eq.true&order=created_at.desc&limit=20', {
        headers, signal: AbortSignal.timeout(10000), cache: 'no-store'
      });
      if (!response.ok) throw new Error('Inquiry read failed');
      displayInquiries(await response.json());
    } catch {
      list.innerHTML = "<p class=\"empty-inquiries\">공개 문의를 불러오지 못했습니다.</p>";
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type=submit]");
    const payload = {
      name: form.elements.name.value.trim(),
      contact: form.elements.contact.value.trim() || null,
      message: form.elements.message.value.trim(),
      public_display: form.elements.public_display.checked
    };
    if (!payload.name || !payload.message) return;
    submit.disabled = true;
    status.textContent = "문의 내용을 저장하고 있습니다…";
    status.dataset.state = "";
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) throw new Error('Inquiry save failed');
    } catch {
      status.textContent = "저장하지 못했습니다. 잠시 후 다시 시도해 주세요.";
      status.dataset.state = "error";
      return;
    } finally {
      submit.disabled = false;
    }
    form.reset();
    status.textContent = "문의가 접수되었습니다. 감사합니다.";
    status.dataset.state = "success";
    if (payload.public_display) loadInquiries();
  });

  loadInquiries();
})();
