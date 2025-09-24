// DYNAMIC PAGE RENDERING LOGIC
function setHeaderContent(headerData) {
  const headerTitleElement = document.getElementById('dynamic-title');
  const headerLinkElement = document.getElementById('header-link');
  if (headerTitleElement) {
    headerTitleElement.textContent = headerData.title;
  }
  if (headerLinkElement) {
    headerLinkElement.textContent = headerData.buttonText;
    headerLinkElement.href = headerData.buttonUrl;
  }
}

function renderProductCards(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.forEach(item => {
    const a = document.createElement("a");
    a.className = "product-card";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `Explore topic ${item.name}`);

    a.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${item.img}" alt="${item.name} image" loading="lazy" />
      </div>
      <div class="product-info">
        <h3 class="product-name">${item.name}</h3>
        ${item.subtitle ? `<p class="product-subtitle">${item.subtitle}</p>` : ""}
      </div>
    `;
    container.appendChild(a);
  });
}

function setFooterContent(footerData) {
  const privacyPolicyLink = document.getElementById('privacy-policy-link');
  const socialTitleElement = document.getElementById('footer-social-title');
  const socialLinksContainer = document.getElementById('social-links-container');

  if (privacyPolicyLink) {
    privacyPolicyLink.textContent = footerData.privacyPolicyText;
    privacyPolicyLink.href = footerData.privacyPolicyUrl;
  }

  if (socialTitleElement) {
    socialTitleElement.textContent = footerData.socialTitle;
  }

  if (socialLinksContainer) {
    socialLinksContainer.innerHTML = "";
    footerData.socialLinks.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `<i class="${link.icon}"></i>`;
      socialLinksContainer.appendChild(a);
    });
  }
}

// INITIALIZE THE PAGE
document.addEventListener("DOMContentLoaded", () => {
  // Use the raw GitHub URL for your JSON file
  const jsonUrl = 'https://raw.githubusercontent.com/sinhasaurabh-tut/blog-arch-alchemy/pages/temp/data.json';

  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(dynamicContent => {
      setHeaderContent(dynamicContent.header);
      renderProductCards("product-cards", dynamicContent.cards);
      setFooterContent(dynamicContent.footer);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});