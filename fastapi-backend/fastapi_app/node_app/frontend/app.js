function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.opacity = '1';
  setTimeout(() => {
    notification.style.opacity = '0';
  }, 3000);
}

async function universalLookup() {
  const identifier = document.getElementById('universal').value;
  if (!identifier) {
    showNotification('Please enter an email or username.');
    return;
  }
  gravatarLookup(identifier);
  githubLookup(identifier);
}

async function gravatarLookup(identifier = null) {
  const email = identifier || document.getElementById('gravatar').value;
  if (!email) {
    showNotification('Please enter an email for Gravatar lookup.');
    return;
  }

  const loadingDiv = document.getElementById('gravatar-loading');
  const resultsDiv = document.getElementById('gravatar-results');
  loadingDiv.style.display = 'block';
  resultsDiv.classList.remove('show');

  try {
    const res = await fetch('http://localhost:5000/api/accounts/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email })
    });
    const data = await res.json();
    loadingDiv.style.display = 'none';

    if (data.externalData.gravatarProfile) {
      const g = data.externalData.gravatarProfile;
      document.getElementById('gravatar-img').src = g.thumbnailUrl || '';
      document.getElementById('gravatar-name').textContent = g.displayName || 'N/A';
      document.getElementById('gravatar-location').textContent = g.currentLocation || 'N/A';
      document.getElementById('gravatar-profile').href = g.profileUrl || '#';
      document.getElementById('gravatar-profile').textContent = g.profileUrl || 'N/A';
      resultsDiv.classList.add('show');
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
      showNotification('No Gravatar profile found.');
    }
  } catch (err) {
    loadingDiv.style.display = 'none';
    showNotification('Error: ' + err.message);
  }
}

async function githubLookup(identifier = null) {
  const username = identifier || document.getElementById('github').value;
  if (!username) {
    showNotification('Please enter a GitHub username.');
    return;
  }

  const loadingDiv = document.getElementById('github-loading');
  const resultsDiv = document.getElementById('github-results');
  loadingDiv.style.display = 'block';
  resultsDiv.classList.remove('show');

  try {
    const res = await fetch('http://localhost:5000/api/accounts/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: username })
    });
    const data = await res.json();
    loadingDiv.style.display = 'none';

    if (data.externalData.github) {
      const gh = data.externalData.github;
      document.getElementById('github-img').src = gh.avatar_url || '';
      document.getElementById('github-username').textContent = gh.login || 'N/A';
      document.getElementById('github-profile').href = gh.html_url || '#';
      document.getElementById('github-profile').textContent = gh.html_url || 'N/A';
      resultsDiv.classList.add('show');
      resultsDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
      showNotification('No GitHub profile found.');
    }
  } catch (err) {
    loadingDiv.style.display = 'none';
    showNotification('Error: ' + err.message);
  }
}