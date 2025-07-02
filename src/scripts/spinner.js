// spinner.js

export function setSpinnerLoading(source) {
  const spinner = document.querySelector(`.${source}-spinner`);
  const label = document.getElementById(`${source}-result`);

  if (spinner instanceof HTMLElement) {
    spinner.style.display = 'inline-block';
  }

  if (label) {
    label.textContent = 'Loading...';
  }
}

export function setSpinnerResult(source, hits) {
  const spinner = document.querySelector(`.${source}-spinner`);
  const label = document.getElementById(`${source}-result`);

  if (spinner instanceof HTMLElement) {
    spinner.style.display = 'none';
  }

  if (label) {
    label.textContent = `${hits} hits`;
  }
}

export function setSpinnerError(source) {
  const spinner = document.querySelector(`.${source}-spinner`);
  const label = document.getElementById(`${source}-result`);

  if (spinner instanceof HTMLElement) {
    spinner.style.display = 'none';
  }

  if (label) {
    label.textContent = `Error fetching ${source} results`;
  }
}

export function setSpinnerStop(source) {
  const spinner = document.querySelector(`.${source}-spinner`);
  const label = document.getElementById(`${source}-result`);

  if (spinner instanceof HTMLElement) {
    spinner.classList.add('fade-out');

    setTimeout(() => {
      spinner.style.display = 'none';
    }, 400); // matcha CSS-transition
  }
}
