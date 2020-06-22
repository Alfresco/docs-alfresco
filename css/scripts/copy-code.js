const copyCode = (clickEvent) => {
  const copyCodeButton = clickEvent.target;
  const tempTextArea = document.createElement('textarea');
  tempTextArea.textContent = copyCodeButton.getAttribute('data-code');
  document.body.appendChild(tempTextArea);

  const selection = document.getSelection();
  selection.removeAllRanges();
  tempTextArea.select();
  document.execCommand('copy');
  selection.removeAllRanges();
  document.body.removeChild(tempTextArea);
};

document.querySelectorAll('.copy-code-button').forEach((copyCodeButton) => {
  copyCodeButton.addEventListener('click', copyCode);
});