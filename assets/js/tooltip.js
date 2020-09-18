class Tooltip extends HTMLElement {
  connectedCallback() {
    this.setup();
  }

  handleDropdownPosition() {
    const screenPadding = 16;

    const dropdownRect = this.dropdown.getBoundingClientRect();
    const fullOuterWidth = window.outerWidth;

    if (dropdownRect.x < 0) {
      const dif = Math.abs(dropdownRect.x) + screenPadding;
      this.dropdown.style.transform = `translate(${dif}px, calc(-50% - 10pt))`;
    } else if (dropdownRect.right > fullOuterWidth) {
      const dif = dropdownRect.right - fullOuterWidth + screenPadding;
      this.dropdown.style.transform = `translate(calc(0px - ${dif}px), calc(-50% - 10pt))`;
    }
  }

  toggle() {
    if (this.classList.contains("tooltip-open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.classList.add("tooltip-open");
    this.handleDropdownPosition();
  }

  close() {
    this.classList.remove("tooltip-open");
  }

  setup() {
    this.placeholder = document.createElement("div");
    this.placeholder.innerHTML = this.innerHTML;
    this.innerHTML = "";

    this.appendChild(this.placeholder);

    this.dropdown = document.createElement("div");
    this.dropdown.innerText = this.getAttribute("data-tooltip-text");
    this.dropdown.classList.add("tooltip-dropdown");
    this.dropdown.style.transform = `translate(0, calc(-50% - 10pt))`;

    this.appendChild(this.dropdown);

    this.handleDropdownPosition();

    if (this.dataset["tooltip-mode"] !== "manual") {
      this.placeholder.addEventListener("mouseover", () => {
        this.handleDropdownPosition();
      });
    }

    // this.placeholder.addEventListener("touchstart", () => this.toggle());
  }
}

function dismissAllTooltips(event) {
  if (typeof event.target.closest !== "function") return;
  const currentTooltip = event.target.closest("alfresco-tooltip");

  document.querySelectorAll(".tooltip-open").forEach((tooltip) => {
    if (tooltip === currentTooltip) return;

    tooltip.classList.remove("tooltip-open");
  });
}
