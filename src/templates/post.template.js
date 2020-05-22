export function renderPosts(post, options = {}) {
    const tag = post.type === 'news' ?
        '<li class="tag tag-blue tag-rounded">Новость</li>' :
        '<li class="tag tag-rounded">Заметка</li>';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidate = favorites.find(p => p.id === post.id)

    const button = candidate
    ?   `<button data-id="${post.id}" data-title="${post.title}" class="button-round button-small button-danger">Удалить из избранного</button>`
    :   `<button data-id="${post.id}" data-title="${post.title}" class="button-round button-small button-primary">Добавить в избранное</button>`
    return `
    <div class="panel">
        <div class="panel-head">
          <p class="panel-title">${post.title}</p>
          <ul class="tags">
            ${tag}
          </ul>
        </div>
        <div class="panel-body">
          <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
          <small>${post.date}</small>
          ${options.withButton ? button : `<button class="button-warning">Вернуться</button>` }
        </div>
    </div>
    `
}
