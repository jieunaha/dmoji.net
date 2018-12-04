export function slideReport(selector, imgs) {
  return `
  <div id="${selector}" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      ${(imgs.map((e, i) => {
        return `<li data-target="#${selector}" data-slide-to="${i}" class="${i === 0 ? 'active' : ''}"></li>`;
      })).join('')}
    </ol>
    <div class="carousel-inner">
      ${(imgs.map((e, i) => {
        return `<div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img class="d-block w-100" src="${e}" alt="slide number ${i}">
        </div>`;
      })).join('')}
    </div>
    <a class="carousel-control-prev" href="#${selector}" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#${selector}" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  `;
}

